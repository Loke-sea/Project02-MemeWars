
///PROBANDO PROBANDO///

var express = require('express');
var router = express.Router();

const User = require("../models/User.model")
const Api = require("../apis/api");

//const isLoggedOut = require('../middleware/isLoggedOut');
//const isLoggedIn = require("../middleware/isLoggedIn")

/* GET home page. */
router.get('/', (req, res)=> {
  if(req.session.username === undefined){
    res.render('index', {loggedout: true})
  }
  else{
    // let loggedout = false ------ NO HACE NADA
    res.render('index', req.session.username)
   } 
});



/* GET from API */
router.get('/api', (req, res)=> {
  Api.getSearch().then((url)=>{
    res.render('index', { title: 'Express', users: url})
  }
);
});

module.exports = router;
