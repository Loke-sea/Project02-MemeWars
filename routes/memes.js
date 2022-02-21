var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");

const User = require("../models/User.model");
const Meme = require("../models/Meme.model");

router.route("/:id")
.get((req, res)=>{
    const id = req.params.id
    User.findById(id)
    
    .then((user)=>{
        console.log(user)
        
        res.render("users/memes", {user})
    })
})

.post((req, res)=>{
    
    const id = req.params.id;
    const {name, imageUrl} = req.body
    Meme.create({name, imageUrl})
    .then((user)=>{
        
        res.render("users/memes", {user})
    })


})




module.exports = router;