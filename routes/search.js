
var express = require('express');
var router = express.Router();
const Api = require("../apis/api")

router.get("/", (req,res)=>{
    const keywords = req.query.keywords
    Api.getSearch(keywords)
    .then((objectResult)=>{
        
        resultsArray = objectResult.data.memes;

        if(req.session.username === undefined) {
            
            res.render('search-results', {resultsArray})

        }else{
            
            res.render('search-results', {resultsArray, loggedin : true}) 
        } 
    })
})

module.exports = router;


