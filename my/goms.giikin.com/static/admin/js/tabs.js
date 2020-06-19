// JavaScript Document
var Tabs = function(){
	var tabs = new Array();
	var panels = new Array();
	var target, tabNav, tabContent, activeTab;
	var opts = {};
	return {
		init: function(tabObject, options){
			target = tabObject;
			tabNav = target.find(".nav-tabs");
			tabContent = target.find(".tab-content");
			var navHome = $("#tab_navHome");
			navHome.data["panel"] = $("#tabHome");
			tabs.push(navHome);
			panels.push($("#tabHome"));
			opts = options || opts;
			activeTab = navHome;
			navHome.click(function(e){
				if(!$(this).hasClass("active")){		
					if(opts.onChange){
						opts.onChange($(this), activeTab);
					}
					activeTab = $(this);
				}
			});
		},
		getActive: function(){
			return activeTab;
		},
		add: function(id, title, url){
			for(var i=0;i < tabs.length; i++){
				panels[i].removeClass("active");
				tabs[i].removeClass("active");	
			}
			
			for(var i=0;i < tabs.length; i++){								
				if(tabs[i].attr("id")=='tab_' + id){
					panels[i].addClass("active");
					tabs[i].addClass("active");
					
					if(opts.onChange){
						opts.onChange(tabs[i], activeTab);
					}
					activeTab = tabs[i];
					return activeTab;
				}
			}
			
			var li = $('<li class="active" id="tab_' + id + '"></li>"');
			li.append('<a href="#tab_panel_' + id +'" data-toggle="tab">' + title + '</a>');
			var eClose = $('<span class="close-tab">×</span>');
			li.append(eClose);
			
			li.click(function(e){
				if(!$(this).hasClass("active")){		
					if(opts.onChange){
						opts.onChange($(this), activeTab);
					}
					activeTab = $(this);
				}
			});
			
			tabs.push(li);
			target.find(".nav-tabs").append(li);
			var iframeId = "tab_iframe_" + id;
			var panel = $('<div class="tab-pane active tab-iframe" id="tab_panel_' + id + '"></div>');
			var iframe = $('<iframe id="' + iframeId + '" src="' + url 
			           + '" frameborder="0" height="800px" width="100%"></iframe>');
			panel.append(iframe);
			panels.push(panel); 
			tabContent.append(panel);

			li.attr("iframe", iframeId);
			
			activeTab = li;
			
			eClose.click(function(e){
				var tab = $(this).parent();
				
				for(var i=0;i < tabs.length; i++){								
					if(tabs[i].attr("id")==tab.attr("id")){
						if(tab.hasClass("active")){
							panels[i].removeClass("active");
							tabs[i].removeClass("active");
							panels[i-1].addClass("active");
							tabs[i-1].addClass("active");
							if(opts.onChange){
								opts.onChange(tabs[i-1], tabs[i]);
							}
							activeTab = tabs[i-1];
						}
						var t = tabs[i];
						var p = panels[i];
						panels.splice(i, 1);
						tabs.splice(i, 1);
						t.remove();
						p.remove();
						break;
					}					
				}	
				return false;
			});
			
			return li;
		}
	};
}();


var currTab;

function addTab(id, title, url){
	if(title.length>5){
		title = title.substring(0,5) + "...";
	}
	currTab = Tabs.add(id, title, url);
}

$(document).ready(function() {  
   Tabs.init($("#page-tab"),{"onChange":function(newTab, oldTab){
	   currTab = newTab;
	   var iframe = currTab.attr("iframe");
   }});
   
   $(".nav-item .nav-link").click(function(e) {
	   	if($(this).hasClass("nav-toggle")) return;
	   	var title = $(this).find(".title").text();
       	addTab(title, title, $(this).attr("href"));
       	
       	var tt1 = $(".page-content").height()-60;
       	var iframe = $(".tab-pane iframe:first-child");
		if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)) { //判断是苹果设备还是其他设备 
		 	iframe.attr("scrolling", "no"); //评估设置设置为no
		 	iframe.css({
		 		"height": "100%",
		 		"min-height": tt1,
		 		"min-width": "100%",
		 		"*width": "100%",
		 		"width": "1px",
		 		"-webkit-overflow-scrolling": "touch;",
		 		"overflow":"auto"
		 	});
		} else {
		 	iframe.attr("scrolling", "yes") //安卓设备设置为yes
		 	iframe.css({
		 		"height": tt1,
		 		"width": "100%"
		 	});
		}
	   	return false;
   });
});