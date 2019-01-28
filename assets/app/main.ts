import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './app.module';
import { getTranslationProviders } from './i18n-providers';
import {enableProdMode} from '@angular/core';

getTranslationProviders().then(providers => {
	const options = {};
	enableProdMode();
	platformBrowserDynamic().bootstrapModule(AppModule, options);
});