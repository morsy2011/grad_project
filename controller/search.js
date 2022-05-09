const { Restaurant } = require('../models/restaurant');
const { Cafe } = require('../models/cafe');
const { Bus } = require('../models/bus');
const { City } = require('../models/city');
const { Club } = require('../models/club');
const { Hotel } = require('../models/hotel');
const { Tourist } = require('../models/tourist-place');
const { Train } = require('../models/train');


exports.search = async function (req, res, next) {

    let filter = {};

    if (req.query.name) {
        filter.name = { $regex: req.query.name };
     }
    if (req.query.cuisineType) {
        filter.cuisineType = { $regex: req.query.cuisineType };
    }


    if (req.query.rate) {
        filter.rate = { $regex: req.query.rate };
    }

if(filter.name || filter.cuisineType || filter.rate){
    const Restaurants = await Restaurant.find(filter).populate('city', 'name -_id');  
    const Cafes = await Cafe.find(filter).populate('city', 'name -_id');
    const BusStation = await Bus.find(filter).populate('city', 'name -_id');
    const TrainStation = await Train.find(filter).populate('city', 'name -_id');
    const Hotels = await Hotel.find(filter).populate('city', 'name -_id');
    const TouristPlace = await Tourist.find(filter).populate('city', 'name -_id');
    const club = await Club.find(filter).populate('city', 'name -_id');

    let result = [
        Restaurants,
        Cafes,
        BusStation,
        TrainStation,
        Hotels,
        TouristPlace,
        club
    ]

    for(var i = 0 ;i<=result.length;i++){
        if(result[i]==0){
            return res.send("can't find item")
        }
     
       return res.json({
        "status": true,
        "message": "success",
        "data":   result
        });
    }
}
else return res.send('enter search item')
    next();
};
