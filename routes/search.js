
var express = require('express');
var router = express.Router();
const Api = require("../apis/api")

router.post("/", (req,res)=>{
    const keywords = req.body.search
    res.redirect(`search/${keywords}`)
})

router.get("/:search", (req, res)=>{
    const serachParams = req.params.search
    Api.getSearch(serachParams)
    .then((objectResult)=>{
        resultsArray = objectResult.data.memes;
        res.render('search-results', {resultsArray})
    })
})

module.exports = router;


