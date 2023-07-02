//ROUTES FOR PRINT API ROUTES

//live sandbox https://www.peecho.com
// test endpoint for posting new order to https://test.www.peecho.com/rest/v2/order/
// see documentation for required parameters

//peecho print api keys:
//Button key: 16877206283831117
//Merchant API Key: 8c08b64f40ea148f01898d38d6343cbede41e15e
//Secret key: a10bfd751378a0aeddb252dcf47788c21003c069
//documentation link: https://www.peecho.com/print-api-documentation

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

//errors for peecho print api documentation

const router = require('express').Router();

const {
    printOrder
} = require('../../controllers/printOrderControllers');

router.post('/order/:orderId', printOrder);

module.exports = router;