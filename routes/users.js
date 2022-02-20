var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");

const User = require("../models/User.model");

const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");


//*****PROFILE********/
router
.get("/profile/:id",(req, res)=>{
    const id = req.params.id
    User.findById(id)
    .then((user)=>{
        res.render("users/profile", {user})
    })
})


//*****EDIT PROFILE***********/

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




module.exports = router;