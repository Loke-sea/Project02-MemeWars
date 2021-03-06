
var express = require('express');
var router = express.Router();

const User = require("../models/User.model")


router.route("/memers")
    .get((req, res)=>{
        User.find()
        .then((users)=>{
            if(req.session.username) res.render("memers-list", {users, _id: req.session.username._id})
            else res.render("memers-list", {users, loggedout: true})
        })
    })

module.exports = router;