//ROUTES FOR PRINT API ORDERS 

//user selects print size, stripe processes payment
//the same user selection of print sizes and clicking purchase or buy button, or completion of stripe api payment triggers a call to peecho print api
//live sandbox https://www.peecho.com

//api keys:
//Button key: 16877206283831117
//Merchant API Key: 8c08b64f40ea148f01898d38d6343cbede41e15e
//Secret key: a10bfd751378a0aeddb252dcf47788c21003c069
//documentation link: https://www.peecho.com/print-api-documentation


//send post request to https://test.www.peecho.com/rest/v2/order/
// parameters: required - number
//number of copies to be printed, no more than 15

// merchant_api_key - required -  string

// offering_id - required - number -- will be artwork ID (identifier for the order that is to be printed)

//order_reference
// string - a reference chosen by you to identify the order in your system
// purchase_order - string - maybe provided by Stripe API gotta check
//content_url
//required
//string
// Source file to be printed.

// content_width
// required
// number
// width of the content file -- part of user input when selecting size of print from drop down

// content_height
// required
// number
// height of the content file -- part of user input when selecting size of print from drop down

// see if these can be saved through stripe
// address_details
// object
// details about shipment and billing

// email_address
// required
// string
// email of the customer. They will receive order confirmation and shipping details on this address

// shipping_address
// required
// object
// billing_address
// object

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



//errors for peecho print api 

// Response 201
// `HEADERS
// Content-Type:application/json
// BODY
// {
//   "order_id": 1234
// }`

// Response 401
// HEADERS
// Content-Type:application/json
// BODY
// {
//   "url": "https://www.peecho.com/rest/v2/order/",
//   "details": "Incorrect merchantApiKey!",
//   "custom_code": "APP_FORBIDDEN",
//   "timestamp": "2020-10-15T16:54:06.276"
// }
// Response
// 400
// HEADERS
// Content-Type:application/json
// BODY
// {..."details": "Required quantity: 1 is lower than the minimum quantity of: 5!"...}
// {..."details":" Custom reference: ABC is already assigned to another order: 777"...}
// Response
// 404
// HEADERS
// Content-Type:application/json
// BODY
// {..."details": ""This currency: EUT is not available!"...}

//more peecho error codes: 
 //OFF_NOT_FOUND	Check the available offerings using /list endpoint
// OFF_MIN	There is a minimum quantity to be ordered for this offering. Check details of an offering using /list endpoint
// APP_FORBIDDEN	Incorrect API Key provided. Check your API key in the "API" page of any Application in your account
// MERCH_INSUFFICIENT_BALANCE	There is not enough balance on your account. You either need to add credit or contact support@peecho.com to switch to a monthly invoiced account. Check Payment methods
// ORD_SECRET	The secret provided is incorrect. It should be the hex SHA-256 encoded value of your account secret key(found in the API page of any Application in your account) joined by the order id. Example: If secret key is "ABC1234SECRET" and order id is "12345" then secret = SHA256(ABC1234SECRET12345) = "d2ba59a316912c3acbc33d7ada3197a0ea7ff4ac8befdb3bc39690f4e478a06a"
// SPINE_ORDER_NOT_FOUND	There is no order placed with the mentioned id. If you wanted to check a spine for an offering (in order to place a future order) use this endpoint
// ORD_NO_PRINTER	The order is not assigned to a production facility yet. This means that the address still needs to be set. Check if there was an error when setting the address, it might be the case that there is no production facility available for the product in the specified country. The Offerings endpoints can show you available products and which countries can they be printed in.
// ORD_DUPLICATE	The order reference must be unique at a Merchant level (even if you have multiple Applications).
// ORD_PAID_STATE	Order can only be set to PAID if it is in either OPEN or PAYMENT_ERROR statuses. Check the status in the Dashboard or using the status endpoint
// ORD_CANCEL_STATE	Order cannot be cancelled if it has already been sent to the printer (status IN_PRINT_QUEUE or IN_PRODUCTION or SHIPPED) or if it was already cancelled/refunded before. Check the status in the Dashboard or using the status endpoint
// ORD_FILES_STATE	Files for an order can only be updated if the order is still OPEN or it is PENDING_COMPLETION. Check the status in the Dashboard or using the status endpoint
// ORD_MISS_ADDR	Address needs to be first set before an order can be paid (submitted). Use the update address endpoint to set the address.
// NO_PF	There is no production facility that can ship the selected product in the selected country. The Offerings endpoints can show you available products and which countries can they be printed in.
// CURR_INVALID	Invalid currency. This is the list of available currencies in our system: USD,JPY,BGN,CZK,DKK,ILS,GBP,HUF,LTL,LVL,PLN,RON,SEK,CHF,NOK,HRK,RUB,TRY,AUD,BRL,CAD,CNY,HKD,IDR,INR,KRW,MXN,MYR,NZD,PHP,SGD,THB,ZAR,ISK
// COLOR_INVALID	The specified color is invalid. The color must be specified in of the hex format: #RRGGBB
// FONT_INVALID

//ACTUAL CODE STARTS HERE FOR POST REQUEST TO PRINT API HERE

const express = require('express');
const router = express.Router();
const Order = require('../models/order');

const merchantAPIKey = '8c08b64f40ea148f01898d38d6343cbede41e15e';
let orderID;

//POST REQUEST FOR PEECHO PRINT API - CREATES PRINT ORDER
router.post('/order', async (req, res) => {
    try {
        const printAPIResponse = await fetch('https://test.www.peecho.com/rest/v2/order/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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
orderID = printData.order_id;

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
// THEN DISPLAY ORDER STATUS TO FRONT END

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