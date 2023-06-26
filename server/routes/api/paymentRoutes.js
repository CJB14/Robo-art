//ROUTES FOR PAYMENT THRU STRIPE API

//NOTES ABOUT STRIPE API
//first step install on command line
//`brew install stripe/stripe-cli/stripe`

//second step, authenticate
//type `stripe login` in command line

//must find out if i can save as dependency

// TEST BY CREATING a single API request VIA COMMAND LINE
// type into command line: 
// `stripe products create \
// --name="My First Product" \
// --description="Created with the Stripe CLI"`
// If everything worked, the command-line displays the following response. 
//`{ "id": "prod_LTenIrmp8Q67sa",
// "object": "product",

//API KEYS
//PUBLISHABLE KEY: pk_test_51NN0DcH6zZZeR5PghltRVRNZ3mofKkGQeWGHY7AghpmfU4wdt0JT5IIvqT6P4CERXk6ipEstgSggnCzOSrFvdBXa00alRdgsyg
//SECRET KEY: sk_test_51NN0DcH6zZZeR5PgprMBqqJ28DeK6DemJnrHfnkIgIApF0T7X6dQIsVTGT2FAE6hRVfteCtlxIEAVoOMLlieUFR300JS6YEBK2
//account id acct_1NN0DcH6zZZeR5Pg

//CODE STARTS HERE
const router = express.Router();

//secret key is second param for requiring stripe
const stripe = require('stripe')('sk_test_51NN0DcH6zZZeR5PgprMBqqJ28DeK6DemJnrHfnkIgIApF0T7X6dQIsVTGT2FAE6hRVfteCtlxIEAVoOMLlieUFR300JS6YEBK2');
const Order = require('../models/order');
const User = require('../models/user');
const Artwork = require('../models/artwork');

//webhook endpoint 
const endpointSecret = 'whsec_1163913a8efd3baee23bfd958a17667b977376746fa6b35af4b3bebeb06e0eda';

router.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.async_payment_failed':
            const checkoutSessionAsyncPaymentFailed = event.data.object;

            // example call back function to handle payment_failed event
            paymentErrorHandler(checkoutSessionAsyncPaymentFailed);

            break;
        case 'checkout.session.async_payment_succeeded':
            const checkoutSessionAsyncPaymentSucceeded = event.data.object;
            //  callback function to handle the event checkout.session.async_payment_succeeded
            break;
        case 'checkout.session.completed':
            const checkoutSessionCompleted = event.data.object;
            //  callback function to handle the event checkout.session.completed
            break;
        case 'checkout.session.expired':
            const checkoutSessionExpired = event.data.object;
            // callback function to handle the event checkout.session.expired
            break;
        case 'order.created':
            const orderCreated = event.data.object;
            // callback function to handle the event order.created
            break;
        case 'refund.created':
            const refundCreated = event.data.object;
            //refund is a little bit complicated because refund/cancellation of order is also allowed through print API and idk if i need both or just one
            // callback a function to handle the event refund.created
            break;
        case 'refund.updated':
            const refundUpdated = event.data.object;
            // call back function to handle the event refund.updated
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
});

//example of callback function for handling payment failure case
//maybe this can be modularized in a different file and imported, so its less code on a page
async function paymentErrorHandler(event) {
    const checkoutSession = event.data.object;

    // Log the event information
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

module.exports = router;

//or maybe its this?
//router.listen(3001, () => console.log('Running on port 3001'));