var express = require('express');
var router = express.Router();

const User = require("../models/User.model")
const Meme = require("../models/Meme.model")
const Api = require("../apis/api");

router.post('/add/:url', (req, res) => {
    const url = req.body.imageUrl
    const userId = req.session.username._id
    Meme.create({imageUrl: url})
    .then(User.findByIdAndUpdate(userId, {$push:{memes: url}}))
    .then(res.redirect("/")) 
    // Meme.create({ imageUrl: url
 
    //     .then(() => res.redirect(url))
})

module.exports = router