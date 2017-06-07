var User = require('../models/user');

module.exports = function (req, res, next) {
	var user = req.get('UserId');
	if (user) {
		User.findById(user)
			.then(user => {
				req.user = user;
				next();
			});
	} else {
		next();
	}
};