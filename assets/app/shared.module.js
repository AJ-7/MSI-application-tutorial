"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var dropdown_component_1 = require("./components/dropdown.component");
var codepreview_component_1 = require("./components/codepreview.component");
var codepreview2_component_1 = require("./components/codepreview2.component");
var elementsearch_component_1 = require("./components/elementsearch.component");
var angular2_select_1 = require("angular2-select");
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
var ngx_pagination_1 = require("ngx-pagination");
var request_service_1 = require("./_services/request.service");
var nav_service_1 = require("./_services/nav.service");
var ngx_smart_modal_1 = require("ngx-smart-modal");
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                angular2_select_1.SelectModule,
                ng2_slim_loading_bar_1.SlimLoadingBarModule.forRoot(),
                ngx_pagination_1.NgxPaginationModule,
                ngx_smart_modal_1.NgxSmartModalModule.forRoot()
            ],
            declarations: [
                dropdown_component_1.DropdownComponent,
                codepreview_component_1.CodePreviewComponent,
                codepreview2_component_1.CodePreviewComponent2,
                elementsearch_component_1.ElementSearchComponent
            ],
            providers: [
                request_service_1.RequestService,
                nav_service_1.NavService
            ],
            exports: [
                dropdown_component_1.DropdownComponent,
                codepreview_component_1.CodePreviewComponent,
                codepreview2_component_1.CodePreviewComponent2,
                elementsearch_component_1.ElementSearchComponent,
                ng2_slim_loading_bar_1.SlimLoadingBarModule,
                forms_1.FormsModule,
                ngx_pagination_1.NgxPaginationModule,
                ngx_smart_modal_1.NgxSmartModalModule
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map