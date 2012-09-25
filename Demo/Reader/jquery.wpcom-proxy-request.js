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
 * Returns:
 *    A request object with two methods:
 *    complete(callback) : assign the callback via a chained method call
 *    abort() : clear the callback. Does not stop the proxy from making the request but
 *              will stop your callback from being called
 *
 *
 * Example:
 *    // For simple GET requests
 *    jQuery.wpcom_proxy_request("/me", function(response, statusCode){
 *      
 *    });
 *
 *    // Chained callback/abort
 *    var request = jQuery.wpcom_proxy_request("/me").complete(function(response, statusCode){
 *      
 *    });
 *    
 *    if(some_condition) request.abort();
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
        var request, append;
        $(window).on('message', receive);
        proxy = document.createElement('iframe');
        proxy.src = "https://public-api.wordpress.com/rest/v1/proxy#" + origin;
        proxy.style.display = 'none';
        $(proxy).on('load', function(){
          ready = true;
          while(request = buffer.shift()) sendRequest(request);
        });
        append = function(){
          setTimeout(function(){
            $(document.body).append(proxy);            
          }, 10);
        };
        if (document.body) {
          append();
        } else {
          $(document).ready(append);
        }
      },
      check = function(e){
        structuredData = 'object' === typeof(e.data);
        $(window).off('message', check);
        buildProxy();
      },
      pop = Array.prototype.pop,
      callbacks = {},
      sendRequest = function(request){
        var data = structuredData ? request : JSON.stringify(request);
        proxy.contentWindow.postMessage(data, proxyOrigin);
      },
      perform = function(){
        var callback = pop.call(arguments),
            request = pop.call(arguments),
            path = pop.call(arguments),
            callback_id;
        
        if ('string' === typeof(request)) request = {path:request};
        if (path) request.path = path;
        do {
          callback_id = Math.random();
        } while('undefined' !== typeof(callbacks[callback_id]));
        callbacks[callback_id] = callback;
        request.callback = callback_id;
        if (ready) {
          // give the calling script a chance to assign a complete callback
          // by scheduling to run on next tick
          setTimeout(function(){
            sendRequest(request);
          }, 1);
        } else {
          buffer.push(request);
        }
        return {
          // to abort the request we clear the callback id, no way to stop 
          // the request inside the proxy at this time
          abort: function(){
            delete callbacks[callback_id];
          },
          // assign a callback
          complete: function(callback){
            callbacks[callback_id] = callback;
          }
        }
      },
      receive = function(e){
        var event = e.originalEvent;
        if (event.origin !== proxyOrigin) return;
        var data = structuredData ? event.data : JSON.parse(event.data),
            callback_id = data.pop(),
            callback = callbacks[callback_id];
        delete callbacks[callback_id];
        if('function' === typeof(callback)) callback.apply(null, data);
      }
  // step 1 do we have postMessage
  if ('function' === typeof(window.postMessage)) {
    $(window).on('message', check);
    window.postMessage({}, origin);
  } else {
    supported = false;
  }
  
  $.wpcom_proxy_request = function(){
    if (!supported) return false;
    return perform.apply(null, arguments);
  }
  
})(jQuery);
