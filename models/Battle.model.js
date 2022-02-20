const {
    Schema,
    model
} = require('mongoose');

const battleSchema = new Schema({
    owner: String,
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    attacksArray: [{type: Schema.Types.ObjectId, ref:"Attack"}],
}, {
    timestamps: true
});

const Battle = model('Battle', battleSchema);

module.exports = Battle;
