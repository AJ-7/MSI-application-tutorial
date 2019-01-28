import { NgModule }     from '@angular/core';
import { RouterModule, Router } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PreloadSelectedModules } from './selective-preload-strategy';

@NgModule({
  imports: [
    RouterModule.forRoot([
		{
			path: 'example/management',
			loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
			data: {
				preload: true
			}
		},
		{ path: '', component: DashboardComponent}
    ],
    { preloadingStrategy: PreloadSelectedModules })
  ],
  exports: [
    RouterModule
  ],
  providers: [
    PreloadSelectedModules
  ]
})
export class AppRoutingModule {
	constructor( private _r:Router ){}
}
