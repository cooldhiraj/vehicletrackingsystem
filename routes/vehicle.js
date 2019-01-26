const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Vehicle, validator } = require('../models/vehicle');

router.post('/create', async (req, res) => {
    const {error} = validator(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

   if(!error){
       try{
        let vehicle = await new Vehicle({
            v_type: req.body.v_type,
            v_num: req.body.v_num,
            v_capacity: req.body.v_capacity,
            v_brand: req.body.v_brand
        });
        let result = await vehicle.save();
        return res.status(200).send(result);
       }
       catch(ex){
           return res.status(400).send(ex.message);
       }   
    }
}
);

module.exports = router;