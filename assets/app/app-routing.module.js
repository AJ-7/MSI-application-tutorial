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
var dashboard_component_1 = require("./dashboard/dashboard.component");
var selective_preload_strategy_1 = require("./selective-preload-strategy");
var AppRoutingModule = (function () {
    function AppRoutingModule(_r) {
        this._r = _r;
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot([
                    {
                        path: 'example/management',
                        loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
                        data: {
                            preload: true
                        }
                    },
                    { path: '', component: dashboard_component_1.DashboardComponent }
                ], { preloadingStrategy: selective_preload_strategy_1.PreloadSelectedModules })
            ],
            exports: [
                router_1.RouterModule
            ],
            providers: [
                selective_preload_strategy_1.PreloadSelectedModules
            ]
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map