const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
// INDEX ROUTE - list all campgrounds
router.get("/", function(req, res) {
    console.log(req.user);

    // Get all campgrounds from database
    Campground.find({}, function(err, campgrounds){
        if (err) {
            console.log("Error loading Camp");
            console.log(err);
        } else {
            console.log("Sucessfully loaded campDB");
            console.log(campgrounds);
            res.render("campgrounds/index", {campgrounds: campgrounds, currentUser: req.user});
        }
    });

});
// CREATE ROUTE - create a new campground
router.post("/", function(req, res){
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
router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

// SHOW ROUTE - show info about one specific campground

router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

module.exports = router;
