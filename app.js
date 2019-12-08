/*jshint esversion:6 */

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const passport = require("passport");
const LocalStrategy = require("passport-local");


const Campground = require("./models/campground");
const Comment = require("./models/comment");
const User = require("./models/user");
const seedDB = require("./seeds");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//app.use(express.static('public'));


mongoose.connect("mongodb://localhost:27017/campDB", {useNewUrlParser: true, useUnifiedTopology: true});

// ----------- ROUTES ----------------------

// HOME ROUTE - landing page
app.get("/", function(req, res){
    res.render("landing");
});

// INDEX ROUTE - list all campgrounds
app.get("/campgrounds", function(req, res) {

    Campground.find({}, function(err, campgrounds){
        if (err) {
            console.log("Error loading Camp");
            console.log(err);
        } else {
            console.log("Sucessfully loaded campDB");
            console.log(campgrounds);
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });

});
// CREATE ROUTE - create a new campground
app.post("/campgrounds", function(req, res){
    let campName = req.body.name;
    let campImage = req.body.image;
    let campDescription = req.body.description;
    let newCampground = {name: campName, image: campImage, description: campDescription};

    const newCamp = new Campground(newCampground);

    newCamp.save(function(err, camp){
        if (err){
            console.log("Something went wrong saving to DB");
            console.log(err);
        } else {
            console.log("Sucessfully added a new camp");
            console.log(camp);
        }
    });
    res.redirect("/campgrounds");
});

// NEW ROUTE - shows form to create a campground
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

// SHOW ROUTE - show info about one specific campground

app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// ------------ COMMENTS ROUTE -----------------------------

app.get("/campgrounds/:id/comments/new", function(req, res) {

    // Find campground by ID
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
        }
        else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
    // lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if (err) {
                    console.log(err);
                }
                else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+ campground._id);
                }
            });
        }
    });
});

app.listen(3000, function(){
    console.log("YelpCamp Server started on port 3000");
});
