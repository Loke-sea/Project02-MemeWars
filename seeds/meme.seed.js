const mongoose = require("mongoose");
var express = require('express');

require('../app');


const Meme = require("../models/Meme.model");

const memes = [
    {imageUrl:'https://cdn.pocket-lint.com/r/s/1200x/assets/images/152027-apps-news-these-memes-do-not-exist-and-are-made-by-ai-image1-eh5wdqtisy.jpg'}
]

Meme.create(memes)
    .then(memesOnDb => {
        console.log(`We have created ${memesOnDb.length} memes`);
        
    })
    .catch((err) => console.log("Error creating memes", err))