
var express = require('express');
var router = express.Router();

const User = require("../models/User.model")


router.route("/memers")
    .get((req, res)=>{
        User.find()
        .then((users)=>{
            res.render("memers-list", {users})
        })
    })

module.exports = router;