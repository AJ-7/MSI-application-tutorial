/**
* UserService class is a service class for user representation
*
* @class UserService
* @module Alarms
*/

// Observable Version
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams, QueryEncoder} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

declare var app:any;
declare var window:any;

@Injectable()
export class UserService {
	
	/**
	 * local copy of UserService class
	 *
	 * @attribute instance
	 * @type UserService
	*/
	static instance: UserService;
	
	
	/**
	 * user account url
	 *
	 * @attribute accountUrl
	 * @type string
	*/
	private accountUrl = '/example/data/user';

	/**
	 * applications url
	 *
	 * @attribute applications
	 * @type string
	*/
	private applications = '/application/all'

	/**
	 * current user
	 *
	 * @attribute current
	*/
	public current: any;

	/**
	* UserService constructor
	* 
	* @class UserService
	* @constructor
	*
	*/
	constructor (private http: Http) {
		if(UserService.instance) return UserService.instance;
		this.current = null;
		UserService.instance = this;
	}

	/**
	* Returns current user or ask for new account information
	*
	* @method getAccount
	* @async
	*/	
	getAccount (): Observable<any[]> {
		
		if (this.current) {
			return this.current.asObservable();
		}
		
		return this.http.get(this.accountUrl)
						.map(this.extractData)
						.catch(this.handleError);
	}
	
	/**
	* Returns available applications
	*
	* @method getApplications
	* @async
	*/	
	getApplications (): Observable<any[]> {
		return this.http.get(this.applications)
						.map(this.appsExtract)
						.catch(this.handleError);
	}
	
	/**
	* Returns parsed applications from json object
	*
	* @method appsExtract
	* @async
	*/	
	private appsExtract(res: Response) {
		let body = res.json();
		return body.applications;
	}

	/**
	* Returns parsed users from json object
	*
	* @method extractData
	* @async
	*/	
	private extractData(res: Response) {
		let body = res.json();
		this.current = body.user || {};
		return this.current;
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
		console.error(errMsg);
		return Observable.throw(retError);
	}
	
}


