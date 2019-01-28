"use strict";
/**
* UserService class is a service class for user representation
*
* @class UserService
* @module Alarms
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Observable Version
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var UserService = (function () {
    /**
    * UserService constructor
    *
    * @class UserService
    * @constructor
    *
    */
    function UserService(http) {
        this.http = http;
        /**
         * user account url
         *
         * @attribute accountUrl
         * @type string
        */
        this.accountUrl = '/example/data/user';
        /**
         * applications url
         *
         * @attribute applications
         * @type string
        */
        this.applications = '/application/all';
        if (UserService_1.instance)
            return UserService_1.instance;
        this.current = null;
        UserService_1.instance = this;
    }
    UserService_1 = UserService;
    /**
    * Returns current user or ask for new account information
    *
    * @method getAccount
    * @async
    */
    UserService.prototype.getAccount = function () {
        if (this.current) {
            return this.current.asObservable();
        }
        return this.http.get(this.accountUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };
    /**
    * Returns available applications
    *
    * @method getApplications
    * @async
    */
    UserService.prototype.getApplications = function () {
        return this.http.get(this.applications)
            .map(this.appsExtract)
            .catch(this.handleError);
    };
    /**
    * Returns parsed applications from json object
    *
    * @method appsExtract
    * @async
    */
    UserService.prototype.appsExtract = function (res) {
        var body = res.json();
        return body.applications;
    };
    /**
    * Returns parsed users from json object
    *
    * @method extractData
    * @async
    */
    UserService.prototype.extractData = function (res) {
        var body = res.json();
        this.current = body.user || {};
        return this.current;
    };
    /**
    * Event: Fired when error is occured. Error handling for data service
    *
    * @event handleError
    * @param {Object} contains error description
    *
    * @async
    */
    UserService.prototype.handleError = function (error) {
        var errMsg;
        var retError;
        if (error instanceof http_1.Response) {
            try {
                var body = error.json() || '';
                var err = body.error || JSON.stringify(body);
                errMsg = error.status + " - " + (error.statusText || '') + " " + err;
                retError = body;
            }
            catch (ex) {
                errMsg = error.toString();
                retError = { message: errMsg };
            }
        }
        else {
            errMsg = error.message ? error.message : error.toString();
            retError = { message: errMsg };
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(retError);
    };
    UserService = UserService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], UserService);
    return UserService;
    var UserService_1;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map