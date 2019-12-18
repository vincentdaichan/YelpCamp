/*jshint esversion:6 */

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");


const Campground = require("./models/campground");
const Comment = require("./models/comment");
const User = require("./models/user");
const seedDB = require("./seeds");

// Requiring Routes
const commentRoutes = require("./routes/comments");
const campgroundRoutes = require("./routes/campgrounds");
const indexRoutes = require("./routes/index");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/campDB", {useNewUrlParser: true, useUnifiedTopology: true});
// Seed the database
//seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "A secret that cannot be shared.",
    resave: false,
    saveUninitialized: false
}));



app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// ----------- ROUTES ----------------------
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(3000, function(){
    console.log("YelpCamp Server started on port 3000");
});
