//ROUTES FOR PRINT API ROUTES

//user selects print size, stripe processes payment
//the same user selection of print sizes and clicking purchase or buy button, or 
//maybe the completion of stripe api payment triggers a call to peecho print api

//live sandbox https://www.peecho.com

//peecho print api keys:
//Button key: 16877206283831117
//Merchant API Key: 8c08b64f40ea148f01898d38d6343cbede41e15e
//Secret key: a10bfd751378a0aeddb252dcf47788c21003c069
//documentation link: https://www.peecho.com/print-api-documentation

// send post request to https://test.www.peecho.com/rest/v2/order/
// see documentation for required parameters

//EXAMPLE PRINT API POST CALL FROM DOCUMENTATION for reference
// var printAPIRequest = require('request');
// printAPIRequest({
//     method: 'POST',
//     url: 'https://test.www.peecho.com/rest/v2/order/',
//     headers: {
//         'Content-Type': 'application/json'
//     },purchase_order
//     //ADDRESS DETAILS OBJECT NEEDS TO COME FROM STRIPE API PAYMENT INFO
//     body: "{  \"quantity\": 1,  \"merchant_api_key\": 8c08b64f40ea148f01898d38d6343cbede41e15e, \"offering_id\": 1234,  \"locale\": \"en_EN\",  \"order_reference\": \"LL1123\",  \"purchase_order\": \"purchase_order_1\", \"content_width\": USER INPUT - PRINT SIZE,    \"content_height\": USER INPUT - PRINT SIZE,    \"number_of_pages\": 1  },  \"address_details\": {    \"email_address\": \"customer@gmail.com\",    \"shipping_address\": {      \"first_name\": \"John\",      \"last_name\": \"Doe\",      \"phone_number\": \"123456789\",      \"address_line_1\": \"Print road 22\",      \"address_line_2\": \"AFI Business center\",      \"zip_code\": \"102234\",      \"city\": \"New York\",      \"state\": \"New York\",      \"country_code\": \"USA\"    },    \"billing_address\": {      \"first_name\": \"John\",      \"last_name\": \"Doe\",      \"address_line_1\": \"Home address 4\",      \"zip_code\": \"1022 KK\",      \"city\": \"Amsterdam\",      \"country_code\": \"NL\"    }  }}"
// }, function (error, response, body) {
//     console.log('Status:', response.statusCode);
//     console.log('Headers:', JSON.stringify(response.headers));
//     console.log('Response:', body);
// });

//errors for peecho print api (link: )

// TO DO : MODULARIZE SOME OF THIS TO stripeControllers.js
// CODE STARTS HERE FOR TEST POST REQUEST TO PRINT API

const router = require('express').Router();
const Order = require('../models/order');

const merchantAPIKey = '8c08b64f40ea148f01898d38d6343cbede41e15e';
let orderId;

//POST REQUEST FOR PEECHO PRINT API - CREATES PRINT ORDER
router.post('/order', async (req, res) => {
    try {
        const printAPIResponse = await fetch('https://test.www.peecho.com/rest/v2/order/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              // TO DO : 
                quantity: 1,
                merchant_api_key: merchantAPIKey,
                offering_id: 'should be a variable with artwork id',
                order_reference: 'needed for delete, easier to distinguish between orders of same artwork',
                file_details: {
                  content_url: 'should be url of artwork, need get route for single artwork by id'
                },
                content_width: 'user input when selecting size of print',
                content_height: 'user input from selecting print size',
                number_of_pages: 'user input, should be same as quantity',
                object_details: {
                  email_address: 'user_email of user session',
                  shipping_address: 'user input in Stripe, find a way to transfer data from Stripe to variable here',
                  billing_address: 'same situation as shipping address, try to find a way to get data they input in Stripe'
                }
              })
            });

const printData = await printAPIResponse.json();

//save to variable
orderId = printData.order_id;

//save order_id to database
 const order = new Order({
    order_id: printData.order_id,
    order_timestamp: "UseDayJS here for timestamp"
  });

  await order.save();

  res.status(200).json({ order_id: printData.order_id });
} catch (error) {
  console.error('Error:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});
// DISPLAY ORDER ID AS ORDER NUMBER TO USER IN FRONT END

//CHECK STATUS ROUTE - GET REQUEST
router.get('/order/status/:orderId', async (req, res) => {
    try {
      const orderId = req.params.orderId;
  
      // Retrieve the order from the database
    const order = await Order.findOne({ order_id: orderId });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const url = `https://test.www.peecho.com/rest/v2/order/status?merchantApiKey=${merchantAPIKey}&orderId=${orderId}`;

    request(url, function (error, response, body) {
      if (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Status:', response.statusCode);
        console.log('Headers:', JSON.stringify(response.headers));
        console.log('Response:', body);

        // Update the order_status field in the database
        const orderStatus = JSON.parse(body);
        order.order_status = orderStatus.status; // assuming the response contains a 'status' property
        order.save();

        res.status(200).json({ order_status: orderStatus.status });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// DISPLAY ORDER STATUS TO FRONT END

//CANCEL ORDER - POST REQUEST ROUTE
//if status of the order is IN_PRINT_QUEUE, you cannot cancel the order. it should show up in "details" - CREATE FRONT END MESSAGE TO THIS
router.post('/order/cancel/:orderId', (req, res) => {
    try {
      const orderId = req.params.orderId;
  
      const url = 'https://test.www.peecho.com/rest/v2/order/cancel';
  
      const options = {
        method: 'POST',
        url: url,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          merchant_api_key: merchantAPIKey,
          order_id: orderId
        })
      };
  
      request(options, async function (error, response, body) {
        if (error) {
          console.error('Error:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          console.log('Status:', response.statusCode);
          console.log('Headers:', JSON.stringify(response.headers));
          console.log('Response:', body);
  
          const responseBody = JSON.parse(body);

          if (response.statusCode === 200) {
            // Order cancellation successful
            const order = await Order.findOneAndDelete({ order_id: orderId });
            if (!order) {
              return res.status(404).json({ error: 'Order not found' });
            }
  
            res.status(response.statusCode).json({ response: 'Order cancelled successfully' });
          } else if (response.statusCode === 409) {
            // Order cancellation not allowed
            res.status(response.statusCode).json({ error: 'Oops! This order is in the queue to be printed, and the order can no longer be cancelled. Please contact the artist directly. Apologies for the inconvenience.' });
          } else {
            // Other error response
            res.status(response.statusCode).json({ error: 'Unexpected error occurred' });
          }
        }
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
  
//       request(options, function (error, response, body) {
//         if (error) {
//           console.error('Error:', error);
//           res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//           console.log('Status:', response.statusCode);
//           console.log('Headers:', JSON.stringify(response.headers));
//           console.log('Response:', body);
  
//           res.status(response.statusCode).json({ response: body });
//         }
//       });
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });