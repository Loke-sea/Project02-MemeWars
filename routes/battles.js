var express = require('express');
var router = express.Router();

const Battles = require("../models/Battle.model")
const User = require("../models/User.model");
const Attack = require("../models/Attack.model");

// -------- SHOW THE LIST OF BATTLES ----------------

router.route("/battles")

    .get((req, res) => {
        Battles.find()
            .then((battles) => {
                if (req.session.username) {
                    const battleListData = battles.map(battle=>{
                        const pojo = battle.toObject()
                        pojo.isMine = req.session.username._id === battle.owner.toString()
                        return pojo
                        
                    })
                    res.render("battles-list", { battles: battleListData, _id: req.session.username._id, loggedin: true })   
                }
                else res.render("battles-list", { battles, loggedin: false, loggedout: true })
            })
    })


// --------------- CREATE A NEW BATTLE -----------------------

router
    .get("/create-battle", (req, res) => {
        if(!req.session.username) res.redirect("/auth/login")
        const userId = req.session.username._id
        User.findById(userId).populate("memes")
            .then((user) => {
                res.render("create-battle", { user, _id: req.session.username._id })
                
            })
    })
router.post("/create-battle", (req, res) => {
    const { title, imageUrl } = req.body

    Battles.create({ title, imageUrl, owner: req.session.username._id  })
        .then((newBattle) => {
            console.log(newBattle)
            res.redirect(`/battles/battle/${newBattle._id}`)
        })
})

//********DISPLAY BATTLE DETAILS **************/
//********************************************/

router.get("/battle/:id", (req, res) => {
    Battles.findById(req.params.id)
        .populate("attacksArray")
        .then((battle) => {
            battle.attacksArray.sort((a, b) => b.points - a.points)

            if(req.session.username){
                
                User.findById(req.session.username._id)
                .populate("memes")
                .then((user) => {
                    let memesArray = user.memes

                    if (battle.owner.toString() === req.session.username._id) res.render("battle", { battle, memesArray, isowner: true, _id: req.session.username._id, loggedin: true })

                    else res.render("battle", { battle, memesArray, _id: req.session.username._id , loggedin: true})
                })
            }
            else{
                res.render("battle", { battle, loggedout : true})
            }

        })
})

//********DELETE BATTLE **************/
//**********************************/

router.post("/battles/:id/delete", (req, res) => {
    Battles.findByIdAndDelete(req.params.id)
        .then(() => res.redirect("/battles/battles"))
})


router.post("/battle/attack/:id", (req, res) => {
    const battleId = req.params.id
    const imageUrl = req.body.imageUrl
    Attack.create({ imageUrl })
        .then((attack) => {
            Battles.findByIdAndUpdate(battleId, { $push: { attacksArray: attack._id } }, { new: true })
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
router.post("/battle/attack/:id/subtractpoint", (req, res, next) => {
    const attackId = req.params.id
    const battleId = req.body.battleId
    let points
    Attack.findById(attackId)
        .then((attack) => {
            points = attack.points
            points -= 1
        })
        .then(() => {
            Attack.findByIdAndUpdate(attackId, { points }, { new: true })
                .then()
        })
    res.redirect(`/battles/battle/${battleId}`)
})

module.exports = router;