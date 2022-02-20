const {
	Schema,
	model
} = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	profilePic: {
		type: String
	},
	description: {
		type: String
	},
	memes: [{
		type: Schema.Types.ObjectId, ref: "Meme" 
	}]
}, 
{
	timestamps: true
});

const User = model('User', userSchema);

module.exports = User;