module.exports = {

	testFunction: function(context, callback) {
		var log = context.log;
		var PIFunctions = context.PI;
		var AFFunctions = context.AF;
		
		log.info("testFunction called");
		
		var searchel_request = {
			ID: "18",
			EnableLog: false,
			Server: "localhost",
			Database: "LPX_ITMonitoring",
			LoadToDepth: 0,
			ReturnFullPath: false,
			ReturnRoot: false,
			ReturnAttributes: 'All',

			SearchTree: true, 
			SortOrder: 'Descending',
			ElementFilters: [{ Name: '*'}],
		
			ElementFields: ["Name", 'Guid', 'HasChildren', 'HasAttributes', 'ParentGuid', 'Parents', 'Security'],
			AttributeFields: ['Name', 'DataReference', 'Value', 'State','IsConfigured', 'HasChildren', 'OwnerGuid', 'OwnerType', 'UOM', 'EngUnits']
		};
		
		AFFunctions.FindElements(searchel_request, function(err, res) {
			callback(err, {status:200, response: res});
		});
	},
	
	getAttributeData: function(context, callback) {
		var body = context.body;
		var PIFunctions = context.PI;
		var AFFunctions = context.AF;
		
		var searchel_request = {
			"ID": "GetAttributeData",
			"EnableLog": false,
			"Server": body.server,
			"Database": body.db,
			"Method": "PlotValues",
			"Count": 200,
			"StartTime": "*-1m",
			"EndTime": "*",
			"ValueFields": ["TimeStamp", "TimeUTC", "TimeTicks", "Value"],
			"Attributes": [
				{
					"Persist": body.persist
				}
			]
		};
		
		AFFunctions.GetAttributeData(searchel_request, function(err, res) {
			callback(err, {status:200, response: res, raw: JSON.stringify(searchel_request)});
		});
	}	
};