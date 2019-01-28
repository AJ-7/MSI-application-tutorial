import { NgModule}       	from '@angular/core';
import { RouterModule }   from '@angular/router';
import { BrowserModule  } 	from '@angular/platform-browser';
import { Sidenav }   		from './app.sidenav';
import { Footer }   		from './app.footer';
import { DateSelector }   		from './app.dateselector';
import { TreeNavigation }   		from './app.treenav';
import { AppComponent }   	from './app.component';
import { AppRoutingModule }     from './app-routing.module';

import { NavService } from './_services/nav.service';
import { HttpModule } from '@angular/http';

import { DashboardModule }  from './dashboard/dashboard.module';
import { SharedModule } from './shared.module';

@NgModule({
    declarations: [AppComponent,Sidenav,Footer,DateSelector,TreeNavigation],
	providers: [],
    imports:    [
					BrowserModule,
					HttpModule,
					AppRoutingModule,
					DashboardModule,
					SharedModule
				],
					
    bootstrap:    [AppComponent]
})
export class AppModule {}
