
///PROBANDO PROBANDO///

var express = require('express');
var router = express.Router();

const User = require("../models/User.model")
const Meme = require("../models/Meme.model")
const Api = require("../apis/api");

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

/* GET home page. */
router.get('/', (req, res) => {
  let memesArray
  Meme.find()
    .then((results) => {
      memesArray = results
      shuffle(memesArray)
    })
    .then(() => {
      if (req.session.username === undefined) {
        res.render('index', { memesArray, loggedout: true })
      }
      else {
        // let loggedout = false ------ NO HACE NADA
        res.render('index', { memesArray, _id: req.session.username })
      }
    })
});



/* GET from API */
router.get('/api', (req, res) => {
  Api.getSearch().then((url) => {
    res.render('index', { title: 'Express', users: url })
  }
  );
});

module.exports = router;
