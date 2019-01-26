const mongoose = require('mongoose');
const Joi = require('Joi');

const Vehicle = mongoose.model('Vehicle', new mongoose.Schema({
    v_type: {
        type: String,
        required: true,
        lowercase: true,
        enum: ['small trucks', 'medium trucks', 'heavy trucks']
    },
    v_num: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 12,
        lowercase: true
    },
    v_capacity: {
        type: Number,
        required: true,
    },
    v_brand: {
        type: String,
        required: true,
        maxlength: 32,
        lowercase: true
    }, 
}));

function validator(vehicle){
    const schema = {
        v_type: Joi.string().required(),
        v_num: Joi.string().min(2).max(12).required(),
        v_capacity: Joi.number().required(),
        v_brand: Joi.string().max(32).required()  
    }
    return Joi.validate(vehicle, schema)
}

module.exports.Vehicle = Vehicle;
module.exports.validator = validator;