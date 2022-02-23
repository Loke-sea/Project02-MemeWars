var express = require("express");
var router = express.Router();

const mongoose = require("mongoose");

const User = require("../models/User.model");
const Battles = require("../models/Battle.model")

const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");
const fileUploader = require("../config/cloudinary");

// ***************** SHOW PROFILE *************** //
//************************************************************* //

router.get("/profile/:id", (req, res) => {
  const id = req.params.id;

  if (req.session.username) {
    User.findById(id).then((user) => {
      if (id === req.session.username._id)
        res.render("users/profile", { user, _id: id });
      //->
      else
        res.render("users/profile", {
          user,
          nouser: true,
          _id: req.session.username._id,
        });
    });
  } else {
    User.findById(id).then((user) => {
      res.render("users/profile", { user, nouser: true, _id: null, loggedout: true });
    });
  }
});

router.get("/profile", (req, res) => {
  res.redirect("/");
});

// ***************** DISPLAY BATTLES OF A USER *****************
//************************************************************* //

router.get("/battles/:id", (req, res)=>{
  const id = req.params.id
  Battles.find({owner: id})
      .then((battles)=>{
        console.log("inside battle callback", battles)
        if(req.session.username) res.render("users/my-battles", {battles, _id: req.session.username._id})
        else res.redirect("/auth/login")
      })
})

// ***************** DELETE PROFILE *************** //
//************************************************************* //

router.post("/profile/:id/delete/", (req, res) => {
  //->
  const id = req.params.id;

  User.findByIdAndDelete(id).then(() => {
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .render("../logout", { errorMessage: err.message });
      }
      res.redirect("/");
    });
  });
});

// ***************** EDIT PROFILE *************** //
//********************************************** //

router
  .route("/profile/edit/:id")
  .get(isLoggedIn, (req, res) => {
    const id = req.params.id;
    if (id === req.session.username._id) {
      User.findById(id).then((user) => {
        res.render("users/edit-profile", {
          user,
          _id: req.session.username._id,
        });
      });
    }
  })

  .post(fileUploader.single("profilePic"), (req, res) => {
    const id = req.params.id;
    const { username, email, description } = req.body;
    const profilePic = req.file && req.file.path;
    User.findByIdAndUpdate(
      id,
      { username, email, description, profilePic },
      { new: true }
    ).then((user) => {
      //console.log("newPic", imgUrl)
      res.render("users/profile", { user });
    });
  });

module.exports = router;
