import { Component, NgZone, ViewChild, Output, Input, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Location } from '@angular/common';
import { DataService }       from '../_services/data.service';
import { NavService }       from '../_services/nav.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSmartModalService } from 'ngx-smart-modal';


declare var jQuery:any;
declare var $:any;
declare var app:any;
declare var delayBeforeFire:any;
declare var window:any;
declare var moment:any;
declare var lpxAlarmsTour: any;


@Component({
	selector: 'livepoint-element-search',
	templateUrl: '/arcfg/appviews/components/elementsearch.html',
	providers: [ DataService ],
})

export class ElementSearchComponent { 
	
	mode = 'Observable';
	
	@Input() showWarning: boolean;
	@Input() showMultiple: boolean;
	@Output() loaded: EventEmitter<any> = new EventEmitter<any>();
	@Output() selected: EventEmitter<any> = new EventEmitter<any>();
	
	searchPath: string;
	foundElements: any[] = [];
	searching: boolean = false;
	
	currentPage: number;
	pageSize: number;
	totalElements: number;
	
	// when null, search by path
	parent: any;
	
	constructor(private ngZone: NgZone, 
				private router: Router,
				private route: ActivatedRoute,
				private http: Http,
				private dataService: DataService,
				private navService: NavService,
				private location: Location,
				public ngxSmartModalService: NgxSmartModalService) {
					
		this.currentPage = 1;
		this.pageSize = 10;		
		this.totalElements = 0;
		this.parent = null;
		this.showWarning = false;
		this.showMultiple = false;
	}
		 
	ngOnInit() { 
		this.loaded.emit({component: this});		
	}
	
	ngOnDestroy() {		
	}
	
	handleError(error) {
		this.searching = false;
		app.resetLoader();
		app.showAlert(null, error.tite, error.message);
	}
	
	openSearch() {
		this.ngxSmartModalService.getModal('searchData').open();
	}
	
	close() {
		this.ngxSmartModalService.getModal('searchData').close();
	}
	
	pageChanged($event) {	
		this.currentPage = $event;
		if (this.parent) {
			this.searchByParent(this.parent);
		} else {
			this.searchPathChanged({});
		}
	}
	
	foundElementData(event) {
		//console.log('found', event);
		
		this.searching = false;
		if (!event.response)
			return;
		
		this.totalElements = event.response.numFound;
		event.response.docs.forEach(function(el) {
			el.path = el.namepath.join('\\');
			el.info = `Server: ${el.server}<br>GUID:${el.id}`;
			el.attrTitle = el.hasattributes ? "This element has attributes" : "No attributes";
		});
		
		this.foundElements = event.response.docs;
		setTimeout(function() {
			$('[data-toggle="tooltip"]').tooltip();
		}, 800);
	}
	
	getCurrentPage() {
		return (this.currentPage-1) * this.pageSize;
	}
	
	searchPathChanged($event) {
		//console.log('search for', this.searchPath);
		this.parent = null;
		
		if (this.searching)
			return;
		
		this.searching = true;
		this.dataService.findElement(this.searchPath, this.getCurrentPage()).subscribe(
			event => this.foundElementData(event),
			error => this.handleError(error)
		);
	}
	
	searchByParent(item) {
		if (this.searching)
			return;
		
		this.parent = item;
		this.searching = true;
		this.dataService.findElementByParent(item.id, this.getCurrentPage()).subscribe(
			event => this.foundElementData(event),
			error => this.handleError(error)
		);
	}
	
	selectedItem(item) {
		if (item.haschildren) {
			this.searchPath = item.path;
			return this.searchByParent(item);
		}
		
		if (!item.hasattributes) {
			return app.showAlert(null, "No attributes", "The selected element does not have any attributes and cannot be selected. Please refine your search and try again.");
		}
	}
	
	chooseItem($event, item) {
		$event.stopPropagation();
		if (!item.hasattributes) 
			return;
		
		this.selected.emit({component:this,item:item});
	}
	
	chooseMultipleItem($event) {
		this.selected.emit({component:this,query:this.searchPath});
	}
}
