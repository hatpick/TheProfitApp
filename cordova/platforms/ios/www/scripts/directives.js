'use strict';

var components = angular.module('DatAppProfit.directives', [])
var height = 0;
var width = 0;

components.directive('loadingPanel', function(){	
	return {		
		restrict: 'E',		
		templateUrl: 'views/partials/loadingPanel.html',
		link: function(scope, elem, attrs) {			
		}		
	};
}); 

components.directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, elem, attrs){
            $(elem).tooltip({
                template: '<div class="tooltip"><div class="tooltip-arrow tooltip-arrow-chad"></div><div class="tooltip-inner tooltip-inner-chad"></div></div>'
            });
        }
    }

});

components.directive('scrollListener', function(){
    return {
        restrict: 'A',
        link: function(scope, elem, attrs){
            var prevTop = 0;
            $(window).bind("scroll", function() {
                var curTop = $(this).scrollTop();
                var diff = curTop - prevTop;
                if(diff >= 10) {
                    $(".profit-add").addClass("invis");
                    prevTop = curTop;
                } else if(diff <= -10){
                    $(".profit-add").removeClass("invis");
                    prevTop = curTop;
                }
            });
        }
    }
});

components.directive('setActive', function(){
    return {
        restrict: 'A',
        link: function(scope, elem, attrs){
            $(elem).click(function(){
                $(elem).addClass("active");
                var id = attrs.oid;
                scope._go('detail/' + id, true);
            })
        }
    }
});

components.directive('profitTabs', function($timeout, tabService){
        return {
                restrict: 'A',
                link: function(scope, elem, attrs){
                    $(".profit-color").css("background", "#bbb none");
                    $(elem).click(function(){
                        tabService.prepForBroadcastTabChange($(elem).index());
                    });
                }
        }

});

components.directive('slideTabs', function($swipe){
        return {
                restrict: 'A',
                link: function(scope, elem, attrs){
                    $swipe.bind(elem, {
                        'start': function(coords){

                        },
                        'move': function(coords){

                        },
                        'end': function(coords){

                        },
                        'cancel': function(coords){

                        }
                    })
                }
        }

});

components.directive('lazyLoad', function($timeout){
        return {
                restrict: 'A',
                link: function(scope, elem, attrs){
                    $timeout(function(){
                        $(elem).lazyload();
                    })
                }
        }

});

components.directive('datepicker', function(){
        return {
                restrict: 'A',
                link: function(scope, elem, attrs){
                    $(elem).datepicker();
                    $(elem).focus(function(event) {
                        $(this).datepicker('show');
                    });
                }
        }

});

components.directive('timeAgo', function($timeout){
        return {
                restrict: 'A',
                link: function(scope, elem, attrs){
                    $timeout(function(){
                        $(elem).timeago();
                    });
                }
        }

});

components.directive('groupClick', function($timeout){
        return {
                restrict: 'A',
                link: function(scope, elem, attrs){
                    $(".color-option").click(function(){
                        $(this).addClass("color-selected");
                        $(".color-option").not(this).removeClass("color-selected");
                    });
                }
        }

});

components.directive('fastClick', function($timeout){
        return {
                restrict: 'A',
                link: function(scope, elem, attrs){
                    if(scope.$parent.$last)
                        $timeout(function(){
                            FastClick.attach(document.body);
                        }, 100);
                }
        }

});

components.directive('logoutClick', function($timeout, $location, profitAppService){
        return {
                restrict: 'A',
                link: function(scope, elem, attrs){
                    $(elem).click(function(){
                        $.cookie("current", false, { expires: 14});
                        Parse.User.logOut();
                        $(".black-drop").removeClass('active');
                        $timeout(function(){
                            $location.path("/login");
                        });
                    })
                }
        }
});


components.directive('leftMenuClick', function($timeout){
        return {
                restrict: 'A',
                link: function(scope, elem, attrs){
                    $(elem).click(function(){
                        var status = $(this).attr("data-status");
                        if(status == "closed" || status == undefined) {
                            $("i.logo-icon").css("margin-left", "-23px");
                            $(this).attr("data-status", "opened");
                            $(".black-drop").addClass('active');
                            $(".left-menu").addClass("left-menu-active");
                        } else {
                            $(".logo-icon").css("margin-left", "-18px");
                            $(this).attr("data-status", "closed");
                            $(".left-menu").removeClass("left-menu-active");
                            $(".black-drop").removeClass('active');
                        }
                    });
                }
        }

});

components.directive('imagePreviewClick', function(){
        return {
                restrict: 'A',
                link: function(scope, elem, attrs){
                   
                    $(".thumbnail").click(function(){
                        $(".image-view").addClass("image-view-active");
                    });

                    $(".close-preview").click(function(){
                        $(".image-view").removeClass("image-view-active");
                    });  
                }
        }

});

var resizeHandler = function(elem){
    var topPadding = 0;
    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        topPadding = 20;
    }

    var height = $(window).height();
    var width = $(window).width();

    var bH = 18;
    var pad = 5;
    var c = 35;
    var c2 = 38;

    //var cH = height - bH * 2 - pad * 3 - topPadding - c;
    var cH = height - pad * 3 - topPadding;
    var url = window.location.hash;

    if(url.indexOf('list') > 0) {
        cH += bH * 2 + c2;
    }

    $(elem).css('padding-top', topPadding);
    $(elem).css('width', width - 10)
    $(elem).find('.top-view').css('height', cH);
}

components.directive('sizeViews', function(){
    return {
        restrict: 'A',
        link: function(scope, elem, attrs){
            resizeHandler(elem);
            // $(window).resize(function() {
            //     resizeHandler($(".view"));
            // });
        }
    }

});

components.directive('sizeIphone', function(){
    return {
        restrict: 'A',
        link: function(scope, elem, attrs){
            var topPadding = 0;
            if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                topPadding = 15;
            }
            $(elem).css('padding-top', topPadding);
            $(".profit-navbar").css('padding-top', topPadding);
            $(".left-menu").css('top', parseInt($(".left-menu").css('top'),10) + topPadding);
            $(".black-drop").css('top', parseInt($(".black-drop").css('top'),10) + topPadding);
            $(".profit-loading-logo").css("margin-top", $(window).height() * 0.6 + topPadding * 1.6);
        }
    }

});

components.directive('entryTypeToggle', function(){
        return {
                restrict: 'A',
                link: function(scope, elem, attrs){
                    $(elem).click(function(){
                        if($(elem).html() == 'expense'){
                           $(elem).html('income');    
                        }
                        else{
                           $(elem).html('expense');      
                        }
                    });
                        
                }
        }
});
function normalizePhone(phone) {
    phone = phone.replace(/[^\d]/g, "");
    if (phone.length == 10) {
        return {valid: true, phone: phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")};
    } else if(phone.length == 11) {
        return {valid: true, phone: phone.substring(1, 11).replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")};
    }

    return {valid: false, phone: ""};
}

components.directive('homeItem', function($timeout) {
        return {
                restrict: 'E',
                scope:{
                        name: '@',
                        amount: '@'                       
                },
                templateUrl: 'views/partials/homeItem.html',
                link: function(scope, elem, attrs) {
                    //$(".left-menu").css({"left": 0 - $(window).width(), "display": "inline-block"});
                    //$(".years-bg").hide();
                    $timeout(function(){
                        $(".nav-title").click(function(){
                            
                            $(".years-menu").removeClass().addClass("years-menu years-menu-active");
                            
                        });

                         $(".year-menu-controls").click(function(){
                            $(".years-menu-active").removeClass().addClass("years-menu");
                        });

                        //home view swipe
                        /*$(elem).swipe({
                            swipeRight: function(event, direction, distance, duration, fingerCount){
                                $(".left-menu").animate({ left:'0px'}, 300, 'easeOutQuart');
                            },
                            threshold: 50
                        });

                       

                        $.each([$(".left-menu-bg"), $(".left-menu")], function(i, e){
                            e.swipe({
                                swipeLeft: function(event, direction, distance, duration, fingerCount){
                                    var w = $(window).width();
                                    $(".left-menu").animate({ left:'-' + w + 'px'}, 300, 'easeOutQuart');
                                },
                                threshold: 50
                            });
                        });

                        $(".years-bg").swipe({
                            swipeUp: function(event, direction, distance, duration, fingerCount){
                                $(".years-menu").animate({ top:'-510px'}, 300, 'easeInQuart');
                                $(".years-bg").fadeOut(280);
                            },
                            threshold: 50
                        });*/
                    });
                }
        }
});

components.directive('tagItem', function($timeout) {
        return {
                restrict: 'E',
                scope:{
                        name: '@',
                        amount: '@',
                        color: '@',
                        click: '&',
                        count: '@',
                        type: '@'
                },
                templateUrl: 'views/partials/tagItem.html',
                link: function(scope, elem, attrs) {

                }
        }
});
components.directive('calcItem', function($timeout) {
        return {
                restrict: 'E',
                scope:{
                        name: '@',
                        amount: '@',
                        color: '@',
                        click: '&'
                },
                templateUrl: 'views/partials/calcItem.html',
                link: function(scope, elem, attrs) {

                }
        }
});
components.directive('listItem', function($timeout) {
        return {
                restrict: 'E',
                scope:{
                        name: '@',
                        value: '@',
                        tag: '@',
                        notes: '@',
                        date: '@',
                        attachment: '@',
                        id: '@',
                        color: '@',
                        group: '@',
                        click: '&',
                        edit: '&',
                        remove: '&'
                },
                templateUrl: 'views/partials/listItem.html',
                link: function(scope, elem, attrs) {

                }
        }
});

components.directive('detailPart', function($timeout) {
        return {
                restrict: 'E',
                scope:{
                        name: '@',
                        value: '@',
                        group: '@',
                        notes: '@',
                        date: '@',
                        id: '@',
                        attachment: '@'
                },
                templateUrl: 'views/partials/detailPart.html',
                link: function(scope, elem, attrs) {

                }
        }
});

