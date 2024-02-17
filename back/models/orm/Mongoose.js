const mongoose = require('mongoose');
// Define the User schema
const userSchema = new mongoose.Schema({
    name: { type:String, required:true },
    age: { type:Number, required:true },
    photo: String,
    timestamp:{ type:Date, default:function(){return new Date()} }
});

// Create (and export) the User model using the schema
module.exports.User = mongoose.model('User', userSchema, 'users');