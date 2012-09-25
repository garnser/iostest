var FriendFinder = (function($){
	
	var friend_finder = {};
	friends = {};
	
	$(document).ready(function(){
		var preventTouch = false;
		
		$('#sources li')
			.on('touchstart', function(e){
				preventTouch = false;
			})
			.on('touchmove', function(){
				preventTouch = true;
			})
			.on('touchend', function(e){
				if (preventTouch){
					return;
				}
				e.preventDefault();
				$(this).addClass('searching');
				friend_finder.authorize($(this).attr('id'));
			});
		
		setTimeout(function(){
			WPApp.callNative([
				{method:'setTitle', args:[ 'Friend Finder' ]},
				{method:'setBackgroundColor', args:[{red:0.92, green:0.92, blue:0.92, alpha:1}] },
				{method:'enableFastScrolling', args:[]},
				{ method:'configureFriendFinder',
					args:[
						{ sources:['address-book','facebook','twitter'] }
					]
				}
			]);
		});
		$('#facebook, #twitter, #address-book').hide();
		
		
	});
	
	friend_finder.authorize = function(source){
		// Allow native apps to provide an interface for authorizing a source
		WPApp.callNative([
			{method:'authorizeSource', args:[source]}
		]);
		
	}
	
	friend_finder.search = function(params, type, callback, error){

		$.ajax({
			url: '/wp-admin/admin-ajax.php?action=wpcom_mobile_friend_finder_search&t=' + (new Date).getTime(),
			type: 'POST',
			data: params,
			error: function(){
				error();
			},
			success: function(data){
				var $ul = $('#friends > ul'),
						stats = {total:data.length, following:0, added:0 },
						existing_li = $ul.find('li:first');
				
				if( !$ul.is('ul') ){
					$ul = $('<ul></ul>').appendTo( $('#friends') );
				}
				
				$.each(data, function(i, blog){
					var id = "blog-" + blog.id,
							$li = $('#' + id);
							
							if (blog.subscribed){
								stats.following += 1;
								return;
							}
						
					if( !$li.is('li') ){
						$li = $('<li></li>').attr('id', id).addClass('friend').hide().css({opacity:0});
						if (existing_li.is('li')) {
							existing_li.before($li);
						} else {
							$ul.append($li);
						}
						$('<img>')
							.attr('alt', blog.title )
							.attr('src', blog.gravatar[0])
							.appendTo($li)
						$li.append("<ul class=\"services\"><li class='email'>E</li><li class='twitter'>T</li><li class='facebook'>F</li></ul>");
							
						$('<a href="#"></a>')
							.addClass('subscribe')
							.appendTo($li);
							
						$('<h2></h2>').html(blog.author).appendTo($li);
						$('<h3></h3>').html(blog.title).appendTo($li);
						$('<p></p>').html(blog.url).appendTo($li);
						
						$li
							.on('touchend', function(e){
								e.preventDefault();
								if ($(e.target).is('.subscribe')) {
									var subscribed = $(this).hasClass('subscribed'),
											subscribe_url = "/sites/" + blog.id + "/follows/new",
											unsubscribe_url = "/sites/" + blog.id + "/follows/mine/delete";
											
									$li.toggleClass('subscribed');
									
									$.wpcom_proxy_request(subscribed ? unsubscribe_url : subscribe_url, { method: "POST"}, function(body){
										if (!body || (body && !body.success)) {
											$li.toggleClass('subscribed');
										};
									});
									if(!subscribed){
										$.ajax( '?template=stats&stats_name=friend_finder_follow&service='+type+'&t='+(new Date).getTime() );
									}
								};
								return false;
							})
							.on('click', function(e){
								e.preventDefault();
								return false;
							});
							
						$li.show().css({opacity:1});
					}
					
					if(type){
						if(!$li.hasClass(type)){
							stats.added += 1;
							$li.addClass(type);	
						}
					}
						
				});
				
				callback(stats, data);
			}
		})
	}
	
	friend_finder.findByEmail = function(addresses){
		// intialize let's find all our friends
		if (!addresses) {
			$('#address-book').removeClass('searching');
			return;
		};
		$('#address-book').find('small').text('Searching ' + addresses.length + ' address' + (addresses.length == 1 ? '' : 'es'));
		this.search({emails:addresses}, 'email', function(stats, blogs){
			// done searching
			$('#address-book')
				.removeClass('searching').addClass('searched').removeClass('error')
				.find('small').text('Following ' + stats.following + " of " + stats.total + ' blog' + (stats.total == 1 ? '' : 's'));
		}, function(){
			$('#address-book')
				.removeClass('searching').addClass('searched').addClass('error')
				.find('small').text('Error searching friends');
		});
	}
	
	var twitter_stats = {
		accounts: {},
		stats: function(){
			var stats = [];
			for( account in this.accounts ){
				stats.push(this.accounts[account]);
			}
			return stats;
		},
		total: function(){
			return this.stats().reduce(function(total, stat){
				return total + stat.total
			}, 0);
		},
		following: function(){
			return this.stats().reduce(function(total, stat){
				return total + stat.following;
			}, 0);
		},
		ids: function(){
			return this.stats().reduce(function(total, stat){
				return total + stat.ids ? stat.ids.length : 0;
			}, 0);
		},
		searching: function(){
			return this.stats().some(function(s){
				return s.searching === true;
			});
		}
	}
	friend_finder.findByTwitterID = function(twitter_ids, handle){
		handle = handle || 'anonymous';
		if (!twitter_ids) {
			$('#twitter').removeClass('searching');
			return;
		};
		twitter_stats.accounts[handle] = {searching:true, ids: twitter_ids.ids };
		var ids = twitter_stats.ids();
		$('#twitter').find('small').text('Searching ' + ids + ' friend' + (ids == 1 ? '' : 's'));
		
		this.search({twitter_ids:twitter_ids.ids}, 'twitter', function(stats, blogs){
			// done searching
			stats.ids = twitter_ids.ids;
			twitter_stats.accounts[handle] = stats;
			twitter_stats.accounts[handle].searching = false;
			if (!twitter_stats.searching()) {
				$('#twitter')
					.removeClass('searching').addClass('searched').removeClass('error')
					.find('small').text('Following ' + twitter_stats.following() + " of " + twitter_stats.total() + ' blog' + (twitter_stats.total() == 1 ? '' : 's'));
			};
		}, function(){
			$('#twitter')
				.removeClass('searching').removeClass('searched').addClass('error')
				.find('small').text('Error searching friends');
		});
	}
	
	friend_finder.findByFacebookID = function(facebook_ids){
		// an array of id/name key/value pairs
		if(!facebook_ids){
			$('#facebook').removeClass('searching');
			return;
		}
		$('#facebook').find('small').text('Searching ' + facebook_ids.length + ' friend' + (facebook_ids.length == 1 ? '' : 's'));
		
		this.search({facebook_ids:facebook_ids.map(function(friend){
			return friend.id;
		})}, 'facebook', function(stats, blogs){
			$('#facebook')
				.removeClass('searching').addClass('searched').removeClass('error')
				.find('small').text('Following ' + stats.following + " of " + stats.total + ' blog' + (stats.total == 1 ? '' : 's'));
		}, function(){
			$('#facebook')
				.removeClass('searching').removeClass('searched').addClass('error')
				.find('small').text('Error searching friends');
		})
	}
	
	friend_finder.enableSources = function(sources){
		var ids = $.map(sources, function(source, index){
					return "#" + source;
				}).join(', '),
				enabled = $('#sources').find(ids);
				
				$('#sources li').not(enabled).remove();
				enabled.show();
	};
	
	
	return friend_finder;
	
	
})(jQuery);

// for non-native clients

WPApp.client = new (function(){
	this.authorizeSource = function(source){
		// for now just load the authorization template
		throw("Web based OAuth not implemented for " + source);
	}
});

