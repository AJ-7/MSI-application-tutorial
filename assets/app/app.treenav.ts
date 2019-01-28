/**
* TreeNavigation class is a front-end class for display navigation tree panel for sites, areas and datasources.
*
* @class TreeNavigation
* @module Alarms
*/

import { Component, Output, EventEmitter, ViewChild, QueryList } from '@angular/core';
import { RouterModule, Router, ActivatedRoute} 		from '@angular/router';
import { NavService } from './_services/nav.service';
import { DataService }       from './_services/data.service';
import { UserService } from './_services/user.service';

declare var app:any;
declare var delayBeforeFire: any;
declare var window: any;
declare var lpxAlarmsTour: any;

@Component({
    selector: 'livepoint-tree-nav',
    templateUrl: '/example/appviews/treenav.html',
	providers: [DataService]	
})

export class TreeNavigation {

	@Output() navReady: EventEmitter<string> = new EventEmitter();
	
	eventSystemModified: any;
	eventOptions: any;
	user: any;
	
	@ViewChild('sitesFor') siteList: QueryList<any>;
	
	/**
	* TreeNavigation constructor
	* 
	* @class TreeNavigation
	* @constructor
	* @param {Object} navService - Alarms NavService class
	* @param {Object} dataService - Alarms DataService class
	*
	*/
	constructor(
		private router: Router, 
		private navService:NavService,
		private dataService:DataService,
		private userService: UserService
	) {
		if (userService.current) {
			this.availableUser(userService.current);			
		} else {
			this.userService.getAccount().subscribe(
				event => this.availableUser(event),
				error => this.handleError(error)
			);
		}
	}

	ngOnInit() { 
	
		//lpxAlarmsTour.Start();		
	
		this.navReady.emit("treenav:ok");  			
		/*
		this.eventSystemModified = this.navService.on('service:system-modify').subscribe(data => this.onSystemModify(data));
		this.eventOptions = this.navService.on('treenav:options').subscribe(data => this.toggleOptions(data));			
		*/
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
		app.showAlert(null, error.tite, error.message);
	}
	
	/*
	ngAfterViewInit() {
		if (this.siteList) {
			this.siteList.changes.subscribe(t => {
				this.ngForRendred();
			});
		}
	}*/

	/**
	* Event: Fired when finishing initialization
	*
	* @event onInitFinish
	*
	*/
	onInitFinish() {
		
		/*
		this.navService.broadcast("treenav:system-init", this.selectedSystems);
		this.navService.broadcast("treenav:areas-init", this.areas); 
		*/
	}
	
	newMapping() {
		console.log('new mapping');
	}
	
	ngOnDestroy() {
		this.eventSystemModified.unsubscribe();
		this.eventOptions.unsubscribe();
	}
	
	previewLoaded($event) {}
	
	availableUser(user) {
		this.user = user;
	}
	
	displayLoginCode($event) {
		if (this.user) {
			// this.loginPreviewComponent.open(this.user.email);
			this.navService.broadcast("modal:show-login-code", this.user.email); 
		}
	}
	
	deleteMultiple($event) {
		this.navService.broadcast("tool:delete-multiple", true); 
	}
}

