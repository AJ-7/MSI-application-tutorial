/**
* The DateSelector class is used for select dates and periods 
*
* @class SecurityController
* @module Alarms
*/
 

import { Component, NgZone, ViewChild, Output, Input, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { NavService } from './_services/nav.service';

declare var jQuery:any;
declare var $:any;
declare var app:any;
declare var delayBeforeFire:any;
declare var window:any;
declare var Handlebars:any;
declare var moment:any;

@Component({
    selector: 'livepoint-date-selector',
    templateUrl: '/example/appviews/dateselector.html'
})

export class DateSelector {

	@Output() dateSelectorReady: EventEmitter<string> = new EventEmitter();
	
	user: any;

	/**
	 * Indicates selected period
	 *
	 * @attribute selectedPeriod
	 * @type string
	*/
	selectedPeriod: string;
	
	/**
	 * Indicates from which date the data search begins
	 *
	 * @attribute fromDateDisplay
	 * @type string
	*/
	fromDateDisplay: string;

	/**
	 * Indicates to which date the data search begins
	 *
	 * @attribute toDateDisplay
	 * @type string
	*/
	toDateDisplay: string;
	
	toDate: any;
	fromDate: any;
	starting: boolean = true;
	firstRunFrom: boolean = true;
	firstRunTo: boolean = true;
	
	/**
	* DateSelector constructor
	* 
	* @class DateSelector
	* @constructor
	* @param {Object} navService - Alarms NavService class
	*
	*/
	constructor(private ngZone: NgZone, 
				private router: Router, 
				private navService:NavService) {
		
		window.alarms = window.alarms || {};
		window.alarms.onFromDateChange = this.fromDateChange.bind(this);	
		window.alarms.toDateChange = this.toDateChange.bind(this);	
		
		this.selectedPeriod = null;
	}

	/**
	* DateSelector creation and initialisation
	* 
	* @method ngOnInit
	* @async
	*/
	ngOnInit() { 
		console.log('Date selctor init');
		
		var self = this;
		this.dateSelectorReady.emit("dateselector:ok");      
		
		self.selectedPeriod = "8h";
		this.toDate = moment();
		this.fromDate = moment().subtract(1, 'hour');			

		delayBeforeFire(function(){
			self.starting = false;
			app.datePicker("#dateFrom", window.alarms.onFromDateChange);
			app.datePicker("#dateTo", window.alarms.toDateChange);
			self.changeDisplay();
		}, 100);
	}
		
	/**
	* DateSelector clearing and deleting 
	* 
	* @method ngOnDestroy
	* @async
	*/
	ngOnDestroy() {
		window.alarms.onFromDateChange = null;
		window.alarms.toDateChange = null;
	}
	
	/**
	* change displayed information about current dates and periods
	* 
	* @method changeDisplay
	* @async
	*/
	changeDisplay() {
		this.fromDateDisplay = this.fromDate.format(app.dateFormat);
		this.toDateDisplay = this.toDate.format(app.dateFormat);
	}
		
	/**
	* Event: Fired when period changes in DateSelector component
	*
	* @event periodSelected
	* @param {Object} Event from component DateSelector (see example below).
	* @example	The following is an example of event:
	* 
	*		{
	*			period:30d
	*			num:30
	*			val:days
	*		} 
	*
	*/
	periodSelected(period, num, val) {
		this.selectedPeriod = period;
		this.toDate = moment();
		this.fromDate = moment().subtract(num, val);
		this.changeDisplay();
		this.selectedDate();
	}
	
	/**
	* Event: Fired when from Date changes in DateSelector component
	*
	* @event fromDateChange
	* @param {Object} Event from component DateSelector (see example below).
	* @example	The following is an example of event:
	* 
	*		{
	*			date:
					_d:Mon Sep 04 2017 09:26:00 GMT+0300 (Russia TZ 2 Standard Time) {}
					_f:"ddd, MMM Do YYYY, HH:mm:ss"
					_i:"Wed, Sep 13th 2017, 09:26:00"

	*		} 
	*
	*/
	fromDateChange(e) {
		if(this.firstRunFrom) {
			this.firstRunFrom = false;
			return;
		}
		this.fromDate = e.date;
		this.selectedDate();
		if (!this.fromDateDisplay) {
			this.fromDateDisplay = e.date.format(app.dateFormat);
		}
		
		if (!this.starting)
			this.selectedPeriod = null;
	}
	
	/**
	* Event: Fired when  to Date changes in DateSelector component
	*
	* @event toDateChange
	* @param {Object} Event from component DateSelector (see example below).
	* @example	The following is an example of event:
	* 
	*		{
	*			date:
					_d:Mon Sep 04 2017 09:26:00 GMT+0300 (Russia TZ 2 Standard Time) {}
					_f:"ddd, MMM Do YYYY, HH:mm:ss"
					_i:"Wed, Sep 13th 2017, 09:26:00"

	*		} 
	*
	*/
	toDateChange(e) {
		if(this.firstRunTo) {
			this.firstRunTo = false;
			return;
		}
		
		this.toDate = e.date;
		this.selectedDate();
		if (!this.toDateDisplay) {
			this.toDateDisplay = e.date.format(app.dateFormat);
		}
		
		if (!this.starting)
			this.selectedPeriod = null;
	}
	
	/**
	* Event: Fired when any changes in DateSelector component
	*
	* @event selectedDate
	*
	*/
	selectedDate() {
		this.navService.broadcast('dateselector:change', {
			toDate: this.toDate,
			fromDate: this.fromDate,			
			period:this.selectedPeriod
		});
	}	
	
	toggleSites() {
		$('.main-menu, .main-content, .main-footer').toggleClass('collapse-menu');
		delayBeforeFire(function(){
			app.resizeCharts();
		}, 400);
	}
}
