const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	image: {type: String, required: true},
	categorie: {
		type: String, 
		required: true, 
		enum: ['Funny', 'Sad', 'U Mad Bro?', '']}
});

module.exports = mongoose.model('Post', postSchema);
