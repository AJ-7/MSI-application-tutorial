import { Component, NgZone,  Pipe, PipeTransform, Input, Output, EventEmitter} 	from '@angular/core';

declare var app:any;
declare var window:any;
declare var $:any;

@Component({
	selector: 'autocomplete',
	providers: [ ],
	template: `
		<div class="auto-complete-group">
			<label *ngIf="fieldName">{{fieldName}}</label>
			<input type="text" class="form-control validate filter-input" placeholder="{{placeHolder}}" [(ngModel)]="query" (keyup)="filter()" id="{{fieldId}}"/>
			<span class="fa fa-times-circle auto-complete-clear" (click)="clear()" *ngIf="selected"></span>
		</div>
		<div class="dropdown open" *ngIf="filteredList.length > 0">
			<ul class="dropdown-menu dropdown-right auto-complete-dropdown">
				<li *ngFor="let item of filteredList">
					<a class="auto-complete-a" (click)="select(item)"> <strong [innerHTML]="item.display"></strong> <span *ngIf="item.additional" class="auto-complete-additional" [innerHTML]="item.additional"></span></a>
				</li>
			</ul>
		</div>	
        `
})

export class AutoCompleteComponent { 
	
	@Input() reference: any;
	@Input() fieldId: string;
	@Input() fieldName: string;
	@Input() placeHolder: string;
	@Output() filterEvent: EventEmitter<any> = new EventEmitter<any>();
	@Output() selectEvent: EventEmitter<any> = new EventEmitter<any>();
	query: string;
	filteredList: Array<any>;
	selected: boolean;
	
	constructor(private ngZone: NgZone) {}

	ngOnInit() { 
		this.query = '';
		this.filteredList = [];
		this.selected = false;
	}
	
	ngOnDestroy() {

	}
	
	setItem(item) {
		this.query = item.display;
		this.filteredList = [];
		this.selected = true;
	}
	
	setList(list) {
		this.filteredList = list;
	}
	
	getReference() {
		return this.reference;
	}

	filter() {
		if (this.query !== ""){
			this.filterEvent.emit({component:this,query:this.query});
		}else{
			this.filteredList = [];
		}
	}
	
	select(item) {
		this.query = item.display;
		this.filteredList = [];
		this.selected = true;
		this.selectEvent.emit({component:this,item:item});
	}
	
	clear() {
		this.query = "";
		this.filteredList = [];
		this.selected = false;
		this.selectEvent.emit({component:this,item:null});
	}
	
	reset() {
		this.query = "";
		this.filteredList = [];
		this.selected = false;
	}
}
