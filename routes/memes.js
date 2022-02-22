var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");

const User = require("../models/User.model");
const Meme = require("../models/Meme.model");
const fileUploader = require("../config/cloudinary");


//***********CREATE MEME******************* */
//***************************************** */

router.route("/:id")
.get((req, res)=>{
    const userId = req.params.id

    // CHECK IF THERE IS SESSION
    if(req.session.username){
        User.findById(userId).populate("memes")
        .then((user)=>{
        if(userId === req.session.username._id){
                res.render("users/memes", {user, isuser : true, _id: req.session.username._id})
        }else{

                res.render("users/memes", {user, isuser : false, _id: req.session.username._id})
            }
        })
    }
    // REDIRECTS TO COLLECTIONS IF NOT LOGGED IN
    else{
        User.findById(userId).populate("memes")
        .then((user)=>{
            res.render("users/memes", {user, isuser : false})
        })
    }

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

//***********DELETE MEME******************* */
//***************************************** */

router.post("/:id/delete", (req, res)=>{
    const id = req.params.id
    const userId = req.session.username._id
    console.log("UserID", userId);
    Meme.findByIdAndDelete(id)
    .then(res.redirect(`/users/memes/${userId}`))
})


module.exports = router;