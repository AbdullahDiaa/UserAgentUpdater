var cm = require("context-menu");
var prefs = require("preferences-service");
var tabs = require("tabs");
//reset to Default User-Agent by clearing general.useragent.override pref
prefs.reset("general.useragent.override");

// Symbian devices UA
var nokia = cm.Menu({
  label: "Nokia",
  items: [
    cm.Item({ label: "S60 3rd Edition", data: "User-Agent: Mozilla/5.0 (SymbianOS/9.1; U; [en-us]) AppleWebKit/413 (KHTML, like Gecko) Safari/413" }),
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
		var notifications = require("notifications");
		notifications.notify({
		  title: "User Agent Updated",
		  text: data,
		});
		// refresh the page after changing UA
		var worker = tabs.activeTab.attach({
			contentScript: 'window.location.reload();',
		});
	},
	items: [
		cm.Item({ label: "Default", data: "default" }),
		nokia,
		internetExplorer,
		googleChrome ,
		opera,
		iOS ,
		Android,
		operamini
	]
});