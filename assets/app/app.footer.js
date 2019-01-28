"use strict";
/**
* The Footer class is used for shows bottom part of the html page
*
* @class Footer
* @module Alarms
*/
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
var data_service_1 = require("./_services/data.service");
var Footer = (function () {
    /**
    * Footer constructor
    *
    * @class Footer
    * @constructor
    * @param {Object} DataService class of Alarms application.
    *
    */
    function Footer(dataService) {
        this.dataService = dataService;
        this.config = {
            displayedName: '',
            description: '',
            version: ''
        };
        var self = this;
        /*
        this.dataService.getConfig().subscribe(
            event => this.availableConfig(event),
            error => this.handleError(error)
        );
        */
    }
    /**
    * Footer creation and initialisation
    *
    * @method ngOnInit
    * @async
    */
    Footer.prototype.ngOnInit = function () {
        console.log('App ', app);
    };
    /**
    * Event: Fired when error is occured. Error handling for component Footer
    *
    * @event handleError
    * @param {Object} contains error description
    *
    * @async
    */
    Footer.prototype.handleError = function (error) {
        app.showAlert(null, null, error.message);
    };
    /**
    * Returns the list of available configurations.
    *
    * @method availableConfig
    * @param {Object} contains available config for footer component (see example below).
    * @example	The following is an example of data:
    *
    *		{
    *			err:null
    *			result:
    *				description:"Alarms"
    *				displayedName:"Alarms"
    *				version:"1.0.245"
    *		}
    *
    * @async
    */
    Footer.prototype.availableConfig = function (data) {
        this.config = data.result;
    };
    Footer = __decorate([
        core_1.Component({
            selector: 'livepoint-app-footer',
            templateUrl: '/example/appviews/footer.html',
            providers: [data_service_1.DataService]
        }),
        __metadata("design:paramtypes", [data_service_1.DataService])
    ], Footer);
    return Footer;
}());
exports.Footer = Footer;
//# sourceMappingURL=app.footer.js.map