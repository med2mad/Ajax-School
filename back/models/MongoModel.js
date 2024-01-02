const mongoose = require('mongoose');
// Define the User schema
const userSchema = new mongoose.Schema({
    name: { type:String, required:true, },
    age: Number,
    photo: String,
    timestamp:{ type:Date, default:function(){return new Date()} }
});

// Create the User model using the schema
const UserModel = mongoose.model('User', userSchema, 'users');

console.log('mongoModel again !');

module.exports = UserModel;