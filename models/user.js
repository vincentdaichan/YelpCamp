const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
// create the schema
userSchema = new mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

// Create the user model
module.exports = mongoose.model("User", userSchema);
