var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");

const User = require("../models/User.model");
const Meme = require("../models/Meme.model");
const fileUploader = require("../config/cloudinary");

router.route("/:id")
.get((req, res)=>{

    const userId = req.params.id
    User.findById(userId).populate("memes")
    .then((user)=>{
        res.render("users/memes", {user})
    })
})

.post(fileUploader.single("imageUrl"), (req, res) => {
    //const name = req.body
    const userId = req.params.id;
    const imageUrl = req.file && req.file.path
    

    Meme
    .create({imageUrl})
    .then((newMeme)=>{
        // console.log("NEW MEME", newMeme);
        const newMemeId = newMeme._id.toString()
        User.findByIdAndUpdate(userId, {$push:{memes : newMemeId}}, {new : true})
        .then(res.redirect(`/users/memes/${userId}`))

    })
})

module.exports = router;