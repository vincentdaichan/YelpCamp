const mongoose = require("mongoose");

// Create the Comment schema
const commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"                             // Refers to the model that we are referring to with ID 
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);
