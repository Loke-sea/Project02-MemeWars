const mongoose = require("mongoose");
var express = require('express');

require('../app');


const Meme = require("../models/Meme.model");

const memes = [

   
]

Meme.create(memes)
    .then(memesOnDb => {
        console.log(`We have created ${memesOnDb.length} memes`);
    })
    .catch((err) => console.log("Error creating memes", err))