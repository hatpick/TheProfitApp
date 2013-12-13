'use strict';

$.fn.usedWidth = function() {
    return $(this).width() + parseInt($(this).css("margin-left"), 10) + parseInt($(this).css("margin-right"), 10);
};

$.fn.usedHeight = function() {
    return $(this).height() + parseInt($(this).css("margin-top"), 10) + parseInt($(this).css("margin-bottom"), 10);
};	

var _noty = function(message, type) {
	var options = {
        text : message,
        template : '<div class="noty_message"><span class="noty_text" style="font-weight:200"></span><div class="noty_close"></div></div>',
        type : type,
        dismissQueue : true,
        layout : 'bottomLeft',
        timeout : 1500,
        closeWith : ['button'],
        buttons : false
    };
    var ntfcn = noty(options);
};

var _deviceInfo = function() {
	var information = {};
	var parser = UAParser();		

	information.device = $.ua.device;
	information.isPhone = ($.ua.device.model != undefined);
	information.browser = $.ua.browser;
	information.os = $.ua.os;

	return information;
}

var app = angular.module('DatAppProfit', ['DatAppProfit.filters', 'DatAppProfit.services', 'DatAppProfit.directives', 'DatAppProfit.controllers', 'ngResource', 'ngTable']).
            config(function($routeProvider, $locationProvider) {
				//$locationProvider.html5Mode(true);
				$routeProvider.
                    when('/home', {templateUrl: 'views/home.html', Controller: 'HomeCtrl'}). //you need to create this one
                    when('/createtag', {templateUrl: 'views/createTag.html', Controller: 'TagCtrl'}).
                    when('/add', {templateUrl: 'views/add.html', Controller: 'AddCtrl'}).
                    when('/list', {templateUrl: 'views/list.html', Controller: 'ListCtrl'}).
                    otherwise({redirectTo:'/home'});
			});

app.run(['$location', '$rootScope', '$templateCache', "headerService", function($location, $rootScope, $templateCache, headerService) {
	var routesThatDontRequireAuth = ['/login'];	  
	  
	$rootScope.$on('$routeChangeStart', function (event, next, current) {					

	});

    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        var route = ($location.path().indexOf("home") == -1) ? $location.path().split("/")[1] : "profit";
        headerService.prepForBroadcastHeaderChange(route.charAt(0).toUpperCase() + route.slice(1));
    });
}]);