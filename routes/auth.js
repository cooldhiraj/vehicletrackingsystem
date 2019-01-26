const _ = require('lodash');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Agency } = require('../models/agency');
const bcrypt = require('bcrypt');
const Joi = require('joi');

router.post('/auth', async (req, res) => {
    const { error } = validator(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

   if(!error){
       try{
        const agency = await Agency.findOne({email: req.body.email});
        if(!agency){
            return res.status(400).send('Invalid Email');
        }

        const dbPassword = await agency.password;
        let reqPassword = await req.body.password;
        let v = await bcrypt.compare(reqPassword, dbPassword);
        const token = agency.generateAuthToken();
        res.header('x-auth-token', token).status(200).send(_.pick(agency, ['email']));
       }
       catch(ex){
           return res.status(400).send(ex.message);
       }   
    }
}
);

function validator(auth){
    const schema = {
        email: Joi.string().email({ minDomainAtoms: 2 }),
        password: Joi.string().min(6).max(24).required(),   
    }
    return Joi.validate(auth, schema)
}

module.exports = router;