function allWith(pol) {
	var all = ["getParams",
			"sessionAuth",
			"determineAccessToResource",
			"applicationSettings"];
	all.push(pol);
	return all;
}

var exampleAdminOnly = allWith('exampleAdminOnly');

module.exports["example/DataController"] = {
	"start": true,
    "join": true
};

module.exports["example/SQLDataController"] = {
	"saveCommentsConfig": exampleAdminOnly,
	"DeleteSystem": exampleAdminOnly,
	"deleteArea": exampleAdminOnly,
	"SaveSystem": exampleAdminOnly,
	"SaveArea": exampleAdminOnly,
	"SaveSite": exampleAdminOnly,
	"savePriorities": exampleAdminOnly,
	"saveKpis": exampleAdminOnly,
	"saveStatuses": exampleAdminOnly,
	"deleteSite": exampleAdminOnly,
	"LoadSystem": exampleAdminOnly
};
