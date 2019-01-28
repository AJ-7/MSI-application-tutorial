"use strict";
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
var nav_service_1 = require("../_services/nav.service");
var data_service_1 = require("../_services/data.service");
var DashboardDetailsComponent = (function () {
    function DashboardDetailsComponent(ngZone, route, router, navService, dataService) {
        this.ngZone = ngZone;
        this.route = route;
        this.router = router;
        this.navService = navService;
        this.dataService = dataService;
    }
    DashboardDetailsComponent.prototype.ngOnInit = function () {
    };
    DashboardDetailsComponent.prototype.handleError = function (error) {
        app.showAlert(null, error.tite, error.message);
    };
    DashboardDetailsComponent.prototype.ngAfterViewInit = function () {
    };
    DashboardDetailsComponent.prototype.ngOnDestroy = function () {
    };
    DashboardDetailsComponent.prototype.navAway = function () {
        console.log('cancel');
        this.router.navigate(['/example/management']);
    };
    DashboardDetailsComponent = __decorate([
        core_1.Component({
            templateUrl: '/example/appviews/dashboard/details.html',
            providers: [data_service_1.DataService]
        }),
        __metadata("design:paramtypes", [core_1.NgZone,
            router_1.ActivatedRoute,
            router_1.Router,
            nav_service_1.NavService,
            data_service_1.DataService])
    ], DashboardDetailsComponent);
    return DashboardDetailsComponent;
}());
exports.DashboardDetailsComponent = DashboardDetailsComponent;
//# sourceMappingURL=dashboard-details.component.js.map