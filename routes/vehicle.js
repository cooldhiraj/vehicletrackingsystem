"use strict";
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Vehicle, validator } = require('../models/vehicle');

router.post('/create', [auth, admin], async (req, res) => {
    const {error} = validator(req.body);
    if(error){ return res.status(400).send(error.details[0].message); }

   if(!error){
       try{
        let vehicle = await new Vehicle(_.pick(req.body, ['v_type', 'v_num', 'v_capacity', 'v_brand']));
        let result = await vehicle.save();
        return res.status(200).send(result);
       }
       catch(ex){ return res.status(400).send(ex.message); }  
    }
}
);

module.exports = router;