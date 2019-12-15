const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");

// Comments NEW
router.get("/new", isLoggedIn, function(req, res) {

    // Find campground by ID
    console.log(req.params.id);
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
        }
        else {
            res.render("comments/new", {campground: campground});
        }
    });
});

// Comments Save
router.post("/", isLoggedIn, function(req, res){
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
