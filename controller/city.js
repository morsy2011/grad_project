const {City, validateCity} = require('../models/city');
const {User} = require('../models/user/user');
const _ = require('lodash');

exports.creatCity = async function (req, res, next) {

    const { error } = validateCity(req.body);
    if (error) return res.status(400).send(error.details[0].message);
 
    let city = new City(_.pick(req.body, ["name", "population", "area"]));
    city = await City.findOne({ name: req.body.name});
    if (city) return res.status(400).send("this city is already in database");
    city = await city.save();
    res.send(_.pick(req.body, ["name", "population", "area"]));

    
    next();
}

exports.getCity = async function (req, res, next) {
    const city = await City.find().sort('name');
    let cityBack = {
        id: city.id,
        name: city.name,
        population: city.population,
        area: city.area,
        lng: city.lng,
        lat: city.lat,
        aboutTheCity: city.aboutTheCity,
    }
    res.status(200).json({
    "status": true,
    "message": "success",
    "data": city
  });
    next();
}

exports.getCityById = async function (req, res, next) {
    const city = await City.findById(req.params.id).select('-__v');
    if (!city) return res.status(404).send("Not fond check your Id");
    res.status(200).json({
        "status": true,
        "message": "success",
        "data": city
    });
    next();
}

exports.editCity= async function (req,res,next){
    let city = await City.findById(req.params.id);
    if(!city) return res.status(404).send('check your id');

    const{ error }= validateCity(req.body);
    if(error) return res.status(400).send(error.details[0].message);
  
    city = await City.findByIdAndUpdate(req.params.id,{
        $set:{ 
            name:req.body.name,
            area:req.body.area,
            population:req.body.population,
            touristPlaces:req.body.touristPlaces,
        }},{ new:true });
    
    city= await city.save();     
    res.send(city);

    next();
     
} 

exports.deleteCity=async function(req,res,next){
    const city = await City.findByIdAndRemove(req.params.id);
    if(!city)return res.status(404).send("not found check your id");
    res.send(city);

    next();
}

exports.addComment = async (req,res, next) => {
    const city = await City.findById(req.params.cityId);
    const user = await User.findOne({"local._id":req.body.userId});

    console.log(user);

    let comment = city.comment;
    comment.push({
        "name": user.local.name,
        "text": req.body.text
    })

    await city.save();
    // res.send(comment);

    res.status(200).json({
        "status": true,
        "message": "Your comment in sent successfully",
        "data": comment
    });
}