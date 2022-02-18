const {
    Schema,
    model
} = require('mongoose');

const attackSchema = new Schema({
    owner: String,
    imageUrl: {
        type: String,
        required: true
    },
    points : {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Attack = model('Attack', attackSchema);

module.exports = Attack;
