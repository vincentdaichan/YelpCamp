const mongoose = require("mongoose");

// Create Campground Schema

const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

// Create the Model and export it
module.exports = mongoose.model('campground', campgroundSchema);
