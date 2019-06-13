const mongoose =  require('mongoose')
const Schema = mongoose.Schema

const Comment = new Schema({
     message:String,
     author: { type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Comment',Comment)