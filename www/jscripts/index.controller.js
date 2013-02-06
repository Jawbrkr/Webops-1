// =================================================================
// 	Page Controller
// 	----------------------------------------------------------------
// 
// 	Autor: Oscar Cubillos <tegers77@gmail.com>
// 	Version 1.0
// 	Create: 2012-08-26
// 	Last Modified: 2013-02-03
// 
// 	----------------------------------------------------------------
// 	References
// 	----------------------------------------------------------------
/// <reference path="webops/webops.tools.js" />
/// <reference path="webops/webops.methods.js" />
/// <reference path="webops/webops.database.js" />
/// <reference path="webops/webops.synchronize.js" />
//
// =================================================================

var REQUEST_NUM = 0;

function cancelEvent()
{
    event.stopPropagation();
    return false;
}

function database()
{
    this.getTables = function(onSuccess)
    {
        return $.tryCatch(
        {
            init: function()
            {
                $.when
                (
                    $.Deferred(function(deferred)
                    {
                        webOps.database.sqlDatabase.readTransaction(function(tx)
                        {
                            tx.executeSql('SELECT name FROM sqlite_master WHERE type = "table" AND SUBSTR(name, 1, 1) != "_" ORDER BY name', [],
                            function(tx, data)
                            {
                                var items = [];
                                for (var i = 0; i < data.rows.length; i++)
                                {
                                    items.push(data.rows.item(i));
                                }

                                deferred.resolve(items);
                            },
                            function(tx, ex)
                            {
                                deferred.reject();
                            });
                        });
                    }).promise()
                )
                .done(function(tables)
                {
                    new database().getTablesDetail(tables, onSuccess);
                });
            }
        });
    },
    this.getTablesDetail = function(tables, onSuccess)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var deferreds = [];
                for (var i = 0, table = null; i < tables.length; i++)
                {
                    table = tables[i];
                    deferreds.push
                    (
                        $.Deferred(function(def)
                        {
                            var _table = table;
                            webOps.database.sqlDatabase.readTransaction(function(tx)
                            {
                                tx.executeSql(String.format('SELECT COUNT(*) rows FROM {0}', _table.name), [],
                                function(tx, data)
                                {
                                    var obj = { table: _table.name, rows: data.rows.item(0).rows };
                                    def.resolve(obj);
                                },
                                function(tx, ex)
                                {
                                    def.reject();
                                });
                            });

                        }).promise()
                    );
                }

                $.when.apply($, deferreds)
                .done(function()
                {
                    $.executeFunction(onSuccess, arguments);
                });
            }
        });
    }
    this.getLocalStorage = function()
    {
        return $.tryCatch(
        {
            init: function()
            {
                var items = [];
                Object.keys(localStorage).forEach(function(key)
                {
                    items.push({ key: key, value: localStorage.getItem(key) });
                });

                return items;
            }
        });
    }
}

function currentSession()
{
    this.get = function()
    {
        return $.tryCatch(
        {
            init: function()
            {
                return webOps.database.tables.currentSession.select();
            }
        });
    }
}

function customerSelect()
{
    this.get = function(onSuccess)
    {
        return $.tryCatch(
        {
            init: function()
            {
                $.when(webOps.database.tables.customers.select())
                    .done(function(result)
                    {
                        $.executeFunction(onSuccess, result);
                    });
            }
        });
    },
    this.newCustomer = function(customer, onSuccess, onError)
    {
        return $.tryCatch(
        {
            init: function()
            {
                $.when(webOps.database.tables.customers.save(customer))
                    .done(function()
                    {
                        $.executeFunction(onSuccess);
                    })
                    .fail(function()
                    {
                        $.executeFunction(onError);
                    });
            }
        });
    },
    this.selectedCustomer = function(customer)
    {
        return $.tryCatch(
        {
            init: function()
            {
                webOps.database.tables.customers.selected(customer);
            }
        });
    },
    this.getSelectedCustomer = function()
    {
        return $.tryCatch(
        {
            init: function()
            {
                //$.when(webOps.database.tables.historyLogin.select(userId))
                //.done(function(data)
                //{
                //    $.alert(data[0].date);
                //})
                //.fail(function()
                //{
                //    $.alert('ERROR');
                //});

                return webOps.database.tables.customers.getSelected();
            }
        });
    }
}

function login(customer, user, password, onSuccess)
{
    //customer = 'prod';
    var statusResponse = webOps.enums.STATUS_CODE.ERROR;

    $.tryCatch(
    {
        init: function()
        {
            if (!String.isNullOrEmpty(customer) && !String.isNullOrEmpty(user) && !String.isNullOrEmpty(password))
            {
                user += '~1027';
                var parameters = [customer, user, password, 'BB', 'F']; //['prod', 'salesrepone~1027', 'salesrepone', 'BB', 'F']

                webOps.methods.login(parameters, function(status, data)
                {
                    statusResponse = status;
                    if (status == webOps.enums.STATUS_CODE.OK)
                    {
                        var userId = data.userId;
                        $.when(webOps.database.tables.login.save(data.userId, data.sessionId, parameters.join(','), data.build, data.firstName, data.lastName, data.fullName, data.required, ($.isArray(data.roles) ? data.roles.join(',') : data.roles), ($.isArray(data.salesRepIds) ? data.salesRepIds.join(',') : data.salesRepIds)))
                            .done(function()
                            {
                                webOps.database.tables.currentSession.save(customer, data.userId, data.sessionId);
                                //$.alert('OK, login successful');
                                $.executeFunction(onSuccess);
                            })
                            .fail(function()
                            {
                                alert('Network error: sorry, but the network is not accessible right now. This application will now close since network access is a requirement.');
                            });
                    }
                    else
                    {
                        $.alert('Error: Sorry, but the credentials that you provided are incorrect.');
                    }
                });
            }
            else
            {
                $.alert('Please enter customer, username and password.');
            }
        }
    });

    //if (statusResponse != webOps.enums.STATUS_CODE.OK)
    //    return cancelEvent();
}

function logout()
{
    return $.tryCatch(
    {
        init: function()
        {
            webOps.database.tables.currentSession.remove();
        }
    });
}

function setUp()
{
    this.get = function()
    {
        return $.tryCatch(
        {
            init: function()
            {
                return webOps.database.tables.setUp.select();
            }
        });
    },
    this.set = function(caseDownloads, appMode)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var obj =
                {
                    caseDownloads:
                    {
                        mine: !caseDownloads,
                        all: caseDownloads
                    },
                    appMode:
                    {
                        onLine: !appMode,
                        offLine: appMode
                    }
                };

                webOps.database.tables.setUp.save(obj.caseDownloads.mine, obj.caseDownloads.all, obj.appMode.onLine, obj.appMode.offLine);
            }
        });
    },
    this.validateAirplaneMode = function(isConnected)
    {
        return $.tryCatch(
        {
            init: function()
            {
                $.log('Airplane');
                isConnected = false;
                var setup = webOps.database.tables.setUp.select();

                if (isConnected == false && setup.appModeOnLine)
                {
                    $.alert('Network error: sorry, but the network is not accessible right now. This application will now close since network access is a requirement.');
                }
            }
        });
    }
}

function loadingCaseFromTheServer(invokeFrom, dateStart, dateEnd, onSuccess, onError)
{
    $.tryCatch(
    {
        init: function()
        {
            var currentSessionObj = webOps.database.tables.currentSession.select();
            var customer = currentSessionObj.customer;
            var userId = currentSessionObj.userId;
            var sessionId = currentSessionObj.sessionId;
            var numRecords = 999;            

            //var startDate = moment().format('YYYY||MM||DD');
            //var endDate = moment().add('d', 7).format('YYYY||MM||DD');
            //var startDate = moment(new Date(2012, 04, 16)).format('YYYY||MM||DD');
            //var endDate = moment(new Date(2012, 04, 16)).add('d', 7).format('YYYY||MM||DD');

            if (invokeFrom && $.inArray(invokeFrom, ['refresh', 'daterange', 'manualsync']) > -1)
            {
                subsequenLogins();
            }
            else
            {
                $.when(webOps.database.tables.historyLogin.isFirstLogin(userId))
                    .done(function(isFirstLogin)
                    {
                        //isFirstLogin = true;

                        if (isFirstLogin) firstLogin();
                        else subsequenLogins();
                    })
                    .fail(function()
                    {
                        $.executeFunction(onError);
                    });
            }

            function firstLogin()
            {
                $.when
                (
                    webOps.synchronize.fromServer.procedures(customer, userId, sessionId),
                    webOps.synchronize.fromServer.salesReps(customer, userId, sessionId),
                    webOps.synchronize.fromServer.physicians(customer, userId, sessionId),
                    webOps.synchronize.fromServer.hospitals(customer, userId, sessionId),
                    webOps.synchronize.fromServer.addresses(customer, userId, sessionId),
                    webOps.synchronize.fromServer.productSystems(customer, userId, sessionId),
                    webOps.synchronize.fromServer.prodSystemCats(customer, userId, sessionId),
                    webOps.synchronize.fromServer.warehouses(customer, userId, sessionId),
                    webOps.synchronize.fromServer.caseStatusCodes(customer, userId, sessionId),
                    webOps.synchronize.fromServer.kitStatusCodes(customer, userId, sessionId),
                    webOps.synchronize.fromServer.priceExceptionCodes(customer, userId, sessionId)
                )
                .done(function()
                {
                    subsequenLogins();
                })
                .fail(function()
                {
                    $.executeFunction(onError);
                });
                
            }

            function subsequenLogins()
            {
                //firstLogin();
                var all = ($('#ckbCaseDownloads').is(':checked'));

                if (dateStart == '') dateStart = undefined;
                if (dateEnd == '') dateEnd = undefined;

                $.when
                (
                    webOps.synchronize.fromServer.caseHeaders(customer, userId, sessionId, all, dateStart, dateEnd)                    
                )
                .done(function()
                {
                    $.when
                    (
                        webOps.synchronize.fromServer.caseDetailFull(customer, userId, sessionId),
                        webOps.synchronize.fromServer.assignedKits(customer, userId, sessionId)
                        //webOps.synchronize.fromServer.casePhotoList(customer, userId, sessionId)
                    )
                    .done(function()
                    {
                        $.when
                        (
                            webOps.synchronize.fromServer.caseDetailFull(customer, userId, sessionId)
                        )
                        .done(function()
                        {
                            $.when
                            (
                                webOps.synchronize.fromServer.KitItems(customer, userId, sessionId)
                                //webOps.synchronize.fromServer.casePhotoData(customer, userId, sessionId)
                            )
                            .done(function()
                            {
                                $.executeFunction(onSuccess);
                            })
                            .fail(function()
                            {
                                $.executeFunction(onError);
                            });
                        })
                        .fail(function()
                        {
                            $.executeFunction(onError);
                        });
                    })
                    .fail(function()
                    {
                        $.executeFunction(onError);
                    });
                })
                .fail(function()
                {
                    $.executeFunction(onError);
                });
            }
        }
    });
}


function imagingFromTheServer(caseId, onSuccess, onError)
{
    var currentSessionObj = webOps.database.tables.currentSession.select();
    var customer = currentSessionObj.customer;
    var userId = currentSessionObj.userId;
    var sessionId = currentSessionObj.sessionId;

    $.when
    (
        webOps.synchronize.fromServer.casePhotoListByCaseId(customer, userId, sessionId,caseId)
    )                
    .done(function()
    {
        $.when
        (
            webOps.synchronize.fromServer.casePhotoData(customer, userId, sessionId)
        )
        .done(function()
        {
            $.executeFunction(onSuccess);
        })
        .fail(function()
        {
            $.executeFunction(onError);
        });
    });
}

function settings()
{
    this.get = function(onSuccess)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;

                $.when
                (
                    webOps.database.tables.login.select(userId),
                    webOps.database.tables.prodSystemCats.count(userId),
                    webOps.database.tables.productSystems.count(userId),
                    webOps.database.tables.caseStatusCodes.count(userId),
                    webOps.database.tables.kitStatusCodes.count(userId),
                    webOps.database.tables.priceExceptionCodes.count(userId),
                    webOps.database.tables.addresses.count(userId),
                    webOps.database.tables.warehouses.count(userId),
                    webOps.database.tables.salesReps.count(userId),
                    webOps.database.tables.hospitals.count(userId),
                    webOps.database.tables.physicians.count(userId),
                    webOps.database.tables.procedures.count(userId),
                    webOps.database.tables.caseHeaders.count(userId)
                )
                .done(function(login, prodSystemCats, productSystems, caseStatusCodes, kitStatusCodes, priceExceptionCodes, addresses, warehouses, salesReps, hospitals, physicians, procedures, caseHeaders)
                {
                    var obj =
                    {
                        userName: login.parameters.split(',')[webOps.database.tables.login.parametersDefinition.USERNAME],
                        customer: login.parameters.split(',')[webOps.database.tables.login.parametersDefinition.CUSTOMER],

                        prodSystemCats: prodSystemCats.count,
                        productSystems: productSystems.count,
                        userRoles: login.roles.length,
                        caseStatusCodes: caseStatusCodes.count,
                        kitStatusCodes: kitStatusCodes.count,
                        priceExceptionCodes: priceExceptionCodes.count,
                        warehouseAddresses: addresses.count,
                        warehouses: warehouses.count,
                        salesReps: salesReps.count,
                        hospitals: hospitals.count,
                        physicians: physicians.count,
                        procedures: procedures.count,
                        cases: caseHeaders.count
                    };
                
                    $.executeFunction(onSuccess, obj);
                });
            }
        });
    },
    this.resetEverythingAllData = function(isOnline, deleteCurrentSession, onSuccess)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var currentSessionObj = webOps.database.tables.currentSession.select();
                var userId = currentSessionObj.userId;
                var sessionId = currentSessionObj.sessionId;

                $.when
                (
                    webOps.database.commands.clearDatabase(userId, deleteCurrentSession)
                )
                .done(function()
                {
                    if (isOnline) saveHistoryLogin();
                    $.executeFunction(onSuccess);
                })
                .fail(function()
                {
                    $.executeFunction(onSuccess);
                });

                function saveHistoryLogin()
                {
                    webOps.database.tables.historyLogin.save(userId, sessionId);
                }
            }
        });
    }
}

function caseView()
{
    this.getList = function(sortBy, viewBy, filter, startDate, endDate, onSuccess, onError)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when
                (
                    webOps.database.tables.caseStatusCodes.select(userId),
                    webOps.database.tables.caseHeaders.selectFilter(userId, sortBy, viewBy, filter, startDate, endDate)
                )
                .done(function(caseStatusCodes, caseViews)
                {
                    var arr = [];
                    if (caseViews)
                    {
                        function caseStatusCodesByCode(code)
                        {
                            var caseStatusCode = 'undefined';
                            for (var i = 0; i < caseStatusCodes.length; i++)
                            {
                                var caseStatusCodeItem = caseStatusCodes[i];
                                if (caseStatusCodeItem.id == code)
                                {
                                    caseStatusCode = caseStatusCodeItem.name;
                                    break;
                                }
                            }

                            return caseStatusCode;
                        }

                        for (var i = 0; i < (caseViews || []).length; i++)
                        {
                            var caseViewHeaderItem = caseViews[i];

                            var dateView = moment(caseViewHeaderItem.procDateTime,"YYYY||MM||DD").format('MMM DD, YYYY');
                            var procDateTime2 = (caseViewHeaderItem.procDateTime || '').split('||');
                            var hour = String.format('{0}:{1} {2}', Number(procDateTime2[3]) < 12 ? Number(procDateTime2[3]) : Number(procDateTime2[3]) - 12, procDateTime2[4], (parseInt(procDateTime2[3]) < 12 ? 'AM' : 'PM'));

                            var obj =
                            {
                                id: caseViewHeaderItem.id,
                                patient: caseViewHeaderItem.patient,
                                hospitalID: caseViewHeaderItem.hospitalID,
                                physicianID: caseViewHeaderItem.physicianID,
                                dateView: dateView,
                                hour: hour,
                                procTypeID: caseViewHeaderItem.procTypeID,
                                usageStatusCode: caseViewHeaderItem.caseStatusID,
                                usageStatus: caseStatusCodesByCode(caseViewHeaderItem.caseStatusID)
                            };

                            arr.push(obj);
                        }
                    }

                    $.executeFunction(onSuccess, arr);
                })
                .fail(function()
                {
                    $.executeFunction(onError);
                });
            }
        });
    },
    this.getCaseStatusCodes = function(onSuccess)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when
                (
                    webOps.database.tables.caseStatusCodes.select(userId)
                )
                .done(function(data)
                {
                    $.executeFunction(onSuccess, data);
                });
            }
        });
    },
    this.getSalesReps = function(onSuccess)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when
                (
                    webOps.database.tables.salesReps.select(userId)
                )
                .done(function(data)
                {
                    $.executeFunction(onSuccess, data);
                });
            }
        });
    },
    this.getSalesRepsOthers = function(onSuccess)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when
                (
                    webOps.database.tables.salesReps.select(userId)
                )
                .done(function(data)
                {
                    $.executeFunction(onSuccess, data, userId);
                });
            }
        });
    },
    this.getHospitals = function(onSuccess)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when
                (
                    webOps.database.tables.hospitals.select(userId)
                )
                .done(function(data)
                {
                    $.executeFunction(onSuccess, data);
                });
            }
        });
    },
    this.getPhysicians = function(onSuccess)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when
                (
                    webOps.database.tables.physicians.select(userId)
                )
                .done(function(data)
                {
                    $.executeFunction(onSuccess, data);
                });
            }
        });
    },
    this.getProcedures = function(onSuccess)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when
                (
                    webOps.database.tables.procedures.select(userId)
                )
                .done(function(data)
                {
                    $.executeFunction(onSuccess, data);
                });
            }
        });
    },
    this.getProdSystemCats = function(onSuccess)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when
                (
                    webOps.database.tables.prodSystemCats.select(userId)
                )
                .done(function(data)
                {
                    $.executeFunction(onSuccess, data);
                });
            }
        });
    },
    this.getProductSystems = function(products, onSuccess)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when
                (
                    webOps.database.tables.productSystems.selectByProducts(userId, products)
                )
                .done(function(data)
                {
                    $.executeFunction(onSuccess, data);
                });
            }
        });
    },
    this.getAssignedKits = function(caseId, onSuccess)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when
                (
                    webOps.database.tables.assignedKits.select(userId, caseId)
                )
                .done(function(data)
                {
                    $.executeFunction(onSuccess, data);
                });
            }
        });
    },
    this.getKitItems = function(kitId, onSuccess)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when
                (
                    webOps.database.tables.KitItems.select(userId, kitId)
                )
                .done(function(data)
                {
                    $.executeFunction(onSuccess, data);
                });
            }
        });
    },
    this.getPhotoListInfo = function(caseId, onSuccess)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when
                (
                    webOps.database.tables.casePhotoList.selectCountByGroup(userId, caseId)
                )
                .done(function(data)
                {
                    $.executeFunction(onSuccess, data);
                });
            }
        });
    },
    this.getPhotoList = function(caseId, category, onSuccess)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when
                (
                    webOps.database.tables.casePhotoList.selectDataByCategory(userId, caseId, category)
                )
                .done(function(data)
                {
                    $.executeFunction(onSuccess, data);
                });
            }
        });
    },
    this.viewCasesByAll = function(onSuccess, onError)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var currentSessionObj = webOps.database.tables.currentSession.select();
                var customer = currentSessionObj.customer;
                var userId = currentSessionObj.userId;
                var sessionId = currentSessionObj.sessionId;

                $.when
                (
                    webOps.synchronize.fromServer.caseHeaders(customer, userId, sessionId, true)
                )
                .done(function()
                {
                    $.when
                    (
                        webOps.synchronize.fromServer.caseDetailFull(customer, userId, sessionId),
                        webOps.synchronize.fromServer.assignedKits(customer, userId, sessionId),
                        webOps.synchronize.fromServer.casePhotoList(customer, userId, sessionId)
                    )
                    .done(function()
                    {
                        $.when
                        (
                            webOps.synchronize.fromServer.KitItems(customer, userId, sessionId),
                            webOps.synchronize.fromServer.casePhotoData(customer, userId, sessionId)
                        )
                        .done(function()
                        {
                            $.executeFunction(onSuccess);
                        })
                        .fail(function()
                        {
                            $.executeFunction(onError);
                        });
                    })
                    .fail(function()
                    {
                        $.executeFunction(onError);
                    });
                })
                .fail(function()
                {
                    $.executeFunction(onError);
                });
            }
        });
    }
}

function caseViewSort()
{
    this.set = function(sortBy, viewBy, onSuccess)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when
                (
                    webOps.database.tables.caseViewSort.save(userId, sortBy, viewBy)
                )
                .always(function()
                {
                    $.executeFunction(onSuccess);
                });
            }
        });
    },
    this.get = function(onSuccess, onError)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when
                (
                    webOps.database.tables.caseViewSort.select(userId)
                )
                .done(function(caseViewSort)
                {
                    $.executeFunction(onSuccess, caseViewSort);
                })
                .fail(function()
                {
                    $.executeFunction(onError);
                });
            }
        });
    }
}

function caseDetailFull()
{
    this.set = function(caseId, data, onSuccess, onError)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var currentSessionObj = webOps.database.tables.currentSession.select();
                var customer = currentSessionObj.customer;
                var userId = currentSessionObj.userId;
                var sessionId = currentSessionObj.sessionId;
                var modifiedDate = moment(new Date()).format('YYYY||MM||DD||HH||mm');

                if (!String.isNullOrEmpty(caseId) && Number(caseId) > 0)
                {
                    $('#lblError').html('');
                    $.when
                    (
                        webOps.database.tables.caseDetailFull.update(userId, caseId, data.caseStatusID, data.salesRepID, data.procDateTime, data.hospitalID, data.physicianID, data.procTypeID, data.assignedProdSystems, data.patient, data.dob, data.sex, data.ageOfPatient, data.po, data.notes, data.freight, data.totalPrice),
                        webOps.database.tables.caseHeaders.update(userId, caseId, modifiedDate, data.caseStatusID, data.salesRepID, data.procDateTime, data.hospitalID, data.physicianID, data.procTypeID, data.patient, data.dob, data.sex, data.ageOfPatient, data.po, data.notes, data.freight)
                    )
                    .done(function()
                    {
                        // Validate mode onLine.
                        if (webOps.database.tables.setUp.select().appModeOnLine)
                        {
                            $('#lblError').html('');

                            /*var assignedProdSystemsArray = [];
                            var assignedProdSystems = data.assignedProdSystems.split(',');

                            for (var i = 0; i < assignedProdSystems.length; i++)
                            {
                                assignedProdSystemsArray.push(String.format('"{0}"', assignedProdSystems[i].split('||')[0]));
                            }*/

                            var assignedProdSystemsArray = String.format(data.assignedProdSystems).replaceAll(',', '');
                            webOps.methods.updateCaseHeaderNew([customer, sessionId, caseId, data.caseStatusID, data.hospitalID, data.notes, data.patient, data.physicianID, data.procTypeID, data.procDateTime, assignedProdSystemsArray, data.salesRepID, data.freight, data.dob, data.sex, '0', '', '0', '0', '0', '0', '0', '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', [], /*data.po*/'', data.ageOfPatient], function(status, data)
                            {
                                $.log(String.format('Update Case Header New sync to server [UPDATE]: response={0}', ($.type(data) == 'object') ? Object.toJSON(data) : ''));
                                if (status == webOps.enums.STATUS_CODE.OK)
                                {
                                    var d = ($.type(data) == 'object') ? data : null;
                                    if (d && caseId < 1)
                                    {
                                        //$.when(webOps.database.tables.caseHeaders.updateID(userId, caseId, d.id))
                                        // .done(function()
                                        // {
                                        //     webOps.database.tables.caseDetailFull.updateID(userId, caseId, d.id);
                                        // });

                                        webOps.database.tables.caseHeaders.updateID(userId, caseId, d.id);
                                        webOps.database.tables.caseDetailFull.updateID(userId, caseId, d.id);
                                    }
                                }
                                else if (status == webOps.enums.STATUS_CODE.ERROR)
                                {
                                    $.alert('Error to save case in server');
                                }
                            });

                            new usage().syncToServer(caseId, function(message)
                            {
                                //if (message && message.length > 0) $.alert(message);
                                $.executeFunction(onSuccess);
                            });
                        }
                        else
                        {
<<<<<<< HEAD
                            //alert('offLine');
                            var caseIdOff = $('.caseDetailListID').html();
                            $('#caseNoSave').html(caseIdOff);
                            $('#lblError').html('Error');
=======
>>>>>>> Feb 6 3pm
                            $.executeFunction(onSuccess);
                        }
                    })
                    .fail(function()
                    {
                        $.executeFunction(onError);
                    });
                }
                else
                {
                    $.when
                   (
                       webOps.database.tables.caseHeaders.selectMinID()
                   )
                    .done(function(caseMinId)
                    {
                        $.log(String.format('MIN CaseID: {0}', caseMinId.caseId));
                        $.when
                        (
                            webOps.database.tables.caseDetailFull.insert(userId, '', '', '', '', '', '', '', '', '', '', '', '', '', '', data.products, '', '', '', data.ageOfPatient, '', data.assignedKits, data.assignedProdSystems, data.caseStatusID, data.dob, '', '', data.freight, '', data.hospitalID, caseMinId.caseId, data.notes, data.patient, data.physicianID, data.po, data.procDateTime, data.procTypeID, data.salesRepID, data.sex, '', data.totalPrice, data.usageStatus, '', ''),
                            webOps.database.tables.caseHeaders.insert(userId, modifiedDate, '', '', '', '', '', '', '', '', '', '', '', '', '', '', data.products, '', '', '', data.caseStatusID, data.dob, '', data.freight, data.hospitalID, caseMinId.caseId, data.notes, data.patient, data.physicianID, data.procDateTime, data.procTypeID, data.salesRepID, data.sex, '', data.usageStatus, '')
                        )
                        .done(function()
                        {
                            // Validate mode onLine.
                            $.log(String.format('AppMode: {0}', webOps.database.tables.setUp.select().appModeOnLine));
                            if (webOps.database.tables.setUp.select().appModeOnLine)
                            {
                                var newCaseId;
                                webOps.methods.updateCaseHeaderNew([customer, sessionId, caseId, data.caseStatusID, data.hospitalID, data.notes, data.patient, data.physicianID, data.procTypeID, data.procDateTime, String.clear(data.assignedProdSystems).replaceAll(',', ''), data.salesRepID, data.freight, data.dob, data.sex, '0', '', '0', '0', '0', '0', '0', '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', [], /*data.po*/'', data.ageOfPatient], function(status, data)
                                {
                                    $.log(String.format('Update Case Header New sync to server [INSERT]: response={0}', ($.type(data) == 'object') ? Object.toJSON(data) : ''));
                                    if (status == webOps.enums.STATUS_CODE.OK)
                                    {
                                        var d = ($.type(data) == 'object') ? data : null;
                                        caseId = caseMinId.caseId;

                                        if (d && caseId < 1)
                                        {
                                            newCaseId = d.id;
                                            webOps.database.tables.caseHeaders.updateID(userId, caseId, newCaseId);
                                            webOps.database.tables.caseDetailFull.updateID(userId, caseId, newCaseId);
                                        }
                                    }
                                    else if (status == webOps.enums.STATUS_CODE.ERROR)
                                    {
                                        $.alert('Error to save case in server');
                                    }
                                });

                                if (newCaseId)
                                {
                                    new usage().syncToServer(newCaseId, function(message)
                                    {
                                        //if (message && message.length > 0) $.alert(message);
                                        $.executeFunction(onSuccess);
                                    });
                                }
                                else
                                {
                                    $.executeFunction(onSuccess);
                                }
                            }
                            else
                            {
                                $.executeFunction(onSuccess);
                            }
                        })
                        .fail(function()
                        {
                            $.executeFunction(onError);
                        });
                   })
                   .fail(function()
                   {
                       $.executeFunction(onError);
                   });
                }
            }
        });
    },
    this.get = function(caseId, onSuccess, onError)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when
                (
                    webOps.database.tables.caseDetailFull.select(userId, caseId)
                )
                .done(function(caseDetail)
                {
                    if (caseDetail)
                    {
                        $.log(Object.toJSON(caseDetail));
                    }

                    $.executeFunction(onSuccess, caseDetail);
                })
                .fail(function()
                {
                    $.executeFunction(onError);
                });
            }
        });
    },
    this.updatePhoto = function(caseId, categoryId, data, onSuccess, onError)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var currentSessionObj = webOps.database.tables.currentSession.select();
                var customer = currentSessionObj.customer;
                var userId = currentSessionObj.userId;
                var sessionId = currentSessionObj.sessionId;

                $.when(webOps.synchronize.toServer.updatePhoto(customer, userId, sessionId, caseId, categoryId, data))
                   .done(function(message)
                   {
                       $.executeFunction(onSuccess, message);
                   })
                   .fail(function()
                   {
                       $.executeFunction(onSuccess);
                   });
            }
        });
    }
}

function inventoryCount()
{
    this.getHospitals = function(onSuccess)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when(webOps.database.tables.hospitals.select(userId))
                    .done(function(result)
                    {
                        $.executeFunction(onSuccess, result);
                    });
            }
        });
    },
    this.saveNewEntry = function(hospitalID, catalog, lotCode, onSuccess, onError)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when(webOps.database.tables.inventoryCount.save(userId, hospitalID, catalog, lotCode))
                    .done(function()
                    {
                        $.executeFunction(onSuccess);
                    })
                    .fail(function()
                    {
                        $.executeFunction(onError);
                    });
            }
        });
    },
    this.getEntries = function(hospitalID, onSuccess)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when(webOps.database.tables.inventoryCount.selectGroup(userId, hospitalID))
                    .done(function(result)
                    {
                        $.executeFunction(onSuccess, result);
                    });
            }
        });
    },
    this.updateEntryIn = function(hospitalID, catalog, lotCode, newCatalog, newLotCode, quantity, onSuccess, onError)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when
                (
                    webOps.database.tables.inventoryCount.removeByEntry(userId, hospitalID, catalog, lotCode)
                )
                    .done(function()
                    {
                        var deferreds = [];
                        for (var i = 0; i < parseInt(quantity); i++)
                        {
                            deferreds.push
                            (
                                $.Deferred(function(def)
                                {
                                    $.when(webOps.database.tables.inventoryCount.save(userId, hospitalID, newCatalog, newLotCode))
                                        .done(function()
                                        {
                                            def.resolve();
                                        })
                                        .fail(function()
                                        {
                                            def.resolve();
                                        });
                                }).promise()
                            );
                        }

                        $.when.apply($, deferreds)
                        .done(function()
                            {
                                $.executeFunction(onSuccess);
                            })
                            .fail(function()
                            {
                                $.executeFunction(onError);
                            });                            
                    })
                    .fail(function()
                    {
                        $.executeFunction(onError);
                    });
            }
        });
    },
    this.removeByHospital = function(hospitalID, onSuccess, onError)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when(webOps.database.tables.inventoryCount.removeByHospital(userId, hospitalID))
                    .done(function()
                    {
                        $.executeFunction(onSuccess);
                    })
                    .fail(function()
                    {
                        $.executeFunction(onError);
                    });
            }
        });
    },
    this.removeByEntry = function(hospitalID, catalog, lotCode, onSuccess, onError)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when(webOps.database.tables.inventoryCount.removeByEntry(userId, hospitalID, catalog, lotCode))
                    .done(function()
                    {
                        $.executeFunction(onSuccess);
                    })
                    .fail(function()
                    {
                        $.executeFunction(onError);
                    });
            }
        });
    },
    this.syncToServer = function(hospitalID, onSuccess)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var currentSessionObj = webOps.database.tables.currentSession.select();
                var customer = currentSessionObj.customer;
                var userId = currentSessionObj.userId;
                var sessionId = currentSessionObj.sessionId;
                
                $.when(webOps.synchronize.toServer.inventoryCount(customer, userId, sessionId, hospitalID))
                   .done(function(message)
                   {
                       $.executeFunction(onSuccess, message);
                   })
                   .fail(function()
                   {
                       $.executeFunction(onSuccess);
                   });
            }
        });
    }
}

function usage()
{
    this.getReplenishTo = function(onSuccess)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when(webOps.database.tables.addresses.selectReplenishTo(userId))
                    .done(function(result)
                    {
                        $.executeFunction(onSuccess, result);
                    });
            }
        });
    },
    this.getShipTo = function(onSuccess)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when(webOps.database.tables.addresses.selectShipTo(userId))
                    .done(function(result)
                    {
                        $.executeFunction(onSuccess, result);
                    });
            }
        });
    },
    this.saveNewEntry = function(caseId, catalog, lotCode, inventoryLoc, shipToLoc, notes, onSuccess, onError)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when
                (
                    webOps.database.tables.caseDetailFull.select(userId, caseId),
                    webOps.database.tables.usage.select(userId, caseId, catalog, lotCode),
                    webOps.database.tables.warehouses.selectByAddresses(userId, inventoryLoc, shipToLoc)
                )
                .done(function(caseDetailFullData, usageData, warehouseData)
                {
                    var externalItem = 1;
                    var quantity = Number(usageData.quantity || 0) + 1;
                    var warehouseId = warehouseData.id;

                    externalItem =
                    (
                        $.grep(caseDetailFullData.assignedInventoryItems || [], function(o)
                        {
                            return (o.catNum == catalog && o.lotCode == lotCode);
                        }
                    ).length > 0) ? 0 : 1;

                    $.when(webOps.database.tables.usage.save(userId, caseId, catalog, lotCode, quantity, inventoryLoc, shipToLoc, null, null, null, notes, null, externalItem, warehouseId))
                        .done(function()
                        {
                            $.executeFunction(onSuccess);
                        })
                        .fail(function()
                        {
                            $.executeFunction(onError);
                        });
                })
                .fail(function()
                {
                    $.executeFunction(onError);
                });
            }
        });
    },
    this.getEntries = function(caseId, onSuccess)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when(webOps.database.tables.usage.selectGroup(userId, caseId))
                    .done(function(result)
                    {
                        $.executeFunction(onSuccess, result);
                    });
            }
        });
    },
    this.updateEntryIn = function(caseId, catalog, lotCode, newCatalog, newLotCode, quantity, inventoryLoc, shipToLoc, notes, onSuccess, onError)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when
                (
                    webOps.database.tables.caseDetailFull.select(userId, caseId),
                    webOps.database.tables.warehouses.selectByAddresses(userId, inventoryLoc, shipToLoc)
                )
                .done(function(caseDetailFullData, warehouseData)
                {
                    var externalItem = 1;
                    var warehouseId = warehouseData.id;

                    externalItem =
                    (
                        $.grep(caseDetailFullData.assignedInventoryItems || [], function(o)
                        {
                            return (o.catNum == catalog && o.lotCode == lotCode);
                        }
                    ).length > 0) ? 0 : 1;

                    $.when(webOps.database.tables.usage.save(userId, caseId, newCatalog, newLotCode, parseInt(quantity), inventoryLoc, shipToLoc, null, null, null, notes, null, externalItem, warehouseId))
                    .done(function()
                    {
                        $.executeFunction(onSuccess);
                    })
                    .fail(function()
                    {
                        $.executeFunction(onError);
                    });
                })
                .fail(function()
                {
                    $.executeFunction(onError);
                });
            }
        });
    },
    this.removeByCaseId = function(caseId, onSuccess, onError)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when(webOps.database.tables.usage.removeByCaseId(userId, caseId))
                    .done(function()
                    {
                        $.executeFunction(onSuccess);
                    })
                    .fail(function()
                    {
                        $.executeFunction(onError);
                    });
            }
        });
    },
    this.removeByEntry = function(caseId, catalog, lotCode, onSuccess, onError)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when(webOps.database.tables.usage.removeByEntry(userId, caseId, catalog, lotCode))
                    .done(function()
                    {
                        $.executeFunction(onSuccess);
                    })
                    .fail(function()
                    {
                        $.executeFunction(onError);
                    });
            }
        });
    },
    this.syncToServer = function(caseId, onSuccess)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var currentSessionObj = webOps.database.tables.currentSession.select();
                var customer = currentSessionObj.customer;
                var userId = currentSessionObj.userId;
                var sessionId = currentSessionObj.sessionId;

                $.when(webOps.database.tables.caseDetailFull.select(userId, caseId))
                    .done(function(obj)
                    {
                        $.when(webOps.synchronize.toServer.usage(customer, userId, sessionId, caseId, obj.usageTimestamp))
                           .done(function(message)
                           {
                               $.executeFunction(onSuccess, message);
                           })
                           .fail(function()
                           {
                               $.executeFunction(onSuccess);
                           });
                    })
                    .fail(function()
                    {
                        $.executeFunction(onSuccess);
                    });
            }
        });
    }
}

function pricing()
{
    this.getPriceException = function(onSuccess)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when(webOps.database.tables.priceExceptionCodes.select(userId))
                    .done(function(result)
                    {
                        $.executeFunction(onSuccess, result);
                    });
            }
        });
    },
    this.getEntriesCommitted = function(caseId, onSuccess)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when(webOps.database.tables.usage.selectGroupCommitted(userId, caseId))
                    .done(function(result)
                    {
                        $.executeFunction(onSuccess, result);
                    });
            }
        });
    },
    this.updateEntryIn = function(caseId, catalog, lotCode, newCatalog, newLotCode, quantity, inventoryLoc, shipToLoc, unitListPrice, unitActualPrice, total, notes, priceException, onSuccess, onError)
    {
        return $.tryCatch(
        {
            init: function()
            {
                var userId = webOps.database.tables.currentSession.select().userId;
                $.when
                (
                    webOps.database.tables.caseDetailFull.select(userId, caseId),
                    webOps.database.tables.warehouses.selectByAddresses(userId, inventoryLoc, shipToLoc)
                )
                .done(function(caseDetailFullData, warehouseData)
                {
                    var externalItem = 1;
                    var warehouseId = warehouseData.id;

                    externalItem =
                    (
                        $.grep(caseDetailFullData.assignedInventoryItems || [], function(o)
                        {
                            return (o.catNum == catalog && o.lotCode == lotCode);
                        }
                    ).length > 0) ? 0 : 1;

                    $.when(webOps.database.tables.usage.savePricing(userId, caseId, newCatalog, newLotCode, parseInt(quantity), inventoryLoc, shipToLoc, unitListPrice, unitActualPrice, total, notes, priceException, externalItem, warehouseId))
                    .done(function()
                    {
                        $.executeFunction(onSuccess);
                    })
                    .fail(function()
                    {
                        $.executeFunction(onError);
                    });
                })
                .fail(function()
                {
                    $.executeFunction(onError);
                });
            }
        });
    }
}

function manualSync(onSuccess, onError)
{
    return $.tryCatch(
    {
        init: function()
        {
            var currentSessionObj = webOps.database.tables.currentSession.select();
            var customer = currentSessionObj.customer;
            var userId = currentSessionObj.userId;
            var sessionId = currentSessionObj.sessionId;

            $.when
            (
                webOps.synchronize.toServer.casesDetail(customer, userId, sessionId)
            )
            .done(function()
            {
                loadingCaseFromTheServer('manualsync', '', '', onSuccess, onError);
            })
            .fail(function()
            {
                $.executeFunction(onError);
            });
        }
    });
}