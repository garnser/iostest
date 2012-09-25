
var jq = jQuery, $ = jQuery;
var Reader2 = {
  site: 'https://en.wordpress.com',
  per_page: 10,
  otherDataAvailable : true,
  page_data: false,
  filter: 'fp',
  request: false,
  in_subs_list:true,
  pageYOffset: 0,
  detail_all_comments_loaded: false,
  comments_on_load: false,
  loaded_items: [], //used by the iOS app only
  last_selected_item: {}, //used by the iOS app only
  list_item_template : "<div id='post-{{blog_id}}-{{post_id}}' class='subs-item'>" +
	"<article class='subs-item-main'>" +
	"<header>" +
	"<hgroup>" +
		"<div class='meta'>" +
			"<span class='info'>" +
				"<span class='comments'>{{comment_count}}</span>" +
				"<span class='reblogged_list_indicator'>Reblogged</span>" +
				"<span class='ago'>{{ago}}</span>" +
			"</span>" +
			"<h2 class='blog public'>" +
				"<i class='avatar' style='background:url({{author_avatar}}) no-repeat top left; width:16px; height:16px; -webkit-background-size:16px 16px; -moz-background-size:16px 16px;' alt='' />" +
				"<span class='blog-title'>{{{blog}}}</span>" +
			"</h2>" +
		"</div>" +
		"<h1 class='title'>{{{title}}}</h1>" +
	"</hgroup>" +
	"</header>" +
	"<div class='excerpt'>{{{excerpt}}}</div>" +
	"</article>" +
	"</div>",
	fp_list_item_template:
	'<div class="subs-item">' +
	'<div class="blogimage-wrap">' +
		'<i class="blogimage" style="background-image:url({{{fp_bg_image}}})" alt="{{{title}}}" />' +
	'</div>' +
	'<div class="subs-item-main fp">' +
		'<header>' +
			'<hgroup>' +
				'<div class="meta"><h2 class="blog">{{{blog}}}</h2></div>' +
				'<h1 class="title">{{{title}}}</h1>' +
			'</hgroup>' +
		'</header>' +
	'</div>' +
    '</div>',
	details_item_template : 
		"<header>"+
		"<hgroup>" +
			"<div class='meta'>" +
				"<span class='info'>" +
					"<span class='reblogged_details_indicator'>Reblogged</span>" +
					"<span class='ago'>{{ago}}</span>" +
				"</span>" +
				"<h2 class='post-author'>" +
					"<img id='author-avatar' class='author-avatar' alt='' height='16' width='16' />" +
					"<span class='author-name'>{{{author_name}}}</span>" +
				"</h2>" +
			"</div>" +
			"<h1 class='title'>{{{title}}}</h1>" +
		"</hgroup>" +
		"</header>" +
		"<div class='content'>{{{content}}}</div>" +
		"<ul id='actions' class='actions'>" +
			"<li id='action-like' class='action' ontouchstart='return true'><a data-i18n='Like' href=''>Like</a></li>" +
			"<li id='action-reblog' class='action' ontouchstart='return true'><a href=''>Reblog</a></li>" +
		"</ul>" +
		"<span class='clear'></span>",
		
  pingStatsEndpoint: function (stat_name) {
    return;
	  jq.get(Reader2.site + "/wp-admin/admin-ajax.php", {
		  'action': 'wpcom_load_mobile', 
		  'template': 'stats',
		  'stats_name' : stat_name,
		  'screen_width' : window.screen.availWidth
	  });
  },
	
	pingQuantcast: function(tag){
    return;
		wpcomQuantcastPixel('newdash.' + tag + ",mobile." + tag);
	},

  init: function( ) {
    this.per_page = ( jq.query.get('per_page') ) ? jq.query.get('per_page') : this.per_page;
    this.filter = ( jq.query.get('filter') ) ? jq.query.get('filter') : this.filter;

	if( ! (  jq.browser.isIphoneApp || jq.browser.isBlackBerryApp ) ) {
	} else {
  }
	
	if( jq.browser.isIphoneApp ) {
		//do nothing since the app ping the stats endpoint when the user tap the Reader btn.
  	} else {
		if(  Reader2.filter == 'fp' ) {
			Reader2.pingStatsEndpoint('freshly');
			Reader2.pingQuantcast('fresh');
		} else {
			Reader2.pingStatsEndpoint('home_page');
			Reader2.pingQuantcast('read');
		}
	}
	
	// Check for scrolling and fire this.load() when hitting then end of the page.
	this.lazy_queue = [];
	var touch_timeout;
	var lazy_loader = function(y){
		if(y == scrolling_node.scrollTop){
			this.loadVisibleImages();
		}
	};
	jq( 'body' ).attr( 'class', 'list' );   
	
	
		//load the page using ajax
		jq(document).scroll(this.onScroll);
		this.reset();
		
	},
	refresh: function(success, error){
		this.pingStatsEndpoint('home_page_refresh');
		this.load_more({
			untilItem: Reader2.loaded_items[0]
		}, function(){
			Reader2.cache(Reader2.filter, Reader2.loaded_items.slice(0,50));
			if (jq.isFunction(success)) { success.call(Reader2) };
		}, error);		

  },
	load_topic: function(topic, options, success, error){
		if (topic == 'recommended-blogs') {
			this.find_blogs();
			return;
		} else if( topic == 'fp' ){
			Reader2.pingQuantcast('fresh');
			Reader2.pingStatsEndpoint('freshly');
		} else {
			Reader2.log_user_actions('switched_topics');
		}
		this.filter = topic;
		this.reset();
	},
	load_more: function(options, success, error){
	  if ( ( typeof this.refresh_request == 'object') && (this.refresh_request !== null) ) {
		  return;
	  };
		
		this.refresh_request = jq.getJSON(Reader2.site + '/wp-admin/admin-ajax.php',
			{
			  'action' : 'wpcom_load_mobile',
			  'template' : 'subscriptions',
			  'v':2,
			  'per_page' : this.per_page,
			  'before' : (options.beforeItem ? options.beforeItem.ts : ''),
			  'filter' : this.filter,
			  'screen_width' : window.screen.availWidth
			},
			function(results){
			  var template = Reader2.filter != 'fp' ? 'list_item_template' : 'fp_list_item_template';
				var caught_up = false;
				var new_items = [];
				var page = jq('<div class="subs-page"></div>').css({
					webkitTransform:'translate3d(0,0,0)',
					mozTransform:'translate(0,0)',
					overflow:'hidden',
					webkitTransition:'height 0.5s'
				});
				var index = Reader2.loaded_items.indexOf(options.untilItem);
				for (var i=0; i < results.length; i++) {
					var item = results[i];
					if (item.guid == options.untilItem.guid) {
						caught_up = true;
						break;
					};
					item.position_in_the_main_list = index + i;
					item.filter_type = Reader2.filter;
					new_items.push(item);
					Reader2.prepare_item(item, page, template);
				};
				
				// splicing time!
				// first increment the position of the items that are after
				jq.each(Reader2.loaded_items.slice(Reader2.loaded_items.indexOf(options.untilItem)), function(){
					this.position_in_the_main_list += new_items.length;
				});
				Array.prototype.splice.apply(Reader2.loaded_items, [index, 0].concat(new_items));
				if (page.children().length > 0 && options.insertAfter) {
					options.insertAfter.after(page).css({height:'auto'});
				} else if (page.children().length > 0) {
					jq('#subscriptions').prepend(page);
				}

			  if(!caught_up){
				  // show a load more thingy like tweetbot?
				  var more = jq('<div class="load-missing-items">Load More</div>');
					more.one('click', function(){
						jq(this).html('<div class="indicator"><div class="pulse"></div></div>').css({height:'36px'});
						var last_item = new_items[new_items.length -1];
						Reader2.load_more({
							beforeItem: last_item,
							untilItem: options.untilItem,
							insertAfter: more
						}, function(){
							more.html("").css({height:''});
						});
					});
					page.after(more);
			  }
				
				
				Reader2.refresh_request = null;
				if(typeof(success) == 'function') success();
				WPApp.refreshComplete();
			}
		); // getJSON
	},
  
	reset: function(load){
		if (this.request && typeof(this.request.abort) == 'function' ){
			this.request.abort();
			this.request = null;
		}
		this.last_selected_item = {};
		this.loaded_items = [];
		this.otherDataAvailable = true; 
		if( jq.browser.isIphoneApp || jq.browser.isBlackBerryApp ){
			jq( '#filter_cookie_for_ios' ).attr( 'data', this.filter );
		}
		jq.cookie('wpcom-mobile-reader-filter', Reader2.filter, { expires: 365 });
		jq('.subs-page, .noblogs, .load-missing-items, #suggestions').remove();
		$('#subscriptions').html('')
		Reader2.show_loader();
		if (load === false) { return };
		this.load_from_cache(this.filter, function(){
			Reader2.render();
			Reader2.otherDataAvailable = true;
			Reader2.load(true, function(){
				Reader2.render();
				Reader2.otherDataAvailable = true;
			});
		});
				
	},
	load_from_cache: function(topic, callback){
		var cached = this.cache(topic);
		if (cached && cached.length > 0){
			this.loaded_items = cached;
			this.page_data = cached;
			this.otherDataAvailable = true;
			this.render();
			WPApp.callNative([{method:'showRefreshingState'}]);
			this.refresh(callback);
		} else {
			this.load(true, callback);
		}
	},
  load: function(show_loading_indicator, callback ) {
	  if ( ( typeof this.request == 'object' ) && ( this.request !== null ) ) {
		  return;
	  }
	  if( this.otherDataAvailable == false ) return;
		
	  jq('#loader2').show().find('.loader').show();
	  var requestData = null;
	  
	  this.request = jq.getJSON( 'fp.json',
		  function( result ) {
			Reader2.log_user_actions('loaded_next_page');	
			  Reader2.request = null;
			  Reader2.page_data = result;
				jq('#loading-more').remove();
				
				Reader2.cache(Reader2.filter, Reader2.loaded_items.slice(0,50));
				jq('#loader2').hide();
			
			  //Load kingmakers if there's no content at all. Otherwise, load the footer message.
			  if ( result.length < 1 && jq(".subs-page").length == 0 && Reader2.filter == 'following' ) {
					Reader2.find_blogs();
			  }		
			  else if ( result.length < 1 && !jq( '#subscriptions p' ).hasClass( 'noblogs' ) ) {
					var noblogs = $('<p class="noblogs">Nothing to read! Why not <a id="suggestions-link" href="#">follow some blogs</a> or have a look at <a class="load-tab" rel="fresh" href="http://wordpress.com/reader/mobile/freshly-pressed">Freshly Pressed</a>?</p>');
				  jq( '#subscriptions' )
						.append( noblogs )
						.on('click', '[rel=fresh]', function(e){
							e.preventDefault();
							noblogs.remove();
							WPApp.callNative([{method:'selectTopic', args:['fp']}]);
						})
						.on('click', '#suggestions-link', function(e){
							e.preventDefault();
							noblogs.remove();
							Reader2.find_blogs();
						})
			  } else {
				  var loaded_items_length = Reader2.loaded_items.length;
				  jq.each(result, function(i, val) {
					  val.position_in_the_main_list = loaded_items_length+i; //used by the iOS app within the detailView
					  val.filter_type = Reader2.filter; //used by the iOS app within the detailView
					  Reader2.loaded_items.push(val); //add the loaded items to the end of the items array
				  });
			  }
			  if ( typeof callback == 'function' ) callback.call( this );
		  })
		  //  .success(function() { console.log("second success"); })
		  .error(function() { jq( '#loading-more' ).remove(); jq('#loader2').hide();  Reader2.request = null; /*console.log("error");*/ });
		  WPApp.refreshComplete();
	},
	
	find_blogs: function(){
		//Recommended blogs
		WPApp.callNative([{method:'setTitle', args:['Recommended Blogs']}]);
		var template = 'reader/recommendations.php';
		$('#subscriptions').html('')
		Reader2.reset(false);
	  Reader2.show_loader();
		
		this.request = jq.get( Reader2.site + '/wp-admin/admin-ajax.php', { 
				'action': 'wpcom_load_template', 
				'template': template
			},
			function( result ) {
				jq('body').scrollTop(0);
			
				jq('#subscriptions').html(result);
				jq( '.kingmaker-suggested-cat input' ).hide();
				jq( '.kingmaker-suggested-cat' ).on( 'click', function(e) {
					e.preventDefault();
					jq( this ).toggleClass( 'selected' );
					var selected = jq( this ).hasClass( 'selected' );
					jq( this ).find( 'input' ).attr( 'checked', selected );
				});
	
				jq( '#suggestions' ).on( 'submit', function(e) {
					e.preventDefault();
					var selected_topics = jq("#suggestions input:checked").map(function(i,e) { return e.value; });
					if ( selected_topics.length == 0 ) {
					    selected_topics = [ "-1" ];
					}
					this.request = jq.get( Reader2.site + '/wp-admin/admin-ajax.php', { 
						'action': 'wpcom_load_template', 
						'template': template,
						'topics': jq.makeArray(selected_topics)
					}, function( result ) {
						jq('body').scrollTop(0);
						jq('#subscriptions').html(result + '<div id="selected-blogs-submit" class="kingmaker-suggested-submit"><input type="submit" id="kingmaker-button" value="Follow"></div>');
						
						jq( '.kingmaker-blog' ).on( 'click', function(e) {
							e.preventDefault();
							jq( this ).toggleClass( 'selected' );
						});

						jq( '#selected-blogs-submit' ).on( 'click', function(e) {
							e.preventDefault();
							var selected_blogs = jq( '.kingmaker-blog.selected' ).map( function(i,e) {
								return e.id.replace( 'kingmaker-', '' );
							});

							this.request = jq.get( Reader2.site + '/wp-admin/admin-ajax.php', { 
								'action': 'wpcom_load_template', 
								'template': template,
								'follow': jq.makeArray( selected_blogs )
							}, function( result ) {
								if( jq.browser.isIphoneApp || jq.browser.isBlackBerryApp ){
									jq( '#filter_cookie_for_ios' ).attr( 'data', 'following' );
								}
								jq.cookie('wpcom-mobile-reader-filter', 'following', { expires: 365 });
								Reader2.filter = "following";
								Reader2.show_loader();
								Reader2.reset();
							} );
						});
					});
				});
			});
	},
	show_loader: function(context){
		if(!context){
			context = $('#subscriptions');
		}
		loader = context.find('#loader2');
		if (loader.length == 0) {
			loader = $("<div id=\"loader2\">\
						<div id=\"throbber\">\
						<span class=\"loader\">Loading…</span>\
						</div>\
					</div>")
				.appendTo(context)
				.hide();
		}
		loader.show();
		return loader;
	},
	onLastPage: function(){
		if( ! Reader2.in_subs_list ) return false;
		if( Reader2.otherDataAvailable == false ) return false;
		return window.scrollY >= document.body.offsetHeight - (window.innerHeight);
	},
  
	onScroll: function() {
		// we want the scrollnode
		var isOnLastPage  = Reader2.onLastPage();
		if ( isOnLastPage ) {
			if ( Reader2.page_data.length ) {
				Reader2.render();
			} else {
				Reader2.pingQuantcast('infinite_scroll');
        // Reader2.load(true, function() {
        //   Reader2.render();
        // } );
			}
		}
		Reader2.loadVisibleImages();
	},
	
	onDetailScroll: function() {
		if( (window.scrollY >= document.body.offsetHeight - (window.innerHeight)) && !Reader2.detail_all_comments_loaded && !Reader2.comments_on_load ) {
			Reader2.load_more_detail_comments();
		}
	},

  loadVisibleImages: function(){
	  return;
	  if(this.lazy_queue.length == 0) return;
	  var bounds = {};
	  bounds['top'] = document.body.scrollTop;
	  bounds['bottom'] = bounds['top'] + window.innerHeight * 2;
	  var requeue = [];
	  while(node = this.lazy_queue.shift()){
		var current_node = jq(node), top = current_node.position()['top'], bottom = top + current_node.height();
		if( top <= bounds['bottom'] && bottom >= bounds['top'] ){
			current_node.find('img:not([src*="gravatar.com"])').each(function(){
				jq(this).attr('src', jq(this).attr('original'));
			});
		} else {
			requeue.push(node);
			if( top > bounds['bottom']){
				break;
			}
		}
	  }
	  this.lazy_queue = requeue.concat(this.lazy_queue);
  },

  //used by the iOS app
  is_next_item : function () {
	  var hasNext = true;
		WPApp.callNative([
		    {method:'hasNext', args:[ 'hasNext' ]}
		  ]);
	  var next_index = this.last_selected_item.position_in_the_main_list + 1;
		if (!this.loaded_items) { this.loaded_items = [] };
	  if( next_index >= this.loaded_items.length )
		  hasNext = false;
	
	  	WPApp.callNative([
		    {method:'hasNext', args:[ hasNext ]}
		  ]);
	
	  return hasNext;
  },

  show_next_item : function() {
	  var next_index = this.last_selected_item.position_in_the_main_list + 1;
	   if ( next_index >=  this.loaded_items.length ) {
			  
		  } else
			  this.show_article_details( this.loaded_items[next_index] );
	   
	   //Infinite scrolling! Load the next page if necessary.
	   if( next_index > (this.loaded_items.length/2) )
		   this.load_next_page_from_details_view();
	   
	  if( next_index+1 >= this.loaded_items.length )
		  return false; //no more next items
	  else
		  return true;
  },

  is_prev_item : function () {
	  var hasPrev = true;
	  var prev_index = this.last_selected_item.position_in_the_main_list - 1;
	  if( prev_index < 0 )
		  hasPrev = false;
	  
      WPApp.callNative([
	    {method:'hasPrev', args:[ hasPrev ]}
	  ]);	  
	
	  return hasPrev;
  },
  
  show_prev_item : function() {
	  var prev_index = this.last_selected_item.position_in_the_main_list - 1;	  
	  if ( prev_index < 0 ) {
		  
	  } else
		  this.show_article_details( this.loaded_items[prev_index] );
	
	  if( ( prev_index-1 ) < 0 )
		  return false; //no more prev items
	  else
		  return true;
  },

	get_last_selected_item: function() {
		WPApp.callNative([
		    {method:'getLastSelectedItem', args:[ this.last_selected_item ]}
		  ]);
	},
  
  //Infinite loading of posts from detail view
  load_next_page_from_details_view : function () {
	  if ( ( typeof this.request == 'object' ) && ( this.request !== null ) ) {
	      return;
	    }
	  
	  var division_remainder = this.loaded_items.length % this.per_page;
	  if ( division_remainder != 0 ) return; //already at the end of the list

	  var current_page = this.loaded_items.length / this.per_page;
	  this.filter = this.last_selected_item.filter_type;
	  //console.log('load_next_page_from_details_view');
	  //console.log(this.last_selected_item.filter_type);
	  var timestamp = null;
	  if( Reader2.loaded_items.length > 0 ){
		  timestamp = Reader2.loaded_items[Reader2.loaded_items.length-1].ts;
	  } 
	  
	  this.request = jq.getJSON( Reader2.site + '/wp-admin/admin-ajax.php', { 
		  'action': 'wpcom_load_mobile', 
		  'template': 'subscriptions',
		  'v': 2,
		  'per_page': this.per_page,
		  'before': timestamp,
		  'filter': this.filter,
		  'screen_width' : window.screen.availWidth
	  },
	  function( result ) {
		  Reader2.request = null;
		  Reader2.page_data = result;
		  if ( result.length < 1 ) {
			  
		  } else {
			  var loaded_items_length = Reader2.loaded_items.length;
			  jq.each(result, function(i, val) {
				  val.position_in_the_main_list = loaded_items_length+i;
				  val.filter_type = Reader2.filter; //used by the iOS app within the detailView
				  Reader2.loaded_items.push(val); //add the loaded items to the end of the items array
			  });
		  }
	  })
	  .error(function() { Reader2.request = null; /*console.log("error");*/ });
  },
    
  set_loaded_items : function( items ) {
	  Reader2.loaded_items = items;
  },
  
  get_loaded_items : function() {
	  var items = JSON.stringify(this.loaded_items);
	  WPApp.callNative([
	    {method:'getLoadedItems', args:[ items ]}
	  ]);
	  return items;
  },
  
  /* get the permalink of the current article loaded in the detail view. Used by the mobile apps */
  get_article_permalink : function () {
	var link = '';
	  if( this.current_item ) {
	  	if ( this.current_item.permalink ) {
		  link = this.current_item.permalink;
		} else {
		  link = this.current_item.guid;
		}
	  } 
	
	WPApp.callNative([
	  {method:'getArticlePermalink', args:[ link ]}
	]);
	
	return link;
  },

  /* get the title of the current article loaded in the detail view. Used by the mobile apps */
	get_article_title : function () {
		if (this.current_item) {
			var blank = /^[\s]{0,}$/;
			if ( !blank.test(this.current_item.title) ) {
				return this.escape_nasty_characters(this.current_item.title);
			} else if( !blank.test(this.current_item.blog) ) {
				return this.escape_nasty_characters(this.current_item.blog);
			} else {
				return "Read";
			}
		};
	},
  
	//end functions used by the iOS app
	get_next_item: function(){
		var item;
		if (this.current_item) {
			if(item = this.loaded_items[this.current_item.position_in_the_main_list + 1]){
				this.current_item = item;
				$(document).scrollTop($('.subs-item').eq(item.position_in_the_main_list).offset().top);
				return JSON.stringify(item);
			}
		};
	},
	
	has_next_item: function(){
		return this.current_item.position_in_the_main_list < this.loaded_items.length;
	},
	
	get_previous_item: function(){
		var item;
		if (this.current_item) {
			if(item = this.loaded_items[this.current_item.position_in_the_main_list - 1]){
				this.current_item = item;
				$(document).scrollTop($('.subs-item').eq(item.position_in_the_main_list).offset().top);
				return JSON.stringify(item);
			}
		};
	},
	
	has_previous_item: function(){
		return this.current_item.position_in_the_main_list > 0;
	},
	
	get_current_item: function(){
		if (this.current_item) {
			return JSON.stringify(this.current_item)
		}
	},
	
	prepare_item: function(item, node, template){
		var html_code = (Mustache.to_html(this[template], item));
		var current_node = jq(html_code); //create the node
		//Set a visual indicator near the title of pvt blog
		if( typeof item.blog_public != 'undefined' && item.blog_public == -1 ) {
			var tmpTitle = current_node.find('.blog-title').text();
			current_node.find('.blog-title').text( '[Private] ' + tmpTitle );
		}
		//Changes title/avatar for reblogged posts
		
		if( typeof item.is_reblog != 'undefined' && item.is_reblog == true ) {
			//console.log ('Reblogged content!');
			if (typeof  item.reblogged_blog_name != 'undefined')
				current_node.find('.blog-title').text( this.escape_nasty_characters( item.reblogged_blog_name ) );
			else
				current_node.find('.blog-title').text( this.escape_nasty_characters( item.reblogged_blog_url ) );
			
			current_node.find('img.avatar').attr( 'src', item.reblogged_author_avatar );
			
			current_node.find('span.reblogged_list_indicator').show();
		} else {
			current_node.find('span.reblogged_list_indicator').hide();
		}
		this.lazy_queue.push(current_node);
		current_node.appendTo(node);
		var touchMoved = false,
				selectItem = function(e){
					if(touchMoved){
						touchMoved = false;
						return false;
					}
					if( jq.browser.isIphoneApp && navigator.userAgent.toLowerCase().indexOf('ipad') != -1 ) {
						//Enable highlight on the ipad
						var selected = jq('#subscriptions .selected-item');
						selected.removeClass('selected-item');
						current_node.addClass('selected-item');
					}
					Reader2.pageYOffset = window.pageYOffset; 
					Reader2.current_item = item;
					if( jq.browser.isIphoneApp || jq.browser.isAndroidApp ) {
						Reader2.last_selected_item = JSON.stringify(Reader2.current_item);
					} else { 
						jQuery.Storage.set( {'current_item' : JSON.stringify(Reader2.current_item) } );
					}
					setTimeout(function(){
						WPApp.callNative([{method:'showArticleDetails', args:[item]}]);
						// for legacy reasons we must attempt to change the page's location
					});
					return false;
				},
				touchMoved = false,
				preventSelection = function(){
					touchMoved = true;
				};
		if (jq.support.touch && !jq.browser.isAndroidApp) {
			current_node.bind('touchmove', preventSelection);
			current_node.bind('touchend', selectItem);
		} else {
			current_node.click(selectItem);
		}
	
		return current_node;
	
  },
	deselectSelectedItem: function(){
		$('#subscriptions .selected-item').removeClass('selected-item');
	},
	autorefreshTimestamp: function(node, timestamp){
		var now = (new Date).getTime(), label, time = now-timestamp, label, ms = 1, next, t,
			periods = [[1000, 's'], [60, 'm'], [60, 'h'], [24, 'd'], [365, 'y']];
		
		periods.reduce(function(time, period){
			if (time === 0 ){ return };
			var q = time/period[0];
			if ( q > 1 ) {
				ms *= period[0];
				next = Math.floor((Math.ceil(q) - q) * ms);
				t = q;
				label = Math.ceil(t) + period[1];
				return q;
			} else {
				return 0;
			}
		}, time);
					
		if(node.parents('body').is('body')){
			node.text(label);
			var self = this;
			setTimeout(function(){
				self.autorefreshTimestamp(node, timestamp);
			}, next);
		}
	},
	render: function() {
		// If we return an empty result then stop trying load more pages.
		if ( ! ( this.page_data.length > 0 ) ) {
			this.otherDataAvailable = false;
			return false;
		}
		var page = jq('<div class="subs-page"></div>');
		jq.each(this.page_data, function(i, val) {
			var template, timestampUpdater, timestamp = this.ts * 1000, current_node, timestamp_node;
				
			if( Reader2.filter != 'fp' ) {
				template = 'list_item_template';
				jq('#subscriptions').removeClass('boxes');
			} else {
				jq('#subscriptions').addClass('boxes');    		
				template = 'fp_list_item_template';
			}
			current_node = Reader2.prepare_item(val, page, template);
			timestamp_node = current_node.find('.ago');
			timestampUpdater = function(){
			};
			setTimeout(function(){
				Reader2.autorefreshTimestamp(timestamp_node, timestamp);
			}, 1);
		});
		page
			.appendTo(jq('#subscriptions'))
			.show();
		jq('#loader2').css({height:'0'}).find('.loader').hide();
		page.one('webkitTransitionEnd', function(){
			jq('#loader2')
				.remove()
				.css({height:'80px'})
				.appendTo(jq('#subscriptions'));
		});
		page.one('transitionend', function(){
			//console.log('Transition End');
			jq('#loader2')
				.remove()
				.css({height:'80px'})
				.appendTo(jq('#subscriptions'));
		});
		page.one('transitionend', function(){
				page.css({'-moz-transform':'translate(0,0)'});
			})
			.one('webkitTransitionEnd', function(){
				page.css({webkitTransform:'translate3d(0,0,0)'});
			})
			.css({webkitTransform:'translate3d(0,0,0)','-moz-transform':'translate(0,0)'});
		
		Reader2.loadVisibleImages();
		this.page_data = false;
	},  

  /*
  Does away with nasty characters within the blog title. This is the same issue we have on the mobile app.
   */
  escape_nasty_characters: function(s) {
	  return s.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#039;/g,'\'');
  },
  load_more_detail_comments: function( current_item ) {
		Reader2.detail_all_comments_loaded = true;
	  jq('#comment-info').fadeOut();
	  jq('#comment-loader').show();
	  Reader2.comments_request = Reader2.request = jq.get( Reader2.site + '/wp-admin/admin-ajax.php', { 
		  'action': 'wpcom_get_comments', 	 
		  'template': 'subscriptions',
		  'blog_id': Reader2.last_selected_item.blog_id,
		  'post_id': Reader2.last_selected_item.post_id,
			't' : (new Date).getTime() // cache busting
	  },
	  function( result ) {
			Reader2.comments_request = null;
			jq('#comment-loader').hide();
			Reader2.detail_all_comments_loaded = true;
			if (result.length == 0) {
				return;
			}
			var comments = jq('#comments')
											.html( result );
			
			if (jq('#comment-help').length == 0) {
					comments.after( $('<div id="comment-help"><p>You can reply to any comment above by tapping on it. Try it&nbsp;now!</p></div>') );		
			};
			if (jq('#comments .comment').length <= 3) {
				jq('#comment-help').hide();
			} else {
				jq('#comment-help').show();
			}
	  })
	  .error(function() { 
			Reader2.request = null; 
			jq('#comment-loader').hide(); 
		});
  },
  show_article_details : function ( current_item ) {
		Reader2.detail_all_comments_loaded = false;
		if (Reader2.comments_request) Reader2.comments_request.abort();
		jq('#comment-info').show();
		jq('#comments').html("");
		//reset reblog area
		if (this.last_selected_item) {
			jq('#reblog').hide();
			jq('#reblog-submit').unbind('click');
		}
		if (typeof current_item == 'undefined'){
			try {
				this.current_item = current_item = JSON.parse($.Storage.get( 'current_item' ));				
			} catch(e){
				return;
			}
		} else {
			this.current_item = current_item;
			$.Storage.set('current_item',  JSON.stringify(this.current_item));
		}
		if (!this.current_item) { return };
	  this.last_selected_item = current_item;
		
	  //set the document.title to the post title
		document.title = this.get_article_title();
		
		//create the blavatar img element by using JS, (@see details.php), otherwise mobile safari hangs for a while on the first tap listView->detailView. Even if the src attribute is empty.
		if ( jq("#real_blog_avatar").length == 0 ){
			jq('#blog_link_url').prepend(jq('<img>', { 
			    src : "", 
				id :"real_blog_avatar",
				"class" : 'avatar', 
			    width : 32, 
			    height : 32, 
			    alt : "The Blavatar.", 
			    title : "The Blavatar."
			}));	
		}
		
		if (!jq.browser.isAndroidApp) {
			WPApp.callNative([
				{method:'getArticlePermalink', args:[ (this.current_item.permalink || this.current_item.guid) ]}
			]);
		}
	  
	  //set the current blog avatar if available
	  var imgNode = jq( '#real_blog_avatar' );
	  if( typeof current_item.is_reblog != 'undefined' && current_item.is_reblog == true ) {
		  var blog_avatar = current_item.reblogged_avatar;
	  } else {
		  var blog_avatar = current_item.avatar;
	  }
	  if( /subs-rss-mobile.png/i.test(blog_avatar) ) {
		  jq( '#blog_avatar' ).show();
		  imgNode.hide();
	  } else {
		  imgNode.attr( 'src', blog_avatar );
		  jq( '#blog_avatar' ).hide();
		  imgNode.show();
	  }
	  
	  var node = jq ('#main-content-from-list');
	  //console.log( template ); return;
	  var html_code = (Mustache.to_html(Reader2.details_item_template, current_item)); //generate the content
	  node.html(html_code);
		this.autorefreshTimestamp(node.find('.ago'), current_item.ts * 1000);
		if (!current_item.external) {
			if (this.commentor) this.commentor.destroy();
			if (this.reply_commentor) this.reply_commentor.destroy();
			this.commentor = new Commentor(null, {placeholder:"Enter your comment here…"});
			this.commentor.onSuccess = function(comment){
				var $comment = Commentor.buildComment(comment).addClass('depth-1').appendTo('#comments');
				// insert it into the main comments
				Commentor.flashComment($comment);
				this.resetForm();
				current_item.comment_count ++;
				jQuery.Storage.set('current_item', JSON.stringify(current_item));
				jq('#comment-info').hide();
			}
			this.reply_commentor = new Commentor(null, {submitLabel:"Submit Reply", onCancel:function(){
				this.hide();
				$('li.comment.highlighted').removeClass('highlighted');
			}});
			this.commentor.enable();
			this.commentor.setPath("/sites/"+current_item.blog_id+"/posts/" + current_item.post_id + "/replies/new");
			this.commentor.form.insertBefore('#comments-wrap');
			this.reply_commentor.enable();
			this.reply_commentor.setPath("/sites/"+current_item.blog_id+"/posts/" + current_item.post_id + "/replies/new");
			Reader2.detail_all_comments_loaded = false;
			jq(document).scroll(this.onDetailScroll);
			
			jq('#comments-wrap').show();
			jq(document.body).css({backgroundColor:"#2B2E33"});
		} else {
			if(this.commentor) this.commentor.hide();
			jq(document.body).css({backgroundColor:'#FFF'});
			jq('#comments-wrap').hide();
		}
		
		//hide the reblog button if the user has no blogs
		if (jq('#blogs-selector option').length == 0)
			jq('#action-reblog').hide();
		else
			jq('#action-reblog').show();
		
		// comment taps
		var touchMoved = false,
				highlightComment = function(e){
					if(touchMoved){
						touchMoved = false;
						return;
					}
					// abort if we're in the comment form
					var $target = jq(e.target),
							$li = $target.closest('li.comment'),
							matches,
							path,
							commentor = Reader2.reply_commentor;
					
					if($target.is('a') || ($target.is('p') && $target.find('a').length > 0)){
						e.stopPropagation();
						if ($target.is('a')) {
							$target.click();
						} else {
							$target.find('a').click();							
						};
						return;
					} else {
						e.preventDefault();						
					}
							
					if($li.hasClass('highlighted')) return;
					jq('#comments-wrap').find('li.highlighted').removeClass('highlighted');
					if ($li.is('.comment')) {
						$li.addClass('highlighted');
						Reader2.reply_commentor.form.insertAfter($li.children().first()).show();
						if (matches = $li.attr('id').match(/[\d]+$/) ) {
							name = $li.find('.fn').first().text();
							commentor.setPlaceholder("Reply to " + name);
							commentor.setPath("/sites/" + Reader2.current_item.blog_id + '/comments/' + matches[0] + '/replies/new');
							commentor.focus();
							commentor.onSuccess = function(comment){
								var $ul = $li.children('ul'), $new_li, depth, depthMatch;
								if (!$ul.is('ul')) $ul = jq('<ul class="children">').appendTo($li);
								if (depthMatch = $li.attr('class').match(/depth-([\d]+)/)) {
									depth = depthMatch[1] ? parseInt(depthMatch[1]) + 1 : "1";
								};
								this.resetForm();
								
								$new_li = Commentor.buildComment(comment).addClass('depth-' + depth).appendTo($ul);
								//only scroll if the comment is out of view
								Commentor.flashComment($new_li);
							}
						} else {
							commentor.hide();
						}
					} else {
						Reader2.reply_commentor.form.hide();
					}
			},
			preventHighlight = function(e){
				touchMoved = true;
			};
		if (jq.support.touch) {
			jq('#comments-wrap').bind('touchend', highlightComment);
			jq('#comments-wrap').bind('touchmove', preventHighlight);
		} else {
			jq('#comments-wrap').bind('click', highlightComment);
		}
		jq('#comments-wrap').click(function(e){
			// prevent accidental gravatar clicks
			var $target = $(e.target),
				$li = $target.is('li') ? $target : $target.parents('li').first();
			if(Reader2.commentor.isFocused() && $li.is(':first-child') && $li.parent().is('#comments') && $target.is('a')){
				e.preventDefault();
			}
			if (Reader2.reply_commentor.isFocused() && $target.is('a')) {
				e.preventDefault();
			};
		});
		
		if (current_item.comment_count == 0) {
			jq('#comment-info').text('Be the first to comment!');
			Reader2.detail_all_comments_loaded = true;
		} else {
			jq('#comment-info').text('Scroll down to view ' + current_item.comment_count + ' ' + (current_item.comment_count == 1 ? 'comment' : 'comments'));
		}
		//delay the loading of images by replacing the src attribute with a placeholder, otherwise mobile safari hangs for a while on the first tap listView->detailView.
		var allImageElements = jq(node).find('img:not([src*="gravatar.com"])');

	  /* Fix VideoPress videos proportions first */
	  var videopress_elements = jq(node).find( 'div.video-player' );
	  var useragent_tmp = navigator.userAgent.toLowerCase();
	  jq.each(videopress_elements, function(i, val) {
		  var currentDiv = jq(val);
		  currentDiv.addClass('fluid-width-video-wrapper');
		  var aspectRatio = currentDiv.height() / currentDiv.width();
		  if ( useragent_tmp.indexOf('iphone') == -1 && useragent_tmp.indexOf('ipod') == -1 
				  && useragent_tmp.indexOf('wp-iphone') == -1 && useragent_tmp.indexOf('ipad') == -1 ) {
			  currentDiv.css('padding-top', (aspectRatio * 100)+"%");
		  } 
		  currentDiv.css("height", "");
		  currentDiv.css("width", "");
		  
		  var videopress_obj_element = currentDiv.find( 'object' );
		  jq.each(videopress_obj_element, function(i2, val2) {
			  jq(val2).removeAttr('height').removeAttr('width');
		  });
	  });
	  
	  /* Fix videos and iframes proportions */
	  var fitVidsElements = jq('#article').fitVids();

	  //Fix the blog name and URL for reblogged content
	  if( typeof current_item.is_reblog != 'undefined' && current_item.is_reblog == true ) {
		  //console.log ('Reblogged content!');
		  //console.log(current_item );
		  jq( '#comments_link' ).attr( 'href', current_item.reblogged_permalink );
		  if ( typeof  current_item.reblogged_blog_name == 'undefined' )
			  jq( '#blog_title' ).text( this.escape_nasty_characters( current_item.reblogged_blog_url ) );
		  else
			  jq( '#blog_title' ).text( this.escape_nasty_characters( current_item.reblogged_blog_name ) );
		  jq( '#blog_link_url' ).attr( 'href', current_item.reblogged_blog_url);
		  jq(node).find( '.author-name' ).text( current_item.reblogged_author_name );
		  jq(node).find( '.author-avatar' ).attr( 'src', current_item.reblogged_author_avatar );
		  
		  jq( '#action-reblog' ).addClass( 'active' );
		  jq( '#action-reblog a' ).text( 'Reblogged' );
		  jq(node).find('.reblogged_details_indicator').show();
	  } else {
		  jq( '#comments_link' ).attr( 'href', current_item.guid );
		  if (typeof  current_item.blog == 'undefined')
			  current_item.blog = current_item.blogurl;
		 
		  //Set a visual indicator near the title of pvt blog
		  if( typeof current_item.blog_public != 'undefined' && current_item.blog_public == -1 ) 
			  jq( '#blog_title' ).text( this.escape_nasty_characters( '[Private] ' + current_item.blog ) );
		  else
			  jq( '#blog_title' ).text( this.escape_nasty_characters( current_item.blog ) );
		  
		  jq( '#blog_link_url' ).attr( 'href', current_item.blogurl);	  
		  jq( '#author-avatar' ).attr( 'src', current_item.author_avatar );
		  
		  jq(node).find('.reblogged_details_indicator').hide();
		  //reset the reblog action btn
		  jq( '#action-reblog' ).removeClass( 'active' );
		  jq( '#action-reblog a' ).text( 'Reblog' );
	  }
	
	$( '#blog_link_url' )
		.off('click.track')
		.one('click.track', function(){
			Reader2.log_user_actions('viewed_post_url');
	         });
	 
	  jq( '#reblog-title' ).text( current_item.title );
	  jq( '#post-content').attr("value", current_item.content );
	  
	  
	  //ping the stats endpoint
		setTimeout(function(){
			Reader2.pingStatsEndpoint('details_page');
			Reader2.load_more_detail_comments();
			Reader2.log_user_actions('viewed_post_detail');
		},1);
	  
	  //let's start with the reblog/like settings
	  var action_like_node = jq( '#action-like' );
	  var current_node_a = action_like_node.find( 'a' );
	  var sub_action_like = null;
	   
	  var set_like_button = function() {
		  action_like_node.removeClass( 'active' );
		  
		  if ( current_item.liked == 1 ) {
			  current_node_a.text( 'Unlike' );
			  current_node_a.attr( 'href', current_item.unlikeurl );
			  sub_action_like = 'unlike_it';
		  } else {
			  current_node_a.text( 'Like' );
			  current_node_a.attr( 'href', current_item.likeurl );
			  sub_action_like = 'like_it';
		  }
	  };
	  
	  set_like_button();
	  
	  current_node_a.click(function(e){
		  e.preventDefault();
		  var nonce = jq( this ).attr( 'href' ).split( '_wpnonce=' );
		  nonce = nonce[1];
		  
		  current_node_a.attr( 'href', '' );
		  action_like_node.addClass( 'active' );
		  if ( current_item.liked == 1 ) {
			  current_node_a.text( 'Unliking...' );
		  } else {
			  current_node_a.text( 'Liking...' );
		  }
		  
          var biscotto = "";
        	if( jq.browser.isIphoneApp || jq.browser.isBlackBerryApp ) {
        		biscotto = jq( '#like_cookie_for_ios' ).text();
        	} else {      	
	        	biscotto = encodeURIComponent( document.cookie );
        	}
       
		  jQuery.post( Reader2.site + '/wp-admin/admin-ajax.php', { 
			  'action': sub_action_like, 
			  'cookie': biscotto, 
			  '_wpnonce': nonce, 
			  'blog_id': (typeof current_item.is_reblog != 'undefined' && current_item.is_reblog == true) ? current_item.reblogged_blog_id : current_item.blog_id, 
			  'post_id': (typeof current_item.is_reblog != 'undefined' && current_item.is_reblog == true) ? current_item.reblogged_post_id : current_item.post_id
		  },
		  function( data, textStatus, jqXHR ) {
   			//textStatus is a string categorizing the status of the request ("success", "notmodified", "error", "timeout", "abort", or "parsererror").
			  if ( textStatus == 'success' ) {
				  current_item.liked =  current_item.liked == 1 ? 0 : 1;
				Reader2.log_user_actions((current_item.liked == 0 ? 'unliked_post' : 'liked_post' ));
			  } else {
				  //samething went wrong. 
			  }
			  //re-set the URL
			  set_like_button();
		  })
		  .error( function( jqXHR, textStatus, errorThrown ) {  set_like_button(); } );
	  });

	  //hides the like and re-blog on external feed for now
	  var actions = jq( '#actions-box' );
	  actions.find('aside').removeClass( 'external-feed' );
	  if ( current_item.external == 1 ) {
		  jq( '#actions' ).hide( );
		  jq( '#article' ).find( '.content' ).css('border-bottom' , 'none'); 
		  actions.find('aside').addClass( 'external-feed' );
		  node.find( '.author-name' ).hide();
		  node.find( '.author-avatar' ).hide();
	  }

	  jq( '#main-content-from-list' ).show();
	    
	  var delayImagesLoading = function (){
		  jq.each(allImageElements, function(i, val) {
			  var $currentElement = jq(val);			  
			  if( typeof $currentElement.attr('original') != 'undefined' &&  $currentElement.attr('original') != $currentElement.attr('src') ) {
				  $currentElement.attr( 'src', $currentElement.attr('original') );
				  setTimeout( delayImagesLoading, 500 );
				  return false; //stop the foreach!
			  }
		  });
	  };
	  
		setTimeout(function (){
			delayImagesLoading(); 
			//reset the scrolling
			jq( 'html,body' ).animate({
				scrollTop: jq( '#article-main' ).offset().top
			}, 150);
		}, 250);
			
		jq('#action-reblog').click(function(e){
			var reblog = jq('#reblog'), body = jq(document.body);
			e.preventDefault();
			jq('#actions').fadeOut();
			reblog.fadeIn();
			body.scrollTop(reblog.offset().top + reblog.height() - jq(window).height());
		});
		jq('#reblog-cancel').click(function(e){
			e.preventDefault();
			jq('#actions').fadeIn();
			jq('#reblog').fadeOut();
		});
	  
	  //reblog via ajax
	  jq( '#reblog-submit' ).click(function(e) {
		e.preventDefault();
          	var biscotto = "";
        	if( jq.browser.isIphoneApp || jq.browser.isBlackBerryApp ) {
        		biscotto = jq( '#like_cookie_for_ios' ).text();
        	} else {      	
	        	biscotto = encodeURIComponent( document.cookie );
        	}
        	
		jq( '#reblog-submit' ).text( 'Reblogging...' );
		jq( '#reblog-submit' ).addClass( 'loading' );
		jq.get( Reader2.site + '/wp-admin/admin-ajax.php', { 
			'action': 'subs_post_reblog', 
			'cookie': biscotto,
			'ids': current_item.blog_id + ',' + current_item.post_id,
			'blog_id': jq( '#blogs-selector' ).val(),
			'blog_title': jq( '#blogs-selector option:selected' ).text(),
			'blog_url': jq( '#blog_link_url' ).attr( 'href' ),
			'post_url': jq( '#comments_link' ).attr( 'href' ),
			'post_title': jq.trim( jq( '#reblog-title' ).text() ),
			'note': jq( '#comment-textarea' ).val(),
			'_wpnonce': jq( '#_wpnonce' ).val()
		},
		function(result) {
			if ( 'success' == result.type ) {
				Reader2.log_user_actions('reblogged_post');
				jq( '#action-reblog' ).addClass( 'active' );
				jq( '#action-reblog a' ).text( 'Reblogged' );
				jq('#reblog').fadeOut();
				jq('#actions').fadeIn();
		  		jq( '#reblog-submit' ).removeClass( 'loading' ); // Remove loading class (pulsate-text)
		  		jq( '#reblog-submit' ).text( 'Post Reblog' ); // Change label back to default
		  		jq('#comment-textarea').val(''); // Remove text after submission has been successful
			} else {
				alert('Sorry, your Reblog didn\'t make it through. Please try again.');
			}
		}, 'json' );

		return false;
	}); //end reblog
	  
	//Follow/unfollow via ajax
	var follow_node = jq( '#blog_follow_unfollow' );
	if ( current_item.following == 1 ) {
		follow_node.addClass( 'active' );
		//follow_node.text( 'Unfollow' );
	} else {
		//follow_node.text( 'Follow' );
		follow_node.removeClass( 'active' );
	}
	follow_node.show();
		 
	var follow_unfollow_func = function(e){
	  	e.preventDefault();
		var sub_action = null;
		  
		if ( current_item.following == 1 ) {
			jq( this ).attr( 'href', current_item.unfollow_url );
			sub_action = 'unsubscribe_from_blog';
		} else {
			jq( this ).attr( 'href', current_item.follow_url );
			sub_action = 'subscribe_to_blog';
		}		  
		var nonce = jq( this ).attr( 'href' ).split( '_wpnonce=' );
		nonce = nonce[1];

		var biscotto = "";
		if( jq.browser.isIphoneApp || jq.browser.isBlackBerryApp ) {
			biscotto = jq( '#like_cookie_for_ios' ).text();
		} else {      	
			biscotto = encodeURIComponent( document.cookie );
		}
		
		if ( current_item.following == 1 ) {
			// jq( this ).text( 'Unfollowing...' );
			jq( '#blog_follow_unfollow' ).removeClass( 'active' );
		} else {
			// jq( this ).text( 'Following...' );
			jq( '#blog_follow_unfollow' ).addClass( 'active' );
		}
				
		var req = { 				  
			'action': sub_action,
			'cookie': biscotto, 
			'_wpnonce': nonce,
		};
				
		if (current_item.is_reblog) {
			req.blog_url = current_item.reblogged_blog_url;
		} else if (sub_action == 'subscribe_to_blog') {
			req.blog_url = current_item.blogurl;
		} else {
			req.blog_ids = current_item.blog_id;
		}
			
		console.log("Un/follow", req);	
    		jQuery.post( Reader2.site + '/wp-admin/admin-ajax.php', req,
    			function( data, textStatus, jqXHR ) {
    				//textStatus is a string categorizing the status of the request ("success", "notmodified", "error", "timeout", "abort", or "parsererror").
    				if ( textStatus == 'success' ) {
    					current_item.following =  current_item.following == 1 ? 0 : 1;
					Reader2.log_user_actions((current_item.following == 1 ? 'followed_blog' : 'unfollowed_blog'));
    					if ( current_item.following == 1 ) {
    						jq( '#blog_follow_unfollow' ).addClass( 'active' );
    						// jq( '#blog_follow_unfollow' ).text( 'Unfollow' );
    					} else {
    						jq( '#blog_follow_unfollow' ).removeClass( 'active' );
    						// jq( '#blog_follow_unfollow' ).text( 'Follow' );
    					}
    					//set the following status on items in the same blog
    					var tmp_blog_id = (typeof current_item.is_reblog != 'undefined' && current_item.is_reblog == true) ? current_item.reblogged_blog_url : current_item.blog_id;
    					jq.each(Reader2.loaded_items, function(i, val) {
    						if ( tmp_blog_id == val.blog_id && val != current_item )
    							val.following = current_item.following;
    					});
    				}
    		}) // .post
		.error( function( jqXHR, textStatus, errorThrown ) { 
			if ( current_item.following == 1 ){ 
				jq( '#blog_follow_unfollow' ).text( 'Unfollow' );
			} else {
				jq( '#blog_follow_unfollow' ).text( 'Follow' );
			}
		}); // .error
	}; //end follow_unfollow_func
	  
	follow_node.unbind();
	follow_node.click( follow_unfollow_func );
	  
	var docViewTop = jq(window).scrollTop();
	var docViewBottom = docViewTop + jq(window).height();

	var elemTop = jq('#comments-wrap').offset().top;
	var elemBottom = elemTop + jq('#comments-wrap').height();
	if ( (elemBottom <= docViewBottom) && (elemTop >= docViewTop) && current_item.comment_count > 0) { 
		Reader2.comments_on_load = true; 
		Reader2.load_more_detail_comments();
	}
	
	var follows_req = "/sites/" + (this.current_item.is_reblog ? this.current_item.reblogged_blog_url : this.current_item.blog_id ) + "/follows/mine";
	$.wpcom_proxy_request(follows_req, function(response){
		Reader2.current_item.following = (response.is_following ? 1 : 0);
		$( '#blog_follow_unfollow' )[(response.is_following ? 'addClass' : 'removeClass')]( 'active' );
	});
	
	}, // close show_article_details
	restRequest:function(){
		jq.wpcom_proxy_request.apply(jq, arguments);
	},
	cacheVersion: '20120628', // modify to invalidate existing JSON in localStorage
	cache:function(key, data){
    return false;
		if (!window.localStorage) return false;
		var normalized = "reader_" + key;
		if (data === undefined) {
			// read from the cache
			if (data = localStorage[normalized]) {
				try {
					data = JSON.parse(data);
					if(!data.version || data.version != this.cacheVersion){
						data = false;
						delete localStorage[normalized];
					} else {
						data = data.data;
					}
				} catch(e){
					delete localStorage[key];
					data = false;
				}
			}
			if ($.isArray(data) && data.length == 0) {
				return false;
			} 
			return data;
			
		} else {
			// write to the cache
			if ( data === false || (jq.isArray(data) && data.length == 0) ) {
				delete localStorage[normalized]
			} else {
				localStorage[normalized] = JSON.stringify({
					version:this.cacheVersion,
					data:data
				});
			}
			return true;
		}
	},
	log_user_actions: function(){
		var actions = [].slice.call(arguments);
		$.ajax({
			'url':Reader2.site + '/wp-admin/admin-ajax.php',
			'data':{
				'action':'wpcom_mobile_track_user_interaction',
				'actions':actions
			}
		}); 
	}
	
	
}; // Reader2


var Commentor = (function($){
	if ( $.isFunction( $.wpcom_proxy_request ) ) {
		$.wpcom_proxy_request( {
			metaAPI: { accessAllUsersBlogs: true }
		}, function() {} );
	}

	return function(initialPath, options){
		if (!options) { options = {}};
		options.placeholder = options.placeholder || "";
		options.submitLabel = options.submitLabel || "Submit Comment";
		options.cancelLabel = options.cancelLabel || "Cancel";
		var enabled = false,
			self = this,
			path = "",
			commentForm,
			commentField,
			submitButton,
			cancelButton,
			textField,
			controls,
			blurTimer,
			comment = "",
			autoExpand = function(e){
				if (textField.val() == "") {
					commentField.css({height:0});
				} else {
					commentField.css({height:textField[0].scrollHeight});
				}
			},
			preventTouch = function(e){
				touchMoved = true;
			},
			cancelComment = function(e){
				e.preventDefault();
				if (touchMoved){
					touchMoved = false;
					return;
				};
				textField.val("");
				textField.blur();
				commentField.css({height:0});
				commentForm.removeClass('focused');
				if (typeof(options.onCancel) == 'function') options.onCancel.apply(self);
				return false;
			},
			touchMoved = false,
			setMessage = function(text){
				var msg = commentForm.find('.message-text').text(text);
				msg.css({top:((commentForm.height() - msg.height()) * 0.5) + 'px'});
			},
			setHeader = function(msg){
					
			},
			resetForm = function(){
				commentForm.removeClass('submitting').removeClass('focused');
				commentField.css({height:0});
				textField.val("");
			},
			submitComment = function(e){
				e.preventDefault();
				if (touchMoved){
					touchMoved = false;
					return;
				};
				textField.blur();
				commentField.addClass('disabled');
				setMessage('Publishing Comment');
				commentForm.addClass('submitting');
				jq.wpcom_proxy_request(path, {method:'POST',body:{content:textField.val()}}, function(response, statusCode){
					// TODO: Refactor the messaging interface, also add some buttons to have the user dismiss the final messages
					if (200 == statusCode) {
						// TODO: embed the comment in the comment list
						// add a link to scroll to the comment
						Reader2.pingStatsEndpoint('publish_comment');
						clearComment();
						if (typeof(self.onSuccess) == 'function') {
							self.onSuccess.call(self, response);
						} else {
							setMessage("Success!");
							setTimeout(function(){
								self.resetForm();
							}, 1000);
						}
					} else if(403 == statusCode) {
						if (response && response.message == 'User cannot read unapproved comment') {
							if (typeof(self.onApprovalNeeded) == 'function') {
								self.onApprovalNeeded.call(self, response);
							} else {
								setMessage("Success! Your comment is waiting for approval.");
								setTimeout(function(){
									self.resetForm();
								}, 2000);
							}
						} else {
							if (typeof(self.onUnauthorized) == 'function') {
								self.onUnauthorized.call(self, response);
							} else {
								setMessage("Sorry, you’re not allowed to comment on this post.");
								setTimeout(function(){
									self.resetForm();
								}, 2000);
							}
						}
					} else {
						if (typeof(self.onError) == 'function') {
							self.onError.call(self, response);
						} else {
							setMessage("There was a problem saving your post. Please try again.");
							setTimeout(function(){
								self.resetForm();
							}, 2000);
						}
					}
				});
					
				return false;
			},
			clearComment = function(){
				Commentor.store(path, false);
			},
			saveComment = function(){
				Commentor.store(path, textField.val());
			},
			prepareForm = function(){
				if (!commentForm) {
					self.form = commentForm = $('<div class="comment-form">\
					<div class="comment-interface">\
						<form method="get" action="#">\
						<header><h1>Comment!</h1></header>\
						<div class="comment-field"><textarea name="comment" placeholder="' + options.placeholder + '"></textarea></div>\
						<div class="comment-controls"><button class="comment-cancel">' + options.cancelLabel + '</button><button class="comment-submit">' + options.submitLabel + '</button></div>\
						</form>\
					</div>\
					<div class="message-interface">\
					<div class="message-text">default message</div>\
					</div>\
					</div>').bind('submit', function(e){ return false; });
					commentField = commentForm.find('.comment-field');
					textField = commentField.find('textarea');
					submitButton = commentForm.find('.comment-submit');
					cancelButton = commentForm.find('.comment-cancel');
					controls = commentForm.find('.comment-controls');
					textField.bind('focus', function(){
						commentForm.addClass('focused');
						commentField.bind('keydown', autoExpand);
						commentField.bind('keypress', autoExpand);
						commentField.bind('keyup', autoExpand);
						commentField.bind('keyup', saveComment);
					});
					textField.bind('blur', function(){
						commentField.unbind('keydown', autoExpand);
						commentField.unbind('keypress', autoExpand);
						commentField.unbind('keyup', autoExpand);
						commentField.unbind('keyup', saveComment);
					});
					if ($.support.touch) {
						cancelButton.bind('touchend', cancelComment);
						submitButton.bind('touchend', submitComment);
						cancelButton.bind('touchmove', preventTouch);
						submitButton.bind('touchmove', preventTouch);
					} else {
						cancelButton.bind('click', cancelComment);
						submitButton.bind('click', submitComment);
					}
				};
				
			};
		
		this.enable = function(){
			prepareForm();
			// prepared form show comment
			commentForm.show();
			autoExpand();
		};
		
		this.setMessage = function(){
			setMessage.apply(null, arguments);
		};
		this.setPath = function(newPath){
			path = newPath;
			comment = Commentor.retrieve(path);
			if (textField){
				textField.val(comment);
				autoExpand();
			}
		};
		this.getPath = function(){
			return path;
		};
		this.setPlaceholder = function(placeholder){
			textField.attr('placeholder', placeholder);
		};
		this.getPlaceholder = function(){
			return textField.attr('placeholder');
		};
		this.focus = function(){
			textField.focus();
		};
		this.resetForm = function(){
			resetForm();
		};
		this.hide = function(){
			self.form.hide();
		};
		this.isFocused = function(){
			return commentForm.hasClass('focused');
		}
		this.destroy = function(){
			commentForm.remove();
			if ($.support.touch) {
				cancelButton.unbind('touchend', cancelComment);
				submitButton.unbind('touchend', submitComment);
				cancelButton.unbind('touchmove', preventTouch);
				submitButton.unbind('touchmove', preventTouch);
			} else {
				cancelButton.unbind('click', cancelComment);
				submitButton.unbind('click', submitComment);
			}
			commentForm = null;
		};
		
		this.setPath(initialPath);
		
	}	
	
})(jQuery); // Commentor

Commentor.buildComment = function(comment){
	return jq('<li class="comment">')
					.attr('id', 'li-comment-'+comment.ID)
					.append(
						jq('<div></div>').attr('id', 'comment-' + comment.ID)
							.append(
								jq('<div class="comment-author vcard"></div>')
									.append(
										jq('<a class="avatar-link"></a>').append(
											jq('<img src="" alt="" class="avatar avatar-44" width="44" height="44"/>').attr('src', comment.author.avatar_URL.replace(/s=[\d]+/, "s=44"))
										).attr('href', comment.author.URL),
										jq('<span class="comment-meta">').append(
											jq('<div class="fn">').append('<a rel="external nofollow">').attr('href', comment.author.URL).text(comment.author.name),
											jq('<span class="comment-ago">').text('just now')
										)
									),
									comment.content
							)
					)
}

Commentor.store = function(path, comment){
	if (!path || !localStorage) return;
	if (!this.comments) {
		this.comments = JSON.parse(localStorage.mobile_reader_comments || "{}");
	};
	
	path = Commentor.normalizeKey(path);
	if (!comment) {
		delete this.comments[path];
	} else {
		this.comments[path.replace('/','_')] = comment;
	}
	
	localStorage.mobile_reader_comments = JSON.stringify(this.comments);
}

Commentor.retrieve = function(path){
	if (!path || !localStorage) return "";
	if (!this.comments) {
		this.comments = JSON.parse(localStorage.mobile_reader_comments || "{}");
	};
	path = Commentor.normalizeKey(path);
	return this.comments[path] || "";
}

Commentor.normalizeKey = function(key){
	return key.replace(/\//g, '_');
}

Commentor.flashComment = function($comment){
	var offset = $comment.offset(), $body = jq(document.body), height = jq(window).height();
	if (offset.top < $body.scrollTop() ) {
		// scroll to top of comment
		$body.scrollTop(offset.top - 40);
	} else if (offset.top + $comment.height() > $body.scrollTop() + height){
		// scroll to the bottom of the comment
		$body.scrollTop(offset.top + $comment.height() - height + 40);
	}
	$comment.children('div').addClass('flash');
	
}


/** Plugins ******************************************************/
/* Querystring */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('M 6(A){4 $11=A.11||\'&\';4 $V=A.V===r?r:j;4 $1p=A.1p===r?\'\':\'[]\';4 $13=A.13===r?r:j;4 $D=$13?A.D===j?"#":"?":"";4 $15=A.15===r?r:j;v.1o=M 6(){4 f=6(o,t){8 o!=1v&&o!==x&&(!!t?o.1t==t:j)};4 14=6(1m){4 m,1l=/\\[([^[]*)\\]/g,T=/^([^[]+)(\\[.*\\])?$/.1r(1m),k=T[1],e=[];19(m=1l.1r(T[2]))e.u(m[1]);8[k,e]};4 w=6(3,e,7){4 o,y=e.1b();b(I 3!=\'X\')3=x;b(y===""){b(!3)3=[];b(f(3,L)){3.u(e.h==0?7:w(x,e.z(0),7))}n b(f(3,1a)){4 i=0;19(3[i++]!=x);3[--i]=e.h==0?7:w(3[i],e.z(0),7)}n{3=[];3.u(e.h==0?7:w(x,e.z(0),7))}}n b(y&&y.T(/^\\s*[0-9]+\\s*$/)){4 H=1c(y,10);b(!3)3=[];3[H]=e.h==0?7:w(3[H],e.z(0),7)}n b(y){4 H=y.B(/^\\s*|\\s*$/g,"");b(!3)3={};b(f(3,L)){4 18={};1w(4 i=0;i<3.h;++i){18[i]=3[i]}3=18}3[H]=e.h==0?7:w(3[H],e.z(0),7)}n{8 7}8 3};4 C=6(a){4 p=d;p.l={};b(a.C){v.J(a.Z(),6(5,c){p.O(5,c)})}n{v.J(1u,6(){4 q=""+d;q=q.B(/^[?#]/,\'\');q=q.B(/[;&]$/,\'\');b($V)q=q.B(/[+]/g,\' \');v.J(q.Y(/[&;]/),6(){4 5=1e(d.Y(\'=\')[0]||"");4 c=1e(d.Y(\'=\')[1]||"");b(!5)8;b($15){b(/^[+-]?[0-9]+\\.[0-9]*$/.1d(c))c=1A(c);n b(/^[+-]?[0-9]+$/.1d(c))c=1c(c,10)}c=(!c&&c!==0)?j:c;b(c!==r&&c!==j&&I c!=\'1g\')c=c;p.O(5,c)})})}8 p};C.1H={C:j,1G:6(5,1f){4 7=d.Z(5);8 f(7,1f)},1h:6(5){b(!f(5))8 d.l;4 K=14(5),k=K[0],e=K[1];4 3=d.l[k];19(3!=x&&e.h!=0){3=3[e.1b()]}8 I 3==\'1g\'?3:3||""},Z:6(5){4 3=d.1h(5);b(f(3,1a))8 v.1E(j,{},3);n b(f(3,L))8 3.z(0);8 3},O:6(5,c){4 7=!f(c)?x:c;4 K=14(5),k=K[0],e=K[1];4 3=d.l[k];d.l[k]=w(3,e.z(0),7);8 d},w:6(5,c){8 d.N().O(5,c)},1s:6(5){8 d.O(5,x).17()},1z:6(5){8 d.N().1s(5)},1j:6(){4 p=d;v.J(p.l,6(5,7){1y p.l[5]});8 p},1F:6(Q){4 D=Q.B(/^.*?[#](.+?)(?:\\?.+)?$/,"$1");4 S=Q.B(/^.*?[?](.+?)(?:#.+)?$/,"$1");8 M C(Q.h==S.h?\'\':S,Q.h==D.h?\'\':D)},1x:6(){8 d.N().1j()},N:6(){8 M C(d)},17:6(){6 F(G){4 R=I G=="X"?f(G,L)?[]:{}:G;b(I G==\'X\'){6 1k(o,5,7){b(f(o,L))o.u(7);n o[5]=7}v.J(G,6(5,7){b(!f(7))8 j;1k(R,5,F(7))})}8 R}d.l=F(d.l);8 d},1B:6(){8 d.N().17()},1D:6(){4 i=0,U=[],W=[],p=d;4 16=6(E){E=E+"";b($V)E=E.B(/ /g,"+");8 1C(E)};4 1n=6(1i,5,7){b(!f(7)||7===r)8;4 o=[16(5)];b(7!==j){o.u("=");o.u(16(7))}1i.u(o.P(""))};4 F=6(R,k){4 12=6(5){8!k||k==""?[5].P(""):[k,"[",5,"]"].P("")};v.J(R,6(5,7){b(I 7==\'X\')F(7,12(5));n 1n(W,12(5),7)})};F(d.l);b(W.h>0)U.u($D);U.u(W.P($11));8 U.P("")}};8 M C(1q.S,1q.D)}}(v.1o||{});',62,106,'|||target|var|key|function|value|return|||if|val|this|tokens|is||length||true|base|keys||else||self||false|||push|jq|set|null|token|slice|settings|replace|queryObject|hash|str|build|orig|index|typeof|each|parsed|Array|new|copy|SET|join|url|obj|search|match|queryString|spaces|chunks|object|split|get||separator|newKey|prefix|parse|numbers|encode|COMPACT|temp|while|Object|shift|parseInt|test|decodeURIComponent|type|number|GET|arr|EMPTY|add|rx|path|addFields|query|suffix|location|exec|REMOVE|constructor|arguments|undefined|for|empty|delete|remove|parseFloat|compact|encodeURIComponent|toString|extend|load|has|prototype'.split('|'),0,{}))
/* Cookie: https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js */
jQuery.cookie=function(key,value,options){if(arguments.length>1&&String(value)!=="[object Object]"){options=jQuery.extend({},options);if(value===null||value===undefined){options.expires=-1}if(typeof options.expires==='number'){var days=options.expires,t=options.expires=new Date();t.setDate(t.getDate()+days)}value=String(value);return(document.cookie=[encodeURIComponent(key),'=',options.raw?value:encodeURIComponent(value),options.expires?'; expires='+options.expires.toUTCString():'',options.path?'; path='+options.path:'',options.domain?'; domain='+options.domain:'',options.secure?'; secure':''].join(''))}options=value||{};var result,decode=options.raw?function(s){return s}:decodeURIComponent;return(result=new RegExp('(?:^|; )'+encodeURIComponent(key)+'=([^;]*)').exec(document.cookie))?decode(result[1]):null};
(function($) {
	// Private data
	var isLS=typeof window.localStorage!=='undefined';
	// Private functions
	function wls(n,v){var c;if(typeof n==="string"&&typeof v==="string"){localStorage[n]=v;return true;}else if(typeof n==="object"&&typeof v==="undefined"){for(c in n){if(n.hasOwnProperty(c)){localStorage[c]=n[c];}}return true;}return false;}
	function wc(n,v){var dt,e,c;dt=new Date();dt.setTime(dt.getTime()+31536000000);e="; expires="+dt.toGMTString();if(typeof n==="string"&&typeof v==="string"){document.cookie=n+"="+v+e+"; path=/";return true;}else if(typeof n==="object"&&typeof v==="undefined"){for(c in n) {if(n.hasOwnProperty(c)){document.cookie=c+"="+n[c]+e+"; path=/";}}return true;}return false;}
	function rls(n){return localStorage[n];}
	function rc(n){var nn, ca, i, c;nn=n+"=";ca=document.cookie.split(';');for(i=0;i<ca.length;i++){c=ca[i];while(c.charAt(0)===' '){c=c.substring(1,c.length);}if(c.indexOf(nn)===0){return c.substring(nn.length,c.length);}}return null;}
	function dls(n){return delete localStorage[n];}
	function dc(n){return wc(n,"",-1);}
	/**
	* Public API
	* $.Storage - Represents the user's data store, whether it's cookies or local storage.
	* $.Storage.set("name", "value") - Stores a named value in the data store.
	* $.Storage.set({"name1":"value1", "name2":"value2", etc}) - Stores multiple name/value pairs in the data store.
	* $.Storage.get("name") - Retrieves the value of the given name from the data store.
	* $.Storage.remove("name") - Permanently deletes the name/value pair from the data store.
	*/
	$.extend({
		Storage: {
			set: isLS ? wls : wc,
			get: isLS ? rls : rc,
			remove: isLS ? dls :dc
		}
	});
})(jQuery);
