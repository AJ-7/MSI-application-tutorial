"use strict";

// jQuery autoGrowInput v1.0.3
// https://github.com/Pixabay/jQuery-autoGrowInput
!function(t){var n="oninput"in document.createElement("input")?"input":"keydown";t.fn.autoGrowInput=function(o){var e=t.extend({maxWidth:500,minWidth:20,comfortZone:0},o);return this.each(function(){var i=t(this),a=" ",r=o&&"comfortZone"in o?e.comfortZone:parseInt(i.css("fontSize")),c=t("<span/>").css({position:"absolute",top:-9999,left:-9999,width:"auto",fontSize:i.css("fontSize"),fontFamily:i.css("fontFamily"),fontWeight:i.css("fontWeight"),letterSpacing:i.css("letterSpacing"),textTransform:i.css("textTransform"),whiteSpace:"nowrap",ariaHidden:!0}).appendTo("body"),s=function(t){if(a!==(a=i.val())||"autogrow"===t.type){a||(a=i.attr("placeholder")||""),c.html(a.replace(/&/g,"&amp;").replace(/\s/g,"&nbsp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"));var n=c.width()+r,o="function"==typeof e.maxWidth?e.maxWidth():e.maxWidth;n>o?n=o:n<e.minWidth&&(n=e.minWidth),n!=i.width()&&i.width(n)}};i.on(n+".autogrow autogrow",s),s()}),this}}(jQuery);

// random color
!function(r,e){if("object"==typeof exports){var n=e();"object"==typeof module&&module&&module.exports&&(exports=module.exports=n),exports.randomColor=n}else"function"==typeof define&&define.amd?define([],e):r.randomColor=e()}(this,function(){function r(r){var e=i(o(r.hue));return e<0&&(e=360+e),e}function e(r,e){if("monochrome"===e.hue)return 0;if("random"===e.luminosity)return i([0,100]);var n=u(r),t=n[0],a=n[1];switch(e.luminosity){case"bright":t=55;break;case"dark":t=a-10;break;case"light":a=55}return i([t,a])}function n(r,e,n){var t=a(r,e),o=100;switch(n.luminosity){case"dark":o=t+20;break;case"light":t=(o+t)/2;break;case"random":t=0,o=100}return i([t,o])}function t(r,e){switch(e.format){case"hsvArray":return r;case"hslArray":return d(r);case"hsl":var n=d(r);return"hsl("+n[0]+", "+n[1]+"%, "+n[2]+"%)";case"hsla":var t=d(r),a=e.alpha||Math.random();return"hsla("+t[0]+", "+t[1]+"%, "+t[2]+"%, "+a+")";case"rgbArray":return f(r);case"rgb":return"rgb("+f(r).join(", ")+")";case"rgba":var o=f(r),a=e.alpha||Math.random();return"rgba("+o.join(", ")+", "+a+")";default:return l(r)}}function a(r,e){for(var n=s(r).lowerBounds,t=0;t<n.length-1;t++){var a=n[t][0],o=n[t][1],u=n[t+1][0],i=n[t+1][1];if(e>=a&&e<=u){var l=(i-o)/(u-a);return l*e+(o-l*a)}}return 0}function o(r){if("number"==typeof parseInt(r)){var e=parseInt(r);if(e<360&&e>0)return[e,e]}if("string"==typeof r)if(m[r]){var n=m[r];if(n.hueRange)return n.hueRange}else if(r.match(/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i)){var t=h(r)[0];return[t,t]}return[0,360]}function u(r){return s(r).saturationRange}function s(r){r>=334&&r<=360&&(r-=360);for(var e in m){var n=m[e];if(n.hueRange&&r>=n.hueRange[0]&&r<=n.hueRange[1])return m[e]}return"Color not found"}function i(r){if(null===v)return Math.floor(r[0]+Math.random()*(r[1]+1-r[0]));var e=r[1]||1,n=r[0]||0,t=(v=(9301*v+49297)%233280)/233280;return Math.floor(n+t*(e-n))}function l(r){function e(r){var e=r.toString(16);return 1==e.length?"0"+e:e}var n=f(r);return"#"+e(n[0])+e(n[1])+e(n[2])}function c(r,e,n){var t=n[0][0],a=n[n.length-1][0],o=n[n.length-1][1],u=n[0][1];m[r]={hueRange:e,lowerBounds:n,saturationRange:[t,a],brightnessRange:[o,u]}}function f(r){var e=r[0];0===e&&(e=1),360===e&&(e=359),e/=360;var n=r[1]/100,t=r[2]/100,a=Math.floor(6*e),o=6*e-a,u=t*(1-n),s=t*(1-o*n),i=t*(1-(1-o)*n),l=256,c=256,f=256;switch(a){case 0:l=t,c=i,f=u;break;case 1:l=s,c=t,f=u;break;case 2:l=u,c=t,f=i;break;case 3:l=u,c=s,f=t;break;case 4:l=i,c=u,f=t;break;case 5:l=t,c=u,f=s}return[Math.floor(255*l),Math.floor(255*c),Math.floor(255*f)]}function h(r){r=3===(r=r.replace(/^#/,"")).length?r.replace(/(.)/g,"$1$1"):r;var e=parseInt(r.substr(0,2),16)/255,n=parseInt(r.substr(2,2),16)/255,t=parseInt(r.substr(4,2),16)/255,a=Math.max(e,n,t),o=a-Math.min(e,n,t),u=a?o/a:0;switch(a){case e:return[(n-t)/o%6*60||0,u,a];case n:return[60*((t-e)/o+2)||0,u,a];case t:return[60*((e-n)/o+4)||0,u,a]}}function d(r){var e=r[0],n=r[1]/100,t=r[2]/100,a=(2-n)*t;return[e,Math.round(n*t/(a<1?a:2-a)*1e4)/100,a/2*100]}function g(r){for(var e=0,n=0;n!==r.length&&!(e>=Number.MAX_SAFE_INTEGER);n++)e+=r.charCodeAt(n);return e}var v=null,m={};!function(){c("monochrome",null,[[0,0],[100,0]]),c("red",[-26,18],[[20,100],[30,92],[40,89],[50,85],[60,78],[70,70],[80,60],[90,55],[100,50]]),c("orange",[19,46],[[20,100],[30,93],[40,88],[50,86],[60,85],[70,70],[100,70]]),c("yellow",[47,62],[[25,100],[40,94],[50,89],[60,86],[70,84],[80,82],[90,80],[100,75]]),c("green",[63,178],[[30,100],[40,90],[50,85],[60,81],[70,74],[80,64],[90,50],[100,40]]),c("blue",[179,257],[[20,100],[30,86],[40,80],[50,74],[60,60],[70,52],[80,44],[90,39],[100,35]]),c("purple",[258,282],[[20,100],[30,87],[40,79],[50,70],[60,65],[70,59],[80,52],[90,45],[100,42]]),c("pink",[283,334],[[20,100],[30,90],[40,86],[60,84],[80,80],[90,75],[100,73]])}();var p=function(a){if(void 0!==(a=a||{}).seed&&null!==a.seed&&a.seed===parseInt(a.seed,10))v=a.seed;else if("string"==typeof a.seed)v=g(a.seed);else{if(void 0!==a.seed&&null!==a.seed)throw new TypeError("The seed value must be an integer or string");v=null}var o,u,s;if(null!==a.count&&void 0!==a.count){var i=a.count,l=[];for(a.count=null;i>l.length;)v&&a.seed&&(a.seed+=1),l.push(p(a));return a.count=i,l}return o=r(a),u=e(o,a),s=n(o,u,a),t([o,u,s],a)};return p});

window.alarms = {};

var app = {
    app: false,
    isloaded: false,
    header: false,
    footer: false,
	charts: [],
	loader: null,
	genericAlert: false, 
	totalLoaders: 0,
	alert: null,
	dateFormat: 'ddd, MMM Do YYYY, HH:mm:ss',
	dateFormatAlarm: 'MMM, Do YYYY HH:mm:ss',	
	dateFormatAlarm2: 'HH:mm:ss',	
	defaultPalatte:  ["#253031", '#3273AD', '#ACCFE0', '#FFB600', '#F52F57', '#E8E8E8'],
	lineChartColors: ['rgba(37,48,49,1)'],
	lineChartColorsRandom: ['#4D4D4D', '#5DA5DA', '#FAA43A', '#60BD68', '#F17CB0', '#B2912F', '#B276B2', '#DECF3F', '#F15854', '#253031', '#F9C218', '#0B3E83', '#253031', '#F25F5E', '#FBFFB2', '#647F58', '#213F21', '#102542', '#9AADBF', '#D7CEB2'],
	globals: {
		has: false,
		priorities: [],
		statuses: []
	},
	lineChartOptions: {
		responsive: true
	},
	
	equalHeight: function(sel) {
		var hb = 0;
		$(sel).each(function(){ 
			if ($(this).height() > hb) {  
				hb = $(this).height();  
			}
		});    
		$(sel).height(hb);
	},
	
	resetHeight: function(sel) {
		$(sel).removeAttr('style');
		this.equalHeight(sel);
	},
	
	startLoading: function(sel) {
		this.totalLoaders++;
		$('#loader-bar').removeClass('hidden');
		
		if (sel || this.loader)
			$((sel || this.loader)).removeClass('hidden');
	},
	
	finishLoading: function(sel) {
		this.totalLoaders--;
		if (this.totalLoaders < 0) this.totalLoaders = 0;
		
		if (this.totalLoaders === 0)
			$('#loader-bar').addClass('hidden');
		
		if (sel || this.loader)
			$((sel || this.loader)).addClass('hidden');
	},
	
	setLoader: function(sel) {
		this.loader = sel;
	},
	
	resetLoader: function(sel) {
		app.finishLoading(sel || this.loader);
	},
	
	onViewDestroy: function() {
		this.resetLoader();
	},
	
	initColorPicker: function(sel) {
		
	},
    
    init: function(){
        console.log('application initialization called'); 
		
		this.alert = swal;
		if (!swal) {
			this.genericAlert = true;
			this.alert = alert;
		}

		Chart.defaults.global.defaultFontFamily = 'open-sans-light';
		Chart.defaults.global.defaultFontColor = '#06060F';
		Chart.defaults.global.elements.arc.borderWidth = 4;
		Chart.defaults.global.elements.arc.borderColor = '#edeff0';
		Chart.defaults.global.elements.line.borderWidth = 1;
		
		Chart.pluginService.register({
		  beforeDraw: function(chart) {
				var width = chart.chart.width,
					height = chart.chart.height,
					ctx = chart.chart.ctx;

				if (chart.config.options.middleText) {
					ctx.restore();
					var fontSize = (height / 114).toFixed(2);
					ctx.font = fontSize + "em open-sans-light";
					ctx.textBaseline = "middle";

					var text = chart.config.options.middleText,
						textX = Math.round((width - ctx.measureText(text).width) / 2),
						textY = chart.config.options.half ? (height/2 - ((16 * fontSize)/2)) : (height/2);

					ctx.fillText(text, textX, textY);
					ctx.save();
				}
				
				if (chart.config.options.half) {
					ctx.translate(0, -1 * (height/4));
				}
			}
		});
		
		console.log('creating menu');
		$.Livepoint.pushMenu("[data-toggle='offcanvas']");
		$.Livepoint.layout.activate();
    },
    
	fullInit: function() {
		this.init();    
	}, 
	
	loaded: function() {
		console.log('application initialization loaded');
		
		try {
			window.removeEventListener('scroll', window.loadingNoscroll);
		} catch (ex) {}
		
		this.isloaded = true;
		if ($.Livepoint)
			$.Livepoint.load();
	},
	
	truncateStatus(status) {
		var statusStr = status.split(' ');
		if (statusStr.length >= 2) 
			statusStr[1] = statusStr[1].substr(0, 4) + '.';
		return statusStr.join(' ');
	},
	
	resizeCharts: function() {
		for (var id in this.charts) {
			this.charts[id].resize();
		}
		
		if (window.alarms.redrawGuages) 
			window.alarms.redrawGuages();
	},
	
	rand: function(min,max,interval) {
		if (typeof(interval)==='undefined') interval = 1;
		var r = Math.floor(Math.random()*(max-min+interval)/interval);
		return r*interval+min;
	},
	
	getRandomColor: function() {
		var colors = randomColor({luminosity: 'dark', count: 400});
		return colors[this.rand(0,399)];
	},
	
	getRandomColorsN: function(n, lum, hue) {
		var colors = randomColor({luminosity: (lum || 'random'), hue: (hue || 'random'), count: n});
		return colors;
	},
		
	// Draw donut chart from Chart.js library
	donutChart: function(id, data, options, onclick) {
		
		var self = this;
		var opt = options || {};
		var ctx = document.getElementById(id);		
		if(this.charts[id] != null) {
			this.charts[id].destroy();						
		}
		
		opt.responsive = false;
		this.charts[id] = new Chart(ctx, {
			type: 'doughnut',
			data: data,
			options: opt
		});
		
		if (opt.maxHeight) {
			this.charts[id].canvas.parentNode.style.height = opt.maxHeight + 'px';
			this.charts[id].canvas.parentNode.style.width = opt.maxHeight + 'px';
		}
		
		if (onclick) {
			ctx.onclick = function(evt) {
			  var activePoints = self.charts[id].getElementsAtEvent(evt);
			  if (activePoints[0]) {
					var config = activePoints[0]['_chart'].config;
					var chartData = config.data;
					var idx = activePoints[0]['_index'];
					var label = chartData.labels[idx];
					var value = chartData.datasets[0].data[idx];
					onclick(label, value, config);
				}
			};
		}
		
		this.charts[id].resize();
	}, 
	
	// Draw donut chart from Chart.js library
	lineChart: function(id, data, options) {
		
		var opt = options || {};
		var ctx = document.getElementById(id);
		if(this.charts[id] != null) {
			this.charts[id].destroy();						
		}
		
		
		this.charts[id] = new Chart(ctx, {
			type: 'line',
			data: data,
			options: opt
		});
		
		if (opt.maxHeight) {
			this.charts[id].canvas.parentNode.style.height = opt.maxHeight + 'px';
			this.charts[id].canvas.parentNode.style.width = opt.maxHeight + 'px';
		}
		
	}, 
	scatterChart: function(id, data, options) {
		
		var opt = options || {};
		var ctx = document.getElementById(id);
		if(this.charts[id] != null) {
			this.charts[id].destroy();						
		}
		
		
		this.charts[id] = new Chart(ctx, {
			type: 'scatter',
			data: data,
			options: opt
		});
		
		if (opt.maxHeight) {
			this.charts[id].canvas.parentNode.style.height = opt.maxHeight + 'px';
			this.charts[id].canvas.parentNode.style.width = opt.maxHeight + 'px';
		}
		
	}, 
	
	barChart: function(id, data, options) {
		
		var opt = options || {};
		var ctx = document.getElementById(id);
				
		if(this.charts[id] != null) {
			this.charts[id].destroy();						
		}
		
		this.charts[id] = new Chart(ctx, {
			type: 'bar',
			data: data,
			options: opt
		});
		
		if (opt.maxHeight) {
			this.charts[id].canvas.parentNode.style.height = opt.maxHeight + 'px';
			this.charts[id].canvas.parentNode.style.width = opt.maxHeight + 'px';
		}
		
	}, 
	
	hideAlert: function() {
		this.alert.close();
	},

	showAlert: function(obj, title, message, type) {
		if (this.genericAlert) {
			return this.alert(message);
		} 
			
		if (obj) {
			this.alert(obj, obj.callback);
		} else {
			this.alert({
				title: (title || "Unexpected Error"),  
				text: (message || "An application raised a generic alert, please contact system administrator for resolution."), 
				type: (type || "warning"), 
				confirmButtonText: "Dismiss"
			});
		}
	},
	
	signout: function() {
		$.post( "/session/signout", function(data) {
			window.location.href = '/';
		});
	},
	
	// debug: true (as option to debug)
	datePicker: function(id, callback) {
		$(id).autoGrowInput({ minWidth: 30, maxWidth: 200, comfortZone: 5 });
		$(id).datetimepicker({  format: this.dateFormat }).on("dp.change", function (e) {
			$(id).trigger('autogrow');
			if (callback)
				callback(e);
		});
		
		$(id).data("DateTimePicker").date(new Date());
		setTimeout(function() {
			$(id).trigger('autogrow');
		}, 200);
	},
	
	ioDataReceive: function(onData) {
		io.socket.on('data', onData);
		
		io.socket.get('/example/data/join', function gotResponse(data, jwRes) {
			console.log('joining data room', data);
		});
	},
	
	ioSend: function(data) {
		io.socket.post('/example/data/command', data, function gotResponse(data, jwRes) {
			console.log('sent to data room', data);
		});
	},
	
	ioDataUnsubscribe: function() {
		io.socket.on('data', null);
	},
	
	ioRealtimeSubscribe: function(eventListener){
		io.socket.post('/example/data/join', {}, function gotResponse(data, jwRes) {
			console.log('realtime ', data);
		});
		io.socket.on('message', eventListener);		
	},
	
	
	ioServiceSubscribe: function(onSystem) {
		io.socket.on('system-modify', onSystem);
		io.socket.post('/example/data/service', {}, function gotResponse(data, jwRes) {
			console.log('subscribed to service room');
		});
	}
};

var delayBeforeFire = (function(){
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

$(window).resize(function(){        
    delayBeforeFire(function(){
        // app events on resize if any
		app.resizeCharts();
    },100);
});



// app = $.extend({}, app, another);

window.globalPopover = false;
window.clickedAway = false;

// The following flag tells the legacy code that this is an angular 2 applicaton which 
// instructs the application.js (legacy core) from defering the call to initialization of 
// livepoint application if it was included in the project.
window.angular2 = true;
window.app = app;

$(document).click(function (e, target) {
	//$('.dropdown-container.show').removeClass('show');
	/*
	if ($(e.target).closest('.dropdown-container').length === 0)
		$('.dropdown-container.show').removeClass('show');
	*/
});