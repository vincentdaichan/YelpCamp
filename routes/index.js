const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// HOME ROUTE - landing page
router.get("/", function(req, res){
    res.render("landing");
});

// AUTH ROUTES
router.get("/register", function(req, res){
    res.render("register");
});

// Handles signup logic when a new user signs up
router.post("/register", function(req, res){
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            console.log(err);
            return res.render("register");
        }
        else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/campgrounds");
            });
        }
    });
});

// SHOW LOGIN FORM
router.get("/login", function(req, res){
    res.render("login");
});

// Handling Login Logic
router.post("/login", passport.authenticate("local",
                    {
                        successRedirect: "/campgrounds",
                        failureRedirect: "/login"
                    }), function(req, res){
    // using passport authenticate middleware for login

});

// LOGOUT ROUTE
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
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
