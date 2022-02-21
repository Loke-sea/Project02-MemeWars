var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");

const User = require("../models/User.model");
const Meme = require("../models/Meme.model");

router.route("/:id")
.get((req, res)=>{
    const id = req.params.id
    User.findById(id).populate("memes")
    
    .then((user)=>{
        console.log(user)
        
        res.render("users/memes", {user})
    })
})

.post((req, res)=>{
    
    const userId = req.params.id;
    const {name, imageUrl} = req.body
    Meme
    .create({name, imageUrl})
    .then((newMeme)=>{
        const newMemeId = newMeme._id.toString();
        User
        .findByIdAndUpdate(userId, {$push:{memes: newMemeId}}, {new:true})
        //.populate("Meme")
        .then(res.redirect(`/users/memes/${userId}`))
        
    })


})




module.exports = router;