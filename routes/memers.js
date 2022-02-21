
var express = require('express');
var router = express.Router();

const User = require("../models/User.model")


router.route("/memers")
    .get((req, res)=>{
        let session = req.session.username._id
        console.log(session)
        User.find()
        .then((users)=>{
            res.render("memers-list", {users})
        })
    })

module.exports = router;