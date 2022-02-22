var express = require('express');
var router = express.Router();

const Battles = require("../models/Battle.model")
const User = require("../models/User.model");
const Attack = require("../models/Attack.model");

// -------- SHOW THE LIST OF BATTLES ----------------
router.route("/battles")

    .get((req, res)=>{
       Battles.find()
        .then((battles)=>{
            if(req.session.username) res.render("battles-list", {battles, _id: req.session.username._id})
            else res.render("battles-list", {battles, loggedout: true})
        })
    })

// --------------- CREATE A NEW BATTLE
router
    .get("/create-battle", (req, res) => {
        const userId = req.session.username._id
        User.findById(userId).populate("memes")
            .then((user) => {
                res.render("create-battle", { user })
            })
    })
router.post("/create-battle", (req, res) => {
    let owner = req.session.username._id
    const { title, imageUrl } = req.body

    Battles.create({ title, imageUrl, owner })
        .then((newBattle) => {
            const newBattleString = newBattle._id.toString()
            res.redirect(`/battles/battle/${newBattleString}`)
        })
})

// ---------------- DISPLAY A BATTLE DETAILS

router.get("/battle/:id", (req, res) => {
    const id = req.params.id
    const userId = req.session.username._id
    Battles.findById(id)
        .populate("attacksArray")
        .then((battle) => {
            battle.attacksArray.sort((a, b) => b.points - a.points)

            User.findById(userId)
                .populate("memes")
                .then((user) => {
                    let memesArray = user.memes
                    if (battle.owner === req.session.username._id) res.render("battle", { battle, memesArray, isowner: true })
                    else res.render("battle", { battle, memesArray })
                })

        })
})

//********DELETE BATTLE **************/
//**********************************/

router.post("/battles/:id/delete", (req, res) => {
    const id = req.params.id
    Battles.findByIdAndDelete(id)
        .then(() => res.redirect("/battles/battles"))
})


router.post("/battle/attack/:id", (req, res) => {
    const battleId = req.params.id
    const imageUrl = req.body.imageUrl
    Attack.create({ imageUrl })
        .then((attack) => {
            Battles.findByIdAndUpdate(battleId, { $push: { attacksArray: attack } }, { new: true })
                .then(res.redirect(`/battles/battle/${battleId}`))
        })
})

router.post("/battle/attack/:id/addpoint", (req, res) => {
    const attackId = req.params.id
    const battleId = req.body.battleId
    let points
    Attack.findById(attackId)
        .then((attack) => {
            points = attack.points
            points += 1
        })
        .then(() => {
            Attack.findByIdAndUpdate(attackId, { points }, { new: true })
                .then((object) => console.log(object))
        })
    res.redirect(`/battles/battle/${battleId}`)
})


module.exports = router;