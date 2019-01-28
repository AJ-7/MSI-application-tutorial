module.exports.routes = {
    
	'GET /': {
		controller: 'ViewController',
		action: 'home'
	},

	'GET /views/:name': {
		controller: 'ViewController',
		action: 'displayPartialView'
	}, 
	
	'GET /data': {
		controller: 'ViewController',
		action: 'data'
	},
	
	'GET /management*': {
		controller: 'ViewController',
		action: 'home'
	},
	
	'GET /reports*': {
		controller: 'ViewController',
		action: 'home'
	},
	
	'GET /lookback*': {
		controller: 'ViewController',
		action: 'home'
	},
	
	'GET /realtime*': {
		controller: 'ViewController',
		action: 'home'
	}
}