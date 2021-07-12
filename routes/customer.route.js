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
// const urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET users listing. */
// router.get('/', async (req, res) => {
//     const ret = await userModel.all();
//     res.json({
//         data: ret
//     })
//     //res.render('login', { title: 'Login' });
// });

// router.get('/password', urlencodedParser, async (req, res) => {
//     console.log('get here');
//     res.render('forgetPassword', { title: 'Quên Mật Khẩu' });
// });

// router.put('/password', async (req, res) => {
//     console.log("vao đay nè: ", req.body)
//     const { body } = req;

//     if (body.role === 0) return res.json({ status: -1 });

//     let verifyPw = await verifyPassword(body.id, body.old_password);
//     if (!verifyPw) return res.json({ status: -1 });

//     const entity = {
//         id: body.id,
//         old_password: body.old_password,
//         new_password: body.new_password
//     };

//     await userModel.changePassword(entity);

//     res.json({
//         status: 1
//     })
// });

// router.post('/update-name', async (req, res) => {
//     let { id, name } = req.body;

//     console.log('data: ne ahihihi')

//     if (name === undefined || name === '') return res.json({ status: -1, msg: 'failed to save name' })
//     await userModel.updateName(id, name);

//     res.json({
//         status: 1,
//         msg: 'update name completed'
//     })
// })

// router.post('/update-email', async (req, res) => {
//     let { id, email } = req.body;

//     if (email === undefined || email === '') return res.json({ status: -1, msg: 'failed to save email' })
//     await userModel.updateEmail(id, email);

//     res.json({
//         status: 1,
//         msg: 'update email completed'
//     })
// })

// router.post('/update-phone', async (req, res) => {
//     let { id, phone } = req.body;

//     if (phone === undefined || phone === '') return res.json({ status: -1, msg: 'failed to save phone' })
//     await userModel.updatePhone(id, phone);

//     res.json({
//         status: 1,
//         msg: 'update phone completed'
//     })
// })

// const checkUsername = async username => {
//     const id = await userModel.getUsername(username);
//     return id;
// }

// const checkEmail = async email => {
//     const id = await userModel.getEmail(email);
//     return id;
// }

// const verifyPassword = async (id, password) => {
//     let passwordHash = await userModel.getPasswordById(id);
//     return bcrypt.compareSync(password, passwordHash.password);
// }
router.get('/', customer, async function (req, res) {
  // console.log('tai account.route: isAuth, authUser',req.session.isAuth, req.session.authUser);
  res.render('vwCustomer/Customer_LoginSucessfully');
})

router.get('/CustomerBooking', customer, async function (req, res) {
  res.render('vwCustomer/Customer_Booking');
})


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




