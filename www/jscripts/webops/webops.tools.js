// =================================================================
// 	WebOps Tools
// 	----------------------------------------------------------------
// 
// 	Autor: Oscar Cubillos <tegers77@gmail.com>
// 	Version 1.0
// 	Create: 2012-08-25
// 	Last Modified: 2013-01-14
// 
// =================================================================

//
$.syncAjax = function(url, parameters, onSuccess, onError)
{
    $.log('[syncAjax]: ' + parameters);
	return $.ajax(
	{
		type: 'POST',
		url: url,
		dataType: 'json',
		crossDomain: true,
		data: 'data=' + parameters,
		async: false,
		cache: false,
		beforeSend: function(xhr)
		{
		    xhr.setRequestHeader("Access-Control-Request-Headers", "Access-Control-Allow-Origin=*");
		    if (('ontouchstart' in window))
		    {
		        xhr.setRequestHeader("Cache-Control", "no-cache");
		        xhr.setRequestHeader("pragma", "no-cache");
		    }
		},
		success: onSuccess,
		error: onError
	});
};

//
$.tryCatch = function(options)
{
    var result = false;
    var temp;

    options = $.extend(
    {
        init: null,
        success: null,
        error: null,
        complete: null
    }, options);

    try
    {
        if ($.isFunction(options.init)) temp = options.init();
        if (temp != null) result = temp;

        if ($.isFunction(options.success)) temp = options.success();
        if (temp != null) result = temp;
    }
    catch (e)
    {
        alert('ERROR: ' + e);        

        if ($.isFunction(options.error)) temp = options.error(e);
        if (temp != null) result = temp;
    }
    finally
    {
        if ($.isFunction(options.complete)) temp = options.complete();
        if (temp != null) result = temp;
    }

    return result;
};

$.addFunction = function(object, methods)
{
    for (var name in methods)
    {
        object[name] = methods[name];
    }
}

$.executeFunction = function(func, a, b, c, d, e)
{
    if (typeof (func) == 'function')
        func(a, b, c, d, e);
};

$.goTo = function(page)
{
    return $(page);
};


$.alert = function(msg, btnText, fnCompleted)
{
    var _title = "WebOps",
        _btnText = btnText || 'OK'; //'Done'

    if (('ontouchstart' in window))
    {
        navigator.notification.alert
        (
            msg,            // message
            fnCompleted,    // callback
            _title,         // title
            _btnText        // buttonName
        );
    }
    else
    {
        alert(msg);
    }
};

$.confirm = function(msg, fnCompleted, btnText)
{
    var _title = "WebOps";

    if (('ontouchstart' in window))
    {
        navigator.notification.confirm
        (
            msg,            // message
            function(index)
            {
                if (index == 1) fnCompleted();
            },    // callback
            _title
        );
    }
    else
    {
        if (confirm(msg))
        {
            fnCompleted();
        }
    }
}

$.log = function(msg)
{
    console.log(msg);

    var v = $('#txtDatabaseConsole').val();
    $('#txtDatabaseConsole').val(v + '\n' + msg);
}

// -------------------------------------------------------------------------------
// Extend JavaScript objects.
// -------------------------------------------------------------------------------

	// ****************************
	// String
	// ****************************
	
	document.queryString = function(name)
	{
	
		var regexS = "[\\?&]" + name + "=([^&#]*)";
		var regex = new RegExp(regexS);
	
		var tmpURL = window.location.href;
		var results = regex.exec(tmpURL);
	
		if (results == null) return '';
		else return results[1];
	};
	
	String.replaceAll = String.prototype.replaceAll = function(replaceThis, replaceWith)
	{
		var string = this;
		var rgx = new RegExp(replaceThis, "g");
	
		return string.replace(rgx, replaceWith);
	};
	
	String.format = String.prototype.format = function()
	{
		var i = 0, l = 0;
		var string = (typeof (this) == "function" && !(i++)) ? arguments[0] : this;
	
		while (i < arguments.length)
		{
			string = string.replaceAll('\\{' + l + '\\}', arguments[i]);
			i++; l++;
		}
	
		return string;
	};
	
	String.clear = String.prototype.clear = function()
	{
		if (arguments.length > 0)
		{
			return ((arguments[0] == undefined) ? '' : arguments[0]);
		}
	};
	
	String.concat = String.prototype.concat = function()
	{
		var args = [];
		for (var i = 0; i < arguments.length; i++)
			args.push(String.clear(arguments[i]).toString());
	
		return args.join('');
	};
	
	String.isNullOrEmpty = String.prototype.isNullOrEmpty = function(str)
	{
		return (str == undefined || str == '' || $.trim(str).length == 0);
	};
	
	String.parseJSON = String.prototype.parseJSON = function(value)
	{
	    if (!value) value = arguments[0];
	    return JSON.parse(value);
	};

	String.toArrayString = String.prototype.toArrayString = function(value)
	{
	    if (!value) value = arguments[0];
	    return String.format('[{0}]', value);
	};

    // ****************************
    // Object
    // ****************************

	Object.toJSON = function(obj)
	{
	    if (!obj) obj = arguments[0];
	    return JSON.stringify(obj);
	};

	// ****************************
	// Offline-Mode (EventListener)
    // ****************************

	(function() {

	    var callbacks = [],
            OfflineModeEventListener = window.OfflineModeEventListener = function(fn)
            {
                if ($.isFunction(fn) && !$.inArray(fn, callbacks))
                    callbacks.push(fn);
            };

	    document.addEventListener("offline", function()
	    {
	        if (callbacks && callbacks.length > 0)
	        {
	            for (var fn in callbacks)
	            {
	                fn();
	            }
	        }
	    }, false);

	})();

	function checkConnection()
	{
	    var networkState = navigator.connection.type;
	    alert(networkState);

	    //var states = {};
	    //states[Connection.UNKNOWN] = 'Unknown connection';
	    //states[Connection.ETHERNET] = 'Ethernet connection';
	    //states[Connection.WIFI] = 'WiFi connection';
	    //states[Connection.CELL_2G] = 'Cell 2G connection';
	    //states[Connection.CELL_3G] = 'Cell 3G connection';
	    //states[Connection.CELL_4G] = 'Cell 4G connection';
	    //states[Connection.NONE] = 'No network connection';

	    //alert('Connection type: ' + states[networkState]);
	}