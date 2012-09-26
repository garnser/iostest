/*! jQuery v1.7.2 jquery.com | jquery.org/license */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cu(a){if(!cj[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){ck||(ck=c.createElement("iframe"),ck.frameBorder=ck.width=ck.height=0),b.appendChild(ck);if(!cl||!ck.createElement)cl=(ck.contentWindow||ck.contentDocument).document,cl.write((f.support.boxModel?"<!doctype html>":"")+"<html><body>"),cl.close();d=cl.createElement(a),cl.body.appendChild(d),e=f.css(d,"display"),b.removeChild(ck)}cj[a]=e}return cj[a]}function ct(a,b){var c={};f.each(cp.concat.apply([],cp.slice(0,b)),function(){c[this]=a});return c}function cs(){cq=b}function cr(){setTimeout(cs,0);return cq=f.now()}function ci(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ch(){try{return new a.XMLHttpRequest}catch(b){}}function cb(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function ca(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function b_(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bD.test(a)?d(a,e):b_(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&f.type(b)==="object")for(var e in b)b_(a+"["+e+"]",b[e],c,d);else d(a,b)}function b$(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function bZ(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bS,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bZ(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bZ(a,c,d,e,"*",g));return l}function bY(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bO),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bB(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?1:0,g=4;if(d>0){if(c!=="border")for(;e<g;e+=2)c||(d-=parseFloat(f.css(a,"padding"+bx[e]))||0),c==="margin"?d+=parseFloat(f.css(a,c+bx[e]))||0:d-=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0;return d+"px"}d=by(a,b);if(d<0||d==null)d=a.style[b];if(bt.test(d))return d;d=parseFloat(d)||0;if(c)for(;e<g;e+=2)d+=parseFloat(f.css(a,"padding"+bx[e]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+bx[e]))||0);return d+"px"}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;b.nodeType===1&&(b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?b.outerHTML=a.outerHTML:c!=="input"||a.type!=="checkbox"&&a.type!=="radio"?c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text):(a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value)),b.removeAttribute(f.expando),b.removeAttribute("_submit_attached"),b.removeAttribute("_change_attached"))}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c,i[c][d])}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?+d:j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.2",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){if(typeof c!="string"||!c)return null;var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h,i){var j,k=d==null,l=0,m=a.length;if(d&&typeof d=="object"){for(l in d)e.access(a,c,l,d[l],1,h,f);g=1}else if(f!==b){j=i===b&&e.isFunction(f),k&&(j?(j=c,c=function(a,b,c){return j.call(e(a),c)}):(c.call(a,f),c=null));if(c)for(;l<m;l++)c(a[l],d,j?f.call(a[l],l,c(a[l],d)):f,i);g=1}return g?a:k?c.call(a):m?c(a[0],d):h},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m,n=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?n(g):h==="function"&&(!a.unique||!p.has(g))&&c.push(g)},o=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,j=!0,m=k||0,k=0,l=c.length;for(;c&&m<l;m++)if(c[m].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}j=!1,c&&(a.once?e===!0?p.disable():c=[]:d&&d.length&&(e=d.shift(),p.fireWith(e[0],e[1])))},p={add:function(){if(c){var a=c.length;n(arguments),j?l=c.length:e&&e!==!0&&(k=a,o(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){j&&f<=l&&(l--,f<=m&&m--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&p.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(j?a.once||d.push([b,c]):(!a.once||!e)&&o(b,c));return this},fire:function(){p.fireWith(this,arguments);return this},fired:function(){return!!i}};return p};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p=c.createElement("div"),q=c.documentElement;p.setAttribute("className","t"),p.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=p.getElementsByTagName("*"),e=p.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=p.getElementsByTagName("input")[0],b={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:p.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,pixelMargin:!0},f.boxModel=b.boxModel=c.compatMode==="CSS1Compat",i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete p.test}catch(r){b.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",function(){b.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),i.setAttribute("name","t"),p.appendChild(i),j=c.createDocumentFragment(),j.appendChild(p.lastChild),b.checkClone=j.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,j.removeChild(i),j.appendChild(p);if(p.attachEvent)for(n in{submit:1,change:1,focusin:1})m="on"+n,o=m in p,o||(p.setAttribute(m,"return;"),o=typeof p[m]=="function"),b[n+"Bubbles"]=o;j.removeChild(p),j=g=h=p=i=null,f(function(){var d,e,g,h,i,j,l,m,n,q,r,s,t,u=c.getElementsByTagName("body")[0];!u||(m=1,t="padding:0;margin:0;border:",r="position:absolute;top:0;left:0;width:1px;height:1px;",s=t+"0;visibility:hidden;",n="style='"+r+t+"5px solid #000;",q="<div "+n+"display:block;'><div style='"+t+"0;display:block;overflow:hidden;'></div></div>"+"<table "+n+"' cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",d=c.createElement("div"),d.style.cssText=s+"width:0;height:0;position:static;top:0;margin-top:"+m+"px",u.insertBefore(d,u.firstChild),p=c.createElement("div"),d.appendChild(p),p.innerHTML="<table><tr><td style='"+t+"0;display:none'></td><td>t</td></tr></table>",k=p.getElementsByTagName("td"),o=k[0].offsetHeight===0,k[0].style.display="",k[1].style.display="none",b.reliableHiddenOffsets=o&&k[0].offsetHeight===0,a.getComputedStyle&&(p.innerHTML="",l=c.createElement("div"),l.style.width="0",l.style.marginRight="0",p.style.width="2px",p.appendChild(l),b.reliableMarginRight=(parseInt((a.getComputedStyle(l,null)||{marginRight:0}).marginRight,10)||0)===0),typeof p.style.zoom!="undefined"&&(p.innerHTML="",p.style.width=p.style.padding="1px",p.style.border=0,p.style.overflow="hidden",p.style.display="inline",p.style.zoom=1,b.inlineBlockNeedsLayout=p.offsetWidth===3,p.style.display="block",p.style.overflow="visible",p.innerHTML="<div style='width:5px;'></div>",b.shrinkWrapBlocks=p.offsetWidth!==3),p.style.cssText=r+s,p.innerHTML=q,e=p.firstChild,g=e.firstChild,i=e.nextSibling.firstChild.firstChild,j={doesNotAddBorder:g.offsetTop!==5,doesAddBorderForTableAndCells:i.offsetTop===5},g.style.position="fixed",g.style.top="20px",j.fixedPosition=g.offsetTop===20||g.offsetTop===15,g.style.position=g.style.top="",e.style.overflow="hidden",e.style.position="relative",j.subtractsBorderForOverflowNotVisible=g.offsetTop===-5,j.doesNotIncludeMarginInBodyOffset=u.offsetTop!==m,a.getComputedStyle&&(p.style.marginTop="1%",b.pixelMargin=(a.getComputedStyle(p,null)||{marginTop:0}).marginTop!=="1%"),typeof d.style.zoom!="undefined"&&(d.style.zoom=1),u.removeChild(d),l=p=d=null,f.extend(b,j))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h,i,j=this[0],k=0,m=null;if(a===b){if(this.length){m=f.data(j);if(j.nodeType===1&&!f._data(j,"parsedAttrs")){g=j.attributes;for(i=g.length;k<i;k++)h=g[k].name,h.indexOf("data-")===0&&(h=f.camelCase(h.substring(5)),l(j,h,m[h]));f._data(j,"parsedAttrs",!0)}}return m}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!";return f.access(this,function(c){if(c===b){m=this.triggerHandler("getData"+e,[d[0]]),m===b&&j&&(m=f.data(j,a),m=l(j,a,m));return m===b&&d[1]?this.data(d[0]):m}d[1]=c,this.each(function(){var b=f(this);b.triggerHandler("setData"+e,d),f.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1)},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){var d=2;typeof a!="string"&&(c=a,a="fx",d--);if(arguments.length<d)return f.queue(this[0],a);return c===b?this:this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise(c)}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,f.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,f.prop,a,b,arguments.length>1)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.type]||f.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.type]||f.valHooks[g.nodeName.toLowerCase()];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h,i=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;i<g;i++)e=d[i],e&&(c=f.propFix[e]||e,h=u.test(e),h||f.attr(a,e,""),a.removeAttribute(v?e:c),h&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0,coords:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/(?:^|\s)hover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(
a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler,g=p.selector),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:g&&G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=f.event.special[c.type]||{},j=[],k,l,m,n,o,p,q,r,s,t,u;g[0]=c,c.delegateTarget=this;if(!i.preDispatch||i.preDispatch.call(this,c)!==!1){if(e&&(!c.button||c.type!=="click")){n=f(this),n.context=this.ownerDocument||this;for(m=c.target;m!=this;m=m.parentNode||this)if(m.disabled!==!0){p={},r=[],n[0]=m;for(k=0;k<e;k++)s=d[k],t=s.selector,p[t]===b&&(p[t]=s.quick?H(m,s.quick):n.is(t)),p[t]&&r.push(s);r.length&&j.push({elem:m,matches:r})}}d.length>e&&j.push({elem:this,matches:d.slice(e)});for(k=0;k<j.length&&!c.isPropagationStopped();k++){q=j[k],c.currentTarget=q.elem;for(l=0;l<q.matches.length&&!c.isImmediatePropagationStopped();l++){s=q.matches[l];if(h||!c.namespace&&!s.namespace||c.namespace_re&&c.namespace_re.test(s.namespace))c.data=s.data,c.handleObj=s,o=((f.event.special[s.origType]||{}).handle||s.handler).apply(q.elem,g),o!==b&&(c.result=o,o===!1&&(c.preventDefault(),c.stopPropagation()))}}i.postDispatch&&i.postDispatch.call(this,c);return c.result}},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),d._submit_attached=!0)})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9||d===11){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));o.match.globalPOS=p;var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.globalPOS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")[\\s/>]","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){return f.access(this,function(a){return a===b?f.text(this):this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f
.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){return f.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(f.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(g){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,function(a,b){b.src?f.ajax({type:"GET",global:!1,url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||f.isXMLDoc(a)||!bc.test("<"+a.nodeName+">")?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g,h,i,j=[];b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);for(var k=0,l;(l=a[k])!=null;k++){typeof l=="number"&&(l+="");if(!l)continue;if(typeof l=="string")if(!_.test(l))l=b.createTextNode(l);else{l=l.replace(Y,"<$1></$2>");var m=(Z.exec(l)||["",""])[1].toLowerCase(),n=bg[m]||bg._default,o=n[0],p=b.createElement("div"),q=bh.childNodes,r;b===c?bh.appendChild(p):U(b).appendChild(p),p.innerHTML=n[1]+l+n[2];while(o--)p=p.lastChild;if(!f.support.tbody){var s=$.test(l),t=m==="table"&&!s?p.firstChild&&p.firstChild.childNodes:n[1]==="<table>"&&!s?p.childNodes:[];for(i=t.length-1;i>=0;--i)f.nodeName(t[i],"tbody")&&!t[i].childNodes.length&&t[i].parentNode.removeChild(t[i])}!f.support.leadingWhitespace&&X.test(l)&&p.insertBefore(b.createTextNode(X.exec(l)[0]),p.firstChild),l=p.childNodes,p&&(p.parentNode.removeChild(p),q.length>0&&(r=q[q.length-1],r&&r.parentNode&&r.parentNode.removeChild(r)))}var u;if(!f.support.appendChecked)if(l[0]&&typeof (u=l.length)=="number")for(i=0;i<u;i++)bn(l[i]);else bn(l);l.nodeType?j.push(l):j=f.merge(j,l)}if(d){g=function(a){return!a.type||be.test(a.type)};for(k=0;j[k];k++){h=j[k];if(e&&f.nodeName(h,"script")&&(!h.type||be.test(h.type)))e.push(h.parentNode?h.parentNode.removeChild(h):h);else{if(h.nodeType===1){var v=f.grep(h.getElementsByTagName("script"),g);j.splice.apply(j,[k+1,0].concat(v))}d.appendChild(h)}}}return j},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bp=/alpha\([^)]*\)/i,bq=/opacity=([^)]*)/,br=/([A-Z]|^ms)/g,bs=/^[\-+]?(?:\d*\.)?\d+$/i,bt=/^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,bu=/^([\-+])=([\-+.\de]+)/,bv=/^margin/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Top","Right","Bottom","Left"],by,bz,bA;f.fn.css=function(a,c){return f.access(this,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)},a,c,arguments.length>1)},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=by(a,"opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bu.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(by)return by(a,c)},swap:function(a,b,c){var d={},e,f;for(f in b)d[f]=a.style[f],a.style[f]=b[f];e=c.call(a);for(f in b)a.style[f]=d[f];return e}}),f.curCSS=f.css,c.defaultView&&c.defaultView.getComputedStyle&&(bz=function(a,b){var c,d,e,g,h=a.style;b=b.replace(br,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b))),!f.support.pixelMargin&&e&&bv.test(b)&&bt.test(c)&&(g=h.width,h.width=c,c=e.width,h.width=g);return c}),c.documentElement.currentStyle&&(bA=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f==null&&g&&(e=g[b])&&(f=e),bt.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),by=bz||bA,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth!==0?bB(a,b,d):f.swap(a,bw,function(){return bB(a,b,d)})},set:function(a,b){return bs.test(b)?b+"px":b}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bq.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bp,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bp.test(g)?g.replace(bp,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){return f.swap(a,{display:"inline-block"},function(){return b?by(a,"margin-right"):a.style.marginRight})}})}),f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)}),f.each({margin:"",padding:"",border:"Width"},function(a,b){f.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bx[d]+b]=e[d]||e[d-2]||e[0];return f}}});var bC=/%20/g,bD=/\[\]$/,bE=/\r?\n/g,bF=/#.*$/,bG=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bH=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bI=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bJ=/^(?:GET|HEAD)$/,bK=/^\/\//,bL=/\?/,bM=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bN=/^(?:select|textarea)/i,bO=/\s+/,bP=/([?&])_=[^&]*/,bQ=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bR=f.fn.load,bS={},bT={},bU,bV,bW=["*/"]+["*"];try{bU=e.href}catch(bX){bU=c.createElement("a"),bU.href="",bU=bU.href}bV=bQ.exec(bU.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bR)return bR.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bM,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bN.test(this.nodeName)||bH.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bE,"\r\n")}}):{name:b.name,value:c.replace(bE,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b$(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b$(a,b);return a},ajaxSettings:{url:bU,isLocal:bI.test(bV[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bW},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bY(bS),ajaxTransport:bY(bT),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?ca(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cb(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bG.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bF,"").replace(bK,bV[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bO),d.crossDomain==null&&(r=bQ.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bV[1]&&r[2]==bV[2]&&(r[3]||(r[1]==="http:"?80:443))==(bV[3]||(bV[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),bZ(bS,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bJ.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bL.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bP,"$1_="+x);d.url=y+(y===d.url?(bL.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bW+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=bZ(bT,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)b_(g,a[g],c,e);return d.join("&").replace(bC,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cc=f.now(),cd=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cc++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=typeof b.data=="string"&&/^application\/x\-www\-form\-urlencoded/.test(b.contentType);if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(cd.test(b.url)||e&&cd.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(cd,l),b.url===j&&(e&&(k=k.replace(cd,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var ce=a.ActiveXObject?function(){for(var a in cg)cg[a](0,1)}:!1,cf=0,cg;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ch()||ci()}:ch,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,ce&&delete cg[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n);try{m.text=h.responseText}catch(a){}try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cf,ce&&(cg||(cg={},f(a).unload(ce)),cg[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cj={},ck,cl,cm=/^(?:toggle|show|hide)$/,cn=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,co,cp=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cq;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(ct("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),(e===""&&f.css(d,"display")==="none"||!f.contains(d.ownerDocument.documentElement,d))&&f._data(d,"olddisplay",cu(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(ct("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(ct("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o,p,q;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]);if((k=f.cssHooks[g])&&"expand"in k){l=k.expand(a[g]),delete a[g];for(i in l)i in a||(a[i]=l[i])}}for(g in a){h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cu(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cm.test(h)?(q=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),q?(f._data(this,"toggle"+i,q==="show"?"hide":"show"),j[q]()):j[h]()):(m=cn.exec(h),n=j.cur(),m?(o=parseFloat(m[2]),p=m[3]||(f.cssNumber[i]?"":"px"),p!=="px"&&(f.style(this,i,(o||1)+p),n=(o||1)/j.cur()*n,f.style(this,i,n+p)),m[1]&&(o=(m[1]==="-="?-1:1)*o+n),j.custom(n,o,p)):j.custom(n,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:ct("show",1),slideUp:ct("hide",1),slideToggle:ct("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a){return a},swing:function(a){return-Math.cos(a*Math.PI)/2+.5}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cq||cr(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){f._data(e.elem,"fxshow"+e.prop)===b&&(e.options.hide?f._data(e.elem,"fxshow"+e.prop,e.start):e.options.show&&f._data(e.elem,"fxshow"+e.prop,e.end))},h()&&f.timers.push(h)&&!co&&(co=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cq||cr(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(co),co=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(cp.concat.apply([],cp),function(a,b){b.indexOf("margin")&&(f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)})}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cv,cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?cv=function(a,b,c,d){try{d=a.getBoundingClientRect()}catch(e){}if(!d||!f.contains(c,a))return d?{top:d.top,left:d.left}:{top:0,left:0};var g=b.body,h=cy(b),i=c.clientTop||g.clientTop||0,j=c.clientLeft||g.clientLeft||0,k=h.pageYOffset||f.support.boxModel&&c.scrollTop||g.scrollTop,l=h.pageXOffset||f.support.boxModel&&c.scrollLeft||g.scrollLeft,m=d.top+k-i,n=d.left+l-j;return{top:m,left:n}}:cv=function(a,b,c){var d,e=a.offsetParent,g=a,h=b.body,i=b.defaultView,j=i?i.getComputedStyle(a,null):a.currentStyle,k=a.offsetTop,l=a.offsetLeft;while((a=a.parentNode)&&a!==h&&a!==c){if(f.support.fixedPosition&&j.position==="fixed")break;d=i?i.getComputedStyle(a,null):a.currentStyle,k-=a.scrollTop,l-=a.scrollLeft,a===e&&(k+=a.offsetTop,l+=a.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(a.nodeName))&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),g=e,e=a.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&d.overflow!=="visible"&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),j=d}if(j.position==="relative"||j.position==="static")k+=h.offsetTop,l+=h.offsetLeft;f.support.fixedPosition&&j.position==="fixed"&&(k+=Math.max(c.scrollTop,h.scrollTop),l+=Math.max(c.scrollLeft,h.scrollLeft));return{top:k,left:l}},f.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){f.offset.setOffset(this,a,b)});var c=this[0],d=c&&c.ownerDocument;if(!d)return null;if(c===d.body)return f.offset.bodyOffset(c);return cv(c,d,d.documentElement)},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);f.fn[a]=function(e){return f.access(this,function(a,e,g){var h=cy(a);if(g===b)return h?c in h?h[c]:f.support.boxModel&&h.document.documentElement[e]||h.document.body[e]:a[e];h?h.scrollTo(d?f(h).scrollLeft():g,d?g:f(h).scrollTop()):a[e]=g},a,e,arguments.length,null)}}),f.each({Height:"height",Width:"width"},function(a,c){var d="client"+a,e="scroll"+a,g="offset"+a;f.fn["inner"+a]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,c,"padding")):this[c]():null},f.fn["outer"+a]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,c,a?"margin":"border")):this[c]():null},f.fn[c]=function(a){return f.access(this,function(a,c,h){var i,j,k,l;if(f.isWindow(a)){i=a.document,j=i.documentElement[d];return f.support.boxModel&&j||i.body&&i.body[d]||j}if(a.nodeType===9){i=a.documentElement;if(i[d]>=i[e])return i[d];return Math.max(a.body[e],i[e],a.body[g],i[g])}if(h===b){k=f.css(a,c),l=parseFloat(k);return f.isNumeric(l)?l:k}f(a).css(c,h)},c,a,arguments.length,null)}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);
jQuery.noConflict();
;
/*! jQuery UI - v1.8.20 - 2012-04-30
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.core.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){function c(b,c){var e=b.nodeName.toLowerCase();if("area"===e){var f=b.parentNode,g=f.name,h;return!b.href||!g||f.nodeName.toLowerCase()!=="map"?!1:(h=a("img[usemap=#"+g+"]")[0],!!h&&d(h))}return(/input|select|textarea|button|object/.test(e)?!b.disabled:"a"==e?b.href||c:c)&&d(b)}function d(b){return!a(b).parents().andSelf().filter(function(){return a.curCSS(this,"visibility")==="hidden"||a.expr.filters.hidden(this)}).length}a.ui=a.ui||{};if(a.ui.version)return;a.extend(a.ui,{version:"1.8.20",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}}),a.fn.extend({propAttr:a.fn.prop||a.fn.attr,_focus:a.fn.focus,focus:function(b,c){return typeof b=="number"?this.each(function(){var d=this;setTimeout(function(){a(d).focus(),c&&c.call(d)},b)}):this._focus.apply(this,arguments)},scrollParent:function(){var b;return a.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?b=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(a.curCSS(this,"position",1))&&/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0):b=this.parents().filter(function(){return/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0),/fixed/.test(this.css("position"))||!b.length?a(document):b},zIndex:function(c){if(c!==b)return this.css("zIndex",c);if(this.length){var d=a(this[0]),e,f;while(d.length&&d[0]!==document){e=d.css("position");if(e==="absolute"||e==="relative"||e==="fixed"){f=parseInt(d.css("zIndex"),10);if(!isNaN(f)&&f!==0)return f}d=d.parent()}}return 0},disableSelection:function(){return this.bind((a.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),a.each(["Width","Height"],function(c,d){function h(b,c,d,f){return a.each(e,function(){c-=parseFloat(a.curCSS(b,"padding"+this,!0))||0,d&&(c-=parseFloat(a.curCSS(b,"border"+this+"Width",!0))||0),f&&(c-=parseFloat(a.curCSS(b,"margin"+this,!0))||0)}),c}var e=d==="Width"?["Left","Right"]:["Top","Bottom"],f=d.toLowerCase(),g={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+d]=function(c){return c===b?g["inner"+d].call(this):this.each(function(){a(this).css(f,h(this,c)+"px")})},a.fn["outer"+d]=function(b,c){return typeof b!="number"?g["outer"+d].call(this,b):this.each(function(){a(this).css(f,h(this,b,!0,c)+"px")})}}),a.extend(a.expr[":"],{data:function(b,c,d){return!!a.data(b,d[3])},focusable:function(b){return c(b,!isNaN(a.attr(b,"tabindex")))},tabbable:function(b){var d=a.attr(b,"tabindex"),e=isNaN(d);return(e||d>=0)&&c(b,!e)}}),a(function(){var b=document.body,c=b.appendChild(c=document.createElement("div"));c.offsetHeight,a.extend(c.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),a.support.minHeight=c.offsetHeight===100,a.support.selectstart="onselectstart"in c,b.removeChild(c).style.display="none"}),a.extend(a.ui,{plugin:{add:function(b,c,d){var e=a.ui[b].prototype;for(var f in d)e.plugins[f]=e.plugins[f]||[],e.plugins[f].push([c,d[f]])},call:function(a,b,c){var d=a.plugins[b];if(!d||!a.element[0].parentNode)return;for(var e=0;e<d.length;e++)a.options[d[e][0]]&&d[e][1].apply(a.element,c)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(b,c){if(a(b).css("overflow")==="hidden")return!1;var d=c&&c==="left"?"scrollLeft":"scrollTop",e=!1;return b[d]>0?!0:(b[d]=1,e=b[d]>0,b[d]=0,e)},isOverAxis:function(a,b,c){return a>b&&a<b+c},isOver:function(b,c,d,e,f,g){return a.ui.isOverAxis(b,d,f)&&a.ui.isOverAxis(c,e,g)}})})(jQuery);;
/*
 Copyright 2012 Igor Vaynberg

 Version: 3.1 Timestamp: Tue Aug 14 09:05:17 PDT 2012

 Licensed under the Apache License, Version 2.0 (the "License"); you may not use this work except in
 compliance with the License. You may obtain a copy of the License in the LICENSE file, or at:

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software distributed under the License is
 distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and limitations under the License.
 */
 (function ($) {
 	if(typeof $.fn.each2 == "undefined"){
 		$.fn.extend({
 			/*
			* 4-10 times faster .each replacement
			* use it carefully, as it overrides jQuery context of element on each iteration
			*/
			each2 : function (c) {
				var j = $([0]), i = -1, l = this.length;
				while (
					++i < l
					&& (j.context = j[0] = this[i])
					&& c.call(j[0], i, j) !== false //"this"=DOM, i=index, j=jQuery object
				);
				return this;
			}
 		});
 	}
})(jQuery);

(function ($, undefined) {
    "use strict";
    /*global document, window, jQuery, console */

    if (window.Select2 !== undefined) {
        return;
    }

    var KEY, AbstractSelect2, SingleSelect2, MultiSelect2, nextUid, sizer;

    KEY = {
        TAB: 9,
        ENTER: 13,
        ESC: 27,
        SPACE: 32,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        HOME: 36,
        END: 35,
        BACKSPACE: 8,
        DELETE: 46,
        isArrow: function (k) {
            k = k.which ? k.which : k;
            switch (k) {
            case KEY.LEFT:
            case KEY.RIGHT:
            case KEY.UP:
            case KEY.DOWN:
                return true;
            }
            return false;
        },
        isControl: function (e) {
            var k = e.which;
            switch (k) {
            case KEY.SHIFT:
            case KEY.CTRL:
            case KEY.ALT:
                return true;
            }

            if (e.metaKey) return true;

            return false;
        },
        isFunctionKey: function (k) {
            k = k.which ? k.which : k;
            return k >= 112 && k <= 123;
        }
    };

    nextUid=(function() { var counter=1; return function() { return counter++; }; }());

    function escapeMarkup(markup) {
        if (markup && typeof(markup) === "string") {
            return markup.replace(/&/g, "&amp;");
        } else {
            return markup;
        }
    }

    function indexOf(value, array) {
        var i = 0, l = array.length, v;

        if (typeof value === "undefined") {
          return -1;
        }

        if (value.constructor === String) {
            for (; i < l; i = i + 1) if (value.localeCompare(array[i]) === 0) return i;
        } else {
            for (; i < l; i = i + 1) {
                v = array[i];
                if (v.constructor === String) {
                    if (v.localeCompare(value) === 0) return i;
                } else {
                    if (v === value) return i;
                }
            }
        }
        return -1;
    }

    /**
     * Compares equality of a and b taking into account that a and b may be strings, in which case localeCompare is used
     * @param a
     * @param b
     */
    function equal(a, b) {
        if (a === b) return true;
        if (a === undefined || b === undefined) return false;
        if (a === null || b === null) return false;
        if (a.constructor === String) return a.localeCompare(b) === 0;
        if (b.constructor === String) return b.localeCompare(a) === 0;
        return false;
    }

    /**
     * Splits the string into an array of values, trimming each value. An empty array is returned for nulls or empty
     * strings
     * @param string
     * @param separator
     */
    function splitVal(string, separator) {
        var val, i, l;
        if (string === null || string.length < 1) return [];
        val = string.split(separator);
        for (i = 0, l = val.length; i < l; i = i + 1) val[i] = $.trim(val[i]);
        return val;
    }

    function getSideBorderPadding(element) {
        return element.outerWidth() - element.width();
    }

    function installKeyUpChangeEvent(element) {
        var key="keyup-change-value";
        element.bind("keydown", function () {
            if ($.data(element, key) === undefined) {
                $.data(element, key, element.val());
            }
        });
        element.bind("keyup", function () {
            var val= $.data(element, key);
            if (val !== undefined && element.val() !== val) {
                $.removeData(element, key);
                element.trigger("keyup-change");
            }
        });
    }

    $(document).delegate("*", "mousemove", function (e) {
        $.data(document, "select2-lastpos", {x: e.pageX, y: e.pageY});
    });

    /**
     * filters mouse events so an event is fired only if the mouse moved.
     *
     * filters out mouse events that occur when mouse is stationary but
     * the elements under the pointer are scrolled.
     */
    function installFilteredMouseMove(element) {
	    element.bind("mousemove", function (e) {
            var lastpos = $.data(document, "select2-lastpos");
            if (lastpos === undefined || lastpos.x !== e.pageX || lastpos.y !== e.pageY) {
                $(e.target).trigger("mousemove-filtered", e);
            }
        });
    }

    /**
     * Debounces a function. Returns a function that calls the original fn function only if no invocations have been made
     * within the last quietMillis milliseconds.
     *
     * @param quietMillis number of milliseconds to wait before invoking fn
     * @param fn function to be debounced
     * @return debounced version of fn
     */
    function debounce(quietMillis, fn) {
        var timeout;
        return function () {
            window.clearTimeout(timeout);
            timeout = window.setTimeout(fn, quietMillis);
        };
    }

    /**
     * A simple implementation of a thunk
     * @param formula function used to lazily initialize the thunk
     * @return {Function}
     */
    function thunk(formula) {
        var evaluated = false,
            value;
        return function() {
            if (evaluated === false) { value = formula(); evaluated = true; }
            return value;
        };
    };

    function installDebouncedScroll(threshold, element) {
        var notify = debounce(threshold, function (e) { element.trigger("scroll-debounced", e);});
        element.bind("scroll", function (e) {
            if (indexOf(e.target, element.get()) >= 0) notify(e);
        });
    }

    function killEvent(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    function measureTextWidth(e) {
        if (!sizer){
        	var style = e[0].currentStyle || window.getComputedStyle(e[0], null);
        	sizer = $("<div></div>").css({
	            position: "absolute",
	            left: "-10000px",
	            top: "-10000px",
	            display: "none",
	            fontSize: style.fontSize,
	            fontFamily: style.fontFamily,
	            fontStyle: style.fontStyle,
	            fontWeight: style.fontWeight,
	            letterSpacing: style.letterSpacing,
	            textTransform: style.textTransform,
	            whiteSpace: "nowrap"
	        });
        	$("body").append(sizer);
        }
        sizer.text(e.val());
        return sizer.width();
    }

    function markMatch(text, term, markup) {
        var match=text.toUpperCase().indexOf(term.toUpperCase()),
            tl=term.length;

        if (match<0) {
            markup.push(text);
            return;
        }

        markup.push(text.substring(0, match));
        markup.push("<span class='select2-match'>");
        markup.push(text.substring(match, match + tl));
        markup.push("</span>");
        markup.push(text.substring(match + tl, text.length));
    }

    /**
     * Produces an ajax-based query function
     *
     * @param options object containing configuration paramters
     * @param options.transport function that will be used to execute the ajax request. must be compatible with parameters supported by $.ajax
     * @param options.url url for the data
     * @param options.data a function(searchTerm, pageNumber, context) that should return an object containing query string parameters for the above url.
     * @param options.dataType request data type: ajax, jsonp, other datatatypes supported by jQuery's $.ajax function or the transport function if specified
     * @param options.traditional a boolean flag that should be true if you wish to use the traditional style of param serialization for the ajax request
     * @param options.quietMillis (optional) milliseconds to wait before making the ajaxRequest, helps debounce the ajax function if invoked too often
     * @param options.results a function(remoteData, pageNumber) that converts data returned form the remote request to the format expected by Select2.
     *      The expected format is an object containing the following keys:
     *      results array of objects that will be used as choices
     *      more (optional) boolean indicating whether there are more results available
     *      Example: {results:[{id:1, text:'Red'},{id:2, text:'Blue'}], more:true}
     */
    function ajax(options) {
        var timeout, // current scheduled but not yet executed request
            requestSequence = 0, // sequence used to drop out-of-order responses
            handler = null,
            quietMillis = options.quietMillis || 100;

        return function (query) {
            window.clearTimeout(timeout);
            timeout = window.setTimeout(function () {
                requestSequence += 1; // increment the sequence
                var requestNumber = requestSequence, // this request's sequence number
                    data = options.data, // ajax data function
                    transport = options.transport || $.ajax,
                    traditional = options.traditional || false,
                    type = options.type || 'GET'; // set type of request (GET or POST)

                data = data.call(this, query.term, query.page, query.context);

                if( null !== handler) { handler.abort(); }

                handler = transport.call(null, {
                    url: options.url,
                    dataType: options.dataType,
                    data: data,
                    type: type,
                    traditional: traditional,
                    success: function (data) {
                        if (requestNumber < requestSequence) {
                            return;
                        }
                        // TODO 3.0 - replace query.page with query so users have access to term, page, etc.
                        var results = options.results(data, query.page);
                        query.callback(results);
                    }
                });
            }, quietMillis);
        };
    }

    /**
     * Produces a query function that works with a local array
     *
     * @param options object containing configuration parameters. The options parameter can either be an array or an
     * object.
     *
     * If the array form is used it is assumed that it contains objects with 'id' and 'text' keys.
     *
     * If the object form is used ti is assumed that it contains 'data' and 'text' keys. The 'data' key should contain
     * an array of objects that will be used as choices. These objects must contain at least an 'id' key. The 'text'
     * key can either be a String in which case it is expected that each element in the 'data' array has a key with the
     * value of 'text' which will be used to match choices. Alternatively, text can be a function(item) that can extract
     * the text.
     */
    function local(options) {
        var data = options, // data elements
            dataText,
            text = function (item) { return ""+item.text; }; // function used to retrieve the text portion of a data item that is matched against the search

        if (!$.isArray(data)) {
            text = data.text;
            // if text is not a function we assume it to be a key name
            if (!$.isFunction(text)) {
              dataText = data.text; // we need to store this in a separate variable because in the next step data gets reset and data.text is no longer available
              text = function (item) { return item[dataText]; };
            }
            data = data.results;
        }

        return function (query) {
            var t = query.term, filtered = {};
            if (t === "") {
                query.callback({results: data});
                return;
            }
            filtered.results = $(data)
                .filter(function () {return query.matcher(t, text(this));})
                .get();
            query.callback(filtered);
        };
    }

    // TODO javadoc
    function tags(data) {
        // TODO even for a function we should probably return a wrapper that does the same object/string check as
        // the function for arrays. otherwise only functions that return objects are supported.
        if ($.isFunction(data)) {
            return data;
        }

        // if not a function we assume it to be an array

        return function (query) {
            var t = query.term, filtered = {results: []};
            $(data).each(function () {
                var isObject = this.text !== undefined,
                    text = isObject ? this.text : this;
                if (t === "" || query.matcher(t, text)) {
                    filtered.results.push(isObject ? this : {id: this, text: this});
                }
            });
            query.callback(filtered);
        };
    }

    /**
     * Checks if the formatter function should be used.
     *
     * Throws an error if it is not a function. Returns true if it should be used,
     * false if no formatting should be performed.
     *
     * @param formatter
     */
    function checkFormatter(formatter, formatterName) {
        if ($.isFunction(formatter)) return true;
        if (!formatter) return false;
        throw new Error("formatterName must be a function or a falsy value");
    }

    function evaluate(val) {
        return $.isFunction(val) ? val() : val;
    }

    function countResults(results) {
        var count = 0;
        $.each(results, function(i, item) {
            if (item.children) {
                count += countResults(item.children);
            } else {
                count++;
            }
        });
        return count;
    }

    /**
     * Default tokenizer. This function uses breaks the input on substring match of any string from the
     * opts.tokenSeparators array and uses opts.createSearchChoice to create the choice object. Both of those
     * two options have to be defined in order for the tokenizer to work.
     *
     * @param input text user has typed so far or pasted into the search field
     * @param selection currently selected choices
     * @param selectCallback function(choice) callback tho add the choice to selection
     * @param opts select2's opts
     * @return undefined/null to leave the current input unchanged, or a string to change the input to the returned value
     */
    function defaultTokenizer(input, selection, selectCallback, opts) {
        var original = input, // store the original so we can compare and know if we need to tell the search to update its text
            dupe = false, // check for whether a token we extracted represents a duplicate selected choice
            token, // token
            index, // position at which the separator was found
            i, l, // looping variables
            separator; // the matched separator

        if (!opts.createSearchChoice || !opts.tokenSeparators || opts.tokenSeparators.length < 1) return undefined;

        while (true) {
            index = -1;

            for (i = 0, l = opts.tokenSeparators.length; i < l; i++) {
                separator = opts.tokenSeparators[i];
                index = input.indexOf(separator);
                if (index >= 0) break;
            }

            if (index < 0) break; // did not find any token separator in the input string, bail

            token = input.substring(0, index);
            input = input.substring(index + separator.length);

            if (token.length > 0) {
                token = opts.createSearchChoice(token, selection);
                if (token !== undefined && token !== null && opts.id(token) !== undefined && opts.id(token) !== null) {
                    dupe = false;
                    for (i = 0, l = selection.length; i < l; i++) {
                        if (equal(opts.id(token), opts.id(selection[i]))) {
                            dupe = true; break;
                        }
                    }

                    if (!dupe) selectCallback(token);
                }
            }
        }

        if (original.localeCompare(input) != 0) return input;
    }

    /**
     * blurs any Select2 container that has focus when an element outside them was clicked or received focus
     *
     * also takes care of clicks on label tags that point to the source element
     */
    $(document).ready(function () {
        $(document).delegate("*", "mousedown touchend", function (e) {
            var target = $(e.target).closest("div.select2-container").get(0), attr;
            if (target) {
                $(document).find("div.select2-container-active").each(function () {
                    if (this !== target) $(this).data("select2").blur();
                });
            } else {
                target = $(e.target).closest("div.select2-drop").get(0);
                $(document).find("div.select2-drop-active").each(function () {
                    if (this !== target) $(this).data("select2").blur();
                });
            }

            target=$(e.target);
            attr = target.attr("for");
            if ("LABEL" === e.target.tagName && attr && attr.length > 0) {
                target = $("#"+attr);
                target = target.data("select2");
                if (target !== undefined) { target.focus(); e.preventDefault();}
            }
        });
    });

    /**
     * Creates a new class
     *
     * @param superClass
     * @param methods
     */
    function clazz(SuperClass, methods) {
        var constructor = function () {};
        constructor.prototype = new SuperClass;
        constructor.prototype.constructor = constructor;
        constructor.prototype.parent = SuperClass.prototype;
        constructor.prototype = $.extend(constructor.prototype, methods);
        return constructor;
    }

    AbstractSelect2 = clazz(Object, {

        // abstract
        bind: function (func) {
            var self = this;
            return function () {
                func.apply(self, arguments);
            };
        },

        // abstract
        init: function (opts) {
            var results, search, resultsSelector = ".select2-results";

            // prepare options
            this.opts = opts = this.prepareOpts(opts);

            this.id=opts.id;

            // destroy if called on an existing component
            if (opts.element.data("select2") !== undefined &&
                opts.element.data("select2") !== null) {
                this.destroy();
            }

            this.enabled=true;
            this.container = this.createContainer();

            this.containerId="s2id"+nextUid();
            this.container.attr("id", this.containerId);

            // cache the body so future lookups are cheap
            this.body = thunk(function() { return opts.element.closest("body"); });

            if (opts.element.attr("class") !== undefined) {
                this.container.addClass(opts.element.attr("class"));
            }

            this.container.css(evaluate(opts.containerCss));
            this.container.addClass(evaluate(opts.containerCssClass));

            // swap container for the element
            this.opts.element
                .data("select2", this)
                .hide()
                .before(this.container);
            this.container.data("select2", this);

            this.dropdown = this.container.find(".select2-drop");
            this.dropdown.addClass(evaluate(opts.dropdownCssClass));
            this.dropdown.data("select2", this);

            this.results = results = this.container.find(resultsSelector);
            this.search = search = this.container.find("input.select2-input");

            search.attr("tabIndex", this.opts.element.attr("tabIndex"));

            this.resultsPage = 0;
            this.context = null;

            // initialize the container
            this.initContainer();
            this.initContainerWidth();

            installFilteredMouseMove(this.results);
            this.dropdown.delegate(resultsSelector, "mousemove-filtered", this.bind(this.highlightUnderEvent));

            installDebouncedScroll(80, this.results);
            this.dropdown.delegate(resultsSelector, "scroll-debounced", this.bind(this.loadMoreIfNeeded));

            // if jquery.mousewheel plugin is installed we can prevent out-of-bounds scrolling of results via mousewheel
            if ($.fn.mousewheel) {
                results.mousewheel(function (e, delta, deltaX, deltaY) {
                    var top = results.scrollTop(), height;
                    if (deltaY > 0 && top - deltaY <= 0) {
                        results.scrollTop(0);
                        killEvent(e);
                    } else if (deltaY < 0 && results.get(0).scrollHeight - results.scrollTop() + deltaY <= results.height()) {
                        results.scrollTop(results.get(0).scrollHeight - results.height());
                        killEvent(e);
                    }
                });
            }

            installKeyUpChangeEvent(search);
            search.bind("keyup-change", this.bind(this.updateResults));
            search.bind("focus", function () { search.addClass("select2-focused"); if (search.val() === " ") search.val(""); });
            search.bind("blur", function () { search.removeClass("select2-focused");});

            this.dropdown.delegate(resultsSelector, "mouseup", this.bind(function (e) {
                if ($(e.target).closest(".select2-result-selectable:not(.select2-disabled)").length > 0) {
                    this.highlightUnderEvent(e);
                    this.selectHighlighted(e);
                } else {
                    this.focusSearch();
                }
                killEvent(e);
            }));

            // trap all mouse events from leaving the dropdown. sometimes there may be a modal that is listening
            // for mouse events outside of itself so it can close itself. since the dropdown is now outside the select2's
            // dom it will trigger the popup close, which is not what we want
            this.dropdown.bind("click mouseup mousedown", function (e) { e.stopPropagation(); });

            if ($.isFunction(this.opts.initSelection)) {
                // initialize selection based on the current value of the source element
                this.initSelection();

                // if the user has provided a function that can set selection based on the value of the source element
                // we monitor the change event on the element and trigger it, allowing for two way synchronization
                this.monitorSource();
            }

            if (opts.element.is(":disabled") || opts.element.is("[readonly='readonly']")) this.disable();
        },

        // abstract
        destroy: function () {
            var select2 = this.opts.element.data("select2");
            if (select2 !== undefined) {
                select2.container.remove();
                select2.dropdown.remove();
                select2.opts.element
                    .removeData("select2")
                    .unbind(".select2")
                    .show();
            }
        },

        // abstract
        prepareOpts: function (opts) {
            var element, select, idKey, ajaxUrl;

            element = opts.element;

            if (element.get(0).tagName.toLowerCase() === "select") {
                this.select = select = opts.element;
            }

            if (select) {
                // these options are not allowed when attached to a select because they are picked up off the element itself
                $.each(["id", "multiple", "ajax", "query", "createSearchChoice", "initSelection", "data", "tags"], function () {
                    if (this in opts) {
                        throw new Error("Option '" + this + "' is not allowed for Select2 when attached to a <select> element.");
                    }
                });
            }

            opts = $.extend({}, {
                populateResults: function(container, results, query) {
                    var populate,  data, result, children, id=this.opts.id, self=this;

                    populate=function(results, container, depth) {

                        var i, l, result, selectable, compound, node, label, innerContainer, formatted;
                        for (i = 0, l = results.length; i < l; i = i + 1) {

                            result=results[i];
                            selectable=id(result) !== undefined;
                            compound=("children" in result) && result.children.length > 0;

                            node=$("<li></li>");
                            node.addClass("select2-results-dept-"+depth);
                            node.addClass("select2-result");
                            node.addClass(selectable ? "select2-result-selectable" : "select2-result-unselectable");
                            if (compound) { node.addClass("select2-result-with-children"); }
                            node.addClass(self.opts.formatResultCssClass(result));

                            label=$("<div></div>");
                            label.addClass("select2-result-label");

                            formatted=opts.formatResult(result, label, query);
                            if (formatted!==undefined) {
                                label.html(escapeMarkup(formatted));
                            }

                            node.append(label);

                            if (compound) {

                                innerContainer=$("<ul></ul>");
                                innerContainer.addClass("select2-result-sub");
                                populate(result.children, innerContainer, depth+1);
                                node.append(innerContainer);
                            }

                            node.data("select2-data", result);
                            container.append(node);
                        }
                    };

                    populate(results, container, 0);
                }
            }, $.fn.select2.defaults, opts);

            if (typeof(opts.id) !== "function") {
                idKey = opts.id;
                opts.id = function (e) { return e[idKey]; };
            }

            if (select) {
                opts.query = this.bind(function (query) {
                    var data = { results: [], more: false },
                        term = query.term,
                        children, firstChild, process;

                    process=function(element, collection) {
                        var group;
                        if (element.is("option")) {
                            if (query.matcher(term, element.text(), element)) {
                                collection.push({id:element.attr("value"), text:element.text(), element: element.get(), css: element.attr("class")});
                            }
                        } else if (element.is("optgroup")) {
                            group={text:element.attr("label"), children:[], element: element.get(), css: element.attr("class")};
                            element.children().each2(function(i, elm) { process(elm, group.children); });
                            if (group.children.length>0) {
                                collection.push(group);
                            }
                        }
                    };

                    children=element.children();

                    // ignore the placeholder option if there is one
                    if (this.getPlaceholder() !== undefined && children.length > 0) {
                        firstChild = children[0];
                        if ($(firstChild).text() === "") {
                            children=children.not(firstChild);
                        }
                    }

                    children.each2(function(i, elm) { process(elm, data.results); });

                    query.callback(data);
                });

								//WPCOM: allow user to create new options when tagging using select element
                //  this allows displaying an optgroup hierarchy even when tagging
                if ( opts.element.attr("multiple") )
                  opts.createSearchChoice = function (term) { return {id: term, text: term}; };

                // this is needed because inside val() we construct choices from options and there id is hardcoded
                opts.id=function(e) { return e.id; };
                opts.formatResultCssClass = function(data) { return data.css; }
            } else {
                if (!("query" in opts)) {
                    if ("ajax" in opts) {
                        ajaxUrl = opts.element.data("ajax-url");
                        if (ajaxUrl && ajaxUrl.length > 0) {
                            opts.ajax.url = ajaxUrl;
                        }
                        opts.query = ajax(opts.ajax);
                    } else if ("data" in opts) {
                        opts.query = local(opts.data);
                    } else if ("tags" in opts) {
                        opts.query = tags(opts.tags);
                        opts.createSearchChoice = function (term) { return {id: term, text: term}; };
                        opts.initSelection = function (element, callback) {
                            var data = [];
                            $(splitVal(element.val(), opts.separator)).each(function () {
                                var id = this, text = this, tags=opts.tags;
                                if ($.isFunction(tags)) tags=tags();
                                $(tags).each(function() { if (equal(this.id, id)) { text = this.text; return false; } });
                                data.push({id: id, text: text});
                            });

                            callback(data);
                        };
                    }
                }
            }
            if (typeof(opts.query) !== "function") {
                throw "query function not defined for Select2 " + opts.element.attr("id");
            }

            return opts;
        },

        /**
         * Monitor the original element for changes and update select2 accordingly
         */
        // abstract
        monitorSource: function () {
            this.opts.element.bind("change.select2", this.bind(function (e) {
                if (this.opts.element.data("select2-change-triggered") !== true) {
                    this.initSelection();
                }
            }));
        },

        /**
         * Triggers the change event on the source element
         */
        // abstract
        triggerChange: function (details) {

            details = details || {};
            details= $.extend({}, details, { type: "change", val: this.val() });
            // prevents recursive triggering
            this.opts.element.data("select2-change-triggered", true);
            this.opts.element.trigger(details);
            this.opts.element.data("select2-change-triggered", false);

            // some validation frameworks ignore the change event and listen instead to keyup, click for selects
            // so here we trigger the click event manually
            this.opts.element.click();
        },


        // abstract
        enable: function() {
            if (this.enabled) return;

            this.enabled=true;
            this.container.removeClass("select2-container-disabled");
        },

        // abstract
        disable: function() {
            if (!this.enabled) return;

            this.close();

            this.enabled=false;
            this.container.addClass("select2-container-disabled");
        },

        // abstract
        opened: function () {
            return this.container.hasClass("select2-dropdown-open");
        },

        // abstract
        positionDropdown: function() {
            var offset = this.container.offset(),
                height = this.container.outerHeight(),
                width = this.container.outerWidth(),
                dropHeight = this.dropdown.outerHeight(),
                viewportBottom = $(window).scrollTop() + document.documentElement.clientHeight,
                dropTop = offset.top + height,
                enoughRoomBelow = dropTop + dropHeight <= viewportBottom,
                enoughRoomAbove = (offset.top - dropHeight) >= this.body().scrollTop(),
                aboveNow = this.dropdown.hasClass("select2-drop-above"),
                above,
                css;

            // console.log("below/ droptop:", dropTop, "dropHeight", dropHeight, "sum", (dropTop+dropHeight)+" viewport bottom", viewportBottom, "enough?", enoughRoomBelow);
            // console.log("above/ offset.top", offset.top, "dropHeight", dropHeight, "top", (offset.top-dropHeight), "scrollTop", this.body().scrollTop(), "enough?", enoughRoomAbove);

            // always prefer the current above/below alignment, unless there is not enough room

            if (aboveNow) {
                above = true;
                if (!enoughRoomAbove && enoughRoomBelow) above = false;
            } else {
                above = false;
                if (!enoughRoomBelow && enoughRoomAbove) above = true;
            }

            if (above) {
                dropTop = offset.top - dropHeight;
                this.container.addClass("select2-drop-above");
                this.dropdown.addClass("select2-drop-above");
            }
            else {
                this.container.removeClass("select2-drop-above");
                this.dropdown.removeClass("select2-drop-above");
            }

            css = {
                top:dropTop,
                left:offset.left,
                width:width
            };

            this.dropdown.css(css);
        },

        // abstract
        shouldOpen: function() {
            var event;

            if (this.opened()) return false;

            event = jQuery.Event("open");
            this.opts.element.trigger(event);
            return !event.isDefaultPrevented();
        },

        // abstract
        clearDropdownAlignmentPreference: function() {
            // clear the classes used to figure out the preference of where the dropdown should be opened
            this.container.removeClass("select2-drop-above");
            this.dropdown.removeClass("select2-drop-above");
        },

        /**
         * Opens the dropdown
         *
         * @return {Boolean} whether or not dropdown was opened. This method will return false if, for example,
         * the dropdown is already open, or if the 'open' event listener on the element called preventDefault().
         */
        // abstract
        open: function () {

            if (!this.shouldOpen()) return false;

            window.setTimeout(this.bind(this.opening), 1);

            return true;
        },

        /**
         * Performs the opening of the dropdown
         */
        // abstract
        opening: function() {
            var cid = this.containerId, selector = "#"+ cid,
                scroll = "scroll." + cid, resize = "resize." + cid;

            this.container.parents().each(function() {
                $(this).bind(scroll, function() {
                    var s2 = $(selector);
                    if (s2.length == 0) {
                        $(this).unbind(scroll);
                    }
                    s2.select2("close");
                });
            });

            $(window).bind(resize, function() {
                var s2 = $(selector);
                if (s2.length == 0) {
                    $(window).unbind(resize);
                }
                s2.select2("close");
            });

            this.clearDropdownAlignmentPreference();

            if (this.search.val() === " ") { this.search.val(""); }

            this.dropdown.css(evaluate(this.opts.dropdownCss));
            this.dropdown.addClass("select2-drop-active");
            this.container.addClass("select2-dropdown-open").addClass("select2-container-active");

            this.updateResults(true);

            if(this.dropdown[0] !== this.body().children().last()[0]) {
                this.dropdown.detach().appendTo(this.body());
            }

            this.dropdown.show();
            this.ensureHighlightVisible();

            this.positionDropdown();

            this.focusSearch();

            /* WPCOM Change */
            /* Hack to force a redraw, Chrome needs it when a canvas element is present on the page */
            var target = $('canvas').get(0);
            if ( typeof target != 'undefined' ) {
                target.style.display='none';
                target.offsetHeight;
                target.style.display='inline-block';
            }
        },

        // abstract
        close: function () {
            if (!this.opened()) return;

            var self = this;

            this.container.parents().each(function() {
                $(this).unbind("scroll." + self.containerId);
            });
            $(window).unbind("resize." + this.containerId);

            this.clearDropdownAlignmentPreference();

            this.dropdown.hide();
            this.container.removeClass("select2-dropdown-open").removeClass("select2-container-active");
            this.results.empty();
            this.clearSearch();

            this.opts.element.trigger(jQuery.Event("close"));
        },

        // abstract
        clearSearch: function () {

        },

        // abstract
        ensureHighlightVisible: function () {
            var results = this.results, children, index, child, hb, rb, y, more;

            index = this.highlight();

            if (index < 0) return;

            if (index == 0) {

                // if the first element is highlighted scroll all the way to the top,
                // that way any unselectable headers above it will also be scrolled
                // into view

                results.scrollTop(0);
                return;
            }

            children = results.find(".select2-result-selectable");

            child = $(children[index]);

            hb = child.offset().top + child.outerHeight();

            // if this is the last child lets also make sure select2-more-results is visible
            if (index === children.length - 1) {
                more = results.find("li.select2-more-results");
                if (more.length > 0) {
                    hb = more.offset().top + more.outerHeight();
                }
            }

            rb = results.offset().top + results.outerHeight();
            if (hb > rb) {
                results.scrollTop(results.scrollTop() + (hb - rb));
            }
            y = child.offset().top - results.offset().top;

            // make sure the top of the element is visible
            if (y < 0) {
                results.scrollTop(results.scrollTop() + y); // y is negative
            }
        },

        // abstract
        moveHighlight: function (delta) {
            var choices = this.results.find(".select2-result-selectable"),
                index = this.highlight();

            while (index > -1 && index < choices.length) {
                index += delta;
                var choice = $(choices[index]);
                if (choice.hasClass("select2-result-selectable") && !choice.hasClass("select2-disabled")) {
                    this.highlight(index);
                    break;
                }
            }
        },

        // abstract
        highlight: function (index) {
            var choices = this.results.find(".select2-result-selectable").not(".select2-disabled");

            if (arguments.length === 0) {
                return indexOf(choices.filter(".select2-highlighted")[0], choices.get());
            }

            if (index >= choices.length) index = choices.length - 1;
            if (index < 0) index = 0;

            choices.removeClass("select2-highlighted");

            $(choices[index]).addClass("select2-highlighted");
            this.ensureHighlightVisible();

        },

        // abstract
        countSelectableResults: function() {
            return this.results.find(".select2-result-selectable").not(".select2-disabled").length;
        },

        // abstract
        highlightUnderEvent: function (event) {
            var el = $(event.target).closest(".select2-result-selectable");
            if (el.length > 0 && !el.is(".select2-highlighted")) {
        		var choices = this.results.find('.select2-result-selectable');
                this.highlight(choices.index(el));
            } else if (el.length == 0) {
                // if we are over an unselectable item remove al highlights
                this.results.find(".select2-highlighted").removeClass("select2-highlighted");
            }
        },

        // abstract
        loadMoreIfNeeded: function () {
            var results = this.results,
                more = results.find("li.select2-more-results"),
                below, // pixels the element is below the scroll fold, below==0 is when the element is starting to be visible
                offset = -1, // index of first element without data
                page = this.resultsPage + 1,
                self=this,
                term=this.search.val(),
                context=this.context;

            if (more.length === 0) return;
            below = more.offset().top - results.offset().top - results.height();

            if (below <= 0) {
                more.addClass("select2-active");
                this.opts.query({
                        term: term,
                        page: page,
                        context: context,
                        matcher: this.opts.matcher,
                        callback: this.bind(function (data) {

                    self.opts.populateResults.call(this, results, data.results, {term: term, page: page, context:context});

                    if (data.more===true) {
                        more.detach().appendTo(results).text(self.opts.formatLoadMore(page+1));
                        window.setTimeout(function() { self.loadMoreIfNeeded(); }, 10);
                    } else {
                        more.remove();
                    }
                    self.positionDropdown();
                    self.resultsPage = page;
                })});
            }
        },

        /**
         * Default tokenizer function which does nothing
         */
        tokenize: function() {

        },

        /**
         * @param initial whether or not this is the call to this method right after the dropdown has been opened
         */
        // abstract
        updateResults: function (initial) {
            var search = this.search, results = this.results, opts = this.opts, data, self=this, input;

            // if the search is currently hidden we do not alter the results
            if (initial !== true && (this.showSearchInput === false || !this.opened())) {
                return;
            }

            search.addClass("select2-active");

            function postRender() {
                results.scrollTop(0);
                search.removeClass("select2-active");
                self.positionDropdown();
            }

            function render(html) {
                results.html(escapeMarkup(html));
                postRender();
            }

            if (opts.maximumSelectionSize >=1) {
                data = this.data();
                if ($.isArray(data) && data.length >= opts.maximumSelectionSize && checkFormatter(opts.formatSelectionTooBig, "formatSelectionTooBig")) {
            	    render("<li class='select2-selection-limit'>" + opts.formatSelectionTooBig(opts.maximumSelectionSize) + "</li>");
            	    return;
                }
            }

            if (search.val().length < opts.minimumInputLength && checkFormatter(opts.formatInputTooShort, "formatInputTooShort")) {
                render("<li class='select2-no-results'>" + opts.formatInputTooShort(search.val(), opts.minimumInputLength) + "</li>");
                return;
            }
            else {
                render("<li class='select2-searching'>" + opts.formatSearching() + "</li>");
            }

            // give the tokenizer a chance to pre-process the input
            input = this.tokenize();
            if (input != undefined && input != null) {
                search.val(input);
            }

            this.resultsPage = 1;
            opts.query({
                    term: search.val(),
                    page: this.resultsPage,
                    context: null,
                    matcher: opts.matcher,
                    callback: this.bind(function (data) {
                var def; // default choice

                // save context, if any
                this.context = (data.context===undefined) ? null : data.context;

                // create a default choice and prepend it to the list
                if (this.opts.createSearchChoice && search.val() !== "") {
                    def = this.opts.createSearchChoice.call(null, search.val(), data.results);
                    if (def !== undefined && def !== null && self.id(def) !== undefined && self.id(def) !== null) {
                        if ($(data.results).filter(
                            function () {
                                return equal(self.id(this), self.id(def));
                            }).length === 0) {
                            data.results.unshift(def);
                        }
                    }
                }

                if (data.results.length === 0 && checkFormatter(opts.formatNoMatches, "formatNoMatches")) {
                    render("<li class='select2-no-results'>" + opts.formatNoMatches(search.val()) + "</li>");
                    return;
                }

                results.empty();
                self.opts.populateResults.call(this, results, data.results, {term: search.val(), page: this.resultsPage, context:null});

                if (data.more === true && checkFormatter(opts.formatLoadMore, "formatLoadMore")) {
                    results.append("<li class='select2-more-results'>" + escapeMarkup(opts.formatLoadMore(this.resultsPage)) + "</li>");
                    window.setTimeout(function() { self.loadMoreIfNeeded(); }, 10);
                }

                this.postprocessResults(data, initial);

                postRender();
            })});
        },

        // abstract
        cancel: function () {
            this.close();
        },

        // abstract
        blur: function () {
            this.close();
            this.container.removeClass("select2-container-active");
            this.dropdown.removeClass("select2-drop-active");
            // synonymous to .is(':focus'), which is available in jquery >= 1.6
            if (this.search[0] === document.activeElement) { this.search.blur(); }
            this.clearSearch();
            this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");
        },

        // abstract
        focusSearch: function () {
            /* we do this in a timeout so that current event processing can complete before this code is executed.
             this makes sure the search field is focussed even if the current event would blur it */
            window.setTimeout(this.bind(function () {
                this.search.focus();
                // reset the value so IE places the cursor at the end of the input box
                this.search.val(this.search.val());
            }), 10);
        },

        // abstract
        selectHighlighted: function () {
            var index=this.highlight(),
                highlighted=this.results.find(".select2-highlighted").not(".select2-disabled"),
                data = highlighted.closest('.select2-result-selectable').data("select2-data");
            if (data) {
                highlighted.addClass("select2-disabled");
                this.highlight(index);
                this.onSelect(data);
            }
        },

        // abstract
        getPlaceholder: function () {
            return this.opts.element.attr("placeholder") ||
                this.opts.element.attr("data-placeholder") || // jquery 1.4 compat
                this.opts.element.data("placeholder") ||
                this.opts.placeholder;
        },

        /**
         * Get the desired width for the container element.  This is
         * derived first from option `width` passed to select2, then
         * the inline 'style' on the original element, and finally
         * falls back to the jQuery calculated element width.
         */
        // abstract
        initContainerWidth: function () {
            function resolveContainerWidth() {
                var style, attrs, matches, i, l;

                if (this.opts.width === "off") {
                    return null;
                } else if (this.opts.width === "element"){
                    return this.opts.element.outerWidth() === 0 ? 'auto' : this.opts.element.outerWidth() + 'px';
                } else if (this.opts.width === "copy" || this.opts.width === "resolve") {
                    // check if there is inline style on the element that contains width
                    style = this.opts.element.attr('style');
                    if (style !== undefined) {
                        attrs = style.split(';');
                        for (i = 0, l = attrs.length; i < l; i = i + 1) {
                            matches = attrs[i].replace(/\s/g, '')
                                .match(/width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/);
                            if (matches !== null && matches.length >= 1)
                                return matches[1];
                        }
                    }

                    if (this.opts.width === "resolve") {
                        // next check if css('width') can resolve a width that is percent based, this is sometimes possible
                        // when attached to input type=hidden or elements hidden via css
                        style = this.opts.element.css('width');
                        if (style.indexOf("%") > 0) return style;

                        // finally, fallback on the calculated width of the element
                        return (this.opts.element.outerWidth() === 0 ? 'auto' : this.opts.element.outerWidth() + 'px');
                    }

                    return null;
                } else if ($.isFunction(this.opts.width)) {
                    return this.opts.width();
                } else {
                    return this.opts.width;
               }
            };

            var width = resolveContainerWidth.call(this);
            if (width !== null) {
                this.container.attr("style", "width: "+width);
            }
        }
    });

    SingleSelect2 = clazz(AbstractSelect2, {

        // single

		createContainer: function () {
            var container = $("<div></div>", {
                "class": "select2-container"
            }).html([
                "    <a href='javascript:void(0)' class='select2-choice'>",
                "   <span></span><abbr class='select2-search-choice-close' style='display:none;'></abbr>",
                "   <div><b></b></div>" ,
                "</a>",
                "    <div class='select2-drop select2-offscreen'>" ,
                "   <div class='select2-search'>" ,
                "       <input type='text' autocomplete='off' class='select2-input'/>" ,
                "   </div>" ,
                "   <ul class='select2-results'>" ,
                "   </ul>" ,
                "</div>"].join(""));
            return container;
        },

        // single
        opening: function () {
            this.search.show();
            this.parent.opening.apply(this, arguments);
            this.dropdown.removeClass("select2-offscreen");
        },

        // single
        close: function () {
            if (!this.opened()) return;
            this.parent.close.apply(this, arguments);
            this.dropdown.removeAttr("style").addClass("select2-offscreen").insertAfter(this.selection).show();
        },

        // single
        focus: function () {
            this.close();
            this.selection.focus();
        },

        // single
        isFocused: function () {
            return this.selection[0] === document.activeElement;
        },

        // single
        cancel: function () {
            this.parent.cancel.apply(this, arguments);
            this.selection.focus();
        },

        // single
        initContainer: function () {

            var selection,
                container = this.container,
                dropdown = this.dropdown,
                clickingInside = false;

            this.selection = selection = container.find(".select2-choice");

            this.search.bind("keydown", this.bind(function (e) {
                if (!this.enabled) return;

                if (e.which === KEY.PAGE_UP || e.which === KEY.PAGE_DOWN) {
                    // prevent the page from scrolling
                    killEvent(e);
                    return;
                }

                if (this.opened()) {
                    switch (e.which) {
                        case KEY.UP:
                        case KEY.DOWN:
                            this.moveHighlight((e.which === KEY.UP) ? -1 : 1);
                            killEvent(e);
                            return;
                        case KEY.TAB:
                        case KEY.ENTER:
                            this.selectHighlighted();
                            killEvent(e);
                            return;
                        case KEY.ESC:
                            this.cancel(e);
                            killEvent(e);
                            return;
                    }
                } else {

                    if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC) {
                        return;
                    }

                    if (this.opts.openOnEnter === false && e.which === KEY.ENTER) {
                        return;
                    }

                    this.open();

                    if (e.which === KEY.ENTER) {
                        // do not propagate the event otherwise we open, and propagate enter which closes
                        return;
                    }
                }
            }));

            this.search.bind("focus", this.bind(function() {
                this.selection.attr("tabIndex", "-1");
            }));
            this.search.bind("blur", this.bind(function() {
                if (!this.opened()) this.container.removeClass("select2-container-active");
                window.setTimeout(this.bind(function() { this.selection.attr("tabIndex", this.opts.element.attr("tabIndex")); }), 10);
            }));

            selection.bind("mousedown", this.bind(function (e) {
                clickingInside = true;

                if (this.opened()) {
                    this.close();
                    this.selection.focus();
                } else if (this.enabled) {
                    this.open();
                }

                clickingInside = false;
            }));

            dropdown.bind("mousedown", this.bind(function() { this.search.focus(); }));

            selection.bind("focus", this.bind(function() {
                this.container.addClass("select2-container-active");
                // hide the search so the tab key does not focus on it
                this.search.attr("tabIndex", "-1");
            }));

            selection.bind("blur", this.bind(function() {
                if (!this.opened()) {
                    this.container.removeClass("select2-container-active");
                }
                window.setTimeout(this.bind(function() { this.search.attr("tabIndex", this.opts.element.attr("tabIndex")); }), 10);
            }));

            selection.bind("keydown", this.bind(function(e) {
                if (!this.enabled) return;

                if (e.which === KEY.PAGE_UP || e.which === KEY.PAGE_DOWN) {
                    // prevent the page from scrolling
                    killEvent(e);
                    return;
                }

                if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e)
                 || e.which === KEY.ESC) {
                    return;
                }

                if (this.opts.openOnEnter === false && e.which === KEY.ENTER) {
                    return;
                }

                if (e.which == KEY.DELETE) {
                    if (this.opts.allowClear) {
                        this.clear();
                    }
                    return;
                }

                this.open();

                if (e.which === KEY.ENTER) {
                    // do not propagate the event otherwise we open, and propagate enter which closes
                    killEvent(e);
                    return;
                }

                // do not set the search input value for non-alpha-numeric keys
                // otherwise pressing down results in a '(' being set in the search field
                if (e.which < 48 ) { // '0' == 48
                    killEvent(e);
                    return;
                }

                var keyWritten = String.fromCharCode(e.which).toLowerCase();

                if (e.shiftKey) {
                    keyWritten = keyWritten.toUpperCase();
                }

                // focus the field before calling val so the cursor ends up after the value instead of before
                this.search.focus();
                this.search.val(keyWritten);

                // prevent event propagation so it doesnt replay on the now focussed search field and result in double key entry
                killEvent(e);
            }));

            selection.delegate("abbr", "mousedown", this.bind(function (e) {
                if (!this.enabled) return;
                this.clear();
                killEvent(e);
                this.close();
                this.triggerChange();
                this.selection.focus();
            }));

            this.setPlaceholder();

            this.search.bind("focus", this.bind(function() {
                this.container.addClass("select2-container-active");
            }));
        },

        // single
        clear: function() {
            this.opts.element.val("");
            this.selection.find("span").empty();
            this.selection.removeData("select2-data");
            this.setPlaceholder();
        },

        /**
         * Sets selection based on source element's value
         */
        // single
        initSelection: function () {
            var selected;
            if (this.opts.element.val() === "") {
                this.close();
                this.setPlaceholder();
            } else {
                var self = this;
                this.opts.initSelection.call(null, this.opts.element, function(selected){
                    if (selected !== undefined && selected !== null) {
                        self.updateSelection(selected);
                        self.close();
                        self.setPlaceholder();
                    }
                });
            }
        },

        // single
        prepareOpts: function () {
            var opts = this.parent.prepareOpts.apply(this, arguments);

            if (opts.element.get(0).tagName.toLowerCase() === "select") {
                // install the selection initializer
                opts.initSelection = function (element, callback) {
                    var selected = element.find(":selected");
                    // a single select box always has a value, no need to null check 'selected'
                    if ($.isFunction(callback))
                        callback({id: selected.attr("value"), text: selected.text()});
                };
            }

            return opts;
        },

        // single
        setPlaceholder: function () {
            var placeholder = this.getPlaceholder();

            if (this.opts.element.val() === "" && placeholder !== undefined) {

                // check for a first blank option if attached to a select
                if (this.select && this.select.find("option:first").text() !== "") return;

                this.selection.find("span").html(escapeMarkup(placeholder));

                this.selection.addClass("select2-default");

                this.selection.find("abbr").hide();
            }
        },

        // single
        postprocessResults: function (data, initial) {
            var selected = 0, self = this, showSearchInput = true;

            // find the selected element in the result list

            this.results.find(".select2-result-selectable").each2(function (i, elm) {
                if (equal(self.id(elm.data("select2-data")), self.opts.element.val())) {
                    selected = i;
                    return false;
                }
            });

            // and highlight it

            this.highlight(selected);

            // hide the search box if this is the first we got the results and there are a few of them

            if (initial === true) {
                showSearchInput = this.showSearchInput = countResults(data.results) >= this.opts.minimumResultsForSearch;
                this.dropdown.find(".select2-search")[showSearchInput ? "removeClass" : "addClass"]("select2-search-hidden");

                //add "select2-with-searchbox" to the container if search box is shown
                $(this.dropdown, this.container)[showSearchInput ? "addClass" : "removeClass"]("select2-with-searchbox");
            }

        },

        // single
        onSelect: function (data) {
            var old = this.opts.element.val();

            this.opts.element.val(this.id(data));
            this.updateSelection(data);
            this.close();
            this.selection.focus();

            if (!equal(old, this.id(data))) { this.triggerChange(); }
        },

        // single
        updateSelection: function (data) {

            var container=this.selection.find("span"), formatted;

            this.selection.data("select2-data", data);

            container.empty();
            formatted=this.opts.formatSelection(data, container);
            if (formatted !== undefined) {
                container.append(escapeMarkup(formatted));
            }

            this.selection.removeClass("select2-default");

            if (this.opts.allowClear && this.getPlaceholder() !== undefined) {
                this.selection.find("abbr").show();
            }
        },

        // single
        val: function () {
            var val, data = null, self = this;

            if (arguments.length === 0) {
                return this.opts.element.val();
            }

            val = arguments[0];

            if (this.select) {
                this.select
                    .val(val)
                    .find(":selected").each2(function (i, elm) {
                        data = {id: elm.attr("value"), text: elm.text()};
                        return false;
                    });
                this.updateSelection(data);
                this.setPlaceholder();
            } else {
                if (this.opts.initSelection === undefined) {
                    throw new Error("cannot call val() if initSelection() is not defined");
                }
                // val is an id. !val is true for [undefined,null,'']
                if (!val) {
                    this.clear();
                    return;
                }
                this.opts.initSelection(this.opts.element, function(data){
                    self.opts.element.val(!data ? "" : self.id(data));
                    self.updateSelection(data);
                    self.setPlaceholder();
                });
            }
        },

        // single
        clearSearch: function () {
            this.search.val("");
        },

        // single
        data: function(value) {
            var data;

            if (arguments.length === 0) {
                data = this.selection.data("select2-data");
                if (data == undefined) data = null;
                return data;
            } else {
                if (!value || value === "") {
                    this.clear();
                } else {
                    this.opts.element.val(!value ? "" : this.id(value));
                    this.updateSelection(value);
                }
            }
        }
    });

    MultiSelect2 = clazz(AbstractSelect2, {

        // multi
        createContainer: function () {
            var container = $("<div></div>", {
                "class": "select2-container select2-container-multi"
            }).html([
                "    <ul class='select2-choices'>",
                //"<li class='select2-search-choice'><span>California</span><a href="javascript:void(0)" class="select2-search-choice-close"></a></li>" ,
                "  <li class='select2-search-field'>" ,
                "    <input type='text' autocomplete='off' class='select2-input'>" ,
                "  </li>" ,
                "</ul>" ,
                "<div class='select2-drop select2-drop-multi' style='display:none;'>" ,
                "   <ul class='select2-results'>" ,
                "   </ul>" ,
                "</div>"].join(""));
			return container;
        },

        // multi
        prepareOpts: function () {
            var opts = this.parent.prepareOpts.apply(this, arguments);

            // TODO validate placeholder is a string if specified

            if (opts.element.get(0).tagName.toLowerCase() === "select") {
                // install sthe selection initializer
                opts.initSelection = function (element,callback) {

                    var data = [];
                    element.find(":selected").each2(function (i, elm) {
                        data.push({id: elm.attr("value"), text: elm.text()});
                    });

                    if ($.isFunction(callback))
                        callback(data);
                };
            }

            return opts;
        },

        // multi
        initContainer: function () {

            var selector = ".select2-choices", selection;

            this.searchContainer = this.container.find(".select2-search-field");
            this.selection = selection = this.container.find(selector);

            this.search.bind("keydown", this.bind(function (e) {
                if (!this.enabled) return;

                if (e.which === KEY.BACKSPACE && this.search.val() === "") {
                    this.close();

                    var choices,
                        selected = selection.find(".select2-search-choice-focus");
                    if (selected.length > 0) {
                        this.unselect(selected.first());
                        this.search.width(10);
                        killEvent(e);
                        return;
                    }

                    choices = selection.find(".select2-search-choice");
                    if (choices.length > 0) {
                        choices.last().addClass("select2-search-choice-focus");
                    }
                } else {
                    selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");
                }

                if (this.opened()) {
                    switch (e.which) {
                    case KEY.UP:
                    case KEY.DOWN:
                        this.moveHighlight((e.which === KEY.UP) ? -1 : 1);
                        killEvent(e);
                        return;
                    case KEY.ENTER:
                    case KEY.TAB:
                        this.selectHighlighted();
                        killEvent(e);
                        return;
                    case KEY.ESC:
                        this.cancel(e);
                        killEvent(e);
                        return;
                    }
                }

                if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e)
                 || e.which === KEY.BACKSPACE || e.which === KEY.ESC) {
                    return;
                }

                if (this.opts.openOnEnter === false && e.which === KEY.ENTER) {
                    return;
                }

                this.open();

                if (e.which === KEY.PAGE_UP || e.which === KEY.PAGE_DOWN) {
                    // prevent the page from scrolling
                    killEvent(e);
                }
            }));

            this.search.bind("keyup", this.bind(this.resizeSearch));

            this.search.bind("blur", this.bind(function() {
                this.container.removeClass("select2-container-active");
            }));

            this.container.delegate(selector, "mousedown", this.bind(function (e) {
                if (!this.enabled) return;
                this.clearPlaceholder();
                this.open();
                this.focusSearch();
                e.preventDefault();
            }));

            this.container.delegate(selector, "focus", this.bind(function () {
                if (!this.enabled) return;
                this.container.addClass("select2-container-active");
                this.dropdown.addClass("select2-drop-active");
                this.clearPlaceholder();
            }));

            // set the placeholder if necessary
            this.clearSearch();
        },

        // multi
        enable: function() {
            if (this.enabled) return;

            this.parent.enable.apply(this, arguments);

            this.search.removeAttr("disabled");
        },

        // multi
        disable: function() {
            if (!this.enabled) return;

            this.parent.disable.apply(this, arguments);

            this.search.attr("disabled", true);
        },

        // multi
        initSelection: function () {
            var data;
            if (this.opts.element.val() === "") {
                this.updateSelection([]);
                this.close();
                // set the placeholder if necessary
                this.clearSearch();
            }
            if (this.select || this.opts.element.val() !== "") {
                var self = this;
                this.opts.initSelection.call(null, this.opts.element, function(data){
                    if (data !== undefined && data !== null) {
                        self.updateSelection(data);
                        self.close();
                        // set the placeholder if necessary
                        self.clearSearch();
                    }
                });
            }
        },

        // multi
        clearSearch: function () {
            var placeholder = this.getPlaceholder();

            if (placeholder !== undefined  && this.getVal().length === 0 && this.search.hasClass("select2-focused") === false) {
                this.search.val(placeholder).addClass("select2-default");
                // stretch the search box to full width of the container so as much of the placeholder is visible as possible
                this.resizeSearch();
            } else {
                // we set this to " " instead of "" and later clear it on focus() because there is a firefox bug
                // that does not properly render the caret when the field starts out blank
                this.search.val(" ").width(10);
            }
        },

        // multi
        clearPlaceholder: function () {
            if (this.search.hasClass("select2-default")) {
                this.search.val("").removeClass("select2-default");
            } else {
                // work around for the space character we set to avoid firefox caret bug
                if (this.search.val() === " ") this.search.val("");
            }
        },

        // multi
        opening: function () {
            this.parent.opening.apply(this, arguments);

            this.clearPlaceholder();
			this.resizeSearch();
            this.focusSearch();
        },

        // multi
        close: function () {
            if (!this.opened()) return;
            this.parent.close.apply(this, arguments);
        },

        // multi
        focus: function () {
            this.close();
            this.search.focus();
        },

        // multi
        isFocused: function () {
            return this.search.hasClass("select2-focused");
        },

        // multi
        updateSelection: function (data) {
            var ids = [], filtered = [], self = this;

            // filter out duplicates
            $(data).each(function () {
                if (indexOf(self.id(this), ids) < 0) {
                    ids.push(self.id(this));
                    filtered.push(this);
                }
            });
            data = filtered;

            this.selection.find(".select2-search-choice").remove();
            $(data).each(function () {
                self.addSelectedChoice(this);
            });
            self.postprocessResults();
        },

        tokenize: function() {
            var input = this.search.val();
            input = this.opts.tokenizer(input, this.data(), this.bind(this.onSelect), this.opts);
            if (input != null && input != undefined) {
                this.search.val(input);
                if (input.length > 0) {
                    this.open();
                }
            }

        },

        // multi
        onSelect: function (data) {
            this.addSelectedChoice(data);
            if (this.select) { this.postprocessResults(); }

            if (this.opts.closeOnSelect) {
                this.close();
                this.search.width(10);
            } else {
                if (this.countSelectableResults()>0) {
                    this.search.width(10);
                    this.resizeSearch();
                    this.positionDropdown();
                } else {
                    // if nothing left to select close
                    this.close();
                }
            }

            // since its not possible to select an element that has already been
            // added we do not need to check if this is a new element before firing change
            this.triggerChange({ added: data });

            this.focusSearch();
        },

        // multi
        cancel: function () {
            this.close();
            this.focusSearch();
        },

        // multi
        addSelectedChoice: function (data) {
            var choice=$(
                    "<li class='select2-search-choice'>" +
                    "    <div></div>" +
                    "    <a href='javascript:void(0)' class='select2-search-choice-close' tabindex='-1'></a>" +
                    "</li>"),
                id = this.id(data),
                val = this.getVal(),
                formatted;

            formatted=this.opts.formatSelection(data, choice);
            choice.find("div").replaceWith("<div>"+escapeMarkup(formatted)+"</div>");
            choice.find(".select2-search-choice-close")
                .bind("mousedown", killEvent)
                .bind("click dblclick", this.bind(function (e) {
                if (!this.enabled) return;

                $(e.target).closest(".select2-search-choice").fadeOut('fast').animate({width: "hide"}, 50, this.bind(function(){
                    this.unselect($(e.target));
                    this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");
                    this.close();
                    this.focusSearch();
                })).dequeue();
                killEvent(e);
            })).bind("focus", this.bind(function () {
                if (!this.enabled) return;
                this.container.addClass("select2-container-active");
                this.dropdown.addClass("select2-drop-active");
            }));

            choice.data("select2-data", data);
            choice.insertBefore(this.searchContainer);

            val.push(id);
            this.setVal(val);
        },

        // multi
        unselect: function (selected) {
            var val = this.getVal(),
                data,
                index;

            selected = selected.closest(".select2-search-choice");

            if (selected.length === 0) {
                throw "Invalid argument: " + selected + ". Must be .select2-search-choice";
            }

            data = selected.data("select2-data");

            index = indexOf(this.id(data), val);

            if (index >= 0) {
                val.splice(index, 1);
                this.setVal(val);
                if (this.select) this.postprocessResults();
            }
            selected.remove();
            this.triggerChange({ removed: data });
        },

        // multi
        postprocessResults: function () {
            var val = this.getVal(),
                choices = this.results.find(".select2-result-selectable"),
                compound = this.results.find(".select2-result-with-children"),
                self = this;

            choices.each2(function (i, choice) {
                var id = self.id(choice.data("select2-data"));
                if (indexOf(id, val) >= 0) {
                    choice.addClass("select2-disabled").removeClass("select2-result-selectable");
                } else {
                    choice.removeClass("select2-disabled").addClass("select2-result-selectable");
                }
            });

            compound.each2(function(i, e) {
                if (e.find(".select2-result-selectable").length==0) {
                    e.addClass("select2-disabled");
                } else {
                    e.removeClass("select2-disabled");
                }
            });

            choices.each2(function (i, choice) {
                if (!choice.hasClass("select2-disabled") && choice.hasClass("select2-result-selectable")) {
                    self.highlight(0);
                    return false;
                }
            });

        },

        // multi
        resizeSearch: function () {

            var minimumWidth, left, maxWidth, containerLeft, searchWidth,
            	sideBorderPadding = getSideBorderPadding(this.search);

            minimumWidth = measureTextWidth(this.search) + 10;

            left = this.search.offset().left;

            maxWidth = this.selection.width();
            containerLeft = this.selection.offset().left;

            searchWidth = maxWidth - (left - containerLeft) - sideBorderPadding;
            if (searchWidth < minimumWidth) {
                searchWidth = maxWidth - sideBorderPadding;
            }

            if (searchWidth < 40) {
                searchWidth = maxWidth - sideBorderPadding;
            }
            this.search.width(searchWidth);
        },

        // multi
        getVal: function () {
            var val;
            if (this.select) {
                val = this.select.val();
                return val === null ? [] : val;
            } else {
                val = this.opts.element.val();
                return splitVal(val, this.opts.separator);
            }
        },

        // multi
        setVal: function (val) {
            var unique;
            if (this.select) {
                this.select.val(val);
            } else {
                unique = [];
                // filter out duplicates
                $(val).each(function () {
                    if (indexOf(this, unique) < 0) unique.push(this);
                });
                this.opts.element.val(unique.length === 0 ? "" : unique.join(this.opts.separator));
            }
        },

        // multi
        val: function () {
            var val, data = [], self=this;

            if (arguments.length === 0) {
                return this.getVal();
            }

            val = arguments[0];

            if (!val) {
                this.opts.element.val("");
                this.updateSelection([]);
                this.clearSearch();
                return;
            }

            // val is a list of ids
            this.setVal(val);

            if (this.select) {
                this.select.find(":selected").each(function () {
                    data.push({id: $(this).attr("value"), text: $(this).text()});
                });
                this.updateSelection(data);
            } else {
                if (this.opts.initSelection === undefined) {
                    throw new Error("val() cannot be called if initSelection() is not defined")
                }

                this.opts.initSelection(this.opts.element, function(data){
                    var ids=$(data).map(self.id);
                    self.setVal(ids);
                    self.updateSelection(data);
                    self.clearSearch();
                });
            }
            this.clearSearch();
        },

        // multi
        onSortStart: function() {
            if (this.select) {
                throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");
            }

            // collapse search field into 0 width so its container can be collapsed as well
            this.search.width(0);
            // hide the container
            this.searchContainer.hide();
        },

        // multi
        onSortEnd:function() {

            var val=[], self=this;

            // show search and move it to the end of the list
            this.searchContainer.show();
            // make sure the search container is the last item in the list
            this.searchContainer.appendTo(this.searchContainer.parent());
            // since we collapsed the width in dragStarted, we resize it here
            this.resizeSearch();

            // update selection

            this.selection.find(".select2-search-choice").each(function() {
                val.push(self.opts.id($(this).data("select2-data")));
            });
            this.setVal(val);
            this.triggerChange();
        },

        // multi
        data: function(values) {
            var self=this, ids;
            if (arguments.length === 0) {
                 return this.selection
                     .find(".select2-search-choice")
                     .map(function() { return $(this).data("select2-data"); })
                     .get();
            } else {
                if (!values) { values = []; }
                ids = $.map(values, function(e) { return self.opts.id(e)});
                this.setVal(ids);
                this.updateSelection(values);
                this.clearSearch();
            }
        }
    });

    $.fn.select2 = function () {

        var args = Array.prototype.slice.call(arguments, 0),
            opts,
            select2,
            value, multiple, allowedMethods = ["val", "destroy", "opened", "open", "close", "focus", "isFocused", "container", "onSortStart", "onSortEnd", "enable", "disable", "positionDropdown", "data"];

        this.each(function () {
            if (args.length === 0 || typeof(args[0]) === "object") {
                opts = args.length === 0 ? {} : $.extend({}, args[0]);
                opts.element = $(this);

                if (opts.element.get(0).tagName.toLowerCase() === "select") {
                    multiple = opts.element.attr("multiple");
                } else {
                    multiple = opts.multiple || false;
                    if ("tags" in opts) {opts.multiple = multiple = true;}
                }

                select2 = multiple ? new MultiSelect2() : new SingleSelect2();
                select2.init(opts);
            } else if (typeof(args[0]) === "string") {

                if (indexOf(args[0], allowedMethods) < 0) {
                    throw "Unknown method: " + args[0];
                }

                value = undefined;
                select2 = $(this).data("select2");
                if (select2 === undefined) return;
                if (args[0] === "container") {
                    value=select2.container;
                } else {
                    value = select2[args[0]].apply(select2, args.slice(1));
                }
                if (value !== undefined) {return false;}
            } else {
                throw "Invalid arguments to select2 plugin: " + args;
            }
        });
        return (value === undefined) ? this : value;
    };

    // plugin defaults, accessible to users
    $.fn.select2.defaults = {
        width: "copy",
        closeOnSelect: true,
        openOnEnter: true,
        containerCss: {},
        dropdownCss: {},
        containerCssClass: "",
        dropdownCssClass: "",
        formatResult: function(result, container, query) {
            var markup=[];
            markMatch(result.text, query.term, markup);
            return markup.join("");
        },
        formatSelection: function (data, container) {
            return data.text;
        },
        formatResultCssClass: function(data) {return undefined;},
        formatNoMatches: function () { return "No matches found"; },
        formatInputTooShort: function (input, min) { return "Please enter " + (min - input.length) + " more characters"; },
        formatSelectionTooBig: function (limit) { return "You can only select " + limit + " items"; },
        formatLoadMore: function (pageNumber) { return "Loading more results..."; },
	    formatSearching: function () { return "Searching..."; },
        minimumResultsForSearch: 0,
        minimumInputLength: 0,
        maximumSelectionSize: 0,
        id: function (e) { return e.id; },
        matcher: function(term, text) {
            return text.toUpperCase().indexOf(term.toUpperCase()) >= 0;
        },
        separator: ",",
        tokenSeparators: [],
        tokenizer: defaultTokenizer
    };

    // exports
    window.Select2 = {
        query: {
            ajax: ajax,
            local: local,
            tags: tags
        }, util: {
            debounce: debounce,
            markMatch: markMatch
        }, "class": {
            "abstract": AbstractSelect2,
            "single": SingleSelect2,
            "multi": MultiSelect2
        }
    };

}(jQuery));
;
var communityTagger = {}

communityTagger.init = function() {
	communityTagger.$selector = jQuery( '.wp-community-tagger select.community-tagger' );
	if ( communityTagger.$selector.length == 0 )
		return;
	if ( typeof( communityTaggerData.input_sel ) != 'undefined' ) {
		communityTagger.$input = jQuery( communityTaggerData.input_sel );
	}
	communityTagger.$selector.select2();
	communityTagger.setCurrentTags();
	communityTagger.$suggested = jQuery( '.community-tagger-tags-suggested' );

	communityTagger.$selector.on( "change", function(e) { 
		if ( e.added ) {
			communityTagger.addSelectTag( e.added.id );
			var tag_type = jQuery( e.added.element ).attr( 'data-tag-type' );
			if ( typeof tag_type != 'undefined' )
				communityTagger.bumpStat( 'community-tagger-added', tag_type );
			else
				communityTagger.bumpStat( 'community-tagger-added', 'new-tag' );
		}

		if ( e.removed ) {
			communityTagger.removeSelectTag( e.removed.id );
		}
	} );
	communityTagger.$suggested.children().bind( 'click.communityTagger', communityTagger.addSuggestedTag );
}

communityTagger.setCurrentTags = function() {
	if ( typeof( communityTagger.$selector ) == 'undefined' )
		return;
	var curr_tags = [];
	for ( var tag in communityTaggerData.current_tags ) {
		curr_tags.push( { id: tag, text: tag } );
	}
	communityTagger.$selector.select2( 'data', curr_tags );
}

communityTagger.setHiddenInput = function() {
	if ( typeof communityTagger.$input == 'undefined' )
		return;
	var curr_tags = '';
	for ( var tag in communityTaggerData.current_tags ) {
		curr_tags += tag + ',';
	}
	communityTagger.$input.val( curr_tags );
}

communityTagger.addSelectTag = function( name ) {
	if ( communityTaggerData.ajax_enabled ) {
		var data = {
			'action': 'community_tagger_add_tag',
			'term_name': name
		}

		// Make ajax call
		communityTagger.ajax( data, communityTagger.addSelectTagSuccess, communityTagger.setCurrentTags, name );
	} else {
		communityTagger.addSelectTagSuccess( { name: name }, name );
	}
	communityTagger.setHiddenInput();
}

communityTagger.addSelectTagSuccess = function( data, name ) {
	communityTaggerData.current_tags[ data.name ] = true;
	communityTagger.setCurrentTags();
}

communityTagger.removeSelectTag = function( name ) {
	if ( communityTaggerData.ajax_enabled ) {
		var data = {
			'action': 'community_tagger_remove_tag',
			'term_name': name
		}

		// Make ajax call
		communityTagger.ajax( data, communityTagger.removeSelectTagSuccess, communityTagger.setCurrentTags, name );
	} else {
		communityTagger.removeSelectTagSuccess( null, name );
	}
	communityTagger.setHiddenInput();
}

communityTagger.removeSelectTagSuccess = function( data, name ) {
	delete communityTaggerData.current_tags[ name ];
	communityTagger.setCurrentTags();
}

communityTagger.addSuggestedTag = function( e ) {
	e.preventDefault();

	var $this = jQuery(this),
		termName = $this.attr( 'data-term-name' );

	if ( communityTaggerData.ajax_enabled ) {
		var data = {
			'action': 'community_tagger_add_tag',
			'term_name': termName
		}

		// Make ajax call
		$this.addClass( 'loading' );
		communityTagger.ajax( data, communityTagger.addSuggestedTagSuccess, communityTagger.addSuggestedTagFailed, $this );
	} else {
		communityTagger.addSuggestedTagSuccess( { name: termName }, $this );
	}
	communityTagger.setHiddenInput();
	communityTagger.bumpStat( 'community-tagger-added', 'suggested-tag' );
}

communityTagger.addSuggestedTagSuccess = function( data, $elem ) {
	$elem.removeClass( 'loading' );
	if( ! $elem.siblings().length )
		var last = true;
	
	// Add new tag to current tags list
	var $newElem = $elem.clone();

	// Remove from suggested tags list
	$elem.fadeOut( 'normal', function() { $elem.remove(); } );

	communityTaggerData.current_tags[ data.name ] = true;
	communityTagger.setCurrentTags();

	if( last )
		communityTagger.$suggested.remove();
}

communityTagger.addSuggestedTagFailed = function( data, $elem ) {
	$elem.removeClass( 'loading' );
}

communityTagger.ajax = function( data, successCallback, errorCallback, param ) {
	data._nonce = jQuery( '#community-tagger-tags-nonce' ).val();
	data.post_id = communityTaggerData.post_id;

	var tagger = jQuery( '.wp-community-tagger div.community-tagger' ).spin( 'small-right' );

	jQuery.ajax( ajaxurl, {
		data: data,
		type: 'post',
		dataType: 'json',
		success: function( data ) {
			tagger.spin( false );
			if( typeof( successCallback ) === 'function' )
				successCallback( data, param );
		},
		error: function( data ) {
			tagger.spin( false );
			if( typeof( errorCallback ) === 'function' )
				errorCallback( data, param );
		}
	} );

}

communityTagger.bumpStat = function( group, names ) {
	new Image().src = document.location.protocol + '//stats.wordpress.com/g.gif?v=wpcom-no-pv&x_' +
		group + '=' + names + '&baba=' + Math.random();
}

;
/*
Scripts for layovers and new features design tests
*/
jQuery(document).ready(function($) {
	$('#signupoverlay').css('opacity', 1);
	$( '.inlinebutton' ).click(function() {
		$('.loaded').fadeOut('1000');
		/* Stats  new Image().src = document.location.protocol+'//stats.wordpress.com/g.gif?v=wpcom-no-pv&x_akismet-signups=total,free&baba='+Math.random(); */
		  $('#signupoverlay').slideDown('2000');
		  return false;
  	});
});
;
/*
 * Thickbox 3.1 - One Box To Rule Them All.
 * By Cody Lindley (http://www.codylindley.com)
 * Copyright (c) 2007 cody lindley
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
*/

if ( typeof tb_pathToImage != 'string' ) {
	var tb_pathToImage = thickboxL10n.loadingAnimation;
}
if ( typeof tb_closeImage != 'string' ) {
	var tb_closeImage = thickboxL10n.closeImage;
}

/*!!!!!!!!!!!!!!!!! edit below this line at your own risk !!!!!!!!!!!!!!!!!!!!!!!*/

//on page load call tb_init
jQuery(document).ready(function(){
	tb_init('a.thickbox, area.thickbox, input.thickbox');//pass where to apply thickbox
	imgLoader = new Image();// preload image
	imgLoader.src = tb_pathToImage;
});

//add thickbox to href & area elements that have a class of .thickbox
function tb_init(domChunk){
	jQuery(domChunk).live('click', tb_click);
}

function tb_click(){
	var t = this.title || this.name || null;
	var a = this.href || this.alt;
	var g = this.rel || false;
	tb_show(t,a,g);
	this.blur();
	return false;
}

function tb_show(caption, url, imageGroup) {//function called when the user clicks on a thickbox link

	try {
		if (typeof document.body.style.maxHeight === "undefined") {//if IE 6
			jQuery("body","html").css({height: "100%", width: "100%"});
			jQuery("html").css("overflow","hidden");
			if (document.getElementById("TB_HideSelect") === null) {//iframe to hide select elements in ie6
				jQuery("body").append("<iframe id='TB_HideSelect'>"+thickboxL10n.noiframes+"</iframe><div id='TB_overlay'></div><div id='TB_window'></div>");
				jQuery("#TB_overlay").click(tb_remove);
			}
		}else{//all others
			if(document.getElementById("TB_overlay") === null){
				jQuery("body").append("<div id='TB_overlay'></div><div id='TB_window'></div>");
				jQuery("#TB_overlay").click(tb_remove);
			}
		}

		if(tb_detectMacXFF()){
			jQuery("#TB_overlay").addClass("TB_overlayMacFFBGHack");//use png overlay so hide flash
		}else{
			jQuery("#TB_overlay").addClass("TB_overlayBG");//use background and opacity
		}

		if(caption===null){caption="";}
		jQuery("body").append("<div id='TB_load'><img src='"+imgLoader.src+"' /></div>");//add loader to the page
		jQuery('#TB_load').show();//show loader

		var baseURL;
	   if(url.indexOf("?")!==-1){ //ff there is a query string involved
			baseURL = url.substr(0, url.indexOf("?"));
	   }else{
	   		baseURL = url;
	   }

	   var urlString = /\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$/;
	   var urlType = baseURL.toLowerCase().match(urlString);

		if(urlType == '.jpg' || urlType == '.jpeg' || urlType == '.png' || urlType == '.gif' || urlType == '.bmp'){//code to show images

			TB_PrevCaption = "";
			TB_PrevURL = "";
			TB_PrevHTML = "";
			TB_NextCaption = "";
			TB_NextURL = "";
			TB_NextHTML = "";
			TB_imageCount = "";
			TB_FoundURL = false;
			if(imageGroup){
				TB_TempArray = jQuery("a[rel="+imageGroup+"]").get();
				for (TB_Counter = 0; ((TB_Counter < TB_TempArray.length) && (TB_NextHTML === "")); TB_Counter++) {
					var urlTypeTemp = TB_TempArray[TB_Counter].href.toLowerCase().match(urlString);
						if (!(TB_TempArray[TB_Counter].href == url)) {
							if (TB_FoundURL) {
								TB_NextCaption = TB_TempArray[TB_Counter].title;
								TB_NextURL = TB_TempArray[TB_Counter].href;
								TB_NextHTML = "<span id='TB_next'>&nbsp;&nbsp;<a href='#'>"+thickboxL10n.next+"</a></span>";
							} else {
								TB_PrevCaption = TB_TempArray[TB_Counter].title;
								TB_PrevURL = TB_TempArray[TB_Counter].href;
								TB_PrevHTML = "<span id='TB_prev'>&nbsp;&nbsp;<a href='#'>"+thickboxL10n.prev+"</a></span>";
							}
						} else {
							TB_FoundURL = true;
							TB_imageCount = thickboxL10n.image + ' ' + (TB_Counter + 1) + ' ' + thickboxL10n.of + ' ' + (TB_TempArray.length);
						}
				}
			}

			imgPreloader = new Image();
			imgPreloader.onload = function(){
			imgPreloader.onload = null;

			// Resizing large images - orginal by Christian Montoya edited by me.
			var pagesize = tb_getPageSize();
			var x = pagesize[0] - 150;
			var y = pagesize[1] - 150;
			var imageWidth = imgPreloader.width;
			var imageHeight = imgPreloader.height;
			if (imageWidth > x) {
				imageHeight = imageHeight * (x / imageWidth);
				imageWidth = x;
				if (imageHeight > y) {
					imageWidth = imageWidth * (y / imageHeight);
					imageHeight = y;
				}
			} else if (imageHeight > y) {
				imageWidth = imageWidth * (y / imageHeight);
				imageHeight = y;
				if (imageWidth > x) {
					imageHeight = imageHeight * (x / imageWidth);
					imageWidth = x;
				}
			}
			// End Resizing

			TB_WIDTH = imageWidth + 30;
			TB_HEIGHT = imageHeight + 60;
			jQuery("#TB_window").append("<a href='' id='TB_ImageOff' title='"+thickboxL10n.close+"'><img id='TB_Image' src='"+url+"' width='"+imageWidth+"' height='"+imageHeight+"' alt='"+caption+"'/></a>" + "<div id='TB_caption'>"+caption+"<div id='TB_secondLine'>" + TB_imageCount + TB_PrevHTML + TB_NextHTML + "</div></div><div id='TB_closeWindow'><a href='#' id='TB_closeWindowButton' title='"+thickboxL10n.close+"'><img src='" + tb_closeImage + "' /></a></div>");

			jQuery("#TB_closeWindowButton").click(tb_remove);

			if (!(TB_PrevHTML === "")) {
				function goPrev(){
					if(jQuery(document).unbind("click",goPrev)){jQuery(document).unbind("click",goPrev);}
					jQuery("#TB_window").remove();
					jQuery("body").append("<div id='TB_window'></div>");
					tb_show(TB_PrevCaption, TB_PrevURL, imageGroup);
					return false;
				}
				jQuery("#TB_prev").click(goPrev);
			}

			if (!(TB_NextHTML === "")) {
				function goNext(){
					jQuery("#TB_window").remove();
					jQuery("body").append("<div id='TB_window'></div>");
					tb_show(TB_NextCaption, TB_NextURL, imageGroup);
					return false;
				}
				jQuery("#TB_next").click(goNext);

			}

			jQuery(document).bind('keydown.thickbox', function(e){
				e.stopImmediatePropagation();

				if ( e.which == 27 ){ // close
					if ( ! jQuery(document).triggerHandler( 'wp_CloseOnEscape', [{ event: e, what: 'thickbox', cb: tb_remove }] ) )
						tb_remove();

				} else if ( e.which == 190 ){ // display previous image
					if(!(TB_NextHTML == "")){
						jQuery(document).unbind('thickbox');
						goNext();
					}
				} else if ( e.which == 188 ){ // display next image
					if(!(TB_PrevHTML == "")){
						jQuery(document).unbind('thickbox');
						goPrev();
					}
				}
				return false;
			});

			tb_position();
			jQuery("#TB_load").remove();
			jQuery("#TB_ImageOff").click(tb_remove);
			jQuery("#TB_window").css({'visibility':'visible'}); //for safari using css instead of show
			};

			imgPreloader.src = url;
		}else{//code to show html

			var queryString = url.replace(/^[^\?]+\??/,'');
			var params = tb_parseQuery( queryString );

			TB_WIDTH = (params['width']*1) + 30 || 630; //defaults to 630 if no paramaters were added to URL
			TB_HEIGHT = (params['height']*1) + 40 || 440; //defaults to 440 if no paramaters were added to URL
			ajaxContentW = TB_WIDTH - 30;
			ajaxContentH = TB_HEIGHT - 45;

			if(url.indexOf('TB_iframe') != -1){// either iframe or ajax window
					urlNoQuery = url.split('TB_');
					jQuery("#TB_iframeContent").remove();
					if(params['modal'] != "true"){//iframe no modal
						jQuery("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton' title='"+thickboxL10n.close+"'><img src='" + tb_closeImage + "' /></a></div></div><iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(Math.random()*1000)+"' onload='tb_showIframe()' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;' >"+thickboxL10n.noiframes+"</iframe>");
					}else{//iframe modal
					jQuery("#TB_overlay").unbind();
						jQuery("#TB_window").append("<iframe frameborder='0' hspace='0' src='"+urlNoQuery[0]+"' id='TB_iframeContent' name='TB_iframeContent"+Math.round(Math.random()*1000)+"' onload='tb_showIframe()' style='width:"+(ajaxContentW + 29)+"px;height:"+(ajaxContentH + 17)+"px;'>"+thickboxL10n.noiframes+"</iframe>");
					}
			}else{// not an iframe, ajax
					if(jQuery("#TB_window").css("visibility") != "visible"){
						if(params['modal'] != "true"){//ajax no modal
						jQuery("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton'><img src='" + tb_closeImage + "' /></a></div></div><div id='TB_ajaxContent' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px'></div>");
						}else{//ajax modal
						jQuery("#TB_overlay").unbind();
						jQuery("#TB_window").append("<div id='TB_ajaxContent' class='TB_modal' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px;'></div>");
						}
					}else{//this means the window is already up, we are just loading new content via ajax
						jQuery("#TB_ajaxContent")[0].style.width = ajaxContentW +"px";
						jQuery("#TB_ajaxContent")[0].style.height = ajaxContentH +"px";
						jQuery("#TB_ajaxContent")[0].scrollTop = 0;
						jQuery("#TB_ajaxWindowTitle").html(caption);
					}
			}

			jQuery("#TB_closeWindowButton").click(tb_remove);

				if(url.indexOf('TB_inline') != -1){
					jQuery("#TB_ajaxContent").append(jQuery('#' + params['inlineId']).children());
					jQuery("#TB_window").bind('tb_unload', function () {
						jQuery('#' + params['inlineId']).append( jQuery("#TB_ajaxContent").children() ); // move elements back when you're finished
					});
					tb_position();
					jQuery("#TB_load").remove();
					jQuery("#TB_window").css({'visibility':'visible'});
				}else if(url.indexOf('TB_iframe') != -1){
					tb_position();
					if(jQuery.browser.safari){//safari needs help because it will not fire iframe onload
						jQuery("#TB_load").remove();
						jQuery("#TB_window").css({'visibility':'visible'});
					}
				}else{
					jQuery("#TB_ajaxContent").load(url += "&random=" + (new Date().getTime()),function(){//to do a post change this load method
						tb_position();
						jQuery("#TB_load").remove();
						tb_init("#TB_ajaxContent a.thickbox");
						jQuery("#TB_window").css({'visibility':'visible'});
					});
				}

		}

		if(!params['modal']){
			jQuery(document).bind('keyup.thickbox', function(e){

				if ( e.which == 27 ){ // close
					e.stopImmediatePropagation();
					if ( ! jQuery(document).triggerHandler( 'wp_CloseOnEscape', [{ event: e, what: 'thickbox', cb: tb_remove }] ) )
						tb_remove();

					return false;
				}
			});
		}

	} catch(e) {
		//nothing here
	}
}

//helper functions below
function tb_showIframe(){
	jQuery("#TB_load").remove();
	jQuery("#TB_window").css({'visibility':'visible'});
}

function tb_remove() {
 	jQuery("#TB_imageOff").unbind("click");
	jQuery("#TB_closeWindowButton").unbind("click");
	jQuery("#TB_window").fadeOut("fast",function(){jQuery('#TB_window,#TB_overlay,#TB_HideSelect').trigger("tb_unload").unbind().remove();});
	jQuery("#TB_load").remove();
	if (typeof document.body.style.maxHeight == "undefined") {//if IE 6
		jQuery("body","html").css({height: "auto", width: "auto"});
		jQuery("html").css("overflow","");
	}
	jQuery(document).unbind('.thickbox');
	return false;
}

function tb_position() {
var isIE6 = typeof document.body.style.maxHeight === "undefined";
jQuery("#TB_window").css({marginLeft: '-' + parseInt((TB_WIDTH / 2),10) + 'px', width: TB_WIDTH + 'px'});
	if ( ! isIE6 ) { // take away IE6
		jQuery("#TB_window").css({marginTop: '-' + parseInt((TB_HEIGHT / 2),10) + 'px'});
	}
}

function tb_parseQuery ( query ) {
   var Params = {};
   if ( ! query ) {return Params;}// return empty object
   var Pairs = query.split(/[;&]/);
   for ( var i = 0; i < Pairs.length; i++ ) {
      var KeyVal = Pairs[i].split('=');
      if ( ! KeyVal || KeyVal.length != 2 ) {continue;}
      var key = unescape( KeyVal[0] );
      var val = unescape( KeyVal[1] );
      val = val.replace(/\+/g, ' ');
      Params[key] = val;
   }
   return Params;
}

function tb_getPageSize(){
	var de = document.documentElement;
	var w = window.innerWidth || self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
	var h = window.innerHeight || self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;
	arrayPageSize = [w,h];
	return arrayPageSize;
}

function tb_detectMacXFF() {
  var userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('mac') != -1 && userAgent.indexOf('firefox')!=-1) {
    return true;
  }
}
;
/*1.5.4*/
(function(){var f=0,k=[],m={},i={},a={"<":"lt",">":"gt","&":"amp",'"':"quot","'":"#39"},l=/[<>&\"\']/g,b,c=window.setTimeout,d={},e;function h(){this.returnValue=false}function j(){this.cancelBubble=true}(function(n){var o=n.split(/,/),p,r,q;for(p=0;p<o.length;p+=2){q=o[p+1].split(/ /);for(r=0;r<q.length;r++){i[q[r]]=o[p]}}})("application/msword,doc dot,application/pdf,pdf,application/pgp-signature,pgp,application/postscript,ps ai eps,application/rtf,rtf,application/vnd.ms-excel,xls xlb,application/vnd.ms-powerpoint,ppt pps pot,application/zip,zip,application/x-shockwave-flash,swf swfl,application/vnd.openxmlformats-officedocument.wordprocessingml.document,docx,application/vnd.openxmlformats-officedocument.wordprocessingml.template,dotx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,xlsx,application/vnd.openxmlformats-officedocument.presentationml.presentation,pptx,application/vnd.openxmlformats-officedocument.presentationml.template,potx,application/vnd.openxmlformats-officedocument.presentationml.slideshow,ppsx,application/x-javascript,js,application/json,json,audio/mpeg,mpga mpega mp2 mp3,audio/x-wav,wav,audio/mp4,m4a,image/bmp,bmp,image/gif,gif,image/jpeg,jpeg jpg jpe,image/photoshop,psd,image/png,png,image/svg+xml,svg svgz,image/tiff,tiff tif,text/plain,asc txt text diff log,text/html,htm html xhtml,text/css,css,text/csv,csv,text/rtf,rtf,video/mpeg,mpeg mpg mpe,video/quicktime,qt mov,video/mp4,mp4,video/x-m4v,m4v,video/x-flv,flv,video/x-ms-wmv,wmv,video/avi,avi,video/webm,webm,video/vnd.rn-realvideo,rv,application/vnd.oasis.opendocument.formula-template,otf,application/octet-stream,exe");var g={VERSION:"1.5.4",STOPPED:1,STARTED:2,QUEUED:1,UPLOADING:2,FAILED:4,DONE:5,GENERIC_ERROR:-100,HTTP_ERROR:-200,IO_ERROR:-300,SECURITY_ERROR:-400,INIT_ERROR:-500,FILE_SIZE_ERROR:-600,FILE_EXTENSION_ERROR:-601,IMAGE_FORMAT_ERROR:-700,IMAGE_MEMORY_ERROR:-701,IMAGE_DIMENSIONS_ERROR:-702,mimeTypes:i,ua:(function(){var r=navigator,q=r.userAgent,s=r.vendor,o,n,p;o=/WebKit/.test(q);p=o&&s.indexOf("Apple")!==-1;n=window.opera&&window.opera.buildNumber;return{windows:navigator.platform.indexOf("Win")!==-1,ie:!o&&!n&&(/MSIE/gi).test(q)&&(/Explorer/gi).test(r.appName),webkit:o,gecko:!o&&/Gecko/.test(q),safari:p,opera:!!n}}()),typeOf:function(n){return({}).toString.call(n).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()},extend:function(n){g.each(arguments,function(o,p){if(p>0){g.each(o,function(r,q){n[q]=r})}});return n},cleanName:function(n){var o,p;p=[/[\300-\306]/g,"A",/[\340-\346]/g,"a",/\307/g,"C",/\347/g,"c",/[\310-\313]/g,"E",/[\350-\353]/g,"e",/[\314-\317]/g,"I",/[\354-\357]/g,"i",/\321/g,"N",/\361/g,"n",/[\322-\330]/g,"O",/[\362-\370]/g,"o",/[\331-\334]/g,"U",/[\371-\374]/g,"u"];for(o=0;o<p.length;o+=2){n=n.replace(p[o],p[o+1])}n=n.replace(/\s+/g,"_");n=n.replace(/[^a-z0-9_\-\.]+/gi,"");return n},addRuntime:function(n,o){o.name=n;k[n]=o;k.push(o);return o},guid:function(){var n=new Date().getTime().toString(32),o;for(o=0;o<5;o++){n+=Math.floor(Math.random()*65535).toString(32)}return(g.guidPrefix||"p")+n+(f++).toString(32)},buildUrl:function(o,n){var p="";g.each(n,function(r,q){p+=(p?"&":"")+encodeURIComponent(q)+"="+encodeURIComponent(r)});if(p){o+=(o.indexOf("?")>0?"&":"?")+p}return o},each:function(q,r){var p,o,n;if(q){p=q.length;if(p===b){for(o in q){if(q.hasOwnProperty(o)){if(r(q[o],o)===false){return}}}}else{for(n=0;n<p;n++){if(r(q[n],n)===false){return}}}}},formatSize:function(n){if(n===b||/\D/.test(n)){return g.translate("N/A")}if(n>1073741824){return Math.round(n/1073741824,1)+" GB"}if(n>1048576){return Math.round(n/1048576,1)+" MB"}if(n>1024){return Math.round(n/1024,1)+" KB"}return n+" b"},getPos:function(o,s){var t=0,r=0,v,u=document,p,q;o=o;s=s||u.body;function n(B){var z,A,w=0,C=0;if(B){A=B.getBoundingClientRect();z=u.compatMode==="CSS1Compat"?u.documentElement:u.body;w=A.left+z.scrollLeft;C=A.top+z.scrollTop}return{x:w,y:C}}if(o&&o.getBoundingClientRect&&((navigator.userAgent.indexOf("MSIE")>0)&&(u.documentMode<8))){p=n(o);q=n(s);return{x:p.x-q.x,y:p.y-q.y}}v=o;while(v&&v!=s&&v.nodeType){t+=v.offsetLeft||0;r+=v.offsetTop||0;v=v.offsetParent}v=o.parentNode;while(v&&v!=s&&v.nodeType){t-=v.scrollLeft||0;r-=v.scrollTop||0;v=v.parentNode}return{x:t,y:r}},getSize:function(n){return{w:n.offsetWidth||n.clientWidth,h:n.offsetHeight||n.clientHeight}},parseSize:function(n){var o;if(typeof(n)=="string"){n=/^([0-9]+)([mgk]?)$/.exec(n.toLowerCase().replace(/[^0-9mkg]/g,""));o=n[2];n=+n[1];if(o=="g"){n*=1073741824}if(o=="m"){n*=1048576}if(o=="k"){n*=1024}}return n},xmlEncode:function(n){return n?(""+n).replace(l,function(o){return a[o]?"&"+a[o]+";":o}):n},toArray:function(p){var o,n=[];for(o=0;o<p.length;o++){n[o]=p[o]}return n},inArray:function(p,q){if(q){if(Array.prototype.indexOf){return Array.prototype.indexOf.call(q,p)}for(var n=0,o=q.length;n<o;n++){if(q[n]===p){return n}}}return -1},addI18n:function(n){return g.extend(m,n)},translate:function(n){return m[n]||n},isEmptyObj:function(n){if(n===b){return true}for(var o in n){return false}return true},hasClass:function(p,o){var n;if(p.className==""){return false}n=new RegExp("(^|\\s+)"+o+"(\\s+|$)");return n.test(p.className)},addClass:function(o,n){if(!g.hasClass(o,n)){o.className=o.className==""?n:o.className.replace(/\s+$/,"")+" "+n}},removeClass:function(p,o){var n=new RegExp("(^|\\s+)"+o+"(\\s+|$)");p.className=p.className.replace(n,function(r,q,s){return q===" "&&s===" "?" ":""})},getStyle:function(o,n){if(o.currentStyle){return o.currentStyle[n]}else{if(window.getComputedStyle){return window.getComputedStyle(o,null)[n]}}},addEvent:function(s,n,t){var r,q,p,o;o=arguments[3];n=n.toLowerCase();if(e===b){e="Plupload_"+g.guid()}if(s.addEventListener){r=t;s.addEventListener(n,r,false)}else{if(s.attachEvent){r=function(){var u=window.event;if(!u.target){u.target=u.srcElement}u.preventDefault=h;u.stopPropagation=j;t(u)};s.attachEvent("on"+n,r)}}if(s[e]===b){s[e]=g.guid()}if(!d.hasOwnProperty(s[e])){d[s[e]]={}}q=d[s[e]];if(!q.hasOwnProperty(n)){q[n]=[]}q[n].push({func:r,orig:t,key:o})},removeEvent:function(s,n){var q,t,p;if(typeof(arguments[2])=="function"){t=arguments[2]}else{p=arguments[2]}n=n.toLowerCase();if(s[e]&&d[s[e]]&&d[s[e]][n]){q=d[s[e]][n]}else{return}for(var o=q.length-1;o>=0;o--){if(q[o].key===p||q[o].orig===t){if(s.removeEventListener){s.removeEventListener(n,q[o].func,false)}else{if(s.detachEvent){s.detachEvent("on"+n,q[o].func)}}q[o].orig=null;q[o].func=null;q.splice(o,1);if(t!==b){break}}}if(!q.length){delete d[s[e]][n]}if(g.isEmptyObj(d[s[e]])){delete d[s[e]];try{delete s[e]}catch(r){s[e]=b}}},removeAllEvents:function(o){var n=arguments[1];if(o[e]===b||!o[e]){return}g.each(d[o[e]],function(q,p){g.removeEvent(o,p,n)})}};g.Uploader=function(r){var o={},u,t=[],q,p=false;u=new g.QueueProgress();r=g.extend({chunk_size:0,multipart:true,multi_selection:true,file_data_name:"file",filters:[]},r);function s(){var w,x=0,v;if(this.state==g.STARTED){for(v=0;v<t.length;v++){if(!w&&t[v].status==g.QUEUED){w=t[v];w.status=g.UPLOADING;if(this.trigger("BeforeUpload",w)){this.trigger("UploadFile",w)}}else{x++}}if(x==t.length){this.stop();this.trigger("UploadComplete",t)}}}function n(){var w,v;u.reset();for(w=0;w<t.length;w++){v=t[w];if(v.size!==b){u.size+=v.size;u.loaded+=v.loaded}else{u.size=b}if(v.status==g.DONE){u.uploaded++}else{if(v.status==g.FAILED){u.failed++}else{u.queued++}}}if(u.size===b){u.percent=t.length>0?Math.ceil(u.uploaded/t.length*100):0}else{u.bytesPerSec=Math.ceil(u.loaded/((+new Date()-q||1)/1000));u.percent=u.size>0?Math.ceil(u.loaded/u.size*100):0}}g.extend(this,{state:g.STOPPED,runtime:"",features:{},files:t,settings:r,total:u,id:g.guid(),init:function(){var A=this,B,x,w,z=0,y;if(typeof(r.preinit)=="function"){r.preinit(A)}else{g.each(r.preinit,function(D,C){A.bind(C,D)})}r.page_url=r.page_url||document.location.pathname.replace(/\/[^\/]+$/g,"/");if(!/^(\w+:\/\/|\/)/.test(r.url)){r.url=r.page_url+r.url}r.chunk_size=g.parseSize(r.chunk_size);r.max_file_size=g.parseSize(r.max_file_size);A.bind("FilesAdded",function(C,F){var E,D,H=0,I,G=r.filters;if(G&&G.length){I=[];g.each(G,function(J){g.each(J.extensions.split(/,/),function(K){if(/^\s*\*\s*$/.test(K)){I.push("\\.*")}else{I.push("\\."+K.replace(new RegExp("["+("/^$.*+?|()[]{}\\".replace(/./g,"\\$&"))+"]","g"),"\\$&"))}})});I=new RegExp(I.join("|")+"$","i")}for(E=0;E<F.length;E++){D=F[E];D.loaded=0;D.percent=0;D.status=g.QUEUED;if(I&&!I.test(D.name)){C.trigger("Error",{code:g.FILE_EXTENSION_ERROR,message:g.translate("File extension error."),file:D});continue}if(D.size!==b&&D.size>r.max_file_size){C.trigger("Error",{code:g.FILE_SIZE_ERROR,message:g.translate("File size error."),file:D});continue}t.push(D);H++}if(H){c(function(){A.trigger("QueueChanged");A.refresh()},1)}else{return false}});if(r.unique_names){A.bind("UploadFile",function(C,D){var F=D.name.match(/\.([^.]+)$/),E="tmp";if(F){E=F[1]}D.target_name=D.id+"."+E})}A.bind("UploadProgress",function(C,D){D.percent=D.size>0?Math.ceil(D.loaded/D.size*100):100;n()});A.bind("StateChanged",function(C){if(C.state==g.STARTED){q=(+new Date())}else{if(C.state==g.STOPPED){for(B=C.files.length-1;B>=0;B--){if(C.files[B].status==g.UPLOADING){C.files[B].status=g.QUEUED;n()}}}}});A.bind("QueueChanged",n);A.bind("Error",function(C,D){if(D.file){D.file.status=g.FAILED;n();if(C.state==g.STARTED){c(function(){s.call(A)},1)}}});A.bind("FileUploaded",function(C,D){D.status=g.DONE;D.loaded=D.size;C.trigger("UploadProgress",D);c(function(){s.call(A)},1)});if(r.runtimes){x=[];y=r.runtimes.split(/\s?,\s?/);for(B=0;B<y.length;B++){if(k[y[B]]){x.push(k[y[B]])}}}else{x=k}function v(){var F=x[z++],E,C,D;if(F){E=F.getFeatures();C=A.settings.required_features;if(C){C=C.split(",");for(D=0;D<C.length;D++){if(!E[C[D]]){v();return}}}F.init(A,function(G){if(G&&G.success){A.features=E;A.runtime=F.name;A.trigger("Init",{runtime:F.name});A.trigger("PostInit");A.refresh()}else{v()}})}else{A.trigger("Error",{code:g.INIT_ERROR,message:g.translate("Init error.")})}}v();if(typeof(r.init)=="function"){r.init(A)}else{g.each(r.init,function(D,C){A.bind(C,D)})}},refresh:function(){this.trigger("Refresh")},start:function(){if(t.length&&this.state!=g.STARTED){this.state=g.STARTED;this.trigger("StateChanged");s.call(this)}},stop:function(){if(this.state!=g.STOPPED){this.state=g.STOPPED;this.trigger("CancelUpload");this.trigger("StateChanged")}},disableBrowse:function(){p=arguments[0]!==b?arguments[0]:true;this.trigger("DisableBrowse",p)},getFile:function(w){var v;for(v=t.length-1;v>=0;v--){if(t[v].id===w){return t[v]}}},removeFile:function(w){var v;for(v=t.length-1;v>=0;v--){if(t[v].id===w.id){return this.splice(v,1)[0]}}},splice:function(x,v){var w;w=t.splice(x===b?0:x,v===b?t.length:v);this.trigger("FilesRemoved",w);this.trigger("QueueChanged");return w},trigger:function(w){var y=o[w.toLowerCase()],x,v;if(y){v=Array.prototype.slice.call(arguments);v[0]=this;for(x=0;x<y.length;x++){if(y[x].func.apply(y[x].scope,v)===false){return false}}}return true},hasEventListener:function(v){return !!o[v.toLowerCase()]},bind:function(v,x,w){var y;v=v.toLowerCase();y=o[v]||[];y.push({func:x,scope:w||this});o[v]=y},unbind:function(v){v=v.toLowerCase();var y=o[v],w,x=arguments[1];if(y){if(x!==b){for(w=y.length-1;w>=0;w--){if(y[w].func===x){y.splice(w,1);break}}}else{y=[]}if(!y.length){delete o[v]}}},unbindAll:function(){var v=this;g.each(o,function(x,w){v.unbind(w)})},destroy:function(){this.stop();this.trigger("Destroy");this.unbindAll()}})};g.File=function(q,o,p){var n=this;n.id=q;n.name=o;n.size=p;n.loaded=0;n.percent=0;n.status=0};g.Runtime=function(){this.getFeatures=function(){};this.init=function(n,o){}};g.QueueProgress=function(){var n=this;n.size=0;n.loaded=0;n.uploaded=0;n.failed=0;n.queued=0;n.percent=0;n.bytesPerSec=0;n.reset=function(){n.size=n.loaded=n.uploaded=n.failed=n.queued=n.percent=n.bytesPerSec=0}};g.runtimes={};window.plupload=g})();;
(function(h,k,j,e){var c={},g;function m(o,p){var n;if("FileReader" in h){n=new FileReader();n.readAsDataURL(o);n.onload=function(){p(n.result)}}else{return p(o.getAsDataURL())}}function l(o,p){var n;if("FileReader" in h){n=new FileReader();n.readAsBinaryString(o);n.onload=function(){p(n.result)}}else{return p(o.getAsBinary())}}function d(r,p,n,v){var q,o,u,s,t=this;m(c[r.id],function(w){q=k.createElement("canvas");q.style.display="none";k.body.appendChild(q);o=q.getContext("2d");u=new Image();u.onerror=u.onabort=function(){v({success:false})};u.onload=function(){var B,x,z,y,A;if(!p.width){p.width=u.width}if(!p.height){p.height=u.height}s=Math.min(p.width/u.width,p.height/u.height);if(s<1||(s===1&&n==="image/jpeg")){B=Math.round(u.width*s);x=Math.round(u.height*s);q.width=B;q.height=x;o.drawImage(u,0,0,B,x);if(n==="image/jpeg"){y=new f(atob(w.substring(w.indexOf("base64,")+7)));if(y.headers&&y.headers.length){A=new a();if(A.init(y.get("exif")[0])){A.setExif("PixelXDimension",B);A.setExif("PixelYDimension",x);y.set("exif",A.getBinary());if(t.hasEventListener("ExifData")){t.trigger("ExifData",r,A.EXIF())}if(t.hasEventListener("GpsData")){t.trigger("GpsData",r,A.GPS())}}}if(p.quality){try{w=q.toDataURL(n,p.quality/100)}catch(C){w=q.toDataURL(n)}}}else{w=q.toDataURL(n)}w=w.substring(w.indexOf("base64,")+7);w=atob(w);if(y&&y.headers&&y.headers.length){w=y.restore(w);y.purge()}q.parentNode.removeChild(q);v({success:true,data:w})}else{v({success:false})}};u.src=w})}j.runtimes.Html5=j.addRuntime("html5",{getFeatures:function(){var s,o,r,q,p,n;o=r=p=n=false;if(h.XMLHttpRequest){s=new XMLHttpRequest();r=!!s.upload;o=!!(s.sendAsBinary||s.upload)}if(o){q=!!(s.sendAsBinary||(h.Uint8Array&&h.ArrayBuffer));p=!!(File&&(File.prototype.getAsDataURL||h.FileReader)&&q);n=!!(File&&(File.prototype.mozSlice||File.prototype.webkitSlice||File.prototype.slice))}g=j.ua.safari&&j.ua.windows;return{html5:o,dragdrop:(function(){var t=k.createElement("div");return("draggable" in t)||("ondragstart" in t&&"ondrop" in t)}()),jpgresize:p,pngresize:p,multipart:p||!!h.FileReader||!!h.FormData,canSendBinary:q,cantSendBlobInFormData:!!(j.ua.gecko&&h.FormData&&h.FileReader&&!FileReader.prototype.readAsArrayBuffer),progress:r,chunks:n,multi_selection:!(j.ua.safari&&j.ua.windows),triggerDialog:(j.ua.gecko&&h.FormData||j.ua.webkit)}},init:function(p,r){var n,q;function o(w){var u,t,v=[],x,s={};for(t=0;t<w.length;t++){u=w[t];if(s[u.name]){continue}s[u.name]=true;x=j.guid();c[x]=u;v.push(new j.File(x,u.fileName||u.name,u.fileSize||u.size))}if(v.length){p.trigger("FilesAdded",v)}}n=this.getFeatures();if(!n.html5){r({success:false});return}p.bind("Init",function(w){var G,F,C=[],v,D,t=w.settings.filters,u,B,s=k.body,E;G=k.createElement("div");G.id=w.id+"_html5_container";j.extend(G.style,{position:"absolute",background:p.settings.shim_bgcolor||"transparent",width:"100px",height:"100px",overflow:"hidden",zIndex:99999,opacity:p.settings.shim_bgcolor?"":0});G.className="plupload html5";if(p.settings.container){s=k.getElementById(p.settings.container);if(j.getStyle(s,"position")==="static"){s.style.position="relative"}}s.appendChild(G);no_type_restriction:for(v=0;v<t.length;v++){u=t[v].extensions.split(/,/);for(D=0;D<u.length;D++){if(u[D]==="*"){C=[];break no_type_restriction}B=j.mimeTypes[u[D]];if(B&&j.inArray(B,C)===-1){C.push(B)}}}G.innerHTML='<input id="'+p.id+'_html5"  style="font-size:999px" type="file" accept="'+C.join(",")+'" '+(p.settings.multi_selection&&p.features.multi_selection?'multiple="multiple"':"")+" />";G.scrollTop=100;E=k.getElementById(p.id+"_html5");if(w.features.triggerDialog){j.extend(E.style,{position:"absolute",width:"100%",height:"100%"})}else{j.extend(E.style,{cssFloat:"right",styleFloat:"right"})}E.onchange=function(){o(this.files);this.value=""};F=k.getElementById(w.settings.browse_button);if(F){var z=w.settings.browse_button_hover,A=w.settings.browse_button_active,x=w.features.triggerDialog?F:G;if(z){j.addEvent(x,"mouseover",function(){j.addClass(F,z)},w.id);j.addEvent(x,"mouseout",function(){j.removeClass(F,z)},w.id)}if(A){j.addEvent(x,"mousedown",function(){j.addClass(F,A)},w.id);j.addEvent(k.body,"mouseup",function(){j.removeClass(F,A)},w.id)}if(w.features.triggerDialog){j.addEvent(F,"click",function(H){var y=k.getElementById(w.id+"_html5");if(y&&!y.disabled){y.click()}H.preventDefault()},w.id)}}});p.bind("PostInit",function(){var s=k.getElementById(p.settings.drop_element);if(s){if(g){j.addEvent(s,"dragenter",function(w){var v,t,u;v=k.getElementById(p.id+"_drop");if(!v){v=k.createElement("input");v.setAttribute("type","file");v.setAttribute("id",p.id+"_drop");v.setAttribute("multiple","multiple");j.addEvent(v,"change",function(){o(this.files);j.removeEvent(v,"change",p.id);v.parentNode.removeChild(v)},p.id);s.appendChild(v)}t=j.getPos(s,k.getElementById(p.settings.container));u=j.getSize(s);if(j.getStyle(s,"position")==="static"){j.extend(s.style,{position:"relative"})}j.extend(v.style,{position:"absolute",display:"block",top:0,left:0,width:u.w+"px",height:u.h+"px",opacity:0})},p.id);return}j.addEvent(s,"dragover",function(t){t.preventDefault()},p.id);j.addEvent(s,"drop",function(u){var t=u.dataTransfer;if(t&&t.files){o(t.files)}u.preventDefault()},p.id)}});p.bind("Refresh",function(s){var t,u,v,x,w;t=k.getElementById(p.settings.browse_button);if(t){u=j.getPos(t,k.getElementById(s.settings.container));v=j.getSize(t);x=k.getElementById(p.id+"_html5_container");j.extend(x.style,{top:u.y+"px",left:u.x+"px",width:v.w+"px",height:v.h+"px"});if(p.features.triggerDialog){if(j.getStyle(t,"position")==="static"){j.extend(t.style,{position:"relative"})}w=parseInt(j.getStyle(t,"z-index"),10);if(isNaN(w)){w=0}j.extend(t.style,{zIndex:w});j.extend(x.style,{zIndex:w-1})}}});p.bind("DisableBrowse",function(s,u){var t=k.getElementById(s.id+"_html5");if(t){t.disabled=u}});p.bind("CancelUpload",function(){if(q&&q.abort){q.abort()}});p.bind("UploadFile",function(s,u){var v=s.settings,y,t;function x(A,D,z){var B;if(File.prototype.slice){try{A.slice();return A.slice(D,z)}catch(C){return A.slice(D,z-D)}}else{if(B=File.prototype.webkitSlice||File.prototype.mozSlice){return B.call(A,D,z)}else{return null}}}function w(A){var D=0,C=0,z=("FileReader" in h)?new FileReader:null;function B(){var I,M,K,L,H,J,F,E=s.settings.url;function G(V){var T=0,N="----pluploadboundary"+j.guid(),O,P="--",U="\r\n",R="";q=new XMLHttpRequest;if(q.upload){q.upload.onprogress=function(W){u.loaded=Math.min(u.size,C+W.loaded-T);s.trigger("UploadProgress",u)}}q.onreadystatechange=function(){var W,Y;if(q.readyState==4&&s.state!==j.STOPPED){try{W=q.status}catch(X){W=0}if(W>=400){s.trigger("Error",{code:j.HTTP_ERROR,message:j.translate("HTTP Error."),file:u,status:W})}else{if(K){Y={chunk:D,chunks:K,response:q.responseText,status:W};s.trigger("ChunkUploaded",u,Y);C+=J;if(Y.cancelled){u.status=j.FAILED;return}u.loaded=Math.min(u.size,(D+1)*H)}else{u.loaded=u.size}s.trigger("UploadProgress",u);V=I=O=R=null;if(!K||++D>=K){u.status=j.DONE;s.trigger("FileUploaded",u,{response:q.responseText,status:W})}else{B()}}}};if(s.settings.multipart&&n.multipart){L.name=u.target_name||u.name;q.open("post",E,true);j.each(s.settings.headers,function(X,W){q.setRequestHeader(W,X)});if(typeof(V)!=="string"&&!!h.FormData){O=new FormData();j.each(j.extend(L,s.settings.multipart_params),function(X,W){O.append(W,X)});O.append(s.settings.file_data_name,V);q.send(O);return}if(typeof(V)==="string"){q.setRequestHeader("Content-Type","multipart/form-data; boundary="+N);j.each(j.extend(L,s.settings.multipart_params),function(X,W){R+=P+N+U+'Content-Disposition: form-data; name="'+W+'"'+U+U;R+=unescape(encodeURIComponent(X))+U});F=j.mimeTypes[u.name.replace(/^.+\.([^.]+)/,"$1").toLowerCase()]||"application/octet-stream";R+=P+N+U+'Content-Disposition: form-data; name="'+s.settings.file_data_name+'"; filename="'+unescape(encodeURIComponent(u.name))+'"'+U+"Content-Type: "+F+U+U+V+U+P+N+P+U;T=R.length-V.length;V=R;if(q.sendAsBinary){q.sendAsBinary(V)}else{if(n.canSendBinary){var S=new Uint8Array(V.length);for(var Q=0;Q<V.length;Q++){S[Q]=(V.charCodeAt(Q)&255)}q.send(S.buffer)}}return}}E=j.buildUrl(s.settings.url,j.extend(L,s.settings.multipart_params));q.open("post",E,true);q.setRequestHeader("Content-Type","application/octet-stream");j.each(s.settings.headers,function(X,W){q.setRequestHeader(W,X)});q.send(V)}if(u.status==j.DONE||u.status==j.FAILED||s.state==j.STOPPED){return}L={name:u.target_name||u.name};if(v.chunk_size&&u.size>v.chunk_size&&(n.chunks||typeof(A)=="string")){H=v.chunk_size;K=Math.ceil(u.size/H);J=Math.min(H,u.size-(D*H));if(typeof(A)=="string"){I=A.substring(D*H,D*H+J)}else{I=x(A,D*H,D*H+J)}L.chunk=D;L.chunks=K}else{J=u.size;I=A}if(s.settings.multipart&&n.multipart&&typeof(I)!=="string"&&z&&n.cantSendBlobInFormData&&n.chunks&&s.settings.chunk_size){z.onload=function(){G(z.result)};z.readAsBinaryString(I)}else{G(I)}}B()}y=c[u.id];if(n.jpgresize&&s.settings.resize&&/\.(png|jpg|jpeg)$/i.test(u.name)){d.call(s,u,s.settings.resize,/\.png$/i.test(u.name)?"image/png":"image/jpeg",function(z){if(z.success){u.size=z.data.length;w(z.data)}else{if(n.chunks){w(y)}else{l(y,w)}}})}else{if(!n.chunks&&n.jpgresize){l(y,w)}else{w(y)}}});p.bind("Destroy",function(s){var u,v,t=k.body,w={inputContainer:s.id+"_html5_container",inputFile:s.id+"_html5",browseButton:s.settings.browse_button,dropElm:s.settings.drop_element};for(u in w){v=k.getElementById(w[u]);if(v){j.removeAllEvents(v,s.id)}}j.removeAllEvents(k.body,s.id);if(s.settings.container){t=k.getElementById(s.settings.container)}t.removeChild(k.getElementById(w.inputContainer))});r({success:true})}});function b(){var q=false,o;function r(t,v){var s=q?0:-8*(v-1),w=0,u;for(u=0;u<v;u++){w|=(o.charCodeAt(t+u)<<Math.abs(s+u*8))}return w}function n(u,s,t){var t=arguments.length===3?t:o.length-s-1;o=o.substr(0,s)+u+o.substr(t+s)}function p(t,u,w){var x="",s=q?0:-8*(w-1),v;for(v=0;v<w;v++){x+=String.fromCharCode((u>>Math.abs(s+v*8))&255)}n(x,t,w)}return{II:function(s){if(s===e){return q}else{q=s}},init:function(s){q=false;o=s},SEGMENT:function(s,u,t){switch(arguments.length){case 1:return o.substr(s,o.length-s-1);case 2:return o.substr(s,u);case 3:n(t,s,u);break;default:return o}},BYTE:function(s){return r(s,1)},SHORT:function(s){return r(s,2)},LONG:function(s,t){if(t===e){return r(s,4)}else{p(s,t,4)}},SLONG:function(s){var t=r(s,4);return(t>2147483647?t-4294967296:t)},STRING:function(s,t){var u="";for(t+=s;s<t;s++){u+=String.fromCharCode(r(s,1))}return u}}}function f(s){var u={65505:{app:"EXIF",name:"APP1",signature:"Exif\0"},65506:{app:"ICC",name:"APP2",signature:"ICC_PROFILE\0"},65517:{app:"IPTC",name:"APP13",signature:"Photoshop 3.0\0"}},t=[],r,n,p=e,q=0,o;r=new b();r.init(s);if(r.SHORT(0)!==65496){return}n=2;o=Math.min(1048576,s.length);while(n<=o){p=r.SHORT(n);if(p>=65488&&p<=65495){n+=2;continue}if(p===65498||p===65497){break}q=r.SHORT(n+2)+2;if(u[p]&&r.STRING(n+4,u[p].signature.length)===u[p].signature){t.push({hex:p,app:u[p].app.toUpperCase(),name:u[p].name.toUpperCase(),start:n,length:q,segment:r.SEGMENT(n,q)})}n+=q}r.init(null);return{headers:t,restore:function(y){r.init(y);var w=new f(y);if(!w.headers){return false}for(var x=w.headers.length;x>0;x--){var z=w.headers[x-1];r.SEGMENT(z.start,z.length,"")}w.purge();n=r.SHORT(2)==65504?4+r.SHORT(4):2;for(var x=0,v=t.length;x<v;x++){r.SEGMENT(n,0,t[x].segment);n+=t[x].length}return r.SEGMENT()},get:function(x){var y=[];for(var w=0,v=t.length;w<v;w++){if(t[w].app===x.toUpperCase()){y.push(t[w].segment)}}return y},set:function(y,x){var z=[];if(typeof(x)==="string"){z.push(x)}else{z=x}for(var w=ii=0,v=t.length;w<v;w++){if(t[w].app===y.toUpperCase()){t[w].segment=z[ii];t[w].length=z[ii].length;ii++}if(ii>=z.length){break}}},purge:function(){t=[];r.init(null)}}}function a(){var q,n,o={},t;q=new b();n={tiff:{274:"Orientation",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer"},exif:{36864:"ExifVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",36867:"DateTimeOriginal",33434:"ExposureTime",33437:"FNumber",34855:"ISOSpeedRatings",37377:"ShutterSpeedValue",37378:"ApertureValue",37383:"MeteringMode",37384:"LightSource",37385:"Flash",41986:"ExposureMode",41987:"WhiteBalance",41990:"SceneCaptureType",41988:"DigitalZoomRatio",41992:"Contrast",41993:"Saturation",41994:"Sharpness"},gps:{0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude"}};t={ColorSpace:{1:"sRGB",0:"Uncalibrated"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{1:"Daylight",2:"Fliorescent",3:"Tungsten",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 -5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire.",1:"Flash fired.",5:"Strobe return light not detected.",7:"Strobe return light detected.",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},ExposureMode:{0:"Auto exposure",1:"Manual exposure",2:"Auto bracket"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},GPSLatitudeRef:{N:"North latitude",S:"South latitude"},GPSLongitudeRef:{E:"East longitude",W:"West longitude"}};function p(u,C){var w=q.SHORT(u),z,F,G,B,A,v,x,D,E=[],y={};for(z=0;z<w;z++){x=v=u+12*z+2;G=C[q.SHORT(x)];if(G===e){continue}B=q.SHORT(x+=2);A=q.LONG(x+=2);x+=4;E=[];switch(B){case 1:case 7:if(A>4){x=q.LONG(x)+o.tiffHeader}for(F=0;F<A;F++){E[F]=q.BYTE(x+F)}break;case 2:if(A>4){x=q.LONG(x)+o.tiffHeader}y[G]=q.STRING(x,A-1);continue;case 3:if(A>2){x=q.LONG(x)+o.tiffHeader}for(F=0;F<A;F++){E[F]=q.SHORT(x+F*2)}break;case 4:if(A>1){x=q.LONG(x)+o.tiffHeader}for(F=0;F<A;F++){E[F]=q.LONG(x+F*4)}break;case 5:x=q.LONG(x)+o.tiffHeader;for(F=0;F<A;F++){E[F]=q.LONG(x+F*4)/q.LONG(x+F*4+4)}break;case 9:x=q.LONG(x)+o.tiffHeader;for(F=0;F<A;F++){E[F]=q.SLONG(x+F*4)}break;case 10:x=q.LONG(x)+o.tiffHeader;for(F=0;F<A;F++){E[F]=q.SLONG(x+F*4)/q.SLONG(x+F*4+4)}break;default:continue}D=(A==1?E[0]:E);if(t.hasOwnProperty(G)&&typeof D!="object"){y[G]=t[G][D]}else{y[G]=D}}return y}function s(){var v=e,u=o.tiffHeader;q.II(q.SHORT(u)==18761);if(q.SHORT(u+=2)!==42){return false}o.IFD0=o.tiffHeader+q.LONG(u+=2);v=p(o.IFD0,n.tiff);o.exifIFD=("ExifIFDPointer" in v?o.tiffHeader+v.ExifIFDPointer:e);o.gpsIFD=("GPSInfoIFDPointer" in v?o.tiffHeader+v.GPSInfoIFDPointer:e);return true}function r(w,u,z){var B,y,x,A=0;if(typeof(u)==="string"){var v=n[w.toLowerCase()];for(hex in v){if(v[hex]===u){u=hex;break}}}B=o[w.toLowerCase()+"IFD"];y=q.SHORT(B);for(i=0;i<y;i++){x=B+12*i+2;if(q.SHORT(x)==u){A=x+8;break}}if(!A){return false}q.LONG(A,z);return true}return{init:function(u){o={tiffHeader:10};if(u===e||!u.length){return false}q.init(u);if(q.SHORT(0)===65505&&q.STRING(4,5).toUpperCase()==="EXIF\0"){return s()}return false},EXIF:function(){var v;v=p(o.exifIFD,n.exif);if(v.ExifVersion&&j.typeOf(v.ExifVersion)==="array"){for(var w=0,u="";w<v.ExifVersion.length;w++){u+=String.fromCharCode(v.ExifVersion[w])}v.ExifVersion=u}return v},GPS:function(){var u;u=p(o.gpsIFD,n.gps);if(u.GPSVersionID){u.GPSVersionID=u.GPSVersionID.join(".")}return u},setExif:function(u,v){if(u!=="PixelXDimension"&&u!=="PixelYDimension"){return false}return r("exif",u,v)},getBinary:function(){return q.SEGMENT()}}}})(window,document,plupload);;
(function(f,b,d,e){var a={},g={};function c(){var h;try{h=navigator.plugins["Shockwave Flash"];h=h.description}catch(j){try{h=new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version")}catch(i){h="0.0"}}h=h.match(/\d+/g);return parseFloat(h[0]+"."+h[1])}d.flash={trigger:function(j,h,i){setTimeout(function(){var m=a[j],l,k;if(m){m.trigger("Flash:"+h,i)}},0)}};d.runtimes.Flash=d.addRuntime("flash",{getFeatures:function(){return{jpgresize:true,pngresize:true,maxWidth:8091,maxHeight:8091,chunks:true,progress:true,multipart:true,multi_selection:true}},init:function(m,o){var k,l,h=0,i=b.body;if(c()<10){o({success:false});return}g[m.id]=false;a[m.id]=m;k=b.getElementById(m.settings.browse_button);l=b.createElement("div");l.id=m.id+"_flash_container";d.extend(l.style,{position:"absolute",top:"0px",background:m.settings.shim_bgcolor||"transparent",zIndex:99999,width:"100%",height:"100%"});l.className="plupload flash";if(m.settings.container){i=b.getElementById(m.settings.container);if(d.getStyle(i,"position")==="static"){i.style.position="relative"}}i.appendChild(l);(function(){var p,q;p='<object id="'+m.id+'_flash" type="application/x-shockwave-flash" data="'+m.settings.flash_swf_url+'" ';if(d.ua.ie){p+='classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '}p+='width="100%" height="100%" style="outline:0"><param name="movie" value="'+m.settings.flash_swf_url+'" /><param name="flashvars" value="id='+escape(m.id)+'" /><param name="wmode" value="transparent" /><param name="allowscriptaccess" value="always" /></object>';if(d.ua.ie){q=b.createElement("div");l.appendChild(q);q.outerHTML=p;q=null}else{l.innerHTML=p}}());function n(){return b.getElementById(m.id+"_flash")}function j(){if(h++>5000){o({success:false});return}if(g[m.id]===false){setTimeout(j,1)}}j();k=l=null;m.bind("Destroy",function(p){var q;d.removeAllEvents(b.body,p.id);delete g[p.id];delete a[p.id];q=b.getElementById(p.id+"_flash_container");if(q){i.removeChild(q)}});m.bind("Flash:Init",function(){var r={},q;try{n().setFileFilters(m.settings.filters,m.settings.multi_selection)}catch(p){o({success:false});return}if(g[m.id]){return}g[m.id]=true;m.bind("UploadFile",function(s,u){var v=s.settings,t=m.settings.resize||{};n().uploadFile(r[u.id],v.url,{name:u.target_name||u.name,mime:d.mimeTypes[u.name.replace(/^.+\.([^.]+)/,"$1").toLowerCase()]||"application/octet-stream",chunk_size:v.chunk_size,width:t.width,height:t.height,quality:t.quality,multipart:v.multipart,multipart_params:v.multipart_params||{},file_data_name:v.file_data_name,format:/\.(jpg|jpeg)$/i.test(u.name)?"jpg":"png",headers:v.headers,urlstream_upload:v.urlstream_upload})});m.bind("CancelUpload",function(){n().cancelUpload()});m.bind("Flash:UploadProcess",function(t,s){var u=t.getFile(r[s.id]);if(u.status!=d.FAILED){u.loaded=s.loaded;u.size=s.size;t.trigger("UploadProgress",u)}});m.bind("Flash:UploadChunkComplete",function(s,u){var v,t=s.getFile(r[u.id]);v={chunk:u.chunk,chunks:u.chunks,response:u.text};s.trigger("ChunkUploaded",t,v);if(t.status!==d.FAILED&&s.state!==d.STOPPED){n().uploadNextChunk()}if(u.chunk==u.chunks-1){t.status=d.DONE;s.trigger("FileUploaded",t,{response:u.text})}});m.bind("Flash:SelectFiles",function(s,v){var u,t,w=[],x;for(t=0;t<v.length;t++){u=v[t];x=d.guid();r[x]=u.id;r[u.id]=x;w.push(new d.File(x,u.name,u.size))}if(w.length){m.trigger("FilesAdded",w)}});m.bind("Flash:SecurityError",function(s,t){m.trigger("Error",{code:d.SECURITY_ERROR,message:d.translate("Security error."),details:t.message,file:m.getFile(r[t.id])})});m.bind("Flash:GenericError",function(s,t){m.trigger("Error",{code:d.GENERIC_ERROR,message:d.translate("Generic error."),details:t.message,file:m.getFile(r[t.id])})});m.bind("Flash:IOError",function(s,t){m.trigger("Error",{code:d.IO_ERROR,message:d.translate("IO error."),details:t.message,file:m.getFile(r[t.id])})});m.bind("Flash:ImageError",function(s,t){m.trigger("Error",{code:parseInt(t.code,10),message:d.translate("Image error."),file:m.getFile(r[t.id])})});m.bind("Flash:StageEvent:rollOver",function(s){var t,u;t=b.getElementById(m.settings.browse_button);u=s.settings.browse_button_hover;if(t&&u){d.addClass(t,u)}});m.bind("Flash:StageEvent:rollOut",function(s){var t,u;t=b.getElementById(m.settings.browse_button);u=s.settings.browse_button_hover;if(t&&u){d.removeClass(t,u)}});m.bind("Flash:StageEvent:mouseDown",function(s){var t,u;t=b.getElementById(m.settings.browse_button);u=s.settings.browse_button_active;if(t&&u){d.addClass(t,u);d.addEvent(b.body,"mouseup",function(){d.removeClass(t,u)},s.id)}});m.bind("Flash:StageEvent:mouseUp",function(s){var t,u;t=b.getElementById(m.settings.browse_button);u=s.settings.browse_button_active;if(t&&u){d.removeClass(t,u)}});m.bind("Flash:ExifData",function(s,t){m.trigger("ExifData",m.getFile(r[t.id]),t.data)});m.bind("Flash:GpsData",function(s,t){m.trigger("GpsData",m.getFile(r[t.id]),t.data)});m.bind("QueueChanged",function(s){m.refresh()});m.bind("FilesRemoved",function(s,u){var t;for(t=0;t<u.length;t++){n().removeFile(r[u[t].id])}});m.bind("StateChanged",function(s){m.refresh()});m.bind("Refresh",function(s){var t,u,v;n().setFileFilters(m.settings.filters,m.settings.multi_selection);t=b.getElementById(s.settings.browse_button);if(t){u=d.getPos(t,b.getElementById(s.settings.container));v=d.getSize(t);d.extend(b.getElementById(s.id+"_flash_container").style,{top:u.y+"px",left:u.x+"px",width:v.w+"px",height:v.h+"px"})}});m.bind("DisableBrowse",function(s,t){n().disableBrowse(t)});o({success:true})})}})})(window,document,plupload);;
(function(g,b,d,e){var a={},h={};function c(o){var n,m=typeof o,j,l,k;if(o===e||o===null){return"null"}if(m==="string"){n="\bb\tt\nn\ff\rr\"\"''\\\\";return'"'+o.replace(/([\u0080-\uFFFF\x00-\x1f\"])/g,function(q,p){var i=n.indexOf(p);if(i+1){return"\\"+n.charAt(i+1)}q=p.charCodeAt().toString(16);return"\\u"+"0000".substring(q.length)+q})+'"'}if(m=="object"){j=o.length!==e;n="";if(j){for(l=0;l<o.length;l++){if(n){n+=","}n+=c(o[l])}n="["+n+"]"}else{for(k in o){if(o.hasOwnProperty(k)){if(n){n+=","}n+=c(k)+":"+c(o[k])}}n="{"+n+"}"}return n}return""+o}function f(r){var u=false,i=null,n=null,j,k,l,t,m,p=0;try{try{n=new ActiveXObject("AgControl.AgControl");if(n.IsVersionSupported(r)){u=true}n=null}catch(q){var o=navigator.plugins["Silverlight Plug-In"];if(o){j=o.description;if(j==="1.0.30226.2"){j="2.0.30226.2"}k=j.split(".");while(k.length>3){k.pop()}while(k.length<4){k.push(0)}l=r.split(".");while(l.length>4){l.pop()}do{t=parseInt(l[p],10);m=parseInt(k[p],10);p++}while(p<l.length&&t===m);if(t<=m&&!isNaN(t)){u=true}}}}catch(s){u=false}return u}d.silverlight={trigger:function(n,k){var m=a[n],l,j;if(m){j=d.toArray(arguments).slice(1);j[0]="Silverlight:"+k;setTimeout(function(){m.trigger.apply(m,j)},0)}}};d.runtimes.Silverlight=d.addRuntime("silverlight",{getFeatures:function(){return{jpgresize:true,pngresize:true,chunks:true,progress:true,multipart:true,multi_selection:true}},init:function(p,q){var o,m="",n=p.settings.filters,l,k=b.body;if(!f("2.0.31005.0")||(g.opera&&g.opera.buildNumber)){q({success:false});return}h[p.id]=false;a[p.id]=p;o=b.createElement("div");o.id=p.id+"_silverlight_container";d.extend(o.style,{position:"absolute",top:"0px",background:p.settings.shim_bgcolor||"transparent",zIndex:99999,width:"100px",height:"100px",overflow:"hidden",opacity:p.settings.shim_bgcolor||b.documentMode>8?"":0.01});o.className="plupload silverlight";if(p.settings.container){k=b.getElementById(p.settings.container);if(d.getStyle(k,"position")==="static"){k.style.position="relative"}}k.appendChild(o);for(l=0;l<n.length;l++){m+=(m!=""?"|":"")+n[l].title+" | *."+n[l].extensions.replace(/,/g,";*.")}o.innerHTML='<object id="'+p.id+'_silverlight" data="data:application/x-silverlight," type="application/x-silverlight-2" style="outline:none;" width="1024" height="1024"><param name="source" value="'+p.settings.silverlight_xap_url+'"/><param name="background" value="Transparent"/><param name="windowless" value="true"/><param name="enablehtmlaccess" value="true"/><param name="initParams" value="id='+p.id+",filter="+m+",multiselect="+p.settings.multi_selection+'"/></object>';function j(){return b.getElementById(p.id+"_silverlight").content.Upload}p.bind("Silverlight:Init",function(){var i,r={};if(h[p.id]){return}h[p.id]=true;p.bind("Silverlight:StartSelectFiles",function(s){i=[]});p.bind("Silverlight:SelectFile",function(s,v,t,u){var w;w=d.guid();r[w]=v;r[v]=w;i.push(new d.File(w,t,u))});p.bind("Silverlight:SelectSuccessful",function(){if(i.length){p.trigger("FilesAdded",i)}});p.bind("Silverlight:UploadChunkError",function(s,v,t,w,u){p.trigger("Error",{code:d.IO_ERROR,message:"IO Error.",details:u,file:s.getFile(r[v])})});p.bind("Silverlight:UploadFileProgress",function(s,w,t,v){var u=s.getFile(r[w]);if(u.status!=d.FAILED){u.size=v;u.loaded=t;s.trigger("UploadProgress",u)}});p.bind("Refresh",function(s){var t,u,v;t=b.getElementById(s.settings.browse_button);if(t){u=d.getPos(t,b.getElementById(s.settings.container));v=d.getSize(t);d.extend(b.getElementById(s.id+"_silverlight_container").style,{top:u.y+"px",left:u.x+"px",width:v.w+"px",height:v.h+"px"})}});p.bind("Silverlight:UploadChunkSuccessful",function(s,v,t,y,x){var w,u=s.getFile(r[v]);w={chunk:t,chunks:y,response:x};s.trigger("ChunkUploaded",u,w);if(u.status!=d.FAILED&&s.state!==d.STOPPED){j().UploadNextChunk()}if(t==y-1){u.status=d.DONE;s.trigger("FileUploaded",u,{response:x})}});p.bind("Silverlight:UploadSuccessful",function(s,v,t){var u=s.getFile(r[v]);u.status=d.DONE;s.trigger("FileUploaded",u,{response:t})});p.bind("FilesRemoved",function(s,u){var t;for(t=0;t<u.length;t++){j().RemoveFile(r[u[t].id])}});p.bind("UploadFile",function(s,u){var v=s.settings,t=v.resize||{};j().UploadFile(r[u.id],s.settings.url,c({name:u.target_name||u.name,mime:d.mimeTypes[u.name.replace(/^.+\.([^.]+)/,"$1").toLowerCase()]||"application/octet-stream",chunk_size:v.chunk_size,image_width:t.width,image_height:t.height,image_quality:t.quality||90,multipart:!!v.multipart,multipart_params:v.multipart_params||{},file_data_name:v.file_data_name,headers:v.headers}))});p.bind("CancelUpload",function(){j().CancelUpload()});p.bind("Silverlight:MouseEnter",function(s){var t,u;t=b.getElementById(p.settings.browse_button);u=s.settings.browse_button_hover;if(t&&u){d.addClass(t,u)}});p.bind("Silverlight:MouseLeave",function(s){var t,u;t=b.getElementById(p.settings.browse_button);u=s.settings.browse_button_hover;if(t&&u){d.removeClass(t,u)}});p.bind("Silverlight:MouseLeftButtonDown",function(s){var t,u;t=b.getElementById(p.settings.browse_button);u=s.settings.browse_button_active;if(t&&u){d.addClass(t,u);d.addEvent(b.body,"mouseup",function(){d.removeClass(t,u)})}});p.bind("Sliverlight:StartSelectFiles",function(s){var t,u;t=b.getElementById(p.settings.browse_button);u=s.settings.browse_button_active;if(t&&u){d.removeClass(t,u)}});p.bind("DisableBrowse",function(s,t){j().DisableBrowse(t)});p.bind("Destroy",function(s){var t;d.removeAllEvents(b.body,s.id);delete h[s.id];delete a[s.id];t=b.getElementById(s.id+"_silverlight_container");if(t){k.removeChild(t)}});q({success:true})})}})})(window,document,plupload);;
(function(d,a,b,c){function e(f){return a.getElementById(f)}b.runtimes.Html4=b.addRuntime("html4",{getFeatures:function(){return{multipart:true,triggerDialog:(b.ua.gecko&&d.FormData||b.ua.webkit)}},init:function(f,g){f.bind("Init",function(p){var j=a.body,n,h="javascript",k,x,q,z=[],r=/MSIE/.test(navigator.userAgent),t=[],m=p.settings.filters,o,l,s,w;no_type_restriction:for(o=0;o<m.length;o++){l=m[o].extensions.split(/,/);for(w=0;w<l.length;w++){if(l[w]==="*"){t=[];break no_type_restriction}s=b.mimeTypes[l[w]];if(s&&b.inArray(s,t)===-1){t.push(s)}}}t=t.join(",");function v(){var B,y,i,A;q=b.guid();z.push(q);B=a.createElement("form");B.setAttribute("id","form_"+q);B.setAttribute("method","post");B.setAttribute("enctype","multipart/form-data");B.setAttribute("encoding","multipart/form-data");B.setAttribute("target",p.id+"_iframe");B.style.position="absolute";y=a.createElement("input");y.setAttribute("id","input_"+q);y.setAttribute("type","file");y.setAttribute("accept",t);y.setAttribute("size",1);A=e(p.settings.browse_button);if(p.features.triggerDialog&&A){b.addEvent(e(p.settings.browse_button),"click",function(C){if(!y.disabled){y.click()}C.preventDefault()},p.id)}b.extend(y.style,{width:"100%",height:"100%",opacity:0,fontSize:"99px",cursor:"pointer"});b.extend(B.style,{overflow:"hidden"});i=p.settings.shim_bgcolor;if(i){B.style.background=i}if(r){b.extend(y.style,{filter:"alpha(opacity=0)"})}b.addEvent(y,"change",function(F){var D=F.target,C,E=[],G;if(D.value){e("form_"+q).style.top=-1048575+"px";C=D.value.replace(/\\/g,"/");C=C.substring(C.length,C.lastIndexOf("/")+1);E.push(new b.File(q,C));if(!p.features.triggerDialog){b.removeAllEvents(B,p.id)}else{b.removeEvent(A,"click",p.id)}b.removeEvent(y,"change",p.id);v();if(E.length){f.trigger("FilesAdded",E)}}},p.id);B.appendChild(y);j.appendChild(B);p.refresh()}function u(){var i=a.createElement("div");i.innerHTML='<iframe id="'+p.id+'_iframe" name="'+p.id+'_iframe" src="'+h+':&quot;&quot;" style="display:none"></iframe>';n=i.firstChild;j.appendChild(n);b.addEvent(n,"load",function(C){var D=C.target,B,y;if(!k){return}try{B=D.contentWindow.document||D.contentDocument||d.frames[D.id].document}catch(A){p.trigger("Error",{code:b.SECURITY_ERROR,message:b.translate("Security error."),file:k});return}y=B.body.innerHTML;if(y){k.status=b.DONE;k.loaded=1025;k.percent=100;p.trigger("UploadProgress",k);p.trigger("FileUploaded",k,{response:y})}},p.id)}if(p.settings.container){j=e(p.settings.container);if(b.getStyle(j,"position")==="static"){j.style.position="relative"}}p.bind("UploadFile",function(i,A){var B,y;if(A.status==b.DONE||A.status==b.FAILED||i.state==b.STOPPED){return}B=e("form_"+A.id);y=e("input_"+A.id);y.setAttribute("name",i.settings.file_data_name);B.setAttribute("action",i.settings.url);b.each(b.extend({name:A.target_name||A.name},i.settings.multipart_params),function(E,C){var D=a.createElement("input");b.extend(D,{type:"hidden",name:C,value:E});B.insertBefore(D,B.firstChild)});k=A;e("form_"+q).style.top=-1048575+"px";B.submit()});p.bind("FileUploaded",function(i){i.refresh()});p.bind("StateChanged",function(i){if(i.state==b.STARTED){u()}else{if(i.state==b.STOPPED){d.setTimeout(function(){b.removeEvent(n,"load",i.id);if(n.parentNode){n.parentNode.removeChild(n)}},0)}}b.each(i.files,function(A,y){if(A.status===b.DONE||A.status===b.FAILED){var B=e("form_"+A.id);if(B){B.parentNode.removeChild(B)}}})});p.bind("Refresh",function(y){var F,A,B,C,i,G,H,E,D;F=e(y.settings.browse_button);if(F){i=b.getPos(F,e(y.settings.container));G=b.getSize(F);H=e("form_"+q);E=e("input_"+q);b.extend(H.style,{top:i.y+"px",left:i.x+"px",width:G.w+"px",height:G.h+"px"});if(y.features.triggerDialog){if(b.getStyle(F,"position")==="static"){b.extend(F.style,{position:"relative"})}D=parseInt(F.style.zIndex,10);if(isNaN(D)){D=0}b.extend(F.style,{zIndex:D});b.extend(H.style,{zIndex:D-1})}B=y.settings.browse_button_hover;C=y.settings.browse_button_active;A=y.features.triggerDialog?F:H;if(B){b.addEvent(A,"mouseover",function(){b.addClass(F,B)},y.id);b.addEvent(A,"mouseout",function(){b.removeClass(F,B)},y.id)}if(C){b.addEvent(A,"mousedown",function(){b.addClass(F,C)},y.id);b.addEvent(a.body,"mouseup",function(){b.removeClass(F,C)},y.id)}}});f.bind("FilesRemoved",function(y,B){var A,C;for(A=0;A<B.length;A++){C=e("form_"+B[A].id);if(C){C.parentNode.removeChild(C)}}});f.bind("DisableBrowse",function(i,A){var y=a.getElementById("input_"+q);if(y){y.disabled=A}});f.bind("Destroy",function(i){var y,A,B,C={inputContainer:"form_"+q,inputFile:"input_"+q,browseButton:i.settings.browse_button};for(y in C){A=e(C[y]);if(A){b.removeAllEvents(A,i.id)}}b.removeAllEvents(a.body,i.id);b.each(z,function(E,D){B=e("form_"+E);if(B){j.removeChild(B)}})});v()});g({success:true})}})})(window,document,plupload);;
var wpCookies={each:function(d,a,c){var e,b;if(!d){return 0}c=c||d;if(typeof(d.length)!="undefined"){for(e=0,b=d.length;e<b;e++){if(a.call(c,d[e],e,d)===false){return 0}}}else{for(e in d){if(d.hasOwnProperty(e)){if(a.call(c,d[e],e,d)===false){return 0}}}}return 1},getHash:function(b){var c=this.get(b),a;if(c){this.each(c.split("&"),function(d){d=d.split("=");a=a||{};a[d[0]]=d[1]})}return a},setHash:function(b,c,a,f,d,e){var g="";this.each(c,function(i,h){g+=(!g?"":"&")+h+"="+i});this.set(b,g,a,f,d,e)},get:function(c){var d=document.cookie,g,f=c+"=",a;if(!d){return}a=d.indexOf("; "+f);if(a==-1){a=d.indexOf(f);if(a!=0){return null}}else{a+=2}g=d.indexOf(";",a);if(g==-1){g=d.length}return decodeURIComponent(d.substring(a+f.length,g))},set:function(b,e,a,g,c,f){var h=new Date();if(typeof(a)=="object"&&a.toGMTString){a=a.toGMTString()}else{if(parseInt(a,10)){h.setTime(h.getTime()+(parseInt(a,10)*1000));a=h.toGMTString()}else{a=""}}document.cookie=b+"="+encodeURIComponent(e)+((a)?"; expires="+a:"")+((g)?"; path="+g:"")+((c)?"; domain="+c:"")+((f)?"; secure":"")},remove:function(a,b){this.set(a,"",-1000,b)}};function getUserSetting(a,b){var c=getAllUserSettings();if(c.hasOwnProperty(a)){return c[a]}if(typeof b!="undefined"){return b}return""}function setUserSetting(c,f,b){if("object"!==typeof userSettings){return false}var d="wp-settings-"+userSettings.uid,e=wpCookies.getHash(d)||{},g=userSettings.url,h=c.toString().replace(/[^A-Za-z0-9_]/,""),a=f.toString().replace(/[^A-Za-z0-9_]/,"");if(b){delete e[h]}else{e[h]=a}wpCookies.setHash(d,e,31536000,g);wpCookies.set("wp-settings-time-"+userSettings.uid,userSettings.time,31536000,g);return c}function deleteUserSetting(a){return setUserSetting(a,"",1)}function getAllUserSettings(){if("object"!==typeof userSettings){return{}}return wpCookies.getHash("wp-settings-"+userSettings.uid)||{}};;
var switchEditors={switchto:function(b){var c=b.id,a=c.length,e=c.substr(0,a-5),d=c.substr(a-4);this.go(e,d)},go:function(g,f){g=g||"content";f=f||"toggle";var c=this,b=tinyMCE.get(g),a,d,e=tinymce.DOM;a="wp-"+g+"-wrap";d=e.get(g);if("toggle"==f){if(b&&!b.isHidden()){f="html"}else{f="tmce"}}if("tmce"==f||"tinymce"==f){if(b&&!b.isHidden()){return false}if(typeof(QTags)!="undefined"){QTags.closeAllTags(g)}if(tinyMCEPreInit.mceInit[g]&&tinyMCEPreInit.mceInit[g].wpautop){d.value=c.wpautop(d.value)}if(b){b.show()}else{b=new tinymce.Editor(g,tinyMCEPreInit.mceInit[g]);b.render()}e.removeClass(a,"html-active");e.addClass(a,"tmce-active");setUserSetting("editor","tinymce")}else{if("html"==f){if(b&&b.isHidden()){return false}if(b){d.style.height=b.getContentAreaContainer().offsetHeight+20+"px";b.hide()}e.removeClass(a,"tmce-active");e.addClass(a,"html-active");setUserSetting("editor","html")}}return false},_wp_Nop:function(c){var d,b,e=false,a=false;if(c.indexOf("<pre")!=-1||c.indexOf("<script")!=-1){e=true;c=c.replace(/<(pre|script)[^>]*>[\s\S]+?<\/\1>/g,function(f){f=f.replace(/<br ?\/?>(\r\n|\n)?/g,"<wp-temp-lb>");return f.replace(/<\/?p( [^>]*)?>(\r\n|\n)?/g,"<wp-temp-lb>")})}if(c.indexOf("[caption")!=-1){a=true;c=c.replace(/\[caption[\s\S]+?\[\/caption\]/g,function(f){return f.replace(/<br([^>]*)>/g,"<wp-temp-br$1>").replace(/[\r\n\t]+/,"")})}d="blockquote|ul|ol|li|table|thead|tbody|tfoot|tr|th|td|div|h[1-6]|p|fieldset";c=c.replace(new RegExp("\\s*</("+d+")>\\s*","g"),"</$1>\n");c=c.replace(new RegExp("\\s*<((?:"+d+")(?: [^>]*)?)>","g"),"\n<$1>");c=c.replace(/(<p [^>]+>.*?)<\/p>/g,"$1</p#>");c=c.replace(/<div( [^>]*)?>\s*<p>/gi,"<div$1>\n\n");c=c.replace(/\s*<p>/gi,"");c=c.replace(/\s*<\/p>\s*/gi,"\n\n");c=c.replace(/\n[\s\u00a0]+\n/g,"\n\n");c=c.replace(/\s*<br ?\/?>\s*/gi,"\n");c=c.replace(/\s*<div/g,"\n<div");c=c.replace(/<\/div>\s*/g,"</div>\n");c=c.replace(/\s*\[caption([^\[]+)\[\/caption\]\s*/gi,"\n\n[caption$1[/caption]\n\n");c=c.replace(/caption\]\n\n+\[caption/g,"caption]\n\n[caption");b="blockquote|ul|ol|li|table|thead|tbody|tfoot|tr|th|td|h[1-6]|pre|fieldset";c=c.replace(new RegExp("\\s*<((?:"+b+")(?: [^>]*)?)\\s*>","g"),"\n<$1>");c=c.replace(new RegExp("\\s*</("+b+")>\\s*","g"),"</$1>\n");c=c.replace(/<li([^>]*)>/g,"\t<li$1>");if(c.indexOf("<hr")!=-1){c=c.replace(/\s*<hr( [^>]*)?>\s*/g,"\n\n<hr$1>\n\n")}if(c.indexOf("<object")!=-1){c=c.replace(/<object[\s\S]+?<\/object>/g,function(f){return f.replace(/[\r\n]+/g,"")})}c=c.replace(/<\/p#>/g,"</p>\n");c=c.replace(/\s*(<p [^>]+>[\s\S]*?<\/p>)/g,"\n$1");c=c.replace(/^\s+/,"");c=c.replace(/[\s\u00a0]+$/,"");if(e){c=c.replace(/<wp-temp-lb>/g,"\n")}if(a){c=c.replace(/<wp-temp-br([^>]*)>/g,"<br$1>")}return c},_wp_Autop:function(a){var c=false,b=false,d="table|thead|tfoot|tbody|tr|td|th|caption|col|colgroup|div|dl|dd|dt|ul|ol|li|pre|select|form|blockquote|address|math|p|h[1-6]|fieldset|legend|hr|noscript|menu|samp|header|footer|article|section|hgroup|nav|aside|details|summary";if(a.indexOf("<object")!=-1){a=a.replace(/<object[\s\S]+?<\/object>/g,function(e){return e.replace(/[\r\n]+/g,"")})}a=a.replace(/<[^<>]+>/g,function(e){return e.replace(/[\r\n]+/g," ")});if(a.indexOf("<pre")!=-1||a.indexOf("<script")!=-1){c=true;a=a.replace(/<(pre|script)[^>]*>[\s\S]+?<\/\1>/g,function(e){return e.replace(/(\r\n|\n)/g,"<wp-temp-lb>")})}if(a.indexOf("[caption")!=-1){b=true;a=a.replace(/\[caption[\s\S]+?\[\/caption\]/g,function(e){e=e.replace(/<br([^>]*)>/g,"<wp-temp-br$1>");e=e.replace(/<[a-zA-Z0-9]+( [^<>]+)?>/g,function(f){return f.replace(/[\r\n\t]+/," ")});return e.replace(/\s*\n\s*/g,"<wp-temp-br />")})}a=a+"\n\n";a=a.replace(/<br \/>\s*<br \/>/gi,"\n\n");a=a.replace(new RegExp("(<(?:"+d+")(?: [^>]*)?>)","gi"),"\n$1");a=a.replace(new RegExp("(</(?:"+d+")>)","gi"),"$1\n\n");a=a.replace(/<hr( [^>]*)?>/gi,"<hr$1>\n\n");a=a.replace(/\r\n|\r/g,"\n");a=a.replace(/\n\s*\n+/g,"\n\n");a=a.replace(/([\s\S]+?)\n\n/g,"<p>$1</p>\n");a=a.replace(/<p>\s*?<\/p>/gi,"");a=a.replace(new RegExp("<p>\\s*(</?(?:"+d+")(?: [^>]*)?>)\\s*</p>","gi"),"$1");a=a.replace(/<p>(<li.+?)<\/p>/gi,"$1");a=a.replace(/<p>\s*<blockquote([^>]*)>/gi,"<blockquote$1><p>");a=a.replace(/<\/blockquote>\s*<\/p>/gi,"</p></blockquote>");a=a.replace(new RegExp("<p>\\s*(</?(?:"+d+")(?: [^>]*)?>)","gi"),"$1");a=a.replace(new RegExp("(</?(?:"+d+")(?: [^>]*)?>)\\s*</p>","gi"),"$1");a=a.replace(/\s*\n/gi,"<br />\n");a=a.replace(new RegExp("(</?(?:"+d+")[^>]*>)\\s*<br />","gi"),"$1");a=a.replace(/<br \/>(\s*<\/?(?:p|li|div|dl|dd|dt|th|pre|td|ul|ol)>)/gi,"$1");a=a.replace(/(?:<p>|<br ?\/?>)*\s*\[caption([^\[]+)\[\/caption\]\s*(?:<\/p>|<br ?\/?>)*/gi,"[caption$1[/caption]");a=a.replace(/(<(?:div|th|td|form|fieldset|dd)[^>]*>)(.*?)<\/p>/g,function(f,e,g){if(g.match(/<p( [^>]*)?>/)){return f}return e+"<p>"+g+"</p>"});if(c){a=a.replace(/<wp-temp-lb>/g,"\n")}if(b){a=a.replace(/<wp-temp-br([^>]*)>/g,"<br$1>")}return a},pre_wpautop:function(b){var a=this,d={o:a,data:b,unfiltered:b},c=typeof(jQuery)!="undefined";if(c){jQuery("body").trigger("beforePreWpautop",[d])}d.data=a._wp_Nop(d.data);if(c){jQuery("body").trigger("afterPreWpautop",[d])}return d.data},wpautop:function(b){var a=this,d={o:a,data:b,unfiltered:b},c=typeof(jQuery)!="undefined";if(c){jQuery("body").trigger("beforeWpautop",[d])}d.data=a._wp_Autop(d.data);if(c){jQuery("body").trigger("afterWpautop",[d])}return d.data}};;
var wpcom = wpcom || {};

/**
 * Based on:
 * Amplify Core 1.1.0
 * 
 * Copyright 2011 appendTo LLC. (http://appendto.com/team)
 * Dual licensed under the MIT or GPL licenses.
 * http://appendto.com/open-source-licenses
 * 
 * http://amplifyjs.com
 */
(function( global, undefined ) {

var slice = [].slice, subscriptions = {};

var amplify = {
	publish: function( action ) {
		var args = slice.call( arguments, 1 ),
			eventSubscriptions,
			subscription,
			length,
			i = 0;

		if ( !subscriptions[ action ] )
			return false;

		eventSubscriptions = subscriptions[ action ].slice();
		for ( length = eventSubscriptions.length; i < length; i++ ) {
			subscription = eventSubscriptions[ i ];
			subscription.callback.apply( subscription.context, args );
		}

		return true;
	},

	subscribe: function( action, callback, priority, unique, context ) {
		priority = priority || 10;

		if ( typeof(unique) == 'undefined' )
			unique = true;

		var eventIndex, 
			events = action.split( /\s/ ),
			eventLength = events.length,
			added, newaction, registered, i, subscriptionInfo, namespace;

		for ( eventIndex = 0; eventIndex < eventLength; eventIndex++ ) {
			newaction = events[ eventIndex ];
			namespace = newaction.split('.');
			added = false;

			if ( !namespace[1] )
				return false;

			newaction = namespace[0];
			namespace = namespace[1];

			if ( !subscriptions[ newaction ] ) {
				subscriptions[ newaction ] = [];
			} else if ( unique ) {
				for ( registered in subscriptions[ newaction ] ) {
					if ( subscriptions[ newaction ][ registered ].namespace === namespace )
						return false;
				}
			}

			i = subscriptions[ newaction ].length - 1;
			subscriptionInfo = {
				namespace: namespace,
				callback: callback,
				priority: priority,
				context: context
			};

			for ( ; i >= 0; i-- ) {
				if ( subscriptions[ newaction ][ i ].priority <= priority ) {
					subscriptions[ newaction ].splice( i + 1, 0, subscriptionInfo );
					added = true;
					break;
				}
			}

			if ( !added ) {
				subscriptions[ newaction ].unshift( subscriptionInfo );
			}
		}

		return true;
	},

	unsubscribe: function( action ) {
		var namespace = action.split('.'), i, ret = false, actions, reindexed = [];

		if ( !namespace[1] )
			return false;

		action = namespace[0];
		namespace = namespace[1];

		if ( !subscriptions[ action ] )
			return false;

		actions = subscriptions[ action ];

		for ( i in actions ) {
			if ( !actions[ i ] ) {
				continue;
			} else if ( actions[ i ].namespace === namespace ) {
				ret = true;
				continue;
			} else {
				reindexed.push( actions[i] );
			}
		}

		if ( reindexed.length )
			subscriptions[ action ] = reindexed;
		else
			delete( subscriptions[ action ] );

		return ret;
	},

	removeall: function( action ) {
		if ( !subscriptions[ action ] )
			return;

		delete( subscriptions[ action ] );
	}
};

/**
 * Triggers an action (custom event) previously added with addAction()
 *  
 * Usage: doAction( action, ... )
 * Any additional parameters will be passed to the callback(s).
 * 
 * @action string Name of the action.
 */  
wpcom.doAction = amplify.publish;

/**
 * Adds an action (custom event) that is triggered later
 *
 * Usage:
 * addAction( action.namespace, callback );
 * addAction( action.namespace, callback, priority );
 * addAction( action.namespace, callback, priority, unique );
 * addAction( action.namespace, callback, priority, unique, scope );
 *
 * @action.namespace string Action name + namespace. The namespace is required. It is similar to jQuery().bind('click.myname', ...) 
 *                          and has to be unique for this action and for the script adding the action
 *                          similarly to how PHP functions are unique in each WordPress plugin.
 * @callback function Callback function for the action. Can be anonymous: addAction( action.namespace, function(){...} );
 * @priority int optional Action priority. Lower values have higher priority. Default is 10 (same as add_action() in PHP).
 * @unique bool optional Whether to reject attempts to add the same action.namespace multiple times. Defaults to true. 
 * @scope object optional The JS scope when the callback is invoked.
 */
wpcom.addAction = amplify.subscribe;

/**
 * Removes one action
 *
 * Usage: removeAction( action, namespace )
 * 
 * Different actions on the same hook are identified by their namespace.
 *
 * @action string Name of the action.
 * @namespace The namespace that was originally used.
 */  
wpcom.removeAction = amplify.unsubscribe;

/**
 * Removes all actions from a hook.
 *
 * Usage: removeAllActions( action )
 *
 * @action string Name of the action.
 */ 
wpcom.removeAllActions = amplify.removeall;

}( this ) );
;
var jq = jQuery.noConflict();

instapost = {
	/**
	 * instapost.post_id
	 *
	 * When a new post is done publishing this will hold the new post ID.
	 */
	post_id: false,

	/**
	 * instapost.draft_ids
	 *
	 * Holds the post IDs for each format where a user has entered some information and the post is saved as a draft.
	 */
	draft_ids: {},

	/**
	 * instapost.aside_image_ids
	 *
	 * Every image uploaded an added to a text/aside post will return an attachment ID stored in an array here.
	 */
	aside_image_ids: [],

	/**
	 * instapost.preview_timeout
	 *
	 * Stores the timeout used to re-request an updated post preview when a user has paused typing or added a media item.
	 */
	preview_timeout: false,

	/**
	 * instapost.preview_loading
	 *
	 * If a post preview is being requested this will be true.
	 */
	preview_loading: false,

	/**
	 * instapost.publish_loading
	 *
	 * If a post is being published this will be true.
	 */
	publish_loading: false,

	/**
	 * instapost.preview_request
	 *
	 * Stores the XHR request for a post preview.
	 */
	preview_request: false,

	/**
	 * instapost.resize_timeout
	 *
	 * Stores the timeout used to determine when to try and expand the TinyMCE editor.
	 */
	resize_timeout: false,

	/**
	 * instapost.input_vals
	 *
	 * Holds the labels for all form inputs so they can be dynamically stored, hidden, and shown on blur/focus
	 */
	input_vals: {},

	/**
	 * instapost.temp_files, instapost.temp_files_index
	 *
	 * Holds temporary file data for drag and drop image support.
	 */
	temp_files: {},
	temp_files_index: 1,

	/**
	 * instapost.postformat
	 *
	 * Holds the currently selected format (tab).
	 */
	postformat: 'aside',

	/**
	 * instapost.autosave_timer
	 *
	 * How often to check for changes and if any, save drafts. In seconds.
	 */
	autosave_timer: 60,
	
	/**
	 * instapost.save_interval
	 *
	 * JS Interval that will run the autosave every X seconds.
	 */
	save_interval: false,

	/**
	 * instapost.usersblogs_close_tout()
	 *
	 * Reference to the timeout for closing the blog select drop-down
	 */
	usersblogs_close_tout: 0,

	/**
	 * instapost.current_draft
	 *
	 * holds details about the saved draft if any
	 */
	current_draft: {},

	/**
	 * instapost.init()
	 *
	 * Set up the instapost class, bind events and make sure editors are initiated correctly.
	 */
	init: function() {
		var self = this;

		// We need this so that the editor inits correctly.
		if ( typeof(switchEditors) != 'undefined' )
			switchEditors.go( 'ipteditor', 'html' );

		// Bind general and post type specific events.
		this.bind_general();
		this.bind_aside();
		this.bind_image();
		this.bind_video();
	//	this.bind_quote();
	//	this.bind_link();

		// delay to (maybe) let MCE render
		window.setTimeout( function(){
			var iptform = jq('#ipt-form');
			iptform.addClass('ipt-show-aside');
			jq( '.ipt-form-body', iptform ).fadeIn(200, function(){
				wpcom.doAction( 'aside_box_loaded' );
			});
		}, 1000);

		// attach the editor label show/hide once on 'ipt_after_switching_formats' to make sure MCE is ready
		wpcom.addAction('ipt_after_switching_formats.iptinit', function(){
			var ed = tinymce.get('ipteditor');

			if ( !ed )
				return;

			ed.onClick.add(function(ed){
				ed.dom.win.instapost.set_ed_label(true);
			});

			wpcom.removeAction('ipt_after_switching_formats.iptinit');
		});

		// Store when imput fields are changed
		this.init_input_vals();

		// Start the interval to check for content changes and save drafts
		setTimeout( function(){ instapost.setup_save_draft(); }, 5000 );
	},

	// Things to run on unloading? (not needed for now)
	unload: function() {
		jq( '#instapost *' ).unbind();
		clearInterval( instapost.save_interval );
	},

	/**
	 * instapost.bind_general()
	 *
	 * Bind all globally used events for instapost.
	 */
	bind_general: function() {
		var self = this, scope = jq( '#ipt-wrap' );

		scope.bind( 'click.ipt', function(e) {
    		var t = jq( e.target ), el;

			if ( t.is( 'input.ipt-add-tags' ) ) { // Catch add tags button clicks.
				instapost.show_tags();
			} else if ( t.is( '.ipt-postformat-click' ) ) {
      			e.preventDefault();
				instapost.post_format_select( t );
    		} else if ( t.is( '#ipt-form-publish' ) ) {
				if ( !t.prop('disabled') )
					wpcom.doAction('ipt_publish_' + self.get_post_format() );
			} else if ( t.is( '.blog-select-click' ) ) {
				el = t.closest('.usersblogs');

				if ( el.hasClass('ipt-disabled') )
					return;

				if ( el.hasClass('open') ) {
					// the user switching blogs
					jq('.postto li').removeClass('selected');
					t.parent().addClass('selected');
					el.removeClass('open');

					self.trash_current_draft();
				} else {
					el.addClass('open');
				}
			} else if ( t.is( '.usersblogs-close' ) ) {
				t.closest('.usersblogs').removeClass('open');
			} else if ( t.is( '.ipt-url-upload' ) ) {
				el = t.parent();
				e.preventDefault();

				// Hit upload after entering an image or video URL.
				if ( el.is( '#ipt-upload-image-via-url' ) )
					self.upload_image_url( jq( 'textarea', el ).val() );
				else if ( el.is( '#ipt-upload-video-via-url' ) )
					self.upload_video_url( jq( 'textarea', el ).val() );
			} else if ( t.is( '.mceIcon' ) || t.is( 'p.ipt-ed-label' ) ) {
				self.set_ed_label(true);
				return;
			} else if ( t.is( '.ipt-switch-upload-zone' ) ) {
				e.preventDefault();
				self.switch_upload_type( t );
			} else if ( t.is( '.ipt-cancel-image' ) ) {
				e.preventDefault();
				self.cancel_image();
			} else if ( t.is( '.ipt-cancel-video' ) ) {
				e.preventDefault();
				self.cancel_video();
			} else if ( t.is( '#instapost-dropper' ) ) {
				// hide the upload dropper on click
				jq( '#instapost-dropper-wrap' ).removeClass('show');
			}

			// need to run this on all clicks except when forcing the label
    		instapost.set_ed_label();

		}).bind('keyup.ipt', function(e) {
			var t = jq( e.target ), el;

			if ( t.is('#ipt-tags-input') ) {
				jq('#ipt-tags-label:visible').fadeOut(200);
				jq('#ipt-tags-input').focus();
			} else if ( t.is('#ipt-image-url input') || t.is('#ipt-video-url input') ) {
				// Paste or type an image or video URL
				self.toggle_upload_button( t );
			}
		});

		// publish callbacks
		wpcom.addAction('ipt_publish_aside.ipt', function(){
			self.publish_aside();
		});
		wpcom.addAction('ipt_publish_image.ipt', function(){
			self.publish_image();
		});
		wpcom.addAction('ipt_publish_video.ipt', function(){
			self.publish_video();
		});
		wpcom.addAction('ipt_publish_quote.ipt', function(){
			self.publish_quote();
		});
		wpcom.addAction('ipt_publish_link.ipt', function(){
			self.publish_link();
		});

		// disable blog select after a file has been uploaded
		wpcom.addAction('ipt_image_content_change.iptdisable', function(){
			self.toggle_blog_select(true);
		});
		wpcom.addAction('ipt_video_content_change.iptdisable', function(){
			self.toggle_blog_select(true);
		});

		// close the blog select on mouseleave but keep it open if the mouse goes back in fast
		jq( '.usersblogs', scope ).bind( 'mouseleave.ipt', function(){
			var self = jq(this);

			instapost.usersblogs_close_tout = setTimeout( function(){
				self.removeClass('open');
			}, 300 );
		}).bind( 'mouseenter.ipt', function(){
			clearTimeout( instapost.usersblogs_close_tout );
		});

		/* no previews for now...
		jq(document).on( 'ipt_published_post_rendered.ipthidepreview', function() {
		    jq( 'div#iframe-preview' ).fadeOut( 'fast' );
		});

		jq(document).on( 'ipt_preview_post_rendered.iptpreview', function() {
	       	var info_el = jq( '#ipt-single-blog' ), format = instapost.get_post_format(), siteurl;

         	if ( !info_el.length )
         		info_el = jq( '.postto li.selected' );

			siteurl = info_el.data('blogurl') || '';

			jq( '#iframe-preview h2' ).addClass( 'loading' );
 			jq( 'iframe#preview-pane' ).addClass('old').after( '<iframe id="preview-pane" name="preview_pane" class="new" style="display: none;" src="' + siteurl + '?p=' + instapost.draft_ids[format] + '&preview=true&ipt_preview=true"></iframe>' )

			jq( 'iframe.new' ).bind( 'load', function() {
//				var scroll = jq( 'iframe.old' ).contents().scrollTop();

         		if ( jq( 'div#iframe-preview' ).is( ':hidden' ) )
        			jq( 'div#iframe-preview' ).fadeIn();

	       		jq( '#iframe-preview h2' ).removeClass( 'loading' );
				jq( 'iframe.old' ).hide().remove();
				jq( 'iframe.new' ).css( 'display', 'block' ).removeClass('new'); //.contents().scrollTop(scroll).css( { 'overflow-x': 'hidden' } );
				//window.frames['preview_pane']...
			});
        });
		*/
	},

	save_draft: function() {
		var self = instapost, postformat, func;

		if ( !jq( '#ipt-wrap' ).length ) {
			clearInterval( self.save_interval );
			return;
		}

		postformat = self.get_post_format();
		func = 'preview_' + postformat;

		if ( self[ func ] )
			self[ func ]();
	},

	setup_save_draft: function() {
		var self = instapost, time = self.autosave_timer * 1000;

		clearInterval( self.save_interval );
		self.save_interval = setInterval( function(){ self.save_draft(); }, time );
	},
	
	show_tags: function() {
		jq( 'input.ipt-add-tags', 'div#ipt-wrap' ).hide();
		jq( 'div.ipt-tags-ui' ).width( 85 ).animate( { 'width': 180 + 'px' }, 300, function() {
			jq( '#ipt-tags-label' ).fadeIn( 200 );
		} ).children('.ipt-tags').fadeIn( 200, function(){
			jq( '#ipt-tags-input' ).focus();
		});	
	},

	hide_tags: function() {
		var tags_ui = jq( 'div.ipt-tags-ui' );

		tags_ui.children('input.ipt-add-tags').show();
		tags_ui.children( 'div.ipt-tags' ).hide().children( 'input#ipt-tags-input' ).val('');
	},

	/**
	 * instapost.bind_aside()
	 *
	 * Bind all events used for the aside post format.
	 */
	bind_aside: function() {
		var plup, form = jq( '#ipt-form-aside-upload-image' ), iptform = jq('#ipt-form'),
			body_aside = jq('.ipt-form-body-aside', iptform);

		// Change upload photo file input on aside form.
		jq( 'input.ipt-upload', form ).bind( 'change.ipt', function() {
			form.submit();
			form.get(0).reset();
		} );
		form.bind( 'submit.ipt', function(e) {
			instapost.render_aside_photo( jq(this) );
		} );

		this.uploader = plup = new plupload.Uploader( {
			runtimes: 'html5,silverlight,flash,html4',
			browse_button: 'ipt-form-aside-upload-image',
			drop_element: 'instapost-dropper',
			max_file_size: '10mb',
			url: jq( '#ipt-form-aside-upload-image' ).attr( 'action' ),
			flash_swf_url: instapost_text.flash_swf_url,
			silverlight_xap_url: instapost_text.silverlight_xap_url,
			filters: [
				{ title : "Image files", extensions : "tiff,jpeg,jpg,gif,png" }
			],
			multipart: true,
			multipart_params: {
				action: 'instapost_upload_aside_format_image', // @todo, serialize the form
				blog_id: false
			},
			file_data_name: 'image',
			urlstream_upload: true
		} );

		plup.init();

		plup.bind( 'FilesAdded', function( up, files ) {
			plup.settings.multipart_params.blog_id = instapost.get_blog_id();

			instapost.render_aside_photo( jq( '#ipt-form-aside-upload-image' ) );
			jq( 'iframe#ipt-upload-iframe' ).unbind( 'load.ipt' );
			up.start();
		} );

		plup.bind( 'FileUploaded', function( up, file, responseObject ) {
			instapost.add_photo_to_aside( responseObject.response, form );
		} );

		// When the aside box becomes visible, focus the editor and set up events.
		wpcom.addAction( 'aside_box_loaded.iptdragdrop', function() {
			var self = this, ed = tinymce.get( 'ipteditor' ),
				dropper = jq( 'div#instapost-dropper' ), dropperwrap = jq( 'div#instapost-dropper-wrap' );

			// Don't focus in Firefox because of: http://www.tinymce.com/develop/bugtracker_view.php?id=4841
			if ( ed && !jq.browser.mozilla )
				ed.focus();

			// Listen for drags over with a file, then bring the "instapost-dropper" div up so the uploader catches the file
			if ( jq.browser.mozilla || jq.browser.webkit ) {
				jq( '#ipt-form' ).bind( 'dragenter.ipt', function(e) {
					if ( instapost.get_post_format() != 'aside' )
						return;

					var i, is_file = false, types = e.originalEvent.dataTransfer.types;

					if ( types ) {
						for ( i in types ) {
							if ( 'Files' == types[i] ) {
								is_file = true;
								break;
							}
						}
					}

					if ( !is_file )
						return;

					e.preventDefault();
					dropperwrap.addClass('show').children('p:first').css('margin-top', (dropperwrap.height() - 30) / 2 + 'px');

					if ( e.originalEvent.dataTransfer ) {
						e.originalEvent.dataTransfer.dropEffect = 'copy';
					}
					return false;
				} );

				// Listen for drops on and drag leaves.
				dropper.bind( 'dragleave.ipt', function() {
					dropperwrap.removeClass('show');
				} )
				.bind( 'drop.ipt', function( e ) {
					var img, reader, dt = e.originalEvent.dataTransfer, file;

					if ( instapost.get_post_format() != 'aside' )
						return;

					dropperwrap.removeClass('show');

					if ( !dt || !dt.files || dt.files.length )
						return;

					file = e.originalEvent.dataTransfer.files[0];
					instapost.temp_files[file.name] = instapost.temp_files_index++;
					img = document.createElement( 'img' );
					img.className = 'size-full wp-image alignleft img-loading';
					reader = new FileReader();
					reader.onload = (function(aImg) { return function(e) {
						aImg.src = e.target.result;
						instapost.add_photo_to_aside( jq( '<span></span>' ).append( jq( '<a id="temp-file-' + instapost.temp_files[file.name] + '" class="temp-file"></a>' ).append( aImg ) ).html(), jq( 'form.ipt-upload-form', body_aside ) );
					}; })(img);
					reader.readAsDataURL(e.originalEvent.dataTransfer.files[0]);

					e.preventDefault();
				} );
			}
		});
	},

	/**
	 * instapost.bind_image()
	 *
	 * Bind all events used for the image post format.
	 */
	bind_image: function() {
		var body_image = jq('div.ipt-form-body-image'), form = jq('form#ipt-form-image-upload-image');

		// Change upload photo file input on image form.
		jq( 'input.ipt-upload', form ).bind( 'change.ipt', function() {
			jq( '.blog_id', form ).val( instapost.get_blog_id() );
			form.submit();
			form.get(0).reset();
		} );

		form.bind( 'submit.ipt', function() {
			instapost.upload_image_file( jq(this) );
		} );

		wpcom.addAction( 'ipt_while_switching_formats.bindimage', function( postformat ) {
			if ( postformat == 'image' ) {
				if ( !jq( '#ipt-uploaded-image-id' ).val() )
					jq( '#ipt-form-publish' ).prop( 'disabled', true );
				else
					instapost.toggle_blog_select(true);
			}
		});
	},

	/**
	 * instapost.bind_video()
	 *
	 * Bind all events used for the video post format.
	 */
	bind_video: function() {
		var body_video = jq('div.ipt-form-body-video'), form = jq( 'form#ipt-form-video-upload-video' );

		// Change upload video file input on video form.
		jq( 'input.ipt-upload', form ).bind( 'change.ipt', function() {
			jq( '.blog_id', form ).val( instapost.get_blog_id() );
			form.submit();
			form.get(0).reset();
		} );

		form.bind( 'submit.ipt', function() {
			instapost.upload_video_file( jq(this) );
		} );

		wpcom.addAction( 'ipt_while_switching_formats.bindvideo', function( postformat ) {
			if ( postformat == 'video' ) {
				if ( !jq( '#ipt-uploaded-video-url' ).length )
					jq( '#ipt-form-publish' ).prop( 'disabled', true );
				else
					instapost.toggle_blog_select(true);
			}
		});
/*
		// Listen for a content change and update the live preview?
		wpcom.addAction( 'ipt_video_content_change.ipt', function() {

		});
*/
	},

	/**
	 * instapost.bind_quote()
	 *
	 * Bind events used for the quote post format.
	 */
/*	bind_quote: function() {
		// Listen for a content change and update the live preview.
		wpcom.addAction( 'quote_content_change.ipt', function() {

		});
	},
*/

	/**
	 * instapost.bind_link()
	 *
	 * Bind events used for the link post format.
	 */
/*	bind_link: function() {
		// Listen for a content change and update the live preview.
		wpcom.addAction( 'link_content_change.ipt', function() {

		});
	},
*/

	/**
	 * instapost.init_input_vals()
	 *
	 * Automatically go through every form input and register the label so we can clear/restore it on focus/blur.
	 */
	init_input_vals: function() {
		var self = this, scope = jq('#ipt-wrap');

		// Clear input field values when they are focused.
		scope.on( 'focus.iptval', 'input[type="text"], textarea', function(e) {
			instapost.clear_input( jq(e.target) );
		} );

		// Restore input field initial values when they are blured.
		scope.on( 'blur.iptval', 'input[type="text"], textarea', function(e) {
			instapost.restore_input( jq(e.target) );
		} );

		// Mark as changed on keyup. Then save_draft will run and reset it after saving
		scope.on( 'keyup.iptchange', 'input[type="text"], textarea', function(e){
			jq(e.target).data('ipt_changed', '1');
		} );
	},

	/**
	 * instapost.clear_input()
	 *
	 * Clear the label from a form input when it is focused.
	 */
	clear_input: function( el ) {
		if ( el.data('default_val') == el.val() )
			el.val('');
	},

	/**
	 * instapost.restore_input()
	 *
	 * Restore the label from a form input when it is blured.
	 */
	restore_input: function( el ) {
		if ( el.data('default_val') && el.val() == '' )
			this.reset_input(el);
	},

	/**
	 * instapost.reset_input()
	 *
	 * Reset an input back to it's initial load state.
	 */
	reset_input: function( el ) {
		var default_val = el.data('default_val') || '';
		el.val( default_val );
	},

	/**
	 * instapost.get_val()
	 *
	 * Get the value of an input field skipping the default val.
	 */
	get_val: function( el ) {
		var default_val = el.data('default_val'), val = el.val();

		if ( default_val && default_val == val )
			return '';

		return val;
	},

	/**
	 * instapost.set_ed_label()
	 *
	 * Show/hide the label for the editor on the quote and link tabs
	 */
	set_ed_label: function( hide ) {
		var ed = tinymce.get('ipteditor'), postformat = this.get_post_format();

		if ( !ed || ('quote' != postformat && 'link' != postformat) )
			return;

		if ( hide || ed.getContent() )
			jq('p.ipt-ed-label').hide();
		else
			jq('p.ipt-ed-label').show();
	},

	/**
	 * instapost.post_format_select()
	 *
	 * When a post format is selected from the format nav this is run and the input UI for the format is shown.
	 */
	post_format_select: function( el ) {
		var li = el.closest('li'), postformat = li.data('postformat'), iptform = jq( '#ipt-form' );

		this.postformat = postformat;

		jq( '#ipt-form-formats li', iptform ).removeClass('selected');
		li.addClass('selected');

		jq( 'p.ipt-error', iptform ).hide();
		jq( '#ipt-posted, #ipt-preview' ).fadeOut( 'fast', function() { jq(this).remove(); } );

		jq('.ipt-form-body', iptform).fadeOut(200, function(){
			// tab switching, all hidden
			iptform.attr( 'class', iptform.attr('class').replace(/ipt-show-[^ ]+/, '') );
			iptform.addClass('ipt-show-' + postformat);
			jq('#ipt-form-publish').prop( 'disabled', false ).val( instapost_text['publish_' + postformat] );

			wpcom.doAction('ipt_while_switching_formats', postformat);
			instapost.set_ed_label();
			instapost.toggle_blog_select();

			jq(this).fadeIn(200, function(){
				//tab switched, new tab shown
				wpcom.doAction('ipt_after_switching_formats', postformat);
			});
		});

		jq( '#wp_editbtns' ).hide();
		jq( '#iframe-preview' ).fadeOut( 'fast' );
	},

	prepare_data: function(data) {
		var self = this, post = {}, post_id = false, blog_id = false, current_blog_id = self.get_blog_id(), pub_button = jq( '#ipt-form-publish' );

		data = data || {};
		this.remove_error_div(true);

		if ( typeof self.preview_request == 'object' && self.preview_request.readyState != 4 )
			self.preview_request.abort();

		if ( self.current_draft.post_id ) {
			if ( !current_blog_id || self.current_draft.blog_id == current_blog_id ) {
				post_id = self.current_draft.post_id;
				blog_id = self.current_draft.blog_id;
			}
		}

		if ( !blog_id )
			blog_id = current_blog_id;

		// Disable the Publish button while saving
		pub_button.prop( 'disabled', true );
		
		if ( data.is_publish )
			pub_button.addClass( 'ipt-publishing' ).val( instapost_text.publishing );

		post = {
			action: 'instapost_publish',
			_wpnonce: jq('#ipt_nonce').val(),
			post_subscribe: jq( '#ipt-notify-comments' ).is( ':checked' ),
			tags: jq( '#ipt-tags-input' ).val(),
			post_id: post_id,
			blog_id: blog_id
		};

		data.ipt_referrer  = jq( 'div#instapost' ).attr( 'class' ).replace( 'ref-', '' );
		
		if ( top.location.hash && data.ipt_referrer.match('newdash') ) {
			if ( top.location.hash.match(/\/welcome\/step\/post/) )
				data.ipt_referrer += '-nux';
			else if ( top.location.hash.match(/\/post/) )
				data.ipt_referrer += '-tab';
		}

		return jq.extend(post, data);
	},

	publish_callback: function(r) {
		var wrap = jq('#ipt-wrap');

		if ( r.error ) {
			instapost.remove_error_div();
			jq( '.ipt-form-body', wrap ).prepend( '<p class="ipt-error">' + r.error + '</p>' );
			jq( 'p.ipt-error', wrap ).hide().fadeIn( 200 );
			
			if ( jq( 'div#instapost' ).hasClass( 'ref-toolbar' ) ) {
				setTimeout( function() {
					jq( 'p.ipt-error', wrap ).fadeOut( 200 );
				}, 3500 );
			}
			jq( '#ipt-form-publish', wrap ).prop( 'disabled', false ).removeClass( 'ipt-publishing' ).val( instapost_text.publish_aside );
		} else {
			instapost.render_post( r, 'publish' );
		}
	},

	/**
	 * instapost.publish_aside()
	 *
	 * When a user clicks the publish button, this function is run to publish the post.
	 */
	publish_aside: function() {
		var self = this, data, post_id;

		// Stop the save_draft so we don't update the preview any more.
		clearInterval( this.save_interval );
		this.publish_loading = true;

		data = {
			postformat: 'aside',
			post_title: self.get_val( jq( '#ipt-aside-title input' ) ),
			post_content: tinymce.get('ipteditor').getContent(),
			image_ids: instapost.aside_image_ids,
			is_publish: 1
		}
		data = self.prepare_data(data);

		jq.post( instapost_text.ajaxurl, data, function(r){ self.publish_callback(r); }, 'json' );
	},

	/**
	 * instapost.preview_aside()
	 *
	 * Save a draft of the aside post and return the HTML output so a preview can be shown to the user.
	 */
	preview_aside: function() {
		var self = this, data, post_title_el = jq( '#ipt-aside-title input' ), ed = tinymce.get('ipteditor');

		// If there's an issue don't try and save more drafts.
		if ( !ed || -1 == self.draft_ids.aside || ( false == self.draft_ids.aside && self.preview_loading ) )
			return;

		// check for content changed flags
		if ( post_title_el.data('ipt_changed') || ed.isDirty() ) {
			post_title_el.data('ipt_changed', false);
			ed.isNotDirty = true;
		} else {
			return;
		}

		self.preview_loading = true;

		// Save a draft.
		data = {
			postformat: 'aside',
			is_draft: 1,
	//		image_ids: instapost.aside_image_ids,
			post_title: self.get_val( post_title_el ),
			post_content: ed.getContent()
		}
		data = self.prepare_data(data);

		self.preview_request = jq.post( instapost_text.ajaxurl, data, function(r) {
			if ( !r.error ) {
				if ( r.post_id ) {
					instapost.draft_ids.aside = r.post_id;
					instapost.render_post( r, 'preview', 'aside' );
				}
			} else {
				if ( false == instapost.draft_ids.aside )
					instapost.draft_ids['aside'] = -1;

				instapost.publishing_error();
			}

			instapost.preview_loading = false;
		}, 'json' );
	},

	/**
	 * instapost.publish_image()
	 *
	 * When a user clicks the publish button on the image format, this function is run to publish the post.
	 */
	publish_image: function() {
		var self = this, data, image = self.parse_image_data();

		// check if an image has been uploaded
//		if ( !image.id )
//			return;

		// Stop the save_draft so we don't update the preview any more.
		clearInterval( self.save_interval );
		self.publish_loading = true;
		delete( image.do_save );

		data = {
			postformat: 'image',
			image: image,
			is_publish: 1
		};
		data = self.prepare_data(data);

		jq.post( instapost_text.ajaxurl, data, function(r){ self.publish_callback(r); }, 'json' );
	},

	/**
	 * instapost.preview_image()
	 *
	 * Save a draft of the image post and return the HTML output so a preview can be shown to the user.
	 */
	preview_image: function() {
		var self = this, data, image;

		// If there's an issue don't try and save more drafts.
		if ( -1 == self.draft_ids.image || ( false == self.draft_ids.image && self.preview_loading ) )
			return;

		image = self.parse_image_data();
		// check if an image has been uploaded and then if any of the fields have been changed
		if ( !image.id || !image.do_save )
			return;

		delete( image.do_save );
		self.preview_loading = true;

		// Save a draft.
		data = {
			postformat: 'image',
			is_draft: 1,
			image: image
		};
		data = self.prepare_data(data);

		this.preview_request = jq.post( instapost_text.ajaxurl, data, function(r) {
			if ( !r.error ) {
				if ( r.post_id ) {
					instapost.draft_ids.image = r.post_id;
					instapost.render_post( r, 'preview', 'image' );
				}
			} else {
				if ( false == instapost.draft_ids.image )
					instapost.draft_ids['image'] = -1;

				instapost.publishing_error();
			}

			instapost.preview_loading = false;
		}, 'json' );
	},

	/**
	 * instapost.cancel_image()
	 *
	 * Cancel the image format UI and restore it back to it's initial state. Delete the draft post if once has been saved to preview.
	 */
	cancel_image: function() {
		// Remove any uploaded photos
		jq( 'div.ipt-form-upload-zone > div', jq( 'div.ipt-form-body-image' ) ).addClass( 'hide' );
		jq( 'img', jq( 'div#ipt-image-uploaded' ) ).remove();
		jq( 'div#ipt-upload-image-via-file', jq( 'div.ipt-form-upload-zone' ) ).removeClass( 'hide' );
		jq( 'textarea', jq( 'div#ipt-upload-image-via-url' ) ).val(instapost_text.photo_url);

		// Clear the draft and hide any previews
		instapost.trash_current_draft();
		jq( 'div#ipt-preview' ).slideUp( 'fast', function() { jq(this).remove(); } );
		instapost.draft_ids.image = false;
		instapost.toggle_blog_select();
	},

	/**
	 * instapost.publish_video()
	 *
	 * When a user clicks the publish button on the video format, this function is run to publish the post.
	 */
	publish_video: function() {
		var self = this, data, video = self.parse_video_data();

		// Stop the save_draft so we don't update the preview any more.
		clearInterval( self.save_interval );
		self.publish_loading = true;
		delete( video.do_save );

		data = {
			postformat: 'video',
			video: video,
			is_publish: 1
		};
		data = self.prepare_data(data);

		jq.post( instapost_text.ajaxurl, data, function(r){ self.publish_callback(r); }, 'json' );
	},

	/**
	 * instapost.preview_video()
	 *
	 * Save a draft of the video post and return the HTML output so a preview can be shown to the user.
	 */
	preview_video: function() {
		var self = this, data, video;

		// If there's an issue don't try and save more drafts.
		if ( -1 == self.draft_ids.video || ( false == self.draft_ids.video && self.preview_loading ) )
			return;

		// Save a draft.
		video = self.parse_video_data();
		if ( !video.url || !video.do_save )
			return;

		self.preview_loading = true;
		delete( video.do_save );

		data = {
			postformat: 'video',
			is_draft: 1,
			video: video
		};
		data = self.prepare_data(data);

		this.preview_request = jq.post( instapost_text.ajaxurl, data, function(r) {
			if ( !r.error ) {
				if ( r.post_id ) {
					instapost.draft_ids.video = r.post_id;
					instapost.render_post( r, 'preview', 'video' );
				}
			} else {
				if ( false == instapost.draft_ids.video )
					instapost.draft_ids['video'] = -1;

				instapost.publishing_error();
			}

			instapost.preview_loading = false;
		}, 'json' );
	},

	/**
	 * instapost.cancel_video()
	 *
	 * Cancel the video format UI and restore it back to it's initial state. Delete the draft post if once has been saved to preview.
	 */
	cancel_video: function() {
		// Remove any uploads
		jq( 'img', jq( 'div#ipt-video-uploaded' ) ).remove();
		jq( 'div#ipt-upload-video-via-file', jq( 'div.ipt-form-upload-zone' ) ).removeClass( 'hide' );
		jq( 'textarea', jq( 'div#ipt-upload-video-via-url' ) ).val(instapost_text.video_url);

		// Clear the draft and hide any previews
		instapost.trash_current_draft();
		jq( 'div#ipt-preview' ).slideUp( 'fast', function() { jq(this).remove(); } );
		instapost.draft_ids.video = false;
		instapost.toggle_blog_select();
	},

	/**
	 * instapost.publish_quote()
	 *
	 * When a user clicks the publish button on the quote format, this function is run to publish the post.
	 */
	publish_quote: function() {
		var self = this, data;

		// Stop the save_draft so we don't update the preview any more.
		clearInterval( self.save_interval );
		self.publish_loading = true;

		data = {
			postformat: 'quote',
			quote: self.get_val( jq( 'div#ipt-quote-content textarea' ) ),
			caption: tinymce.get('ipteditor').getContent(),
			is_publish: 1
		};
		data = self.prepare_data(data);

		jq.post( instapost_text.ajaxurl, data, function(r){ self.publish_callback(r); }, 'json' );
	},

	/**
	 * instapost.preview_quote()
	 *
	 * Save a draft of the quote post and return the HTML output so a preview can be shown to the user.
	 */
	preview_quote: function() {
		var self = this, data, ed = tinymce.get('ipteditor'), quote_el = jq( 'div#ipt-quote-content textarea' );

		// If there's an issue don't try and save more drafts.
		if ( -1 == self.draft_ids.quote || ( false == self.draft_ids.quote && self.preview_loading ) )
			return;

		// check for content changed flags
		if ( quote_el.data('ipt_changed') || ed.isDirty() ) {
			quote_el.data('ipt_changed', false);
			ed.isNotDirty = true;
		} else {
			return;
		}

		self.preview_loading = true;

		// Save a draft.
		data = {
			postformat: 'quote',
			is_draft: 1,
			quote: self.get_val( quote_el ),
			caption: ed.getContent()
		};
		data = this.prepare_data(data);

		this.preview_request = jq.post( instapost_text.ajaxurl, data, function(r) {
			if ( !r.error ) {
				if ( r.post_id ) {
					instapost.draft_ids.quote = r.post_id;
					instapost.render_post( r, 'preview', 'quote' );
				}
			} else {
				if ( false == instapost.draft_ids.quote )
					instapost.draft_ids['quote'] = -1;

				instapost.publishing_error();
			}

			instapost.preview_loading = false;
		}, 'json' );
	},

	/**
	 * instapost.publish_link()
	 *
	 * When a user clicks the publish button on the link format, this function is run to publish the post.
	 */
	publish_link: function() {
		var self = this, data;

		// Stop the save_draft so we don't update the preview any more.
		clearInterval( self.save_interval );
		self.publish_loading = true;

		data = {
			postformat: 'link',
			url: self.get_val( jq( 'div#ipt-link-url input' ) ),
			title: self.get_val( jq( 'div#ipt-link-title input' ) ),
			desc: tinymce.get('ipteditor').getContent(),
			is_publish: 1
		};
		data = self.prepare_data(data);

		jq.post( instapost_text.ajaxurl, data, function(r){ self.publish_callback(r); }, 'json' );
	},

	/**
	 * instapost.preview_link()
	 *
	 * Save a draft of the link post and return the HTML output so a preview can be shown to the user.
	 */
	preview_link: function() {
		var self = this, data, ed = tinymce.get('ipteditor'),
			url_el = jq( 'div#ipt-link-url input' ), title_el = jq( 'div#ipt-link-title input' );

		// If there's an issue don't try and save more drafts.
		if ( -1 == self.draft_ids.link || ( false == self.draft_ids.link && self.preview_loading ) )
			return;

		// check for content changed flags
		if ( url_el.data('ipt_changed') || title_el.data('ipt_changed') || ed.isDirty() ) {
			url_el.data('ipt_changed', false);
			title_el.data('ipt_changed', false);
			ed.isNotDirty = true;
		} else {
			return;
		}

		self.preview_loading = true;

		// Save a draft.
		data = {
			postformat: 'link',
			is_draft: 1,
			url: self.get_val( url_el ),
			title: self.get_val( title_el ),
			desc: ed.getContent()
		};
		data = self.prepare_data(data);

		this.preview_request = jq.post( instapost_text.ajaxurl, data, function(r) {
			if ( !r.error ) {
				if ( r.post_id ) {
					instapost.draft_ids.link = r.post_id;
					instapost.render_post( r, 'preview', 'link' );
				}
			} else {
				if ( false == instapost.draft_ids.link )
					instapost.draft_ids['link'] = -1;

				instapost.publishing_error();
			}

			instapost.preview_loading = false;
		}, 'json' );
	},
	
	/**
	 * instapost.publishing_error()
	 *
	 * Remove #ipt-preview and enable the Publish button.
	 */
	publishing_error: function() {
		jq( 'div#ipt-preview' ).slideUp( 'fast', function() { jq(this).remove(); } );
		jq( '#ipt-form-publish' ).prop( 'disabled', false ).removeClass( 'ipt-publishing' );
	},

	/**
	 * instapost.render_post()
	 *
	 * Output the published or previewed post to the browser.
	 */
	render_post: function( response, status, postformat ) {
		var self = this, pub_button = jq( '#ipt-form-publish' );

		if ( !postformat && response.postformat ) {
			if ( response.postformat == 'standard' )
				response.postformat = 'aside';

			postformat = response.postformat;
		}

		pub_button.prop( 'disabled', false ).removeClass( 'ipt-publishing' );
		this.hide_tags();

		self.current_draft = {
			post_id: response.post_id,
			blog_id: response.blog_id,
			postformat: postformat,
			status: status
		};

		if ( 'publish' == status ) {
			instapost.post_id = response.post_id;

			// Remove ref to draft post_id. It's a published post now.
			self.current_draft.post_id = 0;

			if ( postformat && instapost_text.hasOwnProperty('publish_' + postformat) )
				pub_button.val( instapost_text['publish_' + postformat] );

			jq( 'div#ipt-preview' ).slideUp( 200, function() { jq(this).remove(); } );
			jq( '#ipt-wrap' ).fadeOut( 350, function() {
				
				jq( 'div#ipt-posted' ).remove();
				jq('#ipt-wrap').after( response.result );
				jq( 'div#ipt-posted' ).fadeIn( 350, function() {
					instapost.publish_loading = false;
					
					// Bind the reset button
					jq( '#ipt-posted' ).find( '.ipt-new-post' ).off( 'click.ipt' ).on( 'click.ipt', function(e) {
						e.preventDefault();
						instapost.reset();
					});	
					
					jq(document).trigger( 'ipt_published_post_rendered' );
				} );

				jq( 'ul#ipt-form-formats' ).children('li').removeClass('selected');

				// reset
				if ( instapost['cancel_' + postformat] )
					instapost['cancel_' + postformat]();
			} );
		} else {
			//disable for now
			return;

			// If a post is being published then don't update or show the preview.
			if ( instapost.publish_loading )
				return;

			if ( !jq( 'div#ipt-preview' ).length ) {
				if ( response.prepend_to )
					jq( response.prepend_to ).prepend( response.result );
				else
					jq( 'div#ipt-form' ).after( response.result );

				jq( 'div#ipt-preview' ).hide();

				setTimeout( function() {
					jq( 'div#ipt-preview' ).css( 'height', 'auto' ).hide().slideDown( 400 );

					wpcom.doAction( 'ipt_preview_post_rendered' );
				}, 150 );
			} else {
				jq( 'div#ipt-preview' ).css( 'height', 'auto' ).html( jq(response.result).find('#ipt-preview').html() );
			}
		}
	},

	/**
	 * instapost.trash_current_draft()
	 *
	 * Trash the draft post used to preview the post to a user.
	 */
	trash_current_draft: function() {
		var self = instapost, current_blog_id = self.get_blog_id(), post_id = self.current_draft.post_id, blog_id = self.current_draft.blog_id;

		if ( !post_id || !blog_id )
			return;

		if ( !current_blog_id || current_blog_id == blog_id )
			return;

		jq.post( instapost_text.ajaxurl, {
			action: 'instapost_trash_draft',
			_wpnonce: jq('#ipt_nonce').val(),
			post_id: post_id,
			blog_id: blog_id
		} );

		self.current_draft.post_id = 0;
	},

	/**
	 * instapost.render_aside_photo()
	 *
	 * When a user uploads an image on the text post tab, this function will render it to the editor and add the attachment ID to the array.
	 */
	render_aside_photo: function( form ) {
		form.children( 'label' ).addClass('ipt-loading').children( 'span.text' ).html( instapost_text.uploading );

		jq( 'iframe#ipt-upload-iframe' ).unbind( 'load.ipt' ).bind( 'load.ipt', function() {
			instapost.add_photo_to_aside( jq( 'iframe#ipt-upload-iframe' ).contents().find('body').html(), form );
		});
	},

	/**
	 * instapost.render_aside_photo()
	 *
	 * Handles adding an image to the aside format, either via the upload button or from dropping and image onto Instapost.
	 */
	add_photo_to_aside: function( html_string, form ) {
		if ( !html_string.length )
			return;

		var ed = tinymce.get( 'ipteditor' ),
		    html   = jq( html_string ),
		    img    = html.find('img'),
		    file   = img.data( 'filename' ),
		    iptform = jq( '#ipt_form' ),
		    temp, preloader, addToEditor;

		if ( !img.size() )
			return;

		addToEditor = function() {
			var node;

			if ( file && instapost.temp_files[file] ) {
				node = jq( html_string ).get(0);
				ed.dom.replace( node, ed.dom.select( '#temp-file-' + instapost.temp_files[file] ) );
			} else {
				ed.execCommand( 'mceInsertContent', false, html_string );
			}

			if ( img.attr( 'id' ) ) {
				instapost.aside_image_ids.push( img.attr( 'id' ).replace( 'i-', '' ) );
				form.children( 'label' ).removeClass('ipt-loading').children( 'span.text' ).html( instapost_text.upload_photo );

				// action
				wpcom.doAction( 'aside_content_change' );
			}

			jq( '.ipt-form-body-aside input.ipt-upload', iptform ).val('');
		};

		if ( 'boolean' === typeof img.get(0).complete ) {
			if ( img.get(0).complete ) {
				addToEditor();
			} else {
				img.load( addToEditor );
			}
		} else {
			jq( '<img />' ).load( addToEditor ).attr( 'src', img.attr( 'src' ) );
		}
	},

	/**
	 * instapost.upload_image_file()
	 *
	 * Used by the image post format UI to upload an image.
	 */
	upload_image_file: function( form ) {
		var div, data, body_image = jq( 'div.ipt-form-body-image' );

		this.remove_error_div(true);

		// Hide the upload UI and show the uploading spinner.
		jq( 'div.ipt-upload-via', body_image ).addClass( 'hide' );
		jq( 'div#ipt-image-uploading', body_image ).removeClass( 'hide' );

		jq( 'iframe#ipt-upload-iframe' ).unbind( 'load.ipt' ).bind( 'load.ipt', function() {
			// If there was an upload error, show it and reset the UI.
			if ( jq( 'iframe#ipt-upload-iframe' ).contents().find('p.ipt-error').length ) {
				instapost.cancel_image();
				return;
			}

			div = jq( 'iframe#ipt-upload-iframe' ).contents().find('div.response');

			if ( div.length ) {
				data = {
					image_src: div.data('src'),
					image_id: div.data('id')
				};

				// Render the image thumbnail to the page and enable the UI.
				instapost.render_image_thumb( data );
			}
		});
	},

	/**
	 * instapost.upload_image_url()
	 *
	 * Used by the image post format UI to request a remote image URL, download it and upload it to the user's blog.
	 */
	upload_image_url: function( url ) {
		var body_image = jq( 'div.ipt-form-body-image' );

		this.remove_error_div(true);

		// Hide the upload UI and show the uploading spinner.
		jq( 'div.ipt-upload-via', body_image ).addClass( 'hide' );
		jq( 'div#ipt-image-uploading', body_image ).removeClass( 'hide' );

		jq.post( instapost_text.ajaxurl, {
			'action': 'instapost_upload_image_format_url',
			'_wpnonce': jq('#ipt_nonce').val(),
			'url': url
		},
		function(r) {
			// If there was an upload error, show it and reset the UI.
			if ( r.error ) {
				instapost.cancel_image();
				return;
			}

			// Render the image thumbnail to the page and enable the UI.
			instapost.render_image_thumb( r );
		}, 'json' );
	},

	/**
	 * instapost.render_image_thumb()
	 *
	 * Once the image has been uploaded in the background this function will display a thumbnail of the image to the user.
	 */
	render_image_thumb: function( data ) {
		var set_thumb, body_image = jq( 'div.ipt-form-body-image' );

		set_thumb = function() {
			// Get height of uploaded div and center it vertically.
			var containerheight = jq( 'div.ipt-form-upload-zone', body_image ).height(),
				imgheight = jq( 'div#ipt-image-uploaded', body_image ).height(),
				margintop = ( containerheight - imgheight )	/ 2;

			jq( 'div#ipt-image-uploaded' ).css( { 'marginTop': margintop + 'px' } );

			jq( 'div#ipt-image-uploading' ).addClass( 'hide' );
			jq( 'div#ipt-image-uploaded' ).removeClass( 'hide' );

			// Enable the publish button
			jq( '#ipt-form-publish' ).prop( 'disabled', false );
		};

		// Set the image ID.
		jq( 'input#ipt-uploaded-image-id' ).val( data.image_id );
		jq( 'div#ipt-image-uploaded' ).prepend( jq( '<img />' ).bind( 'load', function(){ set_thumb(); } ).attr( 'src', data.image_src ) );

		wpcom.doAction( 'ipt_image_content_change' );
	},

	/**
	 * instapost.parse_image_data()
	 *
	 * Fetch the image details from the UI based on the image ID.
	 */
	parse_image_data: function() {
		var self = this, image, do_save = false, id = jq( '#ipt-uploaded-image-id' ), title = jq( '#ipt-uploaded-image-title input' ),
			caption = jq( '#ipt-uploaded-image-caption textarea' ), link = jq( '#ipt-uploaded-image-link input' );

		jq.each( [title, caption, link], function( i, el ){
			if ( el.data('ipt_changed') ) {
				el.data('ipt_changed', false);
				do_save = true;
			}
		});

		image = {
			id: id.val(),
			title: self.get_val( title ),
			caption: self.get_val( caption ),
			link: self.get_val( link ),
			do_save: do_save
		};

		return image;
	},

	/**
	 * instapost.switch_upload_type()
	 *
	 * Switch between file and url upload types when a user clicks the link on image and video formats.
	 */
	switch_upload_type: function( link ) {
		link.closest( 'div.ipt-upload-via' ).addClass( 'hide' ).siblings( 'div.ipt-upload-via' ).removeClass( 'hide' );
	},

	/**
	 * instapost.upload_video_file()
	 *
	 * Used by the video post format UI to upload a video.
	 */
	upload_video_file: function( form ) {
		var body_video = jq( 'div.ipt-form-body-video' );

		this.remove_error_div();

		// Hide the upload UI and show the uploading spinner.
		jq( 'div.ipt-upload-via', body_video ).addClass( 'hide' );
		jq( 'div#ipt-video-uploading', body_video ).removeClass( 'hide' );

		jq( 'iframe#ipt-upload-iframe' ).unbind( 'load.ipt' ).bind( 'load.ipt', function() {
			instapost.render_video_ui( jq( 'iframe#ipt-upload-iframe' ).contents().find('body').html() );
		});
	},

	/**
	 * instapost.upload_video_url()
	 *
	 * Used by the video post format UI to request a remote video URL and prepare it for embedding.
	 */
	upload_video_url: function( url ) {
		var body_video = jq( 'div.ipt-form-body-video' );

		this.remove_error_div();

		// Hide the upload UI and show the uploading spinner.
		jq( 'div.ipt-upload-via', body_video ).addClass( 'hide' );
		jq( 'div#ipt-video-uploading', body_video ).removeClass( 'hide' );

		jq.post( instapost_text.ajaxurl, {
			'action': 'instapost_validate_video_format_url',
			'_wpnonce': jq('#ipt_nonce').val(),
			'url': url
		},
		function(r) {
			if ( r.error ) {
				instapost.cancel_video();
				return;
			}
			instapost.render_video_ui( r.result );
		}, 'json' );
	},

	/**
	 * instapost.render_video_ui()
	 *
	 * When the video has been selected, this UI is displayed so the user can add video meta.
	 */
	render_video_ui: function( ui ) {
		var body_video = jq( 'div.ipt-form-body-video' );

		if ( -1 == ui.search( 'ipt-uploaded' ) ) {
			this.cancel_video();
			//jq( 'div.ipt-form-body' ).prepend( '<p class="ipt-error">' + ui + '</p>' );
			return;
		}

		// Prepend the video player.
		jq( 'div#ipt-video-uploaded', body_video ).prepend( ui );

		// Hide the other divs
		jq( 'div#ipt-video-uploading', body_video ).addClass( 'hide' );
		jq( 'div#ipt-video-uploaded', body_video ).removeClass( 'hide' );
		wpcom.doAction( 'ipt_video_content_change' );

		// Enable the publish button
		jq( '#ipt-form-publish' ).prop( 'disabled', false );
	},

	/**
	 * instapost.parse_video_data()
	 *
	 * Fetch the video details from the UI based on the video ID.
	 */
	parse_video_data: function() {
		var self = this, video, do_save = false, id = jq( '#ipt-uploaded-video-id' ), url = jq( '#ipt-uploaded-video-url' ),
			title = jq( '#ipt-uploaded-video-title input' ), caption = jq( '#ipt-uploaded-video-caption textarea' ), link = jq( '#ipt-uploaded-video-link input' );

		jq.each( [title, caption, link], function( i, el ){
			if ( el.data('ipt_changed') ) {
				el.data('ipt_changed', false);
				do_save = true;
			}
		});

		video = {
			id: id.val(),
			url: url.val(),
			title: self.get_val( title ),
			caption: self.get_val( caption ),
			link: self.get_val( link ),
			do_save: do_save
		};

		return video;
	},

	/**
	 * instapost.toggle_upload_button()
	 *
	 * When a user pastes an image or video URL, toggle the display of the upload/embed button in the UI.
	 */
	toggle_upload_button: function( input ) {
		var parent = input.parent(), term;

		if ( input.val() == '' ) {
			jq( '.ipt-url-upload', parent ).fadeOut( 400, function() {
				jq(this).remove();
			});
		} else {
			// show the upload button
			if ( !jq( '.ipt-url-upload', parent ).length ) {
				if ( -1 == input.parent().attr( 'id' ).search('video') )
					term = instapost_text.upload;
				else
					term = instapost_text.embed;

				input.after( jq( '<a href="" class="ipt-url-upload" style="display:none;">' + term + '</a>' ).fadeIn( 400 ) );
			}
		}
	},

	/**
	 * instapost.toggle_blog_select()
	 *
	 * Toggle the blog select drop-down
	 */
	toggle_blog_select: function( disable ) {
		if ( disable )
			jq( '.usersblogs' ).addClass('ipt-disabled');
		else
			jq( '.usersblogs' ).removeClass('ipt-disabled');
	},

	/**
	 * instapost.get_post_format()
	 *
	 * Return the current post format, default is 'aside'
	 */
	get_post_format: function() {
		var el = jq('#ipt-form-formats').children('li.selected');
		return el.length ? el.data('postformat') : 'aside';
	},

	remove_error_div: function( slideup ) {
		var err = jq( 'p.ipt-error', jq('#ipt-wrap') );

		if ( slideup )
			err.slideUp( 'fast', function() { jq(this).remove(); } );
		else
			err.remove();
	},

	/**
	 * instapost.get_blog_id()
	 *
	 * Look for a blog selector on the page and return selected value.
	 * If the user has only one blog, return 0.
	 */
	get_blog_id: function() {
		var blog_id = jq( '.postto li.selected' ).data('blogid');

		return blog_id ? blog_id : 0;
	},
	
	/**
	 * instapost.reset()
	 *
	 * Completely reset instapost and restore the post form back to first load status.
	 */
	reset: function() {
		instapost.cancel_image();
		instapost.cancel_video();
		instapost.hide_tags();
		
		// Clear values
		jq.each( jq( '#ipt-wrap' ).find( 'input[type=text], textarea' ), function( i, el ) {
			var el = jq( el );
				el.val( el.data( 'default_val' ) );
		} ); 

		var ed = tinymce.get( 'ipteditor' );
			ed.setContent('');
			ed.focus();
		
		jq( '#ipt-posted' ).fadeOut( 250, function() {
			jq( '#ipt-wrap' ).fadeIn( 250 );
		});
	}
};

;
//fgnass.github.com/spin.js#v1.2.4
(function(window, document, undefined) {

/**
 * Copyright (c) 2011 Felix Gnass [fgnass at neteye dot de]
 * Licensed under the MIT license
 */

	var prefixes = ['webkit', 'Moz', 'ms', 'O']; /* Vendor prefixes */
	var animations = {}; /* Animation rules keyed by their name */
	var useCssAnimations;

	/**
	 * Utility function to create elements. If no tag name is given,
	 * a DIV is created. Optionally properties can be passed.
	 */
	function createEl(tag, prop) {
		var el = document.createElement(tag || 'div');
		var n;

		for(n in prop) {
			el[n] = prop[n];
		}
		return el;
	}

	/**
	 * Appends children and returns the parent.
	 */
	function ins(parent /* child1, child2, ...*/) {
		for (var i=1, n=arguments.length; i<n; i++) {
			parent.appendChild(arguments[i]);
		}
		return parent;
	}

	/**
	 * Insert a new stylesheet to hold the @keyframe or VML rules.
	 */
	var sheet = function() {
		var el = createEl('style');
		ins(document.getElementsByTagName('head')[0], el);
		return el.sheet || el.styleSheet;
	}();

	/**
	 * Creates an opacity keyframe animation rule and returns its name.
	 * Since most mobile Webkits have timing issues with animation-delay,
	 * we create separate rules for each line/segment.
	 */
	function addAnimation(alpha, trail, i, lines) {
		var name = ['opacity', trail, ~~(alpha*100), i, lines].join('-');
		var start = 0.01 + i/lines*100;
		var z = Math.max(1-(1-alpha)/trail*(100-start) , alpha);
		var prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase();
		var pre = prefix && '-'+prefix+'-' || '';

		if (!animations[name]) {
			sheet.insertRule(
				'@' + pre + 'keyframes ' + name + '{' +
				'0%{opacity:'+z+'}' +
				start + '%{opacity:'+ alpha + '}' +
				(start+0.01) + '%{opacity:1}' +
				(start+trail)%100 + '%{opacity:'+ alpha + '}' +
				'100%{opacity:'+ z + '}' +
				'}', 0);
			animations[name] = 1;
		}
		return name;
	}

	/**
	 * Tries various vendor prefixes and returns the first supported property.
	 **/
	function vendor(el, prop) {
		var s = el.style;
		var pp;
		var i;

		if(s[prop] !== undefined) return prop;
		prop = prop.charAt(0).toUpperCase() + prop.slice(1);
		for(i=0; i<prefixes.length; i++) {
			pp = prefixes[i]+prop;
			if(s[pp] !== undefined) return pp;
		}
	}

	/**
	 * Sets multiple style properties at once.
	 */
	function css(el, prop) {
		for (var n in prop) {
			el.style[vendor(el, n)||n] = prop[n];
		}
		return el;
	}

	/**
	 * Fills in default values.
	 */
	function merge(obj) {
		for (var i=1; i < arguments.length; i++) {
			var def = arguments[i];
			for (var n in def) {
				if (obj[n] === undefined) obj[n] = def[n];
			}
		}
		return obj;
	}

	/**
	 * Returns the absolute page-offset of the given element.
	 */
	function pos(el) {
		var o = {x:el.offsetLeft, y:el.offsetTop};
		while((el = el.offsetParent)) {
			o.x+=el.offsetLeft;
			o.y+=el.offsetTop;
		}
		return o;
	}

	var defaults = {
		lines: 12,            // The number of lines to draw
		length: 7,            // The length of each line
		width: 5,             // The line thickness
		radius: 10,           // The radius of the inner circle
		color: '#000',        // #rgb or #rrggbb
		speed: 1,             // Rounds per second
		trail: 100,           // Afterglow percentage
		opacity: 1/4,         // Opacity of the lines
		fps: 20,              // Frames per second when using setTimeout()
		zIndex: 2e9,          // Use a high z-index by default
		className: 'spinner', // CSS class to assign to the element
		top: 'auto',          // center vertically
		left: 'auto'          // center horizontally
	};

	/** The constructor */
	var Spinner = function Spinner(o) {
		if (!this.spin) return new Spinner(o);
		this.opts = merge(o || {}, Spinner.defaults, defaults);
	};

	Spinner.defaults = {};
	Spinner.prototype = {
		spin: function(target) {
			this.stop();
			var self = this;
			var o = self.opts;
			var el = self.el = css(createEl(0, {className: o.className}), {position: 'relative', zIndex: o.zIndex});
			var mid = o.radius+o.length+o.width;
			var ep; // element position
			var tp; // target position

			if (target) {
				target.insertBefore(el, target.firstChild||null);
				tp = pos(target);
				ep = pos(el);
				css(el, {
					left: (o.left == 'auto' ? tp.x-ep.x + (target.offsetWidth >> 1) : o.left+mid) + 'px',
					top: (o.top == 'auto' ? tp.y-ep.y + (target.offsetHeight >> 1) : o.top+mid)  + 'px'
				});
			}

			el.setAttribute('aria-role', 'progressbar');
			self.lines(el, self.opts);

			if (!useCssAnimations) {
				// No CSS animation support, use setTimeout() instead
				var i = 0;
				var fps = o.fps;
				var f = fps/o.speed;
				var ostep = (1-o.opacity)/(f*o.trail / 100);
				var astep = f/o.lines;

				!function anim() {
					i++;
					for (var s=o.lines; s; s--) {
						var alpha = Math.max(1-(i+s*astep)%f * ostep, o.opacity);
						self.opacity(el, o.lines-s, alpha, o);
					}
					self.timeout = self.el && setTimeout(anim, ~~(1000/fps));
				}();
			}
			return self;
		},
		stop: function() {
			var el = this.el;
			if (el) {
				clearTimeout(this.timeout);
				if (el.parentNode) el.parentNode.removeChild(el);
				this.el = undefined;
			}
			return this;
		},
		lines: function(el, o) {
			var i = 0;
			var seg;

			function fill(color, shadow) {
				return css(createEl(), {
					position: 'absolute',
					width: (o.length+o.width) + 'px',
					height: o.width + 'px',
					background: color,
					boxShadow: shadow,
					transformOrigin: 'left',
					transform: 'rotate(' + ~~(360/o.lines*i) + 'deg) translate(' + o.radius+'px' +',0)',
					borderRadius: (o.width>>1) + 'px'
				});
			}
			for (; i < o.lines; i++) {
				seg = css(createEl(), {
					position: 'absolute',
					top: 1+~(o.width/2) + 'px',
					transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
					opacity: o.opacity,
					animation: useCssAnimations && addAnimation(o.opacity, o.trail, i, o.lines) + ' ' + 1/o.speed + 's linear infinite'
				});
				if (o.shadow) ins(seg, css(fill('#000', '0 0 4px ' + '#000'), {top: 2+'px'}));
				ins(el, ins(seg, fill(o.color, '0 0 1px rgba(0,0,0,.1)')));
			}
			return el;
		},
		opacity: function(el, i, val) {
			if (i < el.childNodes.length) el.childNodes[i].style.opacity = val;
		}
	};

	/////////////////////////////////////////////////////////////////////////
	// VML rendering for IE
	/////////////////////////////////////////////////////////////////////////

	/**
	 * Check and init VML support
	 */
	!function() {
		var s = css(createEl('group'), {behavior: 'url(#default#VML)'});
		var i;

		if (!vendor(s, 'transform') && s.adj) {

			// VML support detected. Insert CSS rules ...
			for (i=4; i--;) sheet.addRule(['group', 'roundrect', 'fill', 'stroke'][i], 'behavior:url(#default#VML)');

			Spinner.prototype.lines = function(el, o) {
				var r = o.length+o.width;
				var s = 2*r;

				function grp() {
					return css(createEl('group', {coordsize: s +' '+s, coordorigin: -r +' '+-r}), {width: s, height: s});
				}

				var margin = -(o.width+o.length)*2+'px';
				var g = css(grp(), {position: 'absolute', top: margin, left: margin});

				var i;

				function seg(i, dx, filter) {
					ins(g,
						ins(css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx}),
							ins(css(createEl('roundrect', {arcsize: 1}), {
									width: r,
									height: o.width,
									left: o.radius,
									top: -o.width>>1,
									filter: filter
								}),
								createEl('fill', {color: o.color, opacity: o.opacity}),
								createEl('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
							)
						)
					);
				}

				if (o.shadow) {
					for (i = 1; i <= o.lines; i++) {
						seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)');
					}
				}
				for (i = 1; i <= o.lines; i++) seg(i);
				return ins(el, g);
			};
			Spinner.prototype.opacity = function(el, i, val, o) {
				var c = el.firstChild;
				o = o.shadow && o.lines || 0;
				if (c && i+o < c.childNodes.length) {
					c = c.childNodes[i+o]; c = c && c.firstChild; c = c && c.firstChild;
					if (c) c.opacity = val;
				}
			};
		}
		else {
			useCssAnimations = vendor(s, 'animation');
		}
	}();

	window.Spinner = Spinner;

})(window, document);;
/*
 * Matt Husby https://github.com/matthusby/spin.js
 * Based on the jquery plugin by Bradley Smith
 * https://gist.github.com/1290439
 */

/*
Add spin to the jQuery object
If color is not passed the spinner will be black
You can now create a spinner using any of the variants below:
$("#el").spin(); // Produces default Spinner
$("#el").spin("small"); // Produces a 'small' Spinner
$("#el").spin("large", "white"); // Produces a 'large' Spinner in white (or any valid CSS color).
$("#el").spin({ ... }); // Produces a Spinner using your custom settings.
$("#el").spin("small-right"); // Pin the small spinner to the right edge
$("#el").spin("{small, medium, large}-{left, right, top, bottom}"); // All options for where to pin
$("#el").spin(false); // Kills the spinner.
*/

( function( $ ) {
	$.fn.spin = function( opts, color ) {
		var presets = {
			"small": { lines: 8, length: 2, width: 2, radius: 3, trail: 60, speed: 1.3 },
			"medium": { lines: 8, length: 4, width: 3, radius: 5, trail: 60, speed: 1.3 },
			"large": { lines: 10, length: 6, width: 4, radius: 7, trail: 60, speed: 1.3 }
		};
		if ( Spinner ) {
			return this.each( function() {
				var $this = $( this ),
					data = $this.data();

				if ( data.spinner ) {
					data.spinner.stop();
					delete data.spinner;
				}
				if ( opts !== false ) {
					var spinner_options;
					if ( typeof opts === "string" ) {
						var spinner_base = opts.indexOf( '-' );
						if( spinner_base == -1 ) {
							spinner_base = opts;
						} else {
							spinner_base = opts.substring( 0, spinner_base );
						}
						if ( spinner_base in presets ) {
							spinner_options = presets[spinner_base];
						} else {
							spinner_options = {};
						}
						var padding;
						if ( opts.indexOf( "-right" ) != -1 ) {
							padding = jQuery( this ).css( 'padding-left' );
							if( typeof padding === "undefined" ) {
								padding = 0;
							} else {
								padding = padding.replace( 'px', '' );
							}
							spinner_options.left = jQuery( this ).outerWidth() - ( 2 * ( spinner_options.length + spinner_options.width + spinner_options.radius ) ) - padding - 5;
						}
						if ( opts.indexOf( '-left' ) != -1 ) {
							spinner_options.left = 5;
						}
						if ( opts.indexOf( '-top' ) != -1 ) {
							spinner_options.top = 5;
						}
						if ( opts.indexOf( '-bottom' ) != -1 ) {
							padding = jQuery( this ).css( 'padding-top' );
							if( typeof padding === "undefined" ) {
								padding = 0;
							} else {
								padding = padding.replace( 'px', '' );
							}
							spinner_options.top = jQuery( this ).outerHeight() - ( 2 * ( spinner_options.length + spinner_options.width + spinner_options.radius ) ) - padding - 5;
						}
					}
					if( color ){
						spinner_options.color = color;
					}
					data.spinner = new Spinner( spinner_options ).spin( this );
				}
			});
		} else {
			throw "Spinner class not available.";
		}
	};
})( jQuery );;
