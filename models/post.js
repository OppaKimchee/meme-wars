const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	name: String,
	image: {type: String, required: true},
	category: {
		type: String, 
		required: true, 
		enum: ['Funny', 'Sad', 'U Mad Bro?', 'Cute']
	},
	user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
	timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
