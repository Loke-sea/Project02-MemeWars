var express = require("express");
var router = express.Router();

const mongoose = require("mongoose");

const User = require("../models/User.model");

const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");
const fileUploader = require("../config/cloudinary");

// ***************** SHOW PROFILE *************** //
//************************************************************* //

router.get("/profile/:id", (req, res) => {
  const id = req.params.id;
  User.findById(id).then((user) => {
    res.render("users/profile", {user, _id: req.session.username._id});
  });
});

router
.get("/profile", (req, res)=>{
    res.redirect("/")
})

// ***************** EDIT PROFILE *************** //
//************************************************************* //


router.route("/profile/edit/:id")
.get((req, res)=>{
    const id = req.params.id
    User.findById(id)
    .then((user)=>{
        res.render("users/edit-profile", {user})
    })
})

.post(fileUploader.single("profilePic"), (req, res) => {
    const id = req.params.id;
    const { username, email, description } = req.body;
    const profilePic = req.file && req.file.path
    User.findByIdAndUpdate(
      id,
      { username, email, description, profilePic} ,
      { new: true }
    ).then((user) => {
        //console.log("newPic", imgUrl)
      res.render("users/profile", {user});
    });
  });

module.exports = router;



