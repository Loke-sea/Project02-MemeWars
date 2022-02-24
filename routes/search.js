
var express = require('express');
var router = express.Router();
const Api = require("../apis/api")

router.get("/", (req,res)=>{
    const keywords = req.query.keywords
    Api.getSearch(keywords)
    .then((objectResult)=>{
        
        resultsArray = objectResult.data.memes;

        
        
        if(req.session.username === undefined) {

            if(resultsArray.length === 0) res.render ('search-results', {resultsArray, loggedout : true, noresults : true})
            else res.render('search-results', {resultsArray, loggedout : true})
            
    
        }else{

            if(resultsArray.length === 0) res.render ('search-results', {resultsArray, loggedin : true, noresults : true}) 
            else res.render('search-results', {resultsArray, loggedin : true}) 
        } 

        

    })
})

module.exports = router;


