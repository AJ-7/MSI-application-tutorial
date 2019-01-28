import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DashboardHomeComponent } from './dashboard-home.component';
import { DashboardDetailsComponent } from './dashboard-details.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared.module';
import { NavService } from '../_services/nav.service';

@NgModule({
  imports: [
		CommonModule,
		FormsModule,
		DashboardRoutingModule,
		SharedModule
  ],
  declarations: [
		DashboardComponent,
		DashboardHomeComponent,
		DashboardDetailsComponent
  ],
  providers: [
  ]
})
export class DashboardModule {}