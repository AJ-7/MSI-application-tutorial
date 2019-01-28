"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_sidenav_1 = require("./app.sidenav");
var app_footer_1 = require("./app.footer");
var app_dateselector_1 = require("./app.dateselector");
var app_treenav_1 = require("./app.treenav");
var app_component_1 = require("./app.component");
var app_routing_module_1 = require("./app-routing.module");
var http_1 = require("@angular/http");
var dashboard_module_1 = require("./dashboard/dashboard.module");
var shared_module_1 = require("./shared.module");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent, app_sidenav_1.Sidenav, app_footer_1.Footer, app_dateselector_1.DateSelector, app_treenav_1.TreeNavigation],
            providers: [],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                app_routing_module_1.AppRoutingModule,
                dashboard_module_1.DashboardModule,
                shared_module_1.SharedModule
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map