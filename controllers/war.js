const War = require('../models/war');

const index = (req, res) => {
	War.find({}, (err, wars) => {
		res.json(wars);
	});
};

const createWar = (req, res) => {
	let war = new War(req.body);
	war.save()
		.then(war => {
			res.json(war);
		});
};

const wars = {
	index,
	createWar
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

module.exports = wars;