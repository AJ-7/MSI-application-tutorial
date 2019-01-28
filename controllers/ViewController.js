/**
* View controller used for core UI functionality. Returns EJS views from the specified directory along with the context (ex.: user).
*
* @class MainViewController
* @module controllers
*/

var settings = require('../config/settings');

module.exports = {	

	home: function(req, res) {
		res.view(req.applicationId + '/home', {
			title: "AR Configuration", 
			layout: req.applicationId + '/layout',
			envrionment: settings.envrionment
		});
	}, 


	/**
	* Renders EJS view and returns generated template to the caller. The view template accessed via GET request to /views/:name, specified in "route.js" file 
	* of the core application code.
	*
	* @method displayPartialView
	* @return Returns generated EJS template.
	* @async
	*/
	displayPartialView: function(req, res) {
		var viewPath = req.applicationId + '/views/' + req.params.name;
		console.log(viewPath);
		res.view(viewPath, {
			layout: false,
			user: req.session.user
		});
	}, 
	
	data: function(req, res) {
		res.json({ok:"ok"});
	}
};

