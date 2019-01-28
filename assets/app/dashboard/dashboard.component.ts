import { Component } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';

declare var jQuery:any;
declare var $:any;
declare var app:any;
declare var delayBeforeFire:any;


@Component({
  templateUrl: '/example/appviews/dashboard.html'
})
export class DashboardComponent { 
	
	router: Router;
	title: string = "Main Screen Description";
	
	constructor(private data: Router) {
		this.router = data;
	}

	ngOnInit() { 
	
		var self = this;
		
		if (this.router.url == '/' || this.router.url == '/example') {
			//this.router.navigate(['/example/management']);
		}
		
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				if (event.url == "/example/management") {
					self.title = "Main Screen Description";
				} else if (event.url == "/example/management/edit") {
					self.title = "Main Sub-screen description";
				}
			}
		});
	}

}