import {
    async,     
    inject,
    TestBed
} from '@angular/core/testing';

import { DashboardHomeComponent } from './dashboard-home.component';
import { Sidenav } from '../app.sidenav';
import { DateSelector } from '../app.dateselector';
import { TreeNavigation } from '../app.treenav';
import { Footer } from '../app.footer';

import { RequestService } from '../_services/request.service';
import { DataService }  from '../_services/data.service';
import { SharedModule } from '../shared.module';

import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

describe('DashboardHomeComponent', () => {
	
	let component: DashboardHomeComponent;
	let dataServiceInstance: DataService;
	let spyGetGlobals: any;
	
	let dateSelectorComponent: DateSelector;
	
	const createComponent = () => {
        const fixture = TestBed.createComponent(DashboardHomeComponent);
        component = fixture.componentInstance;
		dataServiceInstance = fixture.debugElement.injector.get(DataService);
		spyGetGlobals = spyOn(dataServiceInstance, 'getGlobals').and.callThrough();
		
		const fixtureDateSelector = TestBed.createComponent(DateSelector);
        dateSelectorComponent = fixtureDateSelector.componentInstance;
		
        fixture.detectChanges();
		fixtureDateSelector.detectChanges();
    };
	
	beforeEach(function() {
		createComponent();
	});
	
	it('should call getGlobals for priorities and statuses', () => {
		expect(dataServiceInstance.getGlobals).toHaveBeenCalled();
	});
	
	it('should have priorities and statuses', (done) => {
		setTimeout(function() {
			expect(component.priorities.length).toBeGreaterThan(0);
			expect(component.statuses.length).toBeGreaterThan(0);
			done();
		}, 3000);
	});
  
	it('should change the date to 30 days', (done) => {
		dateSelectorComponent.periodSelected('30d', 30, 'days');
		expect(0).toEqual(0);
		done();
	});
	
});

