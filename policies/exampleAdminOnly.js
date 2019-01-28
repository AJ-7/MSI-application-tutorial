var _ = require('underscore');


module.exports = function(req, res, next) {
	
	function unauthorized() {
		return res.unauthorized({
			code: 401, 
			title: "Not authorized",
			message: "You are not authorized to access this resource. You must be a member of appropriate group to perform this action. Please contact system administrator for resolultion."
		});
	}

	// determine if this is a json request
	req.wantsJSON = req.xhr;
	req.wantsJSON = req.wantsJSON || req.isSocket;
	req.wantsJSON = req.wantsJSON || !req.explicitlyAcceptsHTML;
	req.wantsJSON = req.wantsJSON || (req.is('json') && req.get('Accept'));
	req.wantsJSON = req.wantsJSON || req.options.wantsJSON;
	if (req.wantsJSON === undefined) {
		req.wantsJSON = false;
	}
		
	var user = req.session.user;
	
	if (user.role == "sysadmin" || _.contains(user.roleChain, "example-admin"))
		return next();
	
	return unauthorized();
};
