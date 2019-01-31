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
var data_service_1 = require("../_services/data.service");
var nav_service_1 = require("../_services/nav.service");
var ngx_smart_modal_1 = require("ngx-smart-modal");
var codepreview_component_1 = require("../components/codepreview.component");
var elementsearch_component_1 = require("../components/elementsearch.component");
var user_service_1 = require("../_services/user.service");
var DashboardHomeComponent = (function () {
    function DashboardHomeComponent(routerC, dataService, navService, ngxSmartModalService, userService) {
        var _this = this;
        this.routerC = routerC;
        this.dataService = dataService;
        this.navService = navService;
        this.ngxSmartModalService = ngxSmartModalService;
        this.userService = userService;
        this.isAdmin = false;
        this.attributes = [];
        this.router = routerC;
        this.lineChartOptions = app.lineChartOptions;
        this.lineChartColors = app.lineChartColors;
        if (userService.current) {
            this.availableUser(userService.current);
        }
        else {
            this.userService.getAccount().subscribe(function (event) { return _this.availableUser(event); }, function (error) { return _this.handleError(error); });
        }
    }
    DashboardHomeComponent.prototype.handleError = function (error) {
        app.showAlert(null, error.tite, error.message);
    };
    DashboardHomeComponent.prototype.ngOnDestroy = function () {
    };
    DashboardHomeComponent.prototype.ngOnInit = function () {
    };
    DashboardHomeComponent.prototype.availableUser = function (user) {
        this.user = user;
        this.isAdmin = (user.role == "sysadmin" || $.inArray("exampe-admin", user.roleChain) != -1);
        console.log('user is admin: ', this.isAdmin);
    };
    DashboardHomeComponent.prototype.searchLoaded = function ($event) { };
    DashboardHomeComponent.prototype.elementSelected = function ($event) {
        var _this = this;
        console.log($event.item);
        this.attributes = [];
        if ($event.item && $event.item.hasattributes) {
            this.selectedElement = $event.item;
            this.dataService.findElementAttributesById(this.selectedElement.id.toLowerCase()).subscribe(function (event2) { return _this.gotAttributes($event, event2); }, function (error) { return _this.handleError(error); });
        }
        this.elementSearchComponent.close();
    };
    DashboardHomeComponent.prototype.openElementSearch = function () {
        this.elementSearchComponent.openSearch();
    };
    DashboardHomeComponent.prototype.gotAttributes = function (elementEvent, attrsEvent) {
        this.attributes = attrsEvent.response.docs;
        console.log(this.attributes);
    };
    DashboardHomeComponent.prototype.displayChart = function (attr) {
        var _this = this;
        console.log('display chart', attr);
        this.dataService.getAttributeData(attr).subscribe(function (data) { return _this.hasChartData(data); }, function (error) { return _this.handleError(error); });
    };
    DashboardHomeComponent.prototype.hasChartData = function (data1) {
        console.log(data1);
        /*
        data1 = {
            "ID": "GetAttributeData",
            "Body": [
                {
                    "Name": "Attribute1",
                    "Guid": "3772886b-2493-4b69-9cd4-19aa4a4f4c54",
                    "Values": [
                        {
                            "TimeStamp": "30/01/2019 09:42:16",
                            "TimeUTC": 1548841336,
                            "TimeTicks": 636844381360000000,
                            "Value": 167.23736572265625
                        },
                        {
                            "TimeStamp": "30/01/2019 09:43:46",
                            "TimeUTC": 1548841426,
                            "TimeTicks": 636844382260000000,
                            "Value": 161.4066619873047
                        },
                        {
                            "TimeStamp": "30/01/2019 09:45:16",
                            "TimeUTC": 1548841516,
                            "TimeTicks": 636844383160000000,
                            "Value": 162.3823699951172
                        },
                        {
                            "TimeStamp": "30/01/2019 09:48:16",
                            "TimeUTC": 1548841696,
                            "TimeTicks": 636844384960000000,
                            "Value": 167.7958526611328
                        },
                        {
                            "TimeStamp": "30/01/2019 09:49:16",
                            "TimeUTC": 1548841756,
                            "TimeTicks": 636844385560000000,
                            "Value": 167.26959228515625
                        },
                        {
                            "TimeStamp": "30/01/2019 09:49:46",
                            "TimeUTC": 1548841786,
                            "TimeTicks": 636844385860000000,
                            "Value": 170.2056884765625
                        },
                        {
                            "TimeStamp": "30/01/2019 09:52:46",
                            "TimeUTC": 1548841966,
                            "TimeTicks": 636844387660000000,
                            "Value": 160.75477600097656
                        },
                        {
                            "TimeStamp": "30/01/2019 09:54:16",
                            "TimeUTC": 1548842056,
                            "TimeTicks": 636844388560000000,
                            "Value": 172.91766357421875
                        },
                        {
                            "TimeStamp": "30/01/2019 09:55:36",
                            "TimeUTC": 1548842136,
                            "TimeTicks": 636844389360000000,
                            "Value": 171.24859619140625
                        },
                        {
                            "TimeStamp": "30/01/2019 09:57:26",
                            "TimeUTC": 1548842246,
                            "TimeTicks": 636844390460000000,
                            "Value": 173.5582733154297
                        },
                        {
                            "TimeStamp": "30/01/2019 09:59:26",
                            "TimeUTC": 1548842366,
                            "TimeTicks": 636844391660000000,
                            "Value": 182.20458984375
                        },
                        {
                            "TimeStamp": "30/01/2019 10:03:46",
                            "TimeUTC": 1548842626,
                            "TimeTicks": 636844394260000000,
                            "Value": 171.68943786621094
                        },
                        {
                            "TimeStamp": "30/01/2019 10:06:16",
                            "TimeUTC": 1548842776,
                            "TimeTicks": 636844395760000000,
                            "Value": 177.3771514892578
                        },
                        {
                            "TimeStamp": "30/01/2019 10:07:06",
                            "TimeUTC": 1548842826,
                            "TimeTicks": 636844396260000000,
                            "Value": 178.52113342285156
                        },
                        {
                            "TimeStamp": "30/01/2019 10:08:46",
                            "TimeUTC": 1548842926,
                            "TimeTicks": 636844397260000000,
                            "Value": 181.58970642089844
                        },
                        {
                            "TimeStamp": "30/01/2019 10:09:56",
                            "TimeUTC": 1548842996,
                            "TimeTicks": 636844397960000000,
                            "Value": 178.4144744873047
                        },
                        {
                            "TimeStamp": "30/01/2019 10:10:56",
                            "TimeUTC": 1548843056,
                            "TimeTicks": 636844398560000000,
                            "Value": 174.54881286621094
                        },
                        {
                            "TimeStamp": "30/01/2019 10:14:16",
                            "TimeUTC": 1548843256,
                            "TimeTicks": 636844400560000000,
                            "Value": 173.5753936767578
                        },
                        {
                            "TimeStamp": "30/01/2019 10:15:36",
                            "TimeUTC": 1548843336,
                            "TimeTicks": 636844401360000000,
                            "Value": 162.44297790527344
                        },
                        {
                            "TimeStamp": "30/01/2019 10:18:46",
                            "TimeUTC": 1548843526,
                            "TimeTicks": 636844403260000000,
                            "Value": 167.86920166015625
                        },
                        {
                            "TimeStamp": "30/01/2019 10:19:56",
                            "TimeUTC": 1548843596,
                            "TimeTicks": 636844403960000000,
                            "Value": 162.9432373046875
                        },
                        {
                            "TimeStamp": "30/01/2019 10:22:46",
                            "TimeUTC": 1548843766,
                            "TimeTicks": 636844405660000000,
                            "Value": 163.85430908203125
                        },
                        {
                            "TimeStamp": "30/01/2019 10:25:36",
                            "TimeUTC": 1548843936,
                            "TimeTicks": 636844407360000000,
                            "Value": 157.26824951171875
                        },
                        {
                            "TimeStamp": "30/01/2019 10:29:16",
                            "TimeUTC": 1548844156,
                            "TimeTicks": 636844409560000000,
                            "Value": 153.58827209472656
                        },
                        {
                            "TimeStamp": "30/01/2019 10:32:16",
                            "TimeUTC": 1548844336,
                            "TimeTicks": 636844411360000000,
                            "Value": 167.58876037597656
                        },
                        {
                            "TimeStamp": "30/01/2019 10:33:56",
                            "TimeUTC": 1548844436,
                            "TimeTicks": 636844412360000000,
                            "Value": 170.860595703125
                        },
                        {
                            "TimeStamp": "30/01/2019 10:38:16",
                            "TimeUTC": 1548844696,
                            "TimeTicks": 636844414960000000,
                            "Value": 176.69541931152344
                        },
                        {
                            "TimeStamp": "30/01/2019 10:39:46",
                            "TimeUTC": 1548844786,
                            "TimeTicks": 636844415860000000,
                            "Value": 173.9671630859375
                        },
                        {
                            "TimeStamp": "30/01/2019 10:40:06",
                            "TimeUTC": 1548844806,
                            "TimeTicks": 636844416060000000,
                            "Value": 178.95693969726562
                        },
                        {
                            "TimeStamp": "30/01/2019 10:41:36",
                            "TimeUTC": 1548844896,
                            "TimeTicks": 636844416960000000,
                            "Value": 175.21368408203125
                        },
                        {
                            "TimeStamp": "30/01/2019 10:43:36",
                            "TimeUTC": 1548845016,
                            "TimeTicks": 636844418160000000,
                            "Value": 166.39378356933594
                        },
                        {
                            "TimeStamp": "30/01/2019 10:45:46",
                            "TimeUTC": 1548845146,
                            "TimeTicks": 636844419460000000,
                            "Value": 176.65907287597656
                        },
                        {
                            "TimeStamp": "30/01/2019 10:48:26",
                            "TimeUTC": 1548845306,
                            "TimeTicks": 636844421060000000,
                            "Value": 176.00079345703125
                        },
                        {
                            "TimeStamp": "30/01/2019 10:50:06",
                            "TimeUTC": 1548845406,
                            "TimeTicks": 636844422060000000,
                            "Value": 168.6814727783203
                        },
                        {
                            "TimeStamp": "30/01/2019 10:53:16",
                            "TimeUTC": 1548845596,
                            "TimeTicks": 636844423960000000,
                            "Value": 170.19644165039062
                        },
                        {
                            "TimeStamp": "30/01/2019 10:55:06",
                            "TimeUTC": 1548845706,
                            "TimeTicks": 636844425060000000,
                            "Value": 172.0897216796875
                        },
                        {
                            "TimeStamp": "30/01/2019 10:57:36",
                            "TimeUTC": 1548845856,
                            "TimeTicks": 636844426560000000,
                            "Value": 157.4440460205078
                        },
                        {
                            "TimeStamp": "30/01/2019 11:00:26",
                            "TimeUTC": 1548846026,
                            "TimeTicks": 636844428260000000,
                            "Value": 154.276123046875
                        },
                        {
                            "TimeStamp": "30/01/2019 11:02:46",
                            "TimeUTC": 1548846166,
                            "TimeTicks": 636844429660000000,
                            "Value": 163.6140594482422
                        },
                        {
                            "TimeStamp": "30/01/2019 11:04:36",
                            "TimeUTC": 1548846276,
                            "TimeTicks": 636844430760000000,
                            "Value": 170.34092712402344
                        },
                        {
                            "TimeStamp": "30/01/2019 11:08:06",
                            "TimeUTC": 1548846486,
                            "TimeTicks": 636844432860000000,
                            "Value": 170.2745361328125
                        },
                        {
                            "TimeStamp": "30/01/2019 11:09:36",
                            "TimeUTC": 1548846576,
                            "TimeTicks": 636844433760000000,
                            "Value": 172.18173217773438
                        },
                        {
                            "TimeStamp": "30/01/2019 11:12:16",
                            "TimeUTC": 1548846736,
                            "TimeTicks": 636844435360000000,
                            "Value": 168.01376342773438
                        },
                        {
                            "TimeStamp": "30/01/2019 11:14:56",
                            "TimeUTC": 1548846896,
                            "TimeTicks": 636844436960000000,
                            "Value": 168.4849090576172
                        },
                        {
                            "TimeStamp": "30/01/2019 11:15:46",
                            "TimeUTC": 1548846946,
                            "TimeTicks": 636844437460000000,
                            "Value": 165.6497039794922
                        },
                        {
                            "TimeStamp": "30/01/2019 11:19:46",
                            "TimeUTC": 1548847186,
                            "TimeTicks": 636844439860000000,
                            "Value": 157.32308959960938
                        },
                        {
                            "TimeStamp": "30/01/2019 11:21:16",
                            "TimeUTC": 1548847276,
                            "TimeTicks": 636844440760000000,
                            "Value": 162.21792602539062
                        },
                        {
                            "TimeStamp": "30/01/2019 11:22:16",
                            "TimeUTC": 1548847336,
                            "TimeTicks": 636844441360000000,
                            "Value": 155.056640625
                        },
                        {
                            "TimeStamp": "30/01/2019 11:27:46",
                            "TimeUTC": 1548847666,
                            "TimeTicks": 636844444660000000,
                            "Value": 166.45228576660156
                        },
                        {
                            "TimeStamp": "30/01/2019 11:28:26",
                            "TimeUTC": 1548847706,
                            "TimeTicks": 636844445060000000,
                            "Value": 163.4635467529297
                        },
                        {
                            "TimeStamp": "30/01/2019 11:29:46",
                            "TimeUTC": 1548847786,
                            "TimeTicks": 636844445860000000,
                            "Value": 164.64442443847656
                        },
                        {
                            "TimeStamp": "30/01/2019 11:32:46",
                            "TimeUTC": 1548847966,
                            "TimeTicks": 636844447660000000,
                            "Value": 160.7641143798828
                        },
                        {
                            "TimeStamp": "30/01/2019 11:34:26",
                            "TimeUTC": 1548848066,
                            "TimeTicks": 636844448660000000,
                            "Value": 166.8032989501953
                        },
                        {
                            "TimeStamp": "30/01/2019 11:36:36",
                            "TimeUTC": 1548848196,
                            "TimeTicks": 636844449960000000,
                            "Value": 182.7622528076172
                        },
                        {
                            "TimeStamp": "30/01/2019 11:37:26",
                            "TimeUTC": 1548848246,
                            "TimeTicks": 636844450460000000,
                            "Value": 187.3361053466797
                        },
                        {
                            "TimeStamp": "30/01/2019 11:40:06",
                            "TimeUTC": 1548848406,
                            "TimeTicks": 636844452060000000,
                            "Value": 194.4732208251953
                        },
                        {
                            "TimeStamp": "30/01/2019 11:42:26",
                            "TimeUTC": 1548848546,
                            "TimeTicks": 636844453460000000,
                            "Value": 210.86404418945312
                        },
                        {
                            "TimeStamp": "30/01/2019 11:43:56",
                            "TimeUTC": 1548848636,
                            "TimeTicks": 636844454360000000,
                            "Value": 204.39939880371094
                        },
                        {
                            "TimeStamp": "30/01/2019 11:44:36",
                            "TimeUTC": 1548848676,
                            "TimeTicks": 636844454760000000,
                            "Value": 212.3685760498047
                        },
                        {
                            "TimeStamp": "30/01/2019 11:46:16",
                            "TimeUTC": 1548848776,
                            "TimeTicks": 636844455760000000,
                            "Value": 213.56080627441406
                        },
                        {
                            "TimeStamp": "30/01/2019 11:47:06",
                            "TimeUTC": 1548848826,
                            "TimeTicks": 636844456260000000,
                            "Value": 204.1788330078125
                        },
                        {
                            "TimeStamp": "30/01/2019 11:49:26",
                            "TimeUTC": 1548848966,
                            "TimeTicks": 636844457660000000,
                            "Value": 201.30856323242188
                        },
                        {
                            "TimeStamp": "30/01/2019 11:51:16",
                            "TimeUTC": 1548849076,
                            "TimeTicks": 636844458760000000,
                            "Value": 194.22225952148438
                        },
                        {
                            "TimeStamp": "30/01/2019 11:54:06",
                            "TimeUTC": 1548849246,
                            "TimeTicks": 636844460460000000,
                            "Value": 191.4791717529297
                        },
                        {
                            "TimeStamp": "30/01/2019 11:55:06",
                            "TimeUTC": 1548849306,
                            "TimeTicks": 636844461060000000,
                            "Value": 192.7613067626953
                        },
                        {
                            "TimeStamp": "30/01/2019 11:57:56",
                            "TimeUTC": 1548849476,
                            "TimeTicks": 636844462760000000,
                            "Value": 190.44285583496094
                        },
                        {
                            "TimeStamp": "30/01/2019 12:00:16",
                            "TimeUTC": 1548849616,
                            "TimeTicks": 636844464160000000,
                            "Value": 195.32093811035156
                        },
                        {
                            "TimeStamp": "30/01/2019 12:01:16",
                            "TimeUTC": 1548849676,
                            "TimeTicks": 636844464760000000,
                            "Value": 186.9849853515625
                        },
                        {
                            "TimeStamp": "30/01/2019 12:02:46",
                            "TimeUTC": 1548849766,
                            "TimeTicks": 636844465660000000,
                            "Value": 182.6409454345703
                        },
                        {
                            "TimeStamp": "30/01/2019 12:03:26",
                            "TimeUTC": 1548849806,
                            "TimeTicks": 636844466060000000,
                            "Value": 179.32920837402344
                        },
                        {
                            "TimeStamp": "30/01/2019 12:06:16",
                            "TimeUTC": 1548849976,
                            "TimeTicks": 636844467760000000,
                            "Value": 196.30715942382812
                        },
                        {
                            "TimeStamp": "30/01/2019 12:07:06",
                            "TimeUTC": 1548850026,
                            "TimeTicks": 636844468260000000,
                            "Value": 201.12930297851562
                        },
                        {
                            "TimeStamp": "30/01/2019 12:07:56",
                            "TimeUTC": 1548850076,
                            "TimeTicks": 636844468760000000,
                            "Value": 197.74256896972656
                        },
                        {
                            "TimeStamp": "30/01/2019 12:09:56",
                            "TimeUTC": 1548850196,
                            "TimeTicks": 636844469960000000,
                            "Value": 206.40135192871094
                        },
                        {
                            "TimeStamp": "30/01/2019 12:10:46",
                            "TimeUTC": 1548850246,
                            "TimeTicks": 636844470460000000,
                            "Value": 199.5649871826172
                        },
                        {
                            "TimeStamp": "30/01/2019 12:12:06",
                            "TimeUTC": 1548850326,
                            "TimeTicks": 636844471260000000,
                            "Value": 210.64320373535156
                        },
                        {
                            "TimeStamp": "30/01/2019 12:12:56",
                            "TimeUTC": 1548850376,
                            "TimeTicks": 636844471760000000,
                            "Value": 204.59934997558594
                        },
                        {
                            "TimeStamp": "30/01/2019 12:14:26",
                            "TimeUTC": 1548850466,
                            "TimeTicks": 636844472660000000,
                            "Value": 207.78831481933594
                        },
                        {
                            "TimeStamp": "30/01/2019 12:15:16",
                            "TimeUTC": 1548850516,
                            "TimeTicks": 636844473160000000,
                            "Value": 214.4902801513672
                        },
                        {
                            "TimeStamp": "30/01/2019 12:15:46",
                            "TimeUTC": 1548850546,
                            "TimeTicks": 636844473460000000,
                            "Value": 210.87063598632812
                        },
                        {
                            "TimeStamp": "30/01/2019 12:18:46",
                            "TimeUTC": 1548850726,
                            "TimeTicks": 636844475260000000,
                            "Value": 208.37428283691406
                        },
                        {
                            "TimeStamp": "30/01/2019 12:19:56",
                            "TimeUTC": 1548850796,
                            "TimeTicks": 636844475960000000,
                            "Value": 216.7266082763672
                        },
                        {
                            "TimeStamp": "30/01/2019 12:23:06",
                            "TimeUTC": 1548850986,
                            "TimeTicks": 636844477860000000,
                            "Value": 220.10693359375
                        },
                        {
                            "TimeStamp": "30/01/2019 12:23:56",
                            "TimeUTC": 1548851036,
                            "TimeTicks": 636844478360000000,
                            "Value": 224.39805603027344
                        },
                        {
                            "TimeStamp": "30/01/2019 12:27:16",
                            "TimeUTC": 1548851236,
                            "TimeTicks": 636844480360000000,
                            "Value": 217.8307647705078
                        },
                        {
                            "TimeStamp": "30/01/2019 12:28:26",
                            "TimeUTC": 1548851306,
                            "TimeTicks": 636844481060000000,
                            "Value": 225.03756713867188
                        },
                        {
                            "TimeStamp": "30/01/2019 12:32:26",
                            "TimeUTC": 1548851546,
                            "TimeTicks": 636844483460000000,
                            "Value": 216.3212890625
                        },
                        {
                            "TimeStamp": "30/01/2019 12:33:56",
                            "TimeUTC": 1548851636,
                            "TimeTicks": 636844484360000000,
                            "Value": 212.3865203857422
                        },
                        {
                            "TimeStamp": "30/01/2019 12:35:16",
                            "TimeUTC": 1548851716,
                            "TimeTicks": 636844485160000000,
                            "Value": 220.17422485351562
                        },
                        {
                            "TimeStamp": "30/01/2019 12:38:56",
                            "TimeUTC": 1548851936,
                            "TimeTicks": 636844487360000000,
                            "Value": 223.93753051757812
                        },
                        {
                            "TimeStamp": "30/01/2019 12:41:16",
                            "TimeUTC": 1548852076,
                            "TimeTicks": 636844488760000000,
                            "Value": 225.21527099609375
                        },
                        {
                            "TimeStamp": "30/01/2019 12:42:36",
                            "TimeUTC": 1548852156,
                            "TimeTicks": 636844489560000000,
                            "Value": 221.0284423828125
                        },
                        {
                            "TimeStamp": "30/01/2019 12:44:46",
                            "TimeUTC": 1548852286,
                            "TimeTicks": 636844490860000000,
                            "Value": 227.7424774169922
                        },
                        {
                            "TimeStamp": "30/01/2019 12:47:36",
                            "TimeUTC": 1548852456,
                            "TimeTicks": 636844492560000000,
                            "Value": 236.4322967529297
                        },
                        {
                            "TimeStamp": "30/01/2019 12:50:06",
                            "TimeUTC": 1548852606,
                            "TimeTicks": 636844494060000000,
                            "Value": 222.5906524658203
                        },
                        {
                            "TimeStamp": "30/01/2019 12:57:26",
                            "TimeUTC": 1548853046,
                            "TimeTicks": 636844498460000000,
                            "Value": 202.57679748535156
                        },
                        {
                            "TimeStamp": "30/01/2019 13:00:06",
                            "TimeUTC": 1548853206,
                            "TimeTicks": 636844500060000000,
                            "Value": 207.46018981933594
                        },
                        {
                            "TimeStamp": "30/01/2019 13:03:06",
                            "TimeUTC": 1548853386,
                            "TimeTicks": 636844501860000000,
                            "Value": 197.69468688964844
                        },
                        {
                            "TimeStamp": "30/01/2019 13:04:46",
                            "TimeUTC": 1548853486,
                            "TimeTicks": 636844502860000000,
                            "Value": 202.87033081054688
                        },
                        {
                            "TimeStamp": "30/01/2019 13:05:56",
                            "TimeUTC": 1548853556,
                            "TimeTicks": 636844503560000000,
                            "Value": 207.92630004882812
                        },
                        {
                            "TimeStamp": "30/01/2019 13:09:36",
                            "TimeUTC": 1548853776,
                            "TimeTicks": 636844505760000000,
                            "Value": 204.41404724121094
                        },
                        {
                            "TimeStamp": "30/01/2019 13:13:26",
                            "TimeUTC": 1548854006,
                            "TimeTicks": 636844508060000000,
                            "Value": 196.84671020507812
                        },
                        {
                            "TimeStamp": "30/01/2019 13:14:26",
                            "TimeUTC": 1548854066,
                            "TimeTicks": 636844508660000000,
                            "Value": 185.77159118652344
                        },
                        {
                            "TimeStamp": "30/01/2019 13:16:16",
                            "TimeUTC": 1548854176,
                            "TimeTicks": 636844509760000000,
                            "Value": 183.65785217285156
                        },
                        {
                            "TimeStamp": "30/01/2019 13:17:36",
                            "TimeUTC": 1548854256,
                            "TimeTicks": 636844510560000000,
                            "Value": 191.181884765625
                        },
                        {
                            "TimeStamp": "30/01/2019 13:21:16",
                            "TimeUTC": 1548854476,
                            "TimeTicks": 636844512760000000,
                            "Value": 186.34556579589844
                        },
                        {
                            "TimeStamp": "30/01/2019 13:23:16",
                            "TimeUTC": 1548854596,
                            "TimeTicks": 636844513960000000,
                            "Value": 184.5360565185547
                        },
                        {
                            "TimeStamp": "30/01/2019 13:23:56",
                            "TimeUTC": 1548854636,
                            "TimeTicks": 636844514360000000,
                            "Value": 183.5470733642578
                        },
                        {
                            "TimeStamp": "30/01/2019 13:24:56",
                            "TimeUTC": 1548854696,
                            "TimeTicks": 636844514960000000,
                            "Value": 196.4507293701172
                        },
                        {
                            "TimeStamp": "30/01/2019 13:27:36",
                            "TimeUTC": 1548854856,
                            "TimeTicks": 636844516560000000,
                            "Value": 198.7474822998047
                        },
                        {
                            "TimeStamp": "30/01/2019 13:29:06",
                            "TimeUTC": 1548854946,
                            "TimeTicks": 636844517460000000,
                            "Value": 186.95944213867188
                        },
                        {
                            "TimeStamp": "30/01/2019 13:29:46",
                            "TimeUTC": 1548854986,
                            "TimeTicks": 636844517860000000,
                            "Value": 191.61448669433594
                        },
                        {
                            "TimeStamp": "30/01/2019 13:33:16",
                            "TimeUTC": 1548855196,
                            "TimeTicks": 636844519960000000,
                            "Value": 189.60292053222656
                        },
                        {
                            "TimeStamp": "30/01/2019 13:34:36",
                            "TimeUTC": 1548855276,
                            "TimeTicks": 636844520760000000,
                            "Value": 187.18896484375
                        },
                        {
                            "TimeStamp": "30/01/2019 13:36:26",
                            "TimeUTC": 1548855386,
                            "TimeTicks": 636844521860000000,
                            "Value": 190.6436309814453
                        },
                        {
                            "TimeStamp": "30/01/2019 13:38:46",
                            "TimeUTC": 1548855526,
                            "TimeTicks": 636844523260000000,
                            "Value": 196.64051818847656
                        },
                        {
                            "TimeStamp": "30/01/2019 13:40:16",
                            "TimeUTC": 1548855616,
                            "TimeTicks": 636844524160000000,
                            "Value": 200.69834899902344
                        },
                        {
                            "TimeStamp": "30/01/2019 13:41:26",
                            "TimeUTC": 1548855686,
                            "TimeTicks": 636844524860000000,
                            "Value": 197.53245544433594
                        },
                        {
                            "TimeStamp": "30/01/2019 13:42:26",
                            "TimeUTC": 1548855746,
                            "TimeTicks": 636844525460000000,
                            "Value": 201.33071899414062
                        },
                        {
                            "TimeStamp": "30/01/2019 13:44:06",
                            "TimeUTC": 1548855846,
                            "TimeTicks": 636844526460000000,
                            "Value": 191.4568328857422
                        },
                        {
                            "TimeStamp": "30/01/2019 13:45:26",
                            "TimeUTC": 1548855926,
                            "TimeTicks": 636844527260000000,
                            "Value": 198.5254669189453
                        },
                        {
                            "TimeStamp": "30/01/2019 13:46:36",
                            "TimeUTC": 1548855996,
                            "TimeTicks": 636844527960000000,
                            "Value": 193.51490783691406
                        },
                        {
                            "TimeStamp": "30/01/2019 13:49:56",
                            "TimeUTC": 1548856196,
                            "TimeTicks": 636844529960000000,
                            "Value": 196.20864868164062
                        },
                        {
                            "TimeStamp": "30/01/2019 13:54:36",
                            "TimeUTC": 1548856476,
                            "TimeTicks": 636844532760000000,
                            "Value": 189.52931213378906
                        },
                        {
                            "TimeStamp": "30/01/2019 13:58:06",
                            "TimeUTC": 1548856686,
                            "TimeTicks": 636844534860000000,
                            "Value": 191.21969604492188
                        },
                        {
                            "TimeStamp": "30/01/2019 14:00:56",
                            "TimeUTC": 1548856856,
                            "TimeTicks": 636844536560000000,
                            "Value": 192.6401824951172
                        },
                        {
                            "TimeStamp": "30/01/2019 14:02:26",
                            "TimeUTC": 1548856946,
                            "TimeTicks": 636844537460000000,
                            "Value": 187.4060516357422
                        },
                        {
                            "TimeStamp": "30/01/2019 14:03:56",
                            "TimeUTC": 1548857036,
                            "TimeTicks": 636844538360000000,
                            "Value": 189.75856018066406
                        },
                        {
                            "TimeStamp": "30/01/2019 14:05:06",
                            "TimeUTC": 1548857106,
                            "TimeTicks": 636844539060000000,
                            "Value": 179.85601806640625
                        },
                        {
                            "TimeStamp": "30/01/2019 14:06:56",
                            "TimeUTC": 1548857216,
                            "TimeTicks": 636844540160000000,
                            "Value": 177.73439025878906
                        },
                        {
                            "TimeStamp": "30/01/2019 14:08:06",
                            "TimeUTC": 1548857286,
                            "TimeTicks": 636844540860000000,
                            "Value": 180.88583374023438
                        },
                        {
                            "TimeStamp": "30/01/2019 14:10:06",
                            "TimeUTC": 1548857406,
                            "TimeTicks": 636844542060000000,
                            "Value": 180.22222900390625
                        }
                    ]
                }
            ],
            "Errors": [],
            "Log": {
                "Function": "AFDriver::GetAttributeData",
                "Parameters": "<overall call duration>",
                "Duration": 0.02059,
                "Result": 0,
                "Logs": []
            }
        };
        */
        var dt = {
            labels: [],
            datasets: [
                {
                    data: [],
                    backgroundColor: app.lineChartColors[0],
                    borderColor: app.lineChartColors[0],
                    radius: 0
                }
            ]
        };
        if (data1.Body) {
            var body = data1.Body[0];
            for (var i = 0; i < body.Values.length; i++) {
                var row = body.Values[i];
                dt.datasets[0].data.push(row.Value);
                dt.labels.push(moment(row.TimeUTC * 1000).format(app.dateFormatAlarm2));
            }
        }
        app.lineChart('chart_1', dt, {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true
                        }
                    }]
            }
        });
    };
    __decorate([
        core_1.ViewChild('codePreviewComponent'),
        __metadata("design:type", codepreview_component_1.CodePreviewComponent)
    ], DashboardHomeComponent.prototype, "codePreviewComponent", void 0);
    __decorate([
        core_1.ViewChild('elementSearchComponent'),
        __metadata("design:type", elementsearch_component_1.ElementSearchComponent)
    ], DashboardHomeComponent.prototype, "elementSearchComponent", void 0);
    DashboardHomeComponent = __decorate([
        core_1.Component({
            templateUrl: '/example/appviews/dashboard/summary.html',
            providers: [data_service_1.DataService]
        }),
        __metadata("design:paramtypes", [router_1.Router,
            data_service_1.DataService,
            nav_service_1.NavService,
            ngx_smart_modal_1.NgxSmartModalService,
            user_service_1.UserService])
    ], DashboardHomeComponent);
    return DashboardHomeComponent;
}());
exports.DashboardHomeComponent = DashboardHomeComponent;
//# sourceMappingURL=dashboard-home.component.js.map