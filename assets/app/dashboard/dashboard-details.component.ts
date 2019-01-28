import { Component, NgZone, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { NavService }	 				from '../_services/nav.service';
import { DataService }     				from '../_services/data.service';
import { SelectModule } 				from 'angular2-select';

declare var jQuery:any;
declare var $:any;
declare var app:any;
declare var delayBeforeFire:any;
declare var window:any;
declare var Handlebars:any;
declare var moment:any;
declare var lpxAlarmsTour: any;

@Component({
  templateUrl: '/example/appviews/dashboard/details.html',
  providers: [ DataService ]
})

export class DashboardDetailsComponent implements AfterViewInit {
	
	constructor(
		private ngZone: NgZone, 
		private route: ActivatedRoute,
		private router: Router,
		private navService:NavService,
		private dataService:DataService,
	) {
	}

	ngOnInit() { 
	}
	
	handleError(error) {
		app.showAlert(null, error.tite, error.message);
	}

	ngAfterViewInit() {
	}
	
	ngOnDestroy() {
	}
	
	navAway() {
		console.log('cancel');
		this.router.navigate(['/example/management']);
	}
}