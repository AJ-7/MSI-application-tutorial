/**
* RequestService class is a service class for getting and posting http requests
*
* @class RequestService
* @module Alarms
*/

// Observable Version
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams, QueryEncoder} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

declare var app:any;
declare var window:any;
declare var $:any;

@Injectable()
export class RequestService {
	
	/**
	* RequestService constructor
	* 
	* @class RequestService
	* @constructor
	*
	*/
	constructor (private http: Http, private slimLoadingBarService: SlimLoadingBarService) {
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
		if (this.slimLoadingBarService) 
			this.slimLoadingBarService.color = 'red';
		
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
		console.error(errMsg);
		app.finishLoading();
		if (this.slimLoadingBarService)
			this.slimLoadingBarService.complete();
		return Observable.throw(retError);
	}
	
	/**
	* Returns configured http header
	*
	* @method createOptions
	* @async
	*/	
	private createOptions() {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return options;
	}
	
	/**
	* Get HTTP request and returns json object
	*
	* @method getRequest
	* @param {String} URL String
	* @param {Object} data object (null by default)
	* @async
	*/	
	public getRequest(url: string, data?: any): Observable<any> {
		let options = this.createOptions();
		let params = new URLSearchParams();
		if (data) {
			for (let key in data) {
				params.set(key, data[key]);
			}
			options.search = params;
		}
		app.startLoading();
		if (this.slimLoadingBarService) {
			this.slimLoadingBarService.color = 'firebrick';
			this.slimLoadingBarService.start();
		}
		return this.http.get(url, options)
			.map((r: Response) => {
				if (this.slimLoadingBarService) {
					this.slimLoadingBarService.color = 'green';
					this.slimLoadingBarService.complete();
				}
				app.finishLoading();
				return r.json() || {};
			})
			.catch(this.handleError);
	}

	
	/**
	* Get HTTP request and returns json object
	*
	* @method getRequest
	* @param {String} URL String
	* @param {Object} data object
	* @example	The following is an example of data object:
	* 
	*		{
	*			areas: "31,32,33,34,1056"
	*			systems:"1,10088"
	*			from:1505387631
	*			to:1505391231
	*		} 
	* @async
	*/	
	public postRequest(url: string, data: any):Observable<any> {
		app.startLoading();
		if (this.slimLoadingBarService) {
			this.slimLoadingBarService.color = 'firebrick';
			this.slimLoadingBarService.start();
		}
		return this.http.post(url, JSON.stringify(data), this.createOptions())
			.map((response: any) => {
				if (this.slimLoadingBarService) {
					this.slimLoadingBarService.color = 'green';
					this.slimLoadingBarService.complete();
				}
				app.finishLoading();
				if (response._body && response._body.length > 0) {
					return response.json() || {};
				}
				return {}; // empty response
			})
			.catch(this.handleError);
	}
	
}


