const mongoose = require('mongoose');
// Define the Profile schema
const profileSchema = new mongoose.Schema({
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

// Create (and export) the Profile model using the schema
module.exports.Profile = mongoose.model('Profile', profileSchema, 'profiles');