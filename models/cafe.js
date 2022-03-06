const mongoose = require('mongoose');
const Joi = require('joi');


cafeSchema= mongoose.Schema({
    name:String,
    addres:String,
    rate:String,
    workeTime:String,
    cuisineType:String,
    pic:String,
    menue:String,
    lat:Number,
    lng:Number,
    city:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    }
})

const Cafe = mongoose.model('Cafes',cafeSchema);

function validateCafe(cafe){

    const schema= Joi.object({
        name:Joi.string().min(3).max(100).required(),
        address:Joi.string().min(3).required(),
        rate:Joi.required(),
        workTime:Joi.string().min(7).max(10).required(),
        cuisineType:Joi.string().required(),
        lat:Joi.number().required(),
        lng:Joi.number().required(),
        city:Joi.required()
    });

    return schema.validate(cafe);
}

module.exports.Cafe=Cafe;
module.exports.validateCafe=validateCafe;