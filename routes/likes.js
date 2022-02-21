var express = require('express');
var router = express.Router();

const User = require("../models/User.model")
const Meme = require("../models/Meme.model")
const Api = require("../apis/api");

router.post('/add/:id', (req, res) => {
    const url = req.body.imageUrl
    const userId = req.session.username._id
    Meme.create({imageUrl: url})
    .then((newMeme)=>{
        const newMemeId = newMeme._id.toString();
        User
        .findByIdAndUpdate(userId, {$push:{memes: newMemeId}}, {new:true})

        .then(res.redirect("/"))     
    })
})

module.exports = router