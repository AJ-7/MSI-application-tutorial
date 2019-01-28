import {
    async,     
    inject,
    TestBed
} from '@angular/core/testing';

import { AppComponent } from './app.component';
import { Sidenav } from './app.sidenav';
import { DateSelector } from './app.dateselector';
import { TreeNavigation } from './app.treenav';
import { Footer } from './app.footer';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

import { RequestService } from './_services/request.service';
import { DataService }  from './_services/data.service';
import { SharedModule } from './shared.module';
import { DashboardHomeComponent } from './dashboard/dashboard-home.component';

class MockRouter {
    navigateByUrl(url: string) { return url; }
}


describe('AppComponent', () => {
	TestBed.prototype.resetTestingModule = function() { return true };
	let component: AppComponent;
	
	const oldResetTestingModule = TestBed.resetTestingModule;
	beforeAll(done => (async () => {
	  TestBed.resetTestingModule();
	  TestBed.configureTestingModule({
			imports: [ FormsModule, RouterTestingModule, HttpModule, SharedModule],
			declarations: [
				Sidenav,
				Footer,
				DateSelector,
				TreeNavigation,
				AppComponent,
				DashboardHomeComponent
			],
			providers: [RequestService,DataService]
		});
	  await TestBed.compileComponents().then(() => {
			const fixture = TestBed.createComponent(AppComponent);
			component = fixture.componentInstance;
	  });

	  // prevent Angular from resetting testing module
	  TestBed.resetTestingModule = () => TestBed;
	})().then(done).catch(done.fail));

	afterAll(() => {
	  // reinstate resetTestingModule method
	  TestBed.resetTestingModule = oldResetTestingModule;
	  TestBed.resetTestingModule();
	});
  
  
    /*
	it('should create alarms app', async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));

	it(`show have loaded the main alarms component`, async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app.title).toEqual('alarms');
	}));
	*/
	
	describe('Management / Dashboard', () => {
        it('should navigate to dashboard summary', inject([Router], (router: Router) => {
            const spy = spyOn(router, 'navigateByUrl');
            component.navigateToDashboard();
            const url = spy.calls.first().args[0];
            expect(url).toBe('/example/management');
        }));
		
		/*
		let dashboardComponent: DashboardHomeComponent;
		const createComponent = () => {
			const fixture = TestBed.createComponent(DashboardHomeComponent);
			dashboardComponent = fixture.componentInstance;
			fixture.detectChanges();
		};

		
		it('should call getGlobals for priorities and statuses', inject([DataService], (dataService: DataService) => {
			createComponent();
			spyOn(dataService, 'getGlobals');
			expect(dataService.getGlobals).toHaveBeenCalled();
		}));
		*/
    });
	
  
});
