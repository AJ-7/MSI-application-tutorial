(function () {


	var lpxAlarmsTourSteps = [
		{
			name: "Welcome",
			title: "Welcome",
			content: "Welcome to Alarms Panel Application",
			placement: "center",
			nextName: "DateTime",
		},
		{	
			name: "SideBar",		
			element: '.tour-main-navbar',
			title: "Site/Area and Datasource filter",
			content: "On this panel you can filter Areas and Data Sources",
			placement: "right",
		},
		{		  
			name: "DateTime",		
			element: '.tour-main-time',
			title: "Time Range",
			content: "Using these controls you can set exact time ranges or a preset period can be selected",
			placement: "left",						
		},
		{		  
			name: "MainMenu",		
			element: '.tour-main-menu',
			title: "Main Menu",
			content: "Using this menu You can navigate through the different view of this app. You can click any of it now or press [Next] to contniue with the rest of elements on the Main Page.",
			placement: "bottom",						
		},
		{		 
			name: "Dashboard",		
			element: '.tour-dashboard-submenu',
			title: "Dashboard",			
			content: "This view has two different layouts [Summary] and [Details]. Press [Next] to go through the Summary elements or [Details] to go through the detailed view.",
			placement: "bottom",
			prev: -1			
		},			  		
		{		 
			name: "Summary components",		
			element: '.tour-dashboard-summary:eq(0)',
			title: "Alarms Summary",			
			content: "On this page You can see the summary overview of all alarms grouped by State, Priority and Areas.If there is 'No Data' displayer everywhere please select longer time range, or add Areas/Data Sources",
			placement: "top",
			next: -1	
		},			  		
		{		 
			name: "DashboardDetails",		
			title: "Dashboard",			
			content: "This is thr Dashboard details view. You can see alarms grouped by Priority and State. Press any of the bars which have at least one alarm or select longer time range, or add Areas/Data Sources.",
			placement: "bottom",
			prev: -1,			
			next: -1			
		},				
		{		 
			name: "DashboardDetailsDetails",		
			title: "More Alarms Details",			
			content: "This is more detailed Alarms View. If there are no alarms listed here please select longer time range or add Areas and Data Sources.",
			placement: "bottom",
			prev: -1,
		},		
		{		 
			name: "DashboardDetailsStatate",		
			title: "Alarms Details",			
			element: '.tour-alarmstate-selector:eq(0)',
			content: "By Clicking these buttons You can switch do different State/Priority alarms group.",
			placement: "bottom",
		},	
		{		 
			name: "AlarmList",		
			element: '.alarm-list-title',
			title: "Alarm List",
			content: "This is Alarm List table. You can see main Alarm properties on it. Comment Alarm if Commenting is available, download all existing alarm properties or see the chart.",
			placement: "top",
		},			  
		{		 
			name: "AlarmListDownload",		
			element: '.tour-alarmlist-download:eq(0)',
			title: "Download  Alarm Properties",
			content: "By pressing this button you can download all existing alarm properties in csv format.",
			placement: "top",
		},			  
		{		 
			name: "AlarmListChart",		
			element: '.tour-alarmlist-chart:eq(0)',
			title: "Download  Alarm Properties",
			content: "By pressing this button you can see the chart showing alarm occurances per day for the selected period.",
			placement: "top",
		},			  
		{		 
			name: "AlarmListCommenting",		
			element: '.tour-alarmlist-commenting:eq(0)',
			title: "Download  Alarm Properties",
			content: "By pressing this button you can see the alarm comments or add a new comment.",
			placement: "top",
			next: -1
		},			  		
		{		 
			name: "Lookback",		
			element: '.tour-lookback-submenu',
			title: "Lookback",
			content: "This view shows different available sets of KPIs. You can select [Peak Activity] or [Outside of Accessebility] items or press [Next] to contniue with the rest of elements on this view.",
			placement: "bottom",
			prev: -1			
		},			  
		{		 
			name: "LookbackMeter",		
			element: '.tour-lookback-meter:eq(0)',
			title: "Lookback Meter",
			content: "This meter shows alarms count versus the preset target/acceptability alarms ranges. Whenever it is less then target - 5% it is green, witin %5 of target it is orange, over target +5% it is red",
			placement: "top",
		},			  
		{		 
			name: "LookbackBreakdown",		
			element: '.tour-lookback-breakdown:eq(0)',
			title: "Lookback Breakdown",
			content: "This meter shows alarms count over preset target groupped by priority. Whenever it is less then target - 5% it is green, witin %5 around target it is orange, over target +5% it is red",
			placement: "top",
		},			  
		{		 
			name: "Top10alarms",		
			element: '.tour-lookback-top10alarms:eq(0)',
			title: "Top 10 Alarms",
			content: "This group shows top 10 most active alarms. You can press it to see the chart of the data: Alarm ocurances vs Day",
			placement: "top",
		},			  
		{		 
			name: "Top10days",		
			element: '.tour-lookback-top10days:eq(0)',
			title: "Top 10 Days",
			content: "This group shows top 10 days with most active alarms. You can press it to see the chart of the data: All alarm occurrences vs hour within selected day.",
			placement: "top",
			next: -1
		},			  
		{		 
			name: "Realtime",		
			title: "Realtime",
			content: "This view shows Realtime Alarms.",
			placement: "center",
			prev: -1			
		},			  
		{		 
			name: "RealtimeControl",		
			element: '.tour-realtime-control',
			title: "Actual Data",
			content: "Here you can see the time of last data received.",
			placement: "left",
		},			  
		{		 
			name: "RealtimeControl2",		
			element: '.tour-realtime-control2',
			title: "Realtime Toggler",
			content: "With this button You can stop or start realtime alarm updates.",
			placement: "left",
		},			  
		{		 
			name: "AlarmListR",		
			element: '.tour-alarm-row-realtime:eq(0)',
			title: "Alarm List",
			content: "This is Alarm List table. To see main Alarm properties please click on it.",
			placement: "bottom",
		},			  
		{		 
			name: "AlarmListDownloadR",		
			element: '.tour-alarmlist-download:eq(0)',
			title: "Download  Alarm Properties",
			content: "By pressing this button you can download all existing alarm properties in csv format.",
			placement: "top",
		},			  
		{		 
			name: "AlarmListChartR",		
			element: '.tour-alarmlist-chart:eq(0)',
			title: "Download  Alarm Properties",
			content: "By pressing this button you can see the chart showing alarm occurances per day for the selected period.",
			placement: "top",
		},			  
		{		 
			name: "AlarmListCommentingR",		
			element: '.tour-alarmlist-commenting:eq(0)',
			title: "Download  Alarm Properties",
			content: "By pressing this button you can see the alarm comments or add a new comment.",
			placement: "top",
			next: -1
		},			  		
		{		 
			name: "Reports",		
			title: "Reports",
			content: "From this view You can generate a variety of reports.",
			placement: "center",
			prev: -1,			
		},			  
		{		 
			name: "ReportsAverageAlarmRates",		
			element: '.tour-reports-averaterates:eq(0)',
			title: "Average Alarm Rate",
			content: "Average Alarm Rate report shows average alarm rates per selected areas.",
			placement: "top",
		},			  
		{		 
			name: "ReportsAlarmFlood",		
			element: '.tour-reports-alarmflood:eq(0)',
			title: "Alarm Flood Analysis",
			content: "Alarm Flood Analysis report shows the alarms in flood condition the per selected areas.",
			placement: "top",
		},			  
		{		 
			name: "ReportsAlarmsOutOfService",		
			element: '.tour-reports-alarmsoutofservice:eq(0)',
			title: "Alarms Out of Service",
			content: "Alarms Out of Service report shows any alarms marked out of service per selected areas.",
			placement: "top",
		},			  
		{		 
			name: "ChatteringAlarmList",		
			element: '.tour-reports-alarmschattering:eq(0)',
			title: "Chattering Alarm List",
			content: "Chattering Alarm List report shows any alarms that repeatedly transition between the alarm state and the normal state in a short period of time. (less than 1 min) per selected areas.",
			placement: "top",
		},			  
		{		 
			name: "StaleStandingAlarms",		
			element: '.tour-reports-alarmsstale:eq(0)',
			title: "Stale / Standing Alarms",
			content: "Stale / Standing Alarms report shows any alarm that remains in the alarm state for an extended period of time (e.g., 24 hours) per selected areas.",
			placement: "top",
		},			  
		{		 
			name: "FrequentlyOccurringAlarms",		
			element: '.tour-reports-alarmsfrequency:eq(0)',
			title: "Frequently Occurring Alarms",
			content: "Frequently Occurring Alarms report shows average alarm rates per the selected areas.",
			placement: "top",
		},			  
		{		 
			name: "SuppressedAlarmList",		
			element: '.tour-reports-alarmssupressed:eq(0)',
			title: "Suppressed Alarm List",
			content: "Suppressed Alarm List report shows any alarms marked as suppressed per the selected areas.",
			placement: "top",
		},			  
		{		 
			name: "ReportsBatch",		
			element: '.tour-reports-alarmsbatch:eq(0)',
			title: "Batch Report",
			content: "Batch Report shows alarms that have occurred versus the batchid / areas and time periods selected.",
			placement: "top",
		},			  
		{		 
			name: "ReportsShift",		
			element: '.tour-reports-alarmsshift:eq(0)',
			title: "Shift Report",
			content: "Shift Report shows alarms that have occured during the selected time period and areas",
			placement: "top",
			next: -1
		},			  
		{		 
			name: "Setup",		
			title: "Application Setup",
			element: '.tour-management-submenu:eq(0)',
			content: "This is main setup view. You can select [Systems], [Sites] or [Configuration] items or press [Next] to contniue with the rest of elements on this view. Actions on these views may significantly affect system behaviour or data configuration.",
			placement: "bottom",
			prev: -1,
		},		
		{		 
			name: "SetupSystems",		
			title: "Systems List",
			element: '.tour-setup-systemlist:eq(0)',
			content: "This list shows all available systems (Data sources). You can configure new system, edit existing one or delete unnecessary system.",
			placement: "top",
			prev: -1,
		},		
		{		 
			name: "SetupSystemsDelete",		
			title: "Delete System Button",
			element: '.tour-setup-systemlist-delete:eq(0)',
			content: "By pressing this button the system can be deleted. Warning ! This operation has no rollback option.",
			placement: "left",
		},		
		{		 
			name: "SetupSystemsEdit",		
			title: "Edit System Button",
			element: '.tour-setup-systemlist-edit:eq(0)',
			content: "By pressing this button You can enter system setup view. Press it to go through system setup process or press [NEXT] to go to system creation operation",
			placement: "top",
		},		
		{		 
			name: "SetupSystemsCreate",		
			title: "Create System Button",
			element: '.tour-setup-systemlist-create:eq(0)',
			content: "By pressing this button You can create new systems. Press it to go through system creation process or press [PREV] to go to system modification operation",
			placement: "top",
			next: -1,
		},
		{		 
			name: "SetupSystemsEditView",		
			title: "System Modification",
			content: "Welcome to system modification view. On this view You can setup source servers, tags, reconciliation rules, source type and other data source properties.",
			placement: "center",
			prev: -1
		},				
		{		 
			name: "SetupSystemsEditName",		
			element: '.tour-setup-systemlist-name:eq(0)',
			title: "System Name",
			content: "Displayed name of the system. This name will appear on system selection list.",
			placement: "top"
		},				
		{		 
			name: "SetupSystemsEditDescription",		
			element: '.tour-setup-systemlist-description:eq(0)',
			title: "System Description",
			content: "Detailed system description.",
			placement: "top"
		},				
		{		 
			name: "SetupSystemsFieldMapping",		
			element: '.tour-setup-systemlist-fieldmapping:eq(0)',
			title: "Field Mapping",
			content: "In this section You can setup the source PI server, source Tag and create or modify field mappings for delimeted tag types.",
			placement: "top"
		},				
		{		 
			name: "SetupSystemsSourceServer",		
			element: '.tour-setup-systemlist-sourceserver:eq(0)',
			title: "Source Server",
			content: "Please select the source server from the provided list.",
			placement: "top"
		},				
		{		 
			name: "SetupSystemsSourceTag",		
			element: '.tour-setup-systemlist-sourcetag:eq(0)',
			title: "Source Tag",
			content: "Please type the tagname which will be the data source for the system.",
			placement: "top"
		},				
		{		 
			name: "SetupSystemsSourceRegex",		
			element: '.tour-setup-systemlist-regex:eq(0)',
			title: "Delimeter regular expression",
			content: "By default the delimeted tags used '|' as delimeter. In other cases you can change the delimeter using simple or complex regex expressions to fetch the fields from tag.",
			placement: "top"
		},				
		{		 
			name: "SetupSystemsSourceTagType",		
			element: '.tour-setup-systemlist-tagtype:eq(0)',
			title: "Tag Type",
			content: "Alarm or Events - Alarm types can be seggregated by type using this selection.",
			placement: "top"
		},				
		{		 
			name: "SetupSystemsSourceTagReconType",		
			element: '.tour-setup-systemlist-tagtreconype:eq(0)',
			title: "Tag Reconciliation Type",
			content: "The source tags may have two reconciliation types - Delimeted or Integer.Press [Delimeted] or [Integer] button for more detials or [Next] to skip this step",
			placement: "top"
		},				
		{		 
			name: "SetupSystemsSourceBatchMapping",		
			element: '.tour-setup-systemlist-batchmapping:eq(0)',
			title: "Batch Mapping",
			content: "In some cases the alarm data can be attached to a Batch information tag to assocaite and alarm with a BatchId.",
			placement: "top",
		},
		{		 
			name: "SetupSystemsSourceBatchMappingType",		
			element: '.tour-setup-systemlist-batchmappingtype:eq(0)',
			title: "Batch Selection Creteria",
			content: "This creteria allows a rule to be set as to when to take the batchid from the assocaited tag. Value at start of alarm time, value at end of alarm time or closest value to the alarm timestamp.",
			placement: "top",
		},
		{		 
			name: "SetupSystemsSourceReconciliationRule",		
			element: '.tour-setup-systemlist-reconciliationrule:eq(0)',
			title: "Reconciliation Rule",
			content: "You can select reconciliation rule appropriate to your system from the predefined list, note individual rules have required fields please refer to the user manaul",
			placement: "top",
		},
		{		 
			name: "SetupSystemsSourceNotification",		
			element: '.tour-setup-systemlist-notification:eq(0)',
			title: "Real-time alarm notifications",
			content: "If enabled, the alarms from this system will be sent directly to alarm distribution system(s) - this feature marks alarms as true for distribution or import from noticiation systems",
			placement: "top",
		},
		{		 
			name: "SetupSystemsSourceActive",		
			element: '.tour-setup-systemlist-active:eq(0)',
			title: "Active Systems",
			content: "Active systems are displayed on the system list and included in all of the queries and alarm data retreival. Inactive system configuration will be ignored by Data Collection Service.",
			placement: "top",
		},
		{		 
			name: "SetupSystemsSourceRecovery",		
			element: '.tour-setup-systemlist-recovery:eq(0)',
			title: "Recovery",
			content: "The alarm data can be recovered for each system individually. If after the system modification You need to recover alarm data for some period with latest changes You can use this function.",
			placement: "top",
		},
		{		 
			name: "SetupSystemsSourceRecoveryStart",		
			element: '.tour-setup-systemlist-recoverystart:eq(0)',
			title: "Recovery Start",
			content: "The start time of recovery. Can be exact date time string like '01-Jan-2017' or realtive time format such as '*-10d' for time period",
			placement: "top",
		},
		{		 
			name: "SetupSystemsSourceRecoveryEnd",		
			element: '.tour-setup-systemlist-recoveryend:eq(0)',
			title: "Recovery End",
			content: "The end time of recovery. Can be exact date time string like '01-Jan-2017' or string format like '*-10d' for time period",
			placement: "top",
		},
		{		 
			name: "SetupSystemsSourceRecoveryBtn",		
			element: '.tour-setup-systemlist-recoveryrun:eq(0)',
			title: "Recovery Run",
			content: "This button will start recovery for this system. After recovery end the Data Collection Service will return back to realtime mode",
			placement: "top",
		},
		{		 
			name: "SetupSystemsSourceRecoveryLog",		
			element: '.tour-setup-systemlist-recoverylog:eq(0)',
			title: "Recovery Log",
			content: "The raw output from Data Collection Service. This log holds information about recovery process. If no recovery was run it will show information related to the last recovery.",
			placement: "top",
		},
		{		 
			name: "SetupSystemsSave",		
			element: '.tour-setup-systemlist-save:eq(0)',
			title: "Save",
			content: "Press [Save] button to update system settings or [Cancel] to return back to systems list.",
			placement: "top",
			next:-1
		},		
		{		 
			name: "SetupSystemsTypeDelimeted",		
			element: '.tour-setup-systemlist-tagvaluebtn:eq(0)',
			title: "Delimeted Reconciliation Type",
			content: "Delimeted tags have a string values separated by '|' for example. In the case of delemeted tags all information about alarm will be retrieved from the fields of this tag usind field mapping settings. Press [Get Tag Data] button to get a sample of the tag value.",
			placement: "top",
			prevName: "SetupSystemsSourceTagReconType"
		},
		{		 
			name: "SetupSystemsTypeDelimetedTagData",		
			element: '.tour-setup-systemlist-tagdata:eq(0)',
			title: "Delimeted Tag Value",
			content: "Press on a field to setup mappings.",
			placement: "top",
			next: -1
		},
		{		 
			name: "SetupSystemsTypeDelimetedTagField",		
			element: '.tour-setup-systemlist-tagfield:eq(0)',
			title: "Field Name",
			content: "Type field name from the source system or any name which will give an identify the field selected.",
			placement: "top",
			prevName: "SetupSystemsTypeDelimetedTagData"
		},
		{		 
			name: "SetupSystemsTypeDelimetedTagDescription",		
			element: '.tour-setup-systemlist-tagdescription:eq(0)',
			title: "Delimeted Tag Value",
			content: "Type field description an identify of what the field data is related to. Good practice to include some data examples here like 'Alarm prioriry field eg.(A - High, B- Low).",
			placement: "top",
		},
		{		 
			name: "SetupSystemsTypeDelimetedTagFieldMapping",		
			element: '.tour-setup-systemlist-tagfieldmapping:eq(0)',
			title: "Field Mapping",
			content: "Please select the proper mapping from the provided list of available fields. The mandatory fields are Priority,Status and AlarmUID. Go through all known fields to complete mapping setup.",
			placement: "top",
			nextName: "SetupSystemsSourceBatchMapping"
		},
		{		 
			name: "SetupSystemsTypeDelimetedTagFieldValueMapping",		
			element: '.tour-setup-systemlist-tagfieldvaluemapping:eq(0)',
			title: "Field Value Mapping",
			content: "For the Priority and Status fields the appropriate values should be set against available values. This will allow the system to match alarm properties against corresponding known alarm property. Press [New Mapping] button to add Value Mapping or [Next] to skip this step.",
			placement: "top",
			nextName: "SetupSystemsSourceBatchMapping"
		},
		{		 
			name: "SetupSystemsTypeDelimetedTagFieldValueSource",		
			element: '.tour-setup-systemlist-tagfieldvaluesource:eq(0)',
			title: "Source system value",
			content: "Please enter the value from the source system in this field.",
			placement: "top"
		},
		{		 
			name: "SetupSystemsTypeDelimetedTagFieldValueKnown",		
			element: '.tour-setup-systemlist-tagfieldvalueknown:eq(0)',
			title: "Local Value",
			content: "Please select the corresponding local value from the provided list.",
			placement: "top",
			nextName: "SetupSystemsSourceBatchMapping"
		},
		{		 
			name: "SetupSystemsTypeInteger",		
			element: '.tour-setup-systemlist-createlimit:eq(0)',
			title: "Integer Tag",
			content: "For Integer tag Limits must be set. In this case the alarms will be generated according to those limits. Press this field to create a new Limit or [Next] to skip this step.",
			placement: "top",
			prevName: "SetupSystemsSourceTagReconType",
			nextName: "SetupSystemsSourceBatchMapping"
		},		
		{		 
			name: "SetupSystemsTypeIntegerLimit",		
			element: '.tour-setup-systemlist-editlimit:last()',
			title: "New Limit",
			content: "Press this row to edit the limit or [Next] to skip this step.",
			placement: "top",
			prevName: "SetupSystemsSourceTagReconType"
		},		
		{		 
			name: "SetupSystemsTypeIntegerLimitValue",		
			element: '.tour-setup-systemlist-editlimitvalue:last()',
			title: "Limit Value",
			content: "Enter the limit value.",
			placement: "top",
		},				
		{		 
			name: "SetupSystemsTypeIntegerLimitOperator",		
			element: '.tour-setup-systemlist-editlimitoperator:last()',
			title: "Limit Operator",
			content: "Select the operator. it is possible to add as many limits as required.",
			placement: "top",
		},		
		{		 
			name: "SetupSystemsTypeIntegerLimitPriority",		
			element: '.tour-setup-systemlist-editlimitpriority:last()',
			title: "Priority",
			content: "Select priority of this condition.",
			placement: "top",
			nextName: "SetupSystemsSourceBatchMapping"			
		},		
		
		{		 
			name: "SetupSites",		
			title: "Sites List",
			element: '.tour-setup-siteslist:eq(0)',
			content: "This list shows all available Sites and Areas. You can configure new Site, edit existing one or delete unnecessary Site.",
			placement: "top",
			prev: -1,
		},		
		
		{		 
			name: "SetupSitesDelete",		
			title: "Delete Site Button",
			element: '.tour-setup-sitelist-delete:eq(0)',
			content: "By pressing this button the site can be deleted. Warning ! This operation has no rollback option.",
			placement: "left",
		},		
		{		 
			name: "SetupSitesEdit",		
			title: "Edit Site Button",
			element: '.tour-setup-sitelist-edit:eq(0)',
			content: "By pressing this button You can enter site setup view. Press it to go through site setup process or press [NEXT] to go to a new site creation process",
			placement: "top",
		},		
		{		 
			name: "SetupSitesCreate",		
			title: "Create Site Button",
			element: '.tour-setup-sitelist-create:eq(0)',
			content: "By pressing this button You can create new site. Press it to go through site creation process or press [PREV] to go to site modification process",
			placement: "top",
			next: -1,
		},
		{		 
			name: "SetupSiteEditView",		
			title: "Site Configuration",
			content: "Welcome to Site Configuration view. On this view You can setup site areas and kpi limits.",
			placement: "center",
			prev: -1
		},						
		{		 
			name: "SetupSiteEditName",		
			element: '.tour-setup-site-name:eq(0)',
			title: "Site Name",
			content: "Displayed name of the Site. This name will appear on Site selection list.",
			placement: "top"
		},				
		{		 
			name: "SetupSiteEditDescription",		
			element: '.tour-setup-site-description:eq(0)',
			title: "Site Description",
			content: "Detailed site description.",
			placement: "top"
		},				
		{		 
			name: "SetupSiteEditAreas",		
			element: '.tour-setup-site-areas:eq(0)',
			title: "Site Areas",
			content: "This section allows to create delete or modify site areas and allows the linking of a data source to each area.Click on any area to enter area modification view or press [Next] to skip this step.",
			placement: "top"
		},				
		{		 
			name: "SetupSiteCreateArea",		
			element: '.tour-setup-site-createarea:eq(0)',
			title: "Create New Area",
			content: "Click on this button to create new area or press [Next] to skip this step",
			placement: "top"
		},						
		{		 
			name: "SetupSiteKPIs",		
			element: '.tour-setup-site-kpis:eq(0)',
			title: "Site KPIs",
			content: "This section allows to configure site KPI limits. Click on any KPI to modify limits or press [NEXT] to skip this step.",
			placement: "bottom"
		},						
		{		 
			name: "SetupSiteSave",		
			element: '.tour-setup-site-save:eq(0)',
			title: "Save",
			content: "Press [Save] button to update site settings or [Cancel] to return back to sites list.",
			placement: "top",
			next:-1
		},
		{		 
			name: "SetupSiteCreatedArea",		
			element: '.tour-setup-site-newarea:last()',
			title: "New Area Created",
			content: "Click on this area to edit the created Area",
			placement: "top",
			prevName: "SetupSiteCreateArea",
			nextName: "SetupSiteKPIs"
		},
		{		 
			name: "SetupSiteConfigureKPI",		
			element: '.tour-setup-site-kpisacceptable:eq(0)',
			title: "KPI Configuration",
			content: "In this field you can change acceptable alarm ranges for this site",
			placement: "top",
			prev:-1
		},						
		{		 
			name: "SetupSiteConfigureKPIMaximun",		
			element: '.tour-setup-site-kpismaximum:eq(0)',
			title: "KPI Configuration",
			content: "In this field you can change maximum alarm count for this site",
			placement: "top",
			nextName: "SetupSiteSave"
		},						
		
		{		 
			name: "SetupSiteEditArea",		
			element: '.tour-setup-site-editarea:eq(0)',
			title: "Edit Area",
			content: "In this field You can change the Area name.",
			placement: "bottom",
			prev:-1
		},
		{		 
			name: "SetupSiteEditAreaDataSource",		
			element: '.tour-setup-site-editareasource:eq(0)',
			title: "Attach Data Source",
			content: "This button will add a new Data Source attached to this Area. Click on it to attach a new DataSource or press [Next] to skip this step",
			placement: "top",
		},
		{		 
			name: "SetupAreaSave",		
			element: '.tour-setup-area-save:eq(0)',
			title: "Save",
			content: "Press [Save] button to update area settings or [Cancel] to skip the changes.",
			placement: "top"
		},
		{		 
			name: "SetupAreaDelete",		
			element: '.tour-setup-area-delete:eq(0)',
			title: "Remove Area",
			content: "Press this button to permanently remove this area. Warning ! This operation has no rollback option. All Alarms data attached to this Area will be lost.",
			placement: "top",
			next:-1
		},
		{		 
			name: "SetupSiteEditAreaDataSourceSystem",		
			element: '.tour-setup-site-editareasourcesystem:eq(0)',
			title: "Are Source System",
			content: "Select the source system which will provide the data for this Area.",
			placement: "top",
			prev: -1,
		},
		{		 
			name: "SetupSiteEditAreaDataSourceType",		
			element: '.tour-setup-site-editareasourcetype:eq(0)',
			title: "Source Value Type",
			content: "In some cases all the values provided by the source system should be bound to an area. Select [All Values] in this case. But in certain cases the alarm data can have information about area and a single source system can be a data provider for multiple systems or areas, then [Tag Value] should be selected.",
			placement: "top",
		},
		{		 
			name: "SetupSiteEditAreaDataSourceValue",		
			element: '.tour-setup-site-editareasourcevalue:eq(0)',
			title: "Source Value",
			content: "In the case of [Tag Value] being selected as Source Value Type, please define the tag value which will bind the alarm to this Area.",
			placement: "top",
			nextName: "SetupAreaSave"
		},				
		{		 
			name: "SetupData",		
			title: "Configuration",
			element: '.tour-setup-data:eq(0)',
			content: "On this view You can configure the Priorities, Statuses, Kpi and Commenting configuration.",
			placement: "top",
			prev: -1,
		},		
		{		 
			name: "SetupDataPriorities",		
			title: "Priorities Configuration",
			element: '.tour-setup-priorities:eq(0)',
			content: "Press Configure data to update Priority configurations.",
			placement: "top",
		},		
		{		 
			name: "SetupDataStatuses",		
			title: "Statuses Configuration",
			element: '.tour-setup-statuses:eq(0)',
			content: "Press Configure data to update Status configurations.",
			placement: "top",
		},		
		{		 
			name: "SetupDataKPIs",		
			title: "KPIs Configuration",
			element: '.tour-setup-kpis:eq(0)',
			content: "Press Configure data to update KPIs configurations.",
			placement: "top",
		},				
		{		 
			name: "SetupDataCommenting",		
			title: "Commenting Configuration",
			element: '.tour-setup-commenting:eq(0)',
			content: "Press Configure data to update Commenting configuration.",
			placement: "top",
			next: -1
		},		
		{		 
			name: "SetupDataPrioritiesView",		
			title: "Priority label",
			element: '.tour-setup-prioritylabel:eq(0)',
			content: "This field allows the change of the Priority label.",
			placement: "top",
			prev: -1
		},				
		{		 
			name: "SetupDataPrioritiesViewTarget",		
			title: "Priority target",
			element: '.tour-setup-prioritytarget:eq(0)',
			content: "This field allows the change of the Priority target value.",
			placement: "top",
		},				
		{		 
			name: "SetupDataPrioritiesSave",		
			title: "Save settings",
			element: '.tour-setup-prioritysave:eq(0)',
			content: "Save the data and return back.",
			placement: "top",
		},				
		{		 
			name: "SetupDataPrioritiesCancel",		
			title: "Cancel changes",
			element: '.tour-setup-prioritycancel:eq(0)',
			content: "Cancel changes and return back.",
			placement: "top",
			next: -1
		},				
		{		 
			name: "SetupDataStatusView",		
			title: "Status label",
			element: '.tour-setup-statuslabel:eq(0)',
			content: "This field allows the change of the Status label.",
			placement: "top",
			prev: -1
		},				
		{		 
			name: "SetupDataStatusViewTarget",		
			title: "Statuses colors",
			element: '.tour-setup-statuscolor:eq(0)',
			content: "This field allows the change of the Status color.",
			placement: "top",
		},				
		{		 
			name: "SetupDataStatusSave",		
			title: "Save settings",
			element: '.tour-setup-statussave:eq(0)',
			content: "Save the data and return back.",
			placement: "top",
		},				
		{		 
			name: "SetupDataStatusCancel",		
			title: "Cancel changes",
			element: '.tour-setup-statuscancel:eq(0)',
			content: "Cancel changes and return back.",
			placement: "top",
			next: -1
		},				
		{		 
			name: "SetupDataKPIViewLabel",		
			title: "KPI label",
			element: '.tour-setup-kpilabel:eq(0)',
			content: "This field allows the change of the KPI label.",
			placement: "top",
			prev: -1
		},				
		{		 
			name: "SetupDataKPIViewTarget",		
			title: "KPI Activation",
			element: '.tour-setup-kpiactive:eq(0)',
			content: "This selection allows the switch between KPI active/not active state. If KPI is not active it is excluded from Lookback screen.",
			placement: "top",
		},				
		{		 
			name: "SetupDataKPISave",		
			title: "Save settings",
			element: '.tour-setup-kpisave:eq(0)',
			content: "Save the data and return back.",
			placement: "top",
		},				
		{		 
			name: "SetupDataKPICancel",		
			title: "Cancel changes",
			element: '.tour-setup-kpicancel:eq(0)',
			content: "Cancel changes and return back.",
			placement: "top",
			next: -1
		},				
		{		 
			name: "SetupDataCommentingView",		
			title: "Commenting",
			element: '.tour-setup-commentingview:eq(0)',
			content: "Here you can enable or disable commenting of the alarms.",
			placement: "top",
			prev: -1
		},				
		{		 
			name: "SetupDataCommentingSave",		
			title: "Save settings",
			element: '.tour-setup-commentingsave:eq(0)',
			content: "Save the data and return back.",
			placement: "top",
		},				
		{		 
			name: "SetupDataCommentingCancel",		
			title: "Cancel changes",
			element: '.tour-setup-commentingcancel:eq(0)',
			content: "Cancel changes and return back.",
			placement: "top",
			next: -1
		},				
	];
	

	getIdxByName = function(name) {
		for(var i = 0; i < lpxAlarmsTourSteps.length; i++) {
			if(name == lpxAlarmsTourSteps[i].name) {
				return i;
			}
		}
		return -1;
	}	
	
	for(var i = 0; i < lpxAlarmsTourSteps.length; i++) {
		if(lpxAlarmsTourSteps[i].nextName) {
			lpxAlarmsTourSteps[i].next = getIdxByName(lpxAlarmsTourSteps[i].nextName);
		}
		if(lpxAlarmsTourSteps[i].prevName) {
			lpxAlarmsTourSteps[i].prev = getIdxByName(lpxAlarmsTourSteps[i].prevName);
		}
	}

	
	this.lpxAlarmsTour = new Tour({
		orphan: true,
		steps: lpxAlarmsTourSteps
	});	
	
	this.lpxAlarmsTour.passedStages = {};
	
	this.lpxAlarmsTour.isVisited = function(name) {
		return this.passedStages[name] == 1;		
	}
	this.lpxAlarmsTour.Go = function(name, forced) {
		if(!this.passedStages) this.passedStages = {};
		for(var i = 0; i < lpxAlarmsTourSteps.length; i++) {
			if(name == lpxAlarmsTourSteps[i].name && (!this.passedStages[name] || forced)) {
				this.passedStages[name] = 1
				this.goTo(i);
				return;
			}
		}
	}
	
	this.lpxAlarmsTour.Start = function() {
		this.passedStages = {};		
		this.init();
		this.start(true);		
		this.goTo(0);		
		this.Go();		
	}
		
})();	