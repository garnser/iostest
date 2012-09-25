
var ScrollPane = function(node, options){
	var scroller = this;
	options = options || {};
	this.settings = {
		pull_to_refresh: (options.pull_to_refresh !== false ? options.pull_to_refresh : false),
		onWillRefresh: (options.onWillRefresh || function(){}),
		onWillNotRefresh: (options.onWillNotRefresh || function(){}),
		onRefresh: (options.onRefresh || function(){}),
		item_selector: (options.item_selector || false) 
	};
	this.node = this._scroller = node;		
	this.finished = true;	
	this.animation_index = 0;
	
    var ss = document.createElement("style");
    document.head.appendChild(ss);
    this.stylesheet = globalStyleSheet = document.styleSheets[document.styleSheets.length-1];
};

ScrollPane.guid = function(){
	if (!this.next_id) {
		this.next_id = 1;
	} else {
		this.next_id ++;
	}
	return this.next_id;
}

ScrollPane.prototype.scrollToTop = function(){
	var node = this.node;
	var currentOffset = node.scrollTop;
	
	var animation = this.scrollToTopAnimation;
	if (!animation) { throw("No animation configured" )};
	var css = animation.css();
	this.stylesheet.insertRule(css, 0);
	
	node.scrollTop = 0;
	node.style.webkitOverflowScrolling = 'auto';
	node.style.overflow = 'visible';
		
	var afterAnimation = function(){
		node.style.webkitOverflowScrolling = null;
		node.style.overflow = null;
		node.webkitAnimation = null;
		node.scrollTop = 1;
	}
	
	// node.addEventListener('webkitAnimationEnd', afterAnimation);
	node.style.webkitAnimation = animation.animation;
	setTimeout(afterAnimation, animation.duration + 1)
		
}

ScrollPane.prototype.generateScrollToTopAnimation = function(){
	var node = this.node, top = this.node.scrollTop, duration = 500,
		name = 'scroll-to-top-' + (this.guid),
		rule = {
		name: name,
		duration: 500,
		animation: name + " " + 500 + "ms ease-in",
		rules: [['0', '-webkit-transform:translate(0px,' + (Math.max(-top, -3000)) + 'px);'],['100', '-webkit-transform:translate(0px,-1px);']],
		css: function(){
			var css = [];
			this.rules.forEach(function(rule){
				css.push(rule[0] + "% {" + rule[1] + "}")
			});
			css = "@-webkit-keyframes " + this.name + " {\n" + css.join("\n") + "\n}";
			return css;
			
		}
	};
	
	return rule;
}

ScrollPane.prototype.init = function(){
	var scroller = this, will_refresh = false;
	this.guid = ScrollPane.guid();
	// HACK: detect when we're done scrolling
    // so that we'll never be at the very top or very bottom
    // of the scrolling layer
    var scrollFinished = function(){
      if ( scroller.finished ){
      	if (scroller._scroller.scrollTop <= 0) {
			scroller._scroller.scrollTop = 1;
        } else if( scroller._scroller.scrollTop >= scroller._scroller.scrollHeight - scroller._scroller.offsetHeight ) {
			scroller._scroller.scrollTop = scroller._scroller.scrollHeight - scroller._scroller.offsetHeight - 1;
		}
		// generate the animation
		scroller.scrollToTopAnimation = scroller.generateScrollToTopAnimation();
		
      }
    };

    // set the initial scroll layer offset
	scrollFinished();
	
    // offset by 1 when finished scrolling and at top or bottom
	this._scroller.addEventListener('scroll', scrollFinished);
		// user has started scrolling
		this._scroller.addEventListener('touchstart', function(e){
			jq(scroller.node).stop();
			scroller.finished = false;
		});
	    // user is interacting with the scroll layer
		this._scroller.addEventListener('touchmove', function(e){
			if(scroller.settings.pull_to_refresh === false) return;
			if(-scroller._scroller.scrollTop >= scroller.settings.pull_to_refresh){
				if (!will_refresh) {
					will_refresh = true;
					scroller.settings.onWillRefresh.apply(scroller);
				};
			}else{
				if (will_refresh) {
					will_refresh = false;
					scroller.settings.onWillNotRefresh.apply(scroller);
				};
			}	
		});
		// User is done interacting with the scroll layer
		this._scroller.addEventListener('touchend', function(e){
			
			scroller.finished = true;
			if (will_refresh) {
				scroller.settings.onRefresh.apply(scroller);
				will_refresh = false;
			};
		});
};


