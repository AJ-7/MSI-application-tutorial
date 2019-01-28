"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var dashboard_home_component_1 = require("./dashboard-home.component");
var dashboard_component_1 = require("./dashboard.component");
var dashboard_details_component_1 = require("./dashboard-details.component");
var DashboardRoutingModule = (function () {
    function DashboardRoutingModule() {
    }
    DashboardRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild([
                    {
                        path: '',
                        component: dashboard_component_1.DashboardComponent,
                        children: [
                            {
                                path: '',
                                component: dashboard_home_component_1.DashboardHomeComponent
                            },
                            {
                                path: 'edit',
                                component: dashboard_details_component_1.DashboardDetailsComponent,
                            },
                            {
                                path: '**',
                                component: dashboard_home_component_1.DashboardHomeComponent
                            }
                        ]
                    }
                ])
            ],
            exports: [
                router_1.RouterModule
            ],
            providers: []
        })
    ], DashboardRoutingModule);
    return DashboardRoutingModule;
}());
exports.DashboardRoutingModule = DashboardRoutingModule;
//# sourceMappingURL=dashboard-routing.module.js.map