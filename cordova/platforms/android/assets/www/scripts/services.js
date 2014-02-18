'use strict';

var services = angular.module('DatAppProfit.services', ['jmdobry.angular-cache'])

var costs = [
	{
		id: 1,
		title: "Macbook Pro Late 2013",
		value: "$2654.23",
		tag: "color-teal",
		description: "2 Weeks ago 7/11",
		attachment: "yes",
		date: "2013-12-18T12:24:17Z"
	},
	{
		id: 2,
		title: "Chad Pro Late 2013",
		value: "$2654.23",
		tag: "color-teal",
		description: "2 Weeks ago 7/11",
		attachment: "yes",
		date: "2013-12-14T09:24:17Z"
	},
	{
		id: 3,
		title: "Macbook Pro Late 2013",
		value: "$2654.23",
		tag: "color-teal",
		description: "2 Weeks ago 7/11",
		attachment: "no",
		date: "2013-12-17T09:24:17Z"
	},
	{
		id: 4,
		title: "Macbook Pro Late 2013",
		value: "$2654.23",
		tag: "color-teal",
		description: "2 Weeks ago 7/11",
		attachment: "yes",
		date: "2013-12-14T09:24:17Z"
	},
	{
		id: 5,
		title: "Macbook Pro Late 2013",
		value: "$2654.23",
		tag: "color-red",
		description: "2 Weeks ago 7/11",
		attachment: "yes",
		date: "2013-12-15T09:24:17Z"
	},
	{
		id: 6,
		title: "Macbook Pro Late 2013",
		value: "$2654.23",
		tag: "color-yellow",
		description: "2 Weeks ago 7/11",
		attachment: "yes",
		date: "2013-12-14T09:24:17Z"
	},
	{
		id: 7,
		title: "Soroush Pro Late 2013",
		value: "$2654.23",
		tag: "color-red",
		description: "2 Weeks ago 7/11",
		attachment: "yes",
		date: "2013-11-14T09:24:17Z"
	},
	{
		id: 8,
		title: "Macbook Air Late 2013",
		value: "$2654.23",
		tag: "color-teal",
		description: "2 Weeks ago 7/11",
		attachment: "yes",
		date: "2013-12-15T09:24:17Z"
	},
	{
		id: 9,
		title: "Macbook Pro Late 2013",
		value: "$2654.23",
		tag: "color-teal",
		description: "2 Weeks ago 7/11",
		attachment: "yes",
		date: "2013-12-04T09:24:17Z"
	},
	{
		id: 10,
		title: "Macbook Pro Late 2013",
		value: "$2654.23",
		tag: "color-teal",
		description: "2 Weeks ago 7/11",
		attachment: "yes",
		date: "2013-12-11T09:24:17Z"
	},
	{
		id: 11,
		title: "iPad Air Late 2013",
		value: "$2654.23",
		tag: "color-blue",
		description: "2 Weeks ago 7/11",
		attachment: "yes",
		date: "2013-12-16T09:24:17Z"
	},
	{
		id: 12,
		title: "iPad Retina Late 2013",
		value: "$2654.23",
		tag: "color-blue",
		description: "2 Weeks ago 7/11",
		attachment: "yes",
		date: "2013-12-16T09:24:17Z"
	},
	{
		id: 13,
		title: "iPod Late 2012",
		value: "$500.00",
		tag: "color-blue",
		description: "2 Weeks ago 7/11",
		attachment: "yes",
		date: "2013-12-16T09:24:17Z"
	}
];


services.factory('appVersion', function($rootScope){
	var versionMgr = {};
	var version = "2.0 (WAC)";
	
	versionMgr.getVersion = function() {
		return version;
	}

	versionMgr.setVersion = function(version) {
		versionMgr.version = version;
	}

	return versionMgr;
});

services.factory('loadingService', function($rootScope){
	var loadingPanel = {};
	loadingPanel.show = function(){
		this.broadcastLoadingStart();
	}

	loadingPanel.hide = function() {
		this.broadcastLoadingStop();
	}

	loadingPanel.broadcastLoadingStart = function() {
		$rootScope.$broadcast('loadingStarted');
	}

	loadingPanel.broadcastLoadingStop = function() {
		$rootScope.$broadcast('loadingStopped');
	}

	return loadingPanel;
});

services.factory('headerService', function($rootScope){
	var header = {};
	header.title = "";

	header.prepForBroadcastHeaderChange = function(title) {
		this.title = title;
		this.broadcastTitleChange();
	}

	header.prepForBroadcastLoginChange = function(status) {
		this.loggedIn = status;
		this.broadcastLoginChange();
	}

	header.broadcastTitleChange = function() {
		$rootScope.$broadcast('handleTitleChange');
	}

	header.broadcastLoginChange = function() {
		$rootScope.$broadcast('handleLoginChange');
	}

	return header;
});

services.factory('profitAppService', ['$resource', '$http', '$angularCacheFactory', function($resource, $http, $angularCacheFactory){
	var profitCacheFactory = $angularCacheFactory('profitCache', {
        capacity: 1000,
        maxAge: 30000,
        aggressiveDelete: true,
        cacheFlushInterval: 60000
     });

	var profitAPI = {};
	profitAPI.groups = {};
	Parse.initialize("c6qu6vYBQBR8FMLKKxx8H6aR2I17562koAEQUgXY", "0YRo0iYzzupFk46JcQYWgMNjInQdHKG0bhLXxjDi");

	profitAPI.getCache = function() {
        return profitCacheFactory;
    }

	profitAPI.authenticate = function(email, password, callbackSuccess, callbackError) {
		var jsonData = new Object();
		jsonData.email = email;
		jsonData.password = password;

		var innerAPI = $resource(profitAPI.url,
                         {action: profitAPI.actions["authenticate"]},
                         {
                                 authenticate: {
                                         method: 'POST'
                                 }
                         });
        return innerAPI.authenticate(jsonData, callbackSuccess, callbackError);
	}

	profitAPI.getItemsList = function() {
		return costs;
	}

	profitAPI.getItemById = function(id) {
		return costs[parseInt(id)-1];
	}

	profitAPI.newEntry = function(newEntry, callbackSuccess, callbackError) {
		var Entry = Parse.Object.extend("Entry");
		var entry = new Entry();

		entry.set("category", newEntry.category);
		entry.set("title", newEntry.title);
		entry.set("date", newEntry.date);
		entry.set("value", newEntry.value);
		entry.set("notes", newEntry.notes);
		entry.set("group", newEntry.group);
		entry.set("attachment", newEntry.receiptFile);
		//entry.set("user", user);

		entry.save(null, {
			success: function(result){
				callbackSuccess(result);
			},
			error: function(error){
				callbackError(error);
			}
		});
	}

	profitAPI.newGroup = function(g, callbackSuccess, callbackError) {
		var Group = Parse.Object.extend("Group");
		var group = new Group();

		group.set("title", g.title);
		group.set("color", g.color);

		group.save(null, {
			success: function(result){
				callbackSuccess(result);
			},
			error: function(error){
				callbackError(error);
			}
		});
	}

	profitAPI.listGroups = function(callbackSuccess, callbackError) {
		var Group = Parse.Object.extend("Group");
		var query = new Parse.Query(Group);
		query.ascending("title");

		query.find({
			success: function(results){
	 			for(var i=0; i < results.length; i++){
	 				profitAPI.groups[results[i].get("title")] = results[i].get("color").split("none")[0].trim();
	 			}
				callbackSuccess(results);
			},
			error: function(error){
				callbackError(error);
			}
		});
	}

	profitAPI.listGroupsItems = function(callbackSuccess, callbackError) {
		var Entry = Parse.Object.extend("Entry");
		var query = new Parse.Query(Entry);
		query.ascending("date");

		query.find({
			success: function(results){
				var groupedData = {};
				var income = [];
				var expense = [];
				for(var i=0;i<results.length;i++){
					var entry = {};
					entry.title = results[i].get("title");
					entry.date = results[i].get("date");
					entry.value = results[i].get("value");
					entry.notes = results[i].get("notes");
					entry.category = results[i].get("category");
					entry.group = results[i].get("group");
					entry.color = profitAPI.groups[results[i].get("group")];
					entry.createdAt = results[i].createdAt;
					entry.updatedAt = results[i].updatedAt;
					if(entry.category == "income")
						income.push(entry);
					else
						expense.push(entry);
				}
				groupedData.income = _.groupBy(income, "group");
				groupedData.expense = _.groupBy(expense, "group");
				callbackSuccess(groupedData);
			},
			error: function(error){
				callbackError(error);
			}
		});
	}

	return profitAPI;
}]);
