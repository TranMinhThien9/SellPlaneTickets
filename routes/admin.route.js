const express = require('express');
// const adminModel = require('../models/user.model');

// const db = require('../utils/db');


const flightModel = require('../models/flight.model');
const ticketModel = require('../models/ticket.model');

const admin = require('../middlewares/admin.mdw');
const { all } = require('../models/airport.model');


const router = express.Router();



router.get('/', admin, async function (req, res) {
  res.render('vwAdmin/Admin_LoginSucessfully');
});



router.get('/AdminSearching', admin, async function (req, res) {
  const airport_flight = await flightModel.FlightAirportPlane();
  req.session.flights = airport_flight;
  res.render('vwAdmin/Admin_Searching')
})



////////////////////////////////////////////////////////////////////
router.get('/AdminSelling', admin, async function (req, res) {
  res.render('vwAdmin/Admin_Selling');
})
router.post('/AdminSelling', admin, async function (req, res) {
  const ticket = await ticketModel.infoTicket(req.body);
  if (ticket === null) {
    res.render('vwAdmin/Admin_Selling',{
      err_message: 'Invalid flight_id or seat_code.'
    })
  }
  else {

    req.session.tickets = ticket;
    res.redirect('/admin/AdminSellingInfo')
  }

})



//////////////////////////////////////////////////////////////////////
router.get('/AdminSellingInfo', admin, async function (req, res) {
  res.render('vwAdmin/Admin_SellingInfo');
});







module.exports = router;