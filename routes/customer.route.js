const express = require('express');
// const bodyParser = require('body-parser');
// const casual = require('casual');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');


// const userModel = require('../models/user.model');
// const middleware = require('../middlewares/middleware');
const airportModel = require('../models/airport.model');
const flightModel = require('../models/flight.model');

const customer = require('../middlewares/customer.mdw');

const router = express.Router();









router.get('/', customer, async function (req, res) {
  // console.log('tai account.route: isAuth, authUser',req.session.isAuth, req.session.authUser);
  res.render('vwCustomer/Customer_LoginSucessfully');
})

router.get('/CustomerBooking', customer, async function (req, res) {
  res.render('vwCustomer/Customer_Booking');
})

////////////////////////////////////////////////////////////////////////////////////////
router.get('/CustomerSearching', customer, async function (req, res) {
  // const id = req.params.id;
  // const flight = await flightModel.all();  
  const airport_flight = await flightModel.airportFlight();
  res.render('vwCustomer/Customer_Searching', {
    flights: airport_flight,
    empty: airport_flight.length === 0
  })
})
router.post('/CustomerSearching', customer, async function (req, res) {
  const airport_flight = await flightModel.findFlight(req.body);
  console.log('tại customer.route 1', airport_flight)
  if (airport_flight === null) {
    req.session.match_flight = false;
    console.log('tại customer.route match_flight', req.session.match_flight);
    req.session.flights = airport_flight;
    res.redirect('/customer/CustomerSearchingInfo')
  }
  else {
    console.log('tại customer.route else')
    req.session.match_flight = true;
    console.log('tại customer.route else match_flight', req.session.match_flight);
    req.session.flights = airport_flight;
    res.redirect('/customer/CustomerSearchingInfo')
  }
})

///////////////////////////////////////////////////////////////////////////////
router.get('/CustomerSearchingInfo', customer, async function (req, res) {
  const airport_flight = await flightModel.airportFlight();
  res.render('vwCustomer/Customer_SearchingInfo', {
    flight: airport_flight,
    empty: airport_flight.length === 0
  })
  res.render('vwCustomer/Customer_SearchingInfo');
})

module.exports = router;




