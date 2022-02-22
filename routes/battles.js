var express = require('express');
var router = express.Router();

const Battles = require("../models/Battle.model")
const User = require("../models/User.model");

// -------- SHOW THE LIST OF BATTLES ----------------
router.route("/battles")
    .get((req, res)=>{
       Battles.find()
        .then((battles)=>{
            res.render("battles-list", {battles, _id: req.session.username._id})
        })
    })

// --------------- CREATE A NEW BATTLE
router
.get("/create-battle", (req, res)=>{
    const userId = req.session.username._id
    User.findById(userId).populate("memes")
    .then((user)=>{
        res.render("create-battle", {user})
    })
})
router.post("/create-battle", (req, res)=>{
    const {title, imageUrl} = req.body
    Battles.create({title, imageUrl})
    .then((newBattle)=> {
        const newBattleString = newBattle._id.toString()
        res.redirect(`/battles/battle/${newBattleString}`)
    })
})

// ---------------- DISPLAY A BATTLE DETAILS

router.get("/battle/:id", (req, res)=>{
    const id = req.params.id
    Battles.findById(id)
    .then((battle)=>{
        res.render("battle", {battle})
    })
})


//********DELETE BATTLE **************/
//**********************************/

router.post("/battles/delete/:id", (req, res)=>{
    const id = req.params.id
    Battles.findByIdAndDelete(id)
    .then(()=> res.redirect("/battles/battles"))
})


module.exports = router;