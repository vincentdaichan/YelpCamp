/* jshint esversion:6 */
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
router.post("/", isLoggedIn, function(req, res){
    let campName = req.body.name;
    let campImage = req.body.image;
    let campDescription = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    };
    let newCampground = {name: campName, image: campImage, description: campDescription, author: author};

    const newCamp = new Campground(newCampground);

    newCamp.save(function(err, camp){
        if (err){
            console.log("Something went wrong saving to DB");
            console.log(err);
        } else {
            console.log("Sucessfully added a new camp");
            console.log(camp);
            res.redirect("/campgrounds");
        }
    });
});

// NEW ROUTE - shows form to create a campground
router.get("/new", isLoggedIn, function(req, res){
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

// EDIT CAMPGROUND - display update campground form
router.get("/:id/edit", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });

});

// UPDATE CAMPGROUND - get the form data from EDIT and update the campground
router.put("/:id", function(req, res){
    campgroundData = {
        name: req.body.campground.name,
        image: req.body.campground.image,
        description: req.body.campground.description
    };
    // Find and update the particular campground
    Campground.findByIdAndUpdate(req.params.id, campgroundData, function(err, updatedCampground){
        if (err) {
            console.log(err);
            res.redirect("/campgrounds/");
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    // redirect somewhere (show page)
});

// DESTROY Campground - remove the particular campground
router.delete("/:id", function(req, res){
    console.log("Trying to delete");

    Campground.findByIdAndRemove(req.params.id , function(err){
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});
// Middleware
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    else {
        res.redirect("/login");
    }
}


module.exports = router;
