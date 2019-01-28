"use strict";
/**
* DataService class is a service class for data requests and end points container
*
* @class DataService
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
var request_service_1 = require("./request.service");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
require("rxjs/add/observable/forkJoin");
var DataService = (function () {
    /**
    * DataService constructor
    *
    * @class DataService
    * @constructor
    *
    */
    function DataService(http, requestService) {
        this.http = http;
        this.requestService = requestService;
        this.recordAuditEventUrl = '/audit/create';
    }
    /**
    * Event: Fired when error is occured. Error handling for data service
    *
    * @event handleError
    * @param {Object} contains error description
    *
    * @async
    */
    DataService.prototype.handleError = function (error) {
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
        console.error('error in response', errMsg);
        return Observable_1.Observable.throw(retError);
    };
    /**
    * Saves audit event
    *
    * @method recordAuditEvent
    * @async
    */
    DataService.prototype.recordAuditEvent = function (data) {
        return this.requestService.postRequest(this.recordAuditEventUrl, data);
    };
    DataService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, request_service_1.RequestService])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map