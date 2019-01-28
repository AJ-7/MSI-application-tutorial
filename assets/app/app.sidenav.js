"use strict";
/**
* Sidenav class is a front-end class for display navigation panel for application menu, user options and logout button.
*
* @class Sidenav
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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var user_service_1 = require("./_services/user.service");
var data_service_1 = require("./_services/data.service");
var Sidenav = (function () {
    /**
    * Sidenav constructor
    *
    * @class Sidenav
    * @constructor
    * @param {Object} userService - Alarms UserService class
    * @param {Object} dataService - Alarms DataService class
    *
    */
    function Sidenav(router, userService, dataService) {
        var _this = this;
        this.router = router;
        this.userService = userService;
        this.dataService = dataService;
        this.sidenavReady = new core_1.EventEmitter();
        this.applications = [];
        this.isAdmin = false;
        this.config = {
            displayedName: '',
            description: '',
            version: ''
        };
        var self = this;
        if (userService.current) {
            this.availableUser(userService.current);
        }
        else {
            this.userService.getAccount().subscribe(function (event) { return _this.availableUser(event); }, function (error) { return _this.handleError(error); });
        }
        this.userService.getApplications().subscribe(function (event) { return _this.availableApps(event); }, function (error) { return _this.handleError(error); });
        /*
        this.dataService.getConfig().subscribe(
                event => this.availableConfig(event),
                error => this.handleError(error)
            );
        */
    }
    Sidenav.prototype.ngOnInit = function () {
        this.sidenavReady.emit("sidenav:ok");
    };
    /**
    * Retrieve an available configuration for current application.
    *
    * @method availableConfig
    * @param {Object} data.result Object representation of current configuration.
    * @example	The following is an example of request result:
    *
    *		{
    *			err:null
    *			result:
    *				description:"Alarms"
    *				displayedName:"Alarms"
    *				version:"1.0.245"
    *		}
    *
    * @async
    */
    Sidenav.prototype.availableConfig = function (data) {
        this.config = data.result;
    };
    /**
    * Retrieve an available user for current application.
    *
    * @method availableUser
    * @param {Object} user Object representation of current user.
    * @example	The following is an example of request result:
    *
    *		{
    *			attributes:null
    *			createdAt:"2017-09-04T00:00:00.000Z"
    *			email:"admin@localhost"
    *			id:1
    *			isAdmin:true
    *			isLocal:true
    *			name:"System Administrator"
    *			profilePicture:null
    *			realm:"localhost"
    *			role:"sysadmin"
    *			roleChain:["sysadmin"]
    *			updatedAt:"2017-09-04T00:00:00.000Z"
    *		}
    *
    * @async
    */
    Sidenav.prototype.availableUser = function (user) {
        this.user = user;
        this.userName = this.user.name;
        if (user.role == "sysadmin" || $.inArray(user.roleChain, "example-admin") != -1)
            this.isAdmin = true;
    };
    /**
    * Retrieve an available applications for current user.
    *
    * @method availableApps
    * @param {Object} apps Object representation of available applications.
    * @example	The following is an example of request result:
    *
    *		{
    *			0:
    *				db:
    *					appId:"alarms"
    *					createdAt:"2017-09-08T00:00:00.000Z"
    *					description:"Alarms"
    *					displayedName:"Alarms"
    *					iconPath:""
    *					id:5
    *					isActive:true
    *					isPublic:true
    *					updatedAt:"2017-09-13T00:00:00.000Z"
    *		}
    *
    * @async
    */
    Sidenav.prototype.availableApps = function (apps) {
        this.applications = apps || [];
    };
    Sidenav.prototype.switchApplication = function (app) {
        window.location.href = app.raw.applicationEntryPoint;
    };
    /**
    * Event: Fired when error is occured. Error handling for component Footer
    *
    * @event handleError
    * @param {Object} contains error description
    *
    * @async
    */
    Sidenav.prototype.handleError = function (error) {
        app.showAlert(null, error.tite, error.message);
    };
    Sidenav.prototype.displayUserProfile = function () {
        console.debug('display profile');
    };
    Sidenav.prototype.signOut = function () {
        app.signout();
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], Sidenav.prototype, "sidenavReady", void 0);
    Sidenav = __decorate([
        core_1.Component({
            selector: 'livepoint-sidenav',
            templateUrl: '/example/appviews/sidenav.html',
            providers: [user_service_1.UserService, data_service_1.DataService]
        }),
        __metadata("design:paramtypes", [router_1.Router, user_service_1.UserService, data_service_1.DataService])
    ], Sidenav);
    return Sidenav;
}());
exports.Sidenav = Sidenav;
//# sourceMappingURL=app.sidenav.js.map