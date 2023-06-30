//ROUTES FOR PAYMENT THRU STRIPE API

//NOTES ABOUT STRIPE API
//first step install on command line
//`brew install stripe/stripe-cli/stripe`

//second step, authenticate
//type `stripe login` in command line

//API KEYS
//PUBLISHABLE KEY: pk_test_51NN0DcH6zZZeR5PghltRVRNZ3mofKkGQeWGHY7AghpmfU4wdt0JT5IIvqT6P4CERXk6ipEstgSggnCzOSrFvdBXa00alRdgsyg
//SECRET KEY: sk_test_51NN0DcH6zZZeR5PgprMBqqJ28DeK6DemJnrHfnkIgIApF0T7X6dQIsVTGT2FAE6hRVfteCtlxIEAVoOMLlieUFR300JS6YEBK2
//account id acct_1NN0DcH6zZZeR5Pg

// const stripe = require('stripe')('sk_test_51NN0DcH6zZZeR5PgprMBqqJ28DeK6DemJnrHfnkIgIApF0T7X6dQIsVTGT2FAE6hRVfteCtlxIEAVoOMLlieUFR300JS6YEBK2');

const router = require('express').Router();

const {
    paymentWebhook
} = require('../../controllers/stripeControllers');

router.post('/webhook', paymentWebhook);

module.exports = router;