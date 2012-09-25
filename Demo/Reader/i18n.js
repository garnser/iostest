/*
i18n library for the Reader. Naive hash based localization. Two ways of translating interface:

1. In JavaScript using the _t (i18n.translate) method:
		_t('String to translate', 'Default string' );
		
		Interpolations:
		
		_t(':count Messages', '5 Messages', { count: 1, index: 2 });
		
		1) looks up the translations for the item indexed at ':count Messages'
		2) Expects that to be an array and looks at the item at index 2
		3) interpolates values from the settings hash into the found string

2. Via markup using the "data-i18n" attribute
		<a href="#" data-i18n="String to translate">Default string</a>
		
*/
var i18n = new (function($){
	locale = ['en'];
	this.phrases = {};
	this.locale = function(code, cb){
		locale = code.toLowerCase().split('-');
		$.ajax(locale[0] + '.json', {
			dataType:'json',
			async: $.isFunction(cb),
			success: function(data){
				i18n.phrases = data;
				i18n.translateDocument();
			}
		});
	}
	
	this.translate = function( phrase, hint, settings ){
		if (typeof(hint) == 'object') {
			settings = hint
			hint = phrase;
		};
		if (!settings) { settings = { index: 0, context: '*' }; }
		if (!settings.context) { settings.context = "*"; }
		var localized = this.lookup(phrase, hint, settings.context, settings.index),
			interpolated = this.interpolate( localized, settings );
		return interpolated;
	}
	
	this.lookup = function(phrase, hint, context, index){
		if ( index === undefined || index === null ) index = 0;
		if (!context) { context = "*"; }
		var lookup = this.phrases || { '*' : {} },
			phrases = lookup[context] || {},
			localized = phrases[phrase] || hint || phrase;
		if($.isArray(phrases)){
			if (index > localized.length - 1) { index = localized.length - 1; }
			return localized[index];
		} else {
			return localized;
		}
	}
	
	this.interpolate = function( str, items ){
		return str;
	}
	
	this.translateDocument = function( doc ){
		// find all attributes with data-i18n attribute
		if (!doc) { doc = document };
		var nodes = $(doc).find('[data-i18n]');
		nodes.each(function(){
			var $this = $(this),
				context = $this.closest('[data-i18n-context]').attr('data-i18n-context'),
				attr = $this.attr('data-i18n-attribute'),
				localized;
			if(attr && attr != ""){
				localized = i18n.translate( $this.attr('data-i18n'), $this.attr(attr), {context:context});
				$this.attr(attr, localized);
			} else {
				localized = i18n.translate( $this.attr('data-i18n'), $this.text(), {context:context});
				$this.text(localized);
			}
		});
	}
	
	$(document).ready(function(){
		i18n.translateDocument();
	});
	
})(jQuery);

var _t = function(){
	return i18n.translate.apply(i18n, arguments);
};
