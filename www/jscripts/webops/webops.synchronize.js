// =================================================================
// 	WebOps Synchronize
// 	----------------------------------------------------------------
// 
// 	Autor: Oscar Cubillos <tegers77@gmail.com>
// 	Version 1.0
// 	Create: 2012-09-22
// 	Last Modified: 2013-01-27
// 
// 	----------------------------------------------------------------
// 	References
// 	----------------------------------------------------------------
/// <reference path="../jquery/jquery-1.8.0.min.js" />
/// <reference path="webops.tools.js" />
/// <reference path="webops.methods.js" />
/// <reference path="webops.database.js" />
//
// =================================================================

webOps.synchronize =
{
    fromServer:
    {
        procedures: function(customer, userId, sessionId)
        {
            var numRecords = 999;
            var requestNum = 0;

            return $.Deferred(function(deferred)
            {
                var save = function()
                {
                    return $.Deferred(function(def)
                    {
                        webOps.methods.getProcedures([customer, sessionId, numRecords, requestNum], function(status, data)
                        {
                            if (status == webOps.enums.STATUS_CODE.OK)
                            {
                                $.when(webOps.database.tables.procedures.saveMultiple(userId, data))
                                    .done(function() { def.resolve(); })
                                    .fail(function() { def.reject(); });
                            }
                            else if (status == webOps.enums.STATUS_CODE.WARNING) def.resolve();
                            else def.reject();
                        });
                    }).promise();
                }

                $.when
                (
                    //webOps.database.tables.procedures.remove(userId),
                    save()
                )
                .done(function()
                {
                    deferred.resolve();
                })
                .fail(function()
                {
                    deferred.fail();
                });

            }).promise();
        },
        salesReps: function(customer, userId, sessionId)
        {
            var numRecords = 999;
            var requestNum = 0;

            return $.Deferred(function(deferred)
            {
                var save = function()
                {
                    return $.Deferred(function(def)
                    {
                        webOps.methods.getSalesReps([customer, sessionId, numRecords, requestNum], function(status, data)
                        {
                            if (status == webOps.enums.STATUS_CODE.OK)
                            {
                                $.when(webOps.database.tables.salesReps.saveMultiple(userId, data))
                                    .done(function() { def.resolve(); })
                                    .fail(function() { def.reject(); });
                            }
                            else if (status == webOps.enums.STATUS_CODE.WARNING) def.resolve();
                            else def.reject();
                        });
                    }).promise();
                }

                $.when
                (
                    //webOps.database.tables.salesReps.remove(userId),
                    save()
                )
                .done(function()
                {
                    deferred.resolve();
                })
                .fail(function()
                {
                    deferred.reject();
                });

            }).promise();
        },
        physicians: function(customer, userId, sessionId)
        {
            var numRecords = 999;
            var requestNum = 0;

            return $.Deferred(function(deferred)
            {
                var save = function()
                {
                    return $.Deferred(function(def)
                    {
                        webOps.methods.getPhysicians([customer, sessionId, numRecords, requestNum], function(status, data)
                        {
                            if (status == webOps.enums.STATUS_CODE.OK)
                            {
                                $.when(webOps.database.tables.physicians.saveMultiple(userId, data))
                                    .done(function() { def.resolve(); })
                                    .fail(function() { def.reject(); });
                            }
                            else if (status == webOps.enums.STATUS_CODE.WARNING) def.resolve();
                            else def.reject();
                        });
                    }).promise();
                }

                $.when
                (
                    //webOps.database.tables.physicians.remove(userId),
                    save()
                )
                .done(function()
                {
                    deferred.resolve();
                })
                .fail(function()
                {
                    deferred.reject();
                });

            }).promise();
        },
        hospitals: function(customer, userId, sessionId)
        {
            var numRecords = 999;
            var requestNum = 0;

            return $.Deferred(function(deferred)
            {
                var save = function()
                {
                    return $.Deferred(function(def)
                    {
                        webOps.methods.getHospitals([customer, sessionId, numRecords, requestNum], function(status, data)
                        {
                            if (status == webOps.enums.STATUS_CODE.OK)
                            {
                                $.when(webOps.database.tables.hospitals.saveMultiple(userId, data))
                                    .done(function() { def.resolve(); })
                                    .fail(function() { def.reject(); });
                            }
                            else if (status == webOps.enums.STATUS_CODE.WARNING) def.resolve();
                            else def.reject();
                        });
                    }).promise();
                }

                $.when
                (
                    //webOps.database.tables.hospitals.remove(userId),
                    save()
                )
                .done(function()
                {
                    deferred.resolve();
                })
                .fail(function()
                {
                    deferred.reject();
                });

            }).promise();
        },
        addresses: function(customer, userId, sessionId)
        {
            var numRecords = 999;
            var requestNum = 0;

            return $.Deferred(function(deferred)
            {
                var save = function()
                {
                    return $.Deferred(function(def)
                    {
                        webOps.methods.getAddresses([customer, sessionId, numRecords, requestNum], function(status, data)
                        {
                            if (status == webOps.enums.STATUS_CODE.OK)
                            {
                                $.when(webOps.database.tables.addresses.saveMultiple(userId, data))
                                    .done(function() { def.resolve(); })
                                    .fail(function() { def.reject(); });
                            }
                            else if (status == webOps.enums.STATUS_CODE.WARNING) def.resolve();
                            else def.reject();
                        });
                    }).promise();
                }

                $.when
                (
                    //webOps.database.tables.addresses.remove(userId),
                    save()
                )
                .done(function()
                {
                    deferred.resolve();
                })
                .fail(function()
                {
                    deferred.reject();
                });

            }).promise();
        },
        productSystems: function(customer, userId, sessionId)
        {
            var numRecords = 999;
            var requestNum = 0;

            return $.Deferred(function(deferred)
            {
                var save = function()
                {
                    return $.Deferred(function(def)
                    {
                        webOps.methods.getProductSystems([customer, sessionId, numRecords, requestNum], function(status, data)
                        {
                            if (status == webOps.enums.STATUS_CODE.OK)
                            {
                                $.when(webOps.database.tables.productSystems.saveMultiple(userId, data))
                                    .done(function() { def.resolve(); })
                                    .fail(function() { def.reject(); });
                            }
                            else if (status == webOps.enums.STATUS_CODE.WARNING) def.resolve();
                            else def.reject();
                        });
                    }).promise();
                }

                $.when
                (
                    //webOps.database.tables.productSystems.remove(userId),
                    save()
                )
                .done(function()
                {
                    deferred.resolve();
                })
                .fail(function()
                {
                    deferred.reject();
                });

            }).promise();
        },
        prodSystemCats: function(customer, userId, sessionId)
        {
            var numRecords = 999;
            var requestNum = 0;

            return $.Deferred(function(deferred)
            {
                var save = function()
                {
                    return $.Deferred(function(def)
                    {
                        webOps.methods.getProdSystemCats([customer, sessionId, numRecords, requestNum], function(status, data)
                        {
                            if (status == webOps.enums.STATUS_CODE.OK)
                            {
                                $.when(webOps.database.tables.prodSystemCats.saveMultiple(userId, data))
                                    .done(function() { def.resolve(); })
                                    .fail(function() { def.reject(); });
                            }
                            else if (status == webOps.enums.STATUS_CODE.WARNING) def.resolve();
                            else def.reject();
                        });
                    }).promise();
                }

                $.when
                (
                    //webOps.database.tables.prodSystemCats.remove(userId),
                    save()
                )
                .done(function()
                {
                    deferred.resolve();
                })
                .fail(function()
                {
                    deferred.reject();
                });

            }).promise();
        },
        warehouses: function(customer, userId, sessionId)
        {
            var numRecords = 999;
            var requestNum = 0;

            return $.Deferred(function(deferred)
            {
                var save = function()
                {
                    return $.Deferred(function(def)
                    {
                        webOps.methods.getWarehouses([customer, sessionId, numRecords, requestNum], function(status, data)
                        {
                            if (status == webOps.enums.STATUS_CODE.OK)
                            {
                                $.when(webOps.database.tables.warehouses.saveMultiple(userId, data))
                                    .done(function() { def.resolve(); })
                                    .fail(function() { def.reject(); });
                            }
                            else if (status == webOps.enums.STATUS_CODE.WARNING) def.resolve();
                            else def.reject();
                        });
                    }).promise();
                }

                $.when
                (
                    //webOps.database.tables.warehouses.remove(userId),
                    save()
                )
                .done(function()
                {
                    deferred.resolve();
                })
                .fail(function()
                {
                    deferred.reject();
                });

            }).promise();
        },
        caseStatusCodes: function(customer, userId, sessionId)
        {
            var numRecords = 999;
            var requestNum = 0;

            return $.Deferred(function(deferred)
            {
                var save = function()
                {
                    return $.Deferred(function(def)
                    {
                        webOps.methods.getCaseStatusCodes([customer, sessionId, numRecords, requestNum], function(status, data)
                        {
                            if (status == webOps.enums.STATUS_CODE.OK)
                            {
                                $.when(webOps.database.tables.caseStatusCodes.saveMultiple(userId, data))
                                    .done(function() { def.resolve(); })
                                    .fail(function() { def.reject(); });
                            }
                            else if (status == webOps.enums.STATUS_CODE.WARNING) def.resolve();
                            else def.reject();
                        });
                    }).promise();
                }

                $.when
                (
                    webOps.database.tables.caseStatusCodes.remove(userId),
                    save()
                )
                .done(function()
                {
                    deferred.resolve();
                })
                .fail(function()
                {
                    deferred.reject();
                });

            }).promise();
        },
        kitStatusCodes: function(customer, userId, sessionId)
        {
            var numRecords = 999;
            var requestNum = 0;

            return $.Deferred(function(deferred)
            {
                var save = function()
                {
                    return $.Deferred(function(def)
                    {
                        webOps.methods.getKitStatusCodes([customer, sessionId, numRecords, requestNum], function(status, data)
                        {
                            if (status == webOps.enums.STATUS_CODE.OK)
                            {
                                $.when(webOps.database.tables.kitStatusCodes.saveMultiple(userId, data))
                                    .done(function() { def.resolve(); })
                                    .fail(function() { def.reject(); });
                            }
                            else if (status == webOps.enums.STATUS_CODE.WARNING) def.resolve();
                            else def.reject();
                        });
                    }).promise();
                }

                $.when
                (
                    //webOps.database.tables.kitStatusCodes.remove(userId),
                    save()
                )
                .done(function()
                {
                    deferred.resolve();
                })
                .fail(function()
                {
                    deferred.reject();
                });

            }).promise();
        },
        priceExceptionCodes: function(customer, userId, sessionId)
        {
            var numRecords = 999;
            var requestNum = 0;

            return $.Deferred(function(deferred)
            {
                var save = function()
                {
                    return $.Deferred(function(def)
                    {
                        webOps.methods.getPriceExceptionCodes([customer, sessionId, numRecords, requestNum], function(status, data)
                        {
                            if (status == webOps.enums.STATUS_CODE.OK)
                            {
                                $.when(webOps.database.tables.priceExceptionCodes.saveMultiple(userId, data))
                                    .done(function() { def.resolve(); })
                                    .fail(function() { def.reject(); });
                            }
                            else if (status == webOps.enums.STATUS_CODE.WARNING) def.resolve();
                            else def.reject();
                        });
                    }).promise();
                }

                $.when
                (
                    //webOps.database.tables.priceExceptionCodes.remove(userId),
                    save()
                )
                .done(function()
                {
                    deferred.resolve();
                })
                .fail(function()
                {
                    deferred.reject();
                });

            }).promise();
        },
        caseHeaders: function(customer, userId, sessionId, caseDownloadsAll, dateStart, dateEnd)
        {
            var numRecords = 999;
            var requestNum = 0;

            return $.Deferred(function(deferred)
            {
                if (!caseDownloadsAll)
                {
                    $.when(webOps.database.tables.login.select(userId))
                        .done(function(result)
                        {
                            //var salesRepId = result.salesRepIds;
                            //caseHeadersSelect(salesRepId);
                            caseHeadersSelect(String(userId));
                        })
                        .fail(function()
                        {
                            deferred.fail();
                        });
                    //caseHeadersSelect(userId);
                }
                else
                {
                    $.when(webOps.database.tables.salesReps.selectAllSalesReps(userId))
                        .done(function(result)
                        {
                            var salesRepIds = '';
                            for (var i = 0; i < result.length; i++)
                            {
                                salesRepIds += String.concat(',', result[i].salesRepID);
                            }

                            caseHeadersSelect(salesRepIds.substr(1));
                        })
                        .fail(function()
                        {
                            deferred.fail();
                        });
                    //caseHeadersSelect('');
                }

                function caseHeadersSelect(salesRepId)
                {
                    var save = function()
                    {
                        return $.Deferred(function(def)
                        {
                            var startDate = null,
                                endDate = null,
                                currentDay = parseInt(moment().format('d'));

                            if(dateStart && dateEnd)
                            {
                                startDate = moment(new Date(dateStart)).format('YYYY||MM||DD');
                                endDate = moment(new Date(dateEnd)).format('YYYY||MM||DD');
                            }
                            else
                            {
                                // si es sabado (dia # 6)
                                if (currentDay == 6)
                                {
                                    startDate = moment().format('YYYY||MM||DD');
                                    endDate = moment().add('d', 8).format('YYYY||MM||DD');
                                }
                                else
                                {
                                    var subtract = (currentDay + 1),
                                        temp = moment().subtract('d', subtract);

                                    startDate = temp.format('YYYY||MM||DD');
                                    endDate = moment(temp).add('d', 8).format('YYYY||MM||DD');
                                }
                            }

                            //-> lineas comentareadas el 2012-11-11 para que funcione de sabado a sabado.
                            //var startDate = moment(new Date()).format('YYYY||MM||DD');
                            //var endDate = moment(new Date()).add('d', 7).format('YYYY||MM||DD');

                            var salesRepIdArray = salesRepId.split(',');
                            var getCaseTimestampsData = [];

                            for (var i = 0; i < salesRepIdArray.length; i++)
                            {
                                var salesRepIdItem = salesRepIdArray[i];
                                webOps.methods.getCaseTimestamps([customer, sessionId, salesRepIdItem, startDate, endDate, numRecords, requestNum], function(status, data)
                                {
                                    if (status == webOps.enums.STATUS_CODE.OK)
                                    {
                                        getCaseTimestampsData = getCaseTimestampsData.concat(data);
                                        //$.alert(Object.toJSON(getCaseTimestampsData));
                                    }
                                    //else if (status == webOps.enums.STATUS_CODE.WARNING) def.resolve();
                                    //else def.reject();
                                });
                            }

                            if (getCaseTimestampsData.length == 0)
                            {
                                def.resolve();
                            }
                            else if (getCaseTimestampsData.length > 0)
                            {
                                var cases = [];
                                for (var i = 0; i < salesRepIdArray.length; i++)
                                {
                                    var salesRepIdItem = salesRepIdArray[i];
                                    webOps.methods.getCaseHeaders([customer, sessionId, salesRepIdItem, startDate, endDate, numRecords, requestNum], function(status, data)
                                    {
                                        if (status == webOps.enums.STATUS_CODE.OK)
                                        {
                                            cases = cases.concat(data);
                                            /*$.when(webOps.database.tables.caseHeaders.saveMultiple(userId, data))
                                                .done(function() { def.resolve(); })
                                                .fail(function() { def.reject(); });*/
                                        }
                                        //else if (status == webOps.enums.STATUS_CODE.WARNING) def.resolve();
                                        //else def.resolve();
                                    });
                                }

                                if (cases.length > 0)
                                {
                                    validateTimestampsCaseHeaders(getCaseTimestampsData, cases);
                                }
                                else if (cases.length == 0)
                                {
                                    def.resolve();
                                }
                            }

                            function saveCaseHeader(deferredObj, caseHeaderData)
                            {
                                if (caseHeaderData)
                                {
                                    $.when
                                    (
                                        webOps.database.tables.caseHeaders.saveMultiple(userId, [caseHeaderData])
                                    )
                                    .done(function() { deferredObj.resolve(); })
                                    .fail(function() { deferredObj.resolve(); });
                                }
                                else deferredObj.resolve();
                            }

                            function getCaseHeaderDataById(caseHeadersData, id)
                            {
                                var caseHeaderDataObj;
                                for (var n = 0; n < caseHeadersData.length; n++)
                                {
                                    var caseHeaderData = caseHeadersData[n];
                                    if (caseHeaderData.id == id)
                                    {
                                        caseHeaderDataObj = caseHeaderData;
                                        break;
                                    }
                                }

                                return caseHeaderDataObj;
                            }

                            function validateTimestampsCaseHeaders(getCaseTimestampsData, getCaseHeadersData)
                            {
                                var deferreds = [];
                                //var caseHeaderDataForSave = [];

                                for (var i = 0; i < getCaseTimestampsData.length; i++)
                                {
                                    var caseTimestamp = getCaseTimestampsData[i];
                                    deferreds.push
                                    (
                                        $.Deferred(function(_def)
                                        {
                                            var _caseId = caseTimestamp.id;
                                            var _timestamp = caseTimestamp.timestamp;
                                            var _caseHeaderData = getCaseHeaderDataById(getCaseHeadersData, _caseId);

                                            $.when(webOps.database.tables.caseHeaders.selectModifiedDate(userId, _caseId))
                                                .done(function(caseHeaderData)
                                                {
                                                    if (caseHeaderData && !$.isEmptyObject(caseHeaderData))
                                                    {
                                                        var modifiedDateLocal = moment(caseHeaderData.modifiedDate, "YYYY||MM||DD||HH||mm")._d.getTime();
                                                        var modifiedDateServer = moment(_timestamp, "YYYY||MM||DD||HH||mm")._d.getTime();

                                                        //$.log(String.format('caseId: {0}, modifiedDateServer: {1}, modifiedDateLocal: {2}  ', _caseId, _timestamp, caseHeaderData.modifiedDate));
                                                        if (modifiedDateServer > modifiedDateLocal)
                                                        {
                                                            $.log('Sync caseHeader id: ' + _caseId + ' server date > local date.');
                                                            saveCaseHeader(_def, _caseHeaderData);
                                                        }
                                                        else
                                                        {
                                                            $.log('Sync caseHeader id: ' + _caseId + ' local date > server date.');
                                                            _def.resolve();
                                                        }
                                                    }
                                                    else
                                                    {
                                                        $.log('Sync caseHeader id: ' + _caseId + ' is new.');
                                                        saveCaseHeader(_def, _caseHeaderData);
                                                    }
                                                })
                                                .fail(function()
                                                {
                                                    _def.resolve();
                                                    $.log('Sync caseHeader id: ' + _caseId + ' failed.');
                                                });

                                        }).promise()
                                    );
                                }

                                $.when.apply($, deferreds)
                                    .done(function()
                                    {
                                        deferred.resolve();
                                    })
                                    .fail(function()
                                    {
                                        deferred.reject();
                                    });
                            }

                        }).promise();
                    }

                    $.when
                    (
                        //webOps.database.tables.caseHeaders.remove(userId),
                        save()
                    )
                    .done(function()
                    {
                        deferred.resolve();
                    })
                    .fail(function()
                    {
                        deferred.reject();
                    });
                }

            }).promise();
        },
        caseDetailFull: function(customer, userId, sessionId)
        {
            return $.Deferred(function(deferred)
            {
                $.when
                (
                    webOps.database.tables.caseHeaders.selectForUpdateDetail(userId)
                )
                .done(function(caseHeaders)
                {
                    caseDetailFullSave(caseHeaders);
                })
                .fail(function()
                {
                    deferred.reject();
                });

                function caseDetailFullSave(caseHeaders)
                {
                    var deferreds = [];
                    for (var i = 0, caseId = null; i < caseHeaders.length; i++)
                    {
                        caseId = caseHeaders[i];
                        if (caseId > 0)
                        {
                            deferreds.push
                            (
                                $.Deferred(function(def)
                                {
                                    var _caseId = caseId;
                                    webOps.methods.getCaseDetailFull([customer, sessionId, _caseId], function(status, data)
                                    {
                                        if (status == webOps.enums.STATUS_CODE.OK)
                                        {
                                            $.log(String.format('CaseID: {0}, age: {1} ', _caseId, data.ageOfPatient));
                                            $.when(webOps.database.tables.caseDetailFull.save(userId, data.activityDesc, data.activityLevel, data.complications, data.consequences, data.consequencesDesc, data.contactName, data.decontamination, data.eventDesc, data.eventLocation, data.heightUnits, data.implantRevision, data.notReturned, data.patientHeight, data.patientWeight, data.products, data.returned, data.surgicalApproach, data.weightUnits, data.ageOfPatient, data.assignedInventoryItems, data.assignedKits, data.assignedProdSystems, data.caseStatusID, data.dob, data.errorCode, data.externalItems, data.freight, data.hasCapPrice, data.hospitalID, data.id, data.notes, data.patient, data.physicianID, data.po, data.procDateTime, data.procTypeID, data.salesRepID, data.sex, data.survey, data.totalPrice, data.usageStatus, data.usageTimestamp, data.usedItems))
                                                .done(function()
                                                {
                                                    var usedItems = [];
                                                    if ((data.usedItems || []).length > 0) usedItems = data.usedItems;

                                                    function existUsedItem(itemID)
                                                    {
                                                        var result = false;
                                                        for (var i = 0; i < usedItems.length; i++)
                                                        {
                                                            var currentItemID = data.usedItems[i].split('||')[0];
                                                            if (currentItemID == itemID)
                                                            {
                                                                result = true;
                                                                break;
                                                            }
                                                        }

                                                        return result;
                                                    }

                                                    if ((data.externalItems || []).length > 0)
                                                    {
                                                        var externalItems = [];
                                                        for (var i = 0; i < data.externalItems.length; i++)
                                                        {
                                                            var externalItemsData = data.externalItems[i].split('||');
                                                            externalItems.push
                                                            ({
                                                                catalog: externalItemsData[1],
                                                                lotCode: externalItemsData[2],
                                                                inventoryLoc: externalItemsData[4],
                                                                shipTo: externalItemsData[3],
                                                                unitListPrice: externalItemsData[5],
                                                                unitActualPrice: externalItemsData[6],
                                                                total: externalItemsData[7],
                                                                notes: externalItemsData[9],
                                                                priceException: externalItemsData[8]
                                                            });
                                                        }

                                                        $.when(webOps.database.tables.usage.saveMultiple(userId, data.id, externalItems))
                                                            .done(function()
                                                            {
                                                                def.resolve();
                                                            })
                                                            .done(function()
                                                            {
                                                                def.reject();
                                                            });
                                                    }
                                                    else
                                                    {
                                                        def.resolve();
                                                    }

                                                    if ((data.assignedInventoryItems || []).length > 0)
                                                    {
                                                        var assignedInventoryItems = [];
                                                        for (var i = 0; i < data.assignedInventoryItems.length; i++)
                                                        {
                                                            var assignedInventoryItemsData = data.assignedInventoryItems[i].split('||');
                                                            if (existUsedItem(assignedInventoryItemsData[0]) == true)
                                                            {
                                                                assignedInventoryItems.push
                                                                ({
                                                                    catalog: assignedInventoryItemsData[1],
                                                                    lotCode: assignedInventoryItemsData[2],
                                                                    inventoryLoc: assignedInventoryItemsData[7],
                                                                    shipTo: assignedInventoryItemsData[3],
                                                                    unitListPrice: assignedInventoryItemsData[6],
                                                                    unitActualPrice: assignedInventoryItemsData[4],
                                                                    total: assignedInventoryItemsData[4],
                                                                    notes: assignedInventoryItemsData[9],
                                                                    priceException: assignedInventoryItemsData[8]
                                                                });
                                                            }
                                                        }

                                                        $.when(webOps.database.tables.usage.saveMultiple(userId, data.id, assignedInventoryItems))
                                                            .done(function()
                                                            {
                                                                def.resolve();
                                                            })
                                                            .done(function()
                                                            {
                                                                def.reject();
                                                            });
                                                    }
                                                    else
                                                    {
                                                        def.resolve();
                                                    }
                                                })
                                                .fail(function()
                                                {
                                                    def.reject();
                                                });
                                        }
                                        else if (status == webOps.enums.STATUS_CODE.WARNING) def.resolve();
                                        else def.reject();
                                    });
                                }).promise()
                            );
                        }
                    }

                    $.when.apply($, deferreds)
                    .done(function()
                    {
                        deferred.resolve();
                    })
                    .fail(function()
                    {
                        deferred.reject();
                    });
                }

            }).promise();
        },
        assignedKits: function(customer, userId, sessionId)
        {
            var numRecords = 1;
            var requestNum = 1;

            return $.Deferred(function(deferred)
            {
                $.when
                (
                    webOps.database.tables.caseHeaders.selectOnlyId(userId)
                )
                .done(function(caseHeaders)
                {
                    assignedKitsSave(caseHeaders);
                })
                .fail(function()
                {
                    deferred.reject();
                });

                function assignedKitsSave(caseHeaders)
                {
                    var deferreds = [];
                    for (var i = 0, caseId = null; i < caseHeaders.length; i++)
                    {
                        caseId = caseHeaders[i];
                        if (caseId > 0)
                        {
                            deferreds.push
                            (
                                $.Deferred(function(def)
                                {
                                    var _caseId = caseId;
                                    webOps.methods.getCaseDetail1([customer, sessionId, _caseId], function(status, data)
                                    {
                                        if (status == webOps.enums.STATUS_CODE.OK && data)
                                        {
                                            var assignedKitsData = [];
                                            for (var i = 0; i < (data.assignedKits || []).length; i++)
                                            {
                                                var assignedKitsItem = data.assignedKits[i].split('||');
                                                var assignedKitsDataItem =
                                                {
                                                    id: assignedKitsItem[0],
                                                    name: assignedKitsItem[1],
                                                    locationId: assignedKitsItem[2],
                                                    statusId: assignedKitsItem[3]
                                                };

                                                assignedKitsData.push(assignedKitsDataItem);
                                            }

                                            $.when(webOps.database.tables.assignedKits.saveMultiple(userId, _caseId, assignedKitsData))
                                                .done(function() { def.resolve(); })
                                                .fail(function() { def.reject(); });
                                        }
                                        else if (status == webOps.enums.STATUS_CODE.WARNING) def.resolve();
                                        else def.resolve(); //def.reject();
                                    });
                                }).promise()
                            );
                        }
                    }

                    $.when.apply($, deferreds)
                    .done(function()
                    {
                        deferred.resolve();
                    })
                    .fail(function()
                    {
                        deferred.reject();
                    });
                }

            }).promise();
        },
        casePhotoList: function(customer, userId, sessionId)
        {
            return $.Deferred(function(deferred)
            {
                $.when
                (
                    webOps.database.tables.caseHeaders.selectOnlyId(userId)
                )
                .done(function(caseHeaders)
                {
                    casePhotoListSave(caseHeaders);
                })
                .fail(function()
                {
                    deferred.reject();
                });

                function casePhotoListSave(caseHeaders)
                {
                    var deferreds = [];
                    for (var i = 0, caseId = null; i < caseHeaders.length; i++)
                    {
                        caseId = caseHeaders[i];
                        if (caseId > 0)
                        {
                            deferreds.push
                            (
                                $.Deferred(function(def)
                                {
                                    var _caseId = caseId;
                                    webOps.methods.getCasePhotoList([customer, sessionId, _caseId], function(status, data)
                                    {
                                        if (status == webOps.enums.STATUS_CODE.OK)
                                        {
                                            $.when(webOps.database.tables.casePhotoList.saveMultiple(userId, _caseId, data.photoList))
                                                .done(function() { def.resolve(); })
                                                .fail(function() { def.reject(); });
                                        }
                                        else if (status == webOps.enums.STATUS_CODE.WARNING) def.resolve();
                                        else def.reject();
                                    });
                                }).promise()
                            );
                        }
                    }

                    $.when.apply($, deferreds)
                    .done(function()
                    {
                        deferred.resolve();
                    })
                    .fail(function()
                    {
                        deferred.reject();
                    });
                }

            }).promise();
        },
        casePhotoListByCaseId: function(customer, userId, sessionId, caseId)
        {
            return $.Deferred(function(deferred)
            {
                webOps.methods.getCasePhotoList([customer, sessionId, caseId], function(status, data)
                {
                    if (status == webOps.enums.STATUS_CODE.OK)
                    {
                        $.when(webOps.database.tables.casePhotoList.saveMultiple(userId, caseId, data.photoList))
                            .done(function() { deferred.resolve(); })
                            .fail(function() { deferred.reject(); });
                    }
                    else if (status == webOps.enums.STATUS_CODE.WARNING) deferred.resolve();
                    else deferred.reject();
                });

            }).promise();
        },
        casePhotoData: function(customer, userId, sessionId)
        {
            var offSet = 0;
            var imageSize = 0;

            return $.Deferred(function(deferred)
            {
                $.when
                (
                    //webOps.database.tables.casePhotoList.selectOnlyId(userId)
                    webOps.database.tables.casePhotoList.selectIdAndImageSize(userId)
                )
                .done(function(casePhotoList)
                {
                    casePhotoDataSave(casePhotoList);
                })
                .fail(function()
                {
                    deferred.reject();
                });

                function casePhotoDataSave(casePhotoList)
                {
                    var deferreds = [];
                    for (var i = 0, photoId = null; i < casePhotoList.length; i++)
                    {
                        photoId = casePhotoList[i].photoID;
                        imageSize = casePhotoList[i].imageSize;

                        if (imageSize > 0)
                        {
                            deferreds.push
                            (
                                $.Deferred(function(def)
                                {
                                    var _photoId = photoId;
                                    var _imageSize = imageSize;
                                    webOps.methods.getCasePhotoData([customer, sessionId, _photoId, offSet, _imageSize], function(status, data)
                                    {
                                        if (status == webOps.enums.STATUS_CODE.OK)
                                        {
                                            $.when(webOps.database.tables.casePhotoData.save(userId, _photoId, data.photoData))
                                                .done(function() { def.resolve(); })
                                                .fail(function() { def.reject(); });
                                        }
                                        else if (status == webOps.enums.STATUS_CODE.WARNING) def.resolve();
                                        else def.resolve(); //def.reject();
                                        //TODO: Validar todos los reject() para saber el error exacto.
                                    });

                                }).promise()
                            );
                        }
                    }

                    $.when.apply($, deferreds)
                    .done(function()
                    {
                        deferred.resolve();
                    })
                    .fail(function()
                    {
                        deferred.reject();
                    });
                }

            }).promise();
        },
        KitItems: function(customer, userId, sessionId)
        {
            var numRecords = 999;
            var requestNum = 0;

            return $.Deferred(function(deferred)
            {
                $.when
                (
                    webOps.database.tables.assignedKits.selectOnlyId(userId)
                )
                .done(function(assignedKits)
                {
                    kitItemsSave(assignedKits);
                })
                .fail(function()
                {
                    deferred.reject();
                });

                function kitItemsSave(assignedKits)
                {
                    var deferreds = [];
                    for (var i = 0, kitId = null; i < assignedKits.length; i++)
                    {
                        kitId = assignedKits[i];
                        deferreds.push
                        (
                            $.Deferred(function(def)
                            {
                                var _kitId = kitId;
                                webOps.methods.getKitItems([customer, sessionId, _kitId, numRecords, requestNum], function(status, data)
                                {
                                    if (status == webOps.enums.STATUS_CODE.OK)
                                    {
                                        $.when(webOps.database.tables.KitItems.saveMultiple(userId, data))
                                            .done(function() { def.resolve(); })
                                            .fail(function() { def.reject(); });
                                    }
                                    else if (status == webOps.enums.STATUS_CODE.WARNING) def.resolve();
                                    else def.reject();
                                });
                            }).promise()
                        );
                    }

                    $.when.apply($, deferreds)
                    .done(function()
                    {
                        deferred.resolve();
                    })
                    .fail(function()
                    {
                        deferred.reject();
                    });
                }

            }).promise();
        }
    },
    toServer:
    {
        casesDetail: function(customer, userId, sessionId, caseDownloadsAll)
        {
            var numRecords = 999;
            var requestNum = 0;

            return $.Deferred(function(deferred)
            {
                if (!caseDownloadsAll)
                {
                    $.when(webOps.database.tables.login.select(userId))
                        .done(function(result)
                        {
                            caseHeadersSelect(String(userId));
                        })
                        .fail(function()
                        {
                            deferred.fail();
                        });
                    //caseHeadersSelect(userId);
                }
                else
                {
                    $.when(webOps.database.tables.salesReps.selectAllSalesReps(userId))
                        .done(function(result)
                        {
                            var salesRepIds = '';
                            for (var i = 0; i < result.length; i++)
                            {
                                salesRepIds += String.concat(',', result[i].salesRepID);
                            }

                            caseHeadersSelect(salesRepIds.substr(1));
                        })
                        .fail(function()
                        {
                            deferred.fail();
                        });
                    //caseHeadersSelect('');
                }

                function caseHeadersSelect(salesRepId)
                {
                    $.when
                    (
                        webOps.database.tables.caseDetailFull.selectForSync(userId)
                    )
                    .done(function(casesDetailObjs)
                    {
                        casesDetailSync(casesDetailObjs, salesRepId);
                    })
                    .fail(function()
                    {
                        deferred.reject();
                    });
                }

                function casesDetailSync(casesDetailObjs, salesRepId)
                {
                    var save = function()
                    {
                        return $.Deferred(function(def)
                        {
                            $.when(webOps.database.tables.caseDetailFull.selectMinAndMaxDates(userId))
                                .done(function(obj)
                                {
                                    var startDate = moment(obj.Min).format('YYYY||MM||DD');
                                    var endDate = moment(obj.Max).format('YYYY||MM||DD');

                                    casesDetailSyncProcess(startDate, endDate);
                                })
                                .fail(function()
                                {
                                    def.reject();
                                });

                            function casesDetailSyncProcess(startDate, endDate)
                            {
                                var salesRepIdArray = salesRepId.split(',');
                                var getCaseTimestampsData = [];

                                for (var i = 0; i < salesRepIdArray.length; i++)
                                {
                                    var salesRepIdItem = salesRepIdArray[i];
                                    webOps.methods.getCaseTimestamps([customer, sessionId, salesRepIdItem, startDate, endDate, numRecords, requestNum], function(status, data)
                                    {
                                        if (status == webOps.enums.STATUS_CODE.OK)
                                        {
                                            getCaseTimestampsData = getCaseTimestampsData.concat(data);
                                            //$.alert(Object.toJSON(getCaseTimestampsData));
                                        }
                                        //else if (status == webOps.enums.STATUS_CODE.WARNING) def.resolve();
                                        //else def.reject();
                                    });
                                }

                                if (getCaseTimestampsData.length == 0)
                                {
                                    def.resolve();
                                }
                                else if (getCaseTimestampsData.length > 0)
                                {
                                    validateTimestampsCaseDetails(getCaseTimestampsData, casesDetailObjs);
                                }

                                function uploadCaseDetail(deferredObj, caseDetailData)
                                {
                                    if (caseDetailData)
                                    {
                                        var data = caseDetailData;
                                        webOps.methods.updateCaseHeaderNew([customer, sessionId, data.id, data.caseStatusID, data.hospitalID, data.notes, data.patient, data.physicianID, data.procTypeID, data.procDateTime, String.clear(data.assignedProdSystems).replaceAll(',', ''), data.salesRepID, '0', data.dob, data.sex, '0', '', '0', '0', '0', '0', '0', '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', [], /*data.po*/'', data.ageOfPatient], function(status, result)
                                        {
                                            $.log(String.format('casesDetail sync to server: response={0}', ($.type(result) == 'object') ? Object.toJSON(result) : ''));
                                            if (status == webOps.enums.STATUS_CODE.OK)
                                            {
                                                var d = ($.type(result) == 'object') ? result : null;
                                                if (d && data.id < 1)
                                                {
                                                    webOps.database.tables.caseHeaders.updateID(userId, data.id, d.id);
                                                    webOps.database.tables.caseDetailFull.updateID(userId, data.id, d.id);
                                                }
                                            }
                                        });
                                    }

                                    deferredObj.resolve();
                                }

                                function getCaseDetailDataById(caseHeadersData, id)
                                {
                                    var caseHeaderDataObj;
                                    for (var n = 0; n < caseHeadersData.length; n++)
                                    {
                                        var caseHeaderData = caseHeadersData[n];
                                        if (caseHeaderData.id == id)
                                        {
                                            caseHeaderDataObj = caseHeaderData;
                                            break;
                                        }
                                    }

                                    return caseHeaderDataObj;
                                }

                                function validateTimestampsCaseDetails(getCaseTimestampsData, getCaseDetailData)
                                {
                                    var deferreds = [];
                                    var caseDetailDataLoad = [];

                                    for (var i = 0; i < getCaseTimestampsData.length; i++)
                                    {
                                        var caseTimestamp = getCaseTimestampsData[i];
                                        caseDetailDataLoad.push(caseTimestamp.id);

                                        deferreds.push
                                        (
                                            $.Deferred(function(_def)
                                            {
                                                var _caseId = caseTimestamp.id;
                                                var _timestamp = caseTimestamp.timestamp;
                                                var _caseDetailData = getCaseDetailDataById(getCaseDetailData, _caseId);

                                                if (_caseDetailData)
                                                {
                                                    $.when(webOps.database.tables.caseHeaders.selectModifiedDate(userId, _caseId))
                                                        .done(function(caseDetailData)
                                                        {
                                                            if (caseDetailData && !$.isEmptyObject(caseDetailData))
                                                            {
                                                                var modifiedDateLocal = moment(caseDetailData.modifiedDate, "YYYY||MM||DD||HH||mm")._d.getTime();
                                                                var modifiedDateServer = moment(_timestamp, "YYYY||MM||DD||HH||mm")._d.getTime();

                                                                //$.log(String.format('caseId: {0}, modifiedDateServer: {1}, modifiedDateLocal: {2}  ', _caseId, _timestamp, caseHeaderData.modifiedDate));
                                                                if (modifiedDateLocal > modifiedDateServer)
                                                                {
                                                                    $.log('Sync to server caseHeader id: ' + _caseId + ' local date > server date.');
                                                                    uploadCaseDetail(_def, _caseDetailData);
                                                                }
                                                                else
                                                                {
                                                                    $.log('Sync to server caseHeader id: ' + _caseId + ' server date > local date.');
                                                                    _def.resolve();
                                                                }
                                                            }
                                                            else
                                                            {
                                                                _def.resolve();
                                                            }
                                                        })
                                                        .fail(function()
                                                        {
                                                            _def.resolve();
                                                            $.log('Sync to server caseHeader id: ' + _caseId + ' failed.');
                                                        });
                                                }
                                                else
                                                {
                                                    _def.resolve();
                                                }

                                            }).promise()
                                        );
                                    }

                                    for (var i = 0; i < getCaseDetailData.length; i++)
                                    {
                                        var caseDetailData = getCaseDetailData[i];
                                        if ($.inArray(caseDetailData.id.toString(), caseDetailDataLoad) == -1)
                                        {
                                            deferreds.push
                                            (
                                                $.Deferred(function(_def)
                                                {
                                                    $.log('Sync to server caseHeader id: ' + caseDetailData.id + ' is new.');
                                                    uploadCaseDetail(_def, caseDetailData);

                                                }).promise()
                                            );
                                        }
                                    }

                                    $.when.apply($, deferreds)
                                        .done(function()
                                        {
                                            deferred.resolve();
                                        })
                                        .fail(function()
                                        {
                                            deferred.reject();
                                        });
                                }
                            }

                        }).promise();
                    }

                    $.when
                    (
                        save()
                    )
                    .done(function()
                    {
                        deferred.resolve();
                    })
                    .fail(function()
                    {
                        deferred.reject();
                    });
                }

            }).promise();
        },
        inventoryCount: function(customer, userId, sessionId, hospitalID)
        {
            var batchId = 0;

            return $.Deferred(function(deferred)
            {
                $.when
                (
                    webOps.database.tables.inventoryCount.selectGroupToSync(userId, hospitalID)
                )
                .done(function(inventoryCountObjs)
                {
                    inventoryCountSync(inventoryCountObjs);
                })
                .fail(function()
                {
                    deferred.reject();
                });

                function inventoryCountSync(inventoryCountObjs)
                {
                    var cycleCountDetail = [];
                    for (var i = 0, inventoryCountObj = null; i < inventoryCountObjs.length; i++)
                    {
                        inventoryCountObj = inventoryCountObjs[i];
                        cycleCountDetail.push(String.format('"{0}||{1}||{2}"', inventoryCountObj.catalog, inventoryCountObj.lotCode, inventoryCountObj.quantity));
                    }

                    if (cycleCountDetail.length > 0)
                    {
                        var message;
                        webOps.methods.postCycleCount([customer, sessionId, hospitalID, batchId, cycleCountDetail], function(status, data)
                        {
                            $.log(String.format('Inventory count sync to server: {0}', data));
                            if (status == webOps.enums.STATUS_CODE.OK)
                            {
                                message = String.format('Inventory count sync to server: {0}', data);
                                if (cycleCountDetail.length == data)
                                {
                                    webOps.database.tables.inventoryCount.updateGroupCommitted(userId, hospitalID);
                                }

                                deferred.resolve(message);
                            }
                            else
                            {
                                message = String.format('Inventory count sync to server ERROR: {0}', data);
                                deferred.resolve(message);
                            }

                            /*else if (status == webOps.enums.STATUS_CODE.WARNING) def.resolve();
                            else def.reject();*/
                        });
                    }
                    else
                    {
                        message = 'Nothing to Commit';
                        deferred.resolve(message);
                    }
                }

            }).promise();
        },
        usage: function(customer, userId, sessionId, caseId, usageTimestamp)
        {
            var batchId = 0;

            return $.Deferred(function(deferred)
            {
                $.when
                (
                    webOps.database.tables.usage.selectGroup(userId, caseId)
                )
                .done(function(usageObjs)
                {
                    usageSync(usageObjs);
                })
                .fail(function()
                {
                    deferred.reject();
                });

                function usageSync(usageObjs)
                {
                    var usageDetail = [];
                    for (var i = 0, usageObj = null; i < usageObjs.length; i++)
                    {
                        //1003||326295S ||003||6928||6928||265.760009765625||0||352944129||||, this is how the String is generated
                        //id||cat. Num|| lot code||ship To ID||rRepl. To ID||List Price||Ext. Price||Exception Code||Notes||WareHouse ID. Dont worry about the ID value.

                        usageObj = usageObjs[i];
                        usageDetail.push
                        (
                            String.format
                            (
                                '"{0}||{1}||{2}||{3}||{4}||{5}||{6}||{7}||{8}||{9}"',
                                i + 1, 
                                usageObj.catalog, 
                                usageObj.lotCode, 
                                usageObj.shipTo, 
                                usageObj.inventoryLoc, 
                                usageObj.unitActualPrice || 0,
                                usageObj.total || 0,
                                usageObj.priceException || 0, 
                                usageObj.notes, 
                                usageObj.inventoryLoc
                            )
                        );
                    }

                    if (usageDetail.length > 0)
                    {
                        var message;
                        webOps.methods.updateCaseExternalItems([customer, sessionId, caseId, usageTimestamp, usageDetail, 0], function(status, data)
                        {
                            $.log(String.format('Usage sync to server: {0}', data));
                            if (status == webOps.enums.STATUS_CODE.OK)
                            {
                                //message = String.format('Inventory count sync to server: {0}', data);
                                if (usageDetail.length == data)
                                {
                                    webOps.database.tables.usage.updateGroupCommitted(userId, caseId);
                                }

                                deferred.resolve(message);
                            }
                            else
                            {
                                message = String.format('Usage sync to server ERROR: {0}', data);
                                deferred.resolve(message);
                            }

                            /*else if (status == webOps.enums.STATUS_CODE.WARNING) def.resolve();
                            else def.reject();*/
                        });
                    }
                    else
                    {
                        message = 'Nothing to Commit';
                        deferred.resolve(message);
                    }
                }

            }).promise();
        },
        updatePhoto: function(customer, userId, sessionId, caseId, categoryId, data)
        { 
            var status = 3;

            return $.Deferred(function(deferred)
            {
                var message;
                webOps.methods.updatePhoto([customer, sessionId, caseId, categoryId, imgLenght+1, status, data], function(status, data)
                {
                    $.log(String.format('updatePhoto sync to server: {0}', data));
                    if (status == webOps.enums.STATUS_CODE.OK)
                    {
                        deferred.resolve();
                    }
                    else
                    {
                        message = String.format('updatePhoto sync to server ERROR: {0}', data);
                        deferred.resolve(message);
                    }
                });

            }).promise();
        }
    }
};