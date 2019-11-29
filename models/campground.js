const mongoose = require("mongoose");

// Create Campground Schema

const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// Create the Model and export it
module.exports = mongoose.model('Campground', campgroundSchema);
