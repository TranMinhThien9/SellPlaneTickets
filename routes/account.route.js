const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');


const userModel = require('../models/user.model');


const router = express.Router();


router.get('/login', async function (req, res) {
  // if (req.headers.referer) {
  //   req.session.retUrl = ref;
  // }
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
  };
  const ret = bcrypt.compareSync(req.body.password, user.password);
  if (ret === false) {
    return res.render('vwAccount/login', {
      layout: false,
      err_message: 'Invalid username or password.'
    });
  };

  req.session.isAuth = true;
  req.session.authUser = user;
  req.session.permission = user.permission;
  // const permission = user.permission;

  if (user.permission === 1) {
    let url = '/admin';
    // console.log('tai account.route: isAuth, isAdmin, authUser', req.session.isAuth,req.session.isAdmin,req.session.authUser);
    res.redirect(url);
  }
  else {
    let url = '/customer'; 
    // console.log('tai account.route: isAuth, authUser',req.session.isAuth, req.session.authUser);
    res.redirect(url);
  };
  // req.session.authUser = user;
  // // let url = req.session.retUrl || '/';
  // res.redirect(url);
})

router.post('/logout', async function (req, res) {
  req.session.isAuth = false;
  req.session.authUser = null;
  req.session.permission = 0;
  // res.redirect(req.headers.referer);
  req.session.destroy();
  res.redirect('/account/login');
})


router.get('/register', async function (req,res) {
  res.render('vwAccount/register', {
    layout: false
  });
}),

router.post('/register', async function(req,res){
  const hash = bcrypt.hashSync(req.body.password, 10);
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
  res.render('vwAccount/login', {
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