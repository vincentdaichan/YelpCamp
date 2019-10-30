/*jshint esversion:6 */

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require('ejs');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017/campDB", {useNewUrlParser: true});

// Create Camp Schema

const campSchema = new mongoose.Schema({
    name: String,
    image: String
});

// Create the Model
const Camp = mongoose.model('Camp', campSchema);



// let campgroundsArr = [
//     {name: "Salmon Creek", image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
//     {name: "TheShwa", image: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?cs=srgb&dl=adventure-camping-grass-1687845.jpg&fm=jpg"},
//     {name: "Missagwa", image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1395&q=80"}
// ];

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {


    res.render("campgrounds", {campgrounds: campgroundsArr});



});

app.post("/campgrounds", function(req, res){
    let campName = req.body.name;
    let campImage = req.body.image;
    let newCampground = {name: campName, image: campImage}

    const newCamp = new Camp({
        name: campName,
        image: campImage
    });

    newCamp.save(function(err, camp){
        if (err){
            console.log("Something went wrong saving to DB");
            console.log(err);
        } else {
            console.log("Sucessfully added a new camp");
            console.log(camp);
        }
    });
    // campgroundsArr.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});


app.listen(3000, function(){
    console.log("YelpCamp Server started on port 3000");
});
