const War = require('../models/war');
const Post = require('../models/post');
var moment = require('moment');

const index = (req, res) => {
	War.find({}, (err, wars) => {
		res.json(wars);
	});
};

const getCurrentWar = (req, res) => {
	War.findOne({}).sort('-createdAt')
		.populate('meme1 meme2')
		.exec((err, war) => {
			if (!war || hasExpired(war)) {
				createWar().then(war => res.json(war));
			} else {
				res.json(war);
			}
		});
};

const hasExpired = (war) => {
	const expirationMinutes = 1000 * 5 * 60;
	// let result = moment().diff(war.createdAt);
	// let format = moment(result).format('mm');
	const diff = Date.now() - war.createdAt.getTime();
	if (diff > expirationMinutes) {
		console.log('war is expired');
		return true;
	}
	console.log('war is not expired');
	return false;
};

const getWinningMeme = (war) => {
	return war.meme1pts > war.meme2pts ? war.meme1 : war.meme2;
};

function createWar() {
	var newWar = new War();
	return War.findOne({}).sort('-createdAt')
		.exec()
		.then(war => {
			if (war) {
				newWar.meme1 = getWinningMeme(war);
				return getMeme();
			} else {
				return getMeme()
					.then(meme => {
						newWar.meme1 = meme;
						return getMeme();
					});
			}
		})
		.then(meme => {
			newWar.meme2 = meme;
			return newWar.save();
		})
		.then(newWar => {
			return War.findById(newWar._id).populate('meme1 meme2').exec();
		});
}

function getMeme() {
	return Post.findOne({ used: false })
		.exec()
		.then(post => {
			post.used = true;
			return post.save();
		});
}

const upvote = (req, res) => {
	console.log(req.params);
	War.findOne({}).sort('-createdAt')
		.populate('meme1 meme2')
		.exec((err, war) => {
			if (err) return res.status(400).json('no war to upvote');
			req.params.meme === 'meme1pts' ? war.meme1pts++ : war.meme2pts++;
			war.save()
				.then(war => res.json(war));
			console.log(war);
		});
};

/* 
War.find({}).distinct('meme1').distinct('meme2')
.select('meme1 meme2')
.exec().then(wars => {
	Post({}).where('_id').nin()
}) */


// setInterval(() => {
// 	console.log("interval");
// }, 30000);

const wars = {
	index,
	getCurrentWar,
	upvote
};
module.exports = wars;