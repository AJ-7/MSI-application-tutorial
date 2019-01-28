import { Component, NgZone,  Pipe, PipeTransform, Input, Output, EventEmitter, ElementRef} 	from '@angular/core';

declare var app:any;
declare var window:any;
declare var $:any;

@Component({
	selector: 'livepoint-dropdown',
	providers: [ ],
	template: `
		<div class="dropdown-container" [class.show]="listVisible">
			<div class="dropdown-display" (click)="show()" [class.clicked]="listVisible">
				<span class="placeholder" [innerHTML]="selectedItem.display"></span><i class="fa fa-angle-down"></i><i class="fa fa-trash-o dropdown-remove" [class.hidden]="!allowDeselect || !selectedItem.value" (click)="remove($event); $event.stopPropagation()"></i>
			</div>
			<div class="dropdown-list">
				<div>
					<div *ngFor="let item of items" (click)="select(item)" [class.selected]="selectedItem.display == item.display">
						<span>{{item.display}}</span>
						<i class="fa fa-check"></i>
					</div>
				</div>
			</div>
		</div>
        `,
	 host: {
		'(document:click)': 'onClick($event)',
	}
})

export class DropdownComponent { 
	
	@Input() selectText: string;
	@Input() emptyText: string;
	@Input() items: Array<any>;
	@Input() defaultItem: any;
	@Input() allowDeselect: boolean = false;
	@Output() selected: EventEmitter<any> = new EventEmitter<any>();
	@Output() removed: EventEmitter<any> = new EventEmitter<any>();
	selectedItem: any;
	listVisible: boolean;
	
	constructor(private ngZone: NgZone, private _eref: ElementRef) {}

	ngOnInit() { 
		this.listVisible = false;
		
		if (this.defaultItem)  {
			if (typeof this.defaultItem === 'object') {
				this.selectedItem = this.defaultItem;		
			} else {
				for (var i = 0; i < this.items.length; i++) {
					if (this.items[i].value == this.defaultItem)
						this.selectedItem = this.items[i];
				}
			}
			return;
		}		
		
		this.selectedItem = {
			display: this.emptyText,
			value: null
		};
	}
		
	ngOnDestroy() {

	}
	
	onClick(event) {
		if (!this._eref.nativeElement.contains(event.target)) // or some similar check
			this.listVisible = false;
	}
	
	show() {
		if (!this.listVisible)
			$('.dropdown-container.show').removeClass('show');
		
		this.listVisible = !this.listVisible
	}
	
	remove($event) {
		this.removed.emit({component:this});
	}
	
	select(item) {
		this.selectedItem = item;
		this.selected.emit({component:this,item:item});
		this.listVisible = false;
	}
	
	getSelectedItem() {
		return this.selectedItem;
	}
	
	setValue(value) {
		if(!this.items) return;		
		for (var i = 0; i < this.items.length; i++) {
			if (this.items[i].value == value)
				this.selectedItem = this.items[i];
		}		
	}
	
	reset(withdisplay) {
		this.selectedItem = {
			display: this.emptyText,
			value: null
		};
		
		if (withdisplay) {			
			for (var i = 0; i < this.items.length; i++) {
				if (this.items[i].display == withdisplay)
					this.selectedItem = this.items[i];
			}
		}
		
	}
}
