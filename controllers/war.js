const War = require('../models/war');
const Post = require('../models/post');

const index = (req, res) => {
	War.find({}, (err, wars) => {
		res.json(wars);
	});
};

getCurrentWar = (req, res) => {
	// War.findOne({}, {}, { sort: { 'created_at': 1 } }, (err, war) => {
	// 	if (err) return res.status(400).json("error getting current war");
	// 	res.json(war);
	// });

	War.findOne({}, {}, { sort: { 'created_at': 1 } })
		.populate('meme1 meme2')
		.exec((err, war) => {
			if (err) return res.status(400).json("error getting current war");
			res.json(war);
		});
};

const createWar = (req, res) => {
	let war = new War(req.body);
	war.save()
		.then(war => {
			res.json(war);
		});
};


const newWar = (req, res) => {
	War.findOne({}, {}, { sort: { 'created_at': 1 } }, (err, war) => {
		if (err) return console.log('err')
		console.log('?', war)
		if (war === null) {
			createFirstWar()
		} else {
			generateNewWarFromPost(war)
		}
	});
};


function createFirstWar() {
	console.log('creating first war');
	Post.find({ used: false }, (err, posts) => {
		if (posts.length < 2) {
			return console.log('not enough memes to war');
		}
		let newWar = new War();
		newWar.meme1 = posts[0]._id;
		newWar.meme2 = posts[1]._id;
		newWar.save()
			.then((e) => {
				console.log(e)
			})
			.catch(err => {
				console.log('error saving first war');
			})
	});
}

function generateNewWarFromPost(previousWar) {
	Post.find({ used: false }, (err, posts) => {
		if (posts.length < 2) {
			return console.log('not enough memes to war');
		}
		let war = new War();

	})
}

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
	createWar,
	getCurrentWar
};
module.exports = wars;