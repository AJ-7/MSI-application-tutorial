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
var request_service_1 = require("./_services/request.service");
var nav_service_1 = require("./_services/nav.service");
var data_service_1 = require("./_services/data.service");
var user_service_1 = require("./_services/user.service");
var codepreview2_component_1 = require("./components/codepreview2.component");
var AppComponent = (function () {
    function AppComponent(data, activatedRoute, navService, requestService, dataService, userService) {
        this.data = data;
        this.activatedRoute = activatedRoute;
        this.navService = navService;
        this.requestService = requestService;
        this.dataService = dataService;
        this.userService = userService;
        this.title = 'example';
        this.router = data;
        var self = this;
        //this.router.navigate(['/example/management']);
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        // initialize application legacy code (if any)
        var self = this;
        app.fullInit();
        delayBeforeFire(function () {
            app.loaded();
        }, 100);
        this.showLogin = this.navService.on('modal:show-login-code').subscribe(function (data) { return _this.onShowLogin(data); });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.router = null;
        this.mainNav = null;
        this.showLogin.unsubscribe();
    };
    AppComponent.prototype.handleError = function (error) {
        app.showAlert(null, error.tite, error.message);
    };
    AppComponent.prototype.navigateToDashboard = function () {
        this.router.navigateByUrl('/example/management');
    };
    AppComponent.prototype.previewLoaded = function ($event) { };
    AppComponent.prototype.onShowLogin = function (user) {
        console.log('show login code', user);
        this.loginPreviewComponent.open("login:" + user + ":" + window.location.hostname);
    };
    __decorate([
        core_1.ViewChild('loginPreviewComponent'),
        __metadata("design:type", codepreview2_component_1.CodePreviewComponent2)
    ], AppComponent.prototype, "loginPreviewComponent", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: 'livepoint',
            templateUrl: '/example/appviews/home.html',
            providers: [data_service_1.DataService, user_service_1.UserService]
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            nav_service_1.NavService,
            request_service_1.RequestService,
            data_service_1.DataService,
            user_service_1.UserService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map