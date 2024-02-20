const mongoose = require('mongoose');
// Define the User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
    },
    age: {
        type: Number,
        required: true,
        min: [18, 'under aged !'],
        max: [99, 'over aged !'],
    },
    photo: {
        type: String,
        default: ''
    },
    timestamp: { 
        type: Date,
        default: function(){return new Date()},
    }
});

// Create (and export) the User model using the schema
module.exports.User = mongoose.model('User', userSchema, 'users');