const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	image: {type: String, required: true},
	category: {
		type: String, 
		required: true, 
		enum: ['Funny', 'Sad', 'U Mad Bro?', 'Cute']
	},
	rating: 0
});

module.exports = mongoose.model('Post', postSchema);
