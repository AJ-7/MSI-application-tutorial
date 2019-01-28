/**
* NavService class is a service class for retrieve data from db to navigation tree
*
* @class NavService
* @module Alarms
*/

import { Component, NgZone, ViewChild, Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

declare var app:any;
declare var window:any;
declare var $:any;

interface BroadcastEvent {
  key: any;
  data?: any;
}

@Injectable()
export class NavService {
	
	private _eventBus: Subject<BroadcastEvent>;
	static instance: NavService;
	
	systemsSelected: any[];	
	areasSelected: any[];	
	datesSelected: any;	
	
	eventSystemSelected: any;	
	eventDateSelected: any;
	eventAreaSelected: any;
	eventSystemInit: any;
	eventAreaInit: any;

	/**
	* NavService constructor
	* 
	* @class NavService
	* @constructor
	*
	*/
	constructor() {		
		if(NavService.instance) return NavService.instance;
		this._eventBus = new Subject<BroadcastEvent>();
		
		this.eventSystemSelected = this.on('treenav:system-selected').subscribe(data => this.onSystemSelect(data));	
		this.eventAreaSelected = this.on('treenav:areas-selected').subscribe(data => this.onAreaSelected(data));	
		this.eventDateSelected = this.on('dateselector:change').subscribe(data => this.onDateSelect(data));	

		this.eventSystemInit = this.on('treenav:system-init').subscribe(data => this.onSystemInit(data));	
		this.eventAreaInit = this.on('treenav:areas-init').subscribe(data => this.onAreaInit(data));		
		
		window.alarms = window.alarms || {};
		window.alarms.onSystem = this.onSystem.bind(this);	
		app.ioServiceSubscribe(window.alarms.onSystem);

		this.areasSelected = [];
		this.systemsSelected = [];
		this.datesSelected = {};		
				
		NavService.instance = this;				
	}
	
	/**
	* Event: Fired when data sources selected/deselected 
	*
	* @event onSystemSelect
	* @param {Object} contains list of selected data sources
	* @example	The following is an example of data object:
	* 
	*		{
	*			{id: 1, name: "RS3", server: "TQSDEVPISERVER", tag: "RNIAlarmBatchN", delimeter: "[\|]", …}
	*			{id: 10088, name: "Simulator", server: "TQSDEVPISERVER", tag: "sim_Temp_TD1", delimeter: null, …}
	*			length:2	
	*		} 
	*
	* @async
	*/	
	onSystemSelect(data) {
		this.systemsSelected = data;
		this.broadcastFilterModify();
	}
	
	/**
	* Event: Fired when Alarms application initialized 
	*
	* @event onSystemInit
	* @param {Object} contains list of available systems
	* @example	The following is an example of data object:
	* 
	*		{
	*			{id: 1, name: "RS3", server: "TQSDEVPISERVER", tag: "RNIAlarmBatchN", delimeter: "[\|]", …}
	*			{id: 10088, name: "Simulator", server: "TQSDEVPISERVER", tag: "sim_Temp_TD1", delimeter: null, …}
	*			length:2
	*		} 
	*
	* @async
	*/
	onSystemInit(data) {
		this.systemsSelected = data;
	}
	
		
	/**
	* Event: Fired when Date changes 
	*
	* @event onDateSelect
	* @param {Object} contains selected period
	* @example	The following is an example of data object:
	* 
	*		{
	*			fromDate:Tue Aug 15 2017 16:08:42 GMT+0300 (Russia TZ 2 Standard Time) {}
	*			toDate:Thu Sep 14 2017 16:08:42 GMT+0300 (Russia TZ 2 Standard Time) {}
	*			period:"30d"
	*		} 
	*
	* @async
	*/
	onDateSelect(data) {
		this.datesSelected = data;
		this.broadcastFilterModify();
	}
	
	/**
	* Event: Fired when Areas selected/deselected 
	*
	* @event onAreaSelected
	* @param {Object} contains list of selected areas
	* @example	The following is an example of data object:
	* 
	*		{
	*			{id: 31, name: "Facilities4", selected: true, equipment: Array(0), color: "#b20907"}
	*			{id: 32, name: "Area 04", selected: true, equipment: Array(0), color: "#099b2b"}
	*			length:2	
	*		} 
	*
	* @async
	*/	
	onAreaSelected(data) {
		this.areasSelected = data;
		this.broadcastFilterModify();
	}
	
	/**
	* Event: Fired when Areas initialized 
	*
	* @event onAreaInit
	* @param {Object} contains list of available areas
	* @example	The following is an example of data object:
	* 
	*		{
	*			{id: 31, name: "Facilities4", selected: true, equipment: Array(0), color: "#b20907"}
	*			{id: 32, name: "Area 04", selected: true, equipment: Array(0), color: "#099b2b"}
	*			{id: 33, name: "Area 05", selected: true, equipment: Array(0), color: "#efbf13"}
	*			{id: 34, name: "Area 07", selected: true, equipment: Array(0), color: "#ad15d3"}
	*			{id: 1056, name: "Area 08", selected: true, equipment: Array(0), color: "#d100c6"}
	*			length:5
	*		} 
	*
	* @async
	*/
	onAreaInit(data) {
		this.areasSelected = data;
	}
	
	getStartFilter() {
		return {
			systemsSelected: window.initialSystems, 
			areasSelected: window.initialAreas,
			datesSelected: this.datesSelected
		};
	}
			
	getFilter() {
		return {			
			areasSelected: this.areasSelected,
			systemsSelected: this.systemsSelected,
			datesSelected: this.datesSelected
		};
	}	
	
	broadcastFilterModify() {
		this.broadcast('service:filter-modify', this.getFilter());		
	}
	
	onSystem(data) {
		this.broadcast('service:system-modify', data);
	}

	broadcast(key: any, data?: any) {
		this._eventBus.next({key, data});
	}

	on<T>(key: any): Observable<T> {
		return this._eventBus.asObservable()
			.filter(event => event.key === key)
			.map(event => <T>event.data);
	}
	
}


