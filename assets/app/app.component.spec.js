"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var app_component_1 = require("./app.component");
var app_sidenav_1 = require("./app.sidenav");
var app_dateselector_1 = require("./app.dateselector");
var app_treenav_1 = require("./app.treenav");
var app_footer_1 = require("./app.footer");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var testing_2 = require("@angular/router/testing");
var http_1 = require("@angular/http");
var request_service_1 = require("./_services/request.service");
var data_service_1 = require("./_services/data.service");
var shared_module_1 = require("./shared.module");
var dashboard_home_component_1 = require("./dashboard/dashboard-home.component");
var MockRouter = (function () {
    function MockRouter() {
    }
    MockRouter.prototype.navigateByUrl = function (url) { return url; };
    return MockRouter;
}());
describe('AppComponent', function () {
    testing_1.TestBed.prototype.resetTestingModule = function () { return true; };
    var component;
    var oldResetTestingModule = testing_1.TestBed.resetTestingModule;
    beforeAll(function (done) { return (function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testing_1.TestBed.resetTestingModule();
                    testing_1.TestBed.configureTestingModule({
                        imports: [forms_1.FormsModule, testing_2.RouterTestingModule, http_1.HttpModule, shared_module_1.SharedModule],
                        declarations: [
                            app_sidenav_1.Sidenav,
                            app_footer_1.Footer,
                            app_dateselector_1.DateSelector,
                            app_treenav_1.TreeNavigation,
                            app_component_1.AppComponent,
                            dashboard_home_component_1.DashboardHomeComponent
                        ],
                        providers: [request_service_1.RequestService, data_service_1.DataService]
                    });
                    return [4 /*yield*/, testing_1.TestBed.compileComponents().then(function () {
                            var fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
                            component = fixture.componentInstance;
                        })];
                case 1:
                    _a.sent();
                    // prevent Angular from resetting testing module
                    testing_1.TestBed.resetTestingModule = function () { return testing_1.TestBed; };
                    return [2 /*return*/];
            }
        });
    }); })().then(done).catch(done.fail); });
    afterAll(function () {
        // reinstate resetTestingModule method
        testing_1.TestBed.resetTestingModule = oldResetTestingModule;
        testing_1.TestBed.resetTestingModule();
    });
    /*
    it('should create alarms app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it(`show have loaded the main alarms component`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('alarms');
    }));
    */
    describe('Management / Dashboard', function () {
        it('should navigate to dashboard summary', testing_1.inject([router_1.Router], function (router) {
            var spy = spyOn(router, 'navigateByUrl');
            component.navigateToDashboard();
            var url = spy.calls.first().args[0];
            expect(url).toBe('/example/management');
        }));
        /*
        let dashboardComponent: DashboardHomeComponent;
        const createComponent = () => {
            const fixture = TestBed.createComponent(DashboardHomeComponent);
            dashboardComponent = fixture.componentInstance;
            fixture.detectChanges();
        };

        
        it('should call getGlobals for priorities and statuses', inject([DataService], (dataService: DataService) => {
            createComponent();
            spyOn(dataService, 'getGlobals');
            expect(dataService.getGlobals).toHaveBeenCalled();
        }));
        */
    });
});
//# sourceMappingURL=app.component.spec.js.map