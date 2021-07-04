const express = require('express');
// const adminModel = require('../models/user.model');

// const db = require('../utils/db');


const router = express.Router();
// const admin = require('../middlewares/admin.mdw');

const admin = require('../middlewares/admin.mdw');


// const bodyParser = require('body-parser');
// const casual = require('casual');



// const urlencodedParser = bodyParser.urlencoded({ extended: false });



// /* GET users listing. */
// router.get('/', function(req, res, next) {
//     res.render('vwAdmin/manageConference/manageconference');
//     // res.send('respond with a resource');
// });

// //tao tai khoan
// router.post('/', urlencodedParser, async(req, res) => {
//     const { body } = req;
//     const entity = {...body };

//     //checkUsername
//     const id1 = await checkUsername(entity.user_name);
//     if (id1) {
//         res.json({ msg: 'username is exist' });
//         return;
//     }

//     //checkEmail
//     const id2 = await checkEmail(entity.email);
//     if (id2) {
//         res.json({ msg: 'email is exist' });
//         return;
//     }

//     //create id by casual and 
//     const id = casual.uuid;
//     entity.id = id;
//     await adminModel.add(entity);

//     res.send('completed');

// });

// view admin
router.get('/', admin, async function(req, res) {
    res.render('vwAdmin/Admin_LoginSucessfully');
});
router.get('/AdminSearching', admin, async function(req, res) {
    res.render('vwAdmin/Admin_Searching');
});
router.get('/AdminSelling', admin, async function (req, res){
     res.render('vwAdmin/Admin_Selling');
})
router.get('/AdminSellingInfo', admin, async function(req, res) {
    res.render('vwAdmin/Admin_SellingInfo');
});




// // view của quản lý user 
// router.get('/manageuser', function(req, res) {
//     res.render('vwAdmin/manageUser/manageuser');
// });
// router.get('/alluser', function(req, res) {
//     res.render('vwAdmin/manageUser/alluser');
// });
// router.get('/userbanned', function(req, res) {
//     res.render('vwAdmin/manageUser/userbanned');
// });
// router.get('/singleuser', function(req, res) {
//     res.render('vwAdmin/manageUser/singleuser');
// });

// router.get('/userconference', function(req, res) {
//     res.render('vwAdmin/manageUser/userconference');
// });

// // view chấp nhận yêu cầu của user 
// router.get('/acceptuser', function(req, res) {
//     res.render('vwAdmin/acceptuser');
// });




////////////////////////////////////////
// const checkUsername = async username => {
//     const id = await adminModel.getUsername(username);
//     return id;
// }

// const checkEmail = async email => {
//     const id = await adminModel.getEmail(email);
//     return id;
// }


module.exports = router;