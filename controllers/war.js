const War = require('../models/war');
const Post = require('../models/post');
var moment = require('moment');

const index = (req, res) => {
	War.find({}, (err, wars) => {
		res.json(wars);
	});
};

const getCurrentWar = (req, res) => {
	War.findOne({}, {}, { sort: { 'created_at': 1 } })
		.populate('meme1 meme2')
		.exec((err, war) => {
			if (err) return res.status(400).json("error getting current war");
			// if no war exists OR war has expired
			//    generate new war and return it
			// else
			//   return war
			if(!war && checkExpiration ){
				return createWar();
			}
			res.json(war);
		});
};

const checkExpiration = (war) => {
	const expirationMinutes = 5;
	let result = moment().diff(war.createdAt);
	let format = moment(result).format('mm');
	if (format > expirationMinutes){
		console.log('war is expired');
		return true;
	}
	console.log('war is not expired');
	return false;
};

// const newWar = (req, res) => {
// 	War.findOne({}, {}, { sort: { 'created_at': 1 } }, (err, war) => {
// 		if (err) return console.log('err');
// 		console.log('?', war)
// 		if (war === null) {
// 			createWar();
// 		} else {
// 			generateNewWarFromPost(war);
// 		}
// 	});
// };


function createWar() {
	// get the last war is there is one
		// if there is a prev war
			// get the winning post assign to meme1
		// else
			// get an unused meme for meme1
		// end if
		// get a post for meme2 assign to meme2
		// create a new war
		// assing meme1 & meme2
		// return war

	Post.find({ used: false }, (err, posts) => {
		if (posts.length < 2) {
			return console.log('not enough memes to war');
		}
		let newWar = new War();
		newWar.meme1 = posts[0]._id;
		newWar.meme2 = posts[1]._id;
		posts[0].used = true;
		posts[1].used = true;
		newWar.save()
			.then((e) => {
				console.log(e)
			})
			.catch(err => {
				console.log('error saving first war');
			});
	});
}

// function generateNewWarFromPost(previousWar) {
// 	Post.find({ used: false }, (err, posts) => {
// 		if (posts.length < 2) {
// 			return console.log('not enough memes to war');
// 		}
// 		let war = new War();

// 	});
// }

// newWar();

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
	getCurrentWar
};
module.exports = wars;