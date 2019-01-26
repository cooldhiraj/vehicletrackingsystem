const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('Joi');
var { isEmail } = require('validator');

const agencySchema =  new mongoose.Schema({
name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 64,
    lowercase: true
},
agency_name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 64,
    lowercase: true
},
email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    validate: [ isEmail, 'Invalid email' ]
},
password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128
},
phone: {
    type: Number,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10
},
city: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 64,
    lowercase: true
},
pincode: {
    type: Number,
    minlength: 6,
    maxlength: 6
},
isAdmin: {
    type: Boolean,
    default: false
}
});

agencySchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin }, 'vehicle');
    return token;
}

const Agency = mongoose.model('Agency', agencySchema);



function validator(agency){
    const schema = {
        name: Joi.string().min(3).max(64).required(),
        agency_name: Joi.string().min(2).max(64).required(),
        email: Joi.string().email({ minDomainAtoms: 2 }),
        password: Joi.string().required(),
        phone: Joi.string().min(10).max(10).required(),
        city: Joi.string().min(2).max(64).required(),
        pincode: Joi.string().min(6).max(6).required()   
    }
    return Joi.validate(agency, schema)
}

module.exports.Agency = Agency;
module.exports.validator = validator;