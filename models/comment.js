/* jshint esversion:6 */

const mongoose = require("mongoose");

// Create the Comment schema
const commentSchema = new mongoose.Schema({
    text: String,
    author: String
});

module.exports = mongoose.model("Comment", commentSchema);
