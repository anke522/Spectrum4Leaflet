/**
@classdesc Simple Wraper on XMLHttpRequest, has simple get and post functions
@constructor
*/
Spectrum4Leaflet.Request = {

    /**
	 * Callback function for {Spectrum4Leaflet.Request}
	 *
	 * @callback requestCallback
	 * @param {object} error Error object, with fieds code and message
	 * @param {object} response Response
	 */


    /**
    Creates XMLHttpRequest and binds callbacks
    @private
    */
	_createRequest: function (callback, context){
	    var httpRequest = new XMLHttpRequest();
	
	    httpRequest.onerror = function(e) {
	      callback.call(context, {
	        error: {
	          code: 500,
	          message: 'XMLHttpRequest error'
	        }
	      }, null);
	    };
	
	    httpRequest.onreadystatechange = function(){
	      var response;
	      var error;
	
	      if (httpRequest.readyState === 4) {
	        try {
	          response = JSON.parse(httpRequest.responseText);
	        } catch(e) {
	          response = null;
	          error = {
	            code: 500,
	            message: 'Could not parse response as JSON.'
	          };
	        }
	
	        if (!error && response.error) {
	          error = response.error;
	          response = null;
	        }
	
	        callback.call(context, error, response);
	      }
	    };
	
	    return httpRequest;
    },
    
    /**
    Runs get request
    @param {string} url Url for request
    @param {requestCallback} Callback function, when request is done
    @param {object} context Context for callback
    */
    get: function(url, callback, context){
	    var httpRequest = this._createRequest(callback,context);
	    httpRequest.open('GET', url , true);
        httpRequest.send(null);
        return httpRequest;
    },
    
    /**
    Runs post request
    @param {string} url Url for request
    @param {object} postdata Data to send in request body
    @param {requestCallback} Callback function, when request is done
    @param {object} context Context for callback
    */
    post: function(url, postdata, callback,context){
	    httpRequest.open('POST', url);
        httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        httpRequest.send(postdata);
        return httpRequest;
    }
}