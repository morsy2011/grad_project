const {Resturant,validateResturant} =require('../models/resturant');
const _ = require('lodash');

exports.getRest = async function (req, res, next) {

let filter = {};
if(req.query.rate || req.query.cuisineType){
    filter= {rate: req.query.rate ,cuisineType: req.query.cuisineType};
}

const rest = await Resturant.find(filter).populate('city','name -_id');
res.send(rest);
next();
}

exports.getRestById = async function (req, res, next) {
const rest = await Resturant.findById(req.params.id).populate('city','name -_id');
if(!rest) return res.status(404).send('Not found check your id ');
res.send(rest);
next();
}

exports.postRest= async function(req,res,next){
    const {error}= validateResturant(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let rest = await Resturant.findOne({name: req.body.name , lat:req.body.lat,lng:req.body.lng});
    if(rest) return res.status(400).send('this resturant is already here');
    rest = new Resturant(_.pick(req.body,['name','address','pic','menue','rate','workTime','cuisineType','city','lat','lng']));
    rest = await rest.save();
    res.send(rest);
    next();
}

exports.putRest= async function(req,res,next){
    let rest = await Resturant.findById(req.params.id);
    if(!rest) return res.status(404).send('Not found check your id');
    const { error } = validateResturant(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    rest = await Resturant.findByIdAndUpdate(req.params.id,{
        $set:{
            name:req.body.name,
            address:req.body.address,
            rate:req.body.rate,
            workTime:req.body.workTime,
            cuisineType:req.body.cuisineType,
            pic:req.body.pic,
            menue:req.body.menue,
            lat:req.body.lat,
            lng:req.body.lng,
            city:req.body.city
        }
    },{ new : true })

    rest = await rest.save();
    res.send(rest);

    next();
}

exports.deleteRest= async function (req,res,next){
    const rest = await Resturant.findByIdAndRemove(req.params.id);
    if(!rest) return res.status(404).send('not found check your id')
    res.send(rest);
    next();
}