var _ = require('underscore');

module.exports = {


	getServerList: function (context, callback) {
		context.AF.GetPIServers(null, callback);		
		
	},
	getTagData: function (context, callback) {
						
		var param = context.body;
		var request = {
			Server: param.server,            
			Method: 'Snapshot',
			PIPoints: [{ Name: param.tag }],
		};

		context.AF.GetPIData(request, callback);		
	}

};