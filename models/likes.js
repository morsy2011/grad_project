const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  userId: String,
  like: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resturant'
  }
})

const Like = mongoose.model('Like', likeSchema);

exports.Like = Like;