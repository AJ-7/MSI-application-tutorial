import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardHomeComponent } from './dashboard-home.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardDetailsComponent } from './dashboard-details.component';


@NgModule({
  imports: [
   RouterModule.forChild([
		{
			path: '',
			component: DashboardComponent,
			children: [
				{
					path: '',
					component: DashboardHomeComponent
				},
				{
					path: 'edit',
					component: DashboardDetailsComponent,
				},
				{
					path: '**',
					component: DashboardHomeComponent
				}
			]
		}
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [
    
  ]
})
export class DashboardRoutingModule { }

