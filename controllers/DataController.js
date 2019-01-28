const fs = require('fs')
const sql = require('msnodesqlv8');
const settings = require('../config/settings');
const http = require('request');
const _ = require('underscore');
const async = require('async');
var started = null;

var internal = {
	isAdmin: function(user) {
		if (user.role == "sysadmin")
			return true;
		
		if (_.contains(user.roleChain, "lpx-ar-admin")) {
			return true;
		}
		
		return false;
	}
};

module.exports = {	

	user: function(req, res) {
		res.json({user: req.session.user});
	}
	
};

