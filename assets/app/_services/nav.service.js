"use strict";
/**
* NavService class is a service class for retrieve data from db to navigation tree
*
* @class NavService
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
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/map");
var NavService = (function () {
    /**
    * NavService constructor
    *
    * @class NavService
    * @constructor
    *
    */
    function NavService() {
        var _this = this;
        if (NavService_1.instance)
            return NavService_1.instance;
        this._eventBus = new Subject_1.Subject();
        this.eventSystemSelected = this.on('treenav:system-selected').subscribe(function (data) { return _this.onSystemSelect(data); });
        this.eventAreaSelected = this.on('treenav:areas-selected').subscribe(function (data) { return _this.onAreaSelected(data); });
        this.eventDateSelected = this.on('dateselector:change').subscribe(function (data) { return _this.onDateSelect(data); });
        this.eventSystemInit = this.on('treenav:system-init').subscribe(function (data) { return _this.onSystemInit(data); });
        this.eventAreaInit = this.on('treenav:areas-init').subscribe(function (data) { return _this.onAreaInit(data); });
        window.alarms = window.alarms || {};
        window.alarms.onSystem = this.onSystem.bind(this);
        app.ioServiceSubscribe(window.alarms.onSystem);
        this.areasSelected = [];
        this.systemsSelected = [];
        this.datesSelected = {};
        NavService_1.instance = this;
    }
    NavService_1 = NavService;
    /**
    * Event: Fired when data sources selected/deselected
    *
    * @event onSystemSelect
    * @param {Object} contains list of selected data sources
    * @example	The following is an example of data object:
    *
    *		{
    *			{id: 1, name: "RS3", server: "TQSDEVPISERVER", tag: "RNIAlarmBatchN", delimeter: "[\|]", …}
    *			{id: 10088, name: "Simulator", server: "TQSDEVPISERVER", tag: "sim_Temp_TD1", delimeter: null, …}
    *			length:2
    *		}
    *
    * @async
    */
    NavService.prototype.onSystemSelect = function (data) {
        this.systemsSelected = data;
        this.broadcastFilterModify();
    };
    /**
    * Event: Fired when Alarms application initialized
    *
    * @event onSystemInit
    * @param {Object} contains list of available systems
    * @example	The following is an example of data object:
    *
    *		{
    *			{id: 1, name: "RS3", server: "TQSDEVPISERVER", tag: "RNIAlarmBatchN", delimeter: "[\|]", …}
    *			{id: 10088, name: "Simulator", server: "TQSDEVPISERVER", tag: "sim_Temp_TD1", delimeter: null, …}
    *			length:2
    *		}
    *
    * @async
    */
    NavService.prototype.onSystemInit = function (data) {
        this.systemsSelected = data;
    };
    /**
    * Event: Fired when Date changes
    *
    * @event onDateSelect
    * @param {Object} contains selected period
    * @example	The following is an example of data object:
    *
    *		{
    *			fromDate:Tue Aug 15 2017 16:08:42 GMT+0300 (Russia TZ 2 Standard Time) {}
    *			toDate:Thu Sep 14 2017 16:08:42 GMT+0300 (Russia TZ 2 Standard Time) {}
    *			period:"30d"
    *		}
    *
    * @async
    */
    NavService.prototype.onDateSelect = function (data) {
        this.datesSelected = data;
        this.broadcastFilterModify();
    };
    /**
    * Event: Fired when Areas selected/deselected
    *
    * @event onAreaSelected
    * @param {Object} contains list of selected areas
    * @example	The following is an example of data object:
    *
    *		{
    *			{id: 31, name: "Facilities4", selected: true, equipment: Array(0), color: "#b20907"}
    *			{id: 32, name: "Area 04", selected: true, equipment: Array(0), color: "#099b2b"}
    *			length:2
    *		}
    *
    * @async
    */
    NavService.prototype.onAreaSelected = function (data) {
        this.areasSelected = data;
        this.broadcastFilterModify();
    };
    /**
    * Event: Fired when Areas initialized
    *
    * @event onAreaInit
    * @param {Object} contains list of available areas
    * @example	The following is an example of data object:
    *
    *		{
    *			{id: 31, name: "Facilities4", selected: true, equipment: Array(0), color: "#b20907"}
    *			{id: 32, name: "Area 04", selected: true, equipment: Array(0), color: "#099b2b"}
    *			{id: 33, name: "Area 05", selected: true, equipment: Array(0), color: "#efbf13"}
    *			{id: 34, name: "Area 07", selected: true, equipment: Array(0), color: "#ad15d3"}
    *			{id: 1056, name: "Area 08", selected: true, equipment: Array(0), color: "#d100c6"}
    *			length:5
    *		}
    *
    * @async
    */
    NavService.prototype.onAreaInit = function (data) {
        this.areasSelected = data;
    };
    NavService.prototype.getStartFilter = function () {
        return {
            systemsSelected: window.initialSystems,
            areasSelected: window.initialAreas,
            datesSelected: this.datesSelected
        };
    };
    NavService.prototype.getFilter = function () {
        return {
            areasSelected: this.areasSelected,
            systemsSelected: this.systemsSelected,
            datesSelected: this.datesSelected
        };
    };
    NavService.prototype.broadcastFilterModify = function () {
        this.broadcast('service:filter-modify', this.getFilter());
    };
    NavService.prototype.onSystem = function (data) {
        this.broadcast('service:system-modify', data);
    };
    NavService.prototype.broadcast = function (key, data) {
        this._eventBus.next({ key: key, data: data });
    };
    NavService.prototype.on = function (key) {
        return this._eventBus.asObservable()
            .filter(function (event) { return event.key === key; })
            .map(function (event) { return event.data; });
    };
    NavService = NavService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], NavService);
    return NavService;
    var NavService_1;
}());
exports.NavService = NavService;
//# sourceMappingURL=nav.service.js.map