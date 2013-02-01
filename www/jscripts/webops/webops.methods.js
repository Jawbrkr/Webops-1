// =================================================================
// 	WebOps Methods
// 	----------------------------------------------------------------
// 
// 	Autor: Oscar Cubillos <tegers77@gmail.com>
// 	Version 1.0
// 	Create: 2012-08-27
// 	Last Modified: 2012-09-10
// 
// 	----------------------------------------------------------------
// 	References
// 	----------------------------------------------------------------
/// <reference path="webops.tools.js" />
/// <reference path="webops.proxy.js" />
/// <reference path="webops.database.js" />
//
// =================================================================

webOps.methods =
{
    collection:
    [
        'getProcedures',
        'getSalesReps',
        'getPhysicians',
        'getHospitals',
        'getAddresses',
        'getProductSystems',
        'getCaseProductSystems',
        'getWarehouses',
        'getCaseKitInstances',
        'getAssignedKits',
        'getProdSystemCats',
        'getKitItems',
        'getCaseDetail',
        'getSalesOrder',
        'getCaseDetail1',
        'getCaseDetail2',
        'getCaseDetail3',
        'getCaseDetailFull',
        'getCaseHeaders',
        'getCaseTimestamps',
        'getCaseStatusCodes',
        'getKitStatusCodes',
        'getPriceExceptionCodes',
        'getCaseUsedItems',
        'getCaseExternalItems',
        'addCase',
        'addCaseNew',
        'updateCaseHeader',
        'updateCaseHeaderNew',
        'updateCaseUsedItems',
        'updateCaseExternalItems',
        'getCaseSignatures',
        'updateRepSignature',
        'updateCustSignature',
        'postCycleCount',
        'getSalesData',
        'postPhysicianPref',
        'updatePhoto',
        'getCasePhotoList',
        'getCasePhotoData'
    ],
    generic: function(method, parameters, onComplete)
    {
        var service = method.get.apply(method, parameters);
        webOps.invokeMethod(service, onComplete);
    },
    login: function(parameters, onComplete)
    {
        var onLineMode = true;
        if (!webOps.database.tables.setUp.isEmpty())
        {
            $.tryCatch(
            {
                init: function()
                {
                    onLineMode = webOps.database.tables.setUp.select().appModeOnLine;
                }
            });
        }

        if (onLineMode == true)
        {
            //onComplete(webOps.enums.STATUS_CODE.OK, {"build":"1027","firstName":"Sales Rep","fullName":"Sales Rep One","lastName":"One","required":"Y","roles":["1"],"salesRepIds":["6984"],"sessionId":"1695483775","userId":"6984"});
            webOps.methods.generic(webOps.proxy.methods.login, parameters, onComplete);
        }
        else webOps.methods.loginOffLine(parameters, onComplete);
    },
    loginOffLine: function(parameters, onComplete)
    {
        $.when(webOps.database.tables.login.validateOffLineMode(parameters.join(',')))
            .done(function(result)
            {
                if (!$.isEmptyObject(result)) onComplete(webOps.enums.STATUS_CODE.OK, result);
                else onComplete(webOps.enums.STATUS_CODE.WARNING, null);
            })
            .fail(function()
            {
                onComplete(webOps.enums.STATUS_CODE.ERROR, null);
            });
    }
};

// Implements generic methods.
$.each(webOps.methods.collection, function()
{
    eval(String.format('webOps.methods.{0} = function(parameters, onComplete) { webOps.methods.generic(webOps.proxy.methods.{0}, parameters, onComplete); };', this));
});