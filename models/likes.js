const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  userId: String,
  like: {
    type: mongoose.Schema.Types.ObjectId,
  }, 
},
{
  toJSON: { virtuals: true }
}); 

likeSchema.virtual('city', {
  ref: 'City', 
  localField: 'like', 
  foreignField: '_id', 
  justOne: true
});

likeSchema.virtual('restaurant', {
  ref: 'Restaurant',
  localField: 'like',
  foreignField: '_id',
  justOne: true
});

likeSchema.virtual('cafe', {
  ref: 'Cafes',
  localField: 'like',
  foreignField: '_id',
  justOne: true
});




const Like = mongoose.model('Like', likeSchema);

exports.Like = Like;