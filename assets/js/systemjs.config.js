/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':                        '/example/app', // 'dist',
    '@angular':                   'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs',
	'angular2-select': 			  'node_modules/angular2-select',
	'ng2-slim-loading-bar':       'node_modules/ng2-slim-loading-bar',
	'angular4-color-picker': 	  'node_modules/angular4-color-picker',
	'ngx-pagination': 			  'node_modules/ngx-pagination',
	'ngx-smart-modal': 			  '/example/node_modules/ngx-smart-modal/bundles/ngx-smart-modal.umd.js',
	 text: 						  '/example/app/systemjs-text-plugin.js'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
	'angular2-select': {
        main: 'index.js',
        defaultExtension: 'js'
    },
	'ng2-slim-loading-bar': {
		 main: 'bundles/index.umd.js', defaultExtension: 'js'
	},
	'ngx-pagination': {
		 main: 'dist/ngx-pagination.umd.js', defaultExtension: 'js'
	},
	'angular4-color-picker': {main:'index.js', defaultExtension: 'js'}
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];
  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }
  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);
  var config = {
    map: map,
    packages: packages
  };

  System.config(config);
})(this);
