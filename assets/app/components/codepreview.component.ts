import { Component, NgZone, ViewChild, Output, Input, EventEmitter, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Location } from '@angular/common';
import { DataService }       from '../_services/data.service';
import { NavService }       from '../_services/nav.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSmartModalService, NgxSmartModalComponent } from 'ngx-smart-modal';

declare var jQuery:any;
declare var $:any;
declare var app:any;
declare var delayBeforeFire:any;
declare var window:any;
declare var moment:any;
declare var lpxAlarmsTour: any;
declare var QRCode: any;

@Component({
	selector: 'livepoint-code-preview',
	templateUrl: '/example/appviews/components/codepreview.html',
	providers: [ DataService ],
})

export class CodePreviewComponent implements AfterViewInit { 
	
	mode = 'Observable';
	
	@Input() alarmQuery: string;
	@Output() loaded: EventEmitter<any> = new EventEmitter<any>();
	
	text: string;
	message: string;
	tmpMessage: string = "";
	qrcode: any;
	
	constructor(private ngZone: NgZone, 
				private router: Router,
				private route: ActivatedRoute,
				private http: Http,
				private dataService: DataService,
				private navService: NavService,
				private location: Location,
				public ngxSmartModalService: NgxSmartModalService) {
					
		this.text = ".";
		this.message = "generating code...";
	}
		 
	ngOnInit() { 
		this.loaded.emit({component: this});		
	}
	
	ngOnDestroy() {		
	}
	
	ngAfterViewInit() {
		var self = this;
		this.ngxSmartModalService.getModal('codePreview').onOpen.subscribe((modal: NgxSmartModalComponent) => {
			
			self.message = "generating code...";
			setTimeout(() => {
				self.qrcode = new QRCode(document.getElementById("code-preview-area"), {
					text: self.text,
					width: 300,
					height: 300,
					colorDark : "#454545",
					colorLight : "#ffffff",
					correctLevel : QRCode.CorrectLevel.H
				});
				
				self.message = self.tmpMessage;
				console.log('set message', self.tmpMessage, self.message);
			}, 800);
		});
		
		this.ngxSmartModalService.getModal('codePreview').onAnyCloseEvent.subscribe((modal: NgxSmartModalComponent) => {
			self.emptyModal();
		});
	}
	
	emptyModal() {
		$(".code-preview-area").empty();
	}
	
	handleError(error) {
		app.resetLoader();
		app.showAlert(null, error.tite, error.message);
	}
	
	open(text:string) {
		this.text = text;
		this.tmpMessage = text;
		console.log('text is', text);
		this.ngxSmartModalService.getModal('codePreview').open();
	}
	
	close() {
		this.ngxSmartModalService.getModal('codePreview').close();
	}
	
	print() {
		this.printElement($('#code-preview-area'));
	}
	
	printElement(e) {
	  var ifr = document.createElement('iframe');
	  //ifr.style='height: 100%; text-align:center; vertical-align: middle; width: 100%'
	  document.body.appendChild(ifr);

	  $(e).clone().appendTo(ifr.contentDocument.body);
	  ifr.contentWindow.print();

	  ifr.parentElement.removeChild(ifr);
	}
}
