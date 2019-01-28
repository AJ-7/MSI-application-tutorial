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
var data_service_1 = require("../_services/data.service");
var nav_service_1 = require("../_services/nav.service");
var ngx_smart_modal_1 = require("ngx-smart-modal");
var codepreview_component_1 = require("../components/codepreview.component");
var user_service_1 = require("../_services/user.service");
var DashboardHomeComponent = (function () {
    function DashboardHomeComponent(routerC, dataService, navService, ngxSmartModalService, userService) {
        var _this = this;
        this.routerC = routerC;
        this.dataService = dataService;
        this.navService = navService;
        this.ngxSmartModalService = ngxSmartModalService;
        this.userService = userService;
        this.isAdmin = false;
        this.router = routerC;
        if (userService.current) {
            this.availableUser(userService.current);
        }
        else {
            this.userService.getAccount().subscribe(function (event) { return _this.availableUser(event); }, function (error) { return _this.handleError(error); });
        }
    }
    DashboardHomeComponent.prototype.handleError = function (error) {
        app.showAlert(null, error.tite, error.message);
    };
    DashboardHomeComponent.prototype.ngOnDestroy = function () {
    };
    DashboardHomeComponent.prototype.ngOnInit = function () {
    };
    DashboardHomeComponent.prototype.availableUser = function (user) {
        this.user = user;
        this.isAdmin = (user.role == "sysadmin" || $.inArray("exampe-admin", user.roleChain) != -1);
        console.log('user is admin: ', this.isAdmin);
    };
    __decorate([
        core_1.ViewChild('codePreviewComponent'),
        __metadata("design:type", codepreview_component_1.CodePreviewComponent)
    ], DashboardHomeComponent.prototype, "codePreviewComponent", void 0);
    DashboardHomeComponent = __decorate([
        core_1.Component({
            templateUrl: '/example/appviews/dashboard/summary.html',
            providers: [data_service_1.DataService]
        }),
        __metadata("design:paramtypes", [router_1.Router,
            data_service_1.DataService,
            nav_service_1.NavService,
            ngx_smart_modal_1.NgxSmartModalService,
            user_service_1.UserService])
    ], DashboardHomeComponent);
    return DashboardHomeComponent;
}());
exports.DashboardHomeComponent = DashboardHomeComponent;
//# sourceMappingURL=dashboard-home.component.js.map