import {Component, ViewChild} from '@angular/core';
import { RouterModule, Router, ActivatedRoute} from '@angular/router';
import { RequestService } from './_services/request.service';
import { NavService } from './_services/nav.service';
import { DataService } from './_services/data.service';
import { UserService } from './_services/user.service';
import { CodePreviewComponent2 } from './components/codepreview2.component';

declare var jQuery:any;
declare var $:any;
declare var app:any;
declare var window:any;
declare var delayBeforeFire:any;

@Component({
    selector: 'livepoint',
    templateUrl: '/example/appviews/home.html',
	providers: [DataService,UserService]
})

export class AppComponent { 


	@ViewChild('loginPreviewComponent') loginPreviewComponent: CodePreviewComponent2;
	
	router: Router;
	mainNav: any;
	title: string = 'example';
	showLogin: any;

	constructor(private data: Router, 
				private activatedRoute:ActivatedRoute, 
				private navService:NavService,
				private requestService: RequestService,
				private dataService: DataService,
				private userService: UserService) {
		this.router = data;
		var self = this;
		//this.router.navigate(['/example/management']);
	}

	ngOnInit() { 
		// initialize application legacy code (if any)
		var self = this;
		app.fullInit();
		delayBeforeFire(function() {
			app.loaded();	
		}, 100);
		
		this.showLogin = this.navService.on('modal:show-login-code').subscribe(data => this.onShowLogin(data));
	}
	
	ngOnDestroy() {
		this.router = null;
		this.mainNav = null;
		this.showLogin.unsubscribe();
	}
	
	handleError(error) {
		app.showAlert(null, error.tite, error.message);
	}
	
	navigateToDashboard() {
		this.router.navigateByUrl('/example/management');
	}
	
	previewLoaded($event) {}
	
	onShowLogin(user) {
		console.log('show login code', user);
		this.loginPreviewComponent.open("login:" + user + ":" + window.location.hostname);
	}
	
}
