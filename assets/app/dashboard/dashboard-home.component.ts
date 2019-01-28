import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { RouterModule, Router, ActivatedRoute} from '@angular/router';
import { DataService }       from '../_services/data.service';
import { NavService } 		from '../_services/nav.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CodePreviewComponent } from '../components/codepreview.component';
import { UserService } from '../_services/user.service';

declare var app:any;
declare var jQuery:any;
declare var $:any;
declare var moment:any;
declare var window:any;
declare var lpxAlarmsTour: any;
declare var QRCode: any;

@Component({
  templateUrl: '/example/appviews/dashboard/summary.html',
  providers: [DataService]	
})

export class DashboardHomeComponent { 

	@ViewChild('codePreviewComponent') codePreviewComponent: CodePreviewComponent;

	router: Router;
	user: any;
	isAdmin: boolean = false;

	constructor(
		public routerC: Router,
		public dataService:DataService,
		public navService:NavService,
		public ngxSmartModalService: NgxSmartModalService,
		private userService: UserService
	) {
		this.router = routerC;
		
		if (userService.current) {
			this.availableUser(userService.current);			
		} else {
			this.userService.getAccount().subscribe(
				event => this.availableUser(event),
				error => this.handleError(error)
			);
		}		
	}
	
	handleError(error) {
		app.showAlert(null, error.tite, error.message);
	}

	ngOnDestroy() {
	}
	
	ngOnInit() { 
		
	}	
	
	availableUser(user) {
		this.user = user;
		this.isAdmin = (user.role == "sysadmin" || $.inArray("exampe-admin", user.roleChain) != -1);
		console.log('user is admin: ', this.isAdmin);
	}
	
}
