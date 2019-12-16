/* jshint esversion:6 */
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

let data = [
    {
        name: "Mountain Lake",
        image: "https://images.unsplash.com/photo-1574624046652-f6513419e6f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        description: "Id aliquet lectus proin nibh nisl condimentum. Tristique senectus et netus et malesuada fames. Volutpat commodo sed egestas egestas fringilla. Diam in arcu cursus euismod quis viverra nibh cras pulvinar. Lorem ipsum dolor sit amet. Tempus egestas sed sed risus pretium quam vulputate."
    },
    {
        name: "Prairie Lands",
        image: "https://images.unsplash.com/photo-1466133633688-187f0b492390?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80",
        description: "Volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Nisl suscipit adipiscing bibendum est ultricies integer quis auctor. Duis ultricies lacus sed turpis tincidunt. Egestas integer eget aliquet nibh praesent tristique magna sit. Nunc congue nisi vitae suscipit. A diam sollicitudin tempor id eu nisl. Egestas congue quisque egestas diam in arcu cursus euismod quis."
    },
    {
        name: "Snowland",
        image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=795&q=80",
        description: "Condimentum mattis pellentesque id nibh tortor id aliquet lectus proin. Blandit cursus risus at ultrices mi tempus. Viverra aliquet eget sit amet tellus cras adipiscing enim eu. Viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas. Gravida neque convallis a cras semper auctor. Nunc sed velit dignissim sodales ut eu sem integer vitae."
    }
];

function seedDB() {
    Campground.remove({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("Removed campgrounds");
            // Add some default campgrounds
            // data.forEach(function(seed){
            //     Campground.create(seed, function(err, campground){
            //         if (err){
            //             console.log(err);
            //         } else {
            //             console.log("Added a campground.");
            //             // Create a comment
            //             Comment.create({
            //                 text: "This is a great place, but I wish there was WiFi :(",
            //                 author: "Homer"
            //             }, function(err, comment){
            //                 if (err) {
            //                     console.log(err);
            //                 } else {
            //
            //                 } campground.comments.push(comment);
            //                 campground.save();
            //                 console.log("Created a comment");
            //             }); // End create comment
            //
            //         }
            //     });
            // });
        }
    });
}

module.exports = seedDB;
