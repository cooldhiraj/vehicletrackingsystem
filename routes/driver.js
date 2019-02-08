"use strict";
const _ = require('lodash');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Driver, validator } = require('../models/driver');

router.post('/create', [ auth, admin ], async (req, res) => {
    const {error} = validator(req.body);
    if(error){ return res.status(400).send(error.details[0].message);}

   if(!error){
       try{
        let driver = await new Driver(_.pick(req.body, ['name', 'dob', 'city', 'pincode', 'phone', 'gender', 'experience']));
        let result = await driver.save();
        return res.status(200).send(result);
       }
       catch(ex){ return res.status(400).send(ex.message); }   
    }
}
);

module.exports = router;