/* jshint esversion:6 */

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
                    // Add username and id to comments, then save comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //console.log("New comment's username will be: " + req.user.username);
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+ campground._id);
                }
            });
        }
    });
});
// COMMENT EDIT ROUTE - shows form to edit comment
router.get("/:comment_id/edit", function(req,res){

    Comment.findById(req.params.comment_id, function(err, foundComment){
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});
// COMMENT UPDATE
router.put("/:comment_id", function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
            if (err) {
                res.redirect("back");
            } else {
                res.redirect("/campgrounds/" + req.params.id);
            }
    });


});

// COMMENT DESTROY
router.delete("/:comment_id", function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
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
