/**
* Sidenav class is a front-end class for display navigation panel for application menu, user options and logout button.
*
* @class Sidenav
* @module Alarms
*/

import {Component, Output, EventEmitter} from '@angular/core';
import { RouterModule, Router, ActivatedRoute} 		from '@angular/router';
import { UserService } from './_services/user.service';
import { DataService }       from './_services/data.service';

declare var app:any;
declare var window:any;
declare var $:any;

@Component({
    selector: 'livepoint-sidenav',
    templateUrl: '/example/appviews/sidenav.html',
	providers: [UserService, DataService]
})

export class Sidenav {

	@Output() sidenavReady: EventEmitter<string> = new EventEmitter();
	
	user: any;
	userName: string;
	interval: any;
	applications: any[] = [];
	isAdmin: boolean = false;
	config: any = {
		displayedName: '',
		description: '',
		version: ''
	}
	
	/**
	* Sidenav constructor
	* 
	* @class Sidenav
	* @constructor
	* @param {Object} userService - Alarms UserService class
	* @param {Object} dataService - Alarms DataService class
	*
	*/
	constructor(private router: Router, private userService: UserService, private dataService: DataService) {
		var self = this;
		if (userService.current) {
			this.availableUser(userService.current);
		} else {
			this.userService.getAccount().subscribe(
				event => this.availableUser(event),
				error => this.handleError(error)
			);	
		}
		
		this.userService.getApplications().subscribe(
				event => this.availableApps(event),
				error => this.handleError(error)
			);
			
		/*
		this.dataService.getConfig().subscribe(
				event => this.availableConfig(event),
				error => this.handleError(error)
			);
		*/
	}

	ngOnInit() { 
		this.sidenavReady.emit("sidenav:ok");      
	}

	/**
	* Retrieve an available configuration for current application.
	*
	* @method availableConfig
	* @param {Object} data.result Object representation of current configuration.
	* @example	The following is an example of request result:
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
	
	/**
	* Retrieve an available user for current application.
	*
	* @method availableUser
	* @param {Object} user Object representation of current user.
	* @example	The following is an example of request result:
	* 
	*		{
	*			attributes:null
	*			createdAt:"2017-09-04T00:00:00.000Z"
	*			email:"admin@localhost"
	*			id:1
	*			isAdmin:true
	*			isLocal:true
	*			name:"System Administrator"
	*			profilePicture:null
	*			realm:"localhost"
	*			role:"sysadmin"
	*			roleChain:["sysadmin"]
	*			updatedAt:"2017-09-04T00:00:00.000Z"	
	*		} 
	*
	* @async
	*/
	availableUser(user) {
		this.user = user;
		this.userName = this.user.name;
		
		if (user.role == "sysadmin" || $.inArray(user.roleChain, "example-admin") != -1)
			this.isAdmin = true;
	}

	/**
	* Retrieve an available applications for current user.
	*
	* @method availableApps
	* @param {Object} apps Object representation of available applications.
	* @example	The following is an example of request result:
	* 
	*		{
	*			0:
	*				db:
	*					appId:"alarms"
	*					createdAt:"2017-09-08T00:00:00.000Z"
	*					description:"Alarms"
	*					displayedName:"Alarms"
	*					iconPath:""
	*					id:5
	*					isActive:true
	*					isPublic:true
	*					updatedAt:"2017-09-13T00:00:00.000Z"	
	*		}
	*
	* @async
	*/
	availableApps(apps) {
		this.applications = apps || [];		
	}
	
	switchApplication(app) {
		window.location.href = app.raw.applicationEntryPoint;
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
	
	displayUserProfile() {
		console.debug('display profile');
	}
	
	signOut() {
		app.signout();
	}
}
