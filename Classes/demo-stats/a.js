/*
Copyright (c) 2011 Wojo Design
Dual licensed under the MIT or GPL licenses.
*/
(function(){
	var window = this;
	// check to see if we have localStorage or not
	if( !window.localStorage ){		

		// globalStorage
		// non-standard: Firefox 2+
		// https://developer.mozilla.org/en/dom/storage#globalStorage
		if ( window.globalStorage ) {
			// try/catch for file protocol in Firefox
			try {
				window.localStorage = window.globalStorage;
			} catch( e ) {}
			return;
		}

		// userData
		// non-standard: IE 5+
		// http://msdn.microsoft.com/en-us/library/ms531424(v=vs.85).aspx
		var div = document.createElement( "div" ),
			attrKey = "localStorage";
		div.style.display = "none";
		document.getElementsByTagName( "head" )[ 0 ].appendChild( div );
		if ( div.addBehavior ) {
			div.addBehavior( "#default#userdata" );

			var localStorage = window["localStorage"] = {
				"length":0,
				"setItem":function( key , value ){
					div.load( attrKey );
					key = cleanKey(key );
				
					if( !div.getAttribute( key ) ){
						this.length++;
					}
					div.setAttribute( key , value );
				
					div.save( attrKey );
				},
				"getItem":function( key ){
					div.load( attrKey );
					key = cleanKey(key );
					return div.getAttribute( key );

				},
				"removeItem":function( key ){
					div.load( attrKey );
					key = cleanKey(key );
					div.removeAttribute( key );
				
					div.save( attrKey );
					this.length--;
					if( this.length < 0){
						this.length=0;
					}
				},
			
				"clear":function(){
					div.load( attrKey );
					var i = 0;
					while ( attr = div.XMLDocument.documentElement.attributes[ i++ ] ) {
						div.removeAttribute( attr.name );
					}
					div.save( attrKey );
					this.length=0;
				}, 
			
				"key":function( key ){
					div.load( attrKey );
					return div.XMLDocument.documentElement.attributes[ key ];
				}

			},
		
			// convert invalid characters to dashes
			// http://www.w3.org/TR/REC-xml/#NT-Name
			// simplified to assume the starting character is valid
			cleanKey = function( key ){
				return key.replace( /[^-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u37f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g, "-" );
			};
		
	
			div.load( attrKey );
			localStorage["length"] = div.XMLDocument.documentElement.attributes.length;
		} 
	} 
})();;
/*
    json2.js
    2011-10-19

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, regexp: true */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON;
if (!JSON) {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
;
/*!
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery hashchange event
//
// *Version: 1.3, Last updated: 7/21/2010*
// 
// Project Home - http://benalman.com/projects/jquery-hashchange-plugin/
// GitHub       - http://github.com/cowboy/jquery-hashchange/
// Source       - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.js
// (Minified)   - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.min.js (0.8kb gzipped)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
// 
// hashchange event - http://benalman.com/code/projects/jquery-hashchange/examples/hashchange/
// document.domain - http://benalman.com/code/projects/jquery-hashchange/examples/document_domain/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - 1.2.6, 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-4, Chrome 5-6, Safari 3.2-5,
//                   Opera 9.6-10.60, iPhone 3.1, Android 1.6-2.2, BlackBerry 4.6-5.
// Unit Tests      - http://benalman.com/code/projects/jquery-hashchange/unit/
// 
// About: Known issues
// 
// While this jQuery hashchange event implementation is quite stable and
// robust, there are a few unfortunate browser bugs surrounding expected
// hashchange event-based behaviors, independent of any JavaScript
// window.onhashchange abstraction. See the following examples for more
// information:
// 
// Chrome: Back Button - http://benalman.com/code/projects/jquery-hashchange/examples/bug-chrome-back-button/
// Firefox: Remote XMLHttpRequest - http://benalman.com/code/projects/jquery-hashchange/examples/bug-firefox-remote-xhr/
// WebKit: Back Button in an Iframe - http://benalman.com/code/projects/jquery-hashchange/examples/bug-webkit-hash-iframe/
// Safari: Back Button from a different domain - http://benalman.com/code/projects/jquery-hashchange/examples/bug-safari-back-from-diff-domain/
// 
// Also note that should a browser natively support the window.onhashchange 
// event, but not report that it does, the fallback polling loop will be used.
// 
// About: Release History
// 
// 1.3   - (7/21/2010) Reorganized IE6/7 Iframe code to make it more
//         "removable" for mobile-only development. Added IE6/7 document.title
//         support. Attempted to make Iframe as hidden as possible by using
//         techniques from http://www.paciellogroup.com/blog/?p=604. Added 
//         support for the "shortcut" format $(window).hashchange( fn ) and
//         $(window).hashchange() like jQuery provides for built-in events.
//         Renamed jQuery.hashchangeDelay to <jQuery.fn.hashchange.delay> and
//         lowered its default value to 50. Added <jQuery.fn.hashchange.domain>
//         and <jQuery.fn.hashchange.src> properties plus document-domain.html
//         file to address access denied issues when setting document.domain in
//         IE6/7.
// 1.2   - (2/11/2010) Fixed a bug where coming back to a page using this plugin
//         from a page on another domain would cause an error in Safari 4. Also,
//         IE6/7 Iframe is now inserted after the body (this actually works),
//         which prevents the page from scrolling when the event is first bound.
//         Event can also now be bound before DOM ready, but it won't be usable
//         before then in IE6/7.
// 1.1   - (1/21/2010) Incorporated document.documentMode test to fix IE8 bug
//         where browser version is incorrectly reported as 8.0, despite
//         inclusion of the X-UA-Compatible IE=EmulateIE7 meta tag.
// 1.0   - (1/9/2010) Initial Release. Broke out the jQuery BBQ event.special
//         window.onhashchange functionality into a separate plugin for users
//         who want just the basic event & back button support, without all the
//         extra awesomeness that BBQ provides. This plugin will be included as
//         part of jQuery BBQ, but also be available separately.

(function($,window,undefined){
  '$:nomunge'; // Used by YUI compressor.
  
  // Reused string.
  var str_hashchange = 'hashchange',
    
    // Method / object references.
    doc = document,
    fake_onhashchange,
    special = $.event.special,
    
    // Does the browser support window.onhashchange? Note that IE8 running in
    // IE7 compatibility mode reports true for 'onhashchange' in window, even
    // though the event isn't supported, so also test document.documentMode.
    doc_mode = doc.documentMode,
    supports_onhashchange = 'on' + str_hashchange in window && ( doc_mode === undefined || doc_mode > 7 );
  
  // Get location.hash (or what you'd expect location.hash to be) sans any
  // leading #. Thanks for making this necessary, Firefox!
  function get_fragment( url ) {
    url = url || location.href;
    return '#' + url.replace( /^[^#]*#?(.*)$/, '$1' );
  };
  
  // Method: jQuery.fn.hashchange
  // 
  // Bind a handler to the window.onhashchange event or trigger all bound
  // window.onhashchange event handlers. This behavior is consistent with
  // jQuery's built-in event handlers.
  // 
  // Usage:
  // 
  // > jQuery(window).hashchange( [ handler ] );
  // 
  // Arguments:
  // 
  //  handler - (Function) Optional handler to be bound to the hashchange
  //    event. This is a "shortcut" for the more verbose form:
  //    jQuery(window).bind( 'hashchange', handler ). If handler is omitted,
  //    all bound window.onhashchange event handlers will be triggered. This
  //    is a shortcut for the more verbose
  //    jQuery(window).trigger( 'hashchange' ). These forms are described in
  //    the <hashchange event> section.
  // 
  // Returns:
  // 
  //  (jQuery) The initial jQuery collection of elements.
  
  // Allow the "shortcut" format $(elem).hashchange( fn ) for binding and
  // $(elem).hashchange() for triggering, like jQuery does for built-in events.
  $.fn[ str_hashchange ] = function( fn ) {
    return fn ? this.bind( str_hashchange, fn ) : this.trigger( str_hashchange );
  };
  
  // Property: jQuery.fn.hashchange.delay
  // 
  // The numeric interval (in milliseconds) at which the <hashchange event>
  // polling loop executes. Defaults to 50.
  
  // Property: jQuery.fn.hashchange.domain
  // 
  // If you're setting document.domain in your JavaScript, and you want hash
  // history to work in IE6/7, not only must this property be set, but you must
  // also set document.domain BEFORE jQuery is loaded into the page. This
  // property is only applicable if you are supporting IE6/7 (or IE8 operating
  // in "IE7 compatibility" mode).
  // 
  // In addition, the <jQuery.fn.hashchange.src> property must be set to the
  // path of the included "document-domain.html" file, which can be renamed or
  // modified if necessary (note that the document.domain specified must be the
  // same in both your main JavaScript as well as in this file).
  // 
  // Usage:
  // 
  // jQuery.fn.hashchange.domain = document.domain;
  
  // Property: jQuery.fn.hashchange.src
  // 
  // If, for some reason, you need to specify an Iframe src file (for example,
  // when setting document.domain as in <jQuery.fn.hashchange.domain>), you can
  // do so using this property. Note that when using this property, history
  // won't be recorded in IE6/7 until the Iframe src file loads. This property
  // is only applicable if you are supporting IE6/7 (or IE8 operating in "IE7
  // compatibility" mode).
  // 
  // Usage:
  // 
  // jQuery.fn.hashchange.src = 'path/to/file.html';
  
  $.fn[ str_hashchange ].delay = 50;
  /*
  $.fn[ str_hashchange ].domain = null;
  $.fn[ str_hashchange ].src = null;
  */
  
  // Event: hashchange event
  // 
  // Fired when location.hash changes. In browsers that support it, the native
  // HTML5 window.onhashchange event is used, otherwise a polling loop is
  // initialized, running every <jQuery.fn.hashchange.delay> milliseconds to
  // see if the hash has changed. In IE6/7 (and IE8 operating in "IE7
  // compatibility" mode), a hidden Iframe is created to allow the back button
  // and hash-based history to work.
  // 
  // Usage as described in <jQuery.fn.hashchange>:
  // 
  // > // Bind an event handler.
  // > jQuery(window).hashchange( function(e) {
  // >   var hash = location.hash;
  // >   ...
  // > });
  // > 
  // > // Manually trigger the event handler.
  // > jQuery(window).hashchange();
  // 
  // A more verbose usage that allows for event namespacing:
  // 
  // > // Bind an event handler.
  // > jQuery(window).bind( 'hashchange', function(e) {
  // >   var hash = location.hash;
  // >   ...
  // > });
  // > 
  // > // Manually trigger the event handler.
  // > jQuery(window).trigger( 'hashchange' );
  // 
  // Additional Notes:
  // 
  // * The polling loop and Iframe are not created until at least one handler
  //   is actually bound to the 'hashchange' event.
  // * If you need the bound handler(s) to execute immediately, in cases where
  //   a location.hash exists on page load, via bookmark or page refresh for
  //   example, use jQuery(window).hashchange() or the more verbose 
  //   jQuery(window).trigger( 'hashchange' ).
  // * The event can be bound before DOM ready, but since it won't be usable
  //   before then in IE6/7 (due to the necessary Iframe), recommended usage is
  //   to bind it inside a DOM ready handler.
  
  // Override existing $.event.special.hashchange methods (allowing this plugin
  // to be defined after jQuery BBQ in BBQ's source code).
  special[ str_hashchange ] = $.extend( special[ str_hashchange ], {
    
    // Called only when the first 'hashchange' event is bound to window.
    setup: function() {
      // If window.onhashchange is supported natively, there's nothing to do..
      if ( supports_onhashchange ) { return false; }
      
      // Otherwise, we need to create our own. And we don't want to call this
      // until the user binds to the event, just in case they never do, since it
      // will create a polling loop and possibly even a hidden Iframe.
      $( fake_onhashchange.start );
    },
    
    // Called only when the last 'hashchange' event is unbound from window.
    teardown: function() {
      // If window.onhashchange is supported natively, there's nothing to do..
      if ( supports_onhashchange ) { return false; }
      
      // Otherwise, we need to stop ours (if possible).
      $( fake_onhashchange.stop );
    }
    
  });
  
  // fake_onhashchange does all the work of triggering the window.onhashchange
  // event for browsers that don't natively support it, including creating a
  // polling loop to watch for hash changes and in IE 6/7 creating a hidden
  // Iframe to enable back and forward.
  fake_onhashchange = (function(){
    var self = {},
      timeout_id,
      
      // Remember the initial hash so it doesn't get triggered immediately.
      last_hash = get_fragment(),
      
      fn_retval = function(val){ return val; },
      history_set = fn_retval,
      history_get = fn_retval;
    
    // Start the polling loop.
    self.start = function() {
      timeout_id || poll();
    };
    
    // Stop the polling loop.
    self.stop = function() {
      timeout_id && clearTimeout( timeout_id );
      timeout_id = undefined;
    };
    
    // This polling loop checks every $.fn.hashchange.delay milliseconds to see
    // if location.hash has changed, and triggers the 'hashchange' event on
    // window when necessary.
    function poll() {
      var hash = get_fragment(),
        history_hash = history_get( last_hash );
      
      if ( hash !== last_hash ) {
        history_set( last_hash = hash, history_hash );
        
        $(window).trigger( str_hashchange );
        
      } else if ( history_hash !== last_hash ) {
        location.href = location.href.replace( /#.*/, '' ) + history_hash;
      }
      
      timeout_id = setTimeout( poll, $.fn[ str_hashchange ].delay );
    };
    
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // vvvvvvvvvvvvvvvvvvv REMOVE IF NOT SUPPORTING IE6/7/8 vvvvvvvvvvvvvvvvvvv
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    $.browser.msie && !supports_onhashchange && (function(){
      // Not only do IE6/7 need the "magical" Iframe treatment, but so does IE8
      // when running in "IE7 compatibility" mode.
      
      var iframe,
        iframe_src;
      
      // When the event is bound and polling starts in IE 6/7, create a hidden
      // Iframe for history handling.
      self.start = function(){
        if ( !iframe ) {
          iframe_src = $.fn[ str_hashchange ].src;
          iframe_src = iframe_src && iframe_src + get_fragment();
          
          // Create hidden Iframe. Attempt to make Iframe as hidden as possible
          // by using techniques from http://www.paciellogroup.com/blog/?p=604.
          iframe = $('<iframe tabindex="-1" title="empty"/>').hide()
            
            // When Iframe has completely loaded, initialize the history and
            // start polling.
            .one( 'load', function(){
              iframe_src || history_set( get_fragment() );
              poll();
            })
            
            // Load Iframe src if specified, otherwise nothing.
            .attr( 'src', iframe_src || 'javascript:0' )
            
            // Append Iframe after the end of the body to prevent unnecessary
            // initial page scrolling (yes, this works).
            .insertAfter( 'body' )[0].contentWindow;
          
          // Whenever `document.title` changes, update the Iframe's title to
          // prettify the back/next history menu entries. Since IE sometimes
          // errors with "Unspecified error" the very first time this is set
          // (yes, very useful) wrap this with a try/catch block.
          doc.onpropertychange = function(){
            try {
              if ( event.propertyName === 'title' ) {
                iframe.document.title = doc.title;
              }
            } catch(e) {}
          };
          
        }
      };
      
      // Override the "stop" method since an IE6/7 Iframe was created. Even
      // if there are no longer any bound event handlers, the polling loop
      // is still necessary for back/next to work at all!
      self.stop = fn_retval;
      
      // Get history by looking at the hidden Iframe's location.hash.
      history_get = function() {
        return get_fragment( iframe.location.href );
      };
      
      // Set a new history item by opening and then closing the Iframe
      // document, *then* setting its location.hash. If document.domain has
      // been set, update that as well.
      history_set = function( hash, history_hash ) {
        var iframe_doc = iframe.document,
          domain = $.fn[ str_hashchange ].domain;
        
        if ( hash !== history_hash ) {
          // Update Iframe with any initial `document.title` that might be set.
          iframe_doc.title = doc.title;
          
          // Opening the Iframe's document after it has been closed is what
          // actually adds a history entry.
          iframe_doc.open();
          
          // Set document.domain for the Iframe document as well, if necessary.
          domain && iframe_doc.write( '<script>document.domain="' + domain + '"</script>' );
          
          iframe_doc.close();
          
          // Update the Iframe's hash, for great justice.
          iframe.location.hash = hash;
        }
      };
      
    })();
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // ^^^^^^^^^^^^^^^^^^^ REMOVE IF NOT SUPPORTING IE6/7/8 ^^^^^^^^^^^^^^^^^^^
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    
    return self;
  })();
  
})(jQuery,this);
;
/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */



var Hogan = {};

(function (Hogan) {
  Hogan.Template = function constructor(renderFunc, text, compiler) {
    if (renderFunc) {
      this.r = renderFunc;
    }
    this.c = compiler;
    this.text = text || '';
  }

  Hogan.Template.prototype = {
    // render: replaced by generated code.
    r: function (context, partials, indent) { return ''; },

    // variable escaping
    v: hoganEscape,

    render: function render(context, partials, indent) {
      return this.ri([context], partials || {}, indent);
    },

    // render internal -- a hook for overrides that catches partials too
    ri: function (context, partials, indent) {
      return this.r(context, partials, indent);
    },

    // tries to find a partial in the curent scope and render it
    rp: function(name, context, partials, indent) {
      var partial = partials[name];

      if (!partial) {
        return '';
      }

      if (this.c && typeof partial == 'string') {
        partial = this.c.compile(partial);
      }

      return partial.ri(context, partials, indent);
    },

    // render a section
    rs: function(context, partials, section) {
      var buf = '',
          tail = context[context.length - 1];

      if (!isArray(tail)) {
        return buf = section(context, partials);
      }

      for (var i = 0; i < tail.length; i++) {
        context.push(tail[i]);
        buf += section(context, partials);
        context.pop();
      }

      return buf;
    },

    // maybe start a section
    s: function(val, ctx, partials, inverted, start, end, tags) {
      var pass;

      if (isArray(val) && val.length === 0) {
        return false;
      }

      if (typeof val == 'function') {
        val = this.ls(val, ctx, partials, inverted, start, end, tags);
      }

      pass = (val === '') || !!val;

      if (!inverted && pass && ctx) {
        ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
      }

      return pass;
    },

    // find values with dotted names
    d: function(key, ctx, partials, returnFound) {
      var names = key.split('.'),
          val = this.f(names[0], ctx, partials, returnFound),
          cx = null;

      if (key === '.' && isArray(ctx[ctx.length - 2])) {
        return ctx[ctx.length - 1];
      }

      for (var i = 1; i < names.length; i++) {
        if (val && typeof val == 'object' && names[i] in val) {
          cx = val;
          val = val[names[i]];
        } else {
          val = '';
        }
      }

      if (returnFound && !val) {
        return false;
      }

      if (!returnFound && typeof val == 'function') {
        ctx.push(cx);
        val = this.lv(val, ctx, partials);
        ctx.pop();
      }

      return val;
    },

    // find values with normal names
    f: function(key, ctx, partials, returnFound) {
      var val = false,
          v = null,
          found = false;

      for (var i = ctx.length - 1; i >= 0; i--) {
        v = ctx[i];
        if (v && typeof v == 'object' && key in v) {
          val = v[key];
          found = true;
          break;
        }
      }

      if (!found) {
        return (returnFound) ? false : "";
      }

      if (!returnFound && typeof val == 'function') {
        val = this.lv(val, ctx, partials);
      }

      return val;
    },

    // higher order templates
    ho: function(val, cx, partials, text, tags) {
      var compiler = this.c;
      var t = val.call(cx, text, function(t) {
        return compiler.compile(t, {delimiters: tags}).render(cx, partials);
      });
      var s = compiler.compile(t.toString(), {delimiters: tags}).render(cx, partials);
      this.b = s;
      return false;
    },

    // higher order template result buffer
    b: '',

    // lambda replace section
    ls: function(val, ctx, partials, inverted, start, end, tags) {
      var cx = ctx[ctx.length - 1],
          t = null;

      if (!inverted && this.c && val.length > 0) {
        return this.ho(val, cx, partials, this.text.substring(start, end), tags);
      }

      t = val.call(cx);

      if (typeof t == 'function') {
        if (inverted) {
          return true;
        } else if (this.c) {
          return this.ho(t, cx, partials, this.text.substring(start, end), tags);
        }
      }

      return t;
    },

    // lambda replace variable
    lv: function(val, ctx, partials) {
      var cx = ctx[ctx.length - 1];
      var result = val.call(cx);
      if (typeof result == 'function') {
        result = result.call(cx);
      }
      result = result.toString();

      if (this.c && ~result.indexOf("{{")) {
        return this.c.compile(result).render(cx, partials);
      }

      return result;
    }

  };

  var rAmp = /&/g,
      rLt = /</g,
      rGt = />/g,
      rApos =/\'/g,
      rQuot = /\"/g,
      hChars =/[&<>\"\']/;

  function hoganEscape(str) {
    str = String((str === null || str === undefined) ? '' : str);
    return hChars.test(str) ?
      str
        .replace(rAmp,'&amp;')
        .replace(rLt,'&lt;')
        .replace(rGt,'&gt;')
        .replace(rApos,'&#39;')
        .replace(rQuot, '&quot;') :
      str;
  }

  var isArray = Array.isArray || function(a) {
    return Object.prototype.toString.call(a) === '[object Array]';
  };

})(typeof exports !== 'undefined' ? exports : Hogan);




(function (Hogan) {
  // Setup regex  assignments
  // remove whitespace according to Mustache spec
  var rIsWhitespace = /\S/,
      rQuot = /\"/g,
      rNewline =  /\n/g,
      rCr = /\r/g,
      rSlash = /\\/g,
      tagTypes = {
        '#': 1, '^': 2, '/': 3,  '!': 4, '>': 5,
        '<': 6, '=': 7, '_v': 8, '{': 9, '&': 10
      };

  Hogan.scan = function scan(text, delimiters) {
    var len = text.length,
        IN_TEXT = 0,
        IN_TAG_TYPE = 1,
        IN_TAG = 2,
        state = IN_TEXT,
        tagType = null,
        tag = null,
        buf = '',
        tokens = [],
        seenTag = false,
        i = 0,
        lineStart = 0,
        otag = '{{',
        ctag = '}}';

    function addBuf() {
      if (buf.length > 0) {
        tokens.push(new String(buf));
        buf = '';
      }
    }

    function lineIsWhitespace() {
      var isAllWhitespace = true;
      for (var j = lineStart; j < tokens.length; j++) {
        isAllWhitespace =
          (tokens[j].tag && tagTypes[tokens[j].tag] < tagTypes['_v']) ||
          (!tokens[j].tag && tokens[j].match(rIsWhitespace) === null);
        if (!isAllWhitespace) {
          return false;
        }
      }

      return isAllWhitespace;
    }

    function filterLine(haveSeenTag, noNewLine) {
      addBuf();

      if (haveSeenTag && lineIsWhitespace()) {
        for (var j = lineStart, next; j < tokens.length; j++) {
          if (!tokens[j].tag) {
            if ((next = tokens[j+1]) && next.tag == '>') {
              // set indent to token value
              next.indent = tokens[j].toString()
            }
            tokens.splice(j, 1);
          }
        }
      } else if (!noNewLine) {
        tokens.push({tag:'\n'});
      }

      seenTag = false;
      lineStart = tokens.length;
    }

    function changeDelimiters(text, index) {
      var close = '=' + ctag,
          closeIndex = text.indexOf(close, index),
          delimiters = trim(
            text.substring(text.indexOf('=', index) + 1, closeIndex)
          ).split(' ');

      otag = delimiters[0];
      ctag = delimiters[1];

      return closeIndex + close.length - 1;
    }

    if (delimiters) {
      delimiters = delimiters.split(' ');
      otag = delimiters[0];
      ctag = delimiters[1];
    }

    for (i = 0; i < len; i++) {
      if (state == IN_TEXT) {
        if (tagChange(otag, text, i)) {
          --i;
          addBuf();
          state = IN_TAG_TYPE;
        } else {
          if (text.charAt(i) == '\n') {
            filterLine(seenTag);
          } else {
            buf += text.charAt(i);
          }
        }
      } else if (state == IN_TAG_TYPE) {
        i += otag.length - 1;
        tag = tagTypes[text.charAt(i + 1)];
        tagType = tag ? text.charAt(i + 1) : '_v';
        if (tagType == '=') {
          i = changeDelimiters(text, i);
          state = IN_TEXT;
        } else {
          if (tag) {
            i++;
          }
          state = IN_TAG;
        }
        seenTag = i;
      } else {
        if (tagChange(ctag, text, i)) {
          tokens.push({tag: tagType, n: trim(buf), otag: otag, ctag: ctag,
                       i: (tagType == '/') ? seenTag - ctag.length : i + otag.length});
          buf = '';
          i += ctag.length - 1;
          state = IN_TEXT;
          if (tagType == '{') {
            if (ctag == '}}') {
              i++;
            } else {
              cleanTripleStache(tokens[tokens.length - 1]);
            }
          }
        } else {
          buf += text.charAt(i);
        }
      }
    }

    filterLine(seenTag, true);

    return tokens;
  }

  function cleanTripleStache(token) {
    if (token.n.substr(token.n.length - 1) === '}') {
      token.n = token.n.substring(0, token.n.length - 1);
    }
  }

  function trim(s) {
    if (s.trim) {
      return s.trim();
    }

    return s.replace(/^\s*|\s*$/g, '');
  }

  function tagChange(tag, text, index) {
    if (text.charAt(index) != tag.charAt(0)) {
      return false;
    }

    for (var i = 1, l = tag.length; i < l; i++) {
      if (text.charAt(index + i) != tag.charAt(i)) {
        return false;
      }
    }

    return true;
  }

  function buildTree(tokens, kind, stack, customTags) {
    var instructions = [],
        opener = null,
        token = null;

    while (tokens.length > 0) {
      token = tokens.shift();
      if (token.tag == '#' || token.tag == '^' || isOpener(token, customTags)) {
        stack.push(token);
        token.nodes = buildTree(tokens, token.tag, stack, customTags);
        instructions.push(token);
      } else if (token.tag == '/') {
        if (stack.length === 0) {
          throw new Error('Closing tag without opener: /' + token.n);
        }
        opener = stack.pop();
        if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {
          throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);
        }
        opener.end = token.i;
        return instructions;
      } else {
        instructions.push(token);
      }
    }

    if (stack.length > 0) {
      throw new Error('missing closing tag: ' + stack.pop().n);
    }

    return instructions;
  }

  function isOpener(token, tags) {
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].o == token.n) {
        token.tag = '#';
        return true;
      }
    }
  }

  function isCloser(close, open, tags) {
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].c == close && tags[i].o == open) {
        return true;
      }
    }
  }

  function writeCode(tree) {
    return 'i = i || "";var b = i + "";var _ = this;' + walk(tree) + 'return b;';
  }

  Hogan.generate = function (code, text, options) {
    if (options.asString) {
      return 'function(c,p,i){' + code + ';}';
    }

    return new Hogan.Template(new Function('c', 'p', 'i', code), text, Hogan);
  }

  function esc(s) {
    return s.replace(rSlash, '\\\\')
            .replace(rQuot, '\\\"')
            .replace(rNewline, '\\n')
            .replace(rCr, '\\r');
  }

  function chooseMethod(s) {
    return (~s.indexOf('.')) ? 'd' : 'f';
  }

  function walk(tree) {
    var code = '';
    for (var i = 0, l = tree.length; i < l; i++) {
      var tag = tree[i].tag;
      if (tag == '#') {
        code += section(tree[i].nodes, tree[i].n, chooseMethod(tree[i].n),
                        tree[i].i, tree[i].end, tree[i].otag + " " + tree[i].ctag);
      } else if (tag == '^') {
        code += invertedSection(tree[i].nodes, tree[i].n,
                                chooseMethod(tree[i].n));
      } else if (tag == '<' || tag == '>') {
        code += partial(tree[i]);
      } else if (tag == '{' || tag == '&') {
        code += tripleStache(tree[i].n, chooseMethod(tree[i].n));
      } else if (tag == '\n') {
        code += text('"\\n"' + (tree.length-1 == i ? '' : ' + i'));
      } else if (tag == '_v') {
        code += variable(tree[i].n, chooseMethod(tree[i].n));
      } else if (tag === undefined) {
        code += text('"' + esc(tree[i]) + '"');
      }
    }
    return code;
  }

  function section(nodes, id, method, start, end, tags) {
    return 'if(_.s(_.' + method + '("' + esc(id) + '",c,p,1),' +
           'c,p,0,' + start + ',' + end + ', "' + tags + '")){' +
           'b += _.rs(c,p,' +
           'function(c,p){ var b = "";' +
           walk(nodes) +
           'return b;});c.pop();}' +
           'else{b += _.b; _.b = ""};';
  }

  function invertedSection(nodes, id, method) {
    return 'if (!_.s(_.' + method + '("' + esc(id) + '",c,p,1),c,p,1,0,0,"")){' +
           walk(nodes) +
           '};';
  }

  function partial(tok) {
    return 'b += _.rp("' +  esc(tok.n) + '",c,p,"' + (tok.indent || '') + '");';
  }

  function tripleStache(id, method) {
    return 'b += (_.' + method + '("' + esc(id) + '",c,p,0));';
  }

  function variable(id, method) {
    return 'b += (_.v(_.' + method + '("' + esc(id) + '",c,p,0)));';
  }

  function text(id) {
    return 'b += ' + id + ';';
  }

  Hogan.parse = function(tokens, options) {
    options = options || {};
    return buildTree(tokens, '', [], options.sectionTags || []);
  },

  Hogan.cache = {};

  Hogan.compile = function(text, options) {
    // options
    //
    // asString: false (default)
    //
    // sectionTags: [{o: '_foo', c: 'foo'}]
    // An array of object with o and c fields that indicate names for custom
    // section tags. The example above allows parsing of {{_foo}}{{/foo}}.
    //
    // delimiters: A string that overrides the default delimiters.
    // Example: "<% %>"
    //
    options = options || {};

    var key = text + '||' + !!options.asString;

    var t = this.cache[key];

    if (t) {
      return t;
    }

    t = this.generate(writeCode(this.parse(this.scan(text, options.delimiters), options)), text, options);
    return this.cache[key] = t;
  };
})(typeof exports !== 'undefined' ? exports : Hogan);

;


//
// Generated on Tue Jun 19 2012 15:13:01 GMT+0300 (EEST) by Nodejitsu, Inc (Using Codesurgeon).
// Version 1.0.11
//

(function (exports) {


/*
 * browser.js: Browser specific functionality for director.
 *
 * (C) 2011, Nodejitsu Inc.
 * MIT LICENSE
 *
 */

if (!Array.prototype.filter) {
  Array.prototype.filter = function(filter, that) {
    var other = [], v;
    for (var i = 0, n = this.length; i < n; i++) {
      if (i in this && filter.call(that, v = this[i], i, this)) {
        other.push(v);
      }
    }
    return other;
  };
}

if (!Array.isArray){
  Array.isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };
}

var dloc = document.location;

var listener = {
  mode: 'modern',
  hash: dloc.hash,
  history: false,

  check: function () {
    var h = dloc.hash;
    if (h != this.hash) {
      this.hash = h;
      this.onHashChanged();
    }
  },

  fire: function () {
    if (this.mode === 'modern') {
      this.history === true ? window.onpopstate() : window.onhashchange();
    }
    else {
      this.onHashChanged();
    }
  },

  init: function (fn, history) {
    var self = this;
    this.history = history;

    if (!window.Router.listeners) {
      window.Router.listeners = [];
    }

    function onchange(onChangeEvent) {
      for (var i = 0, l = window.Router.listeners.length; i < l; i++) {
        window.Router.listeners[i](onChangeEvent);
      }
    }

    //note IE8 is being counted as 'modern' because it has the hashchange event
    if ('onhashchange' in window && (document.documentMode === undefined
      || document.documentMode > 7)) {
      // At least for now HTML5 history is available for 'modern' browsers only
      if (this.history === true) {
        // There is an old bug in Chrome that causes onpopstate to fire even
        // upon initial page load. Since the handler is run manually in init(),
        // this would cause Chrome to run it twise. Currently the only
        // workaround seems to be to set the handler after the initial page load
        // http://code.google.com/p/chromium/issues/detail?id=63040
        setTimeout(function() {
          window.onpopstate = onchange;
        }, 500);
      }
      else {
        window.onhashchange = onchange;
      }
      this.mode = 'modern';
    }
    else {
      //
      // IE support, based on a concept by Erik Arvidson ...
      //
      var frame = document.createElement('iframe');
      frame.id = 'state-frame';
      frame.style.display = 'none';
      document.body.appendChild(frame);
      this.writeFrame('');

      if ('onpropertychange' in document && 'attachEvent' in document) {
        document.attachEvent('onpropertychange', function () {
          if (event.propertyName === 'location') {
            self.check();
          }
        });
      }

      window.setInterval(function () { self.check(); }, 50);

      this.onHashChanged = onchange;
      this.mode = 'legacy';
    }

    window.Router.listeners.push(fn);

    return this.mode;
  },

  destroy: function (fn) {
    if (!window.Router || !window.Router.listeners) {
      return;
    }

    var listeners = window.Router.listeners;

    for (var i = listeners.length - 1; i >= 0; i--) {
      if (listeners[i] === fn) {
        listeners.splice(i, 1);
      }
    }
  },

  setHash: function (s) {
    // Mozilla always adds an entry to the history
    if (this.mode === 'legacy') {
      this.writeFrame(s);
    }

    if (this.history === true) {
      window.history.pushState({}, document.title, s);
      // Fire an onpopstate event manually since pushing does not obviously
      // trigger the pop event.
      this.fire();
    } else {
      dloc.hash = (s[0] === '/') ? s : '/' + s;
    }
    return this;
  },

  writeFrame: function (s) {
    // IE support...
    var f = document.getElementById('state-frame');
    var d = f.contentDocument || f.contentWindow.document;
    d.open();
    d.write("<script>_hash = '" + s + "'; onload = parent.listener.syncHash;<script>");
    d.close();
  },

  syncHash: function () {
    // IE support...
    var s = this._hash;
    if (s != dloc.hash) {
      dloc.hash = s;
    }
    return this;
  },

  onHashChanged: function () {}
};

var Router = exports.Router = function (routes) {
  if (!(this instanceof Router)) return new Router(routes);

  this.params   = {};
  this.routes   = {};
  this.methods  = ['on', 'once', 'after', 'before'];
  this._methods = {};

  this._insert = this.insert;
  this.insert = this.insertEx;

  this.historySupport = (window.history != null ? window.history.pushState : null) != null

  this.configure();
  this.mount(routes || {});
};

Router.prototype.init = function (r) {
  var self = this;
  this.handler = function(onChangeEvent) {
    var hash, newUrl = false;

    if ( 'undefined' != typeof onChangeEvent && 'newURL' in onChangeEvent ) 
      var newUrl = onChangeEvent.newURL;

    if ( newUrl ) {
      hash = newUrl.replace(/.*#/, '').replace( '!', '' );
    }
    else {
      hash = dloc.hash.replace(/^#/, '').replace( '!', '' );
    }
    self.dispatch('on', hash);
  };

  listener.init(this.handler, this.history);

  if (this.history === false) {
    if (dloc.hash === '' && r) {
      dloc.hash = r;
    } else if (dloc.hash.length > 0) {
      self.dispatch('on', dloc.hash.replace(/^#/, '').replace('!', ''));
    }
  }
  else {
    routeTo = dloc.hash === '' && r ? r : dloc.hash.length > 0 ? dloc.hash.replace(/^#/, '').replace('!', '') : null;
    if (routeTo) {
      window.history.replaceState({}, document.title, routeTo);
    }

    // Router has been initialized, but due to the chrome bug it will not
    // yet actually route HTML5 history state changes. Thus, decide if should route.
    if (routeTo || this.run_in_init === true) {
      this.handler();
    }
  }

  return this;
};

Router.prototype.explode = function () {
  var v = this.history === true ? this.getPath() : dloc.hash;
  if (v[1] === '/') { v=v.slice(1) }
  return v.slice(1, v.length).split("/");
};

Router.prototype.setRoute = function (i, v, val) {
  var url = this.explode();

  if (typeof i === 'number' && typeof v === 'string') {
    url[i] = v;
  }
  else if (typeof val === 'string') {
    url.splice(i, v, s);
  }
  else {
    url = [i];
  }

  listener.setHash(url.join('/'));
  return url;
};

//
// ### function insertEx(method, path, route, parent)
// #### @method {string} Method to insert the specific `route`.
// #### @path {Array} Parsed path to insert the `route` at.
// #### @route {Array|function} Route handlers to insert.
// #### @parent {Object} **Optional** Parent "routes" to insert into.
// insert a callback that will only occur once per the matched route.
//
Router.prototype.insertEx = function(method, path, route, parent) {
  if (method === "once") {
    method = "on";
    route = function(route) {
      var once = false;
      return function() {
        if (once) return;
        once = true;
        return route.apply(this, arguments);
      };
    }(route);
  }
  return this._insert(method, path, route, parent);
};

Router.prototype.getRoute = function (v) {
  var ret = v;

  if (typeof v === "number") {
    ret = this.explode()[v];
  }
  else if (typeof v === "string"){
    var h = this.explode();
    ret = h.indexOf(v);
  }
  else {
    ret = this.explode();
  }

  return ret;
};

Router.prototype.destroy = function () {
  listener.destroy(this.handler);
  return this;
};

Router.prototype.getPath = function () {
  var path = window.location.pathname;
  if (path.substr(0, 1) !== '/') {
    path = '/' + path;
  }
  return path;
};
function _every(arr, iterator) {
    for (var i = 0; i < arr.length; i += 1) {
        if (iterator(arr[i], i, arr) === false) {
            return;
        }
    }
}

function _flatten(arr) {
    var flat = [];
    for (var i = 0, n = arr.length; i < n; i++) {
        flat = flat.concat(arr[i]);
    }
    return flat;
}

function _asyncEverySeries(arr, iterator, callback) {
    if (!arr.length) {
        return callback();
    }
    var completed = 0;
    (function iterate() {
        iterator(arr[completed], function(err) {
            if (err || err === false) {
                callback(err);
                callback = function() {};
            } else {
                completed += 1;
                if (completed === arr.length) {
                    callback();
                } else {
                    iterate();
                }
            }
        });
    })();
}

function paramifyString(str, params, mod) {
    mod = str;
    for (var param in params) {
        if (params.hasOwnProperty(param)) {
            mod = params[param](str);
            if (mod !== str) {
                break;
            }
        }
    }
    return mod === str ? "([._a-zA-Z0-9-]+)" : mod;
}

function regifyString(str, params) {
    if (~str.indexOf("*")) {
        str = str.replace(/\*/g, "([_.()!\\ %@&a-zA-Z0-9-]+)");
    }
    var captures = str.match(/:([^\/]+)/ig), length;
    if (captures) {
        length = captures.length;
        for (var i = 0; i < length; i++) {
            str = str.replace(captures[i], paramifyString(captures[i], params));
        }
    }
    return str;
}

Router.prototype.configure = function(options) {
    options = options || {};
    for (var i = 0; i < this.methods.length; i++) {
        this._methods[this.methods[i]] = true;
    }
    this.recurse = options.recurse || this.recurse || false;
    this.async = options.async || false;
    this.delimiter = options.delimiter || "/";
    this.strict = typeof options.strict === "undefined" ? true : options.strict;
    this.notfound = options.notfound;
    this.resource = options.resource;
    this.history = options.html5history && this.historySupport || false;
    this.run_in_init = this.history === true && options.run_handler_in_init !== false;
    this.every = {
        after: options.after || null,
        before: options.before || null,
        on: options.on || null
    };
    return this;
};

Router.prototype.param = function(token, matcher) {
    if (token[0] !== ":") {
        token = ":" + token;
    }
    var compiled = new RegExp(token, "g");
    this.params[token] = function(str) {
        return str.replace(compiled, matcher.source || matcher);
    };
};

Router.prototype.on = Router.prototype.route = function(method, path, route) {
    var self = this;
    if (!route && typeof path == "function") {
        route = path;
        path = method;
        method = "on";
    }
    if (Array.isArray(path)) {
        return path.forEach(function(p) {
            self.on(method, p, route);
        });
    }
    if (path.source) {
        path = path.source.replace(/\\\//ig, "/");
    }
    if (Array.isArray(method)) {
        return method.forEach(function(m) {
            self.on(m.toLowerCase(), path, route);
        });
    }
    this.insert(method, this.scope.concat(path.split(new RegExp(this.delimiter))), route);
};

Router.prototype.dispatch = function(method, path, callback) {
    var self = this, 
			url = path.split("?", 1)[0],
			fns = this.traverse(method, url, this.routes, ''),
			invoked = this._invoked, 
			after;
    this._invoked = true;
    if (!fns || fns.length === 0) {
        this.last = [];
        if (typeof this.notfound === "function") {
            this.invoke([ this.notfound ], {
                method: method,
                path: path
            }, callback);
        }
        return false;
    }
    if (this.recurse === "forward") {
        fns = fns.reverse();
    }
    function updateAndInvoke() {
        self.last = fns.after;
        self.invoke(self.runlist(fns), self, callback);
    }
    after = this.every && this.every.after ? [ this.every.after ].concat(this.last) : [ this.last ];
    if (after && after.length > 0 && invoked) {
        if (this.async) {
            this.invoke(after, this, updateAndInvoke);
        } else {
            this.invoke(after, this);
            updateAndInvoke();
        }
        return true;
    }
    updateAndInvoke();
    return true;
};

Router.prototype.invoke = function(fns, thisArg, callback) {
    var self = this;
    if (this.async) {
        _asyncEverySeries(fns, function apply(fn, next) {
            if (Array.isArray(fn)) {
                return _asyncEverySeries(fn, apply, next);
            } else if (typeof fn == "function") {
                fn.apply(thisArg, fns.captures.concat(next));
            }
        }, function() {
            if (callback) {
                callback.apply(thisArg, arguments);
            }
        });
    } else {
        _every(fns, function apply(fn) {
            if (Array.isArray(fn)) {
                return _every(fn, apply);
            } else if (typeof fn === "function") {
                if ( fns.captures )
                    return fn.apply(thisArg, fns.captures);
                else
                    return null;
            } else if (typeof fn === "string" && self.resource) {
                self.resource[fn].apply(thisArg, fns.captures || null);
            }
        });
    }
};

Router.prototype.traverse = function(method, path, routes, regexp) {
    var fns = [], current, exact, match, next, that;
    if (path === this.delimiter && routes[method]) {
        next = [ [ routes.before, routes[method] ].filter(Boolean) ];
        next.after = [ routes.after ].filter(Boolean);
        next.matched = true;
        next.captures = [];
        return next;
    }
    for (var r in routes) {
        if (routes.hasOwnProperty(r) && (!this._methods[r] || this._methods[r] && typeof routes[r] === "object" && !Array.isArray(routes[r]))) {
            current = exact = regexp + this.delimiter + r;
            if (!this.strict) {
                exact += "[" + this.delimiter + "]?";
            }
            match = path.match(new RegExp("^" + exact));
            if (!match) {
                continue;
            }
            if (match[0] && match[0] == path && routes[r][method]) {
                next = [ [ routes[r].before, routes[r][method] ].filter(Boolean) ];
                next.after = [ routes[r].after ].filter(Boolean);
                next.matched = true;
                next.captures = match.slice(1);
                if (this.recurse && routes === this.routes) {
                    next.push([ routes["before"], routes["on"] ].filter(Boolean));
                    next.after = next.after.concat([ routes["after"] ].filter(Boolean));
                }
                return next;
            }
            next = this.traverse(method, path, routes[r], current);
            if (next.matched) {
                if (next.length > 0) {
                    fns = fns.concat(next);
                }
                if (this.recurse) {
                    fns.push([ routes[r].before, routes[r].on ].filter(Boolean));
                    next.after = next.after.concat([ routes[r].after ].filter(Boolean));
                    if (routes === this.routes) {
                        fns.push([ routes["before"], routes["on"] ].filter(Boolean));
                        next.after = next.after.concat([ routes["after"] ].filter(Boolean));
                    }
                }
                fns.matched = true;
                fns.captures = next.captures;
                fns.after = next.after;
                return fns;
            }
        }
    }
    return false;
};

Router.prototype.insert = function(method, path, route, parent) {
    var methodType, parentType, isArray, nested, part;
    path = path.filter(function(p) {
        return p && p.length > 0;
    });
    parent = parent || this.routes;
    part = path.shift();
    if (/\:|\*/.test(part) && !/\\d|\\w/.test(part)) {
        part = regifyString(part, this.params);
    }
    if (path.length > 0) {
        parent[part] = parent[part] || {};
        return this.insert(method, path, route, parent[part]);
    }
    if (!part && !path.length && parent === this.routes) {
        methodType = typeof parent[method];
        switch (methodType) {
          case "function":
            parent[method] = [ parent[method], route ];
            return;
          case "object":
            parent[method].push(route);
            return;
          case "undefined":
            parent[method] = route;
            return;
        }
        return;
    }
    parentType = typeof parent[part];
    isArray = Array.isArray(parent[part]);
    if (parent[part] && !isArray && parentType == "object") {
        methodType = typeof parent[part][method];
        switch (methodType) {
          case "function":
            parent[part][method] = [ parent[part][method], route ];
            return;
          case "object":
            parent[part][method].push(route);
            return;
          case "undefined":
            parent[part][method] = route;
            return;
        }
    } else if (parentType == "undefined") {
        nested = {};
        nested[method] = route;
        parent[part] = nested;
        return;
    }
    throw new Error("Invalid route context: " + parentType);
};



Router.prototype.extend = function(methods) {
    var self = this, len = methods.length, i;
    for (i = 0; i < len; i++) {
        (function(method) {
            self._methods[method] = true;
            self[method] = function() {
                var extra = arguments.length === 1 ? [ method, "" ] : [ method ];
                self.on.apply(self, extra.concat(Array.prototype.slice.call(arguments)));
            };
        })(methods[i]);
    }
};

Router.prototype.runlist = function(fns) {
    var runlist = this.every && this.every.before ? [ this.every.before ].concat(_flatten(fns)) : _flatten(fns);
    if (this.every && this.every.on) {
        runlist.push(this.every.on);
    }
    runlist.captures = fns.captures;
    runlist.source = fns.source;
    return runlist;
};

Router.prototype.mount = function(routes, path) {
    if (!routes || typeof routes !== "object" || Array.isArray(routes)) {
        return;
    }
    var self = this;
    path = path || [];
    if (!Array.isArray(path)) {
        path = path.split(self.delimiter);
    }
    function insertOrMount(route, local) {
        var rename = route, parts = route.split(self.delimiter), routeType = typeof routes[route], isRoute = parts[0] === "" || !self._methods[parts[0]], event = isRoute ? "on" : rename;
        if (isRoute) {
            rename = rename.slice((rename.match(new RegExp(self.delimiter)) || [ "" ])[0].length);
            parts.shift();
        }
        if (isRoute && routeType === "object" && !Array.isArray(routes[route])) {
            local = local.concat(parts);
            self.mount(routes[route], local);
            return;
        }
        if (isRoute) {
            local = local.concat(rename.split(self.delimiter));
        }
        self.insert(event, local, routes[route]);
    }
    for (var route in routes) {
        if (routes.hasOwnProperty(route)) {
            insertOrMount(route, path.slice(0));
        }
    }
};



}(typeof process !== "undefined" && process.title ? module : window));
;
(function(a,b){if(typeof define==="function"&&define.amd){define("tappable",[],function(){b(a,window.document);return a.tappable})}else{b(a,window.document)}})(this,function(a,b){var c=Math.abs,d=function(){},e={noScroll:false,activeClass:"tappable-active",onTap:d,onStart:d,onMove:d,onMoveOut:d,onMoveIn:d,onEnd:d,onCancel:d,allowClick:false,boundMargin:50,noScrollDelay:0,activeClassDelay:0,inactiveClassDelay:0},f="ontouchend"in document,g={start:f?"touchstart":"mousedown",move:f?"touchmove":"mousemove",end:f?"touchend":"mouseup"},h=function(a,c){var d=b.elementFromPoint(a,c);if(d.nodeType==3)d=d.parentNode;return d},i=function(a){var b=a.target;if(b)return b;var c=a.targetTouches[0];return h(c.clientX,c.clientY)},j=function(a){return a.replace(/\s+/g," ").replace(/^\s+|\s+$/g,"")},k=function(a,b){if(!b)return;if(a.classList){a.classList.add(b);return}if(j(a.className).indexOf(b)>-1)return;a.className=j(a.className+" "+b)},l=function(a,b){if(!b)return;if(a.classList){a.classList.remove(b);return}a.className=a.className.replace(new RegExp("(^|\\s)"+b+"(?:\\s|$)"),"$1")},m=function(a,c){var d=b.documentElement,e=d.matchesSelector||d.mozMatchesSelector||d.webkitMatchesSelector||d.msMatchesSelector;return e.call(a,c)},n=function(a,b){var c=false;do{c=m(a,b)}while(!c&&(a=a.parentNode)&&a.ownerDocument);return c?a:false};a.tappable=function(a,c){if(typeof c=="function")c={onTap:c};var d={};for(var f in e)d[f]=c[f]||e[f];var j=d.containerElement||b.body,m,o,p,q,r,s=false,t=false,u=d.activeClass,v=d.activeClassDelay,w,x=d.inactiveClassDelay,y,z=d.noScroll,A=d.noScrollDelay,B,C=d.boundMargin;j.addEventListener(g.start,function(b){var c=n(i(b),a);if(!c)return;if(v){clearTimeout(w);w=setTimeout(function(){k(c,u)},v)}else{k(c,u)}if(x&&c==o)clearTimeout(y);p=b.clientX;q=b.clientY;if(!p||!q){var e=b.targetTouches[0];p=e.clientX;q=e.clientY}m=c;s=false;t=false;r=z?c.getBoundingClientRect():null;if(A){clearTimeout(B);z=false;B=setTimeout(function(){z=true},A)}d.onStart.call(j,b,c)},false);j.addEventListener(g.move,function(a){if(!m)return;if(z){a.preventDefault()}else{clearTimeout(w)}var b=a.target,c=a.clientX,e=a.clientY;if(!b||!c||!e){var f=a.changedTouches[0];if(!c)c=f.clientX;if(!e)e=f.clientY;if(!b)b=h(c,e)}if(z){if(c>r.left-C&&c<r.right+C&&e>r.top-C&&e<r.bottom+C){t=false;k(m,u);d.onMoveIn.call(j,a,b)}else{t=true;l(m,u);d.onMoveOut.call(j,a,b)}}else if(!s){s=true;l(m,u);d.onCancel.call(b,a)}d.onMove.call(j,a,b)},false);j.addEventListener(g.end,function(a){if(!m)return;clearTimeout(w);if(x){if(v&&!s)k(m,u);var b=m;y=setTimeout(function(){l(b,u)},x)}else{l(m,u)}d.onEnd.call(j,a,m);var c=a.which==3||a.button==2;if(!s&&!t&&!c){var e=m;setTimeout(function(){d.onTap.call(j,a,e)},1)}o=m;m=null;setTimeout(function(){p=q=null},400)},false);j.addEventListener("touchcancel",function(a){if(!m)return;l(m,u);m=p=q=null;d.onCancel.call(j,a)},false);if(!d.allowClick)j.addEventListener("click",function(b){var c=n(b.target,a);if(c){b.preventDefault()}else if(p&&q&&Math.abs(b.clientX-p)<25&&Math.abs(b.clientY-q)<25){b.stopPropagation();b.preventDefault()}},false)}});
jQuery( function ( $ ) {
	/**
	 * Handle the execution of Web intents.
	 *
	 * WordPress.com is registered for several intents via the Chrome
	 * Web app. All intents currently point to URLs of the form
	 * http://wordpress.com/#!/intent/[type]/  It is important to only
	 * handle intents on these URLs because the intent data is persistent
	 * until intent.postResult() is called, but we don't always want
	 * to call postResult(), because it will close our window and return
	 * the user to the site that triggered the intent (which is still open
	 * in another tab).
	 *
	 * @see http://webintents.org/
	 */

	var wpcom_intents = {
		intent : null,

		init : function () {
			if ( ! document.location.hash.match( /^#!\/intent\// ) )
				return;

			this.intent = window.intent || window.webkitIntent;

			if ( ! this.intent ) {
				document.location.href = '/';
				return;
			}

			if ( this.intent.action in this.handlers ) {
				new Image().src = document.location.protocol + '//stats.wordpress.com/g.gif?v=wpcom-no-pv&x_web-intents=' + encodeURIComponent( this.intent.action ) + '&baba='+Math.random();

				if ( ! this.handlers[this.intent.action]( this.intent ) ) {
					document.location.href = '/';
					return;
				};
			}
		},

		handlers : {
			'http://webintents.org/view' : function ( intent ) {
				// 'view' is supposed to be for things like viewing non-Webby
				// files via a Web service, but Chrome decided to use 'view'
				// as the intent that gets called when a user visits an RSS
				// feed in the browser. We treat it like 'subscribe'.
				return this['http://webintents.org/subscribe']( intent );
			},
			'http://webintents.org/subscribe' : function ( intent ) {
				var url = intent.getExtra( 'url' );

				if ( ! url )
					url = intent.data;

				if ( ! url )
					return false;

				var follow_nonce = $( 'input#subs' ).val();

				$.get( '/wp-admin/admin-ajax.php?action=subscribe_to_blog&blog_url=' + encodeURIComponent( url ) + '&_wpnonce=' + encodeURIComponent( follow_nonce ), function ( data ) {
					if ( data.indexOf( '-1' ) == 0 ) {
						// Error.
						alert( data.substr( 2 ) );
					}

					document.location.href = '/#!/read/edit/';
				} );

				return true;
			},
			'http://webintents.org/share' : function ( intent ) {
				new Image().src = document.location.protocol + '//stats.wordpress.com/g.gif?v=wpcom-no-pv&x_web-intent-share-types=' + encodeURIComponent( intent.type ) + '&baba='+Math.random();

				wpcom.addAction( 'ipt_published_post_rendered.intents', function () {
					// We should return the URL of the published post.
					// Note that this call will close our window.
					intent.postResult( true );
				} );

				wpcom.addAction( 'aside_box_loaded.intents', function () {
					if ( 'text/uri-list' == intent.type ) {
						// Post a Link
						$( '#ipt-link-url input' ).val( intent.data );
						instapost.post_format_select( $( '#ipt-form-format-link' ) );
					}
					else if ( intent.type.match( /^image\// ) ) {
						// Post a Photo
						$( '#ipt-image-url' ).val( intent.data );
						instapost.post_format_select( $( '#ipt-form-format-image' ) );
						instapost.switch_upload_type( $( '#ipt-upload-image-via-file .ipt-switch-upload-zone' ) );
					}
					else if ( intent.type.match( /^video\// ) ) {
						// Post a Video
						$( '#ipt-video-url' ).val( intent.data );
						instapost.post_format_select( $( '#ipt-form-format-video' ) );
					}
					else if ( intent.type.match( /^text\// ) ) {
						// Write a Post
						tinymce.get( 'ipteditor' ).execCommand( 'mceInsertContent', false, intent.data );
					}
				} );

				document.location.hash = '!/post/';

				return true;
			}
		}
	};

	wpcom_intents.init();
} );
;
( function( $ ) {

var jqxhr = false;

var wpcom_ls = {
	set: function( key, val ) { return localStorage.setItem( key + localstorageHash, val ); },
	get: function( key ) { return localStorage.getItem( key + localstorageHash ); },
	remove: function( key ) { return localStorage.removeItem( key + localstorageHash ); }
};

var wpcom_newdash = {
	router: false,
	request: false,
	active_tab: false,
	last_query_id: false,
	loaded_template: false,
	ua: navigator.userAgent.toLowerCase(),

	init: function() {
		this.unload(); // Unbind any previous bindings.
		
		// Init global actions
		wpcom_newdash_actions.init();

		// Init router and bind the routes
		this.router = Router( this.routes ).configure({
			strict: false,
			recurse: 'forward',

			before: function() {
				var route = this.getRoute(), tab = route[1];

				// Unload and reset infiniscroll and new post checks.
				wpcom_reader.unload();
				
				// Fire actions
				wpcom.doAction( 'newdash_click_tab', tab );
				wpcom.doAction( 'newdash_tab_clicked', wpcom_newdash.active_tab, tab );
				wpcom_newdash.active_tab = tab;

				// Make sure the nav is visible.
				$( 'ul#homenav' ).show();
			},

			on: function() {
				var route = this.getRoute(), tab = route[1];
			
				// On valid route save the last page visited.
				wpcom_ls.set( 'wpcom_last_page_visited', location.hash.replace( /my-stats\/.*/, 'my-stats/' ) );				

				// Bump Quantcast stat for tab page view
				wpcom_newdash.quantcast( tab );
								
				// Reset the page title
				document.title = wpcom_new_posts_notify.initial_page_title;
				
				// Fade the footer back in if it's hidden
				if ( ( 'read' != tab && 'welcome' != tab ) && $( '#footer' ).is( ':hidden' ) )
					$( '#footer' ).fadeIn();
			},

			notfound: function(){
				// When page not found redirect to the reader.
				location.hash = '#!/read/following/';
			}
		}).init( this.last_route() );
		
		// Set up tab tips
		wpcom_newdash.setup_tab_tips();
	},
	
	last_route: function() {
		if ( window.location.pathname == '/' )
			return wpcom_ls.get( 'wpcom_last_page_visited' ) || '#!/read/following/';
	},

	routes: {
		/*********************
		* Newdash Tabs
		*/
		'/post/': {
			on: function() {
				wpcom_newdash.highlight_tab( 'post' );
				wpcom_newdash.bump_stat( 'newdash_visits', 'post' );
				
				wpcom_newdash.load_template( { template: 'post.php' } );
			}
		},
		
		'/notifications/': function() {
			wpcom_newdash.highlight_tab( 'notifications' );
			wpcom_newdash.bump_stat( 'newdash_visits', 'notifications' );
			
			wpcom_newdash.load_template( { template: 'notifications.php', callback: function() {
				wpcom_my_notifications_tab.init();
				
				// Fade out the footer because of infiniscroll.
				$( '#footer' ).fadeOut();
			} } );
		},
		
		'/my-stats/': {
			on: function() {
				wpcom_newdash.highlight_tab( 'my-stats' );
				var query = window.location.hash;

				if ( -1 == query.indexOf( '?' ) )
					query = '';
				else
					query = query.replace( /^[^?]*\?/, '' );

				var statsJsLoaded = wpcom_newdash.statsJsLoaded || false;
				if ( ! wpcom_newdash.statsJsLoaded ) {
					// load the stats tab's javascript that should run before the page is fetched
					var statsJs = [
						'/wp-admin/js/postbox.js',
						'/wp-includes/js/jquery/ui/jquery.ui.sortable.min.js',
						'/wp-content/admin-plugins/blog-stats/jquery.sparkline.min.js',
						'/wp-content/js/select2/select2.js?2012-06-19',
						'/wp-content/admin-plugins/blog-stats/blog-stats-async.js?20120827'
					];

					wpcom_newdash.showStatsTab = function( query ) {
						wpcom_newdash.load_template({ template: 'my-stats.php', query: query, callback: function() {
							$(document).on( 'wpcom_tab_loaded.stats', function() {
								$(document).off( 'wpcom_tab_loaded.stats' );
								if ( 'my-stats' == wpcom_newdash.active_tab ) {
									$(window).trigger( 'wpcomStatsActivate', [ query, wpcom_newdash ] );
								}
							});
						}});
					};

					var loadedScripts = 0;
					for ( var i = 0; i < statsJs.length; i++ ) {
						$.getScript( statsJs[i], function() {
							if ( ++loadedScripts >= statsJs.length ) {
								wpcom_newdash.statsJsLoaded = true;
								wpcom_newdash.showStatsTab( query );
							}
						});
					}
				}
				else {
					wpcom_newdash.showStatsTab( query );
				}
			},
			
			after: function() {
				if ( typeof tooltip == 'object' && tooltip )
					tooltip.remove();
			}
		},
		
		'/my-blogs/': function() {
			wpcom_newdash.highlight_tab( 'my-blogs' );
			wpcom_newdash.bump_stat( 'newdash_visits', 'my_blogs' );

			wpcom_newdash.load_template( { template: 'my-blogs.php' } );
		},

		'/upgrade/': function() {
			wpcom_newdash.highlight_tab( 'upgrade' );
			wpcom_newdash.load_template( { template: 'upgrade.php', callback: function() {
				wpcom_newdash.bump_stat( 'newdash_visits', 'upgrade' );
			} } );
		},
		
		'/fresh/': function() {
			wpcom_newdash.highlight_tab( 'fresh' );
			wpcom_newdash.bump_stat( 'newdash_visits', 'fresh' );
			
			wpcom_newdash.load_template( { template: 'fresh.php' } );
		},
		
		'/settings/': function() {
			wpcom_newdash.highlight_tab( 'settings' );
			wpcom_newdash.bump_stat( 'newdash_visits', 'settings' );

			wpcom_newdash.load_template( { template: 'settings.php', callback: function() {
				wpcom_my_settings.init();
			} } );
		},
		
		'/welcome/': {
			on: function() {
				// Check the route. If we have defined a step then load the step template.
				setTimeout( function() {
					var route = wpcom_newdash.router.getRoute();

					if ( !route[2] ) {
						wpcom_newdash.highlight_tab( 'welcome' );
						wpcom_newdash.bump_stat( 'newdash_visits', 'welcome' );
						
						wpcom_newdash.load_template( { template: 'welcome.php' } );					
					} else {
						$( '#footer' ).fadeOut(); // Hide the footer on NUX.
					}

				}, 10 );
			},
	
			'/step/': {
				on: function() {
					var self = this, timeout = null;
					
					$( 'ul#homenav, #wpadminbar' ).hide();
					$( 'body' ).addClass( 'noadminbar' );

					$(window).off( 'resize.nux' ).on( 'resize.nux', function() {
						clearTimeout( self.timeout );
						self.timeout = setTimeout( function() {
							wpcom_newdash.maximize_viewport_height();
						}, 10 );
					});
				},
				
				// Routes for auto-calculation of next and prev step.
				'/next/': function() {
					wpcom_newdash_nux.change_step( 'next' );
				},
				
				'/prev/': function() {
					wpcom_newdash_nux.change_step( 'prev' );
				},

				'/follow/': function() {
					// On the first step check if we are on mobile and remove the customize step.
					if ( wpcom_newdash.ua.indexOf('mobile') > -1 )
						wpcom_newdash_nux.steps.splice( $.inArray( 'customize', wpcom_newdash_nux.steps ), 1 );

					wpcom_newdash_nux.render_step( { 'step': 'follow' } );
				},

				'/connect/': function() {
					wpcom_newdash_nux.render_step( { 'step': 'connect' } );
				},

				'/name/': function() {
					wpcom_newdash_nux.render_step( { 'step': 'name' } );
				},

				'/theme/': function() {
					if ( $( 'body' ).hasClass( 'no-theme-picker' ) )
						document.location.hash = '#!/welcome/step/customize/';
					else
						wpcom_newdash_nux.render_step( { 'step': 'theme' } );
				},

				'/customize/': {
					on: function() {
						setTimeout( function() {
							var route = wpcom_newdash.router.getRoute();

							if ( !route[4] )
								wpcom_newdash_nux.render_step( { 'step': 'customize' } );
						}, 10 );
					},
					
					'/:action/': function( action ) {
						wpcom_newdash_nux.close_cusomizer( action );
					}	
				},

				'/purchase/': function() {
					if ( wpcom_newdash_nux.theme_purchase_url )
						wpcom_newdash_nux.render_step( { 'step': 'purchase' } );
					else
						location.hash = '#!/welcome/step/post/';
				},

				'/post/': function() {
					wpcom_newdash_nux.render_step( { 'step': 'post' } );
				},

				'/read/': function() {
					wpcom_newdash_nux.render_step( { 'step': 'read' } );
				}
			}
		},

		// TODO: Move the functionality of each route into the reader class.
		'/read/': {
			on: function() {
				wpcom_reader.hide_loading();

				if ( wpcom_newdash.is_tab_loaded( 'read' ) )
					return;

				wpcom_newdash.highlight_tab( 'read' );
				wpcom_newdash.bump_stat( 'newdash_visits', 'read' );
				wpcom_newdash.load_template( { template: 'read.php' } );
				
				// Fade out the footer because of infiniscroll.
				$( '#footer' ).fadeOut();
				
				// Init the reader class.
				wpcom_reader.init();
				
				// Check the route and make sure we have a /read/ subroute set.
				setTimeout( function() {
					var route = wpcom_newdash.router.getRoute();

					if ( !route[2] )
						location.hash = '#!/read/following/';
				}, 10 );
			},

			'/following/': function() {
				wpcom_reader.render_page( { 'page': 'following' } );
			},

			'/find-friends/': function() {
				wpcom_reader.select_menu_item( 'find-friends' );
				wpcom_reader.show_loading( 'find-friends' );
				
				wpcom_newdash.load_template( { template: 'reader/find-friends.php', target: 'div#reader-content', callback: function() {
					wpcom_friend_finder.init();

					wpcom_reader.hide_loading();
					wpcom_newdash.bump_stat( 'reader_views', 'find_friends_load' );
				} } );
			},

			'/recommendations/': function() {
				wpcom_reader.select_menu_item( 'recommendations' );
				wpcom_reader.show_loading( 'recommendations' );

				wpcom_newdash.load_template( { template: 'reader/recommendations.php', target: 'div#reader-content', callback: function() {
					wpcom_reader_recommendations.init();
				
					wpcom_reader.hide_loading();
					wpcom_newdash.bump_stat( 'reader_views', 'recommendations_load' );
				} } );
			},

			'/likes/': function() {
				wpcom_reader.select_menu_item( 'postlike' );
				wpcom_reader.show_loading( 'postlike' );

				$.when(
					wpcom_reader.get_posts( { type: 'postlike' } )
				).then( function( response ) {
					var html = wpcom_newdash_renderer.markupHeader( response.title ) + wpcom_newdash_renderer.markupPosts( response.posts );
					wpcom_reader_ts.set( 'before', 'postlike', response.before_ts );
					
					$( 'div#reader-content' ).html( html );
					wpcom_infinite_scroll.init( 'postlike' );
					
					wpcom_reader.hide_loading();
					wpcom_newdash.bump_stat( 'reader_views', 'postlike_load' );
				} );
			},
			
			'/a8c/': function() {
				wpcom_reader.select_menu_item( 'a8c' );
				wpcom_reader.show_loading( 'a8c' );

				$.when(
					wpcom_reader.get_posts( { type: 'a8c' } )
				).then( function( response ) {
					var html = wpcom_newdash_renderer.markupHeader( response.title ) + wpcom_newdash_renderer.markupPosts( response.posts );
					wpcom_reader_ts.set( 'before', 'a8c', response.before_ts );
					
					$( 'div#reader-content' ).html( html );
					wpcom_infinite_scroll.init( 'a8c' );
					wpcom_new_posts_notify.init( 'a8c' );
					
					wpcom_reader.hide_loading();
					wpcom_newdash.bump_stat( 'reader_views', 'a8c_load' );
				} );
			},

			'/topics/': function() {
				wpcom_reader.select_menu_item( 'topics' );
				wpcom_reader.show_loading( 'topics' );

				wpcom_newdash.load_template( { template: 'reader/topic-cloud.php', target: 'div#reader-content', callback: function() {
					wpcom_topic_cloud_and_search.init();

					wpcom_reader.hide_loading();
					wpcom_newdash.bump_stat( 'reader_views', 'explore_topics_load' );
				} } );
			},

			'/topic/': {
				'/:slug/': {
					on: function( slug ) {
						wpcom_reader.select_menu_item( 'topic-' + slug );
						wpcom_reader.show_loading( 'topic-' + slug );
				
						$.when(
							wpcom_reader.get_posts( { type: 'topic', slug: slug } )
						).then( function( response ) {
							var html = wpcom_newdash_renderer.markupTopicHeader( response.title, slug, response.is_following ) + wpcom_newdash_renderer.markupPosts( response.posts );
							wpcom_reader_ts.set( 'before', 'topic', response.before_ts );
							
							$( 'div#reader-content' ).html( html );
							
							wpcom_infinite_scroll.init( 'topic', slug );
							wpcom_new_posts_notify.init( 'topic', slug );
							
							wpcom_reader.hide_loading();
							wpcom_newdash.bump_stat( 'reader_views', 'topic_load' );
						} );
					}
				}
			},
			
			'/fp/': {
				'/:filter/': {
					on: function( filter ) {
						wpcom_reader.select_menu_item( 'fp-' + filter );
						wpcom_reader.show_loading( 'fp-' + filter );
				
						$.when(
							wpcom_reader.get_posts( { type: 'fp', slug: filter } )
						).then( function( response ) {
							var html = wpcom_newdash_renderer.markupHeader( response.title ) + wpcom_newdash_renderer.markupPosts( response.posts );
							wpcom_reader_ts.set( 'before', 'fp', response.before_ts );
							
							$( 'div#reader-content' ).html( html );
							
							wpcom_infinite_scroll.init( 'fp', filter );
							wpcom_new_posts_notify.init( 'fp', filter );
							
							wpcom_reader.hide_loading();
							wpcom_newdash.bump_stat( 'reader_views', 'fp_load' );
						} );
					}
				}
			},
			
			'/edit/': function() {
				wpcom_reader.show_loading( 'following' );
				
				wpcom_newdash.load_template( { template: 'reader/edit-following.php', target: 'div#reader-content', callback: function() {
					wpcom_reader_manage.init();
					wpcom_reader.hide_loading();
				} } );
			},
			
			'/subsettings/': function() {
				wpcom_newdash.load_template( { template: 'reader/settings.php', target: 'div#reader-content', callback: function() {
					wpcom_reader_global_settings.init();
				} } );
			},

			'/blog/': {
				'/id/': {
					'/:blog_id/': {
						on: function( blog_id ) {
							wpcom_reader.select_menu_item();
							window.scrollTo( 0, 1 );

							$.when(
								wpcom_reader.get_posts( { type: 'blog', blog_id: blog_id } )
							).then( function( response ) {
								var html = wpcom_newdash_renderer.markupBlogHeader( response.blog_title, blog_id, 0, response.blog_url, response.blog_description, response.blog_avatar, response.follower_count, response.is_following ) + wpcom_newdash_renderer.markupPosts( response.posts );
								wpcom_reader_ts.set( 'before', 'blog', response.before_ts );

								$( 'div#reader-content' ).html( html );

								wpcom_infinite_scroll.init( 'blog', '', blog_id );
								wpcom_new_posts_notify.init( 'blog', '', blog_id );

								wpcom_reader.hide_loading();
								wpcom_newdash.bump_stat( 'reader_views', 'blog_load' );
							} );
						}
					}
				},
				'/feed/': {
					'/:feed_id/': {
						on: function( feed_id ) {
							wpcom_reader.select_menu_item();
							window.scrollTo( 0, 1 );

							$.when(
								wpcom_reader.get_posts( { type: 'blog', feed_id: feed_id } )
							).then( function( response ) {
								var html = wpcom_newdash_renderer.markupBlogHeader( response.blog_title, 0, feed_id, response.blog_url, response.blog_description, response.blog_avatar, response.follower_count, response.is_following ) + wpcom_newdash_renderer.markupPosts( response.posts );
								wpcom_reader_ts.set( 'before', 'blog', response.before_ts );

								$( 'div#reader-content' ).html( html );

								wpcom_infinite_scroll.init( 'blog', '', 0, feed_id );
								wpcom_new_posts_notify.init( 'blog', '', 0, feed_id );

								wpcom_reader.hide_loading();
								wpcom_newdash.bump_stat( 'reader_views', 'blog_load' );
							} );
						}
					}
				}
			}

			// TODO: Look at implementing action routes /read/actions/follow/blog/ ...
		},

		/*********************
		* Deprecated routes - redirect to live routes
		*/
		'/my-notifications/': function() {
			location.hash = '#!/notifications/';
		},
		
		'/my-settings/': function() {
			location.hash = '#!/settings/';
		},
		
		'/topics/': function() {
			location.hash = '#!/read/topics/';
		},
		
		'/following/': function() {
			location.hash = '#!/read/';
		}
	},

	highlight_tab: function( tab ) {
		$( '#homenav-tips div' ).fadeOut( 'fast' );
		$( '#homenav li' ).removeClass( 'current' );
		$( 'li.' + tab, 'ul#homenav' ).addClass( 'current' );
		$( '#tab-content' ).addClass( 'loading' ).html( '<div class="loading" style="min-height:100px; width: 100%;"><h3 class="loading"><div class="offset">Loading</div></h3></div>' );
		$( 'h3.loading' ).spin( 'medium' );
	},
	
	load_template: function( args ) {
		args = typeof(args) != 'undefined' ? args : {};
		args.template = typeof(args.template) != 'undefined' ? args.template : false;
		args.tab = typeof(args.tab) != 'undefined' ? args.tab : false;
		args.target = typeof(args.target) != 'undefined' ? args.target : 'div#tab-content';
		args.do_insert = typeof(args.do_insert) != 'undefined' ? args.do_insert : true;
		args.callback = typeof(args.callback) != 'undefined' ? args.callback : false;
		args.query = typeof(args.query) != 'undefined' ? args.query : '';

		if ( document.location.search )
			args.query = args.query + document.location.search.replace(/^\?/, '&');

		// Set the last loaded template.
		wpcom_newdash.loaded_template = args.template;
		
		// Check for cached version of page, load it if so.
		var cached_html = wpcom_ls.get( 'wpcom_template_' + args.template + args.query + '_content' ),
			no_cache = $.inArray( args.template, [ 
				'fresh.php',
				'my-stats.php',
				'reader/settings.php', 
				'reader/edit-following.php',
				'settings.php',
				'welcome/nux-frame.php',
				'welcome/follow.php',
				'welcome/connect.php',
				'welcome/name.php',
				'welcome/theme.php',
				'welcome/customize.php',
				'welcome/purchase.php',
				'welcome/post.php',
				'welcome/read.php',
				'tabs/upgrade.php'
			] );

		// Display the cached version if it exists.
		if ( null !== cached_html && -1 == no_cache ) {
			if ( args.do_insert )
				wpcom_newdash.insert_template( { content: cached_html, target: args.target, callback: args.callback } );
		}

		// Fetch a live version, and also update the cached version of the template.
		var ajax_url = '/wp-admin/admin-ajax.php', query_id = Math.random();
		wpcom_newdash.last_query_id = query_id;
		
		if ( '' !== args.query )
			ajax_url += '?' + args.query;

		wpcom_newdash.request = $.ajax( {
			url: ajax_url,
			type: 'GET',
			data: {
				'action': 'wpcom_load_template',
				'template': args.template
			},
			cache: false,  //yes we really do need this! IE FTW!
			success: function( html ) {
				if ( -1 == no_cache )
					wpcom_ls.set( 'wpcom_template_' + args.template + '_content', html );

				// TODO: This breaks multiple loading of templates at once. Limiting to stats for now. // don't insert html if the rand query id doesn't match the most recent one.
				if ( 'my-stats.php' == args.template && !wpcom_newdash.is_last_query( query_id ) )
					return;

				// If there was no cached version to display then render the response to the page.
				if ( ( null === cached_html || no_cache >= 0 ) && args.do_insert )
					wpcom_newdash.insert_template( { content: html, target: args.target, callback: args.callback } );
			}
		} );
	},
	
	insert_template: function( args ) {
		args = typeof(args) != 'undefined' ? args : {};
		args.content = typeof(args.content) != 'undefined' ? args.content : false;
		args.target = typeof(args.target) != 'undefined' ? args.target : 'div#tab-content';
		args.callback = typeof(args.callback) != 'undefined' ? args.callback : false;

		if ( !$( args.target ) )
			return false;

		$( args.target ).html( args.content ).fadeIn( 'fast', function() {
			wpcom.doAction( 'newdash_tab_loaded', wpcom_newdash.active_tab );
			if ( typeof args.callback == 'function' ) args.callback.call( this );
		} ).removeClass( 'loading' );
		
		if ( args.target == 'div#tab-content' ) {
			$(document).trigger( 'wpcom_tab_loaded' );
		}
	},

	is_tab_loaded: function( tab ) {
		if ( $( 'li.' + tab, 'ul#homenav' ).hasClass( 'current' ) )
			return true;
		
		return false;
	},

	is_last_query: function( query_id ) {
		return ( query_id === this.last_query_id );
	},

	setup_tab_tips: function() {
		if ( this.ua.indexOf('ipad') > -1 || this.ua.indexOf('iphone') > -1 )
			return false;

		$( '#homenav li' ).each( function () {
			$( this ).data( 'hover', false );
			$( '#homenav-tips div.tip-' + $( this ).attr( 'class' ).replace( ' current', '' ) ).data( 'hover', false );
		});

		$( '#homenav' ).on( 'mouseenter', 'li', function( e ) {
			e.stopPropagation();

			$( this ).data( 'hover', true );
			var self = this;
			var showTimeoutId = setTimeout( function () {
				var tab = $( self ).attr( 'class' ).replace( ' current', '' );
				var tab_w = $( self ).width();
				var tip = '#homenav-tips div.tip-' + tab;
				var offset = $( self ).offset();
				var top = ( offset.top + 33 - $( window ).scrollTop() ) + 'px';

				if ( 'settings' == tab || 'welcome' == tab ) {
					$( tip ).css( 'top', top ).css( 'right', ( $( 'html' ).width() - offset.left - 40 ) + 'px');
				} else {
					$( tip ).removeClass( 'bubble-left' );
					var tip_w = $( tip ).width() + parseInt( $( tip ).css( 'padding-left').replace( 'px', '' ), 10 ) + parseInt( $( tip ).css( 'padding-right' ).replace( 'px', '' ), 10 );
					var tip_l = offset.left - ( tip_w - tab_w ) / 2;

					if ( tip_l < 0 ) {
						tip_l = offset.left;
						$( tip ).addClass( 'bubble-left' );
					}
					$( tip ).css( 'top', top ).css( 'left', tip_l + 'px' );
				}

				$( tip ).fadeIn( 'fast' );
			}, 1000 );
			$( this ).data( 'showTimeoutId', showTimeoutId );
		});

		$( '#homenav' ).on( 'mouseleave', 'li', function( e ) {
			e.stopPropagation();

			$( this ).data( 'hover', false );

			var tab = $( this ).attr( 'class' ).replace( ' current', '' );
			var tip = '#homenav-tips div.tip-' + tab;
			clearTimeout( $( this ).data( 'showTimeoutId' ) );

			// small delay so mouseenter has a chance to run and set hover to true if the mouse is on the tip
			setTimeout( function () {
				if ( !$( tip ).data( 'hover' ) && !$( '#homenav li.' + tab ).data( 'hover' ) )
					$( tip ).fadeOut( 'fast' );
			}, 100);
		});

		$( '#homenav-tips' ).on( 'mouseenter', 'div', function( e ) {
			e.stopPropagation();

			$( this ).data( 'hover', true );
		});

		$( '#homenav-tips' ).on( 'mouseleave', 'div', function( e ) {
			e.stopPropagation();

			$( this ).data( 'hover', false );

			var tab = $( this ).attr( 'class' ).replace( ' current', '' ).replace( ' wpcom-bubble', '' ).replace( 'tip-', '' );
			var tip = '#homenav-tips div.tip-' + tab;

			// small delay so mouseenter has a chance to run and set hover to true if the mouse is back on the tab
			setTimeout( function () {
				if ( !$( '#homenav li.' + tab ).data( 'hover' ) && !$( tip ).data( 'hover' ) )
					$( tip ).fadeOut( 'fast' );
			}, 100);
		});
	},

	titleize: function( str ) {
		str = str.replace( '-', ' ' );
		return ( str + '' ).replace( /^([a-z])|\s+([a-z])/g, function ( $1 ) {
			return $1.toUpperCase();
		});
	},

	quantcast: function( tab ) {
		// Remove any previous quantcast pixel JS.
		$( 'script#quantcast-pixel' ).remove();
		
		$.get(
			'/wp-admin/admin-ajax.php',
			{ 'action': 'wpcom_newdash_quantcast_code', 'tab': tab },
			function( statcode ) {
				if ( 'infinite_scroll' == tab )
					$( 'div#reader-content div.sub:last-child' ).after( statcode );
				else
					$( 'body' ).append( statcode );
			}
		);
	},

	bump_stat: function( group, statname ) {
		// Accepted stats are whitelisted in the action function.
		$.post(
			'/wp-admin/admin-ajax.php',
			{ 'action': 'wpcom_bump_stat', 'nonce': $( 'input#newdash_nonce' ).val(), 'group': group, 'stat': statname }
		);
	},

	add_spinner: function( el, type ){
		// Remove any existing spinners
		$( '.spinner' ).parent().spin( false );

		// Make sure the element has a size before we add a spinner to it
		if( el.width() === 0 ) {
			setTimeout( function(){
				wpcom_newdash.add_spinner( el, type );
			}, 50 );
		} else {
			el.spin( type );
		}
	},
	
	maximize_viewport_height: function() {
		// Calculate the remaining height of the viewport.
		var offset = $('#tab-content').offset().top;
		
		// Add the height of the toolbar to the offset
		offset += $('#wpadminbar').height();
		
		// Take the offset off the viewport height
		var h = $(window).height() - offset;

		$('#tab-content').find('.tab').css( { 'min-height': h + 'px' } );		
	},

	abort_jqxhr: function() {
		if ( !jqxhr )
			return false;

		jqxhr.success = {};
		jqxhr.complete = {};
		jqxhr.abort();
		
		jqxhr = false;
	},

	unload: function() {
		$(document).off( 'click.wpcom_newdash', '#homenav li a, a.load-page' );
	},

	unix_timestamp: function(date) {
		return Math.round( date.getTime() / 1000 );
	}
};
$(document).ready( function() { wpcom_newdash.init(); });

/** WordPress.com Newdash Actions ***************************************/

var wpcom_newdash_actions = {
	init: function() {
		// Follow Blog -- a.follow
		$( 'div#tab-content' ).on( 'click', 'a.blog.follow', function(e) {
			e.preventDefault();

			// Get data vars
			var btn = $(this), data = btn.attr('href').split('/'), blog_id = data[5], nonce = data[6];
			
			// Replace with following button
			btn.replaceWith( wpcom_newdash_renderer.fetch( 'unfollow-blog-button', { blog_id: blog_id } ) );
			
			// TODO: Build in error handling.
			wpcom_newdash_actions.follow_blog( blog_id, nonce );
			
			// Clear the following posts cache
			wpcom_ls.remove( 'following_posts.latest' );
			
			// TODO: Show bubble.
		});

		// Unfollow Blog -- a.following
		$( 'div#tab-content' ).on( 'click', 'a.blog.following', function(e) {
			e.preventDefault();

			var btn = $(this), data = btn.attr('href').split('/'), blog_id = data[5], nonce = data[6];
			btn.replaceWith( wpcom_newdash_renderer.fetch( 'follow-blog-button', { blog_id: blog_id } ) );
			
			wpcom_newdash_actions.unfollow_blog( blog_id, nonce );
			wpcom_ls.remove( 'following_posts.latest' );
		});

		// Follow Feed -- a.follow
		$( 'div#tab-content' ).on( 'click', 'a.feed.follow', function(e) {
			e.preventDefault();

			// Get data vars
			var btn = $(this), data = btn.attr('href').split('/'), feed_id = data[5], nonce = data[6];
			
			// Replace with following button
			btn.replaceWith( wpcom_newdash_renderer.fetch( 'unfollow-feed-button', { feed_id: feed_id } ) );
			
			// TODO: Build in error handling.
			wpcom_newdash_actions.follow_feed( feed_id, nonce );
			
			// Clear the following posts cache
			wpcom_ls.remove( 'following_posts.latest' );

			// TODO: Show bubble.
		});

		// Unfollow Feed -- a.following
		$( 'div#tab-content' ).on( 'click', 'a.feed.following', function(e) {
			e.preventDefault();

			var btn = $(this), data = btn.attr('href').split('/'), feed_id = data[5], nonce = data[6];
			btn.replaceWith( wpcom_newdash_renderer.fetch( 'follow-feed-button', { feed_id: feed_id } ) );
			
			wpcom_newdash_actions.unfollow_feed( feed_id, nonce );
			wpcom_ls.remove( 'following_posts.latest' );
		});


		// Follow Topic -- a.topic.follow
		$( 'div#tab-content' ).on( 'click', 'a.topic.follow', function(e) {
			e.preventDefault();

			var btn = $(this), data = btn.attr('href').split('/'), slug = data[5], nonce = data[6];
			btn.replaceWith( wpcom_newdash_renderer.fetch( 'unfollow-topic-button', { slug: slug } ) );
			
			if ( 1 == $('div#welcome-nux').length ) {
				$('li#welcome-topic-entry-' + slug).removeClass('follow').addClass('following');
				wpcom_newdash.bump_stat( 'newdash_nux_topics_follow', slug );
			}

			$.when( wpcom_newdash_actions.follow_topic( slug, nonce ) ).then( function( response ) {
				if ( response.error )
					alert( response.error.message );
				else if ( 1 == $('ul.sidebar-topics').length )
					wpcom_reader.add_topic_to_sidebar( response.result );
			} );
		});

		// Unfollow Topic -- a.topic.unfollow
		$( 'div#tab-content' ).on( 'click', 'a.topic.following', function(e) {
			e.preventDefault();

			var btn = $(this), data = btn.attr('href').split('/'), slug = data[5], nonce = data[6];
			btn.replaceWith( wpcom_newdash_renderer.fetch( 'follow-topic-button', { slug: slug } ) );
			
			if ( 1 == $('div#welcome-nux').length ) {
				$('li#welcome-topic-entry-' + slug).removeClass('following').addClass('follow');
				wpcom_newdash.bump_stat( 'newdash_nux_topics_unfollow', slug );
			}

			$.when( wpcom_newdash_actions.unfollow_topic( slug, nonce ) ).then( function() {
				if ( 1 == $('ul.sidebar-topics').length )
					wpcom_reader.remove_topic_from_sidebar( slug );
			} );
		});
		
		// Like Post -- a.like
		$( 'div#tab-content' ).on( 'click', 'a.like', function(e) {
			e.preventDefault();
			
			var btn = $(this), data = btn.attr('href').split('/'), blog_id = data[5], post_id = data[6], nonce = data[7];
			btn.replaceWith( wpcom_newdash_renderer.fetch( 'unlike-post-button', { blog_id: blog_id, post_id: post_id, nonce: nonce } ) );

			wpcom_newdash_actions.like_post( blog_id, post_id, nonce );
		});

		// Unlike Post -- a.liked
		$( 'div#tab-content' ).on( 'click', 'a.liked', function(e) {
			e.preventDefault();
			
			var btn = $(this), data = btn.attr('href').split('/'), blog_id = data[5], post_id = data[6], nonce = data[7];
			btn.replaceWith( wpcom_newdash_renderer.fetch( 'like-post-button', { blog_id: blog_id, post_id: post_id, nonce: nonce } ) );

			wpcom_newdash_actions.unlike_post( blog_id, post_id, nonce );
		});

		$( 'div#tab-content' ).on( 'click', '#editorpicks div.pick a.story', function(e) {
			var ids = $( this ).children( 'span.picture' ).attr( 'id' ).replace( 'picture_', '' ).split( '_' );

			wpcom_newdash_actions.freshly_pressed_post_click( ids[0], ids[1] );
		});

		$( 'div#tab-content' ).on( 'click', '#editorpicks div.pick a.sub-button.topic', function(e) {
			wpcom_newdash.bump_stat( 'freshly_pressed_clicks', 'view_topic' );
		});

		if ( document.location.href.indexOf( 'theme=' ) != -1 )
			$( 'body' ).addClass( 'no-theme-picker' );
	},
	
	follow_blog: function( blog_id, nonce ) {
		wpcom_newdash.bump_stat( 'reader_actions', 'followed_blog' );
		if ( -1 != location.hash.search( '/read/topic' ) )
			wpcom_newdash.bump_stat( 'reader_follows', 'topic_page' );
		else if ( -1 != location.hash.search( '/read/blog' ) )
			wpcom_newdash.bump_stat( 'reader_follows', 'blog_page' );

		jqxhr = $.ajax( {
			type: 'POST',
			url: '/wp-admin/admin-ajax.php',
			data: {
				'action': 'ab_subscribe_to_blog',
				'_wpnonce': nonce,
				'blog_id': blog_id,
				'email_delivery': 'never',
				'source': 'newdash'
			}
		} );
		
		return jqxhr;
	},
	
	unfollow_blog: function( blog_id, nonce ) {
		wpcom_newdash.bump_stat( 'reader_actions', 'unfollowed_blog' );
		if ( -1 != location.hash.search( '/read/blog' ) )
			wpcom_newdash.bump_stat( 'reader_unfollows', 'blog_page' );

		jqxhr = $.ajax( {
			type: 'POST',
			url: '/wp-admin/admin-ajax.php',
			data: {
				'action': 'ab_unsubscribe_from_blog',
				'_wpnonce': nonce,
				'blog_id': blog_id,
				'email_delivery': 'never',
				'source': 'newdash'
			}
		} );
		
		return jqxhr;
	},

	follow_feed: function( feed_id, nonce ) {
		wpcom_newdash.bump_stat( 'reader_actions', 'followed_blog' );
		if ( -1 != location.hash.search( '/read/blog' ) )
			wpcom_newdash.bump_stat( 'reader_follows', 'blog_page' );

		jqxhr = $.ajax( {
			type: 'POST',
			url: '/wp-admin/admin-ajax.php',
			data: {
				'action': 'ab_subscribe_to_blog',
				'_wpnonce': nonce,
				'feed_id': feed_id,
				'email_delivery': 'never',
				'source': 'newdash'
			}
		} );
		
		return jqxhr;
	},
	
	unfollow_feed: function( feed_id, nonce ) {
		wpcom_newdash.bump_stat( 'reader_actions', 'unfollowed_blog' );
		if ( -1 != location.hash.search( '/read/blog' ) )
			wpcom_newdash.bump_stat( 'reader_unfollows', 'blog_page' );

		jqxhr = $.ajax( {
			type: 'POST',
			url: '/wp-admin/admin-ajax.php',
			data: {
				'action': 'ab_unsubscribe_from_blog',
				'_wpnonce': nonce,
				'feed_id': feed_id,
				'email_delivery': 'never',
				'source': 'newdash'
			}
		} );
		
		return jqxhr;
	},

	follow_topic: function( slug, nonce ) {
		wpcom_newdash.bump_stat( 'reader_actions', 'followed_topic' );

		jqxhr = $.ajax( {
			type: 'POST',
			url: '/wp-admin/admin-ajax.php',
			data: {
				'action': 'add_topic',
				'_wpnonce': nonce,
				'slug': slug
			},
			dataType: 'json'
		} );
		
		return jqxhr;
	},
	
	unfollow_topic: function( slug, nonce ) {
		wpcom_newdash.bump_stat( 'reader_actions', 'unfollowed_topic' );

		jqxhr = $.ajax( {
			type: 'POST',
			url: '/wp-admin/admin-ajax.php',
			data: {
				'action': 'remove_topic',
				'_wpnonce': nonce,
				'slug': slug
			}
		} );
		
		return jqxhr;
	},
		
	like_post: function( blog_id, post_id, nonce ) {
		wpcom_newdash.bump_stat( 'reader_actions', 'liked_post' );

		jqxhr = $.ajax( {
			type: 'POST',
			url: '/wp-admin/admin-ajax.php',
			data: {
				'action': 'like_it',
				'_wpnonce': nonce,
				'blog_id': blog_id,
				'post_id': post_id
			}
		} );
		
		return jqxhr;
	},
	
	unlike_post: function( blog_id, post_id, nonce ) {
		wpcom_newdash.bump_stat( 'reader_actions', 'unliked_post' );

		jqxhr = $.ajax( {
			type: 'POST',
			url: '/wp-admin/admin-ajax.php',
			data: {
				'action': 'unlike_it',
				'_wpnonce': nonce,
				'blog_id': blog_id,
				'post_id': post_id
			}
		} );
		
		return jqxhr;
	},
	
	show_bubble: function( parent_el, left, text ) {
		var pos = parent_el.offset();
		$( 'div.action-bubble' ).css( { left: left + 'px', top: ( pos.top + parent_el.height() + 5 ) + 'px' } );
		$( 'div.bubble-txt', 'div.action-bubble' ).html( text );
		$( 'div.action-bubble' ).addClass( 'fadein' );
		setTimeout( function() {
			$('body').on( 'click.bubble touchstart.bubble', function(e) {
				if ( !$(e.target).hasClass('action-bubble') && !$(e.target).parents( 'div.action-bubble' ).length )
					hideBubble();
			});
			$(document).on( 'scroll.bubble', hideBubble );
			setTimeout( hideBubble, 10000 );
		}, 500 );
	},

	freshly_pressed_post_click: function( blog_id, post_id ) {
		$.post(
			'/wp-admin/admin-ajax.php',
			{ 'action': 'wpcom_freshly_pressed_post_click', 'nonce': $( 'input#newdash_nonce' ).val(), 'blog_id': blog_id, 'post_id': post_id }
		);
	}
	
	// TODO: Move reblog action here.
};

/** WordPress.com Newdash Template Renderer ***************************************/

var wpcom_newdash_renderer = {
	cache: {},

	fetch: function( template, data ){
		var t = this.cache[template];

		if ( !t ) {
			if ( $.browser.msie && 8 == parseInt( $.browser.version, 10 ) )
				t = Hogan.compile( $( '#' + template + '-tmpl' ).html() );
			else
				t = Hogan.compile( $( '#' + template + '-tmpl' ).text() );				

			if ( !t )
				return false;
				
			this.cache[template] = t;
		}
		
		if ( !data )
			return t;

		return t.render( data );
	},
	
	markupHeader: function( title ) {
		return wpcom_newdash_renderer.fetch( 'post-header', { title: title } );
	},

	markupTopicHeader: function( title, slug, is_following ) {
		var button = '';
		
		if ( is_following )
			button = wpcom_newdash_renderer.fetch( 'unfollow-topic-button', { slug: slug } );
		else
			button = wpcom_newdash_renderer.fetch( 'follow-topic-button', { slug: slug } );
			
		return wpcom_newdash_renderer.fetch( 'post-header', { title: title, buttons: [ { follow: button } ] } );
	},

	markupBlogHeader: function( title, blog_id, feed_id, url, description, avatar, follower_count, is_following ) {
		var button = '';

		if ( feed_id > 0 ) {
			if ( is_following )
				button = wpcom_newdash_renderer.fetch( 'unfollow-feed-button', { feed_id: feed_id } );
			else
				button = wpcom_newdash_renderer.fetch( 'follow-feed-button', { feed_id: feed_id } );
		} else {
			if ( is_following )
				button = wpcom_newdash_renderer.fetch( 'unfollow-blog-button', { blog_id: blog_id } );
			else
				button = wpcom_newdash_renderer.fetch( 'follow-blog-button', { blog_id: blog_id } );
		}

		return wpcom_newdash_renderer.fetch( 'single-blog-header', { title: title, url: url, description: description, avatar: avatar, follower_count: follower_count, buttons: [ { follow: button } ] } );
	},

	markupPosts: function( posts ) {
		var html = '';

		$.each( posts, function( i, post ) {
			var buttons = [];

			if ( 'undefined' != typeof( post.is_liked ) ) {
				if ( !post.is_liked )
					buttons.push( { like: wpcom_newdash_renderer.fetch( 'like-post-button', { blog_id: post.blog_id, post_id: post.ID } ) } );
				else
					buttons.push( { like: wpcom_newdash_renderer.fetch( 'unlike-post-button', { blog_id: post.blog_id, post_id: post.ID } ) } );
			}
						
			if ( 'undefined' != typeof( post.is_following ) ) {
				if ( !post.is_following )
					buttons.push( { follow: wpcom_newdash_renderer.fetch( 'follow-blog-button', { blog_id: post.blog_id } ) } );
				else
					buttons.push( { follow: wpcom_newdash_renderer.fetch( 'unfollow-blog-button', { blog_id: post.blog_id } ) } );
			}

			if ( 'undefined' != typeof( post.is_reblogged ) ) {
				if ( !post.is_reblogged )
					buttons.push( { reblog: wpcom_newdash_renderer.fetch( 'reblog-post-button', { blog_id: post.blog_id, post_id: post.ID } ) } );
				else
					buttons.push( { reblog: wpcom_newdash_renderer.fetch( 'post-reblogged-button', { blog_id: post.blog_id, post_id: post.ID } ) } );
			}
			
			post.buttons = buttons;

			// Check the post format and render the correct template.
			if ( 'status' == post.post_format )
				post.post_format = 'aside';

			var post_format_templates = ['aside', 'image', 'link', 'p2', 'quote', 'standard', 'video'];
			if ( !post.post_format || $.inArray( post.post_format, post_format_templates ) )
				post.post_format = 'standard';


			var post_html = wpcom_newdash_renderer.fetch( post.post_format + '-post', post );

			html += post_html;
		} );

		return html;
	}
};

/** WordPress.com Reader ***************************************/

var wpcom_reader = {
	loading_timeout: false,
	
	init: function() {
		// Click reblog button on post
		$('div#tab-content').on( 'click.wpcom_reader', 'span.actions a.reblog', function(e) {
			e.preventDefault();
			wpcom_reader.show_reblog_box( $(this) );
		} );

		// Clicked reblog button on already reblogged post.
		$('div#tab-content').on( 'click.wpcom_reader', 'span.actions a.reblogged', function(e) {
			e.preventDefault();
		});

		// Click cancel reblog button
		$('div#tab-content').on( 'click.wpcom_reader', '#reblog-box a.cancel', function(e) {
			e.preventDefault();
			wpcom_reader.cancel_reblog( $(this) );
		});

		// Submit reblog box
		$('div#tab-content').on( 'click.wpcom_reader', '#reblog-box input[type=submit]', function(e) {
			e.preventDefault();
			wpcom_reader.submit_reblog( $(this) );
		});

		// Click the Enter a Topic textbox to type in a new topic.
		$('div#tab-content').on( 'focus.wpcom_reader', 'input#add-topic-text', function(e) {
			e.preventDefault();
			if ( 'Enter a topic...' == $(this).val() )
				$(this).val( '' );

			$( 'span.errortipwrap' ).fadeOut( 'fast' );
		});

		// Click away from the Enter a Topic textbox.
		$('div#tab-content').on( 'blur.wpcom_reader', 'input#add-topic-text', function(e) {
			e.preventDefault();
			if ( 'Enter a topic...' == $(this).val() || '' === $(this).val() ) {
				$(this).val( 'Enter a topic...' );
			}
		});

		// Click 'Add' to add a new topic
		$('div#tab-content').on( 'click.wpcom_reader', 'a.add-topic', function(e) {
			e.preventDefault();
			
			var slug = $( 'input#add-topic-text' ).val().toLowerCase().replace( ' ', '-' );
			$.when( wpcom_newdash_actions.follow_topic( slug, $(this).data('nonce') ) ).then( function( response ) {
				if ( response.error )
					alert( response.error.message );
				else {
					wpcom_reader.add_topic_to_sidebar( response.result );
					$( 'input#add-topic-text' ).val('').blur();
					location.hash = '#!/read/topic/' + slug + '/';
				}
			} );
		});

		// Press the enter key on the add topic textbox.
		$('div#tab-content').on( 'keyup.wpcom_reader', 'input#add-topic-text', function(e) {
			$( 'span.errortipwrap' ).fadeOut( 'fast' );

			var code = (e.keyCode ? e.keyCode : e.which);

			if ( e.type == 'keyup' && code != 13 )
				return false;

			var slug = $( 'input#add-topic-text' ).val().toLowerCase().replace( ' ', '-' );
			$.when( wpcom_newdash_actions.follow_topic( slug, $('a.add-topic').data('nonce') ) ).then( function( response ) {
				if ( response.error )
					alert( response.error.message );
				else {
					wpcom_reader.add_topic_to_sidebar( response.result );
					$( 'input#add-topic-text' ).val('').blur();
					location.hash = '#!/read/topic/' + slug + '/';
				}
			} );
			return false;
		});

		// Click 'X' to remove a topic from sidebar.
		$('div#tab-content').on( 'click.wpcom_reader', 'a.remove-topic', function(e) {
			e.preventDefault();
			
			var data = $(this).attr('href').split('/'), slug = data[5], nonce = data[6];
			
			$.when( wpcom_newdash_actions.unfollow_topic( slug, nonce ) ).then( function() {
				wpcom_reader.remove_topic_from_sidebar( slug );
			} );
		});
	},
	
	render_page: function( args ) {
		args = typeof(args) != 'undefined' ? args : {};
		args.page = typeof(args.page) != 'undefined' ? args.page : false;
		
		this['page_' + args.page]();
	},
	
	page_following: function() {
		var self = this;
		
		self.select_menu_item( 'following' );
		self.show_loading( 'following' );

		$.when(
			self.get_posts( { type: 'following' } )
		).then( function( response ) {
			// Markup the posts from the returned data
			var html = wpcom_newdash_renderer.markupHeader( response.title );

			if ( response.posts )
				html += wpcom_newdash_renderer.markupPosts( response.posts );
			else
				location.hash = '#!/read/find-friends/'; // Until we have a better screen in place.

			// Set the oldest post returned as the timestamp to use to fetch older posts on infiniscroll.
			wpcom_reader_ts.set( 'before', 'following', response.before_ts );

			// Render the html to the page.
			$( 'div#reader-content' ).html( html );
			
			// Init the infiniscroll and new post notifier
			wpcom_infinite_scroll.init( 'following' );
			wpcom_new_posts_notify.init( 'following' );
			
			// Hide the spinner
			self.hide_loading();
			
			// Record the page stat
			wpcom_newdash.bump_stat( 'reader_views', 'following_load' );
		} );
	},
	
	page_find_friends: function() {
	
	},
	

	get_posts: function( args ) {
		args          = typeof( args ) != 'undefined' ? args : {};
		args.type     = typeof( args.type ) != 'undefined' ? args.type : false;
		args.per_page = typeof( args.per_page ) != 'undefined' ? args.per_page : 7;
		args.before   = typeof( args.before ) != 'undefined' ? args.before : '';
		args.after    = typeof( args.after ) != 'undefined' ? args.after : '';
		args.slug     = typeof( args.slug ) != 'undefined' ? args.slug : '';
		args.blog_id  = typeof( args.blog_id ) != 'undefined' ? args.blog_id : '';
		args.feed_id  = typeof( args.feed_id ) != 'undefined' ? args.feed_id : '';

		// When getting new posts, do not limit
		if ( args.after )
			args.per_page = '';

		if ( !args.type )
			return false;

		function remote() {
			jqxhr = $.ajax( {
				type: 'GET',
				url: '/wp-admin/admin-ajax.php',
				data: {
					'action': 'get_' + args.type + '_posts',
					'per_page': args.per_page,
					'before': args.before,
					'after': args.after,
					'slug': args.slug,
					'blog_id': args.blog_id,
					'feed_id': args.feed_id
				},
				dataType: 'json'
			} ).then( function( response ) {
				if ( '' === args.before && '' === args.after )
					wpcom_ls.set( args.type + args.slug + '_b_' + args.blog_id + '_f_' + args.feed_id + '_posts.latest', JSON.stringify( response ) );
			} );
			
			return jqxhr;
		}
				
		function local() {
			var dfd = new $.Deferred(),
				cached_posts = wpcom_ls.get( args.type + args.slug + '_b_' + args.blog_id + '_f_' + args.feed_id + '_posts.latest' );

			if ( null === cached_posts )
				return remote();

			setTimeout( function() {
				dfd.resolveWith( null, [JSON.parse( cached_posts )] );
			} );

			// Update the cache with a fresh copy.
			remote();

			return dfd.promise();
		}

		return ( '' === args.before && '' === args.after ) ? local() : remote(); // Only look for a local cache of posts when getting latest posts.
	},

	select_menu_item: function( slug ) {
		$( 'a', 'div#sidebar ul li' ).removeClass( 'selected' );
		$( 'a', 'div#sidebar ul li.' + slug ).addClass( 'selected' );
		$( document ).trigger( 'wpcom_selected_sidebar_item' );
	},

	is_menu_selected: function( slug ) {
		if ( $( 'a.selected', 'li.topic-' + slug ).length || $( 'a.selected', 'li.' + slug ).length || $( 'a.selected', 'li.fp-' + slug ).length )
			return true;
		
		return false;
	},

	show_loading: function( slug ) {
		this.loading_timeout = setTimeout( function() {
			var title = 'Loading';
			if ( -1 != slug.search( 'topic-' ) ) {
				topic_title = slug.split('-'), topic_title = topic_title[1];
				title = 'Loading ' + wpcom_newdash.titleize( topic_title );
			}
			
			$( 'div#reader-content' ).html( '<h3 class="loading"><div class="offset">' + title + '</div></h3>' );
			$( 'h3.loading' ).spin( 'medium' );
			
			if ( 'topics' == slug )
				return;
				
			$( 'div#sidebar ul li.' + slug )
				.addClass( 'loading' );

			if ( $(document).width() > 480 )
				$( 'div#sidebar ul li.' + slug ).append( '<span class="loading"></span>' );
			
			$( 'span.loading', 'div#sidebar ul li.' + slug ).spin( 'small' );
		}, 100 );
		
		$( 'div#subs-loading' ).remove();
	},
	
	hide_loading: function() {
		clearTimeout( this.loading_timeout );
		
		$( 'div#subs-content' )
			.removeClass( 'hidden' )
			.addClass( 'fadein' );
			
		$( 'div#sidebar ul li.loading' )
			.removeClass( 'loading' )
			.children( 'span.loading' )
				.remove();
	},

	add_topic_to_sidebar: function( html ) {
		$( html ).insertBefore( $( 'li#add-topic-input', 'ul.sidebar-topics' ) );
		
		// Recache the reader to include the new topic in the sidebar.
		wpcom_newdash.load_template( { template: 'read.php', target: false, do_insert: false } );
	},
	
	remove_topic_from_sidebar: function( slug ) {
		$( 'li.topic-' + slug, 'ul.sidebar-topics' ).remove();
		
		// Recache the reader without the new topic in the sidebar.
		wpcom_newdash.load_template( { template: 'read.php', target: false, do_insert: false } );
	},
	
	load_fp_page: function( link ) {
		if ( typeof this.request == 'object' )
			this.request.abort();

		if ( typeof wpcom_newdash.request == 'object' )
			wpcom_newdash.request.abort();

		var fp_id = link.attr('id').replace( 'fp-', '' );

		window.location.hash = '!/' + $( 'li.current' ).attr('class').replace( ' current', '' ) + '/fp/' + link.attr('class').replace( 'load-fp-page ', '' ).replace( ' selected', '' ).replace( 'fp-', '' ) + '/';

		this.request = $.get( '/wp-admin/admin-ajax.php', {
			'action': 'wpcom_load_template',
			'template': 'subscriptions.read.fp.' + fp_id
		},
		function( response ) {
			wpcom_reader_ts.set( 'before', 'subscriptions.read.fp.' + fp_id, response.before_ts );
			wpcom_newdash.render_page( response.content );
		}, 'json' );
	},
	
	// TODO: Reblogging should be rewritten to decouple from the DOM and moved into its own class.

	show_reblog_box: function( link ) {
		if ( link.hasClass('priv') )
			return false;
		
		if ( !$( '.reblog-box-active' ).length ) {
			var reblog_box = $('#reblog-box').clone();
			reblog_box.addClass( 'reblog-box-active' ).appendTo( $( 'div#reader' ) );
		}
		
		$('.reblog-box-active textarea').val('Add your thoughts here... (optional)');
		$('a.reblog').removeClass('selected');
		link.addClass('selected');
		$('.reblog-box-active p.response').remove();
		$('.reblog-box-active div.submit, .reblog-box-active div.submit span.canceltext').show();
		$('.reblog-box-active div.submit input[type=submit]').prop('disabled',false);

		if ( ',' != link.parents('span.actions').attr('id') )
			$('.reblog-box-active input#ids').val( link.parents('span.actions').data('blog-id') + ',' + link.parents('span.actions').data('post-id') );

		$('.reblog-box-active input#blog-url').val( link.parents('div.sub-body-content').children('h4').children('span').children('a.blog-url').attr('href'));
		$('.reblog-box-active input#blog-title').val( link.parents('div.sub-body-content').children('h4').children('span').children('a.blog-url').html() );
		$('.reblog-box-active input#post-url').val( link.parents('div.sub-body-content').children('h4').children('a.post-title').attr('href') );
		$('.reblog-box-active input#post-title').val( link.parents('div.sub-body-content').children('h4').children('a.post-title').html() );

		$('.reblog-box-active').hide();
		
		$('.reblog-box-active').appendTo( link.parents( 'div.sub-body-content' ) );

		$('.reblog-box-active').fadeIn( 'fast', function() {
			var height = $(window).height() / 2.2;
			if ( $(document).width() > 480 )
				$.scrollTo( $('.reblog-box-active'), 500, { easing:'easeout', offset: height * -1 } );
		} );
	},

	submit_reblog: function( input ) {
		if ( typeof this.request == 'object' )
			this.request.abort();

		input.attr( 'value', 'Reblogging...' );
		input.prop('disabled',true);

		$('.reblog-box-active div.submit span.canceltext').fadeOut(150, function() {
			wpcom_newdash.add_spinner( input.parent(), 'small-right' );
		});

		if ( $('.reblog-box-active input#ids').val() === '' )
			ids = '';
		else
			ids = $('.reblog-box-active input#ids').val();

		this.request = $.get( '/wp-admin/admin-ajax.php', {
			'action': 'subs_post_reblog',
			'ids': ids,
			'blog_id': $('.reblog-box-active select').val(),
			'blog_url': $('.reblog-box-active input#blog-url').val(),
			'blog_title': $('.reblog-box-active input#blog-title').val(),
			'post_url': $('.reblog-box-active input#post-url').val(),
			'post_title': $('.reblog-box-active input#post-title').val(),
			'note': $('.reblog-box-active textarea').val(),
			'_wpnonce': $('.reblog-box-active #_wpnonce').val()
		},
		function(result) {
			// Hide reblog post and change reblog button to 'reblogged'
			$( '.reblog-box-active' ).css( { height: $( '.reblog-box-active' ).height() + 'px' } ).slideUp( 150, function() {
				$( '.reblog-box-active' ).parents( 'div.sub-body-content' ).children( 'span.actions' ).children( 'a.reblog' ).fadeOut( 150, function() {
					var link = $(this);
					link.html( 'Reblogged' ).removeClass( 'reblog' ).addClass( 'reblogged' ).fadeIn( 150, function() {
						//wpcom_newdash_actions.show_bubble( link, ( link.offset().left - ( $( 'div.wpcom-bubble' ).width() / 2 ) + 25 ), result.message );
						//$.scrollTo( link, 500, { easing:'easeout', offset: -( link.height() + 50 ) } );
					} );
				});

				$('.reblog-box-active span.loading').remove();
				input.attr( 'value', 'Post Reblog' );
			} );

			// Show the 'You reblogged this' text.
			$( '.reblog-box-active' ).parents( 'div.sub-body-content' ).children( 'p.post-meta' ).fadeOut( 150, function() {
				$(this).prepend( '<span class="reblogged"><span class="noticon noticon-reblog"></span> You reblogged this</span> &middot; ' ).fadeIn( 150 );
			} );

			// Bump stats when a post is reblogged
			wpcom_newdash.bump_stat( 'reader_actions', 'reblogged_post' );
		}, 'json' );
	},

	cancel_reblog: function( link ) {
		$('.reblog-box-active').fadeOut('fast');
		$('a.reblog').removeClass('selected');
	},
	
	// **** END Reblogging
	
	unload: function() {
		wpcom_infinite_scroll.unload();
		wpcom_new_posts_notify.unload();
	}
};

var wpcom_reader_manage = {
	request: false,

	init: function() {
		this.unload(); // Unbind any previous bindings.

		// Follow a blog.
		$(document).on( 'click.wpcom_reader_manage', 'a#addblog_submit', function(e) {
			e.preventDefault();
			wpcom_reader_manage.follow( $(this) );
		});

		// Unfollow a blog.
		$(document).on( 'click.wpcom_reader_manage', 'span.unsub', function(e) {
			e.preventDefault();
			wpcom_reader_manage.unfollow( $(this) );
		});

		// Catch enter key presses on the follow box and resolve duplicate scheme in URLs.
		$(document).on( 'keyup.wpcom_reader_manage', 'input#addblog', function(e) {
			var url = $( '#addblog' ).val();
			if ( url.match( /http\:\/\/https?\:\/\// ) )
				$( '#addblog' ).val( url.replace( 'http://', '' ) );

			var code = (e.keyCode ? e.keyCode : e.which);

			if ( e.type == 'keyup' && code != 13 )
				return false;

			wpcom_reader_manage.follow();
			return false;
		});

		// Edit email delivery settings
		$(document).on( 'change.wpcom_reader_manage', 'select.email_setting', function() {
			wpcom_reader_manage.change_email_delivery( $(this) );
		});

		// IM delivery settings
		$(document).on( 'click.wpcom_reader_manage', 'input.jabber_setting', function() {
			wpcom_reader_manage.change_im_delivery( $(this) );
		});

		// Comment delivery settings
		$(document).on( 'click.wpcom_reader_manage', 'input.comment_setting', function() {
			wpcom_reader_manage.change_comment_delivery( $(this) );
		});

		// Don't traditionally submit the add sub form.
		$(document).on( 'submit.wpcom_reader_manage', 'form#manage-subs', function() {
			return false;
		});
		
		// Delete the following posts cache on the edit screen. TODO: make this less heavy handed.
		wpcom_ls.remove( 'following_posts.latest' );
	},
	
	// TODO: These should be removed to use the global follow/unfollow blog routes instead.
	follow: function( link ) {
		this.abort_request();

		$("span#subscribe-loading").removeClass( 'hide' ).spin('small');
		$('span.errortipwrap').hide();

		this.request = $.get( '/wp-admin/admin-ajax.php', {
			'action': 'subscribe_to_blog',
			'blog_url': $('input#addblog').val(),
			'_wpnonce': $('input#subs').val()
		},
		function(response) {
			$('tr#nosubs').remove();

			if ( response.substr(0,2) != '-1' ) {
				$('tr.header').after(response);
				$('tr.new').hide();
				$('tr.new').fadeIn( function() {
					wp_remote_avatar_fetch();
				});
				$('input#addblog').val('http://');

				wpcom_newdash.bump_stat( 'reader_actions', 'followed_blog' );
				wpcom_newdash.bump_stat( 'reader_follows', 'following_edit' );
			} else {
				$('span.errortiptext').html(response.substr(2, response.length ) );
				$('span.errortipwrap').fadeIn(150);
			}
			$('input#addblog').focus();

			$("span#subscribe-loading").addClass( 'hide' );
		} );
	},

	unfollow: function( link ) {
		this.abort_request();

		var parent = link.parents('tr');
		parent.fadeOut(200);

		var blog_ids = parent.attr('id').substr( 5, parent.attr('id').length );
		if ( blog_ids.length )
			blog_ids += ',';

		this.request = $.get( '/wp-admin/admin-ajax.php', {
			'action': 'unsubscribe_from_blog',
			'blog_ids': blog_ids,
			'blog_url': parent.children('td.blogname').children('h4').children('a.blogurl').attr('rel'),
			'_wpnonce': $('input#subs').val()
		});
		
		// Recache the page so the blog is removed from the cache.
		wpcom_newdash.load_template( { template: 'reader/edit-following.php', target: false, do_insert: false } );

		wpcom_newdash.bump_stat( 'reader_actions', 'unfollowed_blog' );
		wpcom_newdash.bump_stat( 'reader_unfollows', 'following_edit' );
	},

	change_email_delivery: function( dropdown ) {
		this.abort_request();

		var parent_td = dropdown.parents('td');

		$.get( '/wp-admin/admin-ajax.php', {
			'action': 'email_delivery_change',
			'blog_id': parent_td.parents('tr').attr('id'),
			'setting': dropdown.val(),
			'_wpnonce': $('input#delivery').val()
		}, function() {
			wpcom_newdash.load_template( { template: 'reader/edit-following.php', target: false, do_insert: false } );
		} );
	},

	change_comment_delivery: function( checkbox ) {
		this.abort_request();

		var parent_td = checkbox.parents('td');

		$.get( '/wp-admin/admin-ajax.php', {
			'action': 'comment_delivery_change',
			'blog_id': parent_td.parents('tr').attr('id'),
			'setting': checkbox.is( ':checked' ),
			'_wpnonce': $('input#delivery').val()
		}, function() {
			wpcom_newdash.load_template( { template: 'reader/edit-following.php', target: false, do_insert: false } );
		} );
	},

	change_im_delivery: function( checkbox ) {
		this.abort_request();

		var parent_td = checkbox.parents('td');

		$.get( '/wp-admin/admin-ajax.php', {
			'action': 'jabber_delivery_change',
			'blog_id': parent_td.parents('tr').attr('id'),
			'setting': checkbox.is( ':checked' ),
			'_wpnonce': $('input#delivery').val()
		}, function() {
			wpcom_newdash.load_template( { template: 'reader/edit-following.php', target: false, do_insert: false } );
		} );
	},

	abort_request: function() {
		if ( typeof wpcom_reader_manage.request == 'object' ) {
			wpcom_reader_manage.request.success = {};
			wpcom_reader_manage.request.complete = {};
			wpcom_reader_manage.request.abort();
		}
	},

	unload: function() {
		$(document).off( 'click.wpcom_reader_manage', 'a#addblog_submit' );
		$(document).off( 'click.wpcom_reader_manage', 'span.unsub' );
		$(document).off( 'keyup.wpcom_reader_manage', 'input#addblog' );
		$(document).off( 'change.wpcom_reader_manage', 'select.email_setting' );
		$(document).off( 'click.wpcom_reader_manage', 'input.selectall' );
		$(document).off( 'submit.wpcom_reader_manage', 'form#manage-subs' );
	}
};

var wpcom_reader_global_settings = {
	init: function() {
		this.unload(); // Unbind any previous bindings

		$(document).on( 'click.wpcom_reader_global_settings', 'input#subs-settings-save', function() {
			wpcom_reader_global_settings.save( $(this) );
		});
	},

	save: function( input ) {
		$('span#settings-saved').remove();

		$( 'span.saved, span.loading' ).remove();
		input.after('<span class="loading"></span>');
		input.prop('disabled',true).val('Saving...');

		var jabber_setting = ( $('input#default_jabber_enable').is(':checked') ) ? 1 : 0;
		
		$.post( '/wp-admin/admin-ajax.php', {
			'action': 'subs_save_settings',
			'_wpnonce': $('input#subs_nonce').val(),
			'email_setting': $('select#default_email').val(),
			'jabber_setting': jabber_setting,
			'mail_option': $('select#mail_option').val(),
			'delivery_hour': $('select#delivery_hour').val(),
			'delivery_day': $('select#delivery_day').val(),
			'blocked': $('input#blocked').is(':checked')
		}, function() {
			$( 'span.saved, span.loading' ).remove();
			input.after('<span class="saved">&nbsp; Settings saved.</span>');
			input.prop( 'disabled',false ).val( 'Save Settings' );
			
			// Recache the settings page to include the updated settings.
			wpcom_newdash.load_template( { template: 'reader/settings.php', target: false, do_insert: false } );
		} );
	},

	unload: function() {
		$(document).off( 'click.wpcom_reader_global_settings', 'input#subs-settings-save' );
	}
};

/** WordPress.com My Settings "Tab" ******************************************************/

var wpcom_my_settings = {
	pass_timeout: false,
	lang_id: 0,
	user_recovery_phone_country: 0,
	user_recovery_phone_number:0,
	
	init: function() {
		this.unload(); // Unbind any previous bindings

		var self = this;
		StrengthBarL10n = {shortPass: 'Too Short', badPass: 'Bad', goodPass: 'Good', strongPass: 'Strong'};

		this.lang_id = $( '#lang_id option:selected' ).val();
		this.user_recovery_phone_country = $( '#user_recovery_phone_country option:selected' ).val();
		this.user_recovery_phone_number = $( '#user_recovery_phone_number' ).val();
		
		if ( -1 != window.location.href.indexOf( '?pass_result' ) ) {
			this.reset_settings_ls();

			if ( -1 != window.location.href.indexOf( '?pass_result=1' ) )
				$( '.pass-result' ).html( 'Successfully changed your password.' );
			else
				$( '.pass-result' ).html( 'Unable to change your password.' );
			$( '.pass-result' ).show();
			this.toggle_section( $( 'a#password-section' ).parent() );
		} else {
			this.toggle_section( $( 'a#account-section' ).parent() );

			if ( -1 != window.location.href.indexOf( '?new_email_result' ) ) {
				$( 'p.errormsg' ).remove();

				if ( -1 != window.location.href.indexOf( '?new_email_result=1' ) )
					$( '[name=email]' ).after( '<p class="errormsg new-email-result">Successfully updated your email address.</p>' );
				else
					$( '[name=email]' ).after( '<p class="errormsg new-email-result">Unable to update your email address.</p>' );
				$( 'p.errormsg' ).hide().slideDown( 200 );
			}
		}

		$.getScript( '/wp-content/plugins/passwordstrength/passwordStrengthMeter.js' );

		$( 'div#tab-content' ).on( 'click.wpcom_my_settings', 'ul#profile-sections li', function() {
			self.toggle_section( $(this) );
		} );

		$( 'div#tab-content' ).on( 'click.wpcom_my_settings', 'div.submit-box input[type=button]', function() {
			self.save( $(this) );
		} );

		$( 'div#tab-content' ).on( 'keyup.wpcom_my_settings', 'input#pass1', function() {
			clearTimeout( self.pass_timeout );
			self.pass_timeout = setTimeout( function() {
				$( 'div#pass-strength-result' ).show();

				var result = passwordStrength( $('input#pass1').val(), '' );

				if ( result.length )
					$( 'div#pass-strength-result' ).html( result );
			}, 200 );
		});

		$( 'div#my-apps-content' ).on( 'click.wpcom_my_settings', 'a.button-secondary', function( e ) {
			e.preventDefault();

			var self = this;

			$.post( '/wp-admin/admin-ajax.php', {
				'action': 'revoke-oauth-connection',
				'url': this.href
			}, function () {
				wpcom_newdash.bump_stat( 'newdash_settings', 'oauth_connection_revoke' );
				wpcom_my_settings.reset_settings_ls();

				$( 'tr.' + self.name ).empty();
				$( 'tr.' + self.name ).append( '<td colspan="3" class="connection-revoked">Application "' + self.id + '" has been removed</td>' );
			});
		});

		$( 'div#account-content' ).on( 'click.wpcom_my_settings', 'a.cancel-new-email', function( e ) {
			e.preventDefault();

			$.post( '/wp-admin/admin-ajax.php', {
				'action': 'cancel-new-email',
				'nonce': $( 'input#newdash_nonce' ).val()
			}, function() {
				wpcom_newdash.bump_stat( 'newdash_settings', 'new_email_cancel' );
				wpcom_my_settings.reset_settings_ls();
				$( 'p.new-email-msg.errormsg' ).remove();
			});
		});

		var $security_tab = $( 'div#security-content' ),
			twostep_nonce = $( '#twostep-nonce' ).val();

		$security_tab.on( 'click.wpcom_my_settings', 'a.enable-twostep', function( e ) {
			e.preventDefault();

			$.post( '/wp-admin/admin-ajax.php', {
				'action': 'enable-two-step',
				'nonce': twostep_nonce
			}, function( key ) {
				wpcom_newdash.bump_stat( 'newdash_settings', 'twostep_enable' );
				wpcom_my_settings.reset_settings_ls();
				$( '#twostep-status-on strong.secret' ).text( key );
				var qr = $( '#twostep-status-on img.secretqr' );
				qr.attr( 'src', qr.attr( 'src').replace( /secret%3D.*$/, 'secret%3D' + key ) );
				$( '#twostep-status-on' ).show();
				$( '#twostep-status-off' ).hide();
				$( '#twostep-configuration' ).show()
			});
		});

		$security_tab.on( 'click.wpcom_my_settings', 'a.disable-twostep', function( e ) {
			e.preventDefault();

			$.post( '/wp-admin/admin-ajax.php', {
				'action': 'disable-two-step',
				'nonce': twostep_nonce
			}, function() {
				wpcom_newdash.bump_stat( 'newdash_settings', 'twostep_disable' );
				wpcom_my_settings.reset_settings_ls();
				$( '#twostep-status-on' ).hide();
				$( '#twostep-status-off' ).show();
				$( '#twostep-configuration' ).fadeOut( 200 );
			});
		});

		$security_tab.on( 'click.wpcom_my_settings', '#twostep-generate-app-password', function( e ) {
			e.preventDefault();

			var $this = $( this ),
				$container = $this.closest( 'td' ),
				$application_name = $( '#twostep-app-name' ),
				application_name = $application_name.val();

			if ( ! application_name ) {
				$container.addClass( 'error' );
				return;
			}

			$this.hide();
			$container.spin( 'small' );

			$.post( '/wp-admin/admin-ajax.php', {
				action: 'twostep-add-application-password',
				application_name: application_name,
				nonce: twostep_nonce
			}, function( response ) {
				if ( -1 != response ) {
					$container.spin( false );

					$this.closest( 'table' )
						.after( response )
						.remove();
					
				}
			} );
		} );

		$security_tab.on( 'click.wpcom_my_settings', '.twostep-delete-app-password', function( e ) {
			e.preventDefault();

			var $this = $( this ),
				$container_cell = $this.closest( 'td' ),
				$container_row = $this.closest( 'tr' ),
				application_id = $this.attr( 'data-application-id' );

			$this.hide();
			$container_cell.spin( 'small' );

			$.post( '/wp-admin/admin-ajax.php', {
				action: 'twostep-delete-application-password',
				application_id: application_id,
				nonce: twostep_nonce
			}, function( response ) {
				$container_cell.spin( false );
				$container_row.remove();
			} );
		} );
	},

	toggle_section: function( section ) {
		var section_anchor = section.children('a');

		if ( ! section_anchor.length )
			return;

		var section_id = section_anchor.attr('id').replace( '-section', '-content' );

		$( 'a', 'ul#profile-sections' ).removeClass( 'selected' );
		section_anchor.addClass( 'selected' );

		$( 'div.section', 'div#edit-profile-content' ).hide();
		$( 'div#' + section_id ).fadeIn( 'fast' );

		this.hide_redirect_results( section_id.replace( '-content', '' ) );
	},

	save: function( save_button ) {
		var active_section_name = $( 'a.selected', 'ul#profile-sections li' ).attr( 'id' ).replace( '-section', '' );
		var active_section = $( 'div#' + active_section_name + '-content', 'div#edit-profile-content' );

		save_button.addClass('saving').val('Saving...');

		$( 'p.errormsg' ).remove();
		$( 'tr.error' ).removeClass( 'error' );

		wpcom_newdash.bump_stat( 'newdash_settings', active_section_name.replace( '-', '_' ) + '_save' );

		this.hide_redirect_results();

		if ( 'password' == active_section_name ) {
			var errors = [];

			if ( '' === $( '#pass1' ).val() )
				errors.push( { field: 'pass1', msg: '<strong>ERROR</strong>: Password cannot be blank.' } );
			if ( '' === $( '#pass2' ).val() )
				errors.push( { field: 'pass2', msg: '<strong>ERROR</strong>: Password cannot be blank.' } );

			/* Check for "\" in password */
			if ( -1 != $( '#pass1' ).val().indexOf( "\\" ) )
				errors.push( { field: 'pass1', msg: '<strong>ERROR</strong>: Passwords may not contain the character "\\".' } );

			/* checking the password has been typed twice the same */
			if ( $( '#pass1' ).val() != $( '#pass2' ).val() )
				errors.push( { field: 'pass1', msg: '<strong>ERROR</strong>: Please enter the same password in the two password fields.' } );

			if ( errors.length ) {
				$.each( errors, function( key, error ) {
					$( '[name=' + error.field + ']' ).after( '<p class="errormsg">' + error.msg + '</p>' ).parents( 'tr' ).addClass( 'error' );
					$( 'p.errormsg' ).hide().slideDown( 200 );
				});

				$( 'div#pass-strength-result' ).fadeOut( 200 );

				save_button.removeClass('saving').val('Save Changes');
			} else {
				this.reset_settings_ls();
				$( '#change-password-form' ).submit();
			}
		} else {
			//Check the validity of the phone number. A8C only.
			if ( 'account' == active_section_name &&  $( '#user_recovery_phone_number' ).length > 0 ) {
				var errors = [];
				if ( '' === $( '#user_recovery_phone_country option:selected' ).val() && $( '#user_recovery_phone_number' ).val() !== '' ) {
					errors.push( { field: 'user_recovery_phone_country', msg: '<strong>ERROR</strong>: Please also supply a country to set account recovery.' } );
				}
				if ( '' !== $( '#user_recovery_phone_country option:selected' ).val() && $( '#user_recovery_phone_number' ).val() === '' ) {
					errors.push( { field: 'user_recovery_phone_number', msg: '<strong>ERROR</strong>: Please also supply a phone number to set account recovery.' } );
				}
				
				if ( errors.length ) {
					$.each( errors, function( key, error ) {
						$( '[name=' + error.field + ']' ).after( '<p class="errormsg">' + error.msg + '</p>' ).parents( 'tr' ).addClass( 'error' );
						$( 'p.errormsg' ).hide().slideDown( 200 );
					});

					$( 'div#pass-strength-result' ).fadeOut( 200 );

					save_button.removeClass('saving').val('Save Changes');
					return false;
				}
			}
			
			var els = active_section.find( 'input, select, textarea' ),
				data = [];

			$.each( els, function( i, el ) {
				el = $(el);
				data.push( { name: el.attr('name'), val: el.val() } );
			});

			$.post( '/wp-admin/admin-ajax.php', {
				'action': 'newdash_save_settings',
				'nonce': $( 'input#newdash_nonce' ).val(),
				'scope': active_section.attr('id').replace( '-content', '' ),
				'data': data
			}, function( r ) {
				if ( r.errors ) {
					$.each( r.errors, function( field, error ) {
						$( '[name=' + field + ']' ).after( '<p class="errormsg">' + error.message + '</p>' ).parents( 'tr' ).addClass( 'error' );
						$( 'p.errormsg' ).hide().slideDown( 200 );
					});
				} else {
					$( '#password-content input[type=password]' ).val('');
					$( 'div#pass-strength-result' ).fadeOut( 200 );
				}
				if ( wpcom_my_settings.lang_id != $( '#lang_id option:selected' ).val() 
					||  
					( ( typeof wpcom_my_settings.user_recovery_phone_country != "undefined" ) && wpcom_my_settings.user_recovery_phone_country != $( '#user_recovery_phone_country option:selected' ).val() )
					||
					( ( typeof wpcom_my_settings.user_recovery_phone_number != "undefined" ) && wpcom_my_settings.user_recovery_phone_number != $( '#user_recovery_phone_number' ).val() )
				    ) {
					localStorage.clear();
					window.location.reload();
				} else {
					save_button.removeClass('saving').val('Save Changes');
					wpcom_my_settings.reset_settings_ls();
				}
			}, 'json' );
		}
	},

	hide_redirect_results: function( section ) {
		if ( 'password' != section )
			$( '.pass-result' ).remove();
		else if ( 'account' != section )
			$( '.new-email-result' ).remove();
	},

	reset_settings_ls: function() {
		wpcom_ls.remove( 'wpcom_tab_settings_content' );
	},

	unload: function() {
		$( 'div#tab-content' ).off( 'click.wpcom_my_settings', 'ul#profile-sections li' );
		$( 'div#tab-content' ).off( 'click.wpcom_my_settings', 'div.submit-box input[type=button]' );
		$( 'div#tab-content' ).off( 'keyup.wpcom_my_settings', 'input#pass1' );
		$( 'div#my-apps-content' ).off( 'click.wpcom_my_settings', 'a.button-secondary' );
		$( 'div#account-content' ).off( 'click.wpcom_my_settings', 'a.cancel-new-email' );
	}
};

/** WordPress.com Friend Finder ******************************************************/
var wpcom_friend_finder = {
	init: function() {
		this.unload(); // Unbind any previous bindings.

		// Friend finder service link clicks
		$( '.friend-finder' ).on( 'click.wpcom_friend_finder', '#ff-services a', function(e) {
			e.preventDefault();
			wpcom_friend_finder.start_auth( $(this) );
			wpcom_friend_finder.show_connected( $(this) );
		} );

		/* Friend finder follow all link clicks */
		$( '.friend-finder' ).on( 'click.wpcom_friend_finder', '#found-friends a.f-all', function(e) {
			e.preventDefault();

			wpcom_friend_finder.follow_all_friends();

			var service = $( 'ul#friend-list' ).attr('class');
			wpcom_newdash.bump_stat( 'reader_follows', 'friend_finder_' + service );
		} );

		/* Friend finder follow link clicks */
		$( '.friend-finder' ).on( 'click.wpcom_friend_finder', '#found-friends a.follow', function(e) {
			e.preventDefault();

			var service = $( 'ul#friend-list' ).attr('class');
			wpcom_newdash.bump_stat( 'reader_follows', 'friend_finder_' + service );
		} );

		/* Friend finder following link clicks */
		$( '.friend-finder' ).on( 'click.wpcom_friend_finder', '#found-friends a.following', function(e) {
			e.preventDefault();

			var service = $( 'ul#friend-list' ).attr('class');
			wpcom_newdash.bump_stat( 'reader_unfollows', 'friend_finder_' + service );
		} );
	},

	show_connected: function( link ) {
		$( "#" + link.attr('id') + " p" ).text( "Connected" );
	},

	start_auth: function( link ) {
		$('#found-friends').fadeOut( 'fast' );
		wpcom_external_auth.init( link.attr('id') );
	},

	follow_all_friends: function() {
		// Go through the list of friends and follow each blog.
		$.each( $( 'a.follow', 'ul.user-blogs li' ), function( i, el ) {
			wpcom_reader.follow_blog( $(el), false );
		});
	},

	unload: function() {
		$( '.friend-finder' ).off( 'click.wpcom_friend_finder', '#ff-services a' );
		$( '.friend-finder' ).off( 'click.wpcom_friend_finder', '#found-friends a.follow' );
		$( '.friend-finder' ).off( 'click.wpcom_friend_finder', '#found-friends a.following' );
	}
}

/** WordPress.com Reader Recommendations ******************************************************/

// TODO: This needs refactoring to support proper routing and removing logic from templates.
var wpcom_reader_recommendations = {
	init: function() {
		this.unload();
		$('div#tab-content').on( 'click', '#kingmaker-button', function(e) {
			e.preventDefault();
			var selected_topics = $("#suggestions input:checked").map(function(i,e) { return e.value; });
			if ( selected_topics.length === 0 ) {
				selected_topics = [ "-1" ];
			}

			this.request = $.get( '/wp-admin/admin-ajax.php', {
				'action': 'wpcom_load_template',
				'template': 'reader/recommendations.php',
				'topics': $.makeArray(selected_topics)
			}, function( response ) {
				wpcom_newdash.insert_template( { content: response, target: 'div#reader-content' } );
				$.scrollTo( $('div#wrapper'), 500, { easing:'easeout' } );
			});
		});

		$( '.kingmaker-suggested-cat input' ).hide();
		$( document ).on( 'click.wpcom_reader_recommendations', '.kingmaker-suggested-cat', function(e) {
			e.preventDefault();
			$( this ).toggleClass( 'selected' );
			var selected = $( this ).hasClass( 'selected' );
			$( this ).find( 'input' ).attr( 'checked', selected );
		});
		$( document ).on( 'click.wpcom_reader_recommendations', '.kingmaker-suggested-submit a.skip', function(e) {
			e.preventDefault();
			this.request = $.get( '/wp-admin/admin-ajax.php', {
				'action': 'wpcom_load_template',
				'template': 'reader/recommendations.php',
				'skip': true
			}, function( response ) {
				location.hash = '#!/read/following/';
			} );
		});

		$(document).on( 'click.wpcom_reader_recommendations', '.kingmaker-blog a.follow', function(e) {
			e.preventDefault();
			wpcom_newdash.bump_stat( 'reader_follows', 'recommendations' );
		} );

		$(document).on( 'click.wpcom_reader_recommendations', '.kingmaker-blog a.following', function(e) {
			e.preventDefault();
			wpcom_newdash.bump_stat( 'reader_unfollows', 'recommendations' );
		} );
	},

	unload: function() {
		$(document).off( 'submit.wpcom_reader_recommendations', '#suggestions' );
/*
		$(document).off( 'click.wpcom_reader_recommendations', '.kingmaker-blog' );
		$(document).off( 'submit.wpcom_reader_recommendations', '#selected-suggestions' );
*/
		$(document).off( 'click.wpcom_reader_recommendations', '.kingmaker-suggested-cat' );
		$(document).off( 'click.wpcom_reader_recommendations', '.kingmaker-suggested-submit a.skip' );
		$(document).off( 'click.wpcom_reader_recommendations', '.kingmaker-blog a.follow' );
		$(document).off( 'click.wpcom_reader_recommendations', '.kingmaker-blog a.following' );
	},

	selected: function() {
		return $( '.kingmaker-blog.selected' ).map( function(i,e) {
			return e.id.replace( 'kingmaker-', '' );
		});
	}
};

// Provide external service authentication to find friends to add blogs to the reader
var wpcom_external_auth = {
	cookies: { facebook: 'wpc_fbc', twitter: 'wpc_tc', google: 'wpc_google' },
	popups:  { facebook: ',height=400,width=640', twitter: ',height=515,width=600', google: ',height=400,width=720' },
	ext_win : false,
	ext_win_check : false,

	init: function( service ){
		clearInterval( this.ext_win_check );

		if ( this.readCookie( this.cookies[service] ) ) {
			$( '#default-friends' ).fadeOut( 'fast', function() {
				$('#subs-loading').fadeIn( 'fast' );
				$('#subs-loading').children( 'span' ).spin( 'small' );
				wpcom_external_auth.doExternalLoggedIn( service );			
			} );
		} else {
			keyring_service = service;
			if ( 'google' == keyring_service )
				keyring_service = 'google-contacts'; // Uses the GC service in Keyring

			var url = 'https://public-api.wordpress.com/connect/?magic=keyring&action=request&service=' + keyring_service + '&scope=basic&for=friendfinder';

			wpcom_external_auth.ext_win = window.open( url, 'highconn', 'status=0,toolbar=0,location=1,menubar=0,directories=0,resizable=1,scrollbars=0' + this.popups[service] );
			wpcom_external_auth.ext_win_check = setInterval( function() { wpcom_external_auth.pollExternalWindow( service ); }, 100 );
		}
	},

	doExternalLoggedIn : function( service ) {
		clearInterval( this.ext_win_check );

		var data = this.getServiceData( service );
		var service = service;

		if ( 'object' !== typeof data )
			return;

		if ( 'facebook' != service && 'twitter' != service && 'google' != service )
			return;

		$.get( '/wp-admin/admin-ajax.php', {
			'action': 'wpcom_ff_query_' + service
		},
		function(response) {
			if ( "-1" == jQuery.trim( response ) ) {
				$('#subs-loading').fadeOut('fast');
				wpcom_external_auth.clearCookie( service );
				wpcom_external_auth.init( service );
				return;
			}
			
			$( '#found-friends' ).fadeOut( 'fast', function() {
				$(this).html( response );
				$(this).fadeIn( 'fast', function() {
					wp_remote_avatar_fetch();
				} );
			} );
			$('#subs-loading').fadeOut( 'fast' );
		});
	},

	doExternalCanceled : function( service ) {
	},

	doExternalLogout : function( service ) {
		this.clearCookie( service );
		this.doExternalCanceled( service, true );
	},

	getServiceData : function( service ) {
		var data = this.readCookie( this.cookies[service] );
		if ( null === data || 'undefined' === typeof data.access_token || !data.access_token ) {
			return false;
		}
		return data;
	},

	pollExternalWindow : function( service ) {
		if ( this.readCookie( this.cookies[service] ) ) {
			clearInterval( this.ext_win_check );

			wpcom_external_auth.ext_win.close();
			this.init( service );
		} else {
			if ( this.ext_win.closed || !this.ext_win )
				this.doExternalCanceled( service );
		}
	},

	readCookie : function(c) {
		var nameEQ = c + "=",
			ca = document.cookie.split( ';' ),
			i, chr, num, chunk, pairs, pair, cookie_data;
		for ( i = 0; i < ca.length; i++ ) {
			chr = ca[ i ];
			while ( chr.charAt( 0 ) === ' ' ) {
				chr = chr.substring( 1, chr.length );
			}
			if ( chr.indexOf( nameEQ ) === 0 ) {
				chunk = chr.substring( nameEQ.length, chr.length );
				pairs = chunk.split( '&' );
				cookie_data = {};
				for ( num = pairs.length - 1; num >= 0; num-- ) {
					pair = pairs[ num ].split( '=' );
					cookie_data[ pair[0] ] = decodeURIComponent( pair[1] );
				}
				return cookie_data;
			}
		}
		return null;
	},

	writeCookie : function( name, value, days, domain ) {
		var expires;
		if ( days ) {
			var date = new Date();
			date.setTime( date.getTime() + 3600 ); // 1 hour.
			expires = "; expires=" + date.toGMTString();
		} else {
			expires = "";
		}

		if ( domain ) {
			domain = "; domain=" + domain;
		} else {
			domain = '';
		}

		document.cookie = name + "=" + value + expires + "; path=/" + domain;
	},

	clearCookie: function( service ) {
		var hostname;
		if ( -1 !== window.location.hostname.indexOf( '.wordpress.com' ) ) {
			hostname = 'wordpress.com';
		} else {
			hostname = window.location.hostname;
		}
		this.writeCookie( this.cookies[service], '', -10, hostname );
	}
};

/** Timestamps for infinite scrolling ****************************/

var wpcom_reader_ts = {
	'before': {},

	set: function( when, template, value ) {
		template = template.replace( /\./g, '_' );
		this[when] = {};
		if ( template )
			this[when][template] = value;
		wpcom_infinite_scroll[when] = value;
	}
};

/** Infinite Scrolling *******************************************/

var wpcom_infinite_scroll = {
	type: 'following', // following, postlike, topic, fp
	per_page: 7,
	before: null,
	preloaded_posts: false,
	interval: false,
	topic_slug: '',
	blog_id: '',
	feed_id: '',
	checking: false,

	init: function( type, topic_slug, blog_id, feed_id ) {
		this.type = type;
		this.topic_slug = typeof(topic_slug) != 'undefined' ? topic_slug : '';
		this.blog_id = typeof( blog_id ) != 'undefined' ? blog_id : '';
		this.feed_id = typeof( feed_id ) != 'undefined' ? feed_id : '';

		if ( wpcom_reader_ts['before'][this.type] )
			wpcom_infinite_scroll.before = wpcom_reader_ts['before'][this.type];
		else
			wpcom_infinite_scroll.before = null;

		// Check scroll position every second and fire this.load() when hitting then end of the page.
		clearInterval( this.interval );
		this.interval = setInterval( wpcom_infinite_scroll.scroll_handler, 500 );

		// On first page load, preload the next page
		wpcom_infinite_scroll.load();
	},

	scroll_handler: function() {
		if ( this.checking )
			return;

		var self = wpcom_infinite_scroll;
		
		// Don't init infiniscroll when there are less posts on the page that the per page value.
		if ( $( '#reader-content' ).find( 'div.sub' ).length < self.per_page )
			return;

		if ( /* wpcom_infinite_scroll.before && */ $( window ).scrollTop() + $( window ).height() >= $( document ).height() - ( $( window ).height() - ( $( window ).height() * 0.75 ) ) ) {
			self.spinner();

			if ( self.preloaded_posts.length )
				self.render();
			else {
				$.when( self.load() ).then( function( response ) {
					if ( !response )
						return;
						
					self.preloaded_posts = response.posts;
					wpcom_reader_ts.set( 'before', self.type, response.before_ts );
					self.render();
				} );
			}
		}
	},

	get: function() {
		this.checking = true;
		return wpcom_reader.get_posts( { type: wpcom_infinite_scroll.type, before: wpcom_infinite_scroll.before, slug: this.topic_slug, blog_id: this.blog_id, feed_id: this.feed_id } );
	},

	render: function() {
		// Check there are more posts to render.
		if ( !this.preloaded_posts.length ) {
			$('#subs-loading').html( 'Sorry, there are no more posts to read but you can always check out <a class="load-tab" rel="fresh" href="/fresh/">freshly pressed</a>!' );
			return;
		}
		
		// Render the next page results
		var html = wpcom_newdash_renderer.markupPosts( this.preloaded_posts );
		$( 'div#reader-content' ).append( html );

		// Bump stats when scroll page is viewed.
		wpcom_newdash.bump_stat( 'reader_views', wpcom_infinite_scroll.type + '_scroll' );

		// Fetch and append the quantcast stats code
		wpcom_newdash.quantcast( 'infinite_scroll' );
		
		// Preload the next batch.
		this.load();
	},
	
	load: function() {
		this.preloaded_posts = false;

		$.when( wpcom_infinite_scroll.get() ).then( function( response ) {
			if ( '-1' == response )
				return;
				
			if ( !response.posts )
				return;
				
			wpcom_infinite_scroll.preloaded_posts = response.posts;
			wpcom_reader_ts.set( 'before', wpcom_infinite_scroll.type, response.before_ts );
			
			wpcom_infinite_scroll.checking = false;
		});
	},

	spinner: function() {
		if ( !$( '#subs-loading' ).length && $( 'div.sub:first div:first' ).hasClass('sub-avatar') ) {
			$( 'div#reader-content:last-child' ).after( '<div id="subs-loading"><span></span> Wait, there\'s more!</div>' );
			$('#subs-loading').hide().fadeIn( 'fast' );
			$( '#subs-loading' ).children( 'span' ).spin( 'small' );
		}
	},

	unload: function() {
		clearInterval( this.interval );
		$( document ).unbind( 'pageLoaded.wpcom_newdash' );
		
		wpcom_newdash.abort_jqxhr();
		
		wpcom_infinite_scroll.preloaded_posts = false;
		wpcom_infinite_scroll.topic_slug = '';
		wpcom_infinite_scroll.blog_id = '';
		wpcom_infinite_scroll.feed_id = '';
		wpcom_infinite_scroll.checking = false;
	}
};

/** New post check and notification *******************************************/

var wpcom_new_posts_notify = {
	type: 'following', // following, postlike, topic
	initial_page_title: 'WordPress.com',
	check_interval: false,
	new_posts: [],
	after: false,
	first_run: true,
	topic_slug: '',
	blog_id: '',
	feed_id: '',
	checking: false,

	init: function( type, topic_slug, blog_id, feed_id ) {
		this.type = type;
		this.topic_slug = typeof(topic_slug) != 'undefined' ? topic_slug : '';
		this.blog_id = typeof( blog_id ) != 'undefined' ? blog_id : '';
		this.feed_id = typeof( feed_id ) != 'undefined' ? feed_id : '';

		// Do the inital load check.
		setTimeout( function() {
			wpcom_new_posts_notify.check();
		}, 100 );
		
		this.check_interval = setInterval( function() { wpcom_new_posts_notify.check(); }, 15000 );
		$( 'div#reader' ).on( 'click', 'div.new-post-notify', wpcom_new_posts_notify.render_posts );
	},

	check: function() {
		if ( this.checking )
			return;

		if ( !wpcom_new_posts_notify.after )
			wpcom_new_posts_notify.after = $( 'div#reader-content div.sub:first .post-meta' ).data( 'ts' );

		// Show loading indicator on first time check.
		if ( !$( 'div.new-post-notify' ).length ) {
			$( 'div.page-activity' ).html( wpcom_newdash_renderer.fetch( 'checking-for-posts', {} ) );
			$( 'span', 'div.checking-new' ).spin( 'small' );
			$( 'div.checking-new' ).fadeIn( 'fast' );
		}

		$.when(
			this.get()
		).then( function( response ) {
			wpcom_new_posts_notify.checking = false;
			
			$( 'div.checking-new' ).fadeOut( 'fast', function() { $(this).remove(); });

			if ( '-1' == response )
				return;

			if ( !response.posts.length )
				return;

			// Reverse the posts because they get added to the front of array when stored
			response.posts.reverse();
			// Store the posts
			$.each( response.posts, function( i, post ) {
				wpcom_new_posts_notify.new_posts.unshift( post );

				// Update after to the date of the latest queried post
				wpcom_new_posts_notify.after = post.post_timestamp;
			});

			// If we have more than 7 new posts in the results, then limit the total that can be displayed
			if ( wpcom_new_posts_notify.new_posts.length >= wpcom_infinite_scroll.per_page )
				wpcom_new_posts_notify.new_posts.pop();

			// show the notification
			wpcom_new_posts_notify.render_notification();
		} );
	},
	
	get: function() {
		this.checking = true;

		return wpcom_reader.get_posts( { type: wpcom_new_posts_notify.type, per_page: wpcom_infinite_scroll.per_page, after: wpcom_new_posts_notify.after, slug: wpcom_new_posts_notify.topic_slug, blog_id: wpcom_new_posts_notify.blog_id, feed_id: wpcom_new_posts_notify.feed_id } );
	},

	render_notification: function() {
		var post_count = wpcom_new_posts_notify.new_posts.length;

		if ( !post_count )
			return false;

		var count_text = 'new posts';
		if ( 1 == post_count )
			count_text = 'new post';

		if ( !$( 'div.new-post-notify' ).length ) {
			$( 'div.page-activity' ).html( '<div class="new-post-notify"><span class="count">' + post_count + '</span> <span class="count-text">' + count_text + '</span></div>' );
			$( 'div.new-post-notify' ).fadeIn( 'fast' );
		} else {
			$( 'div.new-post-notify span.count' ).html( post_count );
			$( 'div.new-post-notify span.count-text' ).html( count_text );
		}

		document.title = '(' + post_count + ') ' + wpcom_new_posts_notify.initial_page_title;
	},

	render_posts: function() {
		var old_posts_removed = false;

		// If the new post count is equal or greater than the per-page then remove all the existing posts in the list.
		if ( wpcom_new_posts_notify.new_posts.length >= wpcom_infinite_scroll.per_page ) {
			$( 'div.sub' ).remove();
			old_posts_removed = true;

			// set the new before timestamp for infiniscroll
			wpcom_reader_ts.set(
				'before',
				wpcom_new_posts_notify.type,
				wpcom_new_posts_notify.new_posts[wpcom_new_posts_notify.new_posts.length - 1].post_timestamp
			);
			
			// Remove all posts except the newest page.
			wpcom_new_posts_notify.new_posts = wpcom_new_posts_notify.new_posts.slice( 0, wpcom_infinite_scroll.per_page );
			wpcom_reader_ts.set( 'before', wpcom_new_posts_notify.type, wpcom_new_posts_notify.new_posts[wpcom_infinite_scroll.per_page - 1].post_timestamp );
		}

		// Add the posts
		$( 'div.reader-header' ).after( wpcom_newdash_renderer.markupPosts( wpcom_new_posts_notify.new_posts ) );
		$( 'div.page-activity' ).html( '' );
		wpcom_new_posts_notify.clear();
		document.title = wpcom_new_posts_notify.initial_page_title;

		// Remove infiniscroll next page and reload a new one if we've replaced all posts
		if ( old_posts_removed ) {
			$( 'div#subs-content div.hide' ).remove(); // Remove existing
			wpcom_infinite_scroll.load( wpcom_new_posts_notify.type );
		}
		
		// Bump the stat.
		wpcom_newdash.bump_stat( 'reader_views', wpcom_new_posts_notify.type + '_load_new' );
	},

	clear: function() {
		this.new_posts = [];
		this.scope = '';
	},

	unload: function() {
		document.title = wpcom_new_posts_notify.initial_page_title;
		this.new_posts = [];
		this.after = false;
		this.topic_slug = '';
		this.blog_id = '';
		this.feed_id = '';
		this.checking = false;

		wpcom_newdash.abort_jqxhr();

		$( 'div.page-activity' ).html( '' );
		$( 'div#reader' ).off( 'click', 'div.new-post-notify' );

		clearInterval( wpcom_new_posts_notify.check_interval );
	}
};

/** Topics heatmap/cloud and search handling ******************************************************/

var wpcom_topic_cloud_and_search = {
	init: function() {
		$('p.heatmap a').attr( 'rel', 'subscriptions.read.topic' );

		$(document).on( 'click.wpcom_topic_cloud', 'p.heatmap a', function(e) {
			if ( $( 'ul#homenav li.topics' ).hasClass( 'current' ) )
				return;
			e.preventDefault();
			var topic_id = $(e.currentTarget).attr('id').replace(/^cat-(\d+)$/, '$1');
			if ( $( '#t-' + topic_id ) && $( '#t-' + topic_id ).length ) {
				wpcom_reader.load_topic_page( $( 'a#t-' + topic_id ) );
				wpcom_reader.nav_click( $( 'a#t-' + topic_id ) );
			} else {
				var val = $(e.currentTarget).attr('href').replace(/^.+\/([^\/]+)\/?/, '$1');
				window.location.hash = '#!/read/topic/' + val + '/';
			}
		});

		$(document).on( 'click.wpcom_topic_search', '#search-tags input[type=button]', function(e) {
			if ( $( 'ul#homenav li.topics' ).hasClass( 'current' ) )
				return;
			e.preventDefault();
			wpcom_topic_cloud_and_search.load_tab_page($("#tag-search-input").val(), true);
		});

		$(document).on( 'keyup.wpcom_topic_search', '#tag-search-input', function(e) {
			if ( $( 'ul#homenav li.topics' ).hasClass( 'current' ) )
				return;

			var code = (e.keyCode ? e.keyCode : e.which);

			if ( e.type == 'keyup' && code != 13 )
				return false;

			wpcom_topic_cloud_and_search.load_tab_page($("#tag-search-input").val(), true);
			return false;
		});
	},

	load_tab_page: function(val, show_searching) {
		if ( true !== show_searching )
			show_searching = false;
		if ( '' !== val ) {
			if ( true === show_searching )
				$('#search-tags input[type=button]').val( 'Searching...' );
			
			location.hash = '#!/read/topic/' + val.toLowerCase().replace( ' ', '-' ) + '/';
		}
	}
};

/** 'My Notifications' tab JS ************************************/

var wpcom_my_notifications_tab = {
	init: function() {
		var t = this;
		$(document).on( 'wpcom_tab_loaded.notifications', function() {
			if ( 'notifications' == wpcom_newdash.active_tab ) {
				t.noteListView = new wpDashNoteListView( { preloadedNotes: wpnd_notes_preloaded } );
			}
			else {
				t.noteListView.unbindScroll();
				t.noteListView = null;
				$(document).off( 'wpcom_tab_loaded.notifications' );
			}
		});
	}
};

/** 'Newdash NUX' JS ************************************/

var wpcom_newdash_nux = {
	steps: [ 'follow', 'connect', 'name', 'theme', 'customize', 'post', 'read' ],
	has_published_post: false,
	theme_purchase_url: false,
	timers: { 'nux': { 'start': 0 } },

	timer_stat: function( key, value ) {
		var stat_value = '';
		value = parseInt( value );
		// Make sure to edit related stat values whitelist in H4 PHP stats ajax function when adding/removing value below
		if ( value <= 60 )
			stat_value = '0m_to_1m';
		else if ( value <= 120 )
			stat_value = '1m_to_2m';
		else if ( value <= 300 )
			stat_value = '2m_to_5m';
		else if ( value <= 600 )
			stat_value = '5m_to_10m';
		else if ( value <= 900 )
			stat_value = '10m_to_15m';
		else if ( value <= 1800 )
			stat_value = '15m_to_30m';
		else if ( value <= 3600 )
			stat_value = '30m_to_60m';
		else
			stat_value = 'over_60m';
			
		wpcom_newdash.bump_stat( 'newdash_timers_' + key, stat_value );
	},
	
	change_step: function( direction ) {
		var currentStep = $( '.nux-current' ).attr( 'id' ).replace( 'nux-step-', '' ),
			position    = $.inArray( currentStep, this.steps ),
			step        = ( direction == 'next' ) ? this.steps[position + 1] : this.steps[position - 1];

		// If the theme picker step needs to be disabled, such as when a user
		// chose a theme before signup, skip it here.
		// It's semi-important that the HTML for the picker still remain, as it
		// sets up a lot of the data for the /customize/ step.
		if ( 'theme' == step && $( 'body' ).hasClass( 'no-theme-picker' ) ) {
			position = ( direction == 'next' ) ? position + 1 : position - 1;
			step = ( direction == 'next' ) ? this.steps[position + 1] : this.steps[position - 1];
		}
		
		if ( step ) {
			// timers: current (soon to be previous) step, keep track of time spent so far (might have seen multiple times)
			if ( this.timers[currentStep] && this.timers[currentStep]['start'] ) {
				if ( ! this.timers[currentStep]['so_far'] )
					this.timers[currentStep]['so_far'] = 0;
				this.timers[currentStep]['so_far'] += wpcom_newdash.unix_timestamp( new Date() ) - this.timers[currentStep]['start'];
			}
			
			// timers: start the timer for the next (soon to be current) step
			if ( ! this.timers[step] )
				this.timers[step] = { 'start': 0 };
			this.timers[step]['start'] = wpcom_newdash.unix_timestamp( new Date() );
	
			wpcom_newdash.bump_stat( 'newdash_nux_direction', direction );
			wpcom_newdash.bump_stat( 'newdash_nux_direction', currentStep + '_to_' + step );

			location.hash = '#!/welcome/step/' + step + '/';
		}
		else {
			location.hash = '#!/welcome/step/follow/';
		}
	},

	render_step: function( args ) {
		var self = this;
		
		args = typeof(args) != undefined ? args : {};
		args.step = typeof(args.step) != undefined ? args.step : false;
		args.target = '.nux-current';
		args.direction = 'next';

		if ( !args.step )
			return false;

		$( 'html' ).css( { 'overflow': 'visible' } );
		setTimeout( function() {
			$( 'body' ).animate( { scrollTop : 0 }, 200 );
		}, 350 );

		// Load the nux frame if it doesn't exist.
		if ( !$( 'div#welcome-nux' ).length ) {
			wpcom_newdash.highlight_tab( 'welcome' );

			wpcom_newdash.load_template( { template: 'welcome/nux-frame.php', query: 'step=' + args.step, callback: function() {
				wpcom_newdash.maximize_viewport_height();
				
				// Call the step function for the inital step
				self['step_' + args.step]( args );

				// and start the appropriate initial nux timers
				self.timers['nux']['start']     = wpcom_newdash.unix_timestamp( new Date() );
				if ( ! self.timers[args.step] )
					self.timers[args.step] = { 'start': 0 };
				self.timers[args.step]['start'] = wpcom_newdash.unix_timestamp( new Date() );

				self.preload_steps( args );
				self.adjust_nav( args );	
			} } );
			
		// Frame is loaded so slide the correct step in.
		} else {
			if ( $( '#nux-step-' + args.step ).length ) {
				$( '#welcome-nux' ).find( '.nux-current' ).removeClass( 'nux-current' ).addClass( 'off-screen' );
				$( '#nux-step-' + args.step ).addClass( 'nux-current' ).removeClass( 'off-screen' );

				this.markup_steps( args );
				this.adjust_nav( args );
				
				// Init the step JS
				self['step_' + args.step]( args );	
			}
		}

		// keep track of step impressions
		wpcom_newdash.bump_stat( 'newdash_nux_steps', args.step );
	},

	preload_steps: function( args ) {
		var self = this;

		$.each( this.steps, function( i, step ) {
			if ( step == args.step )
				return;
				
			$( '#welcome-nux' ).append( '<div class="off-screen" id="nux-step-' + step + '"></div>' );
			wpcom_newdash.load_template( { template: 'welcome/' + step + '.php', target: '#nux-step-' + step } );
		});
		
		this.markup_steps( args );
	},

	markup_steps: function( args ) {
		var position = $.inArray( args.step, this.steps ),
			nextStep = this.steps[position + 1],
			prevStep = this.steps[position - 1];

		if ( $.browser.msie && parseInt( $.browser.version, 10 ) < 10 )
			$( 'body' ).addClass( 'ie' );
						
		$( '#welcome-nux' ).find( '.nux-next' ).removeClass( 'nux-next' );
		$( '#welcome-nux' ).find( '.nux-prev' ).removeClass( 'nux-prev' );
		
		// Mark the next and prev steps
		if ( nextStep != undefined )
			$( '#nux-step-' + nextStep ).addClass( 'nux-next' );

		if ( prevStep != undefined )
			$( '#nux-step-' + prevStep ).addClass( 'nux-prev' );
	},

	fetch_step: function( args ) {
		this['step_' + args.step]( args );
		$( '.nux-current' ).attr( 'id', 'nux-step-' + args.step );
	},
	
	adjust_nav: function( args ) {
		var nav = $( '#nux-nav' ),
			next = nav.find( '.next-link' ),
			prev = nav.find( '.prev-link' );
		
		prev.css( { 'opacity': 1 } );
		next.removeClass( 'name-next' );		
		next
			.attr( 'href', '#!/welcome/step/next/' )
			.html( 'Next Step &rarr;' );

		if ( 'post' == args.step ) {
			next
				.attr( 'href', '#!/welcome/step/read/' )
				.html( 'Finish' );
		}
		
		if ( 'follow' == args.step )
			prev.css( { 'opacity': 0 } );
		
		if ( 'name' == args.step )
			next.addClass( 'name-next' );
	},
	
	// Actual step functionality starts here...
	
	step_follow: function( args ) {
		// Make sure the user is following their own blog and en.blog if applicable.
		$.post( '/wp-admin/admin-ajax.php', { 'action': 'nux_follow_core_blogs' } );
		
		// Follow some topics
		$( 'li.welcome-topic-entry', 'div#tab-content' ).off( 'click.nux' ).on( 'click.nux', function(e) {
			if ( ! $(e.target).hasClass('sub-button') ) // if the click is not on the follow/unfollow button
				$('a.topic', e.currentTarget).click();  // then call the click event on it
		});
	},

	step_connect: function( args ) {
		wpcom_friend_finder.init();
	},
	
	step_name: function( args ) {
		// Save the form when hitting next.
		$('#welcome-nux').find( '#nux-nav' ).off( 'click.nux', '.name-next' ).on( 'click.nux', '.name-next', function(e) {
			e.preventDefault();
			
			$.post(
				'/wp-admin/admin-ajax.php', { 
					'action': 'nux_setup_blog', 
					'nonce': $( 'input#newdash_nonce' ).val(), 
					'blogname': $('input#blogname').val(), 
					'blogdescription': $('input#blogdesc').val(),
					'bloglanguage': $('select#lang_id').val()
				}
			);
			
			location.hash = $(this).attr('href');
		} );
	},
	
	step_theme: function( args ) {
		var last_visible_theme_index = 0;
		var theme_page_size = 9;
		var more_button_clicks = 0;
		
		// Reset the iframe and purchase URL
		$( '#nux-step-customize' ).find( 'iframe:first' ).attr( 'src', 'about:blank' );
		$( '#nux-step-customize' ).find( '.theme-price' ).hide();
		
		// Reset the purchase flow
		wpcom_newdash_nux.remove_purchase_step();

		$( '#theme-chooser' ).off( '.nux' ).on( 'click.nux', 'a[theme]', function ( e ) {
			e.preventDefault();
			
			var $this = $( this );

			$( '#theme-chooser' ).find( '.theme.selected' ).removeClass( 'selected' );
			
			$this.closest( '.theme' ).addClass( 'selected' ),

			setTimeout( function() {
				location.hash = '#!/welcome/step/customize/';
			}, 700 );
		} );

		$( '#more-themes' ).off( '.nux' ).on( 'click.nux', function ( e ) {
			var themes = $( '.theme' );

			themes.slice( last_visible_theme_index + 1, last_visible_theme_index + 1 + theme_page_size ).show();
			$( this ).animate( { opacity : 1 }, 1200 );

			last_visible_theme_index += theme_page_size;

			if ( last_visible_theme_index >= themes.length )
				$( this ).hide();

			new Image().src = document.location.protocol + '//stats.wordpress.com/g.gif?v=wpcom-no-pv&x_themes-on-signup-more=' + ( ++more_button_clicks ) + '&baba='+Math.random();
		} );

		$( '#themes-on-signup-theme-preview' ).off( '.nux' ).on( 'click.nux', '.cancel a', function ( e ) {
			e.preventDefault();

			$( '#themes-on-signup-theme-preview' ).hide();
			$( '#theme-chooser, .success' ).show();

			$( '#theme-picker-header' ).each( function () {
				$( this ).text( $( this ).attr( 'browse-text' ) );
			} );

			$( '.preview' ).hide();
			$( '.browse' ).show();

			$( 'html, body' ).animate( { scrollTop : $( '.theme.selected' ).offset().top }, 1000 );
		} );

		$( '.theme' ).slice( theme_page_size ).hide();
		last_visible_theme_index = theme_page_size - 1;
	},

	step_customize: function ( args ) {
		if ( !$('#nux-step-theme').find( '.theme.selected' ).length ) {
			setTimeout( function () { location.hash = '#!/welcome/step/theme/'; }, 100 );
			return;
		}
			
		$( '#customize-frame' ).removeClass( 'active' ).attr( 'src', 'about:blank' ).hide();

		var $selected_theme = $('#nux-step-theme').find( '.theme.selected' ).find('a:first'),
			$selected_theme_stylesheet = $selected_theme.attr( 'stylesheet' ),
			$selected_theme_title = $selected_theme.parent().find( 'h3' ).html(),
			$selected_theme_meta = $selected_theme.parent().find( '.meta' ),
			$customize_step = $( '#nux-step-customize' );
			
		// Save the theme choice
		$.post( ajaxurl, { action : 'themes_on_signup_theme_selection', _wpnonce : $( 'input#newdash_nonce' ).val(), theme : $selected_theme_stylesheet }, function ( data ) {
			// @todo Handle errors here and save any post-welcome URLs for purchasing premium themes.
		}, 'json' );
		
		// Add the theme title, preview and meta to the customize step
		$customize_step
			.find( '.nux-theme-title' )
				.html( $selected_theme_title );

		$customize_step
			.find( 'iframe:first' )
				.attr( 'src', $selected_theme.attr( 'preview' ) )
				.load( function ( e ) {
					$( '#wp-loader' ).fadeOut( function() {
						$( this ).hide();
					});
				}).end();

		$customize_step
			.find( '.theme-description' )
				.html( $selected_theme_meta.find( '.theme-description' ).html() );
		
		$customize_step
			.find( '.theme-features' )
				.html( $selected_theme_meta.find( '.theme-features' ).html() );

		if ( $selected_theme.attr( 'premium' ) ) {
			var $price = '$' + $selected_theme.attr( 'price' );
			
			// Add the price to the header.
			$customize_step.find( '.theme-price' ).html( $price ).show();
			
			if ( !$( '#nux-step-purchase' ).length )
				wpcom_newdash_nux.add_purchase_step( $selected_theme );
			
			$( '#themes-on-signup-theme-preview' )
				.addClass( 'theme-preview-premium' )
				.removeClass( 'theme-preview-free' )
				.find( '.premium[label]' )
					.each( function () {
						$( this ).text(
							$( this ).attr( 'label' ).replace( '%1', '$' + $price )
						);
					} );
		}
		else {
			$( '#welcome-nux' ).find( '.nux-next' ).removeClass( 'nux-next' );
			$( '#nux-step-post' ).addClass( 'nux-next' );
			
			$( '#themes-on-signup-theme-preview' )
				.addClass( 'theme-preview-free' )
				.removeClass( 'theme-preview-premium' )
		}

		$( '.load-customizer' ).off( '.nux' ).on( 'click.nux', function ( e ) {
			e.preventDefault();

			var customizer_iframe = $( '#customize-frame' ),
				spinner = $customize_step.find( 'div#customize-loader' ).prependTo( 'body' ).spin('medium').show();
				
			maximize_customizer_height();
			
			customizer_iframe
				.addClass( 'active' )
				.prependTo( 'body' )
				.attr( 'src', customizer_iframe.data( 'admin-url' ) + '?frame-nonce=' + encodeURIComponent( customizer_iframe.data( 'nonce' ) ) + '&theme=' + encodeURIComponent( $selected_theme_stylesheet ) )
				.load( function() {
					$( 'html' ).css( { 'overflow': 'hidden' } );
					$( 'div#customize-loader' ).fadeOut( 'fast' );
				} )
				.fadeIn('fast');
		} );

		function maximize_customizer_height() {
			var viewport = $(window);

			$( 'div#customize-loader' ).css( { 'left': ( viewport.width() / 2 ) + 'px', 'top': ( ( viewport.height() - 25 ) / 2 ) + 'px' } );
			$( '#customize-frame' ).css( { 'width': viewport.width() + 'px', 'height': viewport.height() + 'px' } );
		}

		var self = this;
		self.customizer_timout = null;

		$( window ).off( 'resize.nux-customizer' ).on( 'resize.nux-customizer', function() {
			clearTimeout( self.customizer_timeout );
			self.customizer_timeout = setTimeout( function() {
				maximize_customizer_height();
			}, 20 );
		});
	},

	close_cusomizer: function( via_action ) {
		var timeout = ( 'save' == via_action ) ? 1500 : 0;
		
		setTimeout( function() {
			$( 'iframe#customize-frame' ).fadeOut( 'fast' );
			
			if ( 'save' == via_action )
				setTimeout( function() { wpcom_newdash_nux.change_step( 'next' ); }, 250 );
			else
				setTimeout( function() { location.hash = '#!/welcome/step/customize/'; }, 250 );
		}, timeout );
	},

	step_purchase: function ( args ) {
		if ( !wpcom_newdash_nux.theme_purchase_url )
			location.hash = '#!/welcome/step/theme/';
	},
	
	add_purchase_step: function( theme ) {
		// Set the theme purchase URL
		wpcom_newdash_nux.theme_purchase_url = theme.attr( 'purchase_url' );
			
		// Add the purchase step.
		wpcom_newdash_nux.steps.splice( $.inArray( 'customize', wpcom_newdash_nux.steps ) + 1, 0, 'purchase' );
	
		// Request the template
		$( '#welcome-nux' ).find( '.nux-next' ).removeClass( 'nux-next' );
		$( '#welcome-nux' ).append( '<div class="off-screen nux-next" id="nux-step-purchase"></div>' );
		
		wpcom_newdash.load_template( { template: 'welcome/purchase.php', target: '#nux-step-purchase', callback: function() {
			// Preload the purchase page.
			var iframe = $( '#nux-step-purchase' ).find( '#purchase-frame' )
			iframe.addClass( 'active' )
				.attr( 'src', wpcom_newdash_nux.theme_purchase_url + '&frame-nonce=' + encodeURIComponent( iframe.data( 'nonce' ) ) );
		} } );
	},

	remove_purchase_step: function() {
		wpcom_newdash_nux.theme_purchase_url = false;

		var key = $.inArray( 'purchase', wpcom_newdash_nux.steps );
		if ( -1 !== key )
			wpcom_newdash_nux.steps.splice(key, 1);
			
		// Remove the template
		$('#nux-step-purchase').remove();
	},

	step_post: function( args ) {
		// Init TinyMCE.
		jQuery( '#ipt-ed-placeholder' ).before( jQuery( '#wp-ipteditor-wrap' ) );
		if ( jQuery( '#wp-ipteditor-wrap' ).parent().is( '.ipt-form-body' ) ) {
			setTimeout( function(){
				tinymce.init( tinyMCEPreInit.mceInit.ipteditor );
			}, 200 );
		}

		// Trigger the step slide when a post is published.
		jq(document).on( 'ipt_published_post_rendered', function() {
			wpcom_newdash_nux.has_published_post = true;
						
			setTimeout( function() {
				wpcom_newdash_nux.change_step( 'next' );			
			}, 200 );
		});
	},

	step_read: function( args ) {
		if ( wpcom_newdash.ua.indexOf('mobile') > -1 ) {
			location.hash = '#!/read/following/';
			return;
		}
	
		$( '#reader' ).css( { 'min-height': $( '#welcome-nux' ).height() + 'px' } );	
		var self = this;
	
		setTimeout( function() {

			// timers: keep track of the total amount of time spent on nux
			if ( self.timers['nux']['start'] > 0 )
				self.timer_stat( 'nux', wpcom_newdash.unix_timestamp( new Date() ) - self.timers['nux']['start']  );
			
			// timers: then send keep track of the timer totals for each step during full visit
			$.each( self.timers, function( key, value ){
				if ( 'nux' != key && parseInt( self.timers[key]['so_far'] ) > 0 ) {
					self.timer_stat( key, self.timers[key]['so_far'] );
				}
			});
			
			$('div#reader').appendTo('div#tab-content');
			$('div#welcome-nux').remove();		
	
			// Hide the fixed step nav.
			$('div#nux-nav').hide();
			
			// Make sure the tab nav and admin bar is visible.
			$( '#homenav li' ).removeClass( 'current' );
			$( 'ul#homenav' ).slideDown().find('li.read').addClass('current');	
			$( '#wpadminbar' ).slideDown();
			$( 'body' ).removeClass( 'noadminbar' );
			
			wpcom_reader.page_following();
			
			// Load the tips
			$( '#tab-content' ).prepend( '<div id="reader-tips"></div>' );
			
			wpcom_newdash.load_template( { template: 'welcome/read-tips.php', target: '#reader-tips', callback: function() {
				$( 'body' ).addClass( 'nux' );
				
				var $tip1 = $( "#nux-tip-1" ),
					$tip2 = $( "#nux-tip-2" ),
					$tip3 = $( "#nux-tip-3" ),
					$tip4 = $( "#nux-tip-4" );
				
				setTimeout( function() {
					$( '#reader' ).find( '.page-activity' ).remove();
					
					$tip1.fadeIn('fast').find( "button.button-secondary" ).on( 'click.nux', function() {
						$tip1.fadeOut( 'fast', function() {
							$tip2.fadeIn( 'fast' );
						});
					});
	
					$tip2.find( "button.button-secondary" ).on( 'click.nux', function() {
						$tip2.fadeOut( 'fast', function() {
							$tip3.fadeIn( 'fast' );
						});
					});
	
					$tip3.find( "button.button-secondary" ).on( 'click.nux', function() {
						$tip3.fadeOut( 'fast', function() {
							$tip4.fadeIn( 'fast' );
						});
					});
	
					$tip4.find( "button.button-primary" ).on( 'click.nux', function() {
						$tip4.fadeOut( 'fast', function() {
							$( '#reader-tips' ).remove();
							location.hash = '#!/read/following/';
							$( 'body' ).removeClass( 'nux' );
						});
					});				
				}, 800 );
			} } );
		
		}, 650 );
	}
};

/** Remote avatar fetching via async *****************************/

function wp_remote_avatar_fetch() {
	// Find all blogs using an RSS icon and look for a remote icon.
	var images = $( "img[src='https://en.wordpress.com/wp-content/themes/h4/i/subs-rss.png'], img[src='https://s-ssl.wordpress.com/wp-content/themes/h4/i/subs-rss.png']" );
	var rels = [];

	$.each( images, function( i, el ) {
		if ( -1 != $.inArray( $(el).attr('rel'), rels ) )
			return;

		$.get( '/wp-admin/admin-ajax.php', {
			'action': 'fill_avatars',
			'blog_url': $(el).attr('rel')
		},
		function(response) {
			if ( '-1' !== response && '' !== response ) {
				$( "img[rel='" + $(el).attr('rel') + "']").fadeOut( 'fast', function() {
					$( "img[rel='" + $(el).attr('rel') + "']").attr( 'src', response );
					$( "img[rel='" + $(el).attr('rel') + "']").fadeIn( 'fast' );
				} );
			}
		});
		rels.push( $(el).attr('rel') );
	});
}


var wpcom_newdash_smallscreen = {
	firsttime: true,
	appbodyleft: 0,
	
	init: function() {
		$('body').addClass( 'smallscreen' );
		$('div.right-column-outer').css( { 'min-height': $('div#sidebar').height() + 'px' } );
	
		// TODO load tappable.js dynamically here.
		
		if ( this.firsttime ) {
			// Hide the reader sidebar
			$( 'body.smallscreen #reader #sidebar' ).addClass('hide');

		    // Hide the address bar!
			setTimeout(function(){
	    		window.scrollTo(0, 1);
	  		}, 0);

			this.setToolbarTitle();
		
			tappable('body.smallscreen div.reader-header', {
				noScroll: true,
				onTap: function(e, target){
					e.preventDefault();
					
					$('body.smallscreen #reader #sidebar').removeClass('hide');
					
					if ( $(e.target).hasClass('reader-header') || $(e.target)[0].nodeName == 'H2' )
						wpcom_newdash_smallscreen.toggleSidebar();
				}
			});

			tappable('body.smallscreen div#sidebar li', {
				noScroll: false,
				onTap: function(e, target){
					if ( $(e.target).attr('id') == 'add-topic-input' || $(e.target).parents('li#add-topic-input').length ) {
						// Add topic form
						return false;
					} else if ( $(e.target)[0].nodeName == 'SPAN' && $(e.target).parent('a.remove-topic').length ) {
						// Remove topic X
						return false;
					} else if ( $(e.target)[0].nodeName == 'SPAN' && $(e.target).parent('a.topics').length ) {
						wpcom_newdash_smallscreen.loadSubPage($(e.target).parents('a.topics'));
						return false;
					} else if ( $(e.target)[0].nodeName == 'SPAN' && $(e.target).parents('a.edit').length ) {
						// Edit list link
						wpcom_newdash_smallscreen.loadSubPage($(e.target).parents('a.edit'));
						return false;
					} else {
						wpcom_newdash_smallscreen.loadSubPage($(e.target));
						return false;
					}
				}
			});
			
			$('#wpadminbar ul#wp-admin-bar-newdash-default').on('click', 'li > a.ab-item', function(e) {
				var title = $(this).html(),
					menu = $('body.smallscreen a.ab-item span.newdash-title');
				
				menu.html( title );
				
				setTimeout(function(){
    				window.scrollTo(0, 1);
		  		}, 0);
				
				setTimeout( function() {
					$('body.smallscreen li#wp-admin-bar-newdash').removeClass( 'hover' );
					menu.css( { backgroundPosition: ( menu.outerWidth() - 20 ) + 'px 24px' } );
				}, 10 );
					
			});

			this.firsttime = false;
		}
	},
	
	toggleSidebar: function() {
		if ( $( 'body.smallscreen div.right-column-outer' ).hasClass( 'open' ) ) {
			this.appbodyLeft = 0;
			$( 'body.smallscreen div.right-column-outer' ).removeClass( 'open' ).css( { '-webkit-transform': 'translate3d( ' + this.appbodyLeft + 'px, 0, 0 )' } );
			
			setTimeout( function() {
				$('body.smallscreen #reader #sidebar').addClass('hide');
				$( 'body.smallscreen div.right-column-outer' ).removeClass( 'transition' )	
			}, 300 );
		} else {
			this.appbodyLeft = $(document).width() - 47;
			$( 'body.smallscreen div.right-column-outer' ).addClass( 'transition open' ).css( { '-webkit-transform': 'translate3d( -' + this.appbodyLeft + 'px, 0, 0 )' } );
			$( 'body.smallscreen #reader #sidebar' ).removeClass( 'hide' );
		}		
	},
	
	setToolbarTitle: function() {
		$('body.smallscreen li#wp-admin-bar-newdash > a').append( '<span class="newdash-title"></span>' );
		var title = '';
		$.each( $('body.smallscreen ul#wp-admin-bar-newdash-default > li' ), function( i,el ) {
			var anc = $(el).children('a.ab-item');
			var href = anc.attr('href').split('#!');
				href = '#!' + href[1],
				menu = $('span.newdash-title', 'body.smallscreen li#wp-admin-bar-newdash > a' );
			
			if ( -1 != location.hash.search( href ) )
				menu.html( anc.html() ).css( { backgroundPosition: ( menu.outerWidth() - 20 ) + 'px 24px' } );
		});	
	},

	loadSubPage: function($target) {
		$( 'li', 'body.smallscreen div#sidebar ul' ).removeClass( 'selected' );

		if ( $target.parent('ul').length ) {
			$target.addClass( 'selected' );
			location.hash = $target.childrent('a').attr('href');
		} else {
			$target.parent('li').addClass('selected');
			location.hash = $target.attr('href');
		}
		
		// Make sure the content section is always at least the height of the sidebar
		$('body.smallscreen div.right-column-outer').css( { 'min-height': $('div#sidebar').height() + 'px' } );
		
		setTimeout( function() {
			$('body').animate( {scrollTop : 0}, 300, function() {
				setTimeout( wpcom_newdash_smallscreen.toggleSidebar, 150 );
			} );
		}, 350 );
	}
}
var wpcom_newdash_smallscreen_interval = setInterval( function() {
	if ( $(document).width() <= 700 )
		wpcom_newdash_smallscreen.init();
	else
		$('body').removeClass( 'smallscreen' );
}, 3000 );


/** Plugins ******************************************************/

/* ScrollTo */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.$)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})($);
$.extend($.easing, {easein:function(x,t,b,c,d){return c*(t/=d)*t+b},easeinout:function(x,t,b,c,d){if(t<d/2)return 2*c*t*t/(d*d)+b;var ts=t-d/2;return-2*c*ts*ts/(d*d)+2*c*ts/d+c/2+b},easeout:function(x,t,b,c,d){return-c*t*t/(d*d)+2*c*t/d+b},expoin:function(x,t,b,c,d){var flip=1;if(c<0){flip*=-1;c*=-1}return flip*(Math.exp(Math.log(c)/d*t))+b},expoout:function(x,t,b,c,d){var flip=1;if(c<0){flip*=-1;c*=-1}return flip*(-Math.exp(-Math.log(c)/d*(t-d))+c+1)+b},expoinout:function(x,t,b,c,d){var flip=1;if(c<0){flip*=-1;c*=-1}if(t<d/2)return flip*(Math.exp(Math.log(c/2)/(d/2)*t))+b;return flip*(-Math.exp(-2*Math.log(c/2)/d*(t-d))+c+1)+b},bouncein:function(x,t,b,c,d){return c-$.easing['bounceout'](x,d-t,0,c,d)+b},bounceout:function(x,t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b}},bounceinout:function(x,t,b,c,d){if(t<d/2)return $.easing['bouncein'](x,t*2,0,c,d)*.5+b;return $.easing['bounceout'](x,t*2-d,0,c,d)*.5+c*.5+b},elasin:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b},elasout:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b},elasinout:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(.3*1.5);if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b},backin:function(x,t,b,c,d){var s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b},backout:function(x,t,b,c,d){var s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},backinout:function(x,t,b,c,d){var s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b},linear:function(x,t,b,c,d){return c*t/d+b}});

})(jQuery);

;
var wpFollowButton;

(function($) {
	var cookies = document.cookie.split( /;\s*/ ), cookie = false;
	for ( i = 0; i < cookies.length; i++ ) {
		if ( cookies[i].match( /^wp_api=/ ) ) {
			cookies = cookies[i].split( '=' );
			cookie = cookies[1];
			break;
		}
	}

wpFollowButton = {

	enable: function() {
		$( 'a.wpcom-follow, a.wpcom-following' ).click( function( e ) {
			e.preventDefault();
		
 	 		var link = $( this );
		
			var blog_id = link.data('id');
			var blog_url = link.data('url');
			var is_following = link.hasClass( 'wpcom-following' );

			if ( blog_id ) {
				var f_id = blog_id;
			} else {
				var ln_classes = link.attr( 'class' ).split( ' ' );
				for ( i=0; i < ln_classes.length; i++ ) {
					if ( 0 == ln_classes[i].indexOf('f-') ) {
						var f_id = ln_classes[i].slice( 2, ln_classes[i].length );
					}
				}
			}

 	 		if ( is_following ) {
				var action = 'ab_unsubscribe_from_blog';
 	 		} else {
				var action = 'ab_subscribe_to_blog';
			}
		
			var elem = $( 'a.f-' + f_id );
			if ( is_following ) {
				elem.fadeOut( 'fast', function() {
					elem.removeClass( 'wpcom-following' ).addClass( 'wpcom-follow' ).text( 'Follow' );
					elem.fadeIn( 'fast' );
 	 			})
			} else {
 	 			elem.fadeOut( 'fast', function() {
 	 				elem.addClass( 'wpcom-following' ).removeClass( 'wpcom-follow' ).text( 'Following' );
 	 				elem.fadeIn( 'fast' );
				})
 	 		}
		
			var href = link.attr( 'href' );
		
			var params = href.split( '\?' );
			var domain = params[0];
			var flds = 'undefined' != typeof params[1] ? params[1].split( '&' ) : [];
			for ( var i = 0; i < flds.length; i++ ) {
 	 			var pos = flds[i].indexOf( '=' );
 	 			if ( -1 == pos ) continue;
 	 			var argname = flds[i].substring( 0, pos );
 	 			var value = flds[i].substring( pos+1 );
		
				if ( argname == '_wpnonce') {
 	 				var nonce = value; 
				} else if ( argname == 'src' ) {
					var source = value;
 	 			}
			}

			$.post( domain + 'wp-admin/admin-ajax.php', {
 	 			'action': action,
 	 			'_wpnonce': nonce,
 	 			'blog_id': blog_id,
 	 			'blog_url': blog_url,
 	 			'source': source
			}, function( response ) {
 	 			if ( 'object' == typeof response.errors ) {
 	 				if ( is_following )
 	 					elem.removeClass( 'wpcom-follow' ).addClass( 'wpcom-following' ).text( 'Following' );
 	 				else
 	 					elem.removeClass( 'wpcom-following' ).addClass( 'wpcom-follow' ).text( 'Follow' );
 	 			}
 	 		});
		});
	},

	enable_rest: function( el, source ) {
		var t = this;

		el.unbind( 'click' ).bind( 'click', function( e ) {
			e.preventDefault();
 	 		var link = $( this );
			var blog_id = link.attr( 'data-blog-id' );
 	 		var is_following = link.hasClass( 'wpcom-following-rest' );
			var rest_path = '/sites/' + blog_id + '/follows/new';
		
 	 		if ( is_following ) {
				rest_path = '/sites/' + blog_id + '/follows/mine/delete';
 	 		}
		
			//select and update ALL follow buttons on the page (could be more than one)
			var attr_selector = 'data-blog-id="' + blog_id + '"';
			var elem = $( 'a.wpcom-follow-rest[' + attr_selector + '], a.wpcom-following-rest[' + attr_selector + ']' );
			if ( is_following ) {
				elem.fadeOut( 'fast', function() {
					elem.removeClass( 'wpcom-following-rest' ).addClass( 'wpcom-follow-rest' ).text( link.attr( 'data-follow-text' ) );
					elem.fadeIn( 'fast' );
 	 			})
			} else {
 	 			elem.fadeOut( 'fast', function() {
 	 				elem.addClass( 'wpcom-following-rest' ).removeClass( 'wpcom-follow-rest' ).text( link.attr( 'data-following-text' ) );
 	 				elem.fadeIn( 'fast' );
				})
 	 		}
		
			t.ajax( {
				type: 'POST',
				path : rest_path,
				success : function( res ) {
					if ( ! res.success ){
	 	 				if ( is_following )
 		 					elem.removeClass( 'wpcom-follow-rest' ).addClass( 'wpcom-following-rest' ).text( link.attr( 'data-following-text' ) );
 	 					else
 	 						elem.removeClass( 'wpcom-following-rest' ).addClass( 'wpcom-follow-rest' ).text( link.attr( 'data-follow-text' ) );
					}
				},
				error : function( res ) {
 	 				if ( is_following )
 	 					elem.removeClass( 'wpcom-follow-rest' ).addClass( 'wpcom-following-rest' ).text( link.attr( 'data-following-text' ) );
 	 				else
 	 					elem.removeClass( 'wpcom-following-rest' ).addClass( 'wpcom-follow-rest' ).text( link.attr( 'data-follow-text' ) );
				}
 	 		});

			//show post-Follow bubble
			if ( ! is_following ) {
				t.showBubble( link );
				t.bumpStat( link.attr( 'data-stat-src' ) );
			}
		});

		//show unfollow text on hover
		el.hover( function() {
	 	 		var link = $( this );
 		 		var is_following = link.hasClass( 'wpcom-following-rest' );
				if ( is_following )
					link.text( link.attr( 'data-following-hover-text' ) );
			}, function() {
	 	 		var link = $( this );
 		 		var is_following = link.hasClass( 'wpcom-following-rest' );
				if ( is_following )
					link.text( link.attr( 'data-following-text' ) );
			});

	},

	showBubble: function( link ) {
		var pos = link.position();
		$( 'div.bubble-txt', 'div.action-bubble' ).html( "New posts from this blog will now appear in <a href='http://wordpress.com/#!/read/' onclick='hideBubble()'>your reader</a>." );
		var bubble = $( 'div.action-bubble' );
		link.parent().append( bubble );
		var left = pos.left + ( link.width() / 2 ) - ( $( 'div.wpcom-bubble' ).width() / 2 );
		var top = pos.top + bubble.height();
		bubble.css( { left: left + 'px', top: top + 'px' } );
		bubble.addClass( 'fadein' );
		setTimeout( function() {
			$('body').on( 'click.bubble touchstart.bubble', function(e) {
				if ( !$(e.target).hasClass('action-bubble') && !$(e.target).parents( 'div.action-bubble' ).length )
					hideBubble();
			});
			$(document).on( 'scroll.bubble', hideBubble );
			setTimeout( hideBubble, 10000 );
		}, 500 );
	},

	hideBubble: function() {
		$( 'div.wpcom-bubble.action-bubble' ).remove();
  	},

	//common method for rendering a follow button from the object data
	create : function ( data, source ) {
		var is_following = data['params']['is_following'];
		var follow_link = $('<a></a>', {
			'class' : ( is_following ? 'wpcom-following-rest' : 'wpcom-follow-rest' ),
			href : 'http://public-api.wordpress.com/sites/' + data['params']['blog_id'] + '/follows',
			title : data['params']['blog_title'] + 
				' (' + data['params']['blog_domain'] + ')',
			html : is_following ? data['params']['following-text'] : data['params']['follow-text']
		} ).attr( { 
			'data-blog-id' : data['params']['blog_id'],
			'data-stat-src' : data['params']['stat-source'],
			'data-follow-text' : data['params']['follow-text'],
			'data-following-text' : data['params']['following-text'],
			'data-following-hover-text' : data['params']['following-hover-text']
		} );
		var follow_button = $( '<div></div>', { 
			'class': 'wpcom-follow-container',
			style: 'display: inline-block;'
		 } ).append( follow_link );

		this.enable_rest( follow_link, source );
		return follow_button;
	},

	createAll: function() {
		$( '.wpcom-follow-container' ).each( function( index ) {
			var el = $( this );
			el.replaceWith( wpFollowButton.create( el.data( 'json' ), el.data( 'follow-source' ) ) );
		});
	},

	ajax: function( options ) {
		if ( document.location.host == 'public-api.wordpress.com' ) {
			//console.log( 'regular ajax call ' + options.type + ' ' + options.path);
			$.ajaxSetup({ beforeSend : function(xhr){
				if ( cookie ) {
					xhr.setRequestHeader( 'Authorization', 'X-WPCOOKIE ' + cookie + ':1:' + document.location.host );
				}
			}});
			var request = {
				type : options.type,
				url : 'https://public-api.wordpress.com/rest/v1' + options.path,
				success : options.success,
				error : options.error,
				data : options.data
			};
			$.ajax(request);
			$.ajaxSetup({ beforeSend : null });
		} else {
			//console.log( 'proxied ajax call ' + options.type + ' ' + options.path );
			var request = {
				path: options.path,
				method: options.type
			};
			if ( request.method === "POST" )
				request.body = options.data;
			else
				request.query = options.data;

			$.wpcom_proxy_request(request, function ( response, statusCode ) { 
				if ( 200 == statusCode ) 
					options.success( response );
				else
					options.error( statusCode );
			} );
		}
	},

	bumpStat: function( source ) {
		new Image().src = document.location.protocol + 
			'//stats.wordpress.com/g.gif?v=wpcom-no-pv&x_follow_source=' + source + '&baba=' + Math.random();
	}

};

$(function(){
	wpFollowButton.enable()
	wpFollowButton.createAll()
});

})(jQuery);
;
(function(a,b){wpWordCount={settings:{strip:/<[a-zA-Z\/][^<>]*>/g,clean:/[0-9.(),;:!?%#$¿'"_+=\\/-]+/g,w:/\S\s+/g,c:/\S/g},block:0,wc:function(e,g){var f=this,d=a(".word-count"),c=0;if(g===b){g=wordCountL10n.type}if(g!=="w"&&g!=="c"){g="w"}if(f.block){return}f.block=1;setTimeout(function(){if(e){e=e.replace(f.settings.strip," ").replace(/&nbsp;|&#160;/gi," ");e=e.replace(f.settings.clean,"");e.replace(f.settings[g],function(){c++})}d.html(c.toString());setTimeout(function(){f.block=0},2000)},1)}};a(document).bind("wpcountwords",function(d,c){wpWordCount.wc(c)})}(jQuery));;
/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.core.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){function c(b,c){var e=b.nodeName.toLowerCase();if("area"===e){var f=b.parentNode,g=f.name,h;return!b.href||!g||f.nodeName.toLowerCase()!=="map"?!1:(h=a("img[usemap=#"+g+"]")[0],!!h&&d(h))}return(/input|select|textarea|button|object/.test(e)?!b.disabled:"a"==e?b.href||c:c)&&d(b)}function d(b){return!a(b).parents().andSelf().filter(function(){return a.curCSS(this,"visibility")==="hidden"||a.expr.filters.hidden(this)}).length}a.ui=a.ui||{};if(a.ui.version)return;a.extend(a.ui,{version:"1.8.20",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}}),a.fn.extend({propAttr:a.fn.prop||a.fn.attr,_focus:a.fn.focus,focus:function(b,c){return typeof b=="number"?this.each(function(){var d=this;setTimeout(function(){a(d).focus(),c&&c.call(d)},b)}):this._focus.apply(this,arguments)},scrollParent:function(){var b;return a.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?b=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(a.curCSS(this,"position",1))&&/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0):b=this.parents().filter(function(){return/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0),/fixed/.test(this.css("position"))||!b.length?a(document):b},zIndex:function(c){if(c!==b)return this.css("zIndex",c);if(this.length){var d=a(this[0]),e,f;while(d.length&&d[0]!==document){e=d.css("position");if(e==="absolute"||e==="relative"||e==="fixed"){f=parseInt(d.css("zIndex"),10);if(!isNaN(f)&&f!==0)return f}d=d.parent()}}return 0},disableSelection:function(){return this.bind((a.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),a.each(["Width","Height"],function(c,d){function h(b,c,d,f){return a.each(e,function(){c-=parseFloat(a.curCSS(b,"padding"+this,!0))||0,d&&(c-=parseFloat(a.curCSS(b,"border"+this+"Width",!0))||0),f&&(c-=parseFloat(a.curCSS(b,"margin"+this,!0))||0)}),c}var e=d==="Width"?["Left","Right"]:["Top","Bottom"],f=d.toLowerCase(),g={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+d]=function(c){return c===b?g["inner"+d].call(this):this.each(function(){a(this).css(f,h(this,c)+"px")})},a.fn["outer"+d]=function(b,c){return typeof b!="number"?g["outer"+d].call(this,b):this.each(function(){a(this).css(f,h(this,b,!0,c)+"px")})}}),a.extend(a.expr[":"],{data:function(b,c,d){return!!a.data(b,d[3])},focusable:function(b){return c(b,!isNaN(a.attr(b,"tabindex")))},tabbable:function(b){var d=a.attr(b,"tabindex"),e=isNaN(d);return(e||d>=0)&&c(b,!e)}}),a(function(){var b=document.body,c=b.appendChild(c=document.createElement("div"));c.offsetHeight,a.extend(c.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),a.support.minHeight=c.offsetHeight===100,a.support.selectstart="onselectstart"in c,b.removeChild(c).style.display="none"}),a.extend(a.ui,{plugin:{add:function(b,c,d){var e=a.ui[b].prototype;for(var f in d)e.plugins[f]=e.plugins[f]||[],e.plugins[f].push([c,d[f]])},call:function(a,b,c){var d=a.plugins[b];if(!d||!a.element[0].parentNode)return;for(var e=0;e<d.length;e++)a.options[d[e][0]]&&d[e][1].apply(a.element,c)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(b,c){if(a(b).css("overflow")==="hidden")return!1;var d=c&&c==="left"?"scrollLeft":"scrollTop",e=!1;return b[d]>0?!0:(b[d]=1,e=b[d]>0,b[d]=0,e)},isOverAxis:function(a,b,c){return a>b&&a<b+c},isOver:function(b,c,d,e,f,g){return a.ui.isOverAxis(b,d,f)&&a.ui.isOverAxis(c,e,g)}})})(jQuery);;
/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.widget.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){if(a.cleanData){var c=a.cleanData;a.cleanData=function(b){for(var d=0,e;(e=b[d])!=null;d++)try{a(e).triggerHandler("remove")}catch(f){}c(b)}}else{var d=a.fn.remove;a.fn.remove=function(b,c){return this.each(function(){return c||(!b||a.filter(b,[this]).length)&&a("*",this).add([this]).each(function(){try{a(this).triggerHandler("remove")}catch(b){}}),d.call(a(this),b,c)})}}a.widget=function(b,c,d){var e=b.split(".")[0],f;b=b.split(".")[1],f=e+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][f]=function(c){return!!a.data(c,b)},a[e]=a[e]||{},a[e][b]=function(a,b){arguments.length&&this._createWidget(a,b)};var g=new c;g.options=a.extend(!0,{},g.options),a[e][b].prototype=a.extend(!0,g,{namespace:e,widgetName:b,widgetEventPrefix:a[e][b].prototype.widgetEventPrefix||b,widgetBaseClass:f},d),a.widget.bridge(b,a[e][b])},a.widget.bridge=function(c,d){a.fn[c]=function(e){var f=typeof e=="string",g=Array.prototype.slice.call(arguments,1),h=this;return e=!f&&g.length?a.extend.apply(null,[!0,e].concat(g)):e,f&&e.charAt(0)==="_"?h:(f?this.each(function(){var d=a.data(this,c),f=d&&a.isFunction(d[e])?d[e].apply(d,g):d;if(f!==d&&f!==b)return h=f,!1}):this.each(function(){var b=a.data(this,c);b?b.option(e||{})._init():a.data(this,c,new d(e,this))}),h)}},a.Widget=function(a,b){arguments.length&&this._createWidget(a,b)},a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:!1},_createWidget:function(b,c){a.data(c,this.widgetName,this),this.element=a(c),this.options=a.extend(!0,{},this.options,this._getCreateOptions(),b);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()}),this._create(),this._trigger("create"),this._init()},_getCreateOptions:function(){return a.metadata&&a.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName),this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+"ui-state-disabled")},widget:function(){return this.element},option:function(c,d){var e=c;if(arguments.length===0)return a.extend({},this.options);if(typeof c=="string"){if(d===b)return this.options[c];e={},e[c]=d}return this._setOptions(e),this},_setOptions:function(b){var c=this;return a.each(b,function(a,b){c._setOption(a,b)}),this},_setOption:function(a,b){return this.options[a]=b,a==="disabled"&&this.widget()[b?"addClass":"removeClass"](this.widgetBaseClass+"-disabled"+" "+"ui-state-disabled").attr("aria-disabled",b),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_trigger:function(b,c,d){var e,f,g=this.options[b];d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent;if(f)for(e in f)e in c||(c[e]=f[e]);return this.element.trigger(c,d),!(a.isFunction(g)&&g.call(this.element[0],c,d)===!1||c.isDefaultPrevented())}}})(jQuery);;
/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.mouse.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){var c=!1;a(document).mouseup(function(a){c=!1}),a.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var b=this;this.element.bind("mousedown."+this.widgetName,function(a){return b._mouseDown(a)}).bind("click."+this.widgetName,function(c){if(!0===a.data(c.target,b.widgetName+".preventClickEvent"))return a.removeData(c.target,b.widgetName+".preventClickEvent"),c.stopImmediatePropagation(),!1}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(b){if(c)return;this._mouseStarted&&this._mouseUp(b),this._mouseDownEvent=b;var d=this,e=b.which==1,f=typeof this.options.cancel=="string"&&b.target.nodeName?a(b.target).closest(this.options.cancel).length:!1;if(!e||f||!this._mouseCapture(b))return!0;this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){d.mouseDelayMet=!0},this.options.delay));if(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)){this._mouseStarted=this._mouseStart(b)!==!1;if(!this._mouseStarted)return b.preventDefault(),!0}return!0===a.data(b.target,this.widgetName+".preventClickEvent")&&a.removeData(b.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(a){return d._mouseMove(a)},this._mouseUpDelegate=function(a){return d._mouseUp(a)},a(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),b.preventDefault(),c=!0,!0},_mouseMove:function(b){return!a.browser.msie||document.documentMode>=9||!!b.button?this._mouseStarted?(this._mouseDrag(b),b.preventDefault()):(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,b)!==!1,this._mouseStarted?this._mouseDrag(b):this._mouseUp(b)),!this._mouseStarted):this._mouseUp(b)},_mouseUp:function(b){return a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,b.target==this._mouseDownEvent.target&&a.data(b.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(b)),!1},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(a){return this.mouseDelayMet},_mouseStart:function(a){},_mouseDrag:function(a){},_mouseStop:function(a){},_mouseCapture:function(a){return!0}})})(jQuery);;
/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.resizable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.widget("ui.resizable",a.ui.mouse,{widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1e3},_create:function(){var b=this,c=this.options;this.element.addClass("ui-resizable"),a.extend(this,{_aspectRatio:!!c.aspectRatio,aspectRatio:c.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:c.helper||c.ghost||c.animate?c.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(this.element.wrap(a('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("resizable",this.element.data("resizable")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=c.handles||(a(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se");if(this.handles.constructor==String){this.handles=="all"&&(this.handles="n,e,s,w,se,sw,ne,nw");var d=this.handles.split(",");this.handles={};for(var e=0;e<d.length;e++){var f=a.trim(d[e]),g="ui-resizable-"+f,h=a('<div class="ui-resizable-handle '+g+'"></div>');h.css({zIndex:c.zIndex}),"se"==f&&h.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[f]=".ui-resizable-"+f,this.element.append(h)}}this._renderAxis=function(b){b=b||this.element;for(var c in this.handles){this.handles[c].constructor==String&&(this.handles[c]=a(this.handles[c],this.element).show());if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var d=a(this.handles[c],this.element),e=0;e=/sw|ne|nw|se|n|s/.test(c)?d.outerHeight():d.outerWidth();var f=["padding",/ne|nw|n/.test(c)?"Top":/se|sw|s/.test(c)?"Bottom":/^e$/.test(c)?"Right":"Left"].join("");b.css(f,e),this._proportionallyResize()}if(!a(this.handles[c]).length)continue}},this._renderAxis(this.element),this._handles=a(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){if(!b.resizing){if(this.className)var a=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);b.axis=a&&a[1]?a[1]:"se"}}),c.autoHide&&(this._handles.hide(),a(this.element).addClass("ui-resizable-autohide").hover(function(){if(c.disabled)return;a(this).removeClass("ui-resizable-autohide"),b._handles.show()},function(){if(c.disabled)return;b.resizing||(a(this).addClass("ui-resizable-autohide"),b._handles.hide())})),this._mouseInit()},destroy:function(){this._mouseDestroy();var b=function(b){a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};if(this.elementIsWrapper){b(this.element);var c=this.element;c.after(this.originalElement.css({position:c.css("position"),width:c.outerWidth(),height:c.outerHeight(),top:c.css("top"),left:c.css("left")})).remove()}return this.originalElement.css("resize",this.originalResizeStyle),b(this.originalElement),this},_mouseCapture:function(b){var c=!1;for(var d in this.handles)a(this.handles[d])[0]==b.target&&(c=!0);return!this.options.disabled&&c},_mouseStart:function(b){var d=this.options,e=this.element.position(),f=this.element;this.resizing=!0,this.documentScroll={top:a(document).scrollTop(),left:a(document).scrollLeft()},(f.is(".ui-draggable")||/absolute/.test(f.css("position")))&&f.css({position:"absolute",top:e.top,left:e.left}),this._renderProxy();var g=c(this.helper.css("left")),h=c(this.helper.css("top"));d.containment&&(g+=a(d.containment).scrollLeft()||0,h+=a(d.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:g,top:h},this.size=this._helper?{width:f.outerWidth(),height:f.outerHeight()}:{width:f.width(),height:f.height()},this.originalSize=this._helper?{width:f.outerWidth(),height:f.outerHeight()}:{width:f.width(),height:f.height()},this.originalPosition={left:g,top:h},this.sizeDiff={width:f.outerWidth()-f.width(),height:f.outerHeight()-f.height()},this.originalMousePosition={left:b.pageX,top:b.pageY},this.aspectRatio=typeof d.aspectRatio=="number"?d.aspectRatio:this.originalSize.width/this.originalSize.height||1;var i=a(".ui-resizable-"+this.axis).css("cursor");return a("body").css("cursor",i=="auto"?this.axis+"-resize":i),f.addClass("ui-resizable-resizing"),this._propagate("start",b),!0},_mouseDrag:function(b){var c=this.helper,d=this.options,e={},f=this,g=this.originalMousePosition,h=this.axis,i=b.pageX-g.left||0,j=b.pageY-g.top||0,k=this._change[h];if(!k)return!1;var l=k.apply(this,[b,i,j]),m=a.browser.msie&&a.browser.version<7,n=this.sizeDiff;this._updateVirtualBoundaries(b.shiftKey);if(this._aspectRatio||b.shiftKey)l=this._updateRatio(l,b);return l=this._respectSize(l,b),this._propagate("resize",b),c.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"}),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),this._updateCache(l),this._trigger("resize",b,this.ui()),!1},_mouseStop:function(b){this.resizing=!1;var c=this.options,d=this;if(this._helper){var e=this._proportionallyResizeElements,f=e.length&&/textarea/i.test(e[0].nodeName),g=f&&a.ui.hasScroll(e[0],"left")?0:d.sizeDiff.height,h=f?0:d.sizeDiff.width,i={width:d.helper.width()-h,height:d.helper.height()-g},j=parseInt(d.element.css("left"),10)+(d.position.left-d.originalPosition.left)||null,k=parseInt(d.element.css("top"),10)+(d.position.top-d.originalPosition.top)||null;c.animate||this.element.css(a.extend(i,{top:k,left:j})),d.helper.height(d.size.height),d.helper.width(d.size.width),this._helper&&!c.animate&&this._proportionallyResize()}return a("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",b),this._helper&&this.helper.remove(),!1},_updateVirtualBoundaries:function(a){var b=this.options,c,e,f,g,h;h={minWidth:d(b.minWidth)?b.minWidth:0,maxWidth:d(b.maxWidth)?b.maxWidth:Infinity,minHeight:d(b.minHeight)?b.minHeight:0,maxHeight:d(b.maxHeight)?b.maxHeight:Infinity};if(this._aspectRatio||a)c=h.minHeight*this.aspectRatio,f=h.minWidth/this.aspectRatio,e=h.maxHeight*this.aspectRatio,g=h.maxWidth/this.aspectRatio,c>h.minWidth&&(h.minWidth=c),f>h.minHeight&&(h.minHeight=f),e<h.maxWidth&&(h.maxWidth=e),g<h.maxHeight&&(h.maxHeight=g);this._vBoundaries=h},_updateCache:function(a){var b=this.options;this.offset=this.helper.offset(),d(a.left)&&(this.position.left=a.left),d(a.top)&&(this.position.top=a.top),d(a.height)&&(this.size.height=a.height),d(a.width)&&(this.size.width=a.width)},_updateRatio:function(a,b){var c=this.options,e=this.position,f=this.size,g=this.axis;return d(a.height)?a.width=a.height*this.aspectRatio:d(a.width)&&(a.height=a.width/this.aspectRatio),g=="sw"&&(a.left=e.left+(f.width-a.width),a.top=null),g=="nw"&&(a.top=e.top+(f.height-a.height),a.left=e.left+(f.width-a.width)),a},_respectSize:function(a,b){var c=this.helper,e=this._vBoundaries,f=this._aspectRatio||b.shiftKey,g=this.axis,h=d(a.width)&&e.maxWidth&&e.maxWidth<a.width,i=d(a.height)&&e.maxHeight&&e.maxHeight<a.height,j=d(a.width)&&e.minWidth&&e.minWidth>a.width,k=d(a.height)&&e.minHeight&&e.minHeight>a.height;j&&(a.width=e.minWidth),k&&(a.height=e.minHeight),h&&(a.width=e.maxWidth),i&&(a.height=e.maxHeight);var l=this.originalPosition.left+this.originalSize.width,m=this.position.top+this.size.height,n=/sw|nw|w/.test(g),o=/nw|ne|n/.test(g);j&&n&&(a.left=l-e.minWidth),h&&n&&(a.left=l-e.maxWidth),k&&o&&(a.top=m-e.minHeight),i&&o&&(a.top=m-e.maxHeight);var p=!a.width&&!a.height;return p&&!a.left&&a.top?a.top=null:p&&!a.top&&a.left&&(a.left=null),a},_proportionallyResize:function(){var b=this.options;if(!this._proportionallyResizeElements.length)return;var c=this.helper||this.element;for(var d=0;d<this._proportionallyResizeElements.length;d++){var e=this._proportionallyResizeElements[d];if(!this.borderDif){var f=[e.css("borderTopWidth"),e.css("borderRightWidth"),e.css("borderBottomWidth"),e.css("borderLeftWidth")],g=[e.css("paddingTop"),e.css("paddingRight"),e.css("paddingBottom"),e.css("paddingLeft")];this.borderDif=a.map(f,function(a,b){var c=parseInt(a,10)||0,d=parseInt(g[b],10)||0;return c+d})}if(!a.browser.msie||!a(c).is(":hidden")&&!a(c).parents(":hidden").length)e.css({height:c.height()-this.borderDif[0]-this.borderDif[2]||0,width:c.width()-this.borderDif[1]-this.borderDif[3]||0});else continue}},_renderProxy:function(){var b=this.element,c=this.options;this.elementOffset=b.offset();if(this._helper){this.helper=this.helper||a('<div style="overflow:hidden;"></div>');var d=a.browser.msie&&a.browser.version<7,e=d?1:0,f=d?2:-1;this.helper.addClass(this._helper).css({width:this.element.outerWidth()+f,height:this.element.outerHeight()+f,position:"absolute",left:this.elementOffset.left-e+"px",top:this.elementOffset.top-e+"px",zIndex:++c.zIndex}),this.helper.appendTo("body").disableSelection()}else this.helper=this.element},_change:{e:function(a,b,c){return{width:this.originalSize.width+b}},w:function(a,b,c){var d=this.options,e=this.originalSize,f=this.originalPosition;return{left:f.left+b,width:e.width-b}},n:function(a,b,c){var d=this.options,e=this.originalSize,f=this.originalPosition;return{top:f.top+c,height:e.height-c}},s:function(a,b,c){return{height:this.originalSize.height+c}},se:function(b,c,d){return a.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[b,c,d]))},sw:function(b,c,d){return a.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[b,c,d]))},ne:function(b,c,d){return a.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[b,c,d]))},nw:function(b,c,d){return a.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[b,c,d]))}},_propagate:function(b,c){a.ui.plugin.call(this,b,[c,this.ui()]),b!="resize"&&this._trigger(b,c,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),a.extend(a.ui.resizable,{version:"1.8.20"}),a.ui.plugin.add("resizable","alsoResize",{start:function(b,c){var d=a(this).data("resizable"),e=d.options,f=function(b){a(b).each(function(){var b=a(this);b.data("resizable-alsoresize",{width:parseInt(b.width(),10),height:parseInt(b.height(),10),left:parseInt(b.css("left"),10),top:parseInt(b.css("top"),10)})})};typeof e.alsoResize=="object"&&!e.alsoResize.parentNode?e.alsoResize.length?(e.alsoResize=e.alsoResize[0],f(e.alsoResize)):a.each(e.alsoResize,function(a){f(a)}):f(e.alsoResize)},resize:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.originalSize,g=d.originalPosition,h={height:d.size.height-f.height||0,width:d.size.width-f.width||0,top:d.position.top-g.top||0,left:d.position.left-g.left||0},i=function(b,d){a(b).each(function(){var b=a(this),e=a(this).data("resizable-alsoresize"),f={},g=d&&d.length?d:b.parents(c.originalElement[0]).length?["width","height"]:["width","height","top","left"];a.each(g,function(a,b){var c=(e[b]||0)+(h[b]||0);c&&c>=0&&(f[b]=c||null)}),b.css(f)})};typeof e.alsoResize=="object"&&!e.alsoResize.nodeType?a.each(e.alsoResize,function(a,b){i(a,b)}):i(e.alsoResize)},stop:function(b,c){a(this).removeData("resizable-alsoresize")}}),a.ui.plugin.add("resizable","animate",{stop:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d._proportionallyResizeElements,g=f.length&&/textarea/i.test(f[0].nodeName),h=g&&a.ui.hasScroll(f[0],"left")?0:d.sizeDiff.height,i=g?0:d.sizeDiff.width,j={width:d.size.width-i,height:d.size.height-h},k=parseInt(d.element.css("left"),10)+(d.position.left-d.originalPosition.left)||null,l=parseInt(d.element.css("top"),10)+(d.position.top-d.originalPosition.top)||null;d.element.animate(a.extend(j,l&&k?{top:l,left:k}:{}),{duration:e.animateDuration,easing:e.animateEasing,step:function(){var c={width:parseInt(d.element.css("width"),10),height:parseInt(d.element.css("height"),10),top:parseInt(d.element.css("top"),10),left:parseInt(d.element.css("left"),10)};f&&f.length&&a(f[0]).css({width:c.width,height:c.height}),d._updateCache(c),d._propagate("resize",b)}})}}),a.ui.plugin.add("resizable","containment",{start:function(b,d){var e=a(this).data("resizable"),f=e.options,g=e.element,h=f.containment,i=h instanceof a?h.get(0):/parent/.test(h)?g.parent().get(0):h;if(!i)return;e.containerElement=a(i);if(/document/.test(h)||h==document)e.containerOffset={left:0,top:0},e.containerPosition={left:0,top:0},e.parentData={element:a(document),left:0,top:0,width:a(document).width(),height:a(document).height()||document.body.parentNode.scrollHeight};else{var j=a(i),k=[];a(["Top","Right","Left","Bottom"]).each(function(a,b){k[a]=c(j.css("padding"+b))}),e.containerOffset=j.offset(),e.containerPosition=j.position(),e.containerSize={height:j.innerHeight()-k[3],width:j.innerWidth()-k[1]};var l=e.containerOffset,m=e.containerSize.height,n=e.containerSize.width,o=a.ui.hasScroll(i,"left")?i.scrollWidth:n,p=a.ui.hasScroll(i)?i.scrollHeight:m;e.parentData={element:i,left:l.left,top:l.top,width:o,height:p}}},resize:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.containerSize,g=d.containerOffset,h=d.size,i=d.position,j=d._aspectRatio||b.shiftKey,k={top:0,left:0},l=d.containerElement;l[0]!=document&&/static/.test(l.css("position"))&&(k=g),i.left<(d._helper?g.left:0)&&(d.size.width=d.size.width+(d._helper?d.position.left-g.left:d.position.left-k.left),j&&(d.size.height=d.size.width/d.aspectRatio),d.position.left=e.helper?g.left:0),i.top<(d._helper?g.top:0)&&(d.size.height=d.size.height+(d._helper?d.position.top-g.top:d.position.top),j&&(d.size.width=d.size.height*d.aspectRatio),d.position.top=d._helper?g.top:0),d.offset.left=d.parentData.left+d.position.left,d.offset.top=d.parentData.top+d.position.top;var m=Math.abs((d._helper?d.offset.left-k.left:d.offset.left-k.left)+d.sizeDiff.width),n=Math.abs((d._helper?d.offset.top-k.top:d.offset.top-g.top)+d.sizeDiff.height),o=d.containerElement.get(0)==d.element.parent().get(0),p=/relative|absolute/.test(d.containerElement.css("position"));o&&p&&(m-=d.parentData.left),m+d.size.width>=d.parentData.width&&(d.size.width=d.parentData.width-m,j&&(d.size.height=d.size.width/d.aspectRatio)),n+d.size.height>=d.parentData.height&&(d.size.height=d.parentData.height-n,j&&(d.size.width=d.size.height*d.aspectRatio))},stop:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.position,g=d.containerOffset,h=d.containerPosition,i=d.containerElement,j=a(d.helper),k=j.offset(),l=j.outerWidth()-d.sizeDiff.width,m=j.outerHeight()-d.sizeDiff.height;d._helper&&!e.animate&&/relative/.test(i.css("position"))&&a(this).css({left:k.left-h.left-g.left,width:l,height:m}),d._helper&&!e.animate&&/static/.test(i.css("position"))&&a(this).css({left:k.left-h.left-g.left,width:l,height:m})}}),a.ui.plugin.add("resizable","ghost",{start:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.size;d.ghost=d.originalElement.clone(),d.ghost.css({opacity:.25,display:"block",position:"relative",height:f.height,width:f.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof e.ghost=="string"?e.ghost:""),d.ghost.appendTo(d.helper)},resize:function(b,c){var d=a(this).data("resizable"),e=d.options;d.ghost&&d.ghost.css({position:"relative",height:d.size.height,width:d.size.width})},stop:function(b,c){var d=a(this).data("resizable"),e=d.options;d.ghost&&d.helper&&d.helper.get(0).removeChild(d.ghost.get(0))}}),a.ui.plugin.add("resizable","grid",{resize:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.size,g=d.originalSize,h=d.originalPosition,i=d.axis,j=e._aspectRatio||b.shiftKey;e.grid=typeof e.grid=="number"?[e.grid,e.grid]:e.grid;var k=Math.round((f.width-g.width)/(e.grid[0]||1))*(e.grid[0]||1),l=Math.round((f.height-g.height)/(e.grid[1]||1))*(e.grid[1]||1);/^(se|s|e)$/.test(i)?(d.size.width=g.width+k,d.size.height=g.height+l):/^(ne)$/.test(i)?(d.size.width=g.width+k,d.size.height=g.height+l,d.position.top=h.top-l):/^(sw)$/.test(i)?(d.size.width=g.width+k,d.size.height=g.height+l,d.position.left=h.left-k):(d.size.width=g.width+k,d.size.height=g.height+l,d.position.top=h.top-l,d.position.left=h.left-k)}});var c=function(a){return parseInt(a,10)||0},d=function(a){return!isNaN(parseInt(a,10))}})(jQuery);;
/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.draggable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.widget("ui.draggable",a.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1},_create:function(){this.options.helper=="original"&&!/^(?:r|a|f)/.test(this.element.css("position"))&&(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},destroy:function(){if(!this.element.data("draggable"))return;return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy(),this},_mouseCapture:function(b){var c=this.options;return this.helper||c.disabled||a(b.target).is(".ui-resizable-handle")?!1:(this.handle=this._getHandle(b),this.handle?(c.iframeFix&&a(c.iframeFix===!0?"iframe":c.iframeFix).each(function(){a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(a(this).offset()).appendTo("body")}),!0):!1)},_mouseStart:function(b){var c=this.options;return this.helper=this._createHelper(b),this._cacheHelperProportions(),a.ui.ddmanager&&(a.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},a.extend(this.offset,{click:{left:b.pageX-this.offset.left,top:b.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(b),this.originalPageX=b.pageX,this.originalPageY=b.pageY,c.cursorAt&&this._adjustOffsetFromHelper(c.cursorAt),c.containment&&this._setContainment(),this._trigger("start",b)===!1?(this._clear(),!1):(this._cacheHelperProportions(),a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b),this.helper.addClass("ui-draggable-dragging"),this._mouseDrag(b,!0),a.ui.ddmanager&&a.ui.ddmanager.dragStart(this,b),!0)},_mouseDrag:function(b,c){this.position=this._generatePosition(b),this.positionAbs=this._convertPositionTo("absolute");if(!c){var d=this._uiHash();if(this._trigger("drag",b,d)===!1)return this._mouseUp({}),!1;this.position=d.position}if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";return a.ui.ddmanager&&a.ui.ddmanager.drag(this,b),!1},_mouseStop:function(b){var c=!1;a.ui.ddmanager&&!this.options.dropBehaviour&&(c=a.ui.ddmanager.drop(this,b)),this.dropped&&(c=this.dropped,this.dropped=!1);var d=this.element[0],e=!1;while(d&&(d=d.parentNode))d==document&&(e=!0);if(!e&&this.options.helper==="original")return!1;if(this.options.revert=="invalid"&&!c||this.options.revert=="valid"&&c||this.options.revert===!0||a.isFunction(this.options.revert)&&this.options.revert.call(this.element,c)){var f=this;a(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){f._trigger("stop",b)!==!1&&f._clear()})}else this._trigger("stop",b)!==!1&&this._clear();return!1},_mouseUp:function(b){return this.options.iframeFix===!0&&a("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),a.ui.ddmanager&&a.ui.ddmanager.dragStop(this,b),a.ui.mouse.prototype._mouseUp.call(this,b)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(b){var c=!this.options.handle||!a(this.options.handle,this.element).length?!0:!1;return a(this.options.handle,this.element).find("*").andSelf().each(function(){this==b.target&&(c=!0)}),c},_createHelper:function(b){var c=this.options,d=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[b])):c.helper=="clone"?this.element.clone().removeAttr("id"):this.element;return d.parents("body").length||d.appendTo(c.appendTo=="parent"?this.element[0].parentNode:c.appendTo),d[0]!=this.element[0]&&!/(fixed|absolute)/.test(d.css("position"))&&d.css("position","absolute"),d},_adjustOffsetFromHelper:function(b){typeof b=="string"&&(b=b.split(" ")),a.isArray(b)&&(b={left:+b[0],top:+b[1]||0}),"left"in b&&(this.offset.click.left=b.left+this.margins.left),"right"in b&&(this.offset.click.left=this.helperProportions.width-b.right+this.margins.left),"top"in b&&(this.offset.click.top=b.top+this.margins.top),"bottom"in b&&(this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])&&(b.left+=this.scrollParent.scrollLeft(),b.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)b={top:0,left:0};return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.element.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var b=this.options;b.containment=="parent"&&(b.containment=this.helper[0].parentNode);if(b.containment=="document"||b.containment=="window")this.containment=[b.containment=="document"?0:a(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,b.containment=="document"?0:a(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,(b.containment=="document"?0:a(window).scrollLeft())+a(b.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(b.containment=="document"?0:a(window).scrollTop())+(a(b.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(b.containment)&&b.containment.constructor!=Array){var c=a(b.containment),d=c[0];if(!d)return;var e=c.offset(),f=a(d).css("overflow")!="hidden";this.containment=[(parseInt(a(d).css("borderLeftWidth"),10)||0)+(parseInt(a(d).css("paddingLeft"),10)||0),(parseInt(a(d).css("borderTopWidth"),10)||0)+(parseInt(a(d).css("paddingTop"),10)||0),(f?Math.max(d.scrollWidth,d.offsetWidth):d.offsetWidth)-(parseInt(a(d).css("borderLeftWidth"),10)||0)-(parseInt(a(d).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(f?Math.max(d.scrollHeight,d.offsetHeight):d.offsetHeight)-(parseInt(a(d).css("borderTopWidth"),10)||0)-(parseInt(a(d).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=c}else b.containment.constructor==Array&&(this.containment=b.containment)},_convertPositionTo:function(b,c){c||(c=this.position);var d=b=="absolute"?1:-1,e=this.options,f=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=/(html|body)/i.test(f[0].tagName);return{top:c.top+this.offset.relative.top*d+this.offset.parent.top*d-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():g?0:f.scrollTop())*d),left:c.left+this.offset.relative.left*d+this.offset.parent.left*d-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:f.scrollLeft())*d)}},_generatePosition:function(b){var c=this.options,d=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(d[0].tagName),f=b.pageX,g=b.pageY;if(this.originalPosition){var h;if(this.containment){if(this.relative_container){var i=this.relative_container.offset();h=[this.containment[0]+i.left,this.containment[1]+i.top,this.containment[2]+i.left,this.containment[3]+i.top]}else h=this.containment;b.pageX-this.offset.click.left<h[0]&&(f=h[0]+this.offset.click.left),b.pageY-this.offset.click.top<h[1]&&(g=h[1]+this.offset.click.top),b.pageX-this.offset.click.left>h[2]&&(f=h[2]+this.offset.click.left),b.pageY-this.offset.click.top>h[3]&&(g=h[3]+this.offset.click.top)}if(c.grid){var j=c.grid[1]?this.originalPageY+Math.round((g-this.originalPageY)/c.grid[1])*c.grid[1]:this.originalPageY;g=h?j-this.offset.click.top<h[1]||j-this.offset.click.top>h[3]?j-this.offset.click.top<h[1]?j+c.grid[1]:j-c.grid[1]:j:j;var k=c.grid[0]?this.originalPageX+Math.round((f-this.originalPageX)/c.grid[0])*c.grid[0]:this.originalPageX;f=h?k-this.offset.click.left<h[0]||k-this.offset.click.left>h[2]?k-this.offset.click.left<h[0]?k+c.grid[0]:k-c.grid[0]:k:k}}return{top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:d.scrollTop()),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:d.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(b,c,d){return d=d||this._uiHash(),a.ui.plugin.call(this,b,[c,d]),b=="drag"&&(this.positionAbs=this._convertPositionTo("absolute")),a.Widget.prototype._trigger.call(this,b,c,d)},plugins:{},_uiHash:function(a){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),a.extend(a.ui.draggable,{version:"1.8.20"}),a.ui.plugin.add("draggable","connectToSortable",{start:function(b,c){var d=a(this).data("draggable"),e=d.options,f=a.extend({},c,{item:d.element});d.sortables=[],a(e.connectToSortable).each(function(){var c=a.data(this,"sortable");c&&!c.options.disabled&&(d.sortables.push({instance:c,shouldRevert:c.options.revert}),c.refreshPositions(),c._trigger("activate",b,f))})},stop:function(b,c){var d=a(this).data("draggable"),e=a.extend({},c,{item:d.element});a.each(d.sortables,function(){this.instance.isOver?(this.instance.isOver=0,d.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=!0),this.instance._mouseStop(b),this.instance.options.helper=this.instance.options._helper,d.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",b,e))})},drag:function(b,c){var d=a(this).data("draggable"),e=this,f=function(b){var c=this.offset.click.top,d=this.offset.click.left,e=this.positionAbs.top,f=this.positionAbs.left,g=b.height,h=b.width,i=b.top,j=b.left;return a.ui.isOver(e+c,f+d,i,j,g,h)};a.each(d.sortables,function(f){this.instance.positionAbs=d.positionAbs,this.instance.helperProportions=d.helperProportions,this.instance.offset.click=d.offset.click,this.instance._intersectsWith(this.instance.containerCache)?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=a(e).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return c.helper[0]},b.target=this.instance.currentItem[0],this.instance._mouseCapture(b,!0),this.instance._mouseStart(b,!0,!0),this.instance.offset.click.top=d.offset.click.top,this.instance.offset.click.left=d.offset.click.left,this.instance.offset.parent.left-=d.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=d.offset.parent.top-this.instance.offset.parent.top,d._trigger("toSortable",b),d.dropped=this.instance.element,d.currentItem=d.element,this.instance.fromOutside=d),this.instance.currentItem&&this.instance._mouseDrag(b)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",b,this.instance._uiHash(this.instance)),this.instance._mouseStop(b,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),d._trigger("fromSortable",b),d.dropped=!1)})}}),a.ui.plugin.add("draggable","cursor",{start:function(b,c){var d=a("body"),e=a(this).data("draggable").options;d.css("cursor")&&(e._cursor=d.css("cursor")),d.css("cursor",e.cursor)},stop:function(b,c){var d=a(this).data("draggable").options;d._cursor&&a("body").css("cursor",d._cursor)}}),a.ui.plugin.add("draggable","opacity",{start:function(b,c){var d=a(c.helper),e=a(this).data("draggable").options;d.css("opacity")&&(e._opacity=d.css("opacity")),d.css("opacity",e.opacity)},stop:function(b,c){var d=a(this).data("draggable").options;d._opacity&&a(c.helper).css("opacity",d._opacity)}}),a.ui.plugin.add("draggable","scroll",{start:function(b,c){var d=a(this).data("draggable");d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML"&&(d.overflowOffset=d.scrollParent.offset())},drag:function(b,c){var d=a(this).data("draggable"),e=d.options,f=!1;if(d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML"){if(!e.axis||e.axis!="x")d.overflowOffset.top+d.scrollParent[0].offsetHeight-b.pageY<e.scrollSensitivity?d.scrollParent[0].scrollTop=f=d.scrollParent[0].scrollTop+e.scrollSpeed:b.pageY-d.overflowOffset.top<e.scrollSensitivity&&(d.scrollParent[0].scrollTop=f=d.scrollParent[0].scrollTop-e.scrollSpeed);if(!e.axis||e.axis!="y")d.overflowOffset.left+d.scrollParent[0].offsetWidth-b.pageX<e.scrollSensitivity?d.scrollParent[0].scrollLeft=f=d.scrollParent[0].scrollLeft+e.scrollSpeed:b.pageX-d.overflowOffset.left<e.scrollSensitivity&&(d.scrollParent[0].scrollLeft=f=d.scrollParent[0].scrollLeft-e.scrollSpeed)}else{if(!e.axis||e.axis!="x")b.pageY-a(document).scrollTop()<e.scrollSensitivity?f=a(document).scrollTop(a(document).scrollTop()-e.scrollSpeed):a(window).height()-(b.pageY-a(document).scrollTop())<e.scrollSensitivity&&(f=a(document).scrollTop(a(document).scrollTop()+e.scrollSpeed));if(!e.axis||e.axis!="y")b.pageX-a(document).scrollLeft()<e.scrollSensitivity?f=a(document).scrollLeft(a(document).scrollLeft()-e.scrollSpeed):a(window).width()-(b.pageX-a(document).scrollLeft())<e.scrollSensitivity&&(f=a(document).scrollLeft(a(document).scrollLeft()+e.scrollSpeed))}f!==!1&&a.ui.ddmanager&&!e.dropBehaviour&&a.ui.ddmanager.prepareOffsets(d,b)}}),a.ui.plugin.add("draggable","snap",{start:function(b,c){var d=a(this).data("draggable"),e=d.options;d.snapElements=[],a(e.snap.constructor!=String?e.snap.items||":data(draggable)":e.snap).each(function(){var b=a(this),c=b.offset();this!=d.element[0]&&d.snapElements.push({item:this,width:b.outerWidth(),height:b.outerHeight(),top:c.top,left:c.left})})},drag:function(b,c){var d=a(this).data("draggable"),e=d.options,f=e.snapTolerance,g=c.offset.left,h=g+d.helperProportions.width,i=c.offset.top,j=i+d.helperProportions.height;for(var k=d.snapElements.length-1;k>=0;k--){var l=d.snapElements[k].left,m=l+d.snapElements[k].width,n=d.snapElements[k].top,o=n+d.snapElements[k].height;if(!(l-f<g&&g<m+f&&n-f<i&&i<o+f||l-f<g&&g<m+f&&n-f<j&&j<o+f||l-f<h&&h<m+f&&n-f<i&&i<o+f||l-f<h&&h<m+f&&n-f<j&&j<o+f)){d.snapElements[k].snapping&&d.options.snap.release&&d.options.snap.release.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[k].item})),d.snapElements[k].snapping=!1;continue}if(e.snapMode!="inner"){var p=Math.abs(n-j)<=f,q=Math.abs(o-i)<=f,r=Math.abs(l-h)<=f,s=Math.abs(m-g)<=f;p&&(c.position.top=d._convertPositionTo("relative",{top:n-d.helperProportions.height,left:0}).top-d.margins.top),q&&(c.position.top=d._convertPositionTo("relative",{top:o,left:0}).top-d.margins.top),r&&(c.position.left=d._convertPositionTo("relative",{top:0,left:l-d.helperProportions.width}).left-d.margins.left),s&&(c.position.left=d._convertPositionTo("relative",{top:0,left:m}).left-d.margins.left)}var t=p||q||r||s;if(e.snapMode!="outer"){var p=Math.abs(n-i)<=f,q=Math.abs(o-j)<=f,r=Math.abs(l-g)<=f,s=Math.abs(m-h)<=f;p&&(c.position.top=d._convertPositionTo("relative",{top:n,left:0}).top-d.margins.top),q&&(c.position.top=d._convertPositionTo("relative",{top:o-d.helperProportions.height,left:0}).top-d.margins.top),r&&(c.position.left=d._convertPositionTo("relative",{top:0,left:l}).left-d.margins.left),s&&(c.position.left=d._convertPositionTo("relative",{top:0,left:m-d.helperProportions.width}).left-d.margins.left)}!d.snapElements[k].snapping&&(p||q||r||s||t)&&d.options.snap.snap&&d.options.snap.snap.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[k].item})),d.snapElements[k].snapping=p||q||r||s||t}}}),a.ui.plugin.add("draggable","stack",{start:function(b,c){var d=a(this).data("draggable").options,e=a.makeArray(a(d.stack)).sort(function(b,c){return(parseInt(a(b).css("zIndex"),10)||0)-(parseInt(a(c).css("zIndex"),10)||0)});if(!e.length)return;var f=parseInt(e[0].style.zIndex)||0;a(e).each(function(a){this.style.zIndex=f+a}),this[0].style.zIndex=f+e.length}}),a.ui.plugin.add("draggable","zIndex",{start:function(b,c){var d=a(c.helper),e=a(this).data("draggable").options;d.css("zIndex")&&(e._zIndex=d.css("zIndex")),d.css("zIndex",e.zIndex)},stop:function(b,c){var d=a(this).data("draggable").options;d._zIndex&&a(c.helper).css("zIndex",d._zIndex)}})})(jQuery);;
/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.button.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){var c,d,e,f,g="ui-button ui-widget ui-state-default ui-corner-all",h="ui-state-hover ui-state-active ",i="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",j=function(){var b=a(this).find(":ui-button");setTimeout(function(){b.button("refresh")},1)},k=function(b){var c=b.name,d=b.form,e=a([]);return c&&(d?e=a(d).find("[name='"+c+"']"):e=a("[name='"+c+"']",b.ownerDocument).filter(function(){return!this.form})),e};a.widget("ui.button",{options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset.button").bind("reset.button",j),typeof this.options.disabled!="boolean"?this.options.disabled=!!this.element.propAttr("disabled"):this.element.propAttr("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var b=this,h=this.options,i=this.type==="checkbox"||this.type==="radio",l="ui-state-hover"+(i?"":" ui-state-active"),m="ui-state-focus";h.label===null&&(h.label=this.buttonElement.html()),this.buttonElement.addClass(g).attr("role","button").bind("mouseenter.button",function(){if(h.disabled)return;a(this).addClass("ui-state-hover"),this===c&&a(this).addClass("ui-state-active")}).bind("mouseleave.button",function(){if(h.disabled)return;a(this).removeClass(l)}).bind("click.button",function(a){h.disabled&&(a.preventDefault(),a.stopImmediatePropagation())}),this.element.bind("focus.button",function(){b.buttonElement.addClass(m)}).bind("blur.button",function(){b.buttonElement.removeClass(m)}),i&&(this.element.bind("change.button",function(){if(f)return;b.refresh()}),this.buttonElement.bind("mousedown.button",function(a){if(h.disabled)return;f=!1,d=a.pageX,e=a.pageY}).bind("mouseup.button",function(a){if(h.disabled)return;if(d!==a.pageX||e!==a.pageY)f=!0})),this.type==="checkbox"?this.buttonElement.bind("click.button",function(){if(h.disabled||f)return!1;a(this).toggleClass("ui-state-active"),b.buttonElement.attr("aria-pressed",b.element[0].checked)}):this.type==="radio"?this.buttonElement.bind("click.button",function(){if(h.disabled||f)return!1;a(this).addClass("ui-state-active"),b.buttonElement.attr("aria-pressed","true");var c=b.element[0];k(c).not(c).map(function(){return a(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown.button",function(){if(h.disabled)return!1;a(this).addClass("ui-state-active"),c=this,a(document).one("mouseup",function(){c=null})}).bind("mouseup.button",function(){if(h.disabled)return!1;a(this).removeClass("ui-state-active")}).bind("keydown.button",function(b){if(h.disabled)return!1;(b.keyCode==a.ui.keyCode.SPACE||b.keyCode==a.ui.keyCode.ENTER)&&a(this).addClass("ui-state-active")}).bind("keyup.button",function(){a(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(b){b.keyCode===a.ui.keyCode.SPACE&&a(this).click()})),this._setOption("disabled",h.disabled),this._resetButton()},_determineButtonType:function(){this.element.is(":checkbox")?this.type="checkbox":this.element.is(":radio")?this.type="radio":this.element.is("input")?this.type="input":this.type="button";if(this.type==="checkbox"||this.type==="radio"){var a=this.element.parents().filter(":last"),b="label[for='"+this.element.attr("id")+"']";this.buttonElement=a.find(b),this.buttonElement.length||(a=a.length?a.siblings():this.element.siblings(),this.buttonElement=a.filter(b),this.buttonElement.length||(this.buttonElement=a.find(b))),this.element.addClass("ui-helper-hidden-accessible");var c=this.element.is(":checked");c&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.attr("aria-pressed",c)}else this.buttonElement=this.element},widget:function(){return this.buttonElement},destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(g+" "+h+" "+i).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title"),a.Widget.prototype.destroy.call(this)},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments);if(b==="disabled"){c?this.element.propAttr("disabled",!0):this.element.propAttr("disabled",!1);return}this._resetButton()},refresh:function(){var b=this.element.is(":disabled");b!==this.options.disabled&&this._setOption("disabled",b),this.type==="radio"?k(this.element[0]).each(function(){a(this).is(":checked")?a(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):this.type==="checkbox"&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if(this.type==="input"){this.options.label&&this.element.val(this.options.label);return}var b=this.buttonElement.removeClass(i),c=a("<span></span>",this.element[0].ownerDocument).addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(),d=this.options.icons,e=d.primary&&d.secondary,f=[];d.primary||d.secondary?(this.options.text&&f.push("ui-button-text-icon"+(e?"s":d.primary?"-primary":"-secondary")),d.primary&&b.prepend("<span class='ui-button-icon-primary ui-icon "+d.primary+"'></span>"),d.secondary&&b.append("<span class='ui-button-icon-secondary ui-icon "+d.secondary+"'></span>"),this.options.text||(f.push(e?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||b.attr("title",c))):f.push("ui-button-text-only"),b.addClass(f.join(" "))}}),a.widget("ui.buttonset",{options:{items:":button, :submit, :reset, :checkbox, :radio, a, :data(button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(b,c){b==="disabled"&&this.buttons.button("option",b,c),a.Widget.prototype._setOption.apply(this,arguments)},refresh:function(){var b=this.element.css("direction")==="rtl";this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(b?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(b?"ui-corner-left":"ui-corner-right").end().end()},destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy"),a.Widget.prototype.destroy.call(this)}})})(jQuery);;
/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.position.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.ui=a.ui||{};var c=/left|center|right/,d=/top|center|bottom/,e="center",f={},g=a.fn.position,h=a.fn.offset;a.fn.position=function(b){if(!b||!b.of)return g.apply(this,arguments);b=a.extend({},b);var h=a(b.of),i=h[0],j=(b.collision||"flip").split(" "),k=b.offset?b.offset.split(" "):[0,0],l,m,n;return i.nodeType===9?(l=h.width(),m=h.height(),n={top:0,left:0}):i.setTimeout?(l=h.width(),m=h.height(),n={top:h.scrollTop(),left:h.scrollLeft()}):i.preventDefault?(b.at="left top",l=m=0,n={top:b.of.pageY,left:b.of.pageX}):(l=h.outerWidth(),m=h.outerHeight(),n=h.offset()),a.each(["my","at"],function(){var a=(b[this]||"").split(" ");a.length===1&&(a=c.test(a[0])?a.concat([e]):d.test(a[0])?[e].concat(a):[e,e]),a[0]=c.test(a[0])?a[0]:e,a[1]=d.test(a[1])?a[1]:e,b[this]=a}),j.length===1&&(j[1]=j[0]),k[0]=parseInt(k[0],10)||0,k.length===1&&(k[1]=k[0]),k[1]=parseInt(k[1],10)||0,b.at[0]==="right"?n.left+=l:b.at[0]===e&&(n.left+=l/2),b.at[1]==="bottom"?n.top+=m:b.at[1]===e&&(n.top+=m/2),n.left+=k[0],n.top+=k[1],this.each(function(){var c=a(this),d=c.outerWidth(),g=c.outerHeight(),h=parseInt(a.curCSS(this,"marginLeft",!0))||0,i=parseInt(a.curCSS(this,"marginTop",!0))||0,o=d+h+(parseInt(a.curCSS(this,"marginRight",!0))||0),p=g+i+(parseInt(a.curCSS(this,"marginBottom",!0))||0),q=a.extend({},n),r;b.my[0]==="right"?q.left-=d:b.my[0]===e&&(q.left-=d/2),b.my[1]==="bottom"?q.top-=g:b.my[1]===e&&(q.top-=g/2),f.fractions||(q.left=Math.round(q.left),q.top=Math.round(q.top)),r={left:q.left-h,top:q.top-i},a.each(["left","top"],function(c,e){a.ui.position[j[c]]&&a.ui.position[j[c]][e](q,{targetWidth:l,targetHeight:m,elemWidth:d,elemHeight:g,collisionPosition:r,collisionWidth:o,collisionHeight:p,offset:k,my:b.my,at:b.at})}),a.fn.bgiframe&&c.bgiframe(),c.offset(a.extend(q,{using:b.using}))})},a.ui.position={fit:{left:function(b,c){var d=a(window),e=c.collisionPosition.left+c.collisionWidth-d.width()-d.scrollLeft();b.left=e>0?b.left-e:Math.max(b.left-c.collisionPosition.left,b.left)},top:function(b,c){var d=a(window),e=c.collisionPosition.top+c.collisionHeight-d.height()-d.scrollTop();b.top=e>0?b.top-e:Math.max(b.top-c.collisionPosition.top,b.top)}},flip:{left:function(b,c){if(c.at[0]===e)return;var d=a(window),f=c.collisionPosition.left+c.collisionWidth-d.width()-d.scrollLeft(),g=c.my[0]==="left"?-c.elemWidth:c.my[0]==="right"?c.elemWidth:0,h=c.at[0]==="left"?c.targetWidth:-c.targetWidth,i=-2*c.offset[0];b.left+=c.collisionPosition.left<0?g+h+i:f>0?g+h+i:0},top:function(b,c){if(c.at[1]===e)return;var d=a(window),f=c.collisionPosition.top+c.collisionHeight-d.height()-d.scrollTop(),g=c.my[1]==="top"?-c.elemHeight:c.my[1]==="bottom"?c.elemHeight:0,h=c.at[1]==="top"?c.targetHeight:-c.targetHeight,i=-2*c.offset[1];b.top+=c.collisionPosition.top<0?g+h+i:f>0?g+h+i:0}}},a.offset.setOffset||(a.offset.setOffset=function(b,c){/static/.test(a.curCSS(b,"position"))&&(b.style.position="relative");var d=a(b),e=d.offset(),f=parseInt(a.curCSS(b,"top",!0),10)||0,g=parseInt(a.curCSS(b,"left",!0),10)||0,h={top:c.top-e.top+f,left:c.left-e.left+g};"using"in c?c.using.call(b,h):d.css(h)},a.fn.offset=function(b){var c=this[0];return!c||!c.ownerDocument?null:b?this.each(function(){a.offset.setOffset(this,b)}):h.call(this)}),function(){var b=document.getElementsByTagName("body")[0],c=document.createElement("div"),d,e,g,h,i;d=document.createElement(b?"div":"body"),g={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},b&&a.extend(g,{position:"absolute",left:"-1000px",top:"-1000px"});for(var j in g)d.style[j]=g[j];d.appendChild(c),e=b||document.documentElement,e.insertBefore(d,e.firstChild),c.style.cssText="position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;",h=a(c).offset(function(a,b){return b}).offset(),d.innerHTML="",e.removeChild(d),i=h.top+h.left+(b?2e3:0),f.fractions=i>21&&i<22}()})(jQuery);;
/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.dialog.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){var c="ui-dialog ui-widget ui-widget-content ui-corner-all ",d={buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},e={maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},f=a.attrFn||{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0,click:!0};a.widget("ui.dialog",{options:{autoOpen:!0,buttons:{},closeOnEscape:!0,closeText:"close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:!1,maxWidth:!1,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",collision:"fit",using:function(b){var c=a(this).css(b).offset().top;c<0&&a(this).css("top",b.top-c)}},resizable:!0,show:null,stack:!0,title:"",width:300,zIndex:1e3},_create:function(){this.originalTitle=this.element.attr("title"),typeof this.originalTitle!="string"&&(this.originalTitle=""),this.options.title=this.options.title||this.originalTitle;var b=this,d=b.options,e=d.title||"&#160;",f=a.ui.dialog.getTitleId(b.element),g=(b.uiDialog=a("<div></div>")).appendTo(document.body).hide().addClass(c+d.dialogClass).css({zIndex:d.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(c){d.closeOnEscape&&!c.isDefaultPrevented()&&c.keyCode&&c.keyCode===a.ui.keyCode.ESCAPE&&(b.close(c),c.preventDefault())}).attr({role:"dialog","aria-labelledby":f}).mousedown(function(a){b.moveToTop(!1,a)}),h=b.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(g),i=(b.uiDialogTitlebar=a("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(g),j=a('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){j.addClass("ui-state-hover")},function(){j.removeClass("ui-state-hover")}).focus(function(){j.addClass("ui-state-focus")}).blur(function(){j.removeClass("ui-state-focus")}).click(function(a){return b.close(a),!1}).appendTo(i),k=(b.uiDialogTitlebarCloseText=a("<span></span>")).addClass("ui-icon ui-icon-closethick").text(d.closeText).appendTo(j),l=a("<span></span>").addClass("ui-dialog-title").attr("id",f).html(e).prependTo(i);a.isFunction(d.beforeclose)&&!a.isFunction(d.beforeClose)&&(d.beforeClose=d.beforeclose),i.find("*").add(i).disableSelection(),d.draggable&&a.fn.draggable&&b._makeDraggable(),d.resizable&&a.fn.resizable&&b._makeResizable(),b._createButtons(d.buttons),b._isOpen=!1,a.fn.bgiframe&&g.bgiframe()},_init:function(){this.options.autoOpen&&this.open()},destroy:function(){var a=this;return a.overlay&&a.overlay.destroy(),a.uiDialog.hide(),a.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"),a.uiDialog.remove(),a.originalTitle&&a.element.attr("title",a.originalTitle),a},widget:function(){return this.uiDialog},close:function(b){var c=this,d,e;if(!1===c._trigger("beforeClose",b))return;return c.overlay&&c.overlay.destroy(),c.uiDialog.unbind("keypress.ui-dialog"),c._isOpen=!1,c.options.hide?c.uiDialog.hide(c.options.hide,function(){c._trigger("close",b)}):(c.uiDialog.hide(),c._trigger("close",b)),a.ui.dialog.overlay.resize(),c.options.modal&&(d=0,a(".ui-dialog").each(function(){this!==c.uiDialog[0]&&(e=a(this).css("z-index"),isNaN(e)||(d=Math.max(d,e)))}),a.ui.dialog.maxZ=d),c},isOpen:function(){return this._isOpen},moveToTop:function(b,c){var d=this,e=d.options,f;return e.modal&&!b||!e.stack&&!e.modal?d._trigger("focus",c):(e.zIndex>a.ui.dialog.maxZ&&(a.ui.dialog.maxZ=e.zIndex),d.overlay&&(a.ui.dialog.maxZ+=1,d.overlay.$el.css("z-index",a.ui.dialog.overlay.maxZ=a.ui.dialog.maxZ)),f={scrollTop:d.element.scrollTop(),scrollLeft:d.element.scrollLeft()},a.ui.dialog.maxZ+=1,d.uiDialog.css("z-index",a.ui.dialog.maxZ),d.element.attr(f),d._trigger("focus",c),d)},open:function(){if(this._isOpen)return;var b=this,c=b.options,d=b.uiDialog;return b.overlay=c.modal?new a.ui.dialog.overlay(b):null,b._size(),b._position(c.position),d.show(c.show),b.moveToTop(!0),c.modal&&d.bind("keydown.ui-dialog",function(b){if(b.keyCode!==a.ui.keyCode.TAB)return;var c=a(":tabbable",this),d=c.filter(":first"),e=c.filter(":last");if(b.target===e[0]&&!b.shiftKey)return d.focus(1),!1;if(b.target===d[0]&&b.shiftKey)return e.focus(1),!1}),a(b.element.find(":tabbable").get().concat(d.find(".ui-dialog-buttonpane :tabbable").get().concat(d.get()))).eq(0).focus(),b._isOpen=!0,b._trigger("open"),b},_createButtons:function(b){var c=this,d=!1,e=a("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),g=a("<div></div>").addClass("ui-dialog-buttonset").appendTo(e);c.uiDialog.find(".ui-dialog-buttonpane").remove(),typeof b=="object"&&b!==null&&a.each(b,function(){return!(d=!0)}),d&&(a.each(b,function(b,d){d=a.isFunction(d)?{click:d,text:b}:d;var e=a('<button type="button"></button>').click(function(){d.click.apply(c.element[0],arguments)}).appendTo(g);a.each(d,function(a,b){if(a==="click")return;a in f?e[a](b):e.attr(a,b)}),a.fn.button&&e.button()}),e.appendTo(c.uiDialog))},_makeDraggable:function(){function f(a){return{position:a.position,offset:a.offset}}var b=this,c=b.options,d=a(document),e;b.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(d,g){e=c.height==="auto"?"auto":a(this).height(),a(this).height(a(this).height()).addClass("ui-dialog-dragging"),b._trigger("dragStart",d,f(g))},drag:function(a,c){b._trigger("drag",a,f(c))},stop:function(g,h){c.position=[h.position.left-d.scrollLeft(),h.position.top-d.scrollTop()],a(this).removeClass("ui-dialog-dragging").height(e),b._trigger("dragStop",g,f(h)),a.ui.dialog.overlay.resize()}})},_makeResizable:function(c){function h(a){return{originalPosition:a.originalPosition,originalSize:a.originalSize,position:a.position,size:a.size}}c=c===b?this.options.resizable:c;var d=this,e=d.options,f=d.uiDialog.css("position"),g=typeof c=="string"?c:"n,e,s,w,se,sw,ne,nw";d.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:d.element,maxWidth:e.maxWidth,maxHeight:e.maxHeight,minWidth:e.minWidth,minHeight:d._minHeight(),handles:g,start:function(b,c){a(this).addClass("ui-dialog-resizing"),d._trigger("resizeStart",b,h(c))},resize:function(a,b){d._trigger("resize",a,h(b))},stop:function(b,c){a(this).removeClass("ui-dialog-resizing"),e.height=a(this).height(),e.width=a(this).width(),d._trigger("resizeStop",b,h(c)),a.ui.dialog.overlay.resize()}}).css("position",f).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_minHeight:function(){var a=this.options;return a.height==="auto"?a.minHeight:Math.min(a.minHeight,a.height)},_position:function(b){var c=[],d=[0,0],e;if(b){if(typeof b=="string"||typeof b=="object"&&"0"in b)c=b.split?b.split(" "):[b[0],b[1]],c.length===1&&(c[1]=c[0]),a.each(["left","top"],function(a,b){+c[a]===c[a]&&(d[a]=c[a],c[a]=b)}),b={my:c.join(" "),at:c.join(" "),offset:d.join(" ")};b=a.extend({},a.ui.dialog.prototype.options.position,b)}else b=a.ui.dialog.prototype.options.position;e=this.uiDialog.is(":visible"),e||this.uiDialog.show(),this.uiDialog.css({top:0,left:0}).position(a.extend({of:window},b)),e||this.uiDialog.hide()},_setOptions:function(b){var c=this,f={},g=!1;a.each(b,function(a,b){c._setOption(a,b),a in d&&(g=!0),a in e&&(f[a]=b)}),g&&this._size(),this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option",f)},_setOption:function(b,d){var e=this,f=e.uiDialog;switch(b){case"beforeclose":b="beforeClose";break;case"buttons":e._createButtons(d);break;case"closeText":e.uiDialogTitlebarCloseText.text(""+d);break;case"dialogClass":f.removeClass(e.options.dialogClass).addClass(c+d);break;case"disabled":d?f.addClass("ui-dialog-disabled"):f.removeClass("ui-dialog-disabled");break;case"draggable":var g=f.is(":data(draggable)");g&&!d&&f.draggable("destroy"),!g&&d&&e._makeDraggable();break;case"position":e._position(d);break;case"resizable":var h=f.is(":data(resizable)");h&&!d&&f.resizable("destroy"),h&&typeof d=="string"&&f.resizable("option","handles",d),!h&&d!==!1&&e._makeResizable(d);break;case"title":a(".ui-dialog-title",e.uiDialogTitlebar).html(""+(d||"&#160;"))}a.Widget.prototype._setOption.apply(e,arguments)},_size:function(){var b=this.options,c,d,e=this.uiDialog.is(":visible");this.element.show().css({width:"auto",minHeight:0,height:0}),b.minWidth>b.width&&(b.width=b.minWidth),c=this.uiDialog.css({height:"auto",width:b.width}).height(),d=Math.max(0,b.minHeight-c);if(b.height==="auto")if(a.support.minHeight)this.element.css({minHeight:d,height:"auto"});else{this.uiDialog.show();var f=this.element.css("height","auto").height();e||this.uiDialog.hide(),this.element.height(Math.max(f,d))}else this.element.height(Math.max(b.height-c,0));this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())}}),a.extend(a.ui.dialog,{version:"1.8.20",uuid:0,maxZ:0,getTitleId:function(a){var b=a.attr("id");return b||(this.uuid+=1,b=this.uuid),"ui-dialog-title-"+b},overlay:function(b){this.$el=a.ui.dialog.overlay.create(b)}}),a.extend(a.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:a.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(a){return a+".dialog-overlay"}).join(" "),create:function(b){this.instances.length===0&&(setTimeout(function(){a.ui.dialog.overlay.instances.length&&a(document).bind(a.ui.dialog.overlay.events,function(b){if(a(b.target).zIndex()<a.ui.dialog.overlay.maxZ)return!1})},1),a(document).bind("keydown.dialog-overlay",function(c){b.options.closeOnEscape&&!c.isDefaultPrevented()&&c.keyCode&&c.keyCode===a.ui.keyCode.ESCAPE&&(b.close(c),c.preventDefault())}),a(window).bind("resize.dialog-overlay",a.ui.dialog.overlay.resize));var c=(this.oldInstances.pop()||a("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),height:this.height()});return a.fn.bgiframe&&c.bgiframe(),this.instances.push(c),c},destroy:function(b){var c=a.inArray(b,this.instances);c!=-1&&this.oldInstances.push(this.instances.splice(c,1)[0]),this.instances.length===0&&a([document,window]).unbind(".dialog-overlay"),b.remove();var d=0;a.each(this.instances,function(){d=Math.max(d,this.css("z-index"))}),this.maxZ=d},height:function(){var b,c;return a.browser.msie&&a.browser.version<7?(b=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight),c=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight),b<c?a(window).height()+"px":b+"px"):a(document).height()+"px"},width:function(){var b,c;return a.browser.msie?(b=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),c=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth),b<c?a(window).width()+"px":b+"px"):a(document).width()+"px"},resize:function(){var b=a([]);a.each(a.ui.dialog.overlay.instances,function(){b=b.add(this)}),b.css({width:0,height:0}).css({width:a.ui.dialog.overlay.width(),height:a.ui.dialog.overlay.height()})}}),a.extend(a.ui.dialog.overlay.prototype,{destroy:function(){a.ui.dialog.overlay.destroy(this.$el)}})})(jQuery);;
(function(a){a.ui.dialog.prototype.options.closeOnEscape=false;a.widget("wp.wpdialog",a.ui.dialog,{options:{closeOnEscape:false},open:function(){var b;if(tinyMCEPopup&&typeof tinyMCE!="undefined"&&(b=tinyMCE.activeEditor)&&!b.isHidden()){tinyMCEPopup.init()}if(this._isOpen||false===this._trigger("beforeOpen")){return}a.ui.dialog.prototype.open.apply(this,arguments);this.element.focus();this._trigger("refresh")}})})(jQuery);;
var wpLink;(function(f){var b={},e={},d,a,c;wpLink={timeToTriggerRiver:150,minRiverAJAXDuration:200,riverBottomThreshold:5,keySensitivity:100,lastSearch:"",textarea:"",init:function(){b.dialog=f("#wp-link");b.submit=f("#wp-link-submit");b.url=f("#url-field");b.nonce=f("#_ajax_linking_nonce");b.title=f("#link-title-field");b.openInNewTab=f("#link-target-checkbox");b.search=f("#search-field");e.search=new a(f("#search-results"));e.recent=new a(f("#most-recent-results"));e.elements=f(".query-results",b.dialog);b.dialog.keydown(wpLink.keydown);b.dialog.keyup(wpLink.keyup);b.submit.click(function(g){g.preventDefault();wpLink.update()});f("#wp-link-cancel").click(function(g){g.preventDefault();wpLink.close()});f("#internal-toggle").click(wpLink.toggleInternalLinking);e.elements.bind("river-select",wpLink.updateFields);b.search.keyup(wpLink.searchInternalLinks);b.dialog.bind("wpdialogrefresh",wpLink.refresh);b.dialog.bind("wpdialogbeforeopen",wpLink.beforeOpen);b.dialog.bind("wpdialogclose",wpLink.onClose)},beforeOpen:function(){wpLink.range=null;if(!wpLink.isMCE()&&document.selection){wpLink.textarea.focus();wpLink.range=document.selection.createRange()}},open:function(){if(!wpActiveEditor){return}this.textarea=f("#"+wpActiveEditor).get(0);if(!b.dialog.data("wpdialog")){b.dialog.wpdialog({title:wpLinkL10n.title,width:480,height:"auto",modal:true,dialogClass:"wp-dialog",zIndex:300000})}b.dialog.wpdialog("open")},isMCE:function(){return tinyMCEPopup&&(d=tinyMCEPopup.editor)&&!d.isHidden()},refresh:function(){e.search.refresh();e.recent.refresh();if(wpLink.isMCE()){wpLink.mceRefresh()}else{wpLink.setDefaultValues()}b.url.focus()[0].select();if(!e.recent.ul.children().length){e.recent.ajax()}},mceRefresh:function(){var g;d=tinyMCEPopup.editor;tinyMCEPopup.restoreSelection();if(g=d.dom.getParent(d.selection.getNode(),"A")){b.url.val(d.dom.getAttrib(g,"href"));b.title.val(d.dom.getAttrib(g,"title"));if("_blank"==d.dom.getAttrib(g,"target")){b.openInNewTab.prop("checked",true)}b.submit.val(wpLinkL10n.update)}else{wpLink.setDefaultValues()}tinyMCEPopup.storeSelection()},close:function(){if(wpLink.isMCE()){tinyMCEPopup.close()}else{b.dialog.wpdialog("close")}},onClose:function(){if(!wpLink.isMCE()){wpLink.textarea.focus();if(wpLink.range){wpLink.range.moveToBookmark(wpLink.range.getBookmark());wpLink.range.select()}}},getAttrs:function(){return{href:b.url.val(),title:b.title.val(),target:b.openInNewTab.prop("checked")?"_blank":""}},update:function(){if(wpLink.isMCE()){wpLink.mceUpdate()}else{wpLink.htmlUpdate()}},htmlUpdate:function(){var i,j,k,h,l,g=wpLink.textarea;if(!g){return}i=wpLink.getAttrs();if(!i.href||i.href=="http://"){return}j='<a href="'+i.href+'"';if(i.title){j+=' title="'+i.title+'"'}if(i.target){j+=' target="'+i.target+'"'}j+=">";if(document.selection&&wpLink.range){g.focus();wpLink.range.text=j+wpLink.range.text+"</a>";wpLink.range.moveToBookmark(wpLink.range.getBookmark());wpLink.range.select();wpLink.range=null}else{if(typeof g.selectionStart!=="undefined"){k=g.selectionStart;h=g.selectionEnd;selection=g.value.substring(k,h);j=j+selection+"</a>";l=k+j.length;if(k==h){l-="</a>".length}g.value=g.value.substring(0,k)+j+g.value.substring(h,g.value.length);g.selectionStart=g.selectionEnd=l}}wpLink.close();g.focus()},mceUpdate:function(){var h=tinyMCEPopup.editor,i=wpLink.getAttrs(),j,g;tinyMCEPopup.restoreSelection();j=h.dom.getParent(h.selection.getNode(),"A");if(!i.href||i.href=="http://"){if(j){tinyMCEPopup.execCommand("mceBeginUndoLevel");g=h.selection.getBookmark();h.dom.remove(j,1);h.selection.moveToBookmark(g);tinyMCEPopup.execCommand("mceEndUndoLevel");wpLink.close()}return}tinyMCEPopup.execCommand("mceBeginUndoLevel");if(j==null){h.getDoc().execCommand("unlink",false,null);tinyMCEPopup.execCommand("mceInsertLink",false,"#mce_temp_url#",{skip_undo:1});tinymce.each(h.dom.select("a"),function(k){if(h.dom.getAttrib(k,"href")=="#mce_temp_url#"){j=k;h.dom.setAttribs(j,i)}});if(f(j).text()=="#mce_temp_url#"){h.dom.remove(j);j=null}}else{h.dom.setAttribs(j,i)}if(j&&(j.childNodes.length!=1||j.firstChild.nodeName!="IMG")){h.focus();h.selection.select(j);h.selection.collapse(0);tinyMCEPopup.storeSelection()}tinyMCEPopup.execCommand("mceEndUndoLevel");wpLink.close()},updateFields:function(i,h,g){b.url.val(h.children(".item-permalink").val());b.title.val(h.hasClass("no-title")?"":h.children(".item-title").text());if(g&&g.type=="click"){b.url.focus()}},setDefaultValues:function(){b.url.val("http://");b.title.val("");b.submit.val(wpLinkL10n.save)},searchInternalLinks:function(){var h=f(this),i,g=h.val();if(g.length>2){e.recent.hide();e.search.show();if(wpLink.lastSearch==g){return}wpLink.lastSearch=g;i=h.parent().find("img.waiting").show();e.search.change(g);e.search.ajax(function(){i.hide()})}else{e.search.hide();e.recent.show()}},next:function(){e.search.next();e.recent.next()},prev:function(){e.search.prev();e.recent.prev()},keydown:function(i){var h,g=f.ui.keyCode;switch(i.which){case g.UP:h="prev";case g.DOWN:h=h||"next";clearInterval(wpLink.keyInterval);wpLink[h]();wpLink.keyInterval=setInterval(wpLink[h],wpLink.keySensitivity);break;default:return}i.preventDefault()},keyup:function(h){var g=f.ui.keyCode;switch(h.which){case g.ESCAPE:h.stopImmediatePropagation();if(!f(document).triggerHandler("wp_CloseOnEscape",[{event:h,what:"wplink",cb:wpLink.close}])){wpLink.close()}return false;break;case g.UP:case g.DOWN:clearInterval(wpLink.keyInterval);break;default:return}h.preventDefault()},delayedCallback:function(i,g){var l,k,j,h;if(!g){return i}setTimeout(function(){if(k){return i.apply(h,j)}l=true},g);return function(){if(l){return i.apply(this,arguments)}j=arguments;h=this;k=true}},toggleInternalLinking:function(h){var g=f("#search-panel"),i=b.dialog.wpdialog("widget"),k=!g.is(":visible"),j=f(window);f(this).toggleClass("toggle-arrow-active",k);b.dialog.height("auto");g.slideToggle(300,function(){setUserSetting("wplink",k?"1":"0");b[k?"search":"url"].focus();var l=j.scrollTop(),o=i.offset().top,m=o+i.outerHeight(),n=m-j.height();if(n>l){i.animate({top:n<o?o-n:l},200)}});h.preventDefault()}};a=function(i,h){var g=this;this.element=i;this.ul=i.children("ul");this.waiting=i.find(".river-waiting");this.change(h);this.refresh();i.scroll(function(){g.maybeLoad()});i.delegate("li","click",function(j){g.select(f(this),j)})};f.extend(a.prototype,{refresh:function(){this.deselect();this.visible=this.element.is(":visible")},show:function(){if(!this.visible){this.deselect();this.element.show();this.visible=true}},hide:function(){this.element.hide();this.visible=false},select:function(h,k){var j,i,l,g;if(h.hasClass("unselectable")||h==this.selected){return}this.deselect();this.selected=h.addClass("selected");j=h.outerHeight();i=this.element.height();l=h.position().top;g=this.element.scrollTop();if(l<0){this.element.scrollTop(g+l)}else{if(l+j>i){this.element.scrollTop(g+l-i+j)}}this.element.trigger("river-select",[h,k,this])},deselect:function(){if(this.selected){this.selected.removeClass("selected")}this.selected=false},prev:function(){if(!this.visible){return}var g;if(this.selected){g=this.selected.prev("li");if(g.length){this.select(g)}}},next:function(){if(!this.visible){return}var g=this.selected?this.selected.next("li"):f("li:not(.unselectable):first",this.element);if(g.length){this.select(g)}},ajax:function(j){var h=this,i=this.query.page==1?0:wpLink.minRiverAJAXDuration,g=wpLink.delayedCallback(function(k,l){h.process(k,l);if(j){j(k,l)}},i);this.query.ajax(g)},change:function(g){if(this.query&&this._search==g){return}this._search=g;this.query=new c(g);this.element.scrollTop(0)},process:function(h,l){var i="",j=true,g="",k=l.page==1;if(!h){if(k){i+='<li class="unselectable"><span class="item-title"><em>'+wpLinkL10n.noMatchesFound+"</em></span></li>"}}else{f.each(h,function(){g=j?"alternate":"";g+=this["title"]?"":" no-title";i+=g?'<li class="'+g+'">':"<li>";i+='<input type="hidden" class="item-permalink" value="'+this["permalink"]+'" />';i+='<span class="item-title">';i+=this["title"]?this["title"]:wpLinkL10n.noTitle;i+='</span><span class="item-info">'+this["info"]+"</span></li>";j=!j})}this.ul[k?"html":"append"](i)},maybeLoad:function(){var h=this,i=this.element,g=i.scrollTop()+i.height();if(!this.query.ready()||g<this.ul.height()-wpLink.riverBottomThreshold){return}setTimeout(function(){var j=i.scrollTop(),k=j+i.height();if(!h.query.ready()||k<h.ul.height()-wpLink.riverBottomThreshold){return}h.waiting.show();i.scrollTop(j+h.waiting.outerHeight());h.ajax(function(){h.waiting.hide()})},wpLink.timeToTriggerRiver)}});c=function(g){this.page=1;this.allLoaded=false;this.querying=false;this.search=g};f.extend(c.prototype,{ready:function(){return !(this.querying||this.allLoaded)},ajax:function(i){var g=this,h={action:"wp-link-ajax",page:this.page,_ajax_linking_nonce:b.nonce.val()};if(this.search){h.search=this.search}this.querying=true;f.post(ajaxurl,h,function(j){g.page++;g.querying=false;g.allLoaded=!j;i(j,h)},"json")}});f(document).ready(wpLink.init)})(jQuery);;
var tinyMCEPopup={init:function(){var b=this,a,c;a=b.getWin();tinymce=a.tinymce;tinyMCE=a.tinyMCE;b.editor=tinymce.EditorManager.activeEditor;b.params=b.editor.windowManager.params;b.features=b.editor.windowManager.features;b.dom=tinymce.dom;b.listeners=[];b.onInit={add:function(e,d){b.listeners.push({func:e,scope:d})}};b.isWindow=false;b.id=b.features.id;b.editor.windowManager.onOpen.dispatch(b.editor.windowManager,window)},getWin:function(){return window},getWindowArg:function(c,b){var a=this.params[c];return tinymce.is(a)?a:b},getParam:function(b,a){return this.editor.getParam(b,a)},getLang:function(b,a){return this.editor.getLang(b,a)},execCommand:function(d,c,e,b){b=b||{};b.skip_focus=1;this.restoreSelection();return this.editor.execCommand(d,c,e,b)},resizeToInnerSize:function(){var a=this;setTimeout(function(){var b=a.dom.getViewPort(window);a.editor.windowManager.resizeBy(a.getWindowArg("mce_width")-b.w,a.getWindowArg("mce_height")-b.h,a.id||window)},0)},executeOnLoad:function(s){this.onInit.add(function(){eval(s)})},storeSelection:function(){this.editor.windowManager.bookmark=tinyMCEPopup.editor.selection.getBookmark(1)},restoreSelection:function(){var a=tinyMCEPopup;if(!a.isWindow&&tinymce.isIE){a.editor.selection.moveToBookmark(a.editor.windowManager.bookmark)}},requireLangPack:function(){var b=this,a=b.getWindowArg("plugin_url")||b.getWindowArg("theme_url");if(a&&b.editor.settings.language&&b.features.translate_i18n!==false){a+="/langs/"+b.editor.settings.language+"_dlg.js";if(!tinymce.ScriptLoader.isDone(a)){document.write('<script type="text/javascript" src="'+tinymce._addVer(a)+'"><\/script>');tinymce.ScriptLoader.markDone(a)}}},pickColor:function(b,a){this.execCommand("mceColorPicker",true,{color:document.getElementById(a).value,func:function(e){document.getElementById(a).value=e;try{document.getElementById(a).onchange()}catch(d){}}})},openBrowser:function(a,c,b){tinyMCEPopup.restoreSelection();this.editor.execCallback("file_browser_callback",a,document.getElementById(a).value,c,window)},confirm:function(b,a,c){this.editor.windowManager.confirm(b,a,c,window)},alert:function(b,a,c){this.editor.windowManager.alert(b,a,c,window)},close:function(){var a=this;function b(){a.editor.windowManager.close(window);a.editor=null}if(tinymce.isOpera){a.getWin().setTimeout(b,0)}else{b()}},_restoreSelection:function(){var a=window.event.srcElement;if(a.nodeName=="INPUT"&&(a.type=="submit"||a.type=="button")){tinyMCEPopup.restoreSelection()}},_onDOMLoaded:function(){var b=tinyMCEPopup,d=document.title,e,c,a;if(b.domLoaded){return}b.domLoaded=1;tinyMCEPopup.init();if(b.features.translate_i18n!==false){c=document.body.innerHTML;if(tinymce.isIE){c=c.replace(/ (value|title|alt)=([^"][^\s>]+)/gi,' $1="$2"')}document.dir=b.editor.getParam("directionality","");if((a=b.editor.translate(c))&&a!=c){document.body.innerHTML=a}if((a=b.editor.translate(d))&&a!=d){document.title=d=a}}document.body.style.display="";if(tinymce.isIE){document.attachEvent("onmouseup",tinyMCEPopup._restoreSelection);b.dom.add(b.dom.select("head")[0],"base",{target:"_self"})}b.restoreSelection();if(!b.isWindow){b.editor.windowManager.setTitle(window,d)}else{window.focus()}if(!tinymce.isIE&&!b.isWindow){tinymce.dom.Event._add(document,"focus",function(){b.editor.windowManager.focus(b.id)})}tinymce.each(b.dom.select("select"),function(f){f.onkeydown=tinyMCEPopup._accessHandler});tinymce.each(b.listeners,function(f){f.func.call(f.scope,b.editor)});if(b.getWindowArg("mce_auto_focus",true)){window.focus();tinymce.each(document.forms,function(g){tinymce.each(g.elements,function(f){if(b.dom.hasClass(f,"mceFocus")&&!f.disabled){f.focus();return false}})})}document.onkeyup=tinyMCEPopup._closeWinKeyHandler},_accessHandler:function(a){a=a||window.event;if(a.keyCode==13||a.keyCode==32){a=a.target||a.srcElement;if(a.onchange){a.onchange()}return tinymce.dom.Event.cancel(a)}},_closeWinKeyHandler:function(a){a=a||window.event;if(a.keyCode==27){tinyMCEPopup.close()}},_wait:function(){if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);tinyMCEPopup._onDOMLoaded()}});if(document.documentElement.doScroll&&window==window.top){(function(){if(tinyMCEPopup.domLoaded){return}try{document.documentElement.doScroll("left")}catch(a){setTimeout(arguments.callee,0);return}tinyMCEPopup._onDOMLoaded()})()}document.attachEvent("onload",tinyMCEPopup._onDOMLoaded)}else{if(document.addEventListener){window.addEventListener("DOMContentLoaded",tinyMCEPopup._onDOMLoaded,false);window.addEventListener("load",tinyMCEPopup._onDOMLoaded,false)}}}};;
