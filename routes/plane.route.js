const express = require('express');
const planeModel = require('../models/plane.model');

const router = express.Router();

router.get('/customer/CustomerSearching', async function (req, res) {
    const rows = await planeModel.all();
    res.render('vwCustomer/Customer_Searching', {
      planes: rows,
      empty: rows.length === 0
    })
  })

module.exports = router;