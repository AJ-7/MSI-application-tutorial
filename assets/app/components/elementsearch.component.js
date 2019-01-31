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
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var data_service_1 = require("../_services/data.service");
var nav_service_1 = require("../_services/nav.service");
var ngx_smart_modal_1 = require("ngx-smart-modal");
var ElementSearchComponent = (function () {
    function ElementSearchComponent(ngZone, router, route, http, dataService, navService, location, ngxSmartModalService) {
        this.ngZone = ngZone;
        this.router = router;
        this.route = route;
        this.http = http;
        this.dataService = dataService;
        this.navService = navService;
        this.location = location;
        this.ngxSmartModalService = ngxSmartModalService;
        this.mode = 'Observable';
        this.loaded = new core_1.EventEmitter();
        this.selected = new core_1.EventEmitter();
        this.foundElements = [];
        this.searching = false;
        this.currentPage = 1;
        this.pageSize = 10;
        this.totalElements = 0;
        this.parent = null;
        this.showWarning = false;
        this.showMultiple = false;
    }
    ElementSearchComponent.prototype.ngOnInit = function () {
        this.loaded.emit({ component: this });
    };
    ElementSearchComponent.prototype.ngOnDestroy = function () {
    };
    ElementSearchComponent.prototype.handleError = function (error) {
        this.searching = false;
        app.resetLoader();
        app.showAlert(null, error.tite, error.message);
    };
    ElementSearchComponent.prototype.openSearch = function () {
        this.ngxSmartModalService.getModal('searchData').open();
    };
    ElementSearchComponent.prototype.close = function () {
        this.ngxSmartModalService.getModal('searchData').close();
    };
    ElementSearchComponent.prototype.pageChanged = function ($event) {
        this.currentPage = $event;
        if (this.parent) {
            this.searchByParent(this.parent);
        }
        else {
            this.searchPathChanged({});
        }
    };
    ElementSearchComponent.prototype.foundElementData = function (event) {
        //console.log('found', event);
        this.searching = false;
        if (!event.response)
            return;
        this.totalElements = event.response.numFound;
        event.response.docs.forEach(function (el) {
            el.path = el.namepath.join('\\');
            el.info = "Server: " + el.server + "<br>GUID:" + el.id;
            el.attrTitle = el.hasattributes ? "This element has attributes" : "No attributes";
        });
        this.foundElements = event.response.docs;
        setTimeout(function () {
            $('[data-toggle="tooltip"]').tooltip();
        }, 800);
    };
    ElementSearchComponent.prototype.getCurrentPage = function () {
        return (this.currentPage - 1) * this.pageSize;
    };
    ElementSearchComponent.prototype.searchPathChanged = function ($event) {
        var _this = this;
        //console.log('search for', this.searchPath);
        this.parent = null;
        if (this.searching)
            return;
        this.searching = true;
        this.dataService.findElement(this.searchPath, this.getCurrentPage()).subscribe(function (event) { return _this.foundElementData(event); }, function (error) { return _this.handleError(error); });
    };
    ElementSearchComponent.prototype.searchByParent = function (item) {
        var _this = this;
        if (this.searching)
            return;
        this.parent = item;
        this.searching = true;
        this.dataService.findElementByParent(item.id, this.getCurrentPage()).subscribe(function (event) { return _this.foundElementData(event); }, function (error) { return _this.handleError(error); });
    };
    ElementSearchComponent.prototype.selectedItem = function (item) {
        if (item.haschildren) {
            this.searchPath = item.path;
            return this.searchByParent(item);
        }
        if (!item.hasattributes) {
            return app.showAlert(null, "No attributes", "The selected element does not have any attributes and cannot be selected. Please refine your search and try again.");
        }
    };
    ElementSearchComponent.prototype.chooseItem = function ($event, item) {
        $event.stopPropagation();
        if (!item.hasattributes)
            return;
        this.selected.emit({ component: this, item: item });
    };
    ElementSearchComponent.prototype.chooseMultipleItem = function ($event) {
        this.selected.emit({ component: this, query: this.searchPath });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ElementSearchComponent.prototype, "showWarning", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ElementSearchComponent.prototype, "showMultiple", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ElementSearchComponent.prototype, "loaded", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ElementSearchComponent.prototype, "selected", void 0);
    ElementSearchComponent = __decorate([
        core_1.Component({
            selector: 'livepoint-element-search',
            templateUrl: '/arcfg/appviews/components/elementsearch.html',
            providers: [data_service_1.DataService],
        }),
        __metadata("design:paramtypes", [core_1.NgZone,
            router_1.Router,
            router_1.ActivatedRoute,
            http_1.Http,
            data_service_1.DataService,
            nav_service_1.NavService,
            common_1.Location,
            ngx_smart_modal_1.NgxSmartModalService])
    ], ElementSearchComponent);
    return ElementSearchComponent;
}());
exports.ElementSearchComponent = ElementSearchComponent;
//# sourceMappingURL=elementsearch.component.js.map