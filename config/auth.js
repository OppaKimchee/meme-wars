var User = require('../models/user');

module.exports = function (req, res, next) {
	var user = req.get('userId');
	if (user) {
		req.user = decoded.user;
		next();
	} else {
		next();
	}
};