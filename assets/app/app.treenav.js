"use strict";
/**
* TreeNavigation class is a front-end class for display navigation tree panel for sites, areas and datasources.
*
* @class TreeNavigation
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
var nav_service_1 = require("./_services/nav.service");
var data_service_1 = require("./_services/data.service");
var user_service_1 = require("./_services/user.service");
var TreeNavigation = (function () {
    /**
    * TreeNavigation constructor
    *
    * @class TreeNavigation
    * @constructor
    * @param {Object} navService - Alarms NavService class
    * @param {Object} dataService - Alarms DataService class
    *
    */
    function TreeNavigation(router, navService, dataService, userService) {
        var _this = this;
        this.router = router;
        this.navService = navService;
        this.dataService = dataService;
        this.userService = userService;
        this.navReady = new core_1.EventEmitter();
        if (userService.current) {
            this.availableUser(userService.current);
        }
        else {
            this.userService.getAccount().subscribe(function (event) { return _this.availableUser(event); }, function (error) { return _this.handleError(error); });
        }
    }
    TreeNavigation.prototype.ngOnInit = function () {
        //lpxAlarmsTour.Start();		
        this.navReady.emit("treenav:ok");
        /*
        this.eventSystemModified = this.navService.on('service:system-modify').subscribe(data => this.onSystemModify(data));
        this.eventOptions = this.navService.on('treenav:options').subscribe(data => this.toggleOptions(data));
        */
    };
    /**
    * Event: Fired when error is occured. Error handling for component Footer
    *
    * @event handleError
    * @param {Object} contains error description
    *
    * @async
    */
    TreeNavigation.prototype.handleError = function (error) {
        app.showAlert(null, error.tite, error.message);
    };
    /*
    ngAfterViewInit() {
        if (this.siteList) {
            this.siteList.changes.subscribe(t => {
                this.ngForRendred();
            });
        }
    }*/
    /**
    * Event: Fired when finishing initialization
    *
    * @event onInitFinish
    *
    */
    TreeNavigation.prototype.onInitFinish = function () {
        /*
        this.navService.broadcast("treenav:system-init", this.selectedSystems);
        this.navService.broadcast("treenav:areas-init", this.areas);
        */
    };
    TreeNavigation.prototype.newMapping = function () {
        console.log('new mapping');
    };
    TreeNavigation.prototype.ngOnDestroy = function () {
        this.eventSystemModified.unsubscribe();
        this.eventOptions.unsubscribe();
    };
    TreeNavigation.prototype.previewLoaded = function ($event) { };
    TreeNavigation.prototype.availableUser = function (user) {
        this.user = user;
    };
    TreeNavigation.prototype.displayLoginCode = function ($event) {
        if (this.user) {
            // this.loginPreviewComponent.open(this.user.email);
            this.navService.broadcast("modal:show-login-code", this.user.email);
        }
    };
    TreeNavigation.prototype.deleteMultiple = function ($event) {
        this.navService.broadcast("tool:delete-multiple", true);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TreeNavigation.prototype, "navReady", void 0);
    __decorate([
        core_1.ViewChild('sitesFor'),
        __metadata("design:type", core_1.QueryList)
    ], TreeNavigation.prototype, "siteList", void 0);
    TreeNavigation = __decorate([
        core_1.Component({
            selector: 'livepoint-tree-nav',
            templateUrl: '/example/appviews/treenav.html',
            providers: [data_service_1.DataService]
        }),
        __metadata("design:paramtypes", [router_1.Router,
            nav_service_1.NavService,
            data_service_1.DataService,
            user_service_1.UserService])
    ], TreeNavigation);
    return TreeNavigation;
}());
exports.TreeNavigation = TreeNavigation;
//# sourceMappingURL=app.treenav.js.map