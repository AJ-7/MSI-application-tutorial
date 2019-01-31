import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { DropdownComponent } from './components/dropdown.component';
import { CodePreviewComponent } from './components/codepreview.component';
import { CodePreviewComponent2 } from './components/codepreview2.component';
import { ElementSearchComponent } from './components/elementsearch.component';
import { SelectModule } from 'angular2-select';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { NgxPaginationModule } from 'ngx-pagination';

import { RequestService } from './_services/request.service';
import { NavService } from './_services/nav.service';
import { NgxSmartModalModule } from 'ngx-smart-modal';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
		SelectModule,
		SlimLoadingBarModule.forRoot(),
		NgxPaginationModule,
		NgxSmartModalModule.forRoot()
    ],
    declarations: [
	  DropdownComponent,
	  CodePreviewComponent,
	  CodePreviewComponent2,
	  ElementSearchComponent
    ],
    providers: [
		RequestService,
		NavService
    ],
    exports: [
	  DropdownComponent,
	  CodePreviewComponent,
	  CodePreviewComponent2,
	  ElementSearchComponent,
	  SlimLoadingBarModule,
	  FormsModule,
	  NgxPaginationModule,
	  NgxSmartModalModule
    ]
})
export class SharedModule {}