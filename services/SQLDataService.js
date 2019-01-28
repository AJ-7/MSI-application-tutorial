"use strict";
var moment = require('moment');
var settings = require('../config/settings.js');
var sql = require('msnodesqlv8');
var _ = require('underscore');
var async = require('async');

var transform = {
    noop: function (list) {
        return list;
    },
    plain: function (list) {
        var ret = [], tmp;
        list.forEach(function (element) {
            tmp = {};
            Object.keys(element).forEach(function (key) {
                tmp[key] = element[key];
            });
            ret.push(tmp);
        });
        return ret;
    },
    asDropDown: function (list) {
        var ret = [], tmp;
        list.forEach(function (element) {
            tmp = {};
            Object.keys(element).forEach(function (key) {
				var newkey = key;
				if(key == 'Id') newkey  = 'value'
				if(key == 'Name') newkey  = 'display'
                tmp[newkey] = element[key];
            });
            ret.push(tmp);
        });
        return ret;
    },
	
    navTree: function (list) {
		
        var ret = [];
		var tmp = {};
        list.forEach(function (element) {
			if(element.SiteId) {
				var siteid = element.SiteId
				if(!tmp[siteid]) {
					tmp[siteid] = {
						id: siteid,
						name:element.SiteName,
						description: element.Description,
						areas:{}
					}
				}	
				if(element.AreaId) {
					var areaid = element.AreaId;
					if(!tmp[siteid].areas[areaid]) {
						tmp[siteid].areas[areaid] = {
							id: areaid,
							name:element.AreaName,
							color: element.color,
							equipment:{}
						}
					}					
					if(element.EquipmentId) {
						var eqid = element.EquipmentId;
						if(!tmp[siteid].areas[areaid].equipment[eqid]) {
							tmp[siteid].areas[areaid].equipment[eqid] = {
								id: eqid,
								name:element.EquipmentName
							}
						}
					}															
				}					
			}			
        });			

		
		_.each(tmp, function(site) {
			var s = {
				id: site.id,
				name: site.name,
				description: site.description,
				areas: []
			};						
			_.each(site.areas, function(area) {
				var a = {
					id: area.id,
					name: area.name,
					selected:true,					
					equipment:[],
					color: area.color
				};
				
				_.each(area.equipment, function(equipment) {
					var e = {
						id: equipment.id,
						name: equipment.name,
						selected:true,						
					};
					a.equipment.push(e);
				});												
				s.areas.push(a);
			});
		
			ret.push(s)
		});		
		
		
        return ret;
    }
};
function buildResultRaw(results) {
	
	if(!results || !results.meta || !results.rows) return [];
	var rv = [];
	var columns = results.meta.map(function(column) { return column.name; });
	
	results.rows.map(function(row) {
		var newrow = {};
		for(var i = 0; i < row.length; i++) {
			newrow[columns[i]] = row[i]
		}
		rv.push(newrow);
	});
	
	return rv;
}

function runProcedureObj(transform, query, p, c) {
	var params = [];
	_.each(p, function(val, key) {
		if(val != undefined) 
			params.push({
				name: key,
				value: val
			});
	});
	runProcedure(transform, query, params, c)		
}

function runProcedure(transform, query, params, c) {	
	sql.open(settings.serviceConfig.dbConnectionString, function (err, conn) {
		if(err) {
			console.log('Error', err);
			return c(err);
		} else {
			try {
				var qurey_string = query;
				
				var comma = false;
				_.each(params, function(param) {
					if(param.value !== undefined) {
						query += (comma ? ",@" : " @") + param.name +"='" + param.value + "'"
						comma = true;
					}								
				});
				console.log(query);				
				conn.queryRaw(query, function(err, results, output) {	
				
					try {
						if(err) {
							console.log(err);
							return c(err);
						}
						if(!output) {
							return c(null, transform(buildResultRaw(results)));
						}
					} 
					catch(iex) {
						console.log("Exception", iex);
						return c(iex);
					}
				});
			}
			catch(ex) {
				console.log("Exception", ex);
				return c(ex);
			}
		}
	});
}

module.exports = {
	getConfig: function(callback) {		
		return callback(null, {
			displayedName: settings.displayedName,
			description: settings.description,
			version: settings.version
		});
	},	
    GetNavigationTree: function (params, callback) {
        return runProcedure(transform.navTree, 'sp_GetNavigationTree', params, callback)
    },
    GetDataSource: function (params, callback) {
        return runProcedure(transform.plain, 'sp_GetDataSource', params, callback)
    },	
    GetAlarmCounts: function (params, callback) {
        return runProcedure(transform.plain, 'sp_GetAlarmCounts', params, callback)
    },	
    GetAlarmList: function (params, callback) {		
		runProcedure(transform.plain, 'sp_GetAlarmCounts', params, function(err, res) {
			if(err) return callback(err);
			
			var total = 0;
			_.each(res, function(row) {
				total += row.AlarmCount;
			});
			return runProcedure(transform.plain, 'sp_GetAlarmList', params, function(e, r) {
				callback(e, {
					count: total,
					list: r
				});
			});
		});		
    },		
    GetAlarmData: function (params, callback) {
        return runProcedureObj(transform.plain, 'sp_GetAlarmData', params, callback)
    },
    GetTagData: function (params, callback) {
        return runProcedure(transform.plain, 'sp_GetTagData', params, callback);
    },	
    GetFields: function (params, callback) {
        runProcedure(transform.asDropDown, 'sp_GetFields', params, function(err, res) {
			if(err) return callback(err);
			async.eachSeries(res, function(field, cb) {
				if(Number(field.isMapped) == 1) {
					runProcedure(transform.asDropDown, 'sp_get' + field.FieldName + 'List', [], function(err, r) {
						field.mapping = r;
						cb(err);						
					});
				} else {
					field.mapping = [];
					cb(null);
				}
			}, function(err) {
				return callback(err, res);
			});
		});	
    },
    GetSystems: function (params, callback) {
		console.log('params', params);
        runProcedureObj(transform.plain, 'sp_GetSystems', {ignore: params}, function(err, res) {			
			_.each(res, function(system) { 
				system.selected = true; 
				try {
					system.parameters = JSON.parse(system.parameters);					
					if(!system.parameters.EndTime) system.parameters.EndTime = '*';
					if(!system.parameters.StartTime) system.parameters.StartTime = '*';				
				}				
				catch(ex) {
					system.parameters = {EndTime:'*', StartTime: '*'};					
				}				
			});			
			return callback(err, res);			
		});			
    },
	
    getDataSources: function (params, callback) {
        return runProcedureObj(transform.plain, 'sp_GetAreaDataSources', {
			areaid: params.id
		}, callback);
    },	
	
    DeleteSystem: function (params, callback) {
        return runProcedure(transform.plain, 'sp_DeleteSystem', params, callback);	
    },
	
	deleteArea: function (params, callback) {
        return runProcedure(transform.plain, 'sp_DeleteArea', params, callback);	
    },
	
	LoadSystem: function(system, callback) {
		if(system.type == 'integer') {
			runProcedureObj(transform.noop, 'sp_GetLimitsConfig', {SystemId: system.id}, function(err, res) {
				system.limits = [];
				_.each(res, function(row) {
					system.limits.push({
						display: row.display,
						compiled: row.compiled,
						value: row.value,
						operator: {
							value: row.operator,
							display: row.operator_display
						},
						priority: {
							value: row.PriorityId,
							display: row.priority_display
						}
					})
				});								
				callback(null, system);
			});			
		} else {
			var fields = [];
			runProcedureObj(transform.noop, 'sp_GetFieldsConfig', {SystemId: system.id}, function(err, res) {
				async.each(res, function(row, cb) {
					fields.push(row);
					if(Number(row.isMapped) === 1) {
						runProcedure(transform.noop, 'select Name, ' + row.LocalFieldName + 'Id as LocalId, Value from ' + row.LocalFieldName +'Map M, ' + row.LocalFieldName +'Ls L where FieldPlId = ' + row.Id + ' AND L.Id = M.' + row.LocalFieldName + 'Id', {}, function(err, res) {						
							row.mapping = res;
							cb(null);
						});			
					} else {
						cb(null);
					}
				}, function(err) {
					system.fields = [];
					var is_first = false;
					_.each(fields, function(field) {
						if(is_first) {
							system.fields.push({
								index: field.Index,
								isvalue:false,
								selected:false,
								separator:true,
								value:"|"
							});						
						}
						var f = {
							index: field.Index,
							name:field.Visible == "1" ? field.Name : null,						
							description: field.Description,						
							isvalue:true,
							selected:false,						
							separator:false,
							value:field.Sample						
						};
						if(field.LocalFieldId) {
							f.mapping = field.LocalFieldId;
							f.mappingDisplay = field.LocalFieldName;
							
							f.item = {
								FieldName: field.LocalFieldName,
								display: field.LocalFieldName,							
								isMapped: field.isMapped,
								value: field.LocalFieldId,
								mapping: [],
								values: []							
							}
							_.each(field.mapping, function(mapping) {
								f.item.values.push({
									value: mapping.Value,
									localValue: {
										display:mapping.Name,
										value: mapping.LocalId									
									}
								});
							});
						}
						
						system.fields.push(f);
						is_first = true;					
					});
					callback(err, system);		
				});	
			});
		}
	},
		
    SaveSystem: function (system, callback) {
		var sysId = 0;
		
		runProcedureObj(transform.plain, 'sp_InsertSystem', {
			Id: system.id,
			Name: system.name,
			Description: system.description,
			Server: system.server,						
			Tag: system.tag,
			TagType: system.tagType,
			BatchTag: system.batchTag,
			Notifications: system.notifications,			
			BatchCriteria: system.batchCriteria ? system.batchCriteria.value : 0,
			reconciliationid: system.reconciliationRule ? system.reconciliationRule.value : (system.reconciliationid ? system.reconciliationid : 0),			
			type: system.type,
			active: system.active,
			Delimeter: system.delimeter
		}, function(err, res) {
			if(err) return callback(err);
			if(res && res.length) {				
				if(system.type == "integer") {
					async.eachSeries(system.limits, function(limit, cb) {	
					    limit.SystemId = res[0].systemid;						
						limit.operator_display = limit.operator.display;						
						limit.operator = limit.operator.value;
						limit.priority = limit.priority.value;						
						runProcedureObj(transform.plain, 'sp_InsertSystemLimit', limit, function(e, r) {							
							cb(null);							
						});
					}, function(err){
						return callback(err, {SystemId: sysId});					
					});
				} else {				
					var systemid = res[0].systemid;
					sysId = systemid;				
					async.eachSeries(system.fields, function(field, cb) {					
						if(field.isvalue) {
							var fp = {
								SystemId : systemid,
								Name : field.name,
								Description : field.description || '',
								Index: field.index,
								LocalFieldId: field.mapping,
								Visible: field.name ? 1 : 0,
								Sample: field.value,
								
							}				
							
							runProcedureObj(transform.plain, 'sp_InsertSystemField', fp, function(e, r) {							
								if(field.item && field.item.values) {
									async.eachSeries(field.item.values, function(mf, c) {									
										runProcedureObj(transform.plain, 'sp_Insert' + field.mappingDisplay + 'Map', {											
											FieldPlId: r[0].FieldPLId,
											Id: mf.localValue.value,										
											Value: mf.value
										}, c);
									}, function(ee) {
										cb(ee);
									});
								} else {
									cb(null);								
								}
							});
						} else {
							cb(null);
						}
					},
					function(err){
						return callback(err, {SystemId: sysId});					
					});																
				}
			} else {
				return callback('System save error');
			}			
		});
    },
	
	
	getPriorities: function (params, callback) {
        return runProcedure(transform.plain, 'sp_GetPriorityList', params, callback);	
    },
	
	saveSite: function(params, callback) {
		var self = this;

		console.log(params.description);
		runProcedureObj(transform.plain, 'sp_InsertSite', {					
			id: params.id,
			name: params.name,
			Description: params.description
		}, function(err, res) {		
			if(err) return callback(err);
			if(!params.areas) params.areas = [];
			async.eachSeries(params.areas, function(area, cb) {	
				area.siteid = res[0].siteid;
				self.saveArea(area, cb);								
			},
			function(e) {
				var kpis = [];
				_.each(params.kpis, function(kpiset) {					
					_.each(kpiset, function(kp) {
						kpis.push(kp);
					});
				});
				async.eachSeries(kpis, function(kpi, kcb) {	
					kpi.siteid = res[0].siteid;
					runProcedureObj(transform.plain, 'sp_InsertSiteKpi', {
						siteid: kpi.siteid,
						kpiid: kpi.KpiId,
						KpiPlId: kpi.plid,
						acceptable: kpi.acceptable,
						maximum: kpi.maximum
					}, kcb);
				},
				function(ke) {
					callback(null, 'done');				
				});										
			});		
		});					
	},

	saveArea: function(params, callback) {
		runProcedureObj(transform.plain, 'sp_InsertArea', {					
			id: params.id,
			name: params.name,			
			siteid: params.siteid,
			color: params.color
		}, function(err, res) {
			
			runProcedureObj(transform.plain, 'DELETE FROM [dbo].AreaSourcePl WHERE AreaId = ' + res[0].areaid, {}, function(de, dr) {
				var sources = [];				
				if(params.sources) async.eachSeries(params.sources, function(source, c) {
					runProcedureObj(transform.plain, 'sp_InsertAreaSource', {
						name: source.name,
						areaid: res[0].areaid,
						systemid: source.system.value,
						fieldid: source.type.value,					
						mapping: source.mapping						
					}, function(se, sr) {					
						sources.push(sr[0]);
						c(null);									
					});
				}, function(e) {
					res[0].sources = sources;					
					callback(e, {area: res[0]});								
				});		
				else 
					callback(null, {area: res[0]});
			});
		});			
	},	
	
	savePriorities: function(params, callback) {
		async.eachSeries(params, function(priority, c) {	
			if (priority.Id) 
				runProcedureObj(transform.plain, "update PriorityLs set Target = '" + priority.Target + "', Name = '" + priority.Name + "' where Id = " + priority.Id, {}, c);			
			else 
				runProcedureObj(transform.plain, "insert into PriorityLs (Target, Name) Values ('" + priority.Target + "','" + priority.Name + "')", {}, c);			
		}, function(ee) {
			callback(ee, params);
		});
	},
	
	getStatuses: function (params, callback) {
        return runProcedure(transform.plain, 'sp_GetStatusList', params, callback);	
    },
	
	getAlarmDays: function (params, callback) {
        return runProcedureObj(transform.plain, 'sp_GetAlarmsByDay', {AlarmUID: params.AlarmUID}, function(err, res) {			
			_.each(res, function(day) {
				day.AlarmDateLabel = moment(day.AlarmDate).format("MMM Do YY");
			});
			callback(err, res);
		
		});	
    },	
	
	getAlarmDaysMulti: function (params, callback) {
        return runProcedureObj(transform.plain, 'sp_GetAlarmsByDayMulti', {AlarmUID: params.ids.join(','), from: params.from, to: params.to}, function(err, res) {					
			_.each(res, function(day) {
				day.AlarmDateLabel = moment(day.AlarmDate).format("MMM Do YY");
			});
			callback(err, res);
		
		});	
    },	
	
	getAlarmPerDay: function (params, callback) {
        return runProcedureObj(transform.plain, 'sp_GetAlarmsPerDay', {
			AlarmDate: params.AlarmDate			
		}, function(err, res) {			
			_.each(res, function(day) {
				day.AlarmDateLabel = moment(day.AlarmDate).format("MMM Do YY");
			});
			callback(err, res);
		
		});	
    },	
	
	getAlarmPerDayMulti: function (params, callback) {
        return runProcedureObj(transform.plain, 'sp_GetAlarmsPerDayMulti', {
			AlarmDate: params.days.join(','),			
			systems: params.systems,
			areas: params.areas			
		}, function(err, res) {			
			_.each(res, function(day) {
				day.AlarmDateLabel = moment(day.AlarmDate).format("MMM Do YY");
			});
			callback(err, res);
		
		});	
    },	
		
	
	getSiteKpiList: function (params, callback) {
		return runProcedureObj(transform.plain, 'sp_GetSiteKpiList', params, callback);		
	},
	
	getSiteKpis: function (params, callback) {		
        return runProcedureObj(transform.plain, 'sp_GetSiteKpi', params, function(err, res) {
			params.group = undefined;			
			async.eachSeries(res, function(item, c) {				
				if(item.sp_Kpi) {
					runProcedureObj(transform.plain, item.sp_Kpi, params, function(err, res) {
						item.value = res[0].AlarmsAmount												
						c(null);
					});					
				} else {
					c(null);				
				}
			}, function(ee) {
				callback(err, res);				
			});
			
		});														
    },

	
	getKpiTypes: function (params, callback) {
        return runProcedure(transform.asDropDown, 'select Id, Name from KpiTypeLs', {}, callback);					
    },	
	getKpis: function (params, callback) {
        return runProcedure(transform.plain, 'SELECT K.[Id],[KpiTypeId], [isActive] as active ,K.[Name] as name, KT.Name as KpiTypeName, KG.Id as KpiGroupId FROM [dbo].[KpiLs] K, KpiTypeLs KT, KpiGroupLs KG where K.KpiTypeId = KT.Id AND KG.Id = K.KpiGroupId', {}, callback);												
    },
	getReconciliationRules: function (params, callback) {
        return runProcedure(transform.asDropDown, 'SELECT [Id],[Name],[Procedure] FROM [dbo].[ReconciliationLs]', {}, callback);												
    },	
	saveKpis: function(params, callback) {
		
		var kpis = [];
		_.each(params, function(kpiset) {					
			_.each(kpiset, function(kp) {
				kpis.push(kp);
			});
		});
		async.eachSeries(kpis, function(item, c) {	
			if (item.Id) 
				runProcedureObj(transform.plain, "update KpiLs set Name = '" + item.name + "', isActive = '" + item.active + "', KpiTypeId = '" + item.type.value + "' where Id = " + item.Id, {}, c);			
			else c(null);			
		}, function(ee) {
			callback(ee, params);
		});		
	},	
	
	getTop: function(params, callback) {
        return runProcedureObj(transform.plain, 'sp_GetTop10AlarmCounts', params, function(err, res) {
			runProcedureObj(transform.plain, 'sp_GetTop10AlarmDays', params, function(e, r) {
				_.each(r, function(day) {
					day.AlarmDateLabel = moment(day.AlarmDate).format("MMM Do YY");
				});
				callback(null, {
					topActive: res,
					topDays: r
				});
			});
		});	
	},		
	
	getComments: function (params, callback) {
        return runProcedure(transform.plain, 'sp_GetComments', params, callback);										
    },
	
	saveComments: function (params, callback) {
        return runProcedure(transform.plain, 'sp_InsertComments', params, callback);										
    },
	getCommentsConfig: function (params, callback) {
        return runProcedure(transform.plain, 'sp_GetCommentsConfig', params, callback);										
    },
	
	saveCommentsConfig: function (params, callback) {
        return runProcedure(transform.plain, 'sp_InsertCommentsConfig', params, callback);										
    },
	
	saveStatuses: function(params, callback) {
		async.eachSeries(params, function(item, c) {	
			if (item.Id) 
				runProcedureObj(transform.plain, "update StatusLs set Name = '" + item.Name + "', Color = '" + item.Color + "' where Id = " + item.Id, {}, c);
			else 
				runProcedureObj(transform.plain, "insert into StatusLs (Name,Color) Values ('" + item.Name + "','" + item.Color + "')", {}, c);
		}, function(ee) {
			callback(ee, params);
		});
	},
	
	getAverageAlarmRate: function(params, callback) {
        return runProcedureObj(transform.plain, 'sp_GetReportAverage', params, function(err, res) {
			callback(null, res);			
		});	
	},
	getAlarmFlood: function(params, callback) {
        return runProcedureObj(transform.plain, 'sp_GetReportAlarmFlood', params, function(err, res) {
			_.each(res, function(a) {
				a.AlarmDateLabel = moment(a.AlarmTime).format("MMM Do YYYY, HH:mm");
			});
			callback(null, res);
		});	
	},
	
	getStaleAlarms: function(params, callback) {
        return runProcedureObj(transform.plain, 'sp_GetReportStale', params, function(err, res) {
			_.each(res, function(a) {
				a.AlarmDateLabel = moment(a.AlarmTime * 1000).format("MMM Do YYYY, HH:mm");
			});
			callback(null, res);
		});	
	},
	
	getChatteringAlarms: function(params, callback) {
        return runProcedureObj(transform.plain, 'sp_GetReportChattering', params, function(err, res) {
			_.each(res, function(a) {
				a.AlarmDateLabel = moment(a.AlarmTime * 1000).format("MMM Do YYYY, HH:mm");
			});
			callback(null, res);
		});	
	},
	
	getOutofserviceAlarms: function(params, callback) {
        return runProcedureObj(transform.plain, 'sp_GetReportOutofService', params, function(err, res) {
			_.each(res, function(a) {
				a.AlarmDateLabel = moment(a.AlarmTime * 1000).format("MMM Do YYYY, HH:mm");
			});
			callback(null, res);
		});	
	},
	
	getSupressedAlarms: function(params, callback) {
        return runProcedureObj(transform.plain, 'sp_GetReportChattering', params, function(err, res) {
			_.each(res, function(a) {
				a.AlarmDateLabel = moment(a.AlarmTime * 1000).format("MMM Do YYYY, HH:mm");
			});
			callback(null, res);
		});	
	},
	
	getAlarmShift: function(params, callback) {
        return runProcedureObj(transform.plain, 'sp_GetReportShift', params, function(err, res) {
			_.each(res, function(a) {
				a.AlarmDateLabel = moment(a.AlarmTime * 1000).format("MMM Do YYYY, HH:mm");
			});
			callback(null, res);
		});	
	},
	getAlarmBatch: function(params, callback) {
        return runProcedureObj(transform.plain, 'sp_GetReportBatch', params, function(err, res) {
			_.each(res, function(a) {
				a.AlarmDateLabel = moment(a.AlarmTime * 1000).format("MMM Do YYYY, HH:mm");
			});
			callback(null, res);
		});	
	},
		
	getReconciliationReport: function(params, callback) {
        return runProcedureObj(transform.plain, 'sp_GetReportAlarmReconciliation', params, function(err, res) {
			_.each(res, function(a) {
				a.AlarmDateLabel = moment(a.AlarmDate).format("MMM Do YYYY");
			});
			callback(null, res);
		});	
	},
	getSuppressedReport: function(params, callback) {
				
        return runProcedureObj(transform.plain, 'sp_GetReportSuppressed', params, function(err, res) {
			_.each(res, function(a) {
				a.StartDateLabel = moment(a.SuppressionStart * 1000).format("MMM Do YYYY, HH:mm:ss");								
			});
			callback(null, res);
		});	
	},
	deleteSite: function(params, callback) {		
        return runProcedureObj(transform.plain, 'sp_deleteSite', {Id: params.id}, callback);	
		
	},
	getAlarmDetails: function(params, callback) {		
        return runProcedureObj(transform.plain, 'sp_getAlarmDetails', {Id: params.alarmid}, callback);					
	},
    getRecovery: function (params, callback) {
        return runProcedure(transform.plain, 'sp_getRecovery', params, function(err, res) {
			if(err) return callback(err);
			_.each(res, function(system) { 
				system.selected = true; 
				try {
					system.parameters = JSON.parse(system.parameters);					
				}				
				catch(ex) {
					system.parameters = {};					
				}				
				if(!system.parameters.EndTime) system.parameters.EndTime = '*';
				if(!system.parameters.StartTime) system.parameters.StartTime = '*';				
			});			
			callback(null, res);			
		});	
    },
    setRecovery: function (params, callback) {
        return runProcedure(transform.plain, 'sp_setRecovery', params, callback);	
    }
	
	
};
