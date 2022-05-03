const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  userId: String,
  like: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City'
  }
})

const Like = mongoose.model('Like', likeSchema);

exports.Like = Like;