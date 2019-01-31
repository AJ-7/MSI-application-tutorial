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
	},
	
	findElement: function(req, res) {
		var q = req.query.q;
		var start = req.query.start || '0';
		
		var wild = q.split('*');
		if (wild.length > 2) {
			q = "";
			wild.forEach(function(w) {
				if (w.length > 0) {
					q += "*" + w + "* AND namepath:";
				}
			});
				
			q = q.substr(0, q.length - 14);
		}
		
		var url = settings.serviceConfig.indexServer + '/solr/element/select?q=namepath:' + q + '&indent=on&wt=json&rows=10&start=' + start;
		//console.log(url);
		http.get(url,function(err,resultData){
			var solrData = JSON.parse(resultData.body);   
			return res.json(solrData);
		});  
	 },
	 
	 
	findElementByParent: function(req, res) {
		var q = req.query.q;
		var start = req.query.start || '0';
		var url = settings.serviceConfig.indexServer + '/solr/element/select?q=parentid:' + q + '&indent=on&wt=json&rows=10&start=' + start;
		//console.log(url);
		http.get(url,function(err,resultData){
			var solrData = JSON.parse(resultData.body);   
			return res.json(solrData);
		});  
	},

	findElementAttributesById: function(req, res) {
		var q = req.query.q;
		var url = settings.serviceConfig.indexServer + '/solr/elementattribute/select?q=elementid:' + q + '&indent=on&wt=json&rows=100';
		//console.log(url);
		http.get(url,function(err,resultData){
			var solrData = JSON.parse(resultData.body);   
			return res.json(solrData);
		});  
	}
	
};

