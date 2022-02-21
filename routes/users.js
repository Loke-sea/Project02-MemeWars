var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");

const User = require("../models/User.model");

const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");


// ***************** SHOW PROFILE *************** //
//************************************************************* //

router
.get("/profile/:id", (req, res)=>{
    const id = req.params.id
    User.findById(id)
    
    .then((user)=>{
        //console.log(req.params.id)
        res.render("users/profile", {user})
    })
})

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

.post((req, res)=>{
    const id = req.params.id;
    const {username, email, description} = req.body;

    User.findByIdAndUpdate(id,
        {username, email, description}, 
        {new:true}
        )
        .then(()=>{
            res.redirect(`/users/profile/${id}`)
        })
})

// ***************** SHOW A USER'S LIST OF MEMES *************** //
//************************************************************* //





module.exports = router;