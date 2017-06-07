const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const warSchema = new Schema({
	meme1: {type: Schema.Types.ObjectId, ref: 'Post'},
	meme2: {type: Schema.Types.ObjectId, ref: 'Post'},
	meme1pts: Number,
	meme2pts: Number,
	winner: {type: Schema.Types.ObjectId, default: null}
}, {
	timestamps: true
});
module.exports = mongoose.model('War', warSchema);
