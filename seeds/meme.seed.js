const mongoose = require("mongoose");
var express = require('express');

require('../app');


const Meme = require("../models/Meme.model");

const memes = [
    {imageUrl: 'https://i.pinimg.com/originals/79/f4/70/79f470a39dbe014b6b70a9de2981bf93.jpg'}
   
]

Meme.create(memes)
    .then(memesOnDb => {
        console.log(`We have created ${memesOnDb.length} memes`);
    })
    .catch((err) => console.log("Error creating memes", err))