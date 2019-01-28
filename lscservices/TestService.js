
var isRunning = false;
var isFinished = false;

var edge = require('edge');
var clrMethod = edge.func({
    assemblyFile: 'C:\\mirabo\\Livepointx\\LPXCore\\apps\\alarms\\lscservices\\XmlImporter.dll',
    typeName: 'XmlImporter.Class1',
    methodName: 'Invoke' 
});

module.exports = {

	testFunction: function(context, callback) {
		var log = context.log;
		log.info("testFunction called");
		
		/*
		var request = {
			"ID": "FindEventFrames",
			"EnableLog": true,
			"Server": "localhost",
			"Database": "CPV Data Testing",
			"StartTime": "*-10y",
			"EndTime": "*",
			"LoadToDepth": 0,
			"EventFrameFilters": [
				{
					"Name": "*"
				}
			],
			"EventFrameFields": [ "Name", "StartUTC", "EndUTC" ]
		}
		context.AF.FindEventFrames(request, callback);
		*/
		
		 var data = { 
			connectionString: "Server=localhost\\SQLEXPRESS;Database=LPX;Trusted_Connection=Yes;", 
			insertComand: "INSERT INTO dbo.testing (fucker) VALUES(@fucker)", 
			param: 'FUCKER FROM LSC FUCK THIS SHIT!!!!'
		};

		clrMethod(data, function (error, result) {
			if (error) { callback(error, result); return; }
			callback(null, {status:200, message: result, err: error});
		});

	}, 
	
	runTask: function (context, callback) {
		var log = context.log;
		isRunning = true;
		var request = {
			"ID": "FindEventFrames",
			"EnableLog": true,
			"Server": "localhost",
			"Database": "CPV Data Testing",
			"StartTime": "*-10y",
			"EndTime": "*",
			"LoadToDepth": 0,
			"EventFrameFilters": [
				{
					"Name": "*"
				}
			],
			"EventFrameFields": [ "Name", "StartUTC", "EndUTC" ]
		}
		log.info('firing af request');		
		context.AF.FindEventFrames(request, function(err, res) {
		log.info('af request finished');		
			isRunning = false;
			isFinished = true;
			callback(null);
		});
		
/*		
		if (!isRunning && !isFinished) {
			log.info('task is not running, executing task');
			isRunning = true;
			setTimeout(function() {
				isRunning = false;
				isFinished = true;
				log.info('task finished after 20 seconds');
				callback(null);
			}, 20000);
		} else if (isFinished) {
			log.info('task already finished');
			callback(null);
		}
*/		
	}, 
	
	taskStatus: function (context, callback) {
		callback(null, {isRunning:isRunning, isFinished:isFinished});
	}

};