/**
* The Footer class is used for shows bottom part of the html page 
*
* @class Footer
* @module Alarms
*/
 
import {Component, Output, EventEmitter} from '@angular/core';
import { RouterModule, Router, ActivatedRoute} 		from '@angular/router';
import { DataService }       from './_services/data.service';

declare var app:any;
declare var window:any;
declare var $:any;

@Component({
    selector: 'livepoint-app-footer',
    templateUrl: '/example/appviews/footer.html',	
	providers: [DataService]
})

export class Footer {
	config: any = {
		displayedName: '',
		description: '',
		version: ''
	}
	
	/**
	* Footer constructor
	* 
	* @class Footer
	* @constructor
	* @param {Object} DataService class of Alarms application.
	*
	*/
	constructor(private dataService: DataService) {		
		var self = this;
		/*
		this.dataService.getConfig().subscribe(
			event => this.availableConfig(event),
			error => this.handleError(error)
		);		
		*/
	}

	/**
	* Footer creation and initialisation
	* 
	* @method ngOnInit
	* @async
	*/
	ngOnInit() { 
		console.log('App ', app);		
	}
	
	/**
	* Event: Fired when error is occured. Error handling for component Footer 
	*
	* @event handleError
	* @param {Object} contains error description
	*
	* @async
	*/
	handleError(error) {
		app.showAlert(null, null, error.message);
	}
	
	/**
	* Returns the list of available configurations. 
	*
	* @method availableConfig
	* @param {Object} contains available config for footer component (see example below).
	* @example	The following is an example of data:
	* 
	*		{
	*			err:null
	*			result:
	*				description:"Alarms"
	*				displayedName:"Alarms"
	*				version:"1.0.245"
	*		} 
	*
	* @async
	*/
	availableConfig(data) {
		this.config = data.result;		
	}
	
}
