"use strict";
/**
* The DateSelector class is used for select dates and periods
*
* @class SecurityController
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
var DateSelector = (function () {
    /**
    * DateSelector constructor
    *
    * @class DateSelector
    * @constructor
    * @param {Object} navService - Alarms NavService class
    *
    */
    function DateSelector(ngZone, router, navService) {
        this.ngZone = ngZone;
        this.router = router;
        this.navService = navService;
        this.dateSelectorReady = new core_1.EventEmitter();
        this.starting = true;
        this.firstRunFrom = true;
        this.firstRunTo = true;
        window.alarms = window.alarms || {};
        window.alarms.onFromDateChange = this.fromDateChange.bind(this);
        window.alarms.toDateChange = this.toDateChange.bind(this);
        this.selectedPeriod = null;
    }
    /**
    * DateSelector creation and initialisation
    *
    * @method ngOnInit
    * @async
    */
    DateSelector.prototype.ngOnInit = function () {
        console.log('Date selctor init');
        var self = this;
        this.dateSelectorReady.emit("dateselector:ok");
        self.selectedPeriod = "8h";
        this.toDate = moment();
        this.fromDate = moment().subtract(1, 'hour');
        delayBeforeFire(function () {
            self.starting = false;
            app.datePicker("#dateFrom", window.alarms.onFromDateChange);
            app.datePicker("#dateTo", window.alarms.toDateChange);
            self.changeDisplay();
        }, 100);
    };
    /**
    * DateSelector clearing and deleting
    *
    * @method ngOnDestroy
    * @async
    */
    DateSelector.prototype.ngOnDestroy = function () {
        window.alarms.onFromDateChange = null;
        window.alarms.toDateChange = null;
    };
    /**
    * change displayed information about current dates and periods
    *
    * @method changeDisplay
    * @async
    */
    DateSelector.prototype.changeDisplay = function () {
        this.fromDateDisplay = this.fromDate.format(app.dateFormat);
        this.toDateDisplay = this.toDate.format(app.dateFormat);
    };
    /**
    * Event: Fired when period changes in DateSelector component
    *
    * @event periodSelected
    * @param {Object} Event from component DateSelector (see example below).
    * @example	The following is an example of event:
    *
    *		{
    *			period:30d
    *			num:30
    *			val:days
    *		}
    *
    */
    DateSelector.prototype.periodSelected = function (period, num, val) {
        this.selectedPeriod = period;
        this.toDate = moment();
        this.fromDate = moment().subtract(num, val);
        this.changeDisplay();
        this.selectedDate();
    };
    /**
    * Event: Fired when from Date changes in DateSelector component
    *
    * @event fromDateChange
    * @param {Object} Event from component DateSelector (see example below).
    * @example	The following is an example of event:
    *
    *		{
    *			date:
                    _d:Mon Sep 04 2017 09:26:00 GMT+0300 (Russia TZ 2 Standard Time) {}
                    _f:"ddd, MMM Do YYYY, HH:mm:ss"
                    _i:"Wed, Sep 13th 2017, 09:26:00"

    *		}
    *
    */
    DateSelector.prototype.fromDateChange = function (e) {
        if (this.firstRunFrom) {
            this.firstRunFrom = false;
            return;
        }
        this.fromDate = e.date;
        this.selectedDate();
        if (!this.fromDateDisplay) {
            this.fromDateDisplay = e.date.format(app.dateFormat);
        }
        if (!this.starting)
            this.selectedPeriod = null;
    };
    /**
    * Event: Fired when  to Date changes in DateSelector component
    *
    * @event toDateChange
    * @param {Object} Event from component DateSelector (see example below).
    * @example	The following is an example of event:
    *
    *		{
    *			date:
                    _d:Mon Sep 04 2017 09:26:00 GMT+0300 (Russia TZ 2 Standard Time) {}
                    _f:"ddd, MMM Do YYYY, HH:mm:ss"
                    _i:"Wed, Sep 13th 2017, 09:26:00"

    *		}
    *
    */
    DateSelector.prototype.toDateChange = function (e) {
        if (this.firstRunTo) {
            this.firstRunTo = false;
            return;
        }
        this.toDate = e.date;
        this.selectedDate();
        if (!this.toDateDisplay) {
            this.toDateDisplay = e.date.format(app.dateFormat);
        }
        if (!this.starting)
            this.selectedPeriod = null;
    };
    /**
    * Event: Fired when any changes in DateSelector component
    *
    * @event selectedDate
    *
    */
    DateSelector.prototype.selectedDate = function () {
        this.navService.broadcast('dateselector:change', {
            toDate: this.toDate,
            fromDate: this.fromDate,
            period: this.selectedPeriod
        });
    };
    DateSelector.prototype.toggleSites = function () {
        $('.main-menu, .main-content, .main-footer').toggleClass('collapse-menu');
        delayBeforeFire(function () {
            app.resizeCharts();
        }, 400);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DateSelector.prototype, "dateSelectorReady", void 0);
    DateSelector = __decorate([
        core_1.Component({
            selector: 'livepoint-date-selector',
            templateUrl: '/example/appviews/dateselector.html'
        }),
        __metadata("design:paramtypes", [core_1.NgZone,
            router_1.Router,
            nav_service_1.NavService])
    ], DateSelector);
    return DateSelector;
}());
exports.DateSelector = DateSelector;
//# sourceMappingURL=app.dateselector.js.map