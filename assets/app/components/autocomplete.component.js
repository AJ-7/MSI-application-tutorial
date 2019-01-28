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
var AutoCompleteComponent = (function () {
    function AutoCompleteComponent(ngZone) {
        this.ngZone = ngZone;
        this.filterEvent = new core_1.EventEmitter();
        this.selectEvent = new core_1.EventEmitter();
    }
    AutoCompleteComponent.prototype.ngOnInit = function () {
        this.query = '';
        this.filteredList = [];
        this.selected = false;
    };
    AutoCompleteComponent.prototype.ngOnDestroy = function () {
    };
    AutoCompleteComponent.prototype.setItem = function (item) {
        this.query = item.display;
        this.filteredList = [];
        this.selected = true;
    };
    AutoCompleteComponent.prototype.setList = function (list) {
        this.filteredList = list;
    };
    AutoCompleteComponent.prototype.getReference = function () {
        return this.reference;
    };
    AutoCompleteComponent.prototype.filter = function () {
        if (this.query !== "") {
            this.filterEvent.emit({ component: this, query: this.query });
        }
        else {
            this.filteredList = [];
        }
    };
    AutoCompleteComponent.prototype.select = function (item) {
        this.query = item.display;
        this.filteredList = [];
        this.selected = true;
        this.selectEvent.emit({ component: this, item: item });
    };
    AutoCompleteComponent.prototype.clear = function () {
        this.query = "";
        this.filteredList = [];
        this.selected = false;
        this.selectEvent.emit({ component: this, item: null });
    };
    AutoCompleteComponent.prototype.reset = function () {
        this.query = "";
        this.filteredList = [];
        this.selected = false;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AutoCompleteComponent.prototype, "reference", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoCompleteComponent.prototype, "fieldId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoCompleteComponent.prototype, "fieldName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutoCompleteComponent.prototype, "placeHolder", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AutoCompleteComponent.prototype, "filterEvent", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AutoCompleteComponent.prototype, "selectEvent", void 0);
    AutoCompleteComponent = __decorate([
        core_1.Component({
            selector: 'autocomplete',
            providers: [],
            template: "\n\t\t<div class=\"auto-complete-group\">\n\t\t\t<label *ngIf=\"fieldName\">{{fieldName}}</label>\n\t\t\t<input type=\"text\" class=\"form-control validate filter-input\" placeholder=\"{{placeHolder}}\" [(ngModel)]=\"query\" (keyup)=\"filter()\" id=\"{{fieldId}}\"/>\n\t\t\t<span class=\"fa fa-times-circle auto-complete-clear\" (click)=\"clear()\" *ngIf=\"selected\"></span>\n\t\t</div>\n\t\t<div class=\"dropdown open\" *ngIf=\"filteredList.length > 0\">\n\t\t\t<ul class=\"dropdown-menu dropdown-right auto-complete-dropdown\">\n\t\t\t\t<li *ngFor=\"let item of filteredList\">\n\t\t\t\t\t<a class=\"auto-complete-a\" (click)=\"select(item)\"> <strong [innerHTML]=\"item.display\"></strong> <span *ngIf=\"item.additional\" class=\"auto-complete-additional\" [innerHTML]=\"item.additional\"></span></a>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</div>\t\n        "
        }),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], AutoCompleteComponent);
    return AutoCompleteComponent;
}());
exports.AutoCompleteComponent = AutoCompleteComponent;
//# sourceMappingURL=autocomplete.component.js.map