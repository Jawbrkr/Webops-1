// =================================================================
// 	WebOps Core
// 	----------------------------------------------------------------
// 
// 	Autor: Oscar Cubillos <tegers77@gmail.com>
// 	Version 1.0
// 	Create: 2012-08-27
// 	Last Modified: 2012-08-28
//
// =================================================================

// Global scope variable handles everything related to the invocation of service methods.
var webOps = { };

// Enable cross-domain requests in environments.
//$.support.cors = true;

// 
webOps.invokeMethod = function(service, onComplete)
{
    if (!service)
        return null;

	// Call web method.
    $.syncAjax(service.url, service.parameters, onSuccess, onError);

	// Process success response.
	function onSuccess(data, status, jqXHR)
    {
	    //alert('service: ' + service.url + ', status: ' + status + ', response: ' + jqXHR.responseText);
		if ($.isFunction(onComplete))
		{
			var status = webOps.enums.STATUS_CODE.ERROR;
			
			if (data && data.faultstring == undefined) status = webOps.enums.STATUS_CODE.OK;
			else if (data == undefined) status = webOps.enums.STATUS_CODE.WARNING
			
			onComplete(status, data);
		}
	}
		
	// Process error response.
	function onError(jqXHR, status, errorThrown)
	{
	    $.log('status: ' + status + ', response: ' + jqXHR.responseText);
		if ($.isFunction(onComplete))
			onComplete(webOps.enums.STATUS_CODE.ERROR);
	}
};

//
webOps.enums =
{
    STATUS_CODE:
    {
        OK: 0,
        WARNING: 1,
        ERROR: 2
    }
}