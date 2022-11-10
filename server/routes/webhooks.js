
const express = require('express');
const router = express.Router();

const stripe = require('stripe')(process.env.STRIPE_SECRET)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

const {User} = require('../models/user');
///
router.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {

  const sig = request.headers['stripe-signature'];

  let event;
  
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.log(err.message)
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }


  console.log(event.type)
  // Handle the event
  switch (event.type) {
    case 'customer.created':
      const create = event.data.object
      console.log("Customer Created")
      console.log(create)
      console.log(create.customer)

      break;
    case 'customer.subscription.created':
      const createSub = event.data.object
      console.log("Customer Created")
      console.log(createSub)
      console.log(createSub.customer)

      User.findOne({'stripe_customer_id': createSub.customer}, (err, user) =>{
          if(!user) return response.json({
              auth: false,
              message: "AUTH did not work",
              userData: false
          })
  
          user.generateKey((err, user) =>{
            if(err) return console.log(err)
          })
      
      })
  
      break;
    case 'customer.subscription.updated':
      const updated = event.data.object
      console.log("Customer Subscription Updated")
      console.log(updated)
      console.log(updated.customer)
      console.log(updated.status)
      break;
    case 'customer.subscription.deleted':
      const deleted = event.data.object
      console.log(deleted)
      console.log(deleted.customer)
      console.log(deleted.status)
      User.findOneAndUpdate({'stripe_customer_id': deleted.customer}, {'api_key': ""}, {new: true}, (err, doc)=>{
        if(err) return console.log(err)
      })
      break;
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      console.log("Paymeny_Intent Suceeded")
      console.log(paymentIntentSucceeded)
      // Then define and call a function to handle the event subscription_schedule.updated
      break;
    // ... handle other event types
    case 'invoice.payment_succeeded':
      const invoicePaymentSuceeded = event.data.object
      console.log("Paymeny_Intent Suceeded")
      console.log(invoicePaymentSuceeded)
      break;
    case 'invoice.paid':
      const invoicePaid = event.data.objecct
      console.log("Invoice Paid")
      console.log(invoicePaid)
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});



module.exports = router;