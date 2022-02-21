const {
    Schema,
    model
} = require('mongoose');

const memeSchema = new Schema({
    
    // name: {
    //     type: String,
    //     default: "Meme"
    // },
    battles: [],
    imageUrl: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Meme = model('Meme', memeSchema);

module.exports = Meme;