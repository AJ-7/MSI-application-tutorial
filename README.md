# Application Development (Livepoint R4)

The following document outlines procedures for development of applications (modules) based on Livepoint R4 platform. The platform provides a container for applications developed under the Angular 4.x guidelines and principles. The document touches on the basic and advanced steps for application development, application structure, platform integration. For guidelines specific to Angular 4.x development, please check the official documentation at Angular [website](https://angular.io/).

## Getting Started

The guide assumes knowledge of Livepoint platform including installation, directory structure, core principles and functionality (more information can be found via administrative manuals and SDS documentation for Livepoint platform). The application development must be done on the existing platform installation. Prior to starting the development of the application, complete the platform install and perform necessary checks outlined in the installation guide to make sure the platform functions correctly. In addition, the developer must be familiar with Sails.js framework which provides MVC architecture for the Livepoint platform, including routes, controllers, services, and policies. 

## Application Setup

Prior to starting the development, a new application structure must be created or copied over from the skeleton application. It is recommended to copy the skeleton application in order to avoid additional steps in configuration of modules and paths. Follow this steps to properly setup your new application structure based on the skeleton application:
 
* To clone the skeleton application and provide a basis for your new application, copy the skeleton folder under the 'apps' directory of the platform. 
* Rename the directory to uniquely identify your application. The directory name is the URL path for your new application, which means you should not include special characters or spaces. The naming convention for application directory includes lowercase letters such as "newapp". 
* Navigate to your new application directory and open the setting file located under "config/settings.js". The settings files provides fields which identify the application to users including fields such as name, description, display style, and other. Make sure to specify **applicationEntryPoint** field to be the same as application directory name provide in the previous step. For example, "/newapp".
* Once the steps are complete, perform platform initialization outline in administrative guide by running "node app.js -init". The application should now be visible in the application list via core UI. 

_NOTE: The steps outlined above does not finish the configuration of the new application. Once completed with the steps, please follow the tutorial below and perform additional steps marker with **REQUIRED**._

_NOTE: The settings.js file may and should be used for common setting related to the application, including configuration parameters such as additional database connection strings, application specific configuration flags, etc. Given that this file is a json file, the configuration structure is choice in the free form by the developer of the application. Once defined, the configuration may be accessible via server-side components such as controller, services, and LSC services by performing a simple require on the settings.js file._

## Application Watch and Reload

To ease up the application development, Livepoint platform provides a watch functionality on most of the files inside the application directory. This considerably saves the time when actively developing application since the changes are automatically reloaded and reinitialized correctly in the platform environment. 

There are two mode for application development: default port 1337 (node only) and IIS. The difference between the two is the default port the only process active within the environment is node.js, while the second host the application under the node.js process managed via LSC (Livepoint Smart Controller) ISS module. While both methods perform the same, the second method allows for development in IIS environment which includes LSC services and integrated authentication. Based on the application needs, a developer may choose between the two methods. 

The default port watch / reload is performed by specifying the **-watch** flag while start the application from command line. For example, to watch and reload our new application, the following command must be used to start the node process from within the platform's root directory: 

**node app.js -watch newapp**. 

The IIS watch / reload is controlled via web.config file with the following application setting `<add key="NodeWatchApp" value="newapp" />` where value is the name of the application for which watch and reload should be activated. 

_NOTE: When running watch / reload under IIS, the platform must start via IIS, not from the command line. Please refer to administrative guide for more information on how to manage the platform running under IIS._

### Watched files and directories

As previously noted the watch and reload feature performs monitoring and automatic re-initialization of the application for most of the files under the application directly. These files include: controllers, services, policies, routes, angular, static files such as CSS and HTML, and layout views for EJS. The watch DOES not monitor for the following: files added under server-side components (controller, services, policies). When you add a new server side specific files, you must perform initialization as described above.

### LSC Services Overview

LSC Services are special services that run in the context of IIS module. Regardless if the watch is enabled, these services are not monitored the same way. In order to enable watch and reload of LSC services, a command must be executed via URL GET in order to notify the platform that LSC services must be reloaded, not cached. Navigate to logged in core UI screen and executed the following get request within the browser (this must be performed only when the platform is running under IIS mode): 

`http://localhost/lsc/control/service-reload/1`

The "1" at the end of the url tells the platform to enabled the reload of LSC services, while "0" will disabled it. It should be noted that this operation must be performed again if the IIS process was restarted due to configuration or initialization. 

### Angular and Typescript

Since we are using Angular as an MVC for development of application, the main development is done via Typescript (.ts) files located under the "assets/app" directory of configured application. The watch and compilation procedure for these files is not part of the Livepoint platform since many different version of the Angular may be used in order to develop the application. However, any changes to compiled files will automatically reload into the platform context thus integrating the development of Angular application into the platform's development process. In order to perform watch and compilation of the typescript related to application, navigate to "assets/app" folder from separate console window and execute the following command: 

**tsc -w**

Once the typescript compiler has been started, changes to any .ts files within the project will automatically convert into .js files thus triggering the watch and reload functionality of the platform. 

## Sails.js Specific Files

Since Livepoint platform uses Sails.js for routing and server-side application logic, a developer must be familiar with framework's concepts before starting the development of the Livepoint application. This section is a quick reminder of how those files are used within the application structure in relation to Angular application, rather than general concepts behind Sails.js. 

### EJS requirements

The EJS views required for the application are stored under "views" folder of the application structure. The "layout.ejs" file contains the main files required to correctly start the application and necessary dependencies. When requiring additional files remember the following point during modification of "layout.ejs": 

* The relative url path of files which are part of the given application should always start with the application name, such as **/newapp/mydependency.js**
* The files stored under "assets" directory are available without the prefix of "assets". For example, if the "assets" directory contains the sub directory of "js", the proper URI for this file would be **/newapp/js/file.js** NOT _/newapp/assets/js/file.js_.
* JQuery and other Javascript dependencies outside of the Angular scope must be referenced here in their appropriate order. 

## Angular Structure

As mentioned before, Angular 4.x is the basis of Livepoint application in R4 platform release, considering the skeleton application is used. The skeleton application provides the necessary configuration, routes, and components to get a fast start on the application development. Outside of the skeleton application, a developer may choose to set up their own structure of the application. In any case, the structure of Angular application must reside within "assets" directory of the Livepoint application bundle. The Angular concepts and app structure is outside the scope of this manual. A basic understand of Angular is required and may be found under the official Angular website. 

### Systemjs.Config file

The systemjs.config.js file is the angular application configuration file used to define the application and how the dependencies are loaded and provided. The file resize under "assets/js" directory of the application structure. Give the example, please use the similar notation when adding new angular modules that must be used by the application. 

_REQUIRED: The file must be modified in order to specify the correct application name. In the "map" object you will noticed the path to the "app". This field must be modified to match the name of the application specified earlier. For example, the following is correct given the name newapp: **/newapp/app**._

_NOTE: The step above is only necessary if you want to use app.js file as additional functionality file for the application. For example, this file may be used to setup a global socket.io communication channel or provide common functionality for UI._

### Angular Typescript

The typescript files (.ts) responsible for the application functionality are stored under the "asserts/app" directory. In general, the application is broken down into sections, where each section has a root module followed by additional modules based on the routing config. The developer **MUST** make sure the routing configuration is modified and correctly referenced by specifying the name of the application where appropriate. For example, app-routing.module.ts specified the default routing for the application "sections". To correctly specify the loading strategy, the prefix of the application name (as setup above) should be specified, in this example being "newapp/management". 

The modules, services, and pipes are standard to Angular 4.x. A developer may choose how they setup the given component as long as the routing and dependencies are correctly loaded. 

_REQUIRED: The component definition referencing html as component template MUST specify the views based on absolute URI as value of **templateUrl** property. For example, if home.html is to be references, the value of the propery would be **/newapp/appviews/home.html**. The reason absolute path is used (as oppose to relative) is due to production bundle which keeps the template separate and enables bundled script to load them correctly based on the application name._

### Angular Views

The HTML views for angular components are stored under "assets/appviews". Based on the skeleton application, the main view of the application is currently set to "home.html" and defines the structure of the application root based on the requirements. 


## Examples

### Get user information

The skeleton application contains UserService file which provides access to user information. Such information may be used by the application for roles, user properties, and execution context. The following code provides an example on how to access using information: 

```javascript
if (userService.current) {
   this.availableUser(userService.current);
} else {
   this.userService.getAccount().subscribe(
	event => this.availableUser(event),
	error => this.handleError(error)
   );	
}
```

The service caches the user in instance variable "current". The call to this service should normally be performed from the top parent component during the application load. 

### Components Events (Event Bus)

Components may need to communicate with each other based on the actions and functionality. For such events, a service named NavService may be used to emit and catch global events within the component. The service is a singleton and may be used within any component for event messages. To register the event within the component, the following code should be executed within the ngOnInit function: 

```javascript
this.eventFilterModified = this.navService.on('service:filter-modify').subscribe(data => this.onFilterModify(data));	
```

Note that onFilterModify is an example function to be executed when an event of name "service:filter-modify" is emitted. When the component is destroyed, it is important to executed unsubscribe method of the event property. For example: 

```javascript
this.eventFilterModified.unsubscribe();
```

To emit events from any component, the following code should be used directly on the NavService instance: 

```javascript
this.navReady.emit("service:filter-modify", someData);  	
```

### LSC Service

LSC services are JavaScript services executed under the context of IIS module, which allows for special operations to be performed such as impersonation and use of .NET compiled components provided by default such as (AF and PI driver) as well as custom modules via Edge.js library. 

#### Service Configuration

All of the services are stored under the **lscservices** directory of the application structure. However, the services are not loaded automatically and must be configured via _endpoints.js_ file stored under **config** directory of the application. The file provides a json array structure with absolute path of the service method and associated method within the LSC service to be executed. 

```javascript
[
	{
		"url" : "/lsc/example/test-lsc",
		"method" : "TestService.testFunction"
	}, 
	{
		"url" : "/lsc/example/get-data",
		"method" : "TestService.getAttributeData"
	}
]
```

#### Service Method Signature

While the structure of the service file may be any acceptable Javascript code, the following signature must be followed for all method which are exposed via _endpoints.js_ file. 

```javascript
exposedFunction: function(context, callback) {}
```

The **context** variable holds the functions, variables, and request object exposed by the IIS module. This includes driver for AF, PI, logging functionality of the platform, and envrionment variables. The **callback** is a function with signature of  **(err,result)**. If the service was executed successfully, the _err_ variable should be null, similar to most of the callbacks within JavaScript modules. 

#### Request Body

When LSC service is executed as POST (preferred method) from the client side of the application, the JSON object passed to the service is contained in the **body** property of the context in the form of JSON object. Once executed, the developer may use this property to get the request parameters to the service and perform necessary action. 

#### Logging to Platform Logs

The context object exposes an object named **log** which provides logging capabilities directly to platform's logs. The log object has several functions corresponding to logging level. The following code outlines the use of logging object: 

```javascript
var log = context.log;
log.info('info only');
log.error('error only');
log.debug('debug only');
```

## AF / PI Method Invocation

As described in earlier section, the LSC services provide access to PI / AF drivers used for accessing the tag data, event frames, and elements. The supported methods including invocation requests and responses are outline in driver documentation and should be familiar to the develop prior to writing LSC services for such data access. The following section will provide a simple example of retrieving the element tree from AF as well as pulling the data from AF attributes using the AF Driver. 

_NOTE: An existing and available AF database should be accessible by the developer's machine or the machine the LSC services are executed from. Since AF driver follows the security patterns of Windows impersonation, the account running the code must be configured to have correct access, else the error message will return trying to access any of the methods._

### AF Element Tree

The follownig code is an LSC exposes function which retrieves the entire element tree from specified server and database. 

```javascript
var PIFunctions = context.PI;
var AFFunctions = context.AF;

var search_request = {
	ID: "18",
	EnableLog: false,
	Server: "localhost",
	Database: "LPX_ITMonitoring",
	LoadToDepth: 0,
	ReturnFullPath: false,
	ReturnRoot: false,
	ReturnAttributes: 'All',

	SearchTree: true, 
	SortOrder: 'Descending',
	ElementFilters: [{ Name: '*'}],

	ElementFields: ["Name", 'Guid', 'HasChildren', 'HasAttributes', 'ParentGuid', 'Parents', 'Security'],
	AttributeFields: ['Name', 'DataReference', 'Value', 'State','IsConfigured', 'HasChildren', 'OwnerGuid', 'OwnerType', 'UOM', 'EngUnits']
};

AFFunctions.FindElements(search_request, function(err, res) {
	callback(err, {status:200, response: res});
});
```

In the example above, the **res** object is the json object representing the driver data in the specified format. Please see the driver documentation for complete structure _or_ example the functionality of the example application. 

_NOTE: The following code assumes success of function invocation. However, the **res** element may return an interal error with description and error stack. In general, the AF function error are handled on the client side for easier debugging and more information, but the developer may choose to example the **res** object and perform additional error logging from within the LSC service._

### AF Attribute Data

The following example performs a call to AF driver function to get the values of attribute based on the **persist** property. The attribute data may be returned through other properties such as GUID and full path. For more information, please check driver documentation. 

_NOTE: The common use of this function is to retrieve a data from the attribute(s) based on previous search performed on either the element tree or an event frame. For example, the tree of elements may be treversed by the application front-end and selected attributes are displayed as part of a line chart view._

```javascript
var body = context.body;
var PIFunctions = context.PI;
var AFFunctions = context.AF;

var searchel_request = {
	"ID": "GetAttributeData",
	"EnableLog": false,
	"Server": body.server,
	"Database": body.db,
	"Method": "PlotValues",
	"Count": 200,
	"StartTime": "*-1m",
	"EndTime": "*",
	"ValueFields": ["TimeStamp", "TimeUTC", "TimeTicks", "Value"],
	"Attributes": [
		{
			"Persist": body.persist
		}
	]
};

AFFunctions.GetAttributeData(searchel_request, function(err, res) {
	callback(err, {status:200, response: res});
});
```

In the example below, the front-end application is sending the **persist** string as part of the POST body to LSC service. The attribute data is then selected by specifying the appropriate method of return values (ex: PlotValues), start time, and persist string. In production application, the same call would apply but allow for more dynamic properties to be sent from the client such as start and end ties, server and database, and other properties based on the application requirement and driver support. 

## Access to Indexing

Indexing is the method of recording data from slower data sources such as AF in order to query and operate on the data faster. Livepoint platform utilizes mostly Apache SOLR for indexing needs although other stores may easily be integrated. The following section provides an example of using SOLR indexing store, but the patterns used may be applied to other indexing stores and advanced functionality. 

_REQUIRED: Prior to working with the example, an indexed SOLR code must be configured and populated with test data. The official documentation for indexing for both 1.3x and Index Interface outline the details on performing the indexing._

### SOLR Server-side access

The SOLR service is a separate services managed by Apache software and does not rely on the Livepoint platform to function. In most cases, the indexing server is closed to an outside and is accessible only by the Livepoint server hosting the application. For that reason, the access to SOLR data is performed on the service side using controller functionality of applications described earlier in this document. 

Several access mehods may be used in order to get the data from indexed core such as official SOLR javascript library or an HTTP request to SOLR interface. The example application is using the HTTP to get the data to remove the need for SOLR library dependency within the main platform modules. 

_NOTE: You should be familiar to SOLR syntax and data structure prior to working with this example. The example written in this document outlines the use of data access withn the application._

The following method of sailes.js controller, will pull the data from indexed AF elements. The code below includes functionality to deal with wildcard character and is used within the example application. 

```javascript
findElement: function(req, res) {
	var q = req.query.q;
	var start = req.query.start || '0';

	var wild = q.split('*');
	if (wild.length > 2) {
		q = "";
		wild.forEach(function(w) {
			if (w.length > 0) {
				q += "*" + w + "* AND namepath:";
			}
		});

		q = q.substr(0, q.length - 14);
	}

	var url = settings.serviceConfig.indexServer + '/solr/element/select?q=namepath:' + q + '&indent=on&wt=json&rows=10&start=' + start;
	http.get(url,function(err,resultData){
		var solrData = JSON.parse(resultData.body);   
		return res.json(solrData);
	});  
 }
```

The SOLR data is returned in the format specified by indexing service and includes meta information and body of the returned elements. Since the HTTP GET request returned a string in this case (not json object), **JSON.parse** method must be used to parse the return stream and pass it back to the client. 

_NOTE: The example application includes the call to this function as the first call to find elements based on the namepath specified by the user, including wild card characters. Once the structure of found element is returned, an additional method may be executed to return sub-elements based on the parent GUID. The structure of SOLR documents indexed by Livepoint platform allows to perform complex queries based on the syntax of SOLR and depends on the application requirements. Its important to remember that query also depends on the SOLR **core** from which to pull the data which may include element, eventframes, and attributes. Please refer to documentation on indexing for core descriptions._

## Example of Charting

The data retrieval above is part of the example application to plot attribute values to a simple line chart provided by Chart.js library (part of the example application). The example shows how to use the basic functionality of Chart.js library as well as provide example (commented out) structure of response returned from the LSC service call to attribute data. Please refer to **hasChartData** function of _dashboard-home.component.ts_ file for complete code. 

The example combines above sections to perform a search based on indexed data with use of **ElementSearch** component located in _elementsearch.component.ts_ file. Once the data has be found by the user, the element containing attributes may be selected to populate attribute list. Clicking on a single attribute will execute the call to LSC service to perform AF attribute data retrieval and return the result to be plotted into the line chart provided by Chart.js. 

## Application Walkthrough

The following sections provides a walkthrough of the application installation and usage. The application skeleton included in this repository includes the neccesary structure out of the box.

_REQUIRED: Prior to installation the application make to have a Livepoint X4 envrionment setup and ready, including SOLR indexed data and access to AF server use for pulling the data from AF attributes._

### Step 1: Application Installation

To install the application, place the content of the repository into a new folder named **example** at the root of _apps_ directory of the platform installation. The name of the folder is important since the application is configured to use the **example** as application name which includes the path to required files. If you want to rename the application, please refer to [Application Setup](#application-setup) section of this manual for detailed explanation on application naming. 

### Step 2: Application Configuration

Navigate to config folder inside of your application and open _settings.js_ file.  Here you will see the application naming and description which may be configured in the format of Javascript properties. In addition, make sure to specify the correct name  of the indexing service (defined by **indexServer** property) if you are to use the example SOLR configuration. If  the name of the application changed, make sure to open _policies.js_ file and change the path to existing policies (outlined in the Application Setup section of this manual).

### Step 3: Compile Typescript 

While the application includes the Javascript files, changing those files requires compilation of Typescript into Javascript as well as the _watch_ functionality on the **tsc** command to constantly monitor and compile file changes. In roder to do this, open a new console window at the directory "example/assets/app". This directory includes all of the Typescript files for the application. Once opened, execute the following command to tell the compiler to watch for changes on Typescript files (the first run will also compile the existing files): **tsc -w**. You should see a message for successfull compilation without 0 errors. 

### Step 4: Initialization

Initialize the platform by running the **node app.js -init** command. This will copy the necessary application files and compile the structure of the application in preparation for development. Once initialize is complete, the platform is ready to be started. Please note the way you want to start the platform based on the development needs. If you are using LSC (AF functionality for example), you must start the platform under the IIS. If LSC functionality is not included into development, the application may be started from command line for development purposes. To activally develop against the platform, please include the **watch** functionality described in the following section: [Application Watch and Reload](#application-watch-and-reload).

### Step 5: Test the application

Once started, please test the application by navigating to the url and clicking the application name from the list. The application structure should load and screen presented with SOLR search. Clicking the button to open the SOLR search screen, perform a query of elements indexed within the SOLR server to verify the functionality is working. You may now develop required functionality on top of the application assuming all the **watch** has be enabled for both Typescript and Application files. 
