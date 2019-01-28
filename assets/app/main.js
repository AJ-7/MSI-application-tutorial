"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./app.module");
var i18n_providers_1 = require("./i18n-providers");
var core_1 = require("@angular/core");
i18n_providers_1.getTranslationProviders().then(function (providers) {
    var options = {};
    core_1.enableProdMode();
    platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule, options);
});
//# sourceMappingURL=main.js.map