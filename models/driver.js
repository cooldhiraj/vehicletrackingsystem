const mongoose = require('mongoose');
const Joi = require('joi');

const Driver = mongoose.model('Driver', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 3,
        maxlength: 32
    },
    dob: {
        type: Date,
        required: true,
        lowercase: true
    },
    city: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
        minlength: 6,
        maxlength: 6,
        lowercase: true
    },
    phone: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    experience: {
        type: Number,
        required: true
    }
}));

function validator(driver){
    const schema = {
        name: Joi.string().required(),
        dob: Joi.string().required(),
        city: Joi.string().required(),
        pincode: Joi.string().min(6).max(6).required(),
        phone: Joi.string().max(10).required(),
        gender: Joi.string().required(),
        experience: Joi.number().max(10).required() 
    }
    return Joi.validate(driver, schema)
}

module.exports.Driver = Driver;
module.exports.validator = validator;