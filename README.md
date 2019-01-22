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

### LSC Services 

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

```
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

```
this.eventFilterModified = this.navService.on('service:filter-modify').subscribe(data => this.onFilterModify(data));	
```

Note that onFilterModify is an example function to be executed when an event of name "service:filter-modify" is emitted. When the component is destroyed, it is important to executed unsubscribe method of the event property. For example: 

```
this.eventFilterModified.unsubscribe();
```

To emit events from any component, the following code should be used directly on the NavService instance: 

```
this.navReady.emit("service:filter-modify", someData);  	
```

### LSC Service


