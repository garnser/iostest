
var WPApp = (function(){
		
	return  {
		setAuthToken: function(token){
			if (token && token != "") {
				window.localStorage.token = token;
				var d = new Date(),
						exp = new Date(d.getTime() + 10 * 365 * 24 * 60 * 60 * 1000);
						
				document.cookie = "hybrid_auth_token="+token+";path=/;expires=" + exp.toUTCString() + ';';
			};
		},
		getAuthToken: function(){
            return "DEMO";
			token = window.localStorage.token;
			if(!token || token == ''){
				token = false;
				var cookie = document.cookie.match(/(^|; )hybrid_auth_token=([^;]+)/);
				if (cookie) {
					token = cookie[2];
					window.localStorage.token = token;
				};
			}
			return token;
		},
		pullToRefresh: function(){
			this.onPullToRefresh(function(){
				WPApp.refreshComplete();
			});
		},
		onPullToRefresh: function(callback){
			alert('PTR needs to be implemented');
			throw("onPullToRefresh requested but not implemented");
		},
		refreshComplete: function(){
			WPApp.callNative([
				{ method:'pullToRefreshComplete', args:[] }
			])
		},
		isIOS:function(){
			return (/wp-iphone/i).test(window.navigator.userAgent);
		},
		isAndroid:function(){
			return (/wp-android-native/i).test(window.navigator.userAgent);
		},
		isBlackBerry:function(){
			return (/wp-blackberry/i).test(window.navigator.userAgent);
		},
		callNative: function(methods){
			if (WPApp.isIOS() && WPApp.getAuthToken() && WPApp.isEnabled()) {
				var payload = JSON.stringify(methods);
				location.href = "wpios://batch?payload=" + encodeURIComponent(payload) + "&wpcom-hybrid-auth-token=" + this.authToken();
			} else if( WPApp.isAndroid() ) {
				for (var i=0; i < methods.length; i++) {
					if( Android[methods[i].method] ) 
						Android[methods[i].method].apply(Android, methods[i].args);
				};
			} else if( WPApp.isBlackBerry() && WPApp.auth_token && WPApp.auth_token != "") {
				var payload = JSON.stringify(methods);
				BlackBerry.callNative(payload + "&wpcom-hybrid-auth-token=" + this.authToken());
			} else if( WPApp.client ) {
				for (var i=0; i < methods.length; i++) {
					if( WPApp.client[methods[i].method] )
						WPApp.client[methods[i].method].apply(WPApp.client, methods[i].args)
				};
			}
		},
		authToken: function(){
             return "DEMO";
			if (this.getAuthToken()) {
				return this.getAuthToken();
			};
			var query = window.location.search;
			var pairs = query.substring(1).split("&");
			for (var i=0; i < pairs.length; i++) {
				var param = pairs[i].split("=");
				if (param[0] == 'wpcom-hybrid-auth-token') {
					this.auth_token = param[1];
					return this.auth_token;
				};
			};
			return "";
		},
		isEnabled:function(){
			return this.disable !== true;
		},
		disableNative:function(){
			this.disable = true;
		}
	};
	
	return app;
	
})();


