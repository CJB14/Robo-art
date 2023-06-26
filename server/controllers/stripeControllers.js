//handles logic for for the api/stripeRoutes.js

//secret key is second param for stripe = require()
const stripe = require('stripe')('sk_test_51NN0DcH6zZZeR5PgprMBqqJ28DeK6DemJnrHfnkIgIApF0T7X6dQIsVTGT2FAE6hRVfteCtlxIEAVoOMLlieUFR300JS6YEBK2');
const Order = require('../models/order');

const endpointSecret = 'whsec_1163913a8efd3baee23bfd958a17667b977376746fa6b35af4b3bebeb06e0eda';

//i dont think this is the most concise way to do it bc i can see this code getting lengthy...
const paymentWebhook = async (req, res) => {
    const signature = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    switch (event.type) {
        case 'checkout.session.async_payment_failed':
            const checkoutSessionPaymentFailed = event.data.object;
            //example of callback function to handle payment_failed event
            await paymentErrorHandler(checkoutSessionPaymentFailed);
            break;

        case 'checkout.session.async_payment_succeeded':
            // function for async_payment_succeeded event
    
            break;

        case 'checkout.session.completed':
            //function for redirecting back to /homepage or whatever after payment completion
            
            break;

        case 'checkout.session.expired':
            // function for expired event
            //maybe refresh/redirect page ?
            break;

        case 'order.created':
            //save to db? idk?

            break;

        case 'refund.created':
            // idk 

            break;

        case 'refund.updated':
            // i also dk

            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.send();
};

const paymentErrorHandler = async (event) => {
    const checkoutSession = event.data.object;

    console.log('Checkout Session Async Payment Failed:', checkoutSession.id);
    console.log('Payment Intent ID:', checkoutSession.payment_intent);
    console.log('Failure Reason:', checkoutSession.payment_failure_reason);

    try {
        // Find the order in the database using the order_id
        const order = await Order.findOne({ order_id: checkoutSession.payment_intent });

        if (order) {
            // Update the order with the payment failure information
            order.payment_status = 'failed';
            order.payment_failure_reason = checkoutSession.payment_failure_reason;

            // Save the updated order to the database
            await order.save();

            console.log('Order payment failure information saved:', order);
        } else {
            console.log('Order not found:', checkoutSession.payment_intent);
        }

        //display alert
        //needs front end js that redirects or refreshes page so user can try to re-enter payment info
        //can be more complicated, like an email notification, as well
        alert('Payment failed. Please try again or contact support.');

    } catch (error) {
        console.error('Error saving order payment failure information:', error);
    }
}

module.exports = {
    paymentWebhook,
};
