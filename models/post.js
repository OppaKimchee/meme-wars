const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	image: {type: String, required: true},
	category: {
		type: String, 
		required: true, 
		enum: ['Funny', 'Sad', 'U Mad Bro?', 'Cute']
	},
	vote: 0,
	user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
	timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
