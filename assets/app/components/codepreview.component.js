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
var CodePreviewComponent = (function () {
    function CodePreviewComponent(ngZone, router, route, http, dataService, navService, location, ngxSmartModalService) {
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
        this.tmpMessage = "";
        this.text = ".";
        this.message = "generating code...";
    }
    CodePreviewComponent.prototype.ngOnInit = function () {
        this.loaded.emit({ component: this });
    };
    CodePreviewComponent.prototype.ngOnDestroy = function () {
    };
    CodePreviewComponent.prototype.ngAfterViewInit = function () {
        var self = this;
        this.ngxSmartModalService.getModal('codePreview').onOpen.subscribe(function (modal) {
            self.message = "generating code...";
            setTimeout(function () {
                self.qrcode = new QRCode(document.getElementById("code-preview-area"), {
                    text: self.text,
                    width: 300,
                    height: 300,
                    colorDark: "#454545",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                });
                self.message = self.tmpMessage;
                console.log('set message', self.tmpMessage, self.message);
            }, 800);
        });
        this.ngxSmartModalService.getModal('codePreview').onAnyCloseEvent.subscribe(function (modal) {
            self.emptyModal();
        });
    };
    CodePreviewComponent.prototype.emptyModal = function () {
        $(".code-preview-area").empty();
    };
    CodePreviewComponent.prototype.handleError = function (error) {
        app.resetLoader();
        app.showAlert(null, error.tite, error.message);
    };
    CodePreviewComponent.prototype.open = function (text) {
        this.text = text;
        this.tmpMessage = text;
        console.log('text is', text);
        this.ngxSmartModalService.getModal('codePreview').open();
    };
    CodePreviewComponent.prototype.close = function () {
        this.ngxSmartModalService.getModal('codePreview').close();
    };
    CodePreviewComponent.prototype.print = function () {
        this.printElement($('#code-preview-area'));
    };
    CodePreviewComponent.prototype.printElement = function (e) {
        var ifr = document.createElement('iframe');
        //ifr.style='height: 100%; text-align:center; vertical-align: middle; width: 100%'
        document.body.appendChild(ifr);
        $(e).clone().appendTo(ifr.contentDocument.body);
        ifr.contentWindow.print();
        ifr.parentElement.removeChild(ifr);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CodePreviewComponent.prototype, "alarmQuery", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CodePreviewComponent.prototype, "loaded", void 0);
    CodePreviewComponent = __decorate([
        core_1.Component({
            selector: 'livepoint-code-preview',
            templateUrl: '/example/appviews/components/codepreview.html',
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
    ], CodePreviewComponent);
    return CodePreviewComponent;
}());
exports.CodePreviewComponent = CodePreviewComponent;
//# sourceMappingURL=codepreview.component.js.map