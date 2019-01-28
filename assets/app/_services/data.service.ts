/**
* DataService class is a service class for data requests and end points container
*
* @class DataService
* @module Alarms
*/

// Observable Version
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams, QueryEncoder} from '@angular/http';
import { SharedModule } from '../shared.module';
import { RequestService } from './request.service';

import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/forkJoin';

declare var app:any;

@Injectable()
export class DataService {
	
	private recordAuditEventUrl = '/audit/create';
	
	/**
	* DataService constructor
	* 
	* @class DataService
	* @constructor
	*
	*/
	constructor (private http: Http, private requestService: RequestService) {
		
	}

	/**
	* Event: Fired when error is occured. Error handling for data service 
	*
	* @event handleError
	* @param {Object} contains error description
	*
	* @async
	*/
	private handleError (error: Response | any) {
		let errMsg: string;
		let retError: any;
		if (error instanceof Response) {
			try {
				const body = error.json() || '';
				const err = body.error || JSON.stringify(body);
				errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
				retError = body;
			} catch(ex) {
				errMsg = error.toString();
				retError = {message: errMsg}
			}
		} else {
			errMsg = error.message ? error.message : error.toString();
			retError = {message: errMsg}
		}
		console.error('error in response', errMsg);
		return Observable.throw(retError);
	}
	
	
	/**
	* Saves audit event
	*
	* @method recordAuditEvent
	* @async
	*/	
	recordAuditEvent(data): Observable<any[]> {
		return this.requestService.postRequest(this.recordAuditEventUrl, data);
	}
	
}


