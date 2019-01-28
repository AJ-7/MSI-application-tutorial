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
var DropdownComponent = (function () {
    function DropdownComponent(ngZone, _eref) {
        this.ngZone = ngZone;
        this._eref = _eref;
        this.allowDeselect = false;
        this.selected = new core_1.EventEmitter();
        this.removed = new core_1.EventEmitter();
    }
    DropdownComponent.prototype.ngOnInit = function () {
        this.listVisible = false;
        if (this.defaultItem) {
            if (typeof this.defaultItem === 'object') {
                this.selectedItem = this.defaultItem;
            }
            else {
                for (var i = 0; i < this.items.length; i++) {
                    if (this.items[i].value == this.defaultItem)
                        this.selectedItem = this.items[i];
                }
            }
            return;
        }
        this.selectedItem = {
            display: this.emptyText,
            value: null
        };
    };
    DropdownComponent.prototype.ngOnDestroy = function () {
    };
    DropdownComponent.prototype.onClick = function (event) {
        if (!this._eref.nativeElement.contains(event.target))
            this.listVisible = false;
    };
    DropdownComponent.prototype.show = function () {
        if (!this.listVisible)
            $('.dropdown-container.show').removeClass('show');
        this.listVisible = !this.listVisible;
    };
    DropdownComponent.prototype.remove = function ($event) {
        this.removed.emit({ component: this });
    };
    DropdownComponent.prototype.select = function (item) {
        this.selectedItem = item;
        this.selected.emit({ component: this, item: item });
        this.listVisible = false;
    };
    DropdownComponent.prototype.getSelectedItem = function () {
        return this.selectedItem;
    };
    DropdownComponent.prototype.setValue = function (value) {
        if (!this.items)
            return;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].value == value)
                this.selectedItem = this.items[i];
        }
    };
    DropdownComponent.prototype.reset = function (withdisplay) {
        this.selectedItem = {
            display: this.emptyText,
            value: null
        };
        if (withdisplay) {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].display == withdisplay)
                    this.selectedItem = this.items[i];
            }
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DropdownComponent.prototype, "selectText", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DropdownComponent.prototype, "emptyText", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], DropdownComponent.prototype, "items", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DropdownComponent.prototype, "defaultItem", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DropdownComponent.prototype, "allowDeselect", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DropdownComponent.prototype, "selected", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], DropdownComponent.prototype, "removed", void 0);
    DropdownComponent = __decorate([
        core_1.Component({
            selector: 'livepoint-dropdown',
            providers: [],
            template: "\n\t\t<div class=\"dropdown-container\" [class.show]=\"listVisible\">\n\t\t\t<div class=\"dropdown-display\" (click)=\"show()\" [class.clicked]=\"listVisible\">\n\t\t\t\t<span class=\"placeholder\" [innerHTML]=\"selectedItem.display\"></span><i class=\"fa fa-angle-down\"></i><i class=\"fa fa-trash-o dropdown-remove\" [class.hidden]=\"!allowDeselect || !selectedItem.value\" (click)=\"remove($event); $event.stopPropagation()\"></i>\n\t\t\t</div>\n\t\t\t<div class=\"dropdown-list\">\n\t\t\t\t<div>\n\t\t\t\t\t<div *ngFor=\"let item of items\" (click)=\"select(item)\" [class.selected]=\"selectedItem.display == item.display\">\n\t\t\t\t\t\t<span>{{item.display}}</span>\n\t\t\t\t\t\t<i class=\"fa fa-check\"></i>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n        ",
            host: {
                '(document:click)': 'onClick($event)',
            }
        }),
        __metadata("design:paramtypes", [core_1.NgZone, core_1.ElementRef])
    ], DropdownComponent);
    return DropdownComponent;
}());
exports.DropdownComponent = DropdownComponent;
//# sourceMappingURL=dropdown.component.js.map