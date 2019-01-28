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
var DashboardComponent = (function () {
    function DashboardComponent(data) {
        this.data = data;
        this.title = "Main Screen Description";
        this.router = data;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var self = this;
        if (this.router.url == '/' || this.router.url == '/example') {
            //this.router.navigate(['/example/management']);
        }
        this.router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationEnd) {
                if (event.url == "/example/management") {
                    self.title = "Main Screen Description";
                }
                else if (event.url == "/example/management/edit") {
                    self.title = "Main Sub-screen description";
                }
            }
        });
    };
    DashboardComponent = __decorate([
        core_1.Component({
            templateUrl: '/example/appviews/dashboard.html'
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map