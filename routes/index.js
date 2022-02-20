
///PROBANDO PROBANDO///

var express = require('express');
var router = express.Router();

const User = require("../models/User.model")
const Api = require("../apis/api");

//const isLoggedOut = require('../middleware/isLoggedOut');
//const isLoggedIn = require("../middleware/isLoggedIn")

/* GET home page. */
router.get('/', (req, res)=> {
  
  res.render('index')
});

/* GET from API */
router.get('/api', (req, res)=> {
  Api.getSearch().then((url)=>{
    res.render('index', { title: 'Express', users: url})
  }
);
});

module.exports = router;
