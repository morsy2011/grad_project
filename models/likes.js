const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  userId: String,
  like:  mongoose.Schema.Types.ObjectId,
  
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

likeSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      
  }
});


const Like = mongoose.model('Like', likeSchema);

exports.Like = Like;