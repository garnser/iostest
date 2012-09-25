jQuery(document).ready( function() {
	// try{
		Reader2.init( );
		WPApp.onPullToRefresh = function(callback){
			Reader2.refresh(function(){
				callback();
			});
		}
		
		setTimeout(function(){
			WPApp.callNative([
				{ method:'enablePullToRefresh', args:[] },
				{ method:'enableFastScrolling', args:[] },
				{ method:'setBackgroundColor', args:[{red:0.92,green:0.92,blue:0.92,alpha:1.0}]},
				{ method:'setTitle', args:[_t('Read')]},
				{ method:'setSelectedTopic', args:[Reader2.filter]}
			]);
		}, 1);
		
		var topic_menu = jq('#reader-sources');
		if (topic_menu.length == 0 ) {
			return;
		};
		var header = jq('#reader-list-header');
		var topic = jq('#reader-sources a[href$="#' + Reader2.filter + '"]');
			
		if ( !topic.is('a') ) {
			topic = jq('#reader-sources a[href$="#following"]');
		};
			
			
		var selected = topic;
			
		header.find('span').text(topic.text());
						
		var menuHeight = topic_menu.height();
		var menuIsOpen = false;
			
		var openMenu = function(){
			menuIsOpen = true;
			topic_menu.css({
				height:menuHeight
			});
			return false;
		}
			
		var closeMenu = function(){
			menuIsOpen = false;
			menuHeight = topic_menu.height();
			topic_menu.css({
				height:0
			});
			return false;
		}
			
		var selectTopic = function(topic){
			selected.removeClass('selected');
			selected = topic.addClass('selected');
			header.find('span').text(selected.text());
			Reader2.load_topic(topic.attr('href').substring(1));
		}
					
		if (selected.length > 0) {
			selectTopic(selected);
		};
						
		header.click(function(e){
			if (menuIsOpen) {
				closeMenu();
			} else {
				openMenu();
			}
			return false;
		});
			
		closeMenu();
					
		topic_menu.find('a').click(function(e){
			selectTopic(jq(this));
			closeMenu();
			return false;
		})
				
		WPApp.client = {
			selectTopic: function(id, label){
				selectTopic(topic_menu.find('a[href$="#' + id + '"]'));
			},
			setTitle: function(title){
				header.find('span').text(title);
			}
		}
		
	// } catch(e) {
	// 	// oh no
	// 	throw(e);
	// }
} );


var AppCache = (function($){
	if (window.applicationCache) {
		var appCache = window.applicationCache,
				indicator = $('<div></div>').css({
					'position':'fixed',
					'right':'5px',
					'bottom':'5px',
					'padding':'5px 8px',
					'background':'-webkit-linear-gradient(#222,#000)',
					'border-radius':'1px',
					'color':'#CCC',
					'font-size':'13px',
					'font-weight':'bold',
					'text-shadow':'0 -1px 0 #000',
					'box-shadow':'0 0 4px #000',
					'-webkit-transition':'opaticy -webkit-transform 200ms',
					'-webkit-transform':'translate(0, 40px)',
					'opacity':'0.75'
				});
				
		if(!$.support.touch || ($.support.touch && $.support.touchOverflow)){
			appCache.addEventListener('noupdate', function(){
				setTimeout(function(){
					appCache.update();
				}, 30 * 1000);
			}, true);
			appCache.addEventListener('progress', function(e){
				try {
					if (!indicator.parent().is('body')) {
						indicator.appendTo(document.body)
						setTimeout(function(){
							indicator.css({'-webkit-transform':'translate(0,0)'});
						});
					};
					indicator.text("Updating: " + (Math.round(e.loaded/e.total * 100)) + "%");
				} catch(e) {
				}
			}, false);
			appCache.addEventListener('updateready', function(e){
				indicator
					.text("Update Ready")
					.css({
						cursor:'pointer',
						'-webkit-touch-highlight':'rgba(0,0,0,0)',
						'opacity':'1'
					})
					.append($('<a></a>').text('Reload').css({
						'display':'inline-block',
						'border-radius':'1px',
						'margin':'-3px -6px -3px 6px',
						'padding':'3px',
						'box-shadow':'0 -1px 0 #000',
						'vertical-align':'baseline',
						'line-height':'1',
						'color':'#FFF',
						'text-shadow':'0 -1px hsla(0,0%,0%,0.4)',
						'background':"-webkit-linear-gradient(rgb(30, 140, 190),rgb(0, 116, 162))"
					}));
				appCache.swapCache();
				indicator.one('click', function(){
					window.location.reload();
				})
			}, false);
					
		} else {
			appCache.addEventListener('updateready', function(){
				appCache.swapCache();
				window.location.reload();
			});
		}
	
	};
	
	return window.applicationCache;
		
})(jQuery);
	
