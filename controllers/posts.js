const Post = require('../models/post');

index = (req, res) => {
	Post.find({}, (err, posts) => {
		res.json(posts);
	});
};

submit = (req, res) => {
	var post = new Post(req.body);
	post.user = req.user._id;
	post.save()
	.then(post => {
		console.log(post)
		res.json(post);
	});
};


search = (req, res) => {
	Post.find({ user: req.body.userId })
	.exec()
	.then(post => res.json(post));
};

const posts = {
	index,
	submit
};


module.exports = posts;