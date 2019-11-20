/*jshint esversion:6 */

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require('ejs');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static('public'));


mongoose.connect("mongodb://localhost:27017/campDB", {useNewUrlParser: true, useUnifiedTopology: true});

// Create Campground Schema

const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

// Create the Model
const Campground = mongoose.model('campground', campgroundSchema);



// ----------- ROUTES ----------------------

// HOME ROUTE - landing page
app.get("/", function(req, res){
    res.render("landing");
});

// INDEX ROUTE - list all campgrounds
app.get("/campgrounds", function(req, res) {

    Campground.find({}, function(err, camps){
        if (err) {
            console.log("Error loading Camps");
            console.log(err);
        } else {
            console.log("Sucessfully loaded campsDB");
            console.log(camps);
            res.render("campgrounds", {campgrounds: camps});
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
    res.render("new.ejs");
});

// SHOW ROUTE - show info about one specific campground

app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {camp: foundCampground});
        }
    });
});


app.listen(3000, function(){
    console.log("YelpCamp Server started on port 3000");
});
