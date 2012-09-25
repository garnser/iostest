/**
 * UA support tests
 */

(function( $, undefined ) {

var fakeBody = $( "<body>" ).prependTo( "html" ),
fbCSS = fakeBody[ 0 ].style,
vendors = [ "Webkit", "Moz", "O" ],
webos = !! "palmGetResource" in window, //only used to rule out scrollTop
bb = !! window.blackberry; //only used to rule out box shadow, as it's filled opaque on BB

// thx Modernizr
function propExists( prop ) {
	var uc_prop = prop.charAt( 0 ).toUpperCase() + prop.substr( 1 ),
		props = ( prop + " " + vendors.join( uc_prop + " " ) + uc_prop ).split( " " );

	for ( var v in props ){
		if ( fbCSS[ props[ v ] ] !== undefined ) {
			return true;
		}
	}
}

var isMobile = false;
var isIphone = false;
var isAndroid = false;
var isAndroidSmartphone = false;
var isAndroidTablet = false;
var isIphoneApp = false;
var isAndroidApp = false;
var isBlackBerryApp = false;
var isWindowsPhone7 = false;
var isBlackBerry = false;
var blackberryOSVersion = false;
var isOperaMini = false;
var isOperaMobile = false;

var useragent = navigator.userAgent.toLowerCase();
if( useragent.indexOf('opera') != -1 && useragent.indexOf('mini') != -1 ) { //this must be the 1th check
	isMobile = true;
	isOperaMini = true;	
} 
else if( useragent.indexOf('opera') != -1 && useragent.indexOf('mobi') != -1 ) { //this must be the 2nd check
	isMobile = true;
	isOperaMobile = true;	
}
else if ( ( useragent.indexOf('iphone') != -1 || useragent.indexOf('ipod') != -1 ) ) {
	isMobile = true;
	if ( useragent.indexOf('wp-iphone') == -1 ) 
		isIphone = true; //iphone,ipod browser
	else
		isIphoneApp = true; //iOS app
} else if( useragent.indexOf('android') != -1 ) {
	isMobile = true;
	if ( useragent.indexOf('wp-android-native') == -1) {
		//android browser, not the Android app
		isAndroid = true;
		if ( useragent.indexOf('mobile') != -1 ) {
			isAndroidSmartphone = true;
			isAndroidTablet = false;
		} else {
			isAndroidSmartphone = false;
			isAndroidTablet = true;		
		}
	} else {
		//android app
		isAndroidApp = true;
		isAndroid = false;
		isAndroidSmartphone = false;
		isAndroidTablet = false;		
	}
} else if( useragent.indexOf('windows phone os 7') != -1 ) {
	isMobile = true;
	isWindowsPhone7 = true;	
} else if( useragent.indexOf('wp-blackberry') != -1 ) {
	isMobile = true;
	isBlackBerryApp = true;
} else if( useragent.indexOf('blackberry') != -1 ) {
	isMobile = true;
	isBlackBerry = true;	
	
	var rv = -1; // Return value assumes failure.
	if ( useragent.indexOf('webkit') != -1 ) { //detecting the BB OS version for devices running OS 6.0 or higher
		var re  = new RegExp(/Version\/([\d\.]+)/i);
	} else {
		//blackberry devices <= 5.XX
		//BlackBerry9000/5.0.0.93 Profile/MIDP-2.0 Configuration/CLDC-1.1 VendorID/179
		var re  = new RegExp(/BlackBerry\w+\/([\d\.]+)/i);
	}
	if (re.exec(useragent) != null)
		rv =  RegExp.$1.toString() ;
	
	if( rv != -1 )
		blackberryOSVersion = rv;
}

$.extend( $.support, {
	orientation: "orientation" in window && "onorientationchange" in window,
	touch: "ontouchend" in document,
	cssTransitions: "WebKitTransitionEvent" in window,
	pushState: "pushState" in history && "replaceState" in history,
	cssPseudoElement: !!propExists( "content" ),
	touchOverflow: !!propExists( "overflowScrolling" ),
	boxShadow: !!propExists( "boxShadow" ) && !bb,
	networkStatus: (window.onoffline !== undefined && window.ononline !== undefined) && "onLine" in window.navigator,
	scrollTop: ( "pageXOffset" in window || "scrollTop" in document.documentElement || "scrollTop" in fakeBody[ 0 ] ) && !webos
});

$.extend( $.browser, {
	isMobile : isMobile,
	isIphone : isIphone,
	isAndroid : isAndroid,
	isAndroidSmartphone : isAndroidSmartphone,
	isAndroidTablet : isAndroidTablet,
	isIphoneApp : isIphoneApp,
	isAndroidApp : isAndroidApp,
	isWindowsPhone7 : isWindowsPhone7,
	isBlackBerry : isBlackBerry,
	isBlackBerryApp : isBlackBerryApp,
	blackberryOSVersion : blackberryOSVersion,
	isOperaMini : isOperaMini,
	isOperaMobile : isOperaMobile
});

fakeBody.remove();

})( jQuery );