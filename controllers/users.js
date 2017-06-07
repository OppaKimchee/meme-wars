const User = require('../models/user');

authed = (req, res) => {
	User.findOne({ authId: req.body.authId })
		.exec()
		.then(user => {
			if(user){
				console.log('found user', user)
				return res.json(user);
			} else {
				let user = new User(req.body);
				user.save().then(response => {
					res.json(user);
				});
			}
		});
};

module.exports = {
	authed
};