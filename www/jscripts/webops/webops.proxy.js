// =================================================================
// 	WebOps Proxy
// 	----------------------------------------------------------------
// 
// 	Autor: Oscar Cubillos <tegers77@gmail.com>
// 	Version 1.0
// 	Create: 2012-08-25
// 	Last Modified: 2012-09-02
// 
// 	----------------------------------------------------------------
// 	References
// 	----------------------------------------------------------------
/// <reference path="webops.tools.js" />
/// <reference path="webops.core.js" />
//
// =================================================================

webOps.proxy = 
{
    URL: 'http://flashcolombia.com/webops/proxy.php',
    processMethod: function(service)
    {
        var parameters = service.parameters;            
        function getParameters()
        {                
            var arr = [];
            $.each(arguments, function(i, p)
            {
                if (i > 0)
                {
                    if ($.isArray(p)) arr.push(String.format('"{0}":[{1}]', parameters[i - 1], p.join(',')));
                    else arr.push(String.format('"{0}":"{1}"', parameters[i - 1], p));
                }
            });

            return arr.join(',');
        };
        
        parameters = getParameters.apply(this, arguments);
        parameters = String.concat('{', String.format('"service":"{0}",{1}', service.name, parameters), '}');

        //var url = String.format('{0}?data={1}', webOps.proxy.URL, parameters);
        var url = webOps.proxy.URL;
        var result =
        {
            name: service.name,
            service: service,
            parameters: parameters,
            url: url
        };

        return result;                        
    },
    methods:
    {
        generic: function()
        {
            arguments[0] = eval('webOps.proxy.methods.' + arguments[0]);
            return webOps.proxy.processMethod.apply(this, arguments);
        },        
        login: {
            parameters:
	        [
	            'customer',
	            'username',
	            'password',
	            'platform',
	            'independent'
	        ]
        },
        getProcedures: {
            parameters:
            [
                'customer',
                'sessionId',
                'numRecords',
                'requestNum'
            ]
        },
        getSalesReps: {
            parameters:
            [
                'customer',
                'sessionId',
                'numRecords',
                'requestNum'
            ]
        },
        getPhysicians: {
            parameters:
            [
                'customer',
                'sessionId',
                'numRecords',
                'requestNum'
            ]
        },
        getHospitals: {
            parameters:
            [
                'customer',
                'sessionId',
                'numRecords',
                'requestNum'
            ]
        },
        getAddresses: {
            parameters:
            [
                'customer',
                'sessionId',
                'numRecords',
                'requestNum'
            ]
        },
        getProductSystems: {
            parameters:
            [
                'customer',
                'sessionId',
                'numRecords',
                'requestNum'
            ]
        },
        getCaseProductSystems: {
            parameters:
            [
                'customer',
                'sessionId',
                'caseId',
                'numRecords',
                'requestNum'
            ]
        },
        getWarehouses: {
            parameters:
            [
                'customer',
                'sessionId',
                'numRecords',
                'requestNum'
            ]
        },
        getCaseKitInstances: {
            parameters:
            [
                'customer',
                'sessionId',
                'caseId',
                'numRecords',
                'requestNum'
            ]
        },
        getAssignedKits: {
            parameters:
            [
                'customer',
                'sessionId',
                'caseId',
                'numRecords',
                'requestNum'
            ]
        },
        getProdSystemCats: {
            parameters:
            [
                'customer',
                'sessionId',
                'numRecords',
                'requestNum'
            ]
        },
        getKitItems: {
            parameters:
            [
                'customer',
                'sessionId',
                'kitInstanceId',
                'numRecords',
                'requestNum'
            ]
        },
        getCaseDetail: {
            parameters:
            [
                'customer',
                'sessionId',
                'caseId'
            ]
        },
        getSalesOrder: {
            parameters:
            [
                'customer',
                'caseId'
            ]
        },
        getCaseDetail1: {
            parameters:
            [
                'customer',
                'sessionId',
                'caseId'
            ]
        },
        getCaseDetail2: {
            parameters:
            [
                'customer',
                'sessionId',
                'caseId',
                'numRecords',
                'requestNum'
            ]
        },
        getCaseDetail3: {
            parameters:
            [
                'customer',
                'sessionId',
                'caseId'
            ]
        },
        getCaseDetailFull: {
            parameters:
            [
                'customer',
                'sessionId',
                'caseId'
            ]
        },
        getCaseHeaders: {
            parameters:
            [
                'customer',
                'sessionID',
                'salesRepID',
                'startDate',
                'endDate',
                'numRecords',
                'requestNum'
            ]
        },
        getCaseTimestamps: {
            parameters:
            [
                'customer',
                'sessionID',
                'salesRepID',
                'startDate',
                'endDate',
                'numRecords',
                'requestNum'
            ]
        },
        getCaseStatusCodes: {
            parameters:
            [
                'customer',
                'sessionId',
                'numRecords',
                'requestNum'
            ]
        },
        getKitStatusCodes: {
            parameters:
            [
                'customer',
                'sessionId',
                'numRecords',
                'requestNum'
            ]
        },
        getPriceExceptionCodes: {
            parameters:
            [
                'customer',
                'sessionId',
                'numRecords',
                'requestNum'
            ]
        },
        getCaseUsedItems: {
            parameters:
            [
                'customer',
                'sessionId',
                'caseId',
                'numRecords',
                'requestNum'
            ]
        },
        getCaseExternalItems: {
            parameters:
            [
                'customer',
                'sessionId',
                'caseId',
                'numRecords',
                'requestNum'
            ]
        },
        addCase: {
            parameters:
            [
                'customer',
                'sessionId',
                'caseID',
                'caseStatusID',
                'hospitalID',
                'notes',
                'patient',
                'physicianID',
                'salesRepId',
                'procTypeID',
                'procDateTime',
                'productSystems',
                'dob',
                'sex',
                'contactName',
                'patientWeight',
                'weightUnits',
                'patientHeight',
                'heightUnits',
                'activityLevel',
                'activityDesc',
                'implantRevision',
                'surgicalApproach',
                'complications',
                'eventLocation',
                'eventDesc',
                'consequences',
                'consequencesDesc',
                'returned',
                'decontamination',
                'notReturned',
                'products'
            ]
        },
        addCaseNew: {
            parameters:
            [
                'customer',
                'sessionId',
                'caseID',
                'caseStatusID',
                'hospitalID',
                'notes',
                'patient',
                'physicianID',
                'salesRepId',
                'procTypeID',
                'procDateTime',
                'productSystems',
                'dob',
                'sex',
                'contactName',
                'patientWeight',
                'weightUnits',
                'patientHeight',
                'heightUnits',
                'activityLevel',
                'activityDesc',
                'implantRevision',
                'surgicalApproach',
                'complications',
                'eventLocation',
                'eventDesc',
                'consequences',
                'consequencesDesc',
                'returned',
                'decontamination',
                'notReturned',
                'products',
                'ageOfPatient'
            ]
        },
        updateCaseHeader: {
            parameters:
            [
                'customer',
                'sessionId',
                'caseID',
                'caseStatusID',
                'hospitalID',
                'notes',
                'patient',
                'physicianID',
                'procTypeID',
                'procDateTime',
                'productSystems',
                'salesRepId',
                'freight',
                'dob',
                'sex',
                'survey',
                'contactName',
                'patientWeight',
                'weightUnits',
                'patientHeight',
                'heightUnits',
                'activityLevel',
                'activityDesc',
                'implantRevision',
                'surgicalApproach',
                'complications',
                'eventLocation',
                'eventDesc',
                'consequences',
                'consequencesDesc',
                'returned',
                'decontamination',
                'notReturned',
                'products',
                'po'
            ]
        },
        updateCaseHeaderNew: {
            parameters:
            [
                'customer',
                'sessionId',
                'caseID',
                'caseStatusID',
                'hospitalID',
                'notes',
                'patient',
                'physicianID',
                'procTypeID',
                'procDateTime',
                'productSystems',
                'salesRepId',
                'freight',
                'dob',
                'sex',
                'survey',
                'contactName',
                'patientWeight',
                'weightUnits',
                'patientHeight',
                'heightUnits',
                'activityLevel',
                'activityDesc',
                'implantRevision',
                'surgicalApproach',
                'complications',
                'eventLocation',
                'eventDesc',
                'consequences',
                'consequencesDesc',
                'returned',
                'decontamination',
                'notReturned',
                'products',
                'po',
                'ageOfPatient'
            ]
        },
        updateCaseUsedItems: {
            parameters:
            [
                'customer',
                'sessionId',
                'caseId',
                'usageTimestamp',
                'usedItems',
                'requestNum'
            ]
        },
        updateCaseExternalItems: {
            parameters:
            [
                'customer',
                'sessionId',
                'caseId',
                'usageTimestamp',
                'externalItems',
                'requestNum'
            ]
        },
        getCaseSignatures: {
            parameters:
            [
                'customer',
                'sessionID',
                'caseID'
            ]
        },
        updateRepSignature: {
            parameters:
            [
                'customer',
                'sessionID',
                'caseID',
                'data'
            ]
        },
        updateCustSignature: {
            parameters:
            [
                'customer',
                'sessionID',
                'caseID',
                'data'
            ]
        },
        postCycleCount: {
            parameters:
            [
                'customer',
                'sessionId',
                'hospitalID',
                'batchId',
                'cycleCountDetail'
            ]
        },
        getSalesData: {
            parameters:
            [
                'customer',
                'sessionID',
                'salesRepId',
                'strDate'
            ]
        },
        postPhysicianPref: {
            parameters:
            [
                'customer',
                'sessionID',
                'physicianId',
                'procedureId',
                'hospitalId',
                'note',
                'productSystemIds'
            ]
        },
        updatePhoto: {
            parameters:
            [
                'customer',
                'sessionID',
                'caseID',
                'categoryID',
                'photoID',
                'status',
                'data'
            ]
        },
        getCasePhotoList: {
            parameters:
            [
                'customer',
                'sessionId',
                'caseId'
            ]
        },
        getCasePhotoData: {
            parameters:
            [
                'customer',
                'sessionId',
                'photoId',
                'offset',
                'byteCount'
            ]
        }
    }
};

// Implements generic properties and methods.
$.each(webOps.proxy.methods, function(n, o)
{
    if (typeof(o) === 'object')
    {
        o.name = n;
        o.get = function()
        {
            [].unshift.call(arguments, this);
            return webOps.proxy.processMethod.apply(this, arguments);
        };
    }
});