var SlidingPane = function(node, options){
	options = (options || {});
	this.settings = {
		toggle_button: options.toggle_button,
		onOpen: options.onOpen,
		onClose: options.onClose,
		openWidth:270
	};
	this.node = node;
	if(!this.settings.toggle_button) throw("Missing slider toggle button option");
	this.close();
};

SlidingPane.prototype.open = function(spd){
	this.state = 'open';
	this.node.style.webkitTransition = null;
	this.node.style.MozTransition = null;
	if(spd){
		this.node.style.webkitTransitionDuration = spd;
		this.node.style.webkitTransitionTimingFunction = 'ease-out';
	} else {
		this.node.style.webkitTransitionDuration = null;
		this.node.style.webkitTransitionTimingFunction = null;
	}
	if( jq.support.cssTransitions ){
		this.node.style.webkitTransform = "translate3d(" + this.settings.openWidth + "px, 0, 0)";
	} else if (jq.browser.mozilla && parseInt(jq.browser.version, 10) >= 4){
		this.node.style.MozTransitionTimingFunction = 'ease-out';
		this.node.style.MozTransitionDuration = '0.3s';
		this.node.style.MozTransform = "translate(" + this.settings.openWidth + "px, 0)";
	}
	else {
		this.node.style.left=this.settings.openWidth + 'px'; 
	}
	if(typeof(this.settings.onOpen) == 'function') this.settings.onOpen(this);
};

SlidingPane.prototype.close = function(spd){
	this.state = 'closed';
	this.node.style.webkitTransition = null;
	this.node.style.MozTransition = null;
	if(spd){
		this.node.style.webkitTransitionDuration = spd;
		this.node.style.webkitTransitionTimingFunction = 'ease-out';
	} else {
		this.node.style.webkitTransitionDuration = null;
		this.node.style.webkitTransitionTimingFunction = null;
	}
	if( jq.support.cssTransitions ) {
		this.node.style.webkitTransform = "translate3d(0px, 0, 0)";
	} else if (jq.browser.mozilla && parseInt(jq.browser.version, 10) >= 4){	
		this.node.style.MozTransitionTimingFunction = 'ease-out';
		this.node.style.MozTransitionDuration = '0.3s';
		this.node.style.MozTransform = "translate(0px, 0)"; 
	}
	else {
		this.node.style.left='0px';
	}
	if(typeof(this.settings.onClose) == 'function') this.settings.onClose(this);
};

SlidingPane.prototype.toggle = function(){
	if(this.state == 'closed'){
		this.open();
	} else {
		this.close();
	}
};

SlidingPane.prototype.slidingConstant = function(){
	if(this.state == 'open'){
		return this.settings.openWidth;
	} else {
		return 0;
	}
};

SlidingPane.prototype.initTouch = function(toggle){
		var slider = this;
		toggle.addEventListener('click', function(e){
			e.preventDefault();
			e.stopPropagation();
		}, true);

		var start_x, start_y, last_x, this_x, last_ts, this_ts, change_x, change_y, slide_x, sliding = false, swiped=false;
		this.node.addEventListener('touchstart', function(e){
			swiped = false;
			sliding = false;
			if(e.touches && e.touches.length == 1){
				if(e.target == toggle) e.preventDefault();
				last_x = start_x = e.touches[0].screenX;
				start_y = e.touches[0].screenY;
				last_ts = new Date().getTime();
			}
		});
		this.node.addEventListener('touchmove', function(e){
			if(e.touches && e.touches.length == 1){
				if(e.target == toggle) e.preventDefault();
				sliding = true;
				last_x = this_x;
				this_x = e.touches[0].screenX;
				last_ts = this_ts;
				this_ts = new Date().getTime();
				change_x = this_x - start_x;
				change_y = e.touches[0].screenY - start_y;
				var anchor = slider.slidingConstant();
				slide_x = Math.max(0, anchor + change_x);
				var velocity = (this_x - last_x)/(this_ts - last_ts);
				
				if(e.target !== toggle && slider.state == 'closed' && velocity >= 0.75 && change_x > 0 && Math.abs(change_y) < 10) {
					e.preventDefault();
					swiped = true;
					slider.open(Math.round(slider.settings.openWidth-slide_x/(velocity * 2)) + 'ms');
					return;
				}
				
				if(e.target != toggle) return;

				slider.node.style.webkitTransition = 'none';
				slider.node.style.webkitTransform = 'translate3d(' + slide_x + 'px, 0, 0)';
			}
		});
		this.node.addEventListener('touchend', function(e){
			if(swiped) return;
			if(e.target !== toggle){
				if(slider.state == 'open'){
					e.preventDefault();
					slider.close();
				}
				return;
			}
			if(sliding){
				sliding = false;
				var velocity = (this_x - last_x)/(this_ts - last_ts);
				if(slider.state == 'closed'){
					if(slide_x >= slider.settings.openWidth || velocity > 0.75){
						e.preventDefault();
						slider.open(slide_x < slider.settings.openWidth ?  Math.round(slider.settings.openWidth-slide_x/(velocity*2)) + 'ms'  : null);
					} else {
						slider.close();
					}
				} else {
					if(slide_x < slider.settings.openWidth){
						slider.close();
					}else {
						slider.open();
					}
				}
			} else {
				slider.toggle();
			}
		});
};

SlidingPane.prototype.initDesktop = function(toggle){
	var slider = this;
	toggle.addEventListener('click', function(e){
		slider.toggle();
		e.preventDefault();
		e.stopPropagation();
	}, true);
};

SlidingPane.prototype.init = function(){
	var slider = this;
	var toggle = slider.settings.toggle_button;
	if(toggle){
		if( jq.support.touch ) {
			this.initTouch(toggle);
		} else {
			this.initDesktop(toggle);
		}
	}
};
