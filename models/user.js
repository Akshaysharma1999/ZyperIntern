const mongoose =  require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({

    name:{type:String,default:''},
    email:{
        type:String,
        unique:true,    
        lowercase:true  
    },
    phoneNum:{
        type:Number,
        unique:true
    },
    designation:String,
    address:String,
    interests:[{
        required:true,
        type:String
    }],
    comments: { type: [Schema.Types.ObjectId], ref: 'Comment' },

})

module.exports = mongoose.model('User',User)