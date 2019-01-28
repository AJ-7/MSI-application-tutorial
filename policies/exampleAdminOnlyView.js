var _ = require('underscore');


module.exports = function(req, res, next) {
	
	var user = req.session.user;
	if (user.role == "sysadmin" || _.contains(user.roleChain, "example-admin"))
		return next();
	
	return res.view('403', {
		layout: 'layout'
	});
};
