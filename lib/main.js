var cm = require("context-menu");
var prefs = require("preferences-service");
var tabs = require("tabs");
var notifications = require("notifications");
var panels = require("panel");

//reset to Default User-Agent by clearing general.useragent.override pref
prefs.reset("general.useragent.override");
const data = require("self").data;

// update UserAgent string panel
var uaPanel = panels.Panel({
  	contentURL: data.url("update.html"),
  	contentScriptFile: [data.url('js/jquery.min.js'),
						data.url('js/ua.js')],
    contentScriptWhen: 'end',
	onShow : function(){
    	this.postMessage('focus');
	},
	onMessage: function(data) {
		if(data != 'focus'){
			if(data != null && data != ''){
					if(data == "default"){
						// ( if message == default ) then reset the UA
						prefs.reset("general.useragent.override");
					}else if (data.match(/^ios/gi)){
						// ( if message match ios) then set UA to iOS useragent
						// iOS user Agent "iphone 4.0"
						var iOSUA = "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_0 like Mac OS X; en-us) AppleWebKit/532.9 (KHTML, like Gecko) Version/4.0.5 Mobile/8A293 Safari/6531.22.7";
						prefs.set("general.useragent.override",iOSUA);
						// setting data to iOS UA to appear in notifications
						data = iOSUA;
					}else if (data.match(/^android/gi)){
						// ( if message match android) then set UA to android useragent
						// Android UserAgent "android 2.2"
						androidUA = "Mozilla/5.0 (Linux; U; Android 2.2; en-us; Nexus One Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1";
						prefs.set("general.useragent.override",androidUA);
						// setting data to Android UA to appear in notifications
						data = androidUA;
					}else{
						// ( if message == UA ) then set the new UA
						prefs.set("general.useragent.override",data);
					}
					// hide the UApanel
					this.hide();
					// reload the active tab "addons SDK 1.2.1"
					tabs.activeTab.reload();
					// notification with the User Agent update
					notifications.notify({
					  title: "User Agent Updated",
					  text: data,
					});
			}	
		}	
	},
	width:340,
	height:39
});

// Define keyboard shortcuts for showing and hiding a custom panel.
const { Hotkey } = require("hotkeys");
//Shift + u to show/hide inputbox to update userAgent
var showHotKey = Hotkey({
  combo: "shift-u",
  onPress: function() {
	if(uaPanel.isShowing){
		uaPanel.hide();
	}else{
		uaPanel.show();
	}
  }
});

// Symbian devices UA
var nokia = cm.Menu({
  label: "Nokia",
  items: [
    cm.Item({ label: "S60 3rd Edition", data: "Mozilla/5.0 (SymbianOS/9.1; U; [en-us]) AppleWebKit/413 (KHTML, like Gecko) Safari/413" }),
	cm.Item({ label: "S60 3rd Edition Feature Pack 1", data: "Mozilla/5.0 (SymbianOS/9.2; U; Series60/3.1 NokiaXxx/1.0; Profile/MIDP-2.0 Configuration/CLDC-1.1) AppleWebKit/413 (KHTML, like Gecko) Safari/413" }),
	cm.Item({ label: "S60 3rd Edition Feature Pack 2", data: "Mozilla/5.0 (SymbianOS/9.3; U; Series60/3.2 NokiaE75-1/110.48.125 Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/413 (KHTML, like Gecko) Safari/413" }),
	cm.Item({ label: "S60 5th Edition", data: "Mozilla/5.0 (SymbianOS/9.4; U; Series60/5.0 Nokia5800d-1/21.0.025; Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/413 (KHTML, like Gecko) Safari/413" }),
	cm.Item({ label: "Symbian^3", data: "Mozilla/5.0 (Symbian/3; Series60/5.2 NokiaN8-00/013.016; Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/525 (KHTML, like Gecko) Version/3.0 BrowserNG/7.2.8.10 3gpp-gba" }),
	cm.Item({ label: "Symbian S40", data: "Mozilla/5.0 (Series40; NokiaX3-02/le6.32; Profile/MIDP-2.1 Configuration/CLDC-1.1) Gecko/20100401 S40OviBrowser/1.0.0.11.8" })
]
});

// Internet Explorer UA
var internetExplorer = cm.Menu({
  label: "Internet Explorer",
  items: [
    cm.Item({ label: "IE6", data: "Mozilla/4.0 (compatible; MSIE 6.1; Windows XP; .NET CLR 1.1.4322; .NET CLR 2.0.50727)" }),
	cm.Item({ label: "IE7", data: "Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)" }),
	cm.Item({ label: "IE8", data: "Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET CLR 1.0.3705; .NET CLR 1.1.4322)" }),
	cm.Item({ label: "IE9", data: "Mozilla/5.0 (Windows; U; MSIE 9.0; WIndows NT 9.0; en-US))" }),
	cm.Item({ label: "IE10", data: "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)" }),
]
});

// Google Chrome 15 UA
var googleChrome = cm.Item({ label: "Google Chrome", data: "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.872.0 Safari/535.2" });

// safari 5.0.5 UA
var safari = cm.Item({ label: "Safari 5", data: "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1" });

// Opera 12.0 UA
var opera = cm.Item({ label: "Opera", data: "Opera/9.80 (Windows NT 6.1; U; es-ES) Presto/2.9.181 Version/12.00" });

// Opera mini 9.80 UA
var operamini = cm.Item({ label: "Opera mini", data: "Opera/9.80 (J2ME/MIDP; Opera Mini/9.80 (S60; SymbOS; Opera Mobi/23.348; U; en) Presto/2.5.25 Version/10.54" });

//iOS / iphone 4 UA
var iOS = cm.Item({ label: "iOS", data: "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_0 like Mac OS X; en-us) AppleWebKit/532.9 (KHTML, like Gecko) Version/4.0.5 Mobile/8A293 Safari/6531.22.7" });

//Android [Nexus] UA
var Android = cm.Item({ label: "Android", data: "Mozilla/5.0 (Linux; U; Android 2.2; en-us; Nexus One Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1" });

//creating the user Agent Menu item
cm.Menu({
	label: "UserAgent",
	contentScript: 'self.on("click", function (node, data) {' +
				   '	self.postMessage(data);' +
				   '});',
	contentScriptWhen: "start",
	onMessage:function(data){
		if(data == "default"){
			// ( if message == default ) then reset the UA
			prefs.reset("general.useragent.override");
		}else{
			// ( if message == UA ) then set the new UA
			prefs.set("general.useragent.override",data);
		}
		// notification with the User Agent update
		notifications.notify({
		  title: "User Agent Updated",
		  text: data,
		});
		// reload the active tab "addons SDK 1.2.1"		
		tabs.activeTab.reload();
	},
	items: [
		cm.Item({ label: "Default", data: "default" }),
		nokia,
		internetExplorer,
		googleChrome ,
		safari,
		opera,
		iOS ,
		Android,
		operamini
	]
});
