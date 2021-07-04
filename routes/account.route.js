const express = require('express');
const brcypt = require('bcryptjs');
const moment = require('moment');

// const bodyParser = require('body-parser');
// // create application/json parser
// const jsonParser = bodyParser.json();
// // create application/x-www-form-urlencoded parser
// const urlencodedParser = bodyParser.urlencoded({ extended: false });




const userModel = require('../models/user.model');
// const auth = require('../middlewares/auth.mdw');

const router = express.Router();


router.get('/login', async function (req, res) {
  if (req.headers.referer) {
    req.session.retUrl = ref;
  }
  res.render('vwAccount/login', {
    layout: false
  });
})

router.post('/login', async function (req, res) {
  const user = await userModel.singleByUserName(req.body.username);
  if (user === null) {
    return res.render('vwAccount/login', {
      layout: false,
      err_message: 'Invalid username or password.'
    });
  }

  // const ret = bcrypt.compareSync(req.body.password, user.password);
  // if (ret === false) {
  //   return res.render('vwAccount/login', {
  //     layout: false,
  //     err_message: 'Invalid username or password.'
  //   });
  // }

  const ret = password === user.password;
  if (ret === false) {
    return res.render('vwAccount/login', {
      layout: false,
      err_message: 'Invalid username or password.'
    });
  }

  req.session.isAuth = true;
  req.session.authUser = user;

  let url = req.session.retUrl || '/';
  res.redirect(url);
})

router.post('/logout', async function (req, res) {
  req.session.isAuth = false;
  req.session.authUser = null;
  res.redirect(req.headers.referer);
})


router.get('/register', async function (req,res) {
  res.render('vwAccount/register', {
    layout: false
  });
}),

router.post('/register', async function(req,res){
  console.log("Tại account.route",req.body);
  console.log("Tại account.route",req.body.username);
  console.log("Tại account.route",req.body.password);
  console.log("Tại account.route",req.body.name);
  console.log("Tại account.route",req.body.identity_card);
  console.log("Tại account.route",req.body.phone_number);
  console.log("Tại account.route",req.body.email);
  console.log("Tại account.route",req.body.sex);
  console.log("Tại account.route",req.body.date_of_birth);
  console.log("Tại account.route",req.body.permission);  
  

  const hash = brcypt.hashSync(req.body.password, 10);
  const date_of_birth = moment(req.body.date_of_birth, 'DD/MM/YYYY').format('YYYY-MM-DD');
  const user = {
    username: req.body.username,
    password: hash,
    name: req.body.name,
    identity_card: req.body.identity_card,
    phone_number: req.body.phone_number,
    email: req.body.email,
    sex: req.body.sex,
    date_of_birth: date_of_birth,
    permission: 0,
  }
  await userModel.add(user);
  res.render('vwAccount/register', {
    layout: false
  });
}),

router.get('/is-available', async function (req, res) {
  const username = req.query.user;
  const user = await userModel.singleByUserName(username);
  if (user === null) {
    return res.json(true);
  }  
  res.json(false);
})

module.exports = router;