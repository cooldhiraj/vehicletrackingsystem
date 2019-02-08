"use strict";
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Agency, validator } = require('../models/agency');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

router.post('/create', async (req, res) => {
    const {error} = validator(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

   if(!error){
       try{
        let agency = await new Agency(_.pick(req.body, ['name', 'agency_name', 'email', 'password', 'phone', 'city', 'pincode']));
        const salt = await bcrypt.genSalt(10);
        agency.password = await bcrypt.hash(req.body.password, salt);
        let result = await agency.save();
        const token = agency.generateAuthToken();
        return res.header('x-auth-token', token).status(200).send( _.pick(agency, ['name', 'email']));
       }
       catch(ex){
           return res.status(400).send(ex.message);
       }   
    }
}
);

router.get('/me', auth, async (req, res) => {
    const agency = await Agency.findById(req.agency._id).select('-password');
    res.json(agency);
});

module.exports = router;