var express = require('express');
var router = express.Router();

const Battles = require("../models/Battle.model")

// -------- SHOW THE LIST OF BATTLES ----------------
router.route("/battles")
    .get((req, res)=>{
       Battles.find()
        .then((battles)=>{
            console.log(battles)
            res.render("battles-list", {battles})
        })
    })

// --------------- CREATE A NEW BATTLE
router.get("/create-battle", (req, res)=>{
    res.render("create-battle")
})
router.post("/create-battle", (req, res)=>{
    const {title, imageUrl} = req.body
    Battles.create({title, imageUrl})
    .then(()=> res.redirect("/battles/battles"))
})

// ---------------- DISPLAY A BATTLE DETAILS

router.get("/battle/:id", (req, res)=>{
    console.log("hello")
    const id = req.params.id
    Battles.findById(id)
    .then((battle)=>{
        res.render("battle", {battle})
    })
})

module.exports = router;