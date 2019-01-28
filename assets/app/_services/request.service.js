"use strict";
/**
* RequestService class is a service class for getting and posting http requests
*
* @class RequestService
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
var http_2 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var RequestService = (function () {
    /**
    * RequestService constructor
    *
    * @class RequestService
    * @constructor
    *
    */
    function RequestService(http, slimLoadingBarService) {
        this.http = http;
        this.slimLoadingBarService = slimLoadingBarService;
    }
    /**
    * Event: Fired when error is occured. Error handling for data service
    *
    * @event handleError
    * @param {Object} contains error description
    *
    * @async
    */
    RequestService.prototype.handleError = function (error) {
        if (this.slimLoadingBarService)
            this.slimLoadingBarService.color = 'red';
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
        app.finishLoading();
        if (this.slimLoadingBarService)
            this.slimLoadingBarService.complete();
        return Observable_1.Observable.throw(retError);
    };
    /**
    * Returns configured http header
    *
    * @method createOptions
    * @async
    */
    RequestService.prototype.createOptions = function () {
        var headers = new http_2.Headers({ 'Content-Type': 'application/json' });
        var options = new http_2.RequestOptions({ headers: headers });
        return options;
    };
    /**
    * Get HTTP request and returns json object
    *
    * @method getRequest
    * @param {String} URL String
    * @param {Object} data object (null by default)
    * @async
    */
    RequestService.prototype.getRequest = function (url, data) {
        var _this = this;
        var options = this.createOptions();
        var params = new http_2.URLSearchParams();
        if (data) {
            for (var key in data) {
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
            .map(function (r) {
            if (_this.slimLoadingBarService) {
                _this.slimLoadingBarService.color = 'green';
                _this.slimLoadingBarService.complete();
            }
            app.finishLoading();
            return r.json() || {};
        })
            .catch(this.handleError);
    };
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
    RequestService.prototype.postRequest = function (url, data) {
        var _this = this;
        app.startLoading();
        if (this.slimLoadingBarService) {
            this.slimLoadingBarService.color = 'firebrick';
            this.slimLoadingBarService.start();
        }
        return this.http.post(url, JSON.stringify(data), this.createOptions())
            .map(function (response) {
            if (_this.slimLoadingBarService) {
                _this.slimLoadingBarService.color = 'green';
                _this.slimLoadingBarService.complete();
            }
            app.finishLoading();
            if (response._body && response._body.length > 0) {
                return response.json() || {};
            }
            return {}; // empty response
        })
            .catch(this.handleError);
    };
    RequestService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, ng2_slim_loading_bar_1.SlimLoadingBarService])
    ], RequestService);
    return RequestService;
}());
exports.RequestService = RequestService;
//# sourceMappingURL=request.service.js.map