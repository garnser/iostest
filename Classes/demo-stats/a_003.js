// Underscore.js 1.3.3
// (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Underscore is freely distributable under the MIT license.
// Portions of Underscore are inspired or borrowed from Prototype,
// Oliver Steele's Functional, and John Resig's Micro-Templating.
// For all details and documentation:
// http://documentcloud.github.com/underscore
(function(){function r(a,c,d){if(a===c)return 0!==a||1/a==1/c;if(null==a||null==c)return a===c;a._chain&&(a=a._wrapped);c._chain&&(c=c._wrapped);if(a.isEqual&&b.isFunction(a.isEqual))return a.isEqual(c);if(c.isEqual&&b.isFunction(c.isEqual))return c.isEqual(a);var e=l.call(a);if(e!=l.call(c))return!1;switch(e){case "[object String]":return a==""+c;case "[object Number]":return a!=+a?c!=+c:0==a?1/a==1/c:a==+c;case "[object Date]":case "[object Boolean]":return+a==+c;case "[object RegExp]":return a.source==
c.source&&a.global==c.global&&a.multiline==c.multiline&&a.ignoreCase==c.ignoreCase}if("object"!=typeof a||"object"!=typeof c)return!1;for(var f=d.length;f--;)if(d[f]==a)return!0;d.push(a);var f=0,g=!0;if("[object Array]"==e){if(f=a.length,g=f==c.length)for(;f--&&(g=f in a==f in c&&r(a[f],c[f],d)););}else{if("constructor"in a!="constructor"in c||a.constructor!=c.constructor)return!1;for(var h in a)if(b.has(a,h)&&(f++,!(g=b.has(c,h)&&r(a[h],c[h],d))))break;if(g){for(h in c)if(b.has(c,h)&&!f--)break;
g=!f}}d.pop();return g}var s=this,I=s._,o={},k=Array.prototype,p=Object.prototype,i=k.slice,J=k.unshift,l=p.toString,K=p.hasOwnProperty,y=k.forEach,z=k.map,A=k.reduce,B=k.reduceRight,C=k.filter,D=k.every,E=k.some,q=k.indexOf,F=k.lastIndexOf,p=Array.isArray,L=Object.keys,t=Function.prototype.bind,b=function(a){return new m(a)};"undefined"!==typeof exports?("undefined"!==typeof module&&module.exports&&(exports=module.exports=b),exports._=b):s._=b;b.VERSION="1.3.3";var j=b.each=b.forEach=function(a,
c,d){if(a!=null)if(y&&a.forEach===y)a.forEach(c,d);else if(a.length===+a.length)for(var e=0,f=a.length;e<f;e++){if(e in a&&c.call(d,a[e],e,a)===o)break}else for(e in a)if(b.has(a,e)&&c.call(d,a[e],e,a)===o)break};b.map=b.collect=function(a,c,b){var e=[];if(a==null)return e;if(z&&a.map===z)return a.map(c,b);j(a,function(a,g,h){e[e.length]=c.call(b,a,g,h)});if(a.length===+a.length)e.length=a.length;return e};b.reduce=b.foldl=b.inject=function(a,c,d,e){var f=arguments.length>2;a==null&&(a=[]);if(A&&
a.reduce===A){e&&(c=b.bind(c,e));return f?a.reduce(c,d):a.reduce(c)}j(a,function(a,b,i){if(f)d=c.call(e,d,a,b,i);else{d=a;f=true}});if(!f)throw new TypeError("Reduce of empty array with no initial value");return d};b.reduceRight=b.foldr=function(a,c,d,e){var f=arguments.length>2;a==null&&(a=[]);if(B&&a.reduceRight===B){e&&(c=b.bind(c,e));return f?a.reduceRight(c,d):a.reduceRight(c)}var g=b.toArray(a).reverse();e&&!f&&(c=b.bind(c,e));return f?b.reduce(g,c,d,e):b.reduce(g,c)};b.find=b.detect=function(a,
c,b){var e;G(a,function(a,g,h){if(c.call(b,a,g,h)){e=a;return true}});return e};b.filter=b.select=function(a,c,b){var e=[];if(a==null)return e;if(C&&a.filter===C)return a.filter(c,b);j(a,function(a,g,h){c.call(b,a,g,h)&&(e[e.length]=a)});return e};b.reject=function(a,c,b){var e=[];if(a==null)return e;j(a,function(a,g,h){c.call(b,a,g,h)||(e[e.length]=a)});return e};b.every=b.all=function(a,c,b){var e=true;if(a==null)return e;if(D&&a.every===D)return a.every(c,b);j(a,function(a,g,h){if(!(e=e&&c.call(b,
a,g,h)))return o});return!!e};var G=b.some=b.any=function(a,c,d){c||(c=b.identity);var e=false;if(a==null)return e;if(E&&a.some===E)return a.some(c,d);j(a,function(a,b,h){if(e||(e=c.call(d,a,b,h)))return o});return!!e};b.include=b.contains=function(a,c){var b=false;if(a==null)return b;if(q&&a.indexOf===q)return a.indexOf(c)!=-1;return b=G(a,function(a){return a===c})};b.invoke=function(a,c){var d=i.call(arguments,2);return b.map(a,function(a){return(b.isFunction(c)?c||a:a[c]).apply(a,d)})};b.pluck=
function(a,c){return b.map(a,function(a){return a[c]})};b.max=function(a,c,d){if(!c&&b.isArray(a)&&a[0]===+a[0])return Math.max.apply(Math,a);if(!c&&b.isEmpty(a))return-Infinity;var e={computed:-Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b>=e.computed&&(e={value:a,computed:b})});return e.value};b.min=function(a,c,d){if(!c&&b.isArray(a)&&a[0]===+a[0])return Math.min.apply(Math,a);if(!c&&b.isEmpty(a))return Infinity;var e={computed:Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b<e.computed&&
(e={value:a,computed:b})});return e.value};b.shuffle=function(a){var b=[],d;j(a,function(a,f){d=Math.floor(Math.random()*(f+1));b[f]=b[d];b[d]=a});return b};b.sortBy=function(a,c,d){var e=b.isFunction(c)?c:function(a){return a[c]};return b.pluck(b.map(a,function(a,b,c){return{value:a,criteria:e.call(d,a,b,c)}}).sort(function(a,b){var c=a.criteria,d=b.criteria;return c===void 0?1:d===void 0?-1:c<d?-1:c>d?1:0}),"value")};b.groupBy=function(a,c){var d={},e=b.isFunction(c)?c:function(a){return a[c]};
j(a,function(a,b){var c=e(a,b);(d[c]||(d[c]=[])).push(a)});return d};b.sortedIndex=function(a,c,d){d||(d=b.identity);for(var e=0,f=a.length;e<f;){var g=e+f>>1;d(a[g])<d(c)?e=g+1:f=g}return e};b.toArray=function(a){return!a?[]:b.isArray(a)||b.isArguments(a)?i.call(a):a.toArray&&b.isFunction(a.toArray)?a.toArray():b.values(a)};b.size=function(a){return b.isArray(a)?a.length:b.keys(a).length};b.first=b.head=b.take=function(a,b,d){return b!=null&&!d?i.call(a,0,b):a[0]};b.initial=function(a,b,d){return i.call(a,
0,a.length-(b==null||d?1:b))};b.last=function(a,b,d){return b!=null&&!d?i.call(a,Math.max(a.length-b,0)):a[a.length-1]};b.rest=b.tail=function(a,b,d){return i.call(a,b==null||d?1:b)};b.compact=function(a){return b.filter(a,function(a){return!!a})};b.flatten=function(a,c){return b.reduce(a,function(a,e){if(b.isArray(e))return a.concat(c?e:b.flatten(e));a[a.length]=e;return a},[])};b.without=function(a){return b.difference(a,i.call(arguments,1))};b.uniq=b.unique=function(a,c,d){var d=d?b.map(a,d):a,
e=[];a.length<3&&(c=true);b.reduce(d,function(d,g,h){if(c?b.last(d)!==g||!d.length:!b.include(d,g)){d.push(g);e.push(a[h])}return d},[]);return e};b.union=function(){return b.uniq(b.flatten(arguments,true))};b.intersection=b.intersect=function(a){var c=i.call(arguments,1);return b.filter(b.uniq(a),function(a){return b.every(c,function(c){return b.indexOf(c,a)>=0})})};b.difference=function(a){var c=b.flatten(i.call(arguments,1),true);return b.filter(a,function(a){return!b.include(c,a)})};b.zip=function(){for(var a=
i.call(arguments),c=b.max(b.pluck(a,"length")),d=Array(c),e=0;e<c;e++)d[e]=b.pluck(a,""+e);return d};b.indexOf=function(a,c,d){if(a==null)return-1;var e;if(d){d=b.sortedIndex(a,c);return a[d]===c?d:-1}if(q&&a.indexOf===q)return a.indexOf(c);d=0;for(e=a.length;d<e;d++)if(d in a&&a[d]===c)return d;return-1};b.lastIndexOf=function(a,b){if(a==null)return-1;if(F&&a.lastIndexOf===F)return a.lastIndexOf(b);for(var d=a.length;d--;)if(d in a&&a[d]===b)return d;return-1};b.range=function(a,b,d){if(arguments.length<=
1){b=a||0;a=0}for(var d=arguments[2]||1,e=Math.max(Math.ceil((b-a)/d),0),f=0,g=Array(e);f<e;){g[f++]=a;a=a+d}return g};var H=function(){};b.bind=function(a,c){var d,e;if(a.bind===t&&t)return t.apply(a,i.call(arguments,1));if(!b.isFunction(a))throw new TypeError;e=i.call(arguments,2);return d=function(){if(!(this instanceof d))return a.apply(c,e.concat(i.call(arguments)));H.prototype=a.prototype;var b=new H,g=a.apply(b,e.concat(i.call(arguments)));return Object(g)===g?g:b}};b.bindAll=function(a){var c=
i.call(arguments,1);c.length==0&&(c=b.functions(a));j(c,function(c){a[c]=b.bind(a[c],a)});return a};b.memoize=function(a,c){var d={};c||(c=b.identity);return function(){var e=c.apply(this,arguments);return b.has(d,e)?d[e]:d[e]=a.apply(this,arguments)}};b.delay=function(a,b){var d=i.call(arguments,2);return setTimeout(function(){return a.apply(null,d)},b)};b.defer=function(a){return b.delay.apply(b,[a,1].concat(i.call(arguments,1)))};b.throttle=function(a,c){var d,e,f,g,h,i,j=b.debounce(function(){h=
g=false},c);return function(){d=this;e=arguments;f||(f=setTimeout(function(){f=null;h&&a.apply(d,e);j()},c));g?h=true:i=a.apply(d,e);j();g=true;return i}};b.debounce=function(a,b,d){var e;return function(){var f=this,g=arguments;d&&!e&&a.apply(f,g);clearTimeout(e);e=setTimeout(function(){e=null;d||a.apply(f,g)},b)}};b.once=function(a){var b=false,d;return function(){if(b)return d;b=true;return d=a.apply(this,arguments)}};b.wrap=function(a,b){return function(){var d=[a].concat(i.call(arguments,0));
return b.apply(this,d)}};b.compose=function(){var a=arguments;return function(){for(var b=arguments,d=a.length-1;d>=0;d--)b=[a[d].apply(this,b)];return b[0]}};b.after=function(a,b){return a<=0?b():function(){if(--a<1)return b.apply(this,arguments)}};b.keys=L||function(a){if(a!==Object(a))throw new TypeError("Invalid object");var c=[],d;for(d in a)b.has(a,d)&&(c[c.length]=d);return c};b.values=function(a){return b.map(a,b.identity)};b.functions=b.methods=function(a){var c=[],d;for(d in a)b.isFunction(a[d])&&
c.push(d);return c.sort()};b.extend=function(a){j(i.call(arguments,1),function(b){for(var d in b)a[d]=b[d]});return a};b.pick=function(a){var c={};j(b.flatten(i.call(arguments,1)),function(b){b in a&&(c[b]=a[b])});return c};b.defaults=function(a){j(i.call(arguments,1),function(b){for(var d in b)a[d]==null&&(a[d]=b[d])});return a};b.clone=function(a){return!b.isObject(a)?a:b.isArray(a)?a.slice():b.extend({},a)};b.tap=function(a,b){b(a);return a};b.isEqual=function(a,b){return r(a,b,[])};b.isEmpty=
function(a){if(a==null)return true;if(b.isArray(a)||b.isString(a))return a.length===0;for(var c in a)if(b.has(a,c))return false;return true};b.isElement=function(a){return!!(a&&a.nodeType==1)};b.isArray=p||function(a){return l.call(a)=="[object Array]"};b.isObject=function(a){return a===Object(a)};b.isArguments=function(a){return l.call(a)=="[object Arguments]"};b.isArguments(arguments)||(b.isArguments=function(a){return!(!a||!b.has(a,"callee"))});b.isFunction=function(a){return l.call(a)=="[object Function]"};
b.isString=function(a){return l.call(a)=="[object String]"};b.isNumber=function(a){return l.call(a)=="[object Number]"};b.isFinite=function(a){return b.isNumber(a)&&isFinite(a)};b.isNaN=function(a){return a!==a};b.isBoolean=function(a){return a===true||a===false||l.call(a)=="[object Boolean]"};b.isDate=function(a){return l.call(a)=="[object Date]"};b.isRegExp=function(a){return l.call(a)=="[object RegExp]"};b.isNull=function(a){return a===null};b.isUndefined=function(a){return a===void 0};b.has=function(a,
b){return K.call(a,b)};b.noConflict=function(){s._=I;return this};b.identity=function(a){return a};b.times=function(a,b,d){for(var e=0;e<a;e++)b.call(d,e)};b.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")};b.result=function(a,c){if(a==null)return null;var d=a[c];return b.isFunction(d)?d.call(a):d};b.mixin=function(a){j(b.functions(a),function(c){M(c,b[c]=a[c])})};var N=0;b.uniqueId=
function(a){var b=N++;return a?a+b:b};b.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var u=/.^/,n={"\\":"\\","'":"'",r:"\r",n:"\n",t:"\t",u2028:"\u2028",u2029:"\u2029"},v;for(v in n)n[n[v]]=v;var O=/\\|'|\r|\n|\t|\u2028|\u2029/g,P=/\\(\\|'|r|n|t|u2028|u2029)/g,w=function(a){return a.replace(P,function(a,b){return n[b]})};b.template=function(a,c,d){d=b.defaults(d||{},b.templateSettings);a="__p+='"+a.replace(O,function(a){return"\\"+n[a]}).replace(d.escape||
u,function(a,b){return"'+\n_.escape("+w(b)+")+\n'"}).replace(d.interpolate||u,function(a,b){return"'+\n("+w(b)+")+\n'"}).replace(d.evaluate||u,function(a,b){return"';\n"+w(b)+"\n;__p+='"})+"';\n";d.variable||(a="with(obj||{}){\n"+a+"}\n");var a="var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n"+a+"return __p;\n",e=new Function(d.variable||"obj","_",a);if(c)return e(c,b);c=function(a){return e.call(this,a,b)};c.source="function("+(d.variable||"obj")+"){\n"+a+"}";return c};
b.chain=function(a){return b(a).chain()};var m=function(a){this._wrapped=a};b.prototype=m.prototype;var x=function(a,c){return c?b(a).chain():a},M=function(a,c){m.prototype[a]=function(){var a=i.call(arguments);J.call(a,this._wrapped);return x(c.apply(b,a),this._chain)}};b.mixin(b);j("pop,push,reverse,shift,sort,splice,unshift".split(","),function(a){var b=k[a];m.prototype[a]=function(){var d=this._wrapped;b.apply(d,arguments);var e=d.length;(a=="shift"||a=="splice")&&e===0&&delete d[0];return x(d,
this._chain)}});j(["concat","join","slice"],function(a){var b=k[a];m.prototype[a]=function(){return x(b.apply(this._wrapped,arguments),this._chain)}});m.prototype.chain=function(){this._chain=true;return this};m.prototype.value=function(){return this._wrapped}}).call(this);
;
// Backbone.js 0.9.2

// (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Backbone may be freely distributed under the MIT license.
// For all details and documentation:
// http://backbonejs.org
(function(){var l=this,y=l.Backbone,z=Array.prototype.slice,A=Array.prototype.splice,g;g="undefined"!==typeof exports?exports:l.Backbone={};g.VERSION="0.9.2";var f=l._;!f&&"undefined"!==typeof require&&(f=require("underscore"));var i=l.jQuery||l.Zepto||l.ender;g.setDomLibrary=function(a){i=a};g.noConflict=function(){l.Backbone=y;return this};g.emulateHTTP=!1;g.emulateJSON=!1;var p=/\s+/,k=g.Events={on:function(a,b,c){var d,e,f,g,j;if(!b)return this;a=a.split(p);for(d=this._callbacks||(this._callbacks=
{});e=a.shift();)f=(j=d[e])?j.tail:{},f.next=g={},f.context=c,f.callback=b,d[e]={tail:g,next:j?j.next:f};return this},off:function(a,b,c){var d,e,h,g,j,q;if(e=this._callbacks){if(!a&&!b&&!c)return delete this._callbacks,this;for(a=a?a.split(p):f.keys(e);d=a.shift();)if(h=e[d],delete e[d],h&&(b||c))for(g=h.tail;(h=h.next)!==g;)if(j=h.callback,q=h.context,b&&j!==b||c&&q!==c)this.on(d,j,q);return this}},trigger:function(a){var b,c,d,e,f,g;if(!(d=this._callbacks))return this;f=d.all;a=a.split(p);for(g=
z.call(arguments,1);b=a.shift();){if(c=d[b])for(e=c.tail;(c=c.next)!==e;)c.callback.apply(c.context||this,g);if(c=f){e=c.tail;for(b=[b].concat(g);(c=c.next)!==e;)c.callback.apply(c.context||this,b)}}return this}};k.bind=k.on;k.unbind=k.off;var o=g.Model=function(a,b){var c;a||(a={});b&&b.parse&&(a=this.parse(a));if(c=n(this,"defaults"))a=f.extend({},c,a);b&&b.collection&&(this.collection=b.collection);this.attributes={};this._escapedAttributes={};this.cid=f.uniqueId("c");this.changed={};this._silent=
{};this._pending={};this.set(a,{silent:!0});this.changed={};this._silent={};this._pending={};this._previousAttributes=f.clone(this.attributes);this.initialize.apply(this,arguments)};f.extend(o.prototype,k,{changed:null,_silent:null,_pending:null,idAttribute:"id",initialize:function(){},toJSON:function(){return f.clone(this.attributes)},get:function(a){return this.attributes[a]},escape:function(a){var b;if(b=this._escapedAttributes[a])return b;b=this.get(a);return this._escapedAttributes[a]=f.escape(null==
b?"":""+b)},has:function(a){return null!=this.get(a)},set:function(a,b,c){var d,e;f.isObject(a)||null==a?(d=a,c=b):(d={},d[a]=b);c||(c={});if(!d)return this;d instanceof o&&(d=d.attributes);if(c.unset)for(e in d)d[e]=void 0;if(!this._validate(d,c))return!1;this.idAttribute in d&&(this.id=d[this.idAttribute]);var b=c.changes={},h=this.attributes,g=this._escapedAttributes,j=this._previousAttributes||{};for(e in d){a=d[e];if(!f.isEqual(h[e],a)||c.unset&&f.has(h,e))delete g[e],(c.silent?this._silent:
b)[e]=!0;c.unset?delete h[e]:h[e]=a;!f.isEqual(j[e],a)||f.has(h,e)!=f.has(j,e)?(this.changed[e]=a,c.silent||(this._pending[e]=!0)):(delete this.changed[e],delete this._pending[e])}c.silent||this.change(c);return this},unset:function(a,b){(b||(b={})).unset=!0;return this.set(a,null,b)},clear:function(a){(a||(a={})).unset=!0;return this.set(f.clone(this.attributes),a)},fetch:function(a){var a=a?f.clone(a):{},b=this,c=a.success;a.success=function(d,e,f){if(!b.set(b.parse(d,f),a))return!1;c&&c(b,d)};
a.error=g.wrapError(a.error,b,a);return(this.sync||g.sync).call(this,"read",this,a)},save:function(a,b,c){var d,e;f.isObject(a)||null==a?(d=a,c=b):(d={},d[a]=b);c=c?f.clone(c):{};if(c.wait){if(!this._validate(d,c))return!1;e=f.clone(this.attributes)}a=f.extend({},c,{silent:!0});if(d&&!this.set(d,c.wait?a:c))return!1;var h=this,i=c.success;c.success=function(a,b,e){b=h.parse(a,e);if(c.wait){delete c.wait;b=f.extend(d||{},b)}if(!h.set(b,c))return false;i?i(h,a):h.trigger("sync",h,a,c)};c.error=g.wrapError(c.error,
h,c);b=this.isNew()?"create":"update";b=(this.sync||g.sync).call(this,b,this,c);c.wait&&this.set(e,a);return b},destroy:function(a){var a=a?f.clone(a):{},b=this,c=a.success,d=function(){b.trigger("destroy",b,b.collection,a)};if(this.isNew())return d(),!1;a.success=function(e){a.wait&&d();c?c(b,e):b.trigger("sync",b,e,a)};a.error=g.wrapError(a.error,b,a);var e=(this.sync||g.sync).call(this,"delete",this,a);a.wait||d();return e},url:function(){var a=n(this,"urlRoot")||n(this.collection,"url")||t();
return this.isNew()?a:a+("/"==a.charAt(a.length-1)?"":"/")+encodeURIComponent(this.id)},parse:function(a){return a},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return null==this.id},change:function(a){a||(a={});var b=this._changing;this._changing=!0;for(var c in this._silent)this._pending[c]=!0;var d=f.extend({},a.changes,this._silent);this._silent={};for(c in d)this.trigger("change:"+c,this,this.get(c),a);if(b)return this;for(;!f.isEmpty(this._pending);){this._pending=
{};this.trigger("change",this,a);for(c in this.changed)!this._pending[c]&&!this._silent[c]&&delete this.changed[c];this._previousAttributes=f.clone(this.attributes)}this._changing=!1;return this},hasChanged:function(a){return!arguments.length?!f.isEmpty(this.changed):f.has(this.changed,a)},changedAttributes:function(a){if(!a)return this.hasChanged()?f.clone(this.changed):!1;var b,c=!1,d=this._previousAttributes,e;for(e in a)if(!f.isEqual(d[e],b=a[e]))(c||(c={}))[e]=b;return c},previous:function(a){return!arguments.length||
!this._previousAttributes?null:this._previousAttributes[a]},previousAttributes:function(){return f.clone(this._previousAttributes)},isValid:function(){return!this.validate(this.attributes)},_validate:function(a,b){if(b.silent||!this.validate)return!0;var a=f.extend({},this.attributes,a),c=this.validate(a,b);if(!c)return!0;b&&b.error?b.error(this,c,b):this.trigger("error",this,c,b);return!1}});var r=g.Collection=function(a,b){b||(b={});b.model&&(this.model=b.model);b.comparator&&(this.comparator=b.comparator);
this._reset();this.initialize.apply(this,arguments);a&&this.reset(a,{silent:!0,parse:b.parse})};f.extend(r.prototype,k,{model:o,initialize:function(){},toJSON:function(a){return this.map(function(b){return b.toJSON(a)})},add:function(a,b){var c,d,e,g,i,j={},k={},l=[];b||(b={});a=f.isArray(a)?a.slice():[a];c=0;for(d=a.length;c<d;c++){if(!(e=a[c]=this._prepareModel(a[c],b)))throw Error("Can't add an invalid model to a collection");g=e.cid;i=e.id;j[g]||this._byCid[g]||null!=i&&(k[i]||this._byId[i])?
l.push(c):j[g]=k[i]=e}for(c=l.length;c--;)a.splice(l[c],1);c=0;for(d=a.length;c<d;c++)(e=a[c]).on("all",this._onModelEvent,this),this._byCid[e.cid]=e,null!=e.id&&(this._byId[e.id]=e);this.length+=d;A.apply(this.models,[null!=b.at?b.at:this.models.length,0].concat(a));this.comparator&&this.sort({silent:!0});if(b.silent)return this;c=0;for(d=this.models.length;c<d;c++)if(j[(e=this.models[c]).cid])b.index=c,e.trigger("add",e,this,b);return this},remove:function(a,b){var c,d,e,g;b||(b={});a=f.isArray(a)?
a.slice():[a];c=0;for(d=a.length;c<d;c++)if(g=this.getByCid(a[c])||this.get(a[c]))delete this._byId[g.id],delete this._byCid[g.cid],e=this.indexOf(g),this.models.splice(e,1),this.length--,b.silent||(b.index=e,g.trigger("remove",g,this,b)),this._removeReference(g);return this},push:function(a,b){a=this._prepareModel(a,b);this.add(a,b);return a},pop:function(a){var b=this.at(this.length-1);this.remove(b,a);return b},unshift:function(a,b){a=this._prepareModel(a,b);this.add(a,f.extend({at:0},b));return a},
shift:function(a){var b=this.at(0);this.remove(b,a);return b},get:function(a){return null==a?void 0:this._byId[null!=a.id?a.id:a]},getByCid:function(a){return a&&this._byCid[a.cid||a]},at:function(a){return this.models[a]},where:function(a){return f.isEmpty(a)?[]:this.filter(function(b){for(var c in a)if(a[c]!==b.get(c))return!1;return!0})},sort:function(a){a||(a={});if(!this.comparator)throw Error("Cannot sort a set without a comparator");var b=f.bind(this.comparator,this);1==this.comparator.length?
this.models=this.sortBy(b):this.models.sort(b);a.silent||this.trigger("reset",this,a);return this},pluck:function(a){return f.map(this.models,function(b){return b.get(a)})},reset:function(a,b){a||(a=[]);b||(b={});for(var c=0,d=this.models.length;c<d;c++)this._removeReference(this.models[c]);this._reset();this.add(a,f.extend({silent:!0},b));b.silent||this.trigger("reset",this,b);return this},fetch:function(a){a=a?f.clone(a):{};void 0===a.parse&&(a.parse=!0);var b=this,c=a.success;a.success=function(d,
e,f){b[a.add?"add":"reset"](b.parse(d,f),a);c&&c(b,d)};a.error=g.wrapError(a.error,b,a);return(this.sync||g.sync).call(this,"read",this,a)},create:function(a,b){var c=this,b=b?f.clone(b):{},a=this._prepareModel(a,b);if(!a)return!1;b.wait||c.add(a,b);var d=b.success;b.success=function(e,f){b.wait&&c.add(e,b);d?d(e,f):e.trigger("sync",a,f,b)};a.save(null,b);return a},parse:function(a){return a},chain:function(){return f(this.models).chain()},_reset:function(){this.length=0;this.models=[];this._byId=
{};this._byCid={}},_prepareModel:function(a,b){b||(b={});a instanceof o?a.collection||(a.collection=this):(b.collection=this,a=new this.model(a,b),a._validate(a.attributes,b)||(a=!1));return a},_removeReference:function(a){this==a.collection&&delete a.collection;a.off("all",this._onModelEvent,this)},_onModelEvent:function(a,b,c,d){("add"==a||"remove"==a)&&c!=this||("destroy"==a&&this.remove(b,d),b&&a==="change:"+b.idAttribute&&(delete this._byId[b.previous(b.idAttribute)],this._byId[b.id]=b),this.trigger.apply(this,
arguments))}});f.each("forEach,each,map,reduce,reduceRight,find,detect,filter,select,reject,every,all,some,any,include,contains,invoke,max,min,sortBy,sortedIndex,toArray,size,first,initial,rest,last,without,indexOf,shuffle,lastIndexOf,isEmpty,groupBy".split(","),function(a){r.prototype[a]=function(){return f[a].apply(f,[this.models].concat(f.toArray(arguments)))}});var u=g.Router=function(a){a||(a={});a.routes&&(this.routes=a.routes);this._bindRoutes();this.initialize.apply(this,arguments)},B=/:\w+/g,
C=/\*\w+/g,D=/[-[\]{}()+?.,\\^$|#\s]/g;f.extend(u.prototype,k,{initialize:function(){},route:function(a,b,c){g.history||(g.history=new m);f.isRegExp(a)||(a=this._routeToRegExp(a));c||(c=this[b]);g.history.route(a,f.bind(function(d){d=this._extractParameters(a,d);c&&c.apply(this,d);this.trigger.apply(this,["route:"+b].concat(d));g.history.trigger("route",this,b,d)},this));return this},navigate:function(a,b){g.history.navigate(a,b)},_bindRoutes:function(){if(this.routes){var a=[],b;for(b in this.routes)a.unshift([b,
this.routes[b]]);b=0;for(var c=a.length;b<c;b++)this.route(a[b][0],a[b][1],this[a[b][1]])}},_routeToRegExp:function(a){a=a.replace(D,"\\$&").replace(B,"([^/]+)").replace(C,"(.*?)");return RegExp("^"+a+"$")},_extractParameters:function(a,b){return a.exec(b).slice(1)}});var m=g.History=function(){this.handlers=[];f.bindAll(this,"checkUrl")},s=/^[#\/]/,E=/msie [\w.]+/;m.started=!1;f.extend(m.prototype,k,{interval:50,getHash:function(a){return(a=(a?a.location:window.location).href.match(/#(.*)$/))?a[1]:
""},getFragment:function(a,b){if(null==a)if(this._hasPushState||b){var a=window.location.pathname,c=window.location.search;c&&(a+=c)}else a=this.getHash();a.indexOf(this.options.root)||(a=a.substr(this.options.root.length));return a.replace(s,"")},start:function(a){if(m.started)throw Error("Backbone.history has already been started");m.started=!0;this.options=f.extend({},{root:"/"},this.options,a);this._wantsHashChange=!1!==this.options.hashChange;this._wantsPushState=!!this.options.pushState;this._hasPushState=
!(!this.options.pushState||!window.history||!window.history.pushState);var a=this.getFragment(),b=document.documentMode;if(b=E.exec(navigator.userAgent.toLowerCase())&&(!b||7>=b))this.iframe=i('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(a);this._hasPushState?i(window).bind("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!b?i(window).bind("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,
this.interval));this.fragment=a;a=window.location;b=a.pathname==this.options.root;if(this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!b)return this.fragment=this.getFragment(null,!0),window.location.replace(this.options.root+"#"+this.fragment),!0;this._wantsPushState&&this._hasPushState&&b&&a.hash&&(this.fragment=this.getHash().replace(s,""),window.history.replaceState({},document.title,a.protocol+"//"+a.host+this.options.root+this.fragment));if(!this.options.silent)return this.loadUrl()},
stop:function(){i(window).unbind("popstate",this.checkUrl).unbind("hashchange",this.checkUrl);clearInterval(this._checkUrlInterval);m.started=!1},route:function(a,b){this.handlers.unshift({route:a,callback:b})},checkUrl:function(){var a=this.getFragment();a==this.fragment&&this.iframe&&(a=this.getFragment(this.getHash(this.iframe)));if(a==this.fragment)return!1;this.iframe&&this.navigate(a);this.loadUrl()||this.loadUrl(this.getHash())},loadUrl:function(a){var b=this.fragment=this.getFragment(a);return f.any(this.handlers,
function(a){if(a.route.test(b))return a.callback(b),!0})},navigate:function(a,b){if(!m.started)return!1;if(!b||!0===b)b={trigger:b};var c=(a||"").replace(s,"");this.fragment!=c&&(this._hasPushState?(0!=c.indexOf(this.options.root)&&(c=this.options.root+c),this.fragment=c,window.history[b.replace?"replaceState":"pushState"]({},document.title,c)):this._wantsHashChange?(this.fragment=c,this._updateHash(window.location,c,b.replace),this.iframe&&c!=this.getFragment(this.getHash(this.iframe))&&(b.replace||
this.iframe.document.open().close(),this._updateHash(this.iframe.location,c,b.replace))):window.location.assign(this.options.root+a),b.trigger&&this.loadUrl(a))},_updateHash:function(a,b,c){c?a.replace(a.toString().replace(/(javascript:|#).*$/,"")+"#"+b):a.hash=b}});var v=g.View=function(a){this.cid=f.uniqueId("view");this._configure(a||{});this._ensureElement();this.initialize.apply(this,arguments);this.delegateEvents()},F=/^(\S+)\s*(.*)$/,w="model,collection,el,id,attributes,className,tagName".split(",");
f.extend(v.prototype,k,{tagName:"div",$:function(a){return this.$el.find(a)},initialize:function(){},render:function(){return this},remove:function(){this.$el.remove();return this},make:function(a,b,c){a=document.createElement(a);b&&i(a).attr(b);c&&i(a).html(c);return a},setElement:function(a,b){this.$el&&this.undelegateEvents();this.$el=a instanceof i?a:i(a);this.el=this.$el[0];!1!==b&&this.delegateEvents();return this},delegateEvents:function(a){if(a||(a=n(this,"events"))){this.undelegateEvents();
for(var b in a){var c=a[b];f.isFunction(c)||(c=this[a[b]]);if(!c)throw Error('Method "'+a[b]+'" does not exist');var d=b.match(F),e=d[1],d=d[2],c=f.bind(c,this),e=e+(".delegateEvents"+this.cid);""===d?this.$el.bind(e,c):this.$el.delegate(d,e,c)}}},undelegateEvents:function(){this.$el.unbind(".delegateEvents"+this.cid)},_configure:function(a){this.options&&(a=f.extend({},this.options,a));for(var b=0,c=w.length;b<c;b++){var d=w[b];a[d]&&(this[d]=a[d])}this.options=a},_ensureElement:function(){if(this.el)this.setElement(this.el,
!1);else{var a=n(this,"attributes")||{};this.id&&(a.id=this.id);this.className&&(a["class"]=this.className);this.setElement(this.make(this.tagName,a),!1)}}});o.extend=r.extend=u.extend=v.extend=function(a,b){var c=G(this,a,b);c.extend=this.extend;return c};var H={create:"POST",update:"PUT","delete":"DELETE",read:"GET"};g.sync=function(a,b,c){var d=H[a];c||(c={});var e={type:d,dataType:"json"};c.url||(e.url=n(b,"url")||t());if(!c.data&&b&&("create"==a||"update"==a))e.contentType="application/json",
e.data=JSON.stringify(b.toJSON());g.emulateJSON&&(e.contentType="application/x-www-form-urlencoded",e.data=e.data?{model:e.data}:{});if(g.emulateHTTP&&("PUT"===d||"DELETE"===d))g.emulateJSON&&(e.data._method=d),e.type="POST",e.beforeSend=function(a){a.setRequestHeader("X-HTTP-Method-Override",d)};"GET"!==e.type&&!g.emulateJSON&&(e.processData=!1);return i.ajax(f.extend(e,c))};g.wrapError=function(a,b,c){return function(d,e){e=d===b?e:d;a?a(b,e,c):b.trigger("error",b,e,c)}};var x=function(){},G=function(a,
b,c){var d;d=b&&b.hasOwnProperty("constructor")?b.constructor:function(){a.apply(this,arguments)};f.extend(d,a);x.prototype=a.prototype;d.prototype=new x;b&&f.extend(d.prototype,b);c&&f.extend(d,c);d.prototype.constructor=d;d.__super__=a.prototype;return d},n=function(a,b){return!a||!a[b]?null:f.isFunction(a[b])?a[b]():a[b]},t=function(){throw Error('A "url" property or function must be specified');}}).call(this);
;
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */
var Mustache = (typeof module !== "undefined" && module.exports) || {};

(function (exports) {

  exports.name = "mustache.js";
  exports.version = "0.5.0-dev";
  exports.tags = ["{{", "}}"];
  exports.parse = parse;
  exports.compile = compile;
  exports.render = render;
  exports.clearCache = clearCache;

  // This is here for backwards compatibility with 0.4.x.
  exports.to_html = function (template, view, partials, send) {
    var result = render(template, view, partials);

    if (typeof send === "function") {
      send(result);
    } else {
      return result;
    }
  };

  var _toString = Object.prototype.toString;
  var _isArray = Array.isArray;
  var _forEach = Array.prototype.forEach;
  var _trim = String.prototype.trim;

  var isArray;
  if (_isArray) {
    isArray = _isArray;
  } else {
    isArray = function (obj) {
      return _toString.call(obj) === "[object Array]";
    };
  }

  var forEach;
  if (_forEach) {
    forEach = function (obj, callback, scope) {
      return _forEach.call(obj, callback, scope);
    };
  } else {
    forEach = function (obj, callback, scope) {
      for (var i = 0, len = obj.length; i < len; ++i) {
        callback.call(scope, obj[i], i, obj);
      }
    };
  }

  var spaceRe = /^\s*$/;

  function isWhitespace(string) {
    return spaceRe.test(string);
  }

  var trim;
  if (_trim) {
    trim = function (string) {
      return string == null ? "" : _trim.call(string);
    };
  } else {
    var trimLeft, trimRight;

    if (isWhitespace("\xA0")) {
      trimLeft = /^\s+/;
      trimRight = /\s+$/;
    } else {
      // IE doesn't match non-breaking spaces with \s, thanks jQuery.
      trimLeft = /^[\s\xA0]+/;
      trimRight = /[\s\xA0]+$/;
    }

    trim = function (string) {
      return string == null ? "" :
        String(string).replace(trimLeft, "").replace(trimRight, "");
    };
  }

  var escapeMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;'
  };

  function escapeHTML(string) {
    return String(string).replace(/&(?!\w+;)|[<>"']/g, function (s) {
      return escapeMap[s] || s;
    });
  }

  /**
   * Adds the `template`, `line`, and `file` properties to the given error
   * object and alters the message to provide more useful debugging information.
   */
  function debug(e, template, line, file) {
    file = file || "<template>";

    var lines = template.split("\n"),
        start = Math.max(line - 3, 0),
        end = Math.min(lines.length, line + 3),
        context = lines.slice(start, end);

    var c;
    for (var i = 0, len = context.length; i < len; ++i) {
      c = i + start + 1;
      context[i] = (c === line ? " >> " : "    ") + context[i];
    }

    e.template = template;
    e.line = line;
    e.file = file;
    e.message = [file + ":" + line, context.join("\n"), "", e.message].join("\n");

    return e;
  }

  /**
   * Looks up the value of the given `name` in the given context `stack`.
   */
  function lookup(name, stack, defaultValue) {
    if (name === ".") {
      return stack[stack.length - 1];
    }

    var names = name.split(".");
    var lastIndex = names.length - 1;
    var target = names[lastIndex];

    var value, context, i = stack.length, j, localStack;
    while (i) {
      localStack = stack.slice(0);
      context = stack[--i];

      j = 0;
      while (j < lastIndex) {
        context = context[names[j++]];

        if (context == null) {
          break;
        }

        localStack.push(context);
      }

      if (context && typeof context === "object" && target in context) {
        value = context[target];
        break;
      }
    }

    // If the value is a function, call it in the current context.
    if (typeof value === "function") {
      value = value.call(localStack[localStack.length - 1]);
    }

    if (value == null)  {
      return defaultValue;
    }

    return value;
  }

  function renderSection(name, stack, callback, inverted) {
    var buffer = "";
    var value =  lookup(name, stack);

    if (inverted) {
      // From the spec: inverted sections may render text once based on the
      // inverse value of the key. That is, they will be rendered if the key
      // doesn't exist, is false, or is an empty list.
      if (value == null || value === false || (isArray(value) && value.length === 0)) {
        buffer += callback();
      }
    } else if (isArray(value)) {
      forEach(value, function (value) {
        stack.push(value);
        buffer += callback();
        stack.pop();
      });
    } else if (typeof value === "object") {
      stack.push(value);
      buffer += callback();
      stack.pop();
    } else if (typeof value === "function") {
      var scope = stack[stack.length - 1];
      var scopedRender = function (template) {
        return render(template, scope);
      };
      buffer += value.call(scope, callback(), scopedRender) || "";
    } else if (value) {
      buffer += callback();
    }

    return buffer;
  }

  /**
   * Parses the given `template` and returns the source of a function that,
   * with the proper arguments, will render the template. Recognized options
   * include the following:
   *
   *   - file     The name of the file the template comes from (displayed in
   *              error messages)
   *   - tags     An array of open and close tags the `template` uses. Defaults
   *              to the value of Mustache.tags
   *   - debug    Set `true` to log the body of the generated function to the
   *              console
   *   - space    Set `true` to preserve whitespace from lines that otherwise
   *              contain only a {{tag}}. Defaults to `false`
   */
  function parse(template, options) {
    options = options || {};

    var tags = options.tags || exports.tags,
        openTag = tags[0],
        closeTag = tags[tags.length - 1];

    var code = [
      'var buffer = "";', // output buffer
      "\nvar line = 1;", // keep track of source line number
      "\ntry {",
      '\nbuffer += "'
    ];

    var spaces = [],      // indices of whitespace in code on the current line
        hasTag = false,   // is there a {{tag}} on the current line?
        nonSpace = false; // is there a non-space char on the current line?

    // Strips all space characters from the code array for the current line
    // if there was a {{tag}} on it and otherwise only spaces.
    var stripSpace = function () {
      if (hasTag && !nonSpace && !options.space) {
        while (spaces.length) {
          code.splice(spaces.pop(), 1);
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    };

    var sectionStack = [], updateLine, nextOpenTag, nextCloseTag;

    var setTags = function (source) {
      tags = trim(source).split(/\s+/);
      nextOpenTag = tags[0];
      nextCloseTag = tags[tags.length - 1];
    };

    var includePartial = function (source) {
      code.push(
        '";',
        updateLine,
        '\nvar partial = partials["' + trim(source) + '"];',
        '\nif (partial) {',
        '\n  buffer += render(partial,stack[stack.length - 1],partials);',
        '\n}',
        '\nbuffer += "'
      );
    };

    var openSection = function (source, inverted) {
      var name = trim(source);

      if (name === "") {
        throw debug(new Error("Section name may not be empty"), template, line, options.file);
      }

      sectionStack.push({name: name, inverted: inverted});

      code.push(
        '";',
        updateLine,
        '\nvar name = "' + name + '";',
        '\nvar callback = (function () {',
        '\n  return function () {',
        '\n    var buffer = "";',
        '\nbuffer += "'
      );
    };

    var openInvertedSection = function (source) {
      openSection(source, true);
    };

    var closeSection = function (source) {
      var name = trim(source);
      var openName = sectionStack.length != 0 && sectionStack[sectionStack.length - 1].name;

      if (!openName || name != openName) {
        throw debug(new Error('Section named "' + name + '" was never opened'), template, line, options.file);
      }

      var section = sectionStack.pop();

      code.push(
        '";',
        '\n    return buffer;',
        '\n  };',
        '\n})();'
      );

      if (section.inverted) {
        code.push("\nbuffer += renderSection(name,stack,callback,true);");
      } else {
        code.push("\nbuffer += renderSection(name,stack,callback);");
      }

      code.push('\nbuffer += "');
    };

    var sendPlain = function (source) {
      code.push(
        '";',
        updateLine,
        '\nbuffer += lookup("' + trim(source) + '",stack,"");',
        '\nbuffer += "'
      );
    };

    var sendEscaped = function (source) {
      code.push(
        '";',
        updateLine,
        '\nbuffer += escapeHTML(lookup("' + trim(source) + '",stack,""));',
        '\nbuffer += "'
      );
    };

    var line = 1, c, callback;
    for (var i = 0, len = template.length; i < len; ++i) {
      if (template.slice(i, i + openTag.length) === openTag) {
        i += openTag.length;
        c = template.substr(i, 1);
        updateLine = '\nline = ' + line + ';';
        nextOpenTag = openTag;
        nextCloseTag = closeTag;
        hasTag = true;

        switch (c) {
        case "!": // comment
          i++;
          callback = null;
          break;
        case "=": // change open/close tags, e.g. {{=<% %>=}}
          i++;
          closeTag = "=" + closeTag;
          callback = setTags;
          break;
        case ">": // include partial
          i++;
          callback = includePartial;
          break;
        case "#": // start section
          i++;
          callback = openSection;
          break;
        case "^": // start inverted section
          i++;
          callback = openInvertedSection;
          break;
        case "/": // end section
          i++;
          callback = closeSection;
          break;
        case "{": // plain variable
          closeTag = "}" + closeTag;
          // fall through
        case "&": // plain variable
          i++;
          nonSpace = true;
          callback = sendPlain;
          break;
        default: // escaped variable
          nonSpace = true;
          callback = sendEscaped;
        }

        var end = template.indexOf(closeTag, i);

        if (end === -1) {
          throw debug(new Error('Tag "' + openTag + '" was not closed properly'), template, line, options.file);
        }

        var source = template.substring(i, end);

        if (callback) {
          callback(source);
        }

        // Maintain line count for \n in source.
        var n = 0;
        while (~(n = source.indexOf("\n", n))) {
          line++;
          n++;
        }

        i = end + closeTag.length - 1;
        openTag = nextOpenTag;
        closeTag = nextCloseTag;
      } else {
        c = template.substr(i, 1);

        switch (c) {
        case '"':
        case "\\":
          nonSpace = true;
          code.push("\\" + c);
          break;
        case "\r":
          // Ignore carriage returns.
          break;
        case "\n":
          spaces.push(code.length);
          code.push("\\n");
          stripSpace(); // Check for whitespace on the current line.
          line++;
          break;
        default:
          if (isWhitespace(c)) {
            spaces.push(code.length);
          } else {
            nonSpace = true;
          }

          code.push(c);
        }
      }
    }

    if (sectionStack.length != 0) {
      throw debug(new Error('Section "' + sectionStack[sectionStack.length - 1].name + '" was not closed properly'), template, line, options.file);
    }

    // Clean up any whitespace from a closing {{tag}} that was at the end
    // of the template without a trailing \n.
    stripSpace();

    code.push(
      '";',
      "\nreturn buffer;",
      "\n} catch (e) { throw {error: e, line: line}; }"
    );

    // Ignore `buffer += "";` statements.
    var body = code.join("").replace(/buffer \+= "";\n/g, "");

    if (options.debug) {
      if (typeof console != "undefined" && console.log) {
        console.log(body);
      } else if (typeof print === "function") {
        print(body);
      }
    }

    return body;
  }

  /**
   * Used by `compile` to generate a reusable function for the given `template`.
   */
  function _compile(template, options) {
    var args = "view,partials,stack,lookup,escapeHTML,renderSection,render";
    var body = parse(template, options);
    var fn = new Function(args, body);

    // This anonymous function wraps the generated function so we can do
    // argument coercion, setup some variables, and handle any errors
    // encountered while executing it.
    return function (view, partials) {
      partials = partials || {};

      var stack = [view]; // context stack

      try {
        return fn(view, partials, stack, lookup, escapeHTML, renderSection, render);
      } catch (e) {
        throw debug(e.error, template, e.line, options.file);
      }
    };
  }

  // Cache of pre-compiled templates.
  var _cache = {};

  /**
   * Clear the cache of compiled templates.
   */
  function clearCache() {
    _cache = {};
  }

  /**
   * Compiles the given `template` into a reusable function using the given
   * `options`. In addition to the options accepted by Mustache.parse,
   * recognized options include the following:
   *
   *   - cache    Set `false` to bypass any pre-compiled version of the given
   *              template. Otherwise, a given `template` string will be cached
   *              the first time it is parsed
   */
  function compile(template, options) {
    options = options || {};

    // Use a pre-compiled version from the cache if we have one.
    if (options.cache !== false) {
      if (!_cache[template]) {
        _cache[template] = _compile(template, options);
      }

      return _cache[template];
    }

    return _compile(template, options);
  }

  /**
   * High-level function that renders the given `template` using the given
   * `view` and `partials`. If you need to use any of the template options (see
   * `compile` above), you must compile in a separate step, and then call that
   * compiled function.
   */
  function render(template, view, partials) {
    return compile(template)(view, partials);
  }

})(Mustache);
;
/* Common front-end code for the Notifications system
 *	- wpNotesCommon wraps all the proxied REST calls
 * 	- wpNoteModel & wpNoteList are Backbone.js Model, & Collection implementations
 */


var wpNotesCommon;
var wpNotesCommentModView;
var wpNoteList;
var wpNoteModel;

(function($){
	var cookies = document.cookie.split( /;\s*/ ), cookie = false;
	for ( i = 0; i < cookies.length; i++ ) {
		if ( cookies[i].match( /^wp_api=/ ) ) {
			cookies = cookies[i].split( '=' );
			cookie = cookies[1];
			break;
		}
	}

	wpNotesCommon = {
		noteTypes: {
			comment: 'comment',
			follow: 'follow',
			like: 'like',
			reblog: 'reblog',
			trophy: [
				'best_liked_day_feat',
				'like_milestone_achievement',
				'achieve_automattician_note',
				'best_followed_day_feat',
				'followed_milestone_achievement'
			],
			'alert': [
				'expired_domain_alert'
			]
		},

		noteType2Noticon: {
			'like': 'like',
			'follow': 'follow',
			'comment_like': 'like',
			'comment': 'comment',
			'reblog': 'reblog',
			'like_milestone_achievement': 'trophy',
			'achieve_followed_milestone_note': 'trophy',
			'best_liked_day_feat': 'milestone',
			'best_followed_day_feat': 'milestone',
			'automattician_achievement': 'trophy',
			'expired_domain_alert': 'alert'
		},
	
		createNoteContainer: function( note, id_prefix ) {
			var note_container = $('<div/>', {
				id : id_prefix + '-note-' + note.id,
				'class' : 'wpn-note wpn-' + note.type + ' ' + ( ( note.unread > 0 ) ? 'wpn-unread' : 'wpn-read' )
			}).data( {
				id: parseInt( note.id ),
				type: note.type
			});
			var note_body = $('<div/>', { "class":"wpn-note-body wpn-note-body-empty" } );
			var spinner = $( '<div/>', { style : 'position: absolute; left: 180px; top: 60px;' } );
			note_body.append( spinner );
			spinner.spin( 'medium' );
			note_container.append(
				this.createNoteSubject( note ),
				note_body
			);
	
			return note_container;
		},
	
		createNoteSubject: function( note ) {
			var subj = $('<div/>', { "class":"wpn-note-summary" } ).append(
				$('<span/>', {
					"class" : 'wpn-noticon',
						html : $('<img/>', {
							src : note.subject['noticon'],
							width : '14px',
							height : '14px',
							style : 'display: inline-block; width: 14px; height: 14px; overflow-x: hidden; overflow-y: hidden;'
						})
				}),
				$('<span/>', {
					"class" : 'wpn-icon no-grav',
						html : $('<img/>', {
							src : note.subject['icon'],
							width : '24px',
							height : '24px',
							style : 'display: inline-block; width: 24px; height: 24px; overflow-x: hidden; overflow-y: hidden;'
						})
				}),
				$('<span/>', {
				 	"class" : 'wpn-subject',
				 	html : note.subject['html']
				 })
			);
			return subj;
		},
	
	
		createNoteBody: function( note_model ) {
			var note_body = $('<div/>', { "class":"wpn-note-body" } );
			var note = note_model.toJSON();
			var class_prefix = 'wpn-' + note.body['template'];
			switch( note.body['template'] ) {
				case 'single-line-list' :
				case 'multi-line-list' :
					note_body.append( 
						$( '<p/>' ).addClass( class_prefix + '-header' ).html( note.body['header'] )
					);
	
					for ( i in note.body['items'] ) {
						var item = $('<div></div>', { 
							'class' : class_prefix + '-item ' + class_prefix + '-item-' + i + 
								( note.body['items'][i]['icon'] ? '' : ' ' + class_prefix + '-item-no-icon' )
						});
						if ( note.body['items'][i]['icon'] ) {
							item.append(
								$('<img/>', { 
									"class" : class_prefix + '-item-icon avatar avatar-' + note.body['items'][i]['icon_width'],
									height: note.body['items'][i]['icon_height'],
									width: note.body['items'][i]['icon_width'],
									src: note.body['items'][i]['icon']
							} ) );
						}
						if ( note.body['items'][i]['header'] ) {
							item.append(
								$('<div></div>', { 'class' : class_prefix + '-item-header' }
							 ).html( note.body['items'][i]['header'] ) );
						}
						if ( note.body['items'][i]['action'] ) {
							switch ( note.body['items'][i]['action']['type'] ) {
								case 'follow' :
									var button = wpFollowButton.create( note.body['items'][i]['action'] );
									item.append( button );
									// Attach action stat tracking for follows
									button.click( function(e) {
										if ( $( this ).children('a').hasClass( 'wpcom-follow-rest' ) )
											wpNotesCommon.bumpStat( 'notes-click-action', 'unfollow' );
										else
											wpNotesCommon.bumpStat( 'notes-click-action', 'follow' );
										return true;
									} );
									break;
								default :
									console.error( "Unsupported " + note.type + " action: " + note.body['items'][i]['action']['type'] );
									break;
							}
						}
						if ( note.body['items'][i]['html'] ) {
							item.append(
								$('<div></div>', { 'class' : class_prefix + '-item-body' }
							).html( note.body['items'][i]['html'] ) );
						}
						note_body.append( item );
					}
	
					if ( note.body['actions'] ) {
						var note_actions = new wpNotesCommentModView( { model: note_model } );
						var action_el = note_actions.create().el
						note_body.append( action_el );
					}
	
					if ( note.body['footer'] ) {
						note_body.append( 
							$( '<p/>' ).addClass( class_prefix + '-footer' ).html( note.body['footer'] )
						);
					}
					break;
				case 'big-badge' :
					if ( note.body['header'] ) {
						note_body.append( 
							$( '<div/>' ).addClass( class_prefix + '-header' ).html( note.body['header'] )
						);
					}
	
					if ( note.body['badge'] ) {
						note_body.append( $('<div></div>', { 
							'class' : class_prefix + '-badge ' 
						}).append( note.body['badge'] ) );
					}
	
					if ( note.body['html'] != '' ) {
						note_body.append( 
							$( '<div/>' ).addClass( class_prefix + '-footer' ).html( note.body['html'] )
						);
					}
	
					break;
				default :
					note_body.text( 'Unsupported note body template!' );
					break;
			}

			note_body.find( 'a[notes-data-click]' ).mousedown( function(e) {
				var type = $(this).attr( 'notes-data-click' );
				wpNotesCommon.bumpStat( 'notes-click-body', type );
				return true;
			} );
	
			return note_body;		
		},
	
		getNoteSubjects: function( query_params, success, fail ) {
			query_params.fields = 'id,type,unread,timestamp,subject';
			this.getNotes( query_params, success, fail );
		},

		//loads subject also so that body and subject are consistent
		getNoteBodies: function( ids, query_params, success, fail ) {
			var query_args = {};
			for ( i in ids ) {
				query_params['ids[' + i + ']'] = ids[i];
			}
	
			query_params.fields = 'id,subject,body';
			this.getNotes( query_params, success, fail );
		},
	
		getNotes: function( query_params, success, fail ) {
			this.ajax({
				type: 'GET',
				path : '/notifications/',
				data : query_params,
				success : success,
				error : fail
			});
		},
		
		markNotesSeen: function( timestamp ) {
			var query_args = { time: timestamp };

			this.ajax({
				type : 'POST',
				path : '/notifications/seen',
				data : query_args,
				success : function( res ) { },
				error : function( res ) { }
			});
		
			//var note_imps = query_args.length
			//this.bumpStat( 'notes-imps-type', note_imps );
		},
	
		markNotesRead: function( unread_cnts ) {
			var query_args = {};
			var t = this;

			for ( var id in unread_cnts ) {
				if ( unread_cnts[ id ] > 0 ) {
					query_args['counts[' + id + ']'] = unread_cnts[ id ];
				}
			}

			if ( 0 == query_args.length ) {
				return; //no unread notes
			}
			
			this.ajax({
				type : 'POST',
				path : '/notifications/read',
				data : query_args,
				success : function( res ) { },
				error : function( res ) { }
			});
		
			//var note_imps = query_args.length
			//this.bumpStat( 'notes-imps-type', note_imps );
		},

		ajax: function( options ) {
			if ( document.location.host == 'public-api.wordpress.com' ) {
				//console.log( 'regular ajax call ' + options.type + ' ' + options.path);
				var request = {
					type : options.type,
					headers : {'Authorization': 'X-WPCOOKIE ' + cookie + ':1:' + document.location.host },
					url : 'https://public-api.wordpress.com/rest/v1' + options.path,
					success : options.success,
					error : options.error,
					data : options.data
				};
				$.ajax(request);
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
	
		bumpStat: function( group, names ) {
			new Image().src = document.location.protocol + '//stats.wordpress.com/g.gif?v=wpcom-no-pv&x_' +
				group + '=' + names + '&baba=' + Math.random();
		},

		getKeycode: function( key_event ) {
			//determine if we can use this key event to trigger the menu
			key_event = key_event || window.event;
			if ( key_event.target )
				element = key_event.target;
			else if ( key_event.srcElement )
				element = key_event.srcElement;
			if( element.nodeType == 3 ) //text node, check the parent
				element = element.parentNode;
			
			if( key_event.ctrlKey == true || key_event.altKey == true || key_event.metaKey == true )
				return false;
		
			var keyCode = ( key_event.keyCode ) ? key_event.keyCode : key_event.which;

			if ( keyCode && ( element.tagName == 'INPUT' || element.tagName == 'TEXTAREA' ) )
				return false;

			return keyCode;
		}
	};

wpNoteModel = Backbone.Model.extend({
	defaults: {
		summary: "",
		unread: true
	},


	initialize: function() {			
		if ( typeof( this.get( "subject" ) ) !== "object"  ) {
			// @todo delete note from collection
			console.error("old style note. id# " + this.id );
		}
	},
		
	markRead: function() {
		var unread_cnt = this.get( 'unread' );
		if ( Boolean( parseInt( unread_cnt ) ) ) {
			var notes = {};
			notes[ this.id ] = unread_cnt;
			wpNotesCommon.markNotesRead( notes );
			wpNotesCommon.bumpStat( 'notes-read-type', this.get( 'type' ) );
		}
	},
	
	loadBody: function() {
		wpNotesCommon.createNoteBody( this );
	},

	reload: function() {
		var t = this;
		var fields = 'id,type,unread,subject,body,date,timestamp';
		var ids = this.get('id');

		wpNotesCommon.getNotes( {
			fields: fields,
			ids: ids
		}, function ( res ) {
			var notes = res.notes;
			if ( typeof notes[0] !== 'undefined' ) {
				t.set( notes[ 0 ] );
			}
		}, function() { 
			//ignore failure
		} );
	},

	resize: function() {
		this.trigger( 'resize' );
	}
});

wpNoteList = Backbone.Collection.extend({
	model:   wpNoteModel,
	lastMarkedSeenTimestamp : false,
	mostRecentTimestamp : false,
	newNotes: false,
	maxNotes : false,
	loading: false,
	bodiesLoaded: false,

	//always sort by timpstamp
	comparator: function( note ) {
 		return -note.get( 'timestamp' );
	},

	initialize: function() {
		if ( !this.lastMarkedSeenTimestamp && "undefined" != typeof( wpn_last_marked_seen_preloaded ) ){
			this.lastMarkedSeenTimestamp = parseInt( wpn_last_marked_seen_preloaded );
		}
		
	},

	addNotes: function( notes ) {
		var models = _.map( notes, function(o) { return new wpNoteModel(o); });
		this.add( models );
		this.sort(); //ensure we maintain sorted order
		if ( this.maxNotes ) {
			while( this.length > this.maxNotes ) {
				this.pop();
			}
		}
		if ( this.length > 0 )
			this.mostRecentTimestamp = parseInt( this.at(0).get('timestamp') );
		this.trigger( 'loadNotes:change' );
	},

	// load notes from the server
	loadNotes: function( query_args ) {
		var t = this;

		t.loading = true;
		t.trigger( 'loadNotes:beginLoading' );
		
		var fields = query_args.fields;
		var number = parseInt( query_args.number );
		var before = parseInt( query_args.before );
		var since = parseInt( query_args.since );
		var type = 'undefined' == typeof query_args.type ? null : query_args.type;
		var unread = 'undefined' == typeof query_args.unread ? null : query_args.unread;

		query_args = {};
		
		if ( ! fields ) {
			fields = 'id,type,unread,subject,body,date,timestamp';
		}
		
		if ( isNaN( number ) ) {
			number = 9;
		}
		
		if ( ! isNaN( before ) ) {
			query_args[ "before" ] = before;
		}
		if ( ! isNaN( since ) ) {
			query_args[ "since" ] = since;
		}

		if ( unread !== null ) {
			query_args[ "unread" ] = unread;
		}

		if ( type !== null && type != "unread" && type != "latest" ) {
			query_args[ "type" ] = type;
		}
		
		query_args[ "number" ] = number;
		query_args[ "fields" ] = fields;

		wpNotesCommon.getNotes( query_args, function ( res ) {
			var notes = res.notes;
			var notes_changed = false;
			if ( !t.lastMarkedSeenTimestamp || ( res.last_seen_time > t.lastMarkedSeenTimestamp ) ) { 
				notes_changed = true; 
				t.lastMarkedSeenTimestamp = parseInt( res.last_seen_time );
			} 

			for( var idx in notes ) {
				var note_model = t.get( notes[idx].id );
				if ( note_model ) {
					if ( type ) {
						var qt = note_model.get( 'queried_types' ) || {};
						qt[ type ] = true;
						notes[idx].queried_types = qt;
					}
					note_model.set( notes[ idx ] );
				}
				else {
					if ( type ) {
						var qt = {};
						qt[ type ] = true;
						notes[idx].queried_types = qt;
					}
					note_model = new wpNoteModel( notes[ idx ] )
					t.add( note_model );
				}
				if ( ! note_model.has('body') )
					t.bodiesLoaded = false;
				notes_changed = true;
			}

			if ( t.maxNotes ) {
				while( t.length > t.maxNotes ) {
					t.pop();
				}
			}

			if ( notes_changed ) {
				t.sort(); //ensure we maintain sorted order
				if ( t.length > 0 )
					t.mostRecentTimestamp = parseInt( t.at(0).get('timestamp') );
				t.trigger( 'loadNotes:change' );
			}
			t.loading = false;
			t.trigger( 'loadNotes:endLoading' );
		}, function(res) {
			t.loading = false;
			//ignore failure
		} );
	},

	loadNoteBodies: function(callback) {
		if ( this.bodiesLoaded )
			return;
		var t = this;

		//TODO: only load the notes that need to be reloaded
		wpNotesCommon.getNoteBodies( this.getNoteIds(), {}, function ( res ) {
			var notes = res.notes;
			for( var idx in notes ) {
				var note_model = t.get( notes[idx].id );
				if ( note_model ) {
					note_model.set( { body: notes[idx].body, subject: notes[idx].subject } );
				} else {
					note_model = new wpNoteModel( notes[ idx ] )
					t.add( note_model );
				}
			}
			t.bodiesLoaded = true;
			if ( typeof callback == "function" )
				callback.call(t);
		}, function (e) {
			console.error( 'body loading error!' );
		} );
		
	},

	markNotesSeen: function() {
		if ( this.mostRecentTimestamp > this.lastMarkedSeenTimestamp ) {
			wpNotesCommon.markNotesSeen( this.mostRecentTimestamp );
			this.lastMarkedSeenTimestamp = false;
		}
	},

	unreadCount: function() {
		return this.reduce( function( num, note ) { return num + ( note.get('unread') ? 1 : 0 ); }, 0 );
	},

	numberNewNotes: function() {
		var t = this;
		if ( ! t.lastMarkedSeenTimestamp )
			return 0;
		var new_notes = this.filter( function( note ) { 
			return ( note.get('timestamp') > t.lastMarkedSeenTimestamp ); 
		} );
		return new_notes.length;
	},

	// get all unread notes in the collection
	getUnreadNotes: function() {
		return this.filter( function( note ){ return Boolean( parseInt( note.get( "unread" ) ) ); } );
	},
	
	// get all notes in the collection of specified type
	getNotesOfType: function( typeName ) {
		var t = this;
		switch( typeName ){
			case 'unread':
				return t.getUnreadNotes();
				break;
			case 'latest':
				return t.filter( function( note ) {
					var qt = note.get( 'queried_types' );
					return 'undefined' != typeof qt && 'undefined' != typeof qt.latest && qt.latest;
				});
				break;
			default:
				return t.filter( function( note ) {
					var note_type = note.get( "type" );
					if ( "undefined" == typeof wpNotesCommon.noteTypes[ typeName ] ) {
						return false;
					}
					else if ( "string" == typeof wpNotesCommon.noteTypes[ typeName ] ) {
						return typeName == note_type;
					}
					var len = wpNotesCommon.noteTypes[ typeName ].length;
					for ( var i=0; i<len; i++ ){
						if ( wpNotesCommon.noteTypes[ typeName ][i] == note_type ) {
							return true;
						}
					}
					return false;
				} );
		}
	},

	getNoteIds: function() {
		return this.pluck( 'id' );
	}
});

wpNotesCommentModView = Backbone.View.extend({
	mode: 'buttons', //buttons, reply
	commentNeedsApproval : false,
	actionIDMap : {},

	events: {},

	templateApproveButton: '\
		<span class="{{class_name}}">\
			<a href="{{ajax_url}}" title="{{title_text}} Keyboard shortcut: {{keytext}}" data-action-type="{{data_action_type}}"><b>{{text}}</b></a>\
		</span>\
	',
	templateButton: '\
		<span class="{{class_name}}">\
			<a href="{{ajax_url}}" title="{{title_text}} Keyboard shortcut: {{keytext}}" data-action-type="{{data_action_type}}">{{text}}</a>\
		</span>\
	',

	templateReply: '\
		<div class="wpn-note-comment-reply"> \
			<h5>{{reply_header_text}}</h5>\
			<textarea class="wpn-note-comment-reply-text" rows="5" cols="45" name="wpn-note-comment-reply-text"></textarea>\
			<p class="wpn-comment-submit">\
				<span class="wpn-comment-submit-waiting" style="display: none;"></span>\
			<span class="wpn-comment-submit-error" style="display:none;">Error!</span>\
			<a href="{{ajax_url}}" class="wpn-comment-reply-button-send alignright">{{submit_button_text}}</a>\
			<a href="" class="wpn-comment-reply-button-close alignleft">_</a>\
			</p>\
		</div>\
	',

	initialize : function() {
		var t = this;
		_.bindAll( this, 'render' );
		if ( ! this.model.currentReplyText )
			this.model.currentReplyText = '';

		$(document).keydown(function ( key_event ) {
			if ( t.$el.is( ':hidden' ) ) {
				return;
			}

			if ( t.mode != 'buttons' ) {
				return;
			}

			var keyCode = wpNotesCommon.getKeycode( key_event );
			if ( !keyCode ) {
				return;
			}

			if ( keyCode == 82 ) { //r = reply to comment
				if ( typeof t.actionIDMap[ 'replyto-comment' ] != 'undefined' )
					t.openReply( key_event );
				return false; //prevent default
			}
			if ( keyCode == 65 ) { //a = approve/unapprove comment
				if ( typeof t.actionIDMap[ 'approve-comment' ] != 'undefined' )
					t.modComment( 'approve-comment' );
				else if ( typeof t.actionIDMap[ 'unapprove-comment' ] != 'undefined' )
					t.modComment( 'unapprove-comment' );
				return false; //prevent default
			}
			if ( keyCode == 83 ) { //s = spam/unspam comment
				if ( typeof t.actionIDMap[ 'spam-comment' ] != 'undefined' )
					t.modComment( 'spam-comment' );
				else if ( typeof t.actionIDMap[ 'unspam-comment' ] != 'undefined' )
					t.modComment( 'unspam-comment' );
				return false; //prevent default
			}
			if ( keyCode == 84 ) { //t = trash/untrash comment
				if ( typeof t.actionIDMap[ 'trash-comment' ] != 'undefined' )
					t.modComment( 'trash-comment' );
				else if ( typeof t.actionIDMap[ 'untrash-comment' ] != 'undefined' )
					t.modComment( 'untrash-comment' );
				return false; //prevent default
			}

		});

	},

	create: function() {
		this.setElement( $( '<div></div>', { 'class': 'wpn-note-comment-actions' } ) );

		this.events['click .wpn-replyto-comment-button-open a'] = 'openReply';
		this.events['click .wpn-comment-reply-button-close'] = 'closeReply';
		this.events['click .wpn-comment-reply-button-send'] = 'sendReply';
		this.events['click .wpn-approve-comment-button a'] = 'clickModComment';
		this.events['click .wpn-unapprove-comment-button a'] = 'clickModComment';
		this.events['click .wpn-spam-comment-button a'] = 'clickModComment';
		this.events['click .wpn-unspam-comment-button a'] = 'clickModComment';
		this.events['click .wpn-trash-comment-button a'] = 'clickModComment';
		this.events['click .wpn-untrash-comment-button a'] = 'clickModComment';

		this.model.bind( 'change', this.render, this );

		this.render();
		
		return this;
	},

	render: function() {
		this.$el.empty();
		if ( this.mode == 'buttons' ) {
			this.$el.append.apply( this.$el, this.createActions() );
		} else {
			this.$el.html( this.createReplyBox() );
			this.$( 'textarea' ).focus();
		}
		this.delegateEvents();
	},

	createActions: function() {
		var actions = this.model.get('body').actions;
		var t = this;
		var elements = [];
		this.actionIDMap = {};

		var cnt = 0;
		_.forEach( actions, function( action ) {
			t.actionIDMap[ action.type ] = cnt;
			switch( action['type'] ) {
				case 'replyto-comment':
					var keytext = '[r]';
					elements.push( Mustache.render( t.templateButton, {
						class_name: 'wpn-' + action.type + '-button-open',
						ajax_url: action.params.url,
						title_text: action.params.button_title_text,
						data_action_type: action.type,
						text: action.params.button_text,
						keytext: keytext
					} ) );
					elements.push( ' | ' );
					break;
				case 'approve-comment':
					var keytext = '[a]';
					t.commentNeedsApproval = true;
					elements.push( Mustache.render( t.templateApproveButton, {
						class_name: 'wpn-' + action.type + '-button',
						ajax_url: action.params.url,
						title_text: action.params.title_text,
						data_action_type: action.type,
						text: action.params.text,
						keytext: keytext
					} ) );
					elements.push( ' | ' );
					break;
				case 'unapprove-comment':
					var keytext = '[a]';
				case 'spam-comment':
					var keytext = ( typeof keytext == 'undefined' ) ? '[s]' : keytext;
				case 'unspam-comment':
					var keytext = ( typeof keytext == 'undefined' ) ? '[s]' : keytext;
				case 'trash-comment':
					var keytext = ( typeof keytext == 'undefined' ) ? '[t]' : keytext;
				case 'untrash-comment':
					var keytext = ( typeof keytext == 'undefined' ) ? '[t]' : keytext;
					elements.push( Mustache.render( t.templateButton, {
						class_name: 'wpn-' + action.type + '-button',
						ajax_url: action.params.url,
						title_text: action.params.title_text,
						data_action_type: action.type,
						text: action.params.text,
						keytext: keytext
					} ) );
					elements.push( ' | ' );
					break;
			}
			cnt += 1;
		});

		//remove final " | "
		elements = elements.slice( 0, -1 );
		elements.push( $( '<span/>', {
			'class': "wpn-comment-mod-waiting",
			style: "display:none;"
		} ) );

		return elements;
	},

	createReplyBox : function() {
		var action = this.model.get('body').actions[ this.actionIDMap['replyto-comment'] ];
		var element =  Mustache.render( this.templateReply, {
			ajax_url: action.params.url,
			reply_header_text: action.params.reply_header_text,
			submit_button_text: action.params.submit_button_text
		} );

		return element;
	},

	closeReply : function( ev ) {
		if ( ev )
			ev.preventDefault()
		this.mode = 'buttons';
		this.model.currentReplyText = this.$el.children( '.wpn-note-comment-reply' ).children( '.wpn-note-comment-reply-text' ).val();
		this.render();
		this.model.resize();
	},

	openReply : function( ev ) {
		ev.preventDefault()
		this.mode = 'reply';
		this.render();
		this.$el.children( '.wpn-note-comment-reply' ).children( '.wpn-note-comment-reply-text' ).val( this.model.currentReplyText );
		this.model.resize();
	},

	sendReply : function( ev ) {
		ev.preventDefault()
		var t = this;
		var comment_reply_el = this.$el.children( '.wpn-note-comment-reply' );
		var comment_text = comment_reply_el.children( '.wpn-note-comment-reply-text' ).val();
		this.model.currentReplyText = comment_text;
		var action = this.model.get('body').actions[ this.actionIDMap['replyto-comment'] ];
		
		comment_reply_el.children( '.wpn-comment-submit' ).children( '.wpn-comment-submit-error').hide();
		comment_reply_el.children( '.wpn-comment-submit' ).children( '.wpn-comment-submit-waiting').show();

		var args = {};
		if ( this.commentNeedsApproval )
			args.approve_parent = '1';

		args.comment_ID = action.params.comment_id;
		args.comment_post_ID = action.params.post_id;
		args.user_ID = action.params.user_id;
		args.blog_id = action.params.blog_id;
		args.action = 'replyto_comment_note';
		args['_wpnonce'] = action.params.replyto_nonce;
		args.content = comment_text;

		$.ajax({
			type : 'POST',
			url : action.params.ajax_url,
			data : args,
			success : function(x) { 
				if ( typeof(x) == 'string' ) {
					t.errorReply( {'responseText': x} );
					return false;
				}
				t.model.currentReplyText = '';
				t.closeReply( null );
				t.model.reload();
			},
			error : function(r) { 
				t.errorReply(r); 
			}
		});

		wpNotesCommon.bumpStat( 'notes-click-action', 'replyto-comment' );

		$('.wpn-comment-submit-waiting').spin( 'small' );
	},

	errorReply : function(r) {
		var t = this;
		var er = r.statusText;
		var comment_reply_el = this.$el.children( '.wpn-note-comment-reply' );

		comment_reply_el.children( '.wpn-comment-submit' ).children( '.wpn-comment-submit-waiting').hide();

		if ( r.responseText )
			er = r.responseText.replace( /<.[^<>]*?>/g, '' );

		if ( er )
			comment_reply_el.children( '.wpn-comment-submit' ).children( '.wpn-comment-submit-error').text(er).show();
	},

	clickModComment : function( ev ) {
		var t = this;
		ev.preventDefault()
		var type = ev.currentTarget.getAttribute('data-action-type');
		t.modComment( type );
	},

	modComment : function( type ) {
		var t = this;
		var action_id = this.actionIDMap[type];

		if ( typeof action_id !== 'undefined' ) {
			var action = this.model.get('body').actions[ action_id ];
			var data = {
				'id' : action.params.comment_id,
				'action' : action.params.ajax_action,
				'blog_id' : action.params.blog_id,
				'_blog_nonce' : action.params.blog_nonce,
				'_wpnonce' : action.params._wpnonce
			};
			data[ action.params.ajax_arg ] = 1;

			this.$( ' .wpn-comment-mod-waiting' ).show();

			$.post( action.params.ajax_url, data,
		 		function (res) { 
					t.model.reload();
			});
			wpNotesCommon.bumpStat( 'notes-click-action', type );

			$('.wpn-comment-mod-waiting').spin( 'small' );

		}
	}
});


})(jQuery);
;
var wpDashNoteListView = Backbone.View.extend({
	el:   '#wpnd-notes-content',
	list_el: '#wpnd-notes-list',
	btn_list:  '#wpnd-btn-list',
	activeFilter:      'latest',
	collection:              {},
	oldestTimesByType:       {},
	newestTimesByType:       {},
	screenHeight:             0,
	toolbarHeight:            0,
	topOfLastNote:            0,
	topOfList:                0,
	lastScroll:               0,
	topOfButtons:             0,
	bodyTop:                  0,
	bodyLeft:                 0,
	lastLoad:                 0,
	markedSeen:           false,

	initialize: function() {
		var t = this;
		if ( ! ( typeof( t.collection ) == "object" && t.collection.hasOwnProperty( 'models' ) ) ) {
			t.collection = new wpNoteList;
		}

		t.$list_el = jq( t.list_el );
		t.$btn_list = jq( t.btn_list );
		t.isRtl = jq('#wpadminbar').hasClass('rtl');

		t.selectFilterButton( t.activeFilter );

		var before = 0;
		
		t.screenHeight = jq(window).height();
		t.toolbarHeight = jq( '#wpadminbar' ).height();
		t.topOfList = jq( '#wpnd-notes-list' ).offset().top;

		t.spinner = jq( '<div />', { style: 'margin: 10px 0 20px 20px;' }).spin( 'large' );

		_.bindAll( this, 'renderNotes', 'renderNote', 'clearNotes', 'applyFilter', 'loadOlder', 'loadMoreNotes', 'bindScroll', 'maybeSpin' );

		// event handlers
		t.collection.on( "add", function( note ) {
			t.renderNote( note );
		});

		t.collection.on( "change", function( note ) {
			t.collection.sort();
			t.renderNote( note );
		});
		t.collection.on( "loadNotes:beginLoading", function() {
			t.maybeSpin();
		});
		t.collection.on( "loadNotes:endLoading", function() {
			t.showPromptIfEmpty();
			if ( 'latest' == t.activeFilter && ! t.markedSeen ) {
				t.markAsSeen();
				t.markedSeen = true;
			}
			t.maybeSpin();
		});

		var headerHeight = jq( '#notifications #wpnd-head' ).height();
		t.topOfButtons = t.$btn_list.offset().top - headerHeight - t.toolbarHeight - parseFloat( t.$btn_list.css('marginTop').replace( /auto/, 0 ) );
				
		// collect initial group of notifications
		var p = t.options.preloadedNotes;
		if ( 'undefined' != typeof p && p.length ) {
			for( var idx in p ) {
				if ( ! t.collection.get( p[idx].id ) ) {
					t.collection.add( p[ idx ] );
				}
			}
			
			before = wpnd_notes_preloaded[ wpnd_notes_preloaded.length - 1 ].timestamp;
		}
		if ( 1 > before ) {
			t.collection.loadNotes( { number: 20, fields: 'id,type,unread,subject,body,timestamp' } );
		}
		else {
			// load second batch of notifications
			t.loadOlder();
		}
		t.lastLoad = 0;

		jq( '#notifications #wpnd-sidebar #wpnd-btn-list a' ).click( function() {
			var f = jq(this).data('filter');
			t.applyFilter( f );
			wpNotesCommon.bumpStat( 'notes-dash-click-filter', f );
		});

		t.bindScroll();
	},

	renderNotes: function( notes ) {
		var t = this;
		_.each( notes, function( note ) {
			t.renderNote( note );
		});
	},

	renderNote: function( note ) {
		var t = this;
		// don't render notes not in the current view
		switch( t.activeFilter ){
			case 'latest':
				var qt = note.get( 'queried_types' ) || {};
				if ( 'undefined' == qt.latest || ! qt.latest ) {
					return;
				}
				break;
			case 'unread':
				if ( ! parseInt( note.get( 'unread' ) ) ) {
					return;
				}
				break;
			case 'trophy':
				var typeName = note.get( 'type' );
				if ( _.indexOf( wpNotesCommon.noteTypes.trophy, typeName ) != -1 ) {
					break;
				}
				return;
			case note.get( 'type' ):
				break;
			default:
				return;
		}

		var view = new wpDashNoteSummaryView({ model: note });
		view.render();
		var $renderedNotes = t.$list_el.find( '.wpn-note' );
		var rlen = $renderedNotes.length;

		if ( t.activeFilter == 'latest' ) {
			var index = t.collection.indexOf( note );
			if ( index == 0 ) {
				t.$list_el.prepend( view.$el );
			}
			else if ( index == t.collection.length - 1 ) {
				t.$list_el.append( view.$el );
			}
			else {
				var noteAbove = t.collection.at( index - 1 );
				if ( typeof noteAbove == "object" && "undefined" != typeof noteAbove.id ) {
					var $noteAbove = t.$list_el.find( '#wpnd-note-' + noteAbove.id  );
					$noteAbove.after( view.$el );
				}
				else {
					t.$list_el.append( view.$el );
				}
			}
		}
		else {
			if ( rlen == 0 ) {
				t.$list_el.prepend( view.$el );
			}
			else {
				var ts = note.get('timestamp');
				var notes_in_filter = t.collection.getNotesOfType( t.activeFilter );
				var newer_notes = _.filter( notes_in_filter, function(n) {
					return n.get('timestamp') > ts;
				});
				var noteAbove = _.last( newer_notes ) || [];
				if ( noteAbove.length ) {
					var $noteAbove = t.$list_el.find( '#wpnd-note-' + noteAbove.id  );
				}
				else {
					var $noteAbove = $renderedNotes.filter( ':last' );
				}
				if ( $noteAbove.length ) {
					$noteAbove.after( view.$el );
				}
				else {
					t.$list_el.prepend( view.$el );
				}
			}
		}

		var ts = parseInt( note.get('timestamp') );
		if ( "number" != typeof t.oldestTimesByType[ t.activeFilter ] || ts < t.oldestTimesByType[ t.activeFilter ] ) {
			t.oldestTimesByType[ t.activeFilter ] = ts;
		}
		if ( "number" != typeof t.newestTimesByType[ t.activeFilter ] || ts > t.newestTimesByType[ t.activeFilter ] ) {
			t.newestTimesByType[ t.activeFilter ] = ts;
		}

		t.topOfLastNote = ( 1 > rlen ) ? 0 : $renderedNotes.last().offset().top;
		view.bindNoteClick();
	},

	clearNotes: function() {
		this.$list_el.empty();
		return this;
	},

	showPromptIfEmpty: function() {
		var t = this;
		if ( t.$list_el.find( '.wpn-note' ).length > 0 ) {
			t.hidePrompt();
			return;
		}
		jq( '#wpnd-summary-prompt' ).css( 'display', 'table-cell' );
	},

	hidePrompt: function() {
		jq( '#wpnd-summary-prompt' ).css( 'display', 'none' );
	},

	applyFilter: function( filter ) {
		var t = this;
		t.unbindScroll();
		jq('#wpnd-note-body-content').css( 'display', 'none' ).empty().removeClass();
		jq( '#wpnd-notes-list .wpn-note.selected' ).each( function() {
			jq(this).removeClass( 'selected' );
		});
		if ( filter != t.activeFilter ){
			t.hidePrompt();
			t.activeFilter = filter;
			t.selectFilterButton( t.activeFilter );
			t.clearNotes();
			t.renderNotes( t.collection.getNotesOfType( t.activeFilter ) );
			t.lastLoad = 0;
			t.loadOlder( true );
		}
		jq.when( jq( 'html, body' ).animate( { scrollTop: 0 }, 'fast' ) ).then( t.bindScroll() );
	},

	loadOlder: function( force ) {
		var t = this;
		if ( "number" == typeof t.oldestTimesByType[ t.activeFilter ] && 0 < t.oldestTimesByType[ t.activeFilter ] ) {
			var time = t.oldestTimesByType[ t.activeFilter ];
		}
		else {
			var time = _.min( t.collection.pluck( "timestamp" ) );
		}
		var args = { before: time, number: 16, fields: 'id,type,unread,subject,body,timestamp' };
		t.loadMoreNotes( args, force );
	},	

	loadMoreNotes: function( args, force ) {
		var t = this;
		var now = parseInt( new Date().getTime() / 1000 );
		force = 'undefined' != typeof force && force;
		if ( force || ( ! t.collection.loading && t.lastLoad < now - 2 ) ) {
			if ( t.activeFilter == 'unread' ) {
				args.unread = true;
			}
			args.type = t.activeFilter;

			this.collection.loadNotes( args );
			t.lastLoad = parseInt( new Date().getTime() / 1000 );
			wpNotesCommon.bumpStat( 'notes-dash-loadMore', t.activeFilter );
		}
	},

	markAsSeen: function() {
		this.collection.markNotesSeen();
		jq( '#wpnt-notes-unread-count' ).removeClass( 'wpn-unread' ).addClass( 'wpn-read' );
	},

	selectFilterButton: function( filter ) {
		var t = this;
		t.$btn_list.find( '.button' ).removeClass( 'selected' );
		jq( '#wpnd-view-' + filter ).addClass( 'selected' );
	},

	bindScroll: function() {
		var t = this;
		jq(window).on( 'scroll.myNotes', function() {
			var scrollTop = jq(window).scrollTop();
			if ( t.topOfLastNote > 0 && jq(document).height() - scrollTop <= 1800 ) {
				t.loadOlder();
			}
			t.lastScroll = scrollTop;

			if ( scrollTop >= t.topOfButtons ) {
				t.$btn_list.addClass( 'fixed' );
			}
			else {
				t.$btn_list.removeClass( 'fixed' );
			}
		});
	},

	unbindScroll: function() {
		jq(window).off( 'scroll.myNotes' );
	},

	maybeSpin: function() {
		var t = this;
		if ( t.collection.loading ) {
			jq( '#wpnd-loading' ).empty();
			jq( '#wpnd-loading' ).append( t.spinner );
		}
		else {
			jq( '#wpnd-loading' ).empty();
		}
	}
});

var wpDashNoteSummaryView = Backbone.View.extend({
	bodyView: { noteBody: null },
	template: '\
		<div id="wpnd-note-{{id}}" class="wpn-note wpn-{{type}} {{#unread}}wpn-unread{{/unread}}"> \
			<div class="wpn-note-summary"> \
				<span class="wpn-noticon"> \
					<img src="{{subject.noticon}}" /> \
				</span> \
				<span class="wpn-icon"> \
					<img src="{{subject.icon}}" /> \
				</span> \
				<span class="wpn-subject"> \
					{{{subject.html}}} \
				</span> \
			</div> \
		</div> \
	',
	html: '',

	initialize: function() {
		_.bindAll( this, 'render', 'bindNoteClick' );
	},
	
	render: function( ) {
		var note = this.model;
		jq( '#wpnd-note-' + note.id ).remove();
		var noteObj = note.toJSON();
		noteObj.unread = Boolean( parseInt( noteObj.unread ) );
		this.html = Mustache.render( this.template, noteObj );
		this.bodyView.noteBody = null;
		this.$el = jq(this.html).data({timestamp: note.get('timestamp'), id: note.id});
		return this;
	},

	bindNoteClick: function() {
		var note = this.model;
		var $note = jq( '#wpnd-note-' + note.id );
		var $summary = $note.find( '.wpn-note-summary' );
		$summary.click( function( event ) {
			var was_selected = $note.hasClass( 'selected' );
			jq( '#wpnd-notes-list .wpn-note.selected' ).each( function() {
				jq(this).removeClass( 'selected' );
			});
			if ( typeof( this.bodyView ) != "object" || ! this.bodyView.hasOwnProperty( 'model' ) ) {
				this.bodyView = new wpDashBodyView({ model: note });
			}

			if ( ! was_selected ) {
				$note.addClass( 'selected' );
				note.loadBody();
				this.bodyView.render();
				$note.removeClass( 'wpn-unread' );
				note.markRead();
				note.set( { unread: false }, { silent: true } );
				wpNotesCommon.bumpStat( 'notes-click-type', note.get( 'type' ) );
			}
			else {
				this.bodyView.unrender();
			}
		});
	}
});

var wpDashBodyView = Backbone.View.extend({
	el: '#wpnd-note-body-content',
	noteBody: null,

	initialize: function() {
		_.bindAll( this, 'render', 'unrender' );
		this.noteBody = wpNotesCommon.createNoteBody( this.model );
	},
	
	render: function() {
		var note = this.model;
		if ( typeof( note ) == "object" && note.hasOwnProperty( 'id' ) ) {
			this.unrender();
			this.$el.append( this.noteBody );

			var $summary = jq( '#wpnd-note-' + note.id );
			var $wrapper = jq( '#wpnd-notes-content' );

			var ceil = 0;
			var top = ceil;

			//if the screen is wide enough vertically align the body on the summary
			if ( $wrapper.width() > $summary.width() + this.$el.width() ) {
				var elHeight = this.$el.outerHeight();
				var floor = ceil + $wrapper.outerHeight();
				var topValign = $summary.position().top - ceil - ( elHeight / 2 ) + ( $summary.height() / 2 );

				// if note is too tall, don't center vertically
				if ( elHeight > 364 && ( floor < topValign + elHeight != true ) ) {
					elHeight = 364;
				}
				if ( $summary.position().top > elHeight / 2 ) {
					if ( floor < topValign + elHeight ) {
						top = floor - elHeight;
					}
					else if ( topValign > ceil ) {
						top = topValign;
					}
				}
			}
			else {
				top = $summary.position().top + $summary.height();
			}

			this.$el.css( {
				display: 'inline',
				top: top
			});
			Gravatar.attach_profiles( '#' + this.$el.attr('id') );
			this.$el.addClass( 'wpn-' + note.get( 'type' ) );
		}
	},

	unrender: function() {
		this.$el.css( 'display', 'none' ).empty().removeClass();
	}
});
;
/*
 * jQuery WordPress REST Proxy Request
 * Name:   wpcom_proxy_request
 * Author: Beau Collins <beaucollins@gmail.com>
 * 
 * A plugin for jQuery that makes proxy requests (using window.postMessage) to the
 * WordPress.com REST api (https://public-api.wordpress.com/rest/v1/help)
 * 
 * Usage:
 *    
 *    jQuery.wpcom_proxy_request(path, callback);
 *    jQuery.wpcom_proxy_request(path, request, callback);
 *    jQuery.wpcom_proxy_request(request, callback);
 *    
 * Arguments:
 *    path     : the REST URL path to request (will be appended to the rest base URL)
 *    request  :
 *    callback : function that is executed once the response is received. It is given two arguments:
 *            
 *            response : the JSON response for your request
 *            statusCode : the HTTP statusCode for your request
 *            function(response, statusCode){}
 *
 * Example:
 *    // For simple GET requests
 *    jQuery.wpcom_proxy_request("/me", function(response, statusCode){
 *      
 *    });
 *    
 *    // More Advanced GET request
 *    jQuery.wpcom_proxy_request({
 *      path: '/sites/en.blog.wordpress.com/posts',
 *      query: {number:100}
 *    }, callback);
 * 
 *    // POST request
 *    jQuery.wpcom_proxy_request({
 *      method:'POST',
 *      path: '/sites/en.blog.wordpress.com/posts/9776/replies/new,
 *      body: {content:"This is a comment"}
 *    }, callback);
 * 
 */
(function($){
	var proxy,
	origin = window.location.protocol + "//" + window.location.hostname,
	proxyOrigin = "https://public-api.wordpress.com",
	supported = true, // assume window.postMessage is supported
	structuredData = true, // supports passing of structured data
	ready = false,
	buffer = [], // store requests while we wait for
	buildProxy = function(){
		$(window).bind('message', receive);
		proxy = document.createElement('iframe');
		proxy.src = "https://public-api.wordpress.com/rest/v1/proxy#" + origin;
		proxy.style.display = 'none';
		$(proxy).bind('load', function(){
			ready = true;
			while(args = buffer.shift()) perform.apply(null, args);
		});
		$(document).ready(function(){
			$(document.body).append(proxy);
		});
	},
	check = function(e){
		structuredData = 'object' === typeof(e.data);
		$(window).unbind('message', check);
		buildProxy();
	},
	pop = Array.prototype.pop,
	callbacks = {},
	perform = function(){
		var callback = pop.call(arguments),
		request = pop.call(arguments),
		path = pop.call(arguments),
		callback_id,
		data;
		
		if ('string' === typeof(request))
			request = {path:request};
		if (path)
			request.path = path;
		if ('function' !== typeof(callback))
			throw("final argument must be a valid callback function");
		do {
			callback_id = Math.random();
		} while ('undefined' !== typeof(callbacks[callback_id]));
		callbacks[callback_id] = callback;
		request.callback = callback_id;
		data = structuredData ? request : JSON.stringify(request);
		proxy.contentWindow.postMessage(data, proxyOrigin);
	},
	receive = function(e){
		var event = e.originalEvent;
		if (event.origin !== proxyOrigin)
			return;
		var data = structuredData ? event.data : JSON.parse(event.data);
		if ('undefined' === typeof(data[2]) || 'undefined' === typeof(callbacks[data[2]]))
			return;
		var callback_id = data.pop(),
		callback = callbacks[callback_id];
		delete callbacks[callback_id];
		callback.apply(null, data);
	}
	// step 1 do we have postMessage
	if ('function' === typeof(window.postMessage)) {
		$(window).bind('message', check);
		window.postMessage({}, origin);
	} else {
		supported = false;
	}
	$.wpcom_proxy_request = function(){
		if (!supported)
			throw("Browser does not support window.postMessage");
		if (ready)
			perform.apply(null, arguments);
		else
			buffer.push(arguments);
	}
})(jQuery);
;
var optimizely = optimizely || [];

// Bucket a visitor based on user_id
( function() {

	var o = wpcom_optimizely_api;
	var checkMultivariateExperiment = function( exp ) {
		if ( typeof exp.multivariate != 'undefined' && exp.multivariate && typeof exp.sections != 'undefined' )
			return true;
		return false;
	}
	var checkMultivariateSection = function( sections, s ) {
		if ( sections.hasOwnProperty( s ) && typeof sections[s].variation_array != 'undefined' && typeof sections[s].variation_array.variation_id != 'undefined' )
			return true;
		return false;
	}
	var pushAPICalls = function( exp, multivariate ) {
		if ( ! multivariate ) {
			optimizely.push( [ "bucketVisitor", parseInt( exp.experiment_id ), parseInt( exp.variation_id ) ] );
			return true;
		}
		for ( var s in exp.sections ) {
			if( checkMultivariateSection( exp.sections, s ) )
				optimizely.push( [ "bucketVisitor", parseInt( exp.experiment_id ), parseInt( exp.sections[s].variation_array.variation_id ) ] );
		}	
	}

	if ( typeof o != 'undefined' ) {
		for ( var test_slug in o ) {
			if ( ! o.hasOwnProperty( test_slug ) || typeof o[test_slug].experiment_id == 'undefined' )
				continue;
			if ( checkMultivariateExperiment( o[test_slug] ) )
				pushAPICalls( o[test_slug], true );
			else if ( typeof o[test_slug].variation_id != 'undefined' ) 
				pushAPICalls( o[test_slug], false );
		}
	}
} )();
;
