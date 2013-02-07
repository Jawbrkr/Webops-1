// =================================================================
// 	WebOps Data Base [Webkit SQL Storage & Local Storage]
// 	----------------------------------------------------------------
// 
// 	Autor: Oscar Cubillos <tegers77@gmail.com>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       os <tegers77@gmail.com>
// 	Version 1.0
// 	Create: 2012-09-02
// 	Last Modified: 2013-02-04
//
// 	----------------------------------------------------------------
// 	References
// 	----------------------------------------------------------------
/// <reference path="webops.tools.js" />
//
// =================================================================
//
webOps.database =
{
    version: '1.125',
    sqlDatabase: null,
    versionSchema:
    {
        get: function()
        {
            return window.localStorage.getItem('versionSchema');
        },
        set: function(version)
        {
            window.localStorage.setItem('versionSchema', version);
        }
    },
    create: function()
    {
        if (!window.openDatabase)
            return;

        try
        {

            webOps.database.sqlDatabase = window.openDatabase('WebOps', '1.0', 'WebOps DB', 4 * 1024 * 1024);
            if (webOps.database.versionSchema.get() != webOps.database.version)
            {
                webOps.database.versionSchema.set(webOps.database.version);
                webOps.database.sqlDatabase.transaction(function(tx)
                {
                    //tx.executeSql('select "drop table " || name || ";" from sqlite_master where type = "table"');

                    $.log('CREATE TABLE customers');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS customers(customer TEXT NOT NULL PRIMARY KEY)');

                    $.log('CREATE TABLE login');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS login(userId INTEGER NOT NULL PRIMARY KEY, sessionId TEXT NOT NULL, parameters TEXT NOT NULL, build INTEGER, firstName TEXT, lastName TEXT, fullName TEXT, required TEXT, roles TEXT, salesRepIds TEXT)');

                    $.log('CREATE TABLE historyLogin');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS historyLogin(userId INTEGER NOT NULL, sessionId TEXT NOT NULL, date TEXT)');

                    //$.log('CREATE TABLE setUp');
                    //tx.executeSql('CREATE TABLE setUp(userId INTEGER NOT NULL PRIMARY KEY, caseDownloadsMine BOOLEAN NOT NULL, caseDownloadsAll BOOLEAN NOT NULL, appModeOnLine BOOLEAN NOT NULL, appModeOffLine BOOLEAN NOT NULL)');

                    $.log('CREATE TABLE procedures');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS procedures(userId INTEGER NOT NULL, active INTEGER NOT NULL, id TEXT, name TEXT, productSystemCategoryIDs TEXT)');

                    $.log('CREATE TABLE salesReps');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS salesReps(userId INTEGER NOT NULL, salesRepID INTEGER NOT NULL, salesRepName TEXT NOT NULL, warehouseId INT NOT NULL, hospitalIds TEXT, physicianIds TEXT)');

                    $.log('CREATE TABLE physicians');
                    //tx.executeSql('CREATE TABLE IF NOT EXISTS physicians(userId INTEGER NOT NULL, fullName TEXT NOT NULL, id INTEGER NOT NULL, physicianPrefs TEXT, PRIMARY KEY(userId, id))');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS physicians(userId INTEGER NOT NULL, fullName TEXT NOT NULL, id INTEGER NOT NULL, physicianPrefs TEXT)');

                    $.log('CREATE TABLE hospitals');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS hospitals(userId INTEGER NOT NULL, id INTEGER NOT NULL, name TEXT NOT NULL, warehouseId INTEGER)');

                    $.log('CREATE TABLE addresses');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS addresses(userId INTEGER NOT NULL, id INTEGER NOT NULL, name TEXT NOT NULL, replName TEXT, replTo INTEGER, shipName TEXT, shipTo INTEGER)');

                    $.log('CREATE TABLE productSystems');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS productSystems(userId INTEGER NOT NULL, description TEXT, id INTEGER NOT NULL, name TEXT NOT NULL)');

                    $.log('CREATE TABLE prodSystemCats');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS prodSystemCats(userId INTEGER NOT NULL, id INTEGER NOT NULL, name TEXT NOT NULL, productSystemIDs TEXT)');

                    $.log('CREATE TABLE warehouses');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS warehouses(userId INTEGER NOT NULL, id INTEGER NOT NULL, replAddresses INTEGER, shipAddresses INTEGER)');

                    $.log('CREATE TABLE caseStatusCodes');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS caseStatusCodes(userId INTEGER NOT NULL, id INTEGER NOT NULL, name TEXT NOT NULL)');

                    $.log('CREATE TABLE kitStatusCodes');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS kitStatusCodes(userId INTEGER NOT NULL, id INTEGER NOT NULL, name TEXT NOT NULL)');

                    $.log('CREATE TABLE priceExceptionCodes');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS priceExceptionCodes(userId INTEGER NOT NULL, id INTEGER NOT NULL, name TEXT NOT NULL)');

                    $.log('CREATE TABLE caseViewSort');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS caseViewSort(userId INTEGER NOT NULL PRIMARY KEY, sortBy TEXT, viewBy TEXT)');

                    $.log('CREATE TABLE caseHeaders');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS caseHeaders(userId INTEGER NOT NULL, modifiedDate TEXT NOT NULL, \
                                    activityDesc TEXT, activityLevel INTEGER, complications TEXT, consequences INTEGER, consequencesDesc TEXT, contactName TEXT, \
                                    decontamination TEXT, eventDesc TEXT, eventLocation TEXT, heightUnits INTEGER, implantRevision TEXT, notReturned TEXT, \
                                    patientHeight INTEGER, patientWeight INTEGER, products TEXT, returned INTEGER, surgicalApproach INTEGER, weightUnits INTEGER, \
                                    caseStatusID INTEGER, dob INTEGER, errorCode INTEGER, freight FLOAT, hospitalID INTEGER, id INTEGER NOT NULL, notes TEXT, patient TEXT, \
                                    physicianID INTEGER, procDateTime TEXT, procTypeID INTEGER, salesRepID INTEGER, sex TEXT, survey INTEGER, usageStatus INTEGER, usageTimestamp TEXT, \
                                    timestamp NUMERIC, updateDetail BOOLEAN, PRIMARY KEY(userId, id) )');

                    $.log('CREATE TABLE caseDetailFull');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS caseDetailFull(userId INTEGER NOT NULL, \
                                    activityDesc TEXT, activityLevel INTEGER, complications TEXT, consequences INTEGER, consequencesDesc TEXT, contactName TEXT, \
                                    decontamination TEXT, eventDesc TEXT, eventLocation TEXT, heightUnits INTEGER, implantRevision TEXT, notReturned TEXT, \
                                    patientHeight INTEGER, patientWeight INTEGER, products TEXT, returned INTEGER, surgicalApproach INTEGER, weightUnits INTEGER, \
                                    ageOfPatient INTEGER, assignedInventoryItems TEXT, assignedKits TEXT, assignedProdSystems TEXT, caseStatusID INTEGER, \
                                    dob INTEGER, errorCode INTEGER, externalItems TEXT, freight FLOAT, hasCapPrice FLOAT, hospitalID INTEGER, id INTEGER NOT NULL, \
                                    notes TEXT, patient TEXT, physicianID INTEGER, po TEXT, procDateTime TEXT, procTypeID INTEGER, salesRepID INTEGER, sex TEXT, \
                                    survey INTEGER, totalPrice FLOAT, usageStatus INTEGER, usageTimestamp TEXT, usedItems TEXT, \
                                    timestamp NUMERIC, PRIMARY KEY(userId, id) )');

                    $.log('CREATE TABLE assignedKits');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS assignedKits(userId INTEGER NOT NULL, caseId INTEGER NOT NULL, id INTEGER NOT NULL, locationId INTEGER, name TEXT NOT NULL, statusId INTEGER, PRIMARY KEY(userId, caseId, id))');

                    $.log('CREATE TABLE casePhotoList');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS casePhotoList(userId INTEGER NOT NULL, caseId INTEGER NOT NULL, category INTEGER NOT NULL, comments TEXT, data TEXT NOT NULL, imageSize INTEGER NOT NULL, parts TEXT,  photoID INTEGER NOT NULL, side TEXT, view TEXT, PRIMARY KEY(userId, caseId, photoID))');

                    $.log('CREATE TABLE casePhotoData');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS casePhotoData(userId INTEGER NOT NULL, photoID INTEGER NOT NULL, photoData TEXT, PRIMARY KEY(userId, photoID))');

                    $.log('CREATE TABLE kitItems');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS kitItems(userId INTEGER NOT NULL, catNum TEXT, desc TEXT, id INTEGER NOT NULL, kitId INTEGER NOT NULL, listPrice FLOAT, lotCode TEXT, statusCode INTEGER, PRIMARY KEY(userId, id, kitId))');
                                    
                    $.log('CREATE TABLE inventoryCount');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS inventoryCount(userId INTEGER NOT NULL, hospitalID INTEGER NOT NULL, catalog TEXT, lotCode TEXT, committedToServer BOOLEAN, date TEXT)');

                    $.log('CREATE TABLE usage');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS usage(userId INTEGER NOT NULL, caseId INTEGER NOT NULL, catalog TEXT, lotCode TEXT, quantity INTEGER, inventoryLoc TEXT, shipTo TEXT, notes TEXT, unitListPrice FLOAT, unitActualPrice FLOAT, total FLOAT, priceException INT, externalItem BOOLEAN, warehouseId INTEGER, committedToServer BOOLEAN, date TEXT, PRIMARY KEY(userId, caseId, catalog, lotCode))');

                }, function(er) { $.alert(er.message); });
            }
        } 
        catch (e)
        {
            $.alert("Unknown error " + e.message + ".");
        }
    },
    commands:
    {
        executeNonQuery: function(sql, params, onSuccess, onError)
        {
            webOps.database.sqlDatabase.transaction(function(tx)
            {
                tx.executeSql(sql, params, onSuccess, function(tx, ex)
                {
                    webOps.database.handlers.onErrorHandler(tx, ex);
                    if (onError) $.executeFunction(onError, tx, ex);
                });
            });
        },
        executeReader: function(sql, params, onSuccess, onError)
        {
            webOps.database.sqlDatabase.readTransaction(function(tx)
            {
                tx.executeSql(sql, params, onSuccess, function(tx, ex)
                {
                    webOps.database.handlers.onErrorHandler(tx, ex);
                    if (onError) $.executeFunction(onError, tx, ex);
                });
            });
        },
        executeNonQueryMultiple: function(sql, data, params, properties, customParams, onSuccess, onError)
        {
            webOps.database.sqlDatabase.transaction(function(tx)
            {
                var args = [];
                for (var l = 0; l < properties.length; l++)
                {
                    args.push(String.format('item["{0}"]', properties[l]));
                }

                var strParams = String.format('[{0}]', args.join(','));
                for (var i = 0, item = null; i < data.length; i++)
                {
                    item = data[i];
                    var sqlParams = eval(strParams);
                    sqlParams = (params || []).concat(sqlParams);

                    var _customParams = [];
                    for (var n = 0; n < (customParams || []).length; n++)
                        _customParams.push(eval(customParams[n]));

                    sqlParams = sqlParams.concat(_customParams);

                    tx.executeSql(sql, sqlParams, function() { }, function(tx, ex)
                    {
                        webOps.database.handlers.onErrorHandler(tx, ex);
                        if (onError) $.executeFunction(onError, tx, ex);
                    });
                }
            },
            function(tx, ex)
            {
                webOps.database.handlers.onErrorHandler(tx, ex);
                if (onError) $.executeFunction(onError, tx, ex);

            },
            function()
            {
                $.executeFunction(onSuccess);
            });
        },
        clearLocalStorage: function()
        {
            Object.keys(localStorage).forEach(function(key)
            {
                localStorage.removeItem(key);
            });
        },
        clearDatabase: function(userId, deleteCurrentSession)
        {
            return $.Deferred(function(deferred)
            {
                var sql = 'SELECT name, "DELETE FROM " || name || " " AS SQL FROM sqlite_master WHERE type = "table" AND name NOT IN ("__WebKitDatabaseInfoTable__")';
                //var sql = 'SELECT name, "DELETE FROM " || name || " " AS SQL FROM sqlite_master WHERE type = "table" AND name NOT IN ("__WebKitDatabaseInfoTable__", "login")';
                webOps.database.commands.executeReader(sql, [],
                    function(tx, data)
                    {
                        $.log('clearDatabase read successful');

                        var deferreds = [];
                        for (var i = 0; i < data.rows.length; i++)
                        {
                            deferreds.push
                            (
                                $.Deferred(function(def)
                                {
                                    var _sql = data.rows.item(i).SQL;
                                    var _table = data.rows.item(i).name;
                                    
                                    var userTable = $.inArray(_table, ['customers']) == -1;
                                    var params = []

                                    /*if (userTable)
                                    {
                                        _sql += 'WHERE userId = ?';
                                        params.push(userId);
                                    }*/

                                    if (deleteCurrentSession == false && _table == 'login')
                                    {
                                        _sql += 'WHERE userId != ?';
                                        params.push(userId);
                                    }
                                
                                    webOps.database.commands.executeNonQuery(_sql, params,
                                        function(tx, data)
                                        {
                                            $.log(String.format('clearDatabase delete all data for table {0} successful.', _table));
                                            def.resolve();
                                        },
                                        function()
                                        {
                                            $.log(String.format('clearDatabase delete all data for table {0} failed.', _table));
                                            def.reject();
                                        }
                                    );
                                }).promise()
                            );
                        }

                        $.when.apply($, deferreds)
                        .done(function()
                        {
                            $.log('clearDatabase delete all data successful');
                            deferred.resolve();
                        })
                        .fail(function()
                        {
                            $.log('clearDatabase delete all data failed');
                            deferred.reject();
                        });
                    },
                    function()
                    {
                        $.log('clearDatabase read failed');
                        deferred.reject();
                    }
                );
            }).promise();
        }
    },
    handlers:
    {
        onErrorHandler: function onError(tx, ex, onErrorCallback)
        {
            $.log('DbError: ' + ex.message + ' (Code: ' + ex.code + ')');
            $.executeFunction(onErrorCallback, tx, ex);
        }
    },
    tables: {}
}

//
webOps.database.tables.currentSession =
{
    save: function(customer, userId, sessionId)
    {
        var data =
        {
            customer: customer,
            userId: userId,
            sessionId: sessionId
        };

        window.localStorage.setItem('currentSession', Object.toJSON(data));
    },
    select: function()
    {
        var data = window.localStorage.getItem('currentSession');
        return (data) ? String.parseJSON(data) : {};
    },
    remove: function()
    {
        window.localStorage.setItem('currentSession', null);
    }
};

webOps.database.tables.customers =
{
    save: function(customer)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'INSERT OR REPLACE INTO customers (customer) VALUES (?)';
            var params = [customer];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('customers save successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('customers save error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    select: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT customer FROM customers LIMIT 1';
            var params = [];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('customers read successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    selected: function(customer)
    {
        window.localStorage.setItem('customerSelect', customer);
    },
    getSelected: function()
    {
        return window.localStorage.getItem('customerSelect');
    }
};

// Almacena la informacion de inición de sesion del usuario.
webOps.database.tables.login =
{
    parametersDefinition:
    {
        CUSTOMER: 0,
        USERNAME: 1,
        PASSWORD: 2,
        PLATFORM: 3,
        INDEPENDENT: 4
    },
    save: function(userId, sessionId, parameters, build, firstName, lastName, fullName, required, roles, salesRepIds)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'INSERT OR REPLACE INTO login (userId, sessionId, parameters, build, firstName, lastName, fullName, required, roles, salesRepIds) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            var params = [userId, sessionId, parameters, build, firstName, lastName, fullName, required, roles, salesRepIds];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('login save successful.');
                    $.when(webOps.database.tables.historyLogin.save(userId, sessionId))
                        .done(function()
                        {
                            deferred.resolve();
                        })
                        .fail(function()
                        {
                            deferred.reject();
                        });
                },
                function()
                {
                    $.log('login save error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    select: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, sessionId, parameters, build, firstName, lastName, fullName, required, roles, salesRepIds FROM login WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('login read successful');
                    deferred.resolve((data && data.rows) ? data.rows.item(0) : {});
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    validateOffLineMode: function(parameters)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, sessionId, parameters, build, firstName, lastName, fullName, required, roles, salesRepIds FROM login WHERE parameters = ?';
            var params = [parameters];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('validate offline mode successful');
                    deferred.resolve((data && data.rows && data.rows.length > 0) ? data.rows.item(0) : {});
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    }
};

// Mantiene un historico de los inicios de sesion realizados por los diferentes usuarios.
webOps.database.tables.historyLogin =
{
    save: function(userId, sessionId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'INSERT INTO historyLogin (userId, sessionId, date) VALUES (?, ?, ?)';
            var params = [userId, sessionId, new Date()];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('historyLogin save successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('historyLogin save error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    select: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, sessionId, date FROM historyLogin WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('historyLogin read successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    isFirstLogin: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId FROM historyLogin WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('login first reader successful');
                    deferred.resolve(data.rows.length <= 1);
                },
                function()
                {
                    $.log('login first reader failed');
                    deferred.reject();
                }
            );
        }).promise();
    }
};

// Guarda la configuracion realizada por usuario.
webOps.database.tables.setUp =
{
    save: function(caseDownloadsMine, caseDownloadsAll, appModeOnLine, appModeOffLine)
    {
        var data =
        {
            caseDownloadsMine: caseDownloadsMine,
            caseDownloadsAll: caseDownloadsAll,
            appModeOnLine: appModeOnLine,
            appModeOffLine: appModeOffLine
        };

        window.localStorage.setItem('setUp', Object.toJSON(data));
    },
    select: function()
    {
        var data = window.localStorage.getItem('setUp');
        return (data) ? String.parseJSON(data) : {};
    },
    isEmpty: function()
    {
        return window.localStorage.getItem('setUp') == null;
    }
};

webOps.database.tables.caseHeaders =
{
    insert: function(userId, modifiedDate, activityDesc, activityLevel, complications, consequences, consequencesDesc, contactName, decontamination, eventDesc, eventLocation, heightUnits, implantRevision, notReturned, patientHeight, patientWeight, products, returned, surgicalApproach, weightUnits, caseStatusID, dob, errorCode, freight, hospitalID, id, notes, patient, physicianID, procDateTime, procTypeID, salesRepID, sex, survey, usageStatus, usageTimestamp)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'INSERT INTO caseHeaders (userId, modifiedDate, activityDesc, activityLevel, complications, consequences, consequencesDesc, contactName, decontamination, eventDesc, eventLocation, heightUnits, implantRevision, notReturned, patientHeight, patientWeight, products, returned, surgicalApproach, weightUnits, caseStatusID, dob, errorCode, freight, hospitalID, id, notes, patient, physicianID, procDateTime, procTypeID, salesRepID, sex, survey, usageStatus, usageTimestamp, timestamp, modifiedDate, updateDetail) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            var params = [userId, modifiedDate, activityDesc, activityLevel, complications, consequences, consequencesDesc, contactName, decontamination, eventDesc, eventLocation, heightUnits, implantRevision, notReturned, patientHeight, patientWeight, products, returned, surgicalApproach, weightUnits, caseStatusID, dob, errorCode, freight, hospitalID, id, notes, patient, physicianID, procDateTime, procTypeID, salesRepID, sex, survey, usageStatus, usageTimestamp, moment(procDateTime, "YYYY||MM||DD||HH||mm")._d.getTime(), moment(new Date()).format("YYYY||MM||DD||HH||mm"), 0];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('caseHeaders insert successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('caseHeaders insert error.');
                    deferred.reject();
                }
            );

        }).promise();
    },
    saveMultiple: function(userId, data)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'INSERT OR REPLACE INTO caseHeaders (userId, activityDesc, activityLevel, complications, consequences, consequencesDesc, contactName, decontamination, eventDesc, eventLocation, heightUnits, implantRevision, notReturned, patientHeight, patientWeight, products, returned, surgicalApproach, weightUnits, caseStatusID, dob, errorCode, freight, hospitalID, id, notes, patient, physicianID, procDateTime, procTypeID, salesRepID, sex, survey, usageStatus, usageTimestamp, timestamp, modifiedDate, updateDetail) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            var params = [userId];
            var properties = ['activityDesc', 'activityLevel', 'complications', 'consequences', 'consequencesDesc', 'contactName', 'decontamination', 'eventDesc', 'eventLocation', 'heightUnits', 'implantRevision', 'notReturned', 'patientHeight', 'patientWeight', 'products', 'returned', 'surgicalApproach', 'weightUnits', 'caseStatusID', 'dob', 'errorCode', 'freight', 'hospitalID', 'id', 'notes', 'patient', 'physicianID', 'procDateTime', 'procTypeID', 'salesRepID', 'sex', 'survey', 'usageStatus', 'usageTimestamp'];
            var customParams = ['((item["procDateTime"]) ? moment(item["procDateTime"], "YYYY||MM||DD||HH||mm")._d.getTime() : 0);', 'moment(new Date()).format("YYYY||MM||DD||HH||mm")', '1'];

            webOps.database.commands.executeNonQueryMultiple(sql, data, params, properties, customParams,
                function()
                {
                    $.log('caseHeaders save multiple successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('caseHeaders save multiple error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    update: function(userId, id, modifiedDate, caseStatusID, salesRepID, procDateTime, hospitalID, physicianID, procTypeID, patient, dob, sex, notes, freight)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'UPDATE caseHeaders SET modifiedDate = ?, caseStatusID = ?, salesRepID = ?, procDateTime = ?, hospitalID = ?, physicianID = ?, procTypeID = ?, patient = ?, dob = ?, sex = ?, notes = ?, freight = ? WHERE userId = ? AND id = ?';
            var params = [modifiedDate, caseStatusID, salesRepID, procDateTime, hospitalID, physicianID, procTypeID, patient, dob, sex, notes, freight].concat([userId, id]);

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('caseHeaders update successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('caseHeaders update error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    updateID: function(userId, id, newID)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'UPDATE caseHeaders SET id = ? WHERE userId = ? AND id = ?';
            var params = [newID].concat([userId, id]);

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('caseHeaders update id successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('caseHeaders update id error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    select: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, modifiedDate, activityDesc, activityLevel, complications, consequences, consequencesDesc, contactName, decontamination, eventDesc, eventLocation, heightUnits, implantRevision, notReturned, patientHeight, patientWeight, products, returned, surgicalApproach, weightUnits, caseStatusID, dob, errorCode, freight, hospitalID, id, notes, patient, physicianID, procDateTime, procTypeID, salesRepID, sex, survey, usageStatus, usageTimestamp, timestamp FROM caseHeaders WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('caseHeaders reader successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    $.log('caseHeaders reader failed');
                    deferred.reject();
                }
            );
        }).promise();
    },
    selectMinID: function()
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT CASE WHEN MIN(id) > 0 THEN -1 ELSE MIN(id) - 1 END caseId FROM caseHeaders';
            var params = [];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('caseHeaders reader min ID successful');
                    deferred.resolve(data.rows.item(0));
                },
                function()
                {
                    $.log('caseHeaders reader min ID failed');
                    deferred.reject();
                }
            );
        }).promise();
    },
    selectOnlyId: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT id FROM caseHeaders WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('caseHeaders only id reader successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i).id);
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    $.log('caseHeaders only id reader failed');
                    deferred.reject();
                }
            );
        }).promise();
    },
    selectForUpdateDetail: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT id FROM caseHeaders WHERE userId = ? AND updateDetail = 1';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('caseHeaders reader for updateDetail successful.');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i).id);
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    $.log('caseHeaders reader for updateDetail failed.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    selectOrderBy: function(userId, sortBy)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, modifiedDate, activityDesc, activityLevel, complications, consequences, consequencesDesc, contactName, decontamination, eventDesc, eventLocation, heightUnits, implantRevision, notReturned, patientHeight, patientWeight, products, returned, surgicalApproach, weightUnits, caseStatusID, dob, errorCode, freight, hospitalID, id, notes, patient, physicianID, procDateTime, procTypeID, salesRepID, sex, survey, usageStatus, usageTimestamp, timestamp FROM caseHeaders WHERE userId = ? ORDER BY ' + ((sortBy) ? sortBy : 'procTypeID');
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('caseHeaders reader successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    $.log('caseHeaders reader failed');
                    deferred.reject();
                }
            );
        }).promise();
    },
    selectFilter: function(userId, sortBy, viewBy, filter, startDate, endDate)
    {
        if (startDate == null) startDate = moment('1990||01||01||00|00', 'YYYY||MM||DD||HH||mm');
        if (endDate == null) endDate = moment('2099||12||31||23|59', 'YYYY||MM||DD||HH||mm');

        var t1 = startDate._d.getTime();
        var t2 = endDate._d.getTime();

        return $.Deferred(function(deferred)
        {
            //var sql = 'SELECT userId, modifiedDate, activityDesc, activityLevel, complications, consequences, consequencesDesc, contactName, decontamination, eventDesc, eventLocation, heightUnits, implantRevision, notReturned, patientHeight, patientWeight, products, returned, surgicalApproach, weightUnits, caseStatusID, dob, errorCode, freight, hospitalID, id, notes, patient, physicianID, procDateTime, procTypeID, salesRepID, sex, survey, usageStatus, usageTimestamp, timestamp FROM caseHeaders WHERE userId = ? AND (id LIKE \'%' + filter + '%\' OR hospitalID LIKE \'%' + filter + '%\' OR physicianID LIKE \'%' + filter + '%\' OR procTypeID LIKE \'%' + filter + '%\' OR patient LIKE \'%' + filter + '%\') ORDER BY ' + ((sortBy) ? sortBy : 'timestamp');
            
            

            // new (Jesse: Feb 6, 2013 -- added PO from caseDetailFull LEFT JOIN)
            var sql = 'SELECT C.userId, C.modifiedDate, C.activityDesc, C.activityLevel, C.complications, C.consequences, C.consequencesDesc, C.contactName, C.decontamination, C.eventDesc, C.eventLocation, C.heightUnits, C.implantRevision, C.notReturned, C.patientHeight, C.patientWeight, C.products, C.returned, C.surgicalApproach, C.weightUnits, C.caseStatusID, C.dob, C.errorCode, C.freight, C.hospitalID, C.id, C.notes, C.patient, C.physicianID, C.procDateTime, C.procTypeID, C.salesRepID, C.sex, C.survey, C.usageStatus, C.usageTimestamp, C.timestamp, CDF.po ' +
                      ' FROM caseHeaders as C ' +
                      'INNER JOIN hospitals AS H ON C.userId = H.userId AND C.hospitalID = H.id ' +
                      'INNER JOIN physicians AS P ON C.userId = P.userId AND C.physicianID = P.id ' +
                      'LEFT JOIN procedures AS PR ON C.userId = PR.userId AND C.procTypeID = PR.id ' +
                      'LEFT JOIN caseDetailFull AS CDF ON C.id = CDF.id ' +
                      'WHERE C.userId = ? AND (C.id LIKE \'%' + filter + '%\' OR H.name LIKE \'%' + filter + '%\' OR P.fullName LIKE \'%' + filter + '%\' OR PR.name LIKE \'%' + filter + '%\' OR C.patient LIKE \'%' + filter + '%\') ' +
                      'AND (C.timestamp >= ' + t1 + ' AND C.timestamp <= ' + t2 + ') ' +
                      'ORDER BY ' + ((sortBy) ? String(sortBy).replace('_', '.') : 'C.procTypeID');
                      
                      
            /*
            // new (Alex)
            var sql = 'SELECT C.userId, C.modifiedDate, C.activityDesc, C.activityLevel, C.complications, C.consequences, C.consequencesDesc, C.contactName, C.decontamination, C.eventDesc, C.eventLocation, C.heightUnits, C.implantRevision, C.notReturned, C.patientHeight, C.patientWeight, C.products, C.returned, C.surgicalApproach, C.weightUnits, C.caseStatusID, C.dob, C.errorCode, C.freight, C.hospitalID, C.id, C.notes, C.patient, C.physicianID, C.procDateTime, C.procTypeID, C.salesRepID, C.sex, C.survey, C.usageStatus, C.usageTimestamp, C.timestamp ' +
                      ' FROM caseHeaders as C ' +
                      'INNER JOIN hospitals AS H ON C.userId = H.userId AND C.hospitalID = H.id ' +
                      'INNER JOIN physicians AS P ON C.userId = P.userId AND C.physicianID = P.id ' +
                      'LEFT JOIN procedures AS PR ON C.userId = PR.userId AND C.procTypeID = PR.id ' +
                      'WHERE C.userId = ? AND (C.id LIKE \'%' + filter + '%\' OR H.name LIKE \'%' + filter + '%\' OR P.fullName LIKE \'%' + filter + '%\' OR PR.name LIKE \'%' + filter + '%\' OR C.patient LIKE \'%' + filter + '%\') ' +
                      'AND (timestamp >= ' + t1 + ' AND timestamp <= ' + t2 + ') ' +
                      'ORDER BY ' + ((sortBy) ? String(sortBy).replace('_', '.') : 'C.procTypeID');
            */

            /*
            var sql = 'SELECT C.userId, C.modifiedDate, C.activityDesc, C.activityLevel, C.complications, C.consequences, C.consequencesDesc, C.contactName, C.decontamination, C.eventDesc, C.eventLocation, C.heightUnits, C.implantRevision, C.notReturned, C.patientHeight, C.patientWeight, C.products, C.returned, C.surgicalApproach, C.weightUnits, C.caseStatusID, C.dob, C.errorCode, C.freight, C.hospitalID, C.id, C.notes, C.patient, C.physicianID, C.procDateTime, C.procTypeID, C.salesRepID, C.sex, C.survey, C.usageStatus, C.usageTimestamp, C.timestamp ' +
                      ' FROM caseHeaders as C ' +
                      'INNER JOIN hospitals AS H ON C.userId = H.userId AND C.hospitalID = H.id ' +
                      'INNER JOIN physicians AS P ON C.userId = P.userId AND C.physicianID = P.id ' +
                      'INNER JOIN productSystems AS S ON C.userId = S.userId AND C.procTypeID = S.id ' +
                      'WHERE C.userId = ? AND (C.id LIKE \'%' + filter + '%\' OR H.name LIKE \'%' + filter + '%\' OR P.fullName LIKE \'%' + filter + '%\' OR S.name LIKE \'%' + filter + '%\' OR C.patient LIKE \'%' + filter + '%\') ' +
                      'ORDER BY C.' + ((sortBy) ? sortBy : 'timestamp');
            */     
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('caseHeaders reader filter successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        if (viewBy && viewBy != 'all' && viewBy == data.rows.item(i).salesRepID)
                        {
                            items.push(data.rows.item(i));
                        }
                        else if (!viewBy || viewBy == 'all')
                        {
                            items.push(data.rows.item(i));
                        }
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    $.log('caseHeaders reader filter failed');
                    deferred.reject();
                }
            );
        }).promise();
    },
    selectModifiedDate: function(userId, id)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT modifiedDate FROM caseHeaders WHERE userId = ? AND id = ?';
            var params = [userId, id];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('caseHeaders reader modifiedDate successful');
                    deferred.resolve((data && data.rows && data.rows.length > 0) ? data.rows.item(0) : {});
                },
                function()
                {
                    $.log('caseHeaders reader modifiedDate failed');
                    deferred.reject();
                }
            );
        }).promise();
    },
    count: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT COUNT(*) count FROM caseHeaders WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('caseHeaders count reader successful');
                    deferred.resolve(data.rows.item(0));
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    changeUpdateDetail: function(userId, id, updateDetail)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'UPDATE caseHeaders SET updateDetail = ? WHERE userId = ? AND id = ?';
            var params = [updateDetail, userId, id];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('caseHeaders change updateDetail successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('caseHeaders change updateDetail failed.');
                    deferred.reject();
                }
            );
        }).promise();
    },
};

webOps.database.tables.caseViewSort =
{
    save: function(userId, sortBy, viewBy)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'INSERT OR REPLACE INTO caseViewSort (userId, sortBy, viewBy) VALUES (?, ?, ?)';
            var params = [userId, sortBy, viewBy];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('caseViewSort save successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('caseViewSort save error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    select: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, sortBy, viewBy FROM caseViewSort WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('caseViewSort reader successful');
                    deferred.resolve((data.rows.length > 0) ? data.rows.item(0) : null);
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    }
};

webOps.database.tables.caseDetailFull =
{
    save: function(userId, activityDesc, activityLevel, complications, consequences, consequencesDesc, contactName, decontamination, eventDesc, eventLocation, heightUnits, implantRevision, notReturned, patientHeight, patientWeight, products, returned, surgicalApproach, weightUnits, ageOfPatient, assignedInventoryItems, assignedKits, assignedProdSystems, caseStatusID, dob, errorCode, externalItems, freight, hasCapPrice, hospitalID, id, notes, patient, physicianID, po, procDateTime, procTypeID, salesRepID, sex, survey, totalPrice, usageStatus, usageTimestamp, usedItems)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'INSERT OR REPLACE INTO caseDetailFull (userId, activityDesc, activityLevel, complications, consequences, consequencesDesc, contactName, decontamination, eventDesc, eventLocation, heightUnits, implantRevision, notReturned, patientHeight, patientWeight, products, returned, surgicalApproach, weightUnits, ageOfPatient, assignedInventoryItems, assignedKits, assignedProdSystems, caseStatusID, dob, errorCode, externalItems, freight, hasCapPrice, hospitalID, id, notes, patient, physicianID, po, procDateTime, procTypeID, salesRepID, sex, survey, totalPrice, usageStatus, usageTimestamp, usedItems, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            var params = [userId, activityDesc, activityLevel, complications, consequences, consequencesDesc, contactName, decontamination, eventDesc, eventLocation, heightUnits, implantRevision, notReturned, patientHeight, patientWeight, products, returned, surgicalApproach, weightUnits, ageOfPatient, assignedInventoryItems, assignedKits, assignedProdSystems, caseStatusID, dob, errorCode, externalItems, freight, hasCapPrice, hospitalID, id, notes, patient, physicianID, po, procDateTime, procTypeID, salesRepID, sex, survey, totalPrice, usageStatus, usageTimestamp, usedItems, moment(procDateTime, "YYYY||MM||DD||HH||mm")._d.getTime()];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('caseDetailFull save successful.');
                    $.when(webOps.database.tables.caseHeaders.changeUpdateDetail(userId, id, 0))
                        .done(function()
                        {
                                deferred.resolve();
                        })
                        .fail(function()
                        {
                            deferred.reject();
                        });

                    //deferred.resolve();
                },
                function()
                {
                    $.log('caseDetailFull save error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    insert: function(userId, activityDesc, activityLevel, complications, consequences, consequencesDesc, contactName, decontamination, eventDesc, eventLocation, heightUnits, implantRevision, notReturned, patientHeight, patientWeight, products, returned, surgicalApproach, weightUnits, ageOfPatient, assignedInventoryItems, assignedKits, assignedProdSystems, caseStatusID, dob, errorCode, externalItems, freight, hasCapPrice, hospitalID, id, notes, patient, physicianID, po, procDateTime, procTypeID, salesRepID, sex, survey, totalPrice, usageStatus, usageTimestamp, usedItems)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'INSERT INTO caseDetailFull (userId, activityDesc, activityLevel, complications, consequences, consequencesDesc, contactName, decontamination, eventDesc, eventLocation, heightUnits, implantRevision, notReturned, patientHeight, patientWeight, products, returned, surgicalApproach, weightUnits, ageOfPatient, assignedInventoryItems, assignedKits, assignedProdSystems, caseStatusID, dob, errorCode, externalItems, freight, hasCapPrice, hospitalID, id, notes, patient, physicianID, po, procDateTime, procTypeID, salesRepID, sex, survey, totalPrice, usageStatus, usageTimestamp, usedItems, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            var params = [userId, activityDesc, activityLevel, complications, consequences, consequencesDesc, contactName, decontamination, eventDesc, eventLocation, heightUnits, implantRevision, notReturned, patientHeight, patientWeight, products, returned, surgicalApproach, weightUnits, ageOfPatient, assignedInventoryItems, assignedKits, assignedProdSystems, caseStatusID, dob, errorCode, externalItems, freight, hasCapPrice, hospitalID, id, notes, patient, physicianID, po, procDateTime, procTypeID, salesRepID, sex, survey, totalPrice, usageStatus, usageTimestamp, usedItems, moment(procDateTime, "YYYY||MM||DD||HH||mm")._d.getTime()];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('caseDetailFull insert successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('caseDetailFull insert error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    update: function(userId, id, caseStatusID, salesRepID, procDateTime, hospitalID, physicianID, procTypeID, assignedProdSystems, patient, dob, sex, ageOfPatient, po, notes, freight, totalPrice)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'UPDATE caseDetailFull SET caseStatusID = ?, salesRepID = ?, procDateTime = ?, hospitalID = ?, physicianID = ?, procTypeID = ?, assignedProdSystems = ?, patient = ?, dob = ?, sex = ?, ageOfPatient = ?, po = ?, notes = ?, freight = ?, totalPrice = ? WHERE userId = ? AND id = ?';
            var params = [caseStatusID, salesRepID, procDateTime, hospitalID, physicianID, procTypeID, assignedProdSystems, patient, dob, sex, ageOfPatient, po, notes, freight, totalPrice].concat([userId, id]);

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('caseDetailFull update successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('caseDetailFull update error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    updateID: function(userId, id, newID)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'UPDATE caseDetailFull SET id = ? WHERE userId = ? AND id = ?';
            var params = [newID].concat([userId, id]);

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('caseDetailFull update id successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('caseDetailFull update id error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    select: function(userId, id)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, activityDesc, activityLevel, complications, consequences, consequencesDesc, contactName, decontamination, eventDesc, eventLocation, heightUnits, implantRevision, notReturned, patientHeight, patientWeight, products, returned, surgicalApproach, weightUnits, ageOfPatient, assignedInventoryItems, assignedKits, assignedProdSystems, caseStatusID, dob, errorCode, externalItems, freight, hasCapPrice, hospitalID, id, notes, patient, physicianID, po, procDateTime, procTypeID, salesRepID, sex, survey, totalPrice, usageStatus, usageTimestamp, usedItems, timestamp FROM caseDetailFull WHERE userId = ? AND id = ?';
            var params = [userId, id];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('caseDetailFull reader successful');
                    deferred.resolve((data.rows.length > 0) ? data.rows.item(0) : null);
                },
                function()
                {
                    $.log('caseDetailFull reader failed');
                    deferred.reject();
                }
            );
        }).promise();
    },
    selectForSync: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, activityDesc, activityLevel, complications, consequences, consequencesDesc, contactName, decontamination, eventDesc, eventLocation, heightUnits, implantRevision, notReturned, patientHeight, patientWeight, products, returned, surgicalApproach, weightUnits, ageOfPatient, assignedInventoryItems, assignedKits, assignedProdSystems, caseStatusID, dob, errorCode, externalItems, freight, hasCapPrice, hospitalID, id, notes, patient, physicianID, po, procDateTime, procTypeID, salesRepID, sex, survey, totalPrice, usageStatus, usageTimestamp, usedItems, timestamp FROM caseDetailFull WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('caseDetailFull reader for sync successful');
                    
                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    $.log('caseDetailFull reader for sync failed');
                    deferred.reject();
                }
            );
        }).promise();
    },
    selectMinAndMaxDates: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT MIN(timestamp) Min, MAX(timestamp) Max FROM caseDetailFull WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('caseDetailFull reader min and max dates successful');
                    deferred.resolve(data.rows.item(0));
                },
                function()
                {
                    $.log('caseDetailFull reader min and max dates failed');
                    deferred.reject();
                }
            );
        }).promise();
    }
};

webOps.database.tables.assignedKits =
{
    saveMultiple: function(userId, caseId, data)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'INSERT OR REPLACE INTO assignedKits (userId, caseId, id, locationId, name, statusId) VALUES (?, ?, ?, ?, ?, ?)';
            var params = [userId, caseId];
            var properties = ['id', 'locationId', 'name', 'statusId'];

            webOps.database.commands.executeNonQueryMultiple(sql, data, params, properties, [],
                function()
                {
                    $.log('assignedKits save multiple successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('assignedKits save multiple error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    select: function(userId, caseId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, caseId, id, locationId, name, statusId FROM assignedKits WHERE userId = ? AND caseId = ?';
            var params = [userId, caseId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('assignedKits reader successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    $.log('assignedKits reader failed');
                    deferred.reject();
                }
            );
        }).promise();
    },
    selectOnlyId: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT DISTINCT id FROM assignedKits WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('assignedKits reader only Id successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i).id);
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    $.log('assignedKits reader only Id failed');
                    deferred.reject();
                }
            );
        }).promise();
    },
    selectByID: function(userId, caseId, id)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, caseId, id, locationId, name, statusId FROM assignedKits WHERE userId = ? AND caseId = ? AND id = ?';
            var params = [userId, caseId, id];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('assignedKits reader by id successful');
                    deferred.resolve(data.rows.item(0));
                },
                function()
                {
                    $.log('assignedKits reader by id failed');
                    deferred.reject();
                }
            );
        }).promise();
    }
};

webOps.database.tables.usage =
{
    save: function(userId, caseId, catalog, lotCode, quantity, inventoryLoc, shipToLoc, unitListPrice, unitActualPrice, total, notes, priceException, externalItem, warehouseId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'INSERT OR REPLACE INTO usage(userId, caseId, catalog, lotCode, quantity, inventoryLoc, shipTo, unitListPrice, unitActualPrice, total, notes, priceException, externalItem, warehouseId, committedToServer, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            var params = [userId, caseId, catalog, lotCode, quantity, inventoryLoc, shipToLoc, unitListPrice, unitActualPrice, total, notes, priceException, externalItem, warehouseId, 0, new Date()];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('usage save successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('usage save error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    savePricing: function(userId, caseId, catalog, lotCode, quantity, inventoryLoc, shipToLoc, unitListPrice, unitActualPrice, total, notes, priceException, externalItem, warehouseId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'INSERT OR REPLACE INTO usage(userId, caseId, catalog, lotCode, quantity, inventoryLoc, shipTo, unitListPrice, unitActualPrice, total, notes, priceException, externalItem, warehouseId, committedToServer, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            var params = [userId, caseId, catalog, lotCode, quantity, inventoryLoc, shipToLoc, unitListPrice, unitActualPrice, total, notes, priceException, externalItem, warehouseId, 1, new Date()];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('usage pricing save successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('usage pricing save error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    saveMultiple: function(userId, caseId, data)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'INSERT OR REPLACE INTO usage(userId, caseId, catalog, lotCode, inventoryLoc, shipTo, unitListPrice, unitActualPrice, total, notes, priceException, externalItem, warehouseId, committedToServer, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            var params = [userId, caseId];
            var properties = ['catalog', 'lotCode', 'inventoryLoc', 'shipTo', 'unitListPrice', 'unitActualPrice', 'total', 'notes', 'priceException', 'externalItem', 'warehouseId'];
            var customParams = ['1', 'new Date()'];

            webOps.database.commands.executeNonQueryMultiple(sql, data, params, properties, customParams,
                function()
                {
                    $.log('usage save multiple successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('usage save multiple error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    selectAllGroups: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT caseId, quantity, catalog, lotCode, inventoryLoc, shipTo, notes, unitListPrice, unitActualPrice, total, priceException, externalItem, committedToServer, date FROM usage WHERE userId = ? GROUP BY date, caseId, catalog, lotCode ORDER BY date DESC';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('usage all groups read successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    $.log('usage all groups read failed');
                    deferred.reject();
                }
            );
        }).promise();
    },
    updateEntryIn: function(userId, caseId, catalog, lotCode, newCatalog, newLotCode)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'UPDATE usage SET catalog = ?, lotCode = ? WHERE userId = ? AND caseId = ? AND catalog = ? AND lotCode = ?';
            var params = [newCatalog, newLotCode].concat([userId, caseId, catalog, lotCode]);

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('usage save successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('usage save error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    select: function(userId, caseId, catalog, lotCode)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, caseId, catalog, lotCode, quantity, inventoryLoc, shipTo, notes, unitListPrice, unitActualPrice, total, priceException, externalItem, warehouseId, committedToServer, date FROM usage WHERE userId = ? AND caseId = ? AND catalog = ? AND lotCode = ?';
            var params = [userId, caseId, catalog, lotCode];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('usage read successful');
                    deferred.resolve((data.rows.length > 0) ? data.rows.item(0) : {});
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    selectGroup: function(userId, caseId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, caseId, catalog, lotCode, quantity, inventoryLoc, shipTo, notes, unitListPrice, unitActualPrice, total, priceException, externalItem, warehouseId, committedToServer, date FROM usage WHERE userId = ? AND caseId = ? ORDER BY date DESC';
            var params = [userId, caseId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('usage group read successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    selectGroupCommitted: function(userId, caseId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, caseId, catalog, lotCode, quantity, inventoryLoc, shipTo, notes, unitListPrice, unitActualPrice, total, priceException, externalItem, warehouseId, committedToServer, date FROM usage WHERE userId = ? AND caseId = ? AND committedToServer = 1 GROUP BY catalog, lotCode ORDER BY date DESC';
            var params = [userId, caseId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('usage group read successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    removeByCaseId: function(userId, caseId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'DELETE FROM usage WHERE userId = ? AND caseId = ?';
            var params = [userId, caseId];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('usage delete by case successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('usage delete by case error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    removeByEntry: function(userId, caseId, catalog, lotCode)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'DELETE FROM usage WHERE userId = ? AND caseId = ? AND catalog = ? AND lotCode = ?';
            var params = [userId, caseId, catalog, lotCode];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('usage delete by entry successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('usage delete by entry error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    updateGroupCommitted: function(userId, caseId, externalItem)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'UPDATE usage SET committedToServer = ? WHERE userId = ? AND caseId = ? AND externalItem = ?';
            var params = [1, userId, caseId, externalItem];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('usage update Group Committed successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('usage update Group Committed failed.');
                    deferred.reject();
                }
            );
        }).promise();
    }
};

webOps.database.tables.casePhotoList =
{
    categories:
    {
        PRE_OP: 0,
        POST_OP: 2,
    },
    saveMultiple: function(userId, caseId, data)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'INSERT OR REPLACE INTO casePhotoList (userId, caseId, category, comments, data, imageSize, parts, photoID, side, view) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            var params = [userId, caseId];
            var properties = ['category', 'comments', 'data', 'imageSize', 'parts', 'photoID', 'side', 'view'];

            webOps.database.commands.executeNonQueryMultiple(sql, data, params, properties, [],
                function()
                {
                    $.log('casePhotoList save successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('casePhotoList save error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    deleteByCaseId: function(userId, caseId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'DELETE FROM casePhotoList WHERE userId = ? AND caseId = ?';
            var params = [userId, caseId];

            $.when(webOps.database.tables.casePhotoList.select(userId, caseId))
                .done(function(photoList)
                {
                    deletePhotoList();
                    webOps.database.tables.casePhotoData.deleteByPhotoList($.map(photoList || [], function(n) { return n.photoID; }).join(','));
                })
                .fail(function()
                {
                    deletePhotoList();
                });

            function deletePhotoList()
            {
                webOps.database.commands.executeNonQuery(sql, params,
                    function(tx, data)
                    {
                        $.log('casePhotoList delete successful.');
                        deferred.resolve();
                    },
                    function()
                    {
                        $.log('casePhotoList delete failed.');
                        deferred.reject();
                    }
                );
            }
        }).promise();
    },
    select: function(userId, caseId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, caseId, category, comments, data, imageSize, parts, photoID, side, view FROM casePhotoList WHERE userId = ? AND caseId = ?';
            var params = [userId, caseId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('casePhotoList reader successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    $.log('casePhotoList reader failed');
                    deferred.reject();
                }
            );
        }).promise();
    },
    selectOnlyId: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT DISTINCT photoID FROM casePhotoList WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('casePhotoList reader only Id successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i).id);
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    $.log('casePhotoList reader only Id failed');
                    deferred.reject();
                }
            );
        }).promise();
    },
    selectIdAndImageSize: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT photoID, imageSize FROM casePhotoList WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('casePhotoList reader Id and ImageSize successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    $.log('casePhotoList reader Id and ImageSize failed');
                    deferred.reject();
                }
            );
        }).promise();
    },
    selectByID: function(userId, caseId, photoID)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, caseId, category, comments, data, imageSize, parts, photoID, side, view FROM casePhotoList WHERE userId = ? AND caseId = ? AND photoID = ?';
            var params = [userId, caseId, photoID];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('casePhotoList reader by id successful');
                    deferred.resolve(data.rows.item(0));
                },
                function()
                {
                    $.log('casePhotoList reader by id failed');
                    deferred.reject();
                }
            );
        }).promise();
    },
    selectCountByGroup: function(userId, caseId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT COUNT(*) count, category FROM casePhotoList WHERE userId = ? AND caseId = ? AND imageSize > 0 GROUP BY category';
            var params = [userId, caseId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('casePhotoList reader count by group successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    $.log('casePhotoList reader count by group failed');
                    deferred.reject();
                }
            );
        }).promise();
    },
    selectDataByCategory: function(userId, caseId, category)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT L.userId, caseId, category, comments, data, imageSize, parts, L.photoID, side, view, photoData FROM casePhotoList L JOIN casePhotoData D ON L.userId = D.userId AND L.photoID = D.photoID WHERE L.userId = ? AND caseId = ? AND category = ?';
            var params = [userId, caseId, category];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('casePhotoList reader data by category successful');
                    
                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    $.log('casePhotoList reader data by category failed');
                    deferred.reject();
                }
            );
        }).promise();
    }
};

webOps.database.tables.casePhotoData =
{
    save: function(userId, photoID, photoData)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'INSERT OR REPLACE INTO casePhotoData (userId, photoID, photoData) VALUES (?, ?, ?)';
            var params = [userId, photoID, photoData];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('casePhotoData save successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('casePhotoData save error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    deleteByPhotoList: function(photoList)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'DELETE FROM casePhotoData WHERE photoID IN (' + photoList + ')';
            webOps.database.commands.executeNonQuery(sql, [],
                function(tx, data)
                {
                    $.log('casePhotoData delete successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('casePhotoData delete failed.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    select: function(userId, photoID)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, photoID, photoData FROM casePhotoData WHERE userId = ? AND photoID = ?';
            var params = [userId, photoID];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('casePhotoData reader successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    $.log('casePhotoData reader failed');
                    deferred.reject();
                }
            );
        }).promise();
    }
};

webOps.database.tables.KitItems =
{
    saveMultiple: function(userId, data)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'INSERT OR REPLACE INTO KitItems (userId, catNum, desc, id, kitId, listPrice, lotCode, statusCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            var params = [userId];
            var properties = ['catNum', 'desc', 'id', 'kitId', 'listPrice', 'lotCode', 'statusCode'];

            webOps.database.commands.executeNonQueryMultiple(sql, data, params, properties, [],
                function()
                {
                    $.log('KitItems save successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('KitItems save error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    select: function(userId, kitId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, catNum, desc, id, kitId, listPrice, lotCode, statusCode FROM KitItems WHERE userId = ? AND kitId = ?';
            var params = [userId, kitId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('KitItems reader successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    $.log('KitItems reader failed');
                    deferred.reject();
                }
            );
        }).promise();
    }
};

webOps.database.tables.inventoryCount =
{
    save: function(userId, hospitalID, catalog, lotCode)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'INSERT INTO inventoryCount (userId, hospitalID, catalog, lotCode, committedToServer, date) VALUES (?, ?, ?, ?, ?, ?)';
            var params = [userId, hospitalID, catalog, lotCode, 0, new Date()];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    'SELECT userId, hospitalID, catalog, lotCode, committedToServer, date FROM inventoryCount ORDER BY date DESC'
                    $.log('inventoryCount save successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('inventoryCount save error.');
                    deferred.reject();
                }
            );
        }).promise();
    },     
    selectAllGroups: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT hospitalID, COUNT(*) quantity, catalog, lotCode, committedToServer, date FROM inventoryCount WHERE userId = ? GROUP BY date, catalog, lotCode ORDER BY date DESC';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('inventoryCount all groups read successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    $.log('inventoryCount all groups read failed');
                    deferred.reject();
                }
            );
        }).promise();
    },
    updateEntryIn: function(userId, hospitalID, catalog, lotCode, newCatalog, newLotCode)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'UPDATE inventoryCount SET catalog = ?, lotCode = ? WHERE userId = ? AND hospitalID = ? AND catalog = ? AND lotCode = ?';
            var params = [newCatalog, newLotCode].concat([userId, hospitalID, catalog, lotCode]);

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('inventoryCount update EntryIn successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('inventoryCount update EntryIn failed.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    selectGroup: function(userId, hospitalID)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT COUNT(*) quantity, catalog, lotCode, committedToServer, date FROM inventoryCount WHERE userId = ? AND hospitalID = ? GROUP BY catalog, lotCode ORDER BY date DESC';
            var params = [userId, hospitalID];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('inventoryCount group read successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    selectGroupToSync: function(userId, hospitalID)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT COUNT(*) quantity, catalog, lotCode, committedToServer FROM inventoryCount WHERE userId = ? AND hospitalID = ? AND committedToServer = 0 GROUP BY catalog, lotCode';
            var params = [userId, hospitalID];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('inventoryCount group read successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    removeByHospital: function(userId, hospitalID)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'DELETE FROM inventoryCount WHERE userId = ? AND hospitalID = ?';
            var params = [userId, hospitalID];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('inventoryCount delete by hospital successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('inventoryCount delete by hospital error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    removeByEntry: function(userId, hospitalID, catalog, lotCode)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'DELETE FROM inventoryCount WHERE userId = ? AND hospitalID = ? AND catalog = ? AND lotCode = ?';
            var params = [userId, hospitalID, catalog, lotCode];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('inventoryCount delete by entry successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('inventoryCount delete by entry error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    updateGroupCommitted: function(userId, hospitalID)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'UPDATE inventoryCount SET committedToServer = ? WHERE userId = ? AND hospitalID = ?';
            var params = [1, userId, hospitalID];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('inventoryCount update Group Committed successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('inventoryCount update Group Committed failed.');
                    deferred.reject();
                }
            );
        }).promise();
    }
};

//===========================================================================================================================================

webOps.database.tables.procedures =
{
    save: function(userId, active, id, name, productSystemCategoryIDs)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'INSERT INTO procedures (userId, active, id, name, productSystemCategoryIDs) VALUES (?, ?, ?, ?, ?)';
            var params = [userId, active, id, name, productSystemCategoryIDs];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('procedures save successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('procedures save error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    saveMultiple: function(userId, data)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'INSERT INTO procedures (userId, active, id, name, productSystemCategoryIDs) VALUES (?, ?, ?, ?, ?)';
            var params = [userId];
            var properties = ['active', 'id', 'name', 'productSystemCategoryIDs'];

            webOps.database.commands.executeNonQueryMultiple(sql, data, params, properties, [],
                function()
                {
                    $.log('procedures save successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('procedures save error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    select: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, active, id, name, productSystemCategoryIDs FROM procedures WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('procedures reader successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    count: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT COUNT(*) count FROM procedures WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('procedures count reader successful');
                    deferred.resolve(data.rows.item(0));
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    remove: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'DELETE FROM procedures WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('procedures delete successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('procedures delete error.');
                    deferred.reject();
                }
            );
        }).promise();
    }
};

webOps.database.tables.salesReps =
{
    saveMultiple: function(userId, data)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'INSERT INTO salesReps (userId, salesRepID, salesRepName, warehouseId, hospitalIds, physicianIds) VALUES (?, ?, ?, ?, ?, ?)';
            var params = [userId];
            var properties = ['salesRepID', 'salesRepName', 'warehouseId', 'hospitalIds', 'physicianIds'];

            webOps.database.commands.executeNonQueryMultiple(sql, data, params, properties, [],
                function()
                {
                    $.log('salesReps save successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('salesReps save error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    select: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, salesRepID, salesRepName, warehouseId, hospitalIds, physicianIds FROM salesReps WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('salesReps reader successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    selectAllSalesReps: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT salesRepID FROM salesReps WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('salesReps reader all salesReps successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    $.log('salesReps reader all salesReps failed');
                    deferred.reject();
                }
            );
        }).promise();
    },
    count: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT COUNT(*) count FROM salesReps WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('salesReps count reader successful');
                    deferred.resolve(data.rows.item(0));
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    remove: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'DELETE FROM salesReps WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('salesReps delete successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('salesReps delete error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
};

webOps.database.tables.physicians =
{
    saveMultiple: function(userId, data)
    {
        return $.Deferred(function(deferred)
        {
            //var sql = 'INSERT OR REPLACE INTO physicians (userId, fullName, id, physicianPrefs) VALUES (?, ?, ?, ?)';
            var sql = 'INSERT INTO physicians (userId, fullName, id, physicianPrefs) VALUES (?, ?, ?, ?)';
            var params = [userId];
            var properties = ['fullName', 'id', 'physicianPrefs'];

            webOps.database.commands.executeNonQueryMultiple(sql, data, params, properties, [],
                function()
                {
                    $.log('physicians save successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('physicians save error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    select: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, fullName, id, physicianPrefs FROM physicians WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('physicians reader successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    //## Jesse Turner Feb 6, 2013
    selectPrefs: function(id)
    {
        return $.Deferred(function(deferred)
        {
            // Limiting the Results to 1 because physicianPrefs should not be tied to Reps (userId), this helps to avoid conflicts in the event that
            // a physician is assigned to multiple Reps.
            // This keeps the obligation on the Web Service for providing accurate and up-to-date physicianPrefs.
            var sql = 'SELECT physicianPrefs FROM physicians WHERE id = ? LIMIT 1';
            var params = [id];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    deferred.resolve(data.rows.item(0));
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    count: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT COUNT(*) count FROM physicians WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('physicians count reader successful');
                    deferred.resolve(data.rows.item(0));
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    remove: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'DELETE FROM physicians WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('physicians delete successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('physicians delete error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
};

webOps.database.tables.hospitals =
{
    saveMultiple: function(userId, data)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'INSERT INTO hospitals (userId, id, name, warehouseId) VALUES (?, ?, ?, ?)';
            var params = [userId];
            var properties = ['id', 'name', 'warehouseId'];

            webOps.database.commands.executeNonQueryMultiple(sql, data, params, properties, [],
                function()
                {
                    $.log('hospitals save successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('hospitals save error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    select: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, id, name, warehouseId FROM hospitals WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('hospitals reader successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    count: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT COUNT(*) count FROM hospitals WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('hospitals count reader successful');
                    deferred.resolve(data.rows.item(0));
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    remove: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'DELETE FROM hospitals WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('hospitals delete successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('hospitals delete error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
};

webOps.database.tables.addresses =
{
    saveMultiple: function(userId, data)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'INSERT INTO addresses (userId, id, name, replName, replTo, shipName, shipTo) VALUES (?, ?, ?, ?, ?, ?, ?)';
            var params = [userId];
            var properties = ['id', 'name', 'replName', 'replTo', 'shipName', 'shipTo'];

            webOps.database.commands.executeNonQueryMultiple(sql, data, params, properties, [],
                function()
                {
                    $.log('addresses save successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('addresses save error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    select: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, id, name, replName, replTo, shipName, shipTo FROM addresses WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('addresses reader successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    selectReplenishTo: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, id, name, replName, replTo, shipName, shipTo FROM addresses WHERE userId = ? AND replTo = 1';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('addresses reader replTo = 1 successful.');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    $.log('addresses reader replTo = 1 failed.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    selectShipTo: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, id, name, replName, replTo, shipName, shipTo FROM addresses WHERE userId = ? AND shipTo = 1';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('addresses reader ShipTo = 1 successful.');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    $.log('addresses reader ShipTo = 1 failed.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    count: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT COUNT(*) count FROM addresses WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('addresses count reader successful');
                    deferred.resolve(data.rows.item(0));
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    remove: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'DELETE FROM addresses WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('addresses delete successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('addresses delete error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
};

webOps.database.tables.productSystems =
{
    saveMultiple: function(userId, data)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'INSERT INTO productSystems (userId, description, id, name) VALUES (?, ?, ?, ?)';
            var params = [userId];
            var properties = ['description', 'id', 'name'];

            webOps.database.commands.executeNonQueryMultiple(sql, data, params, properties, [],
                function()
                {
                    $.log('productSystems save successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('productSystems save error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    select: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, description, id, name FROM productSystems WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('productSystems reader successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    selectByProducts: function(userId, products)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, description, id, name FROM productSystems WHERE userId = ? AND id IN (' + products + ')';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('productSystems reader by products successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    $.log('productSystems reader by products failed.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    count: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT COUNT(*) count FROM productSystems WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('productSystems count reader successful');
                    deferred.resolve(data.rows.item(0));
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    remove: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'DELETE FROM productSystems WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('productSystems delete successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('productSystems delete error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
};

webOps.database.tables.prodSystemCats =
{
    saveMultiple: function(userId, data)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'INSERT INTO prodSystemCats (userId, id, name, productSystemIDs) VALUES (?, ?, ?, ?)';
            var params = [userId];
            var properties = ['id', 'name', 'productSystemIDs'];

            webOps.database.commands.executeNonQueryMultiple(sql, data, params, properties, [],
                function()
                {
                    $.log('prodSystemCats save successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('prodSystemCats save error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    select: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, id, name, productSystemIDs FROM prodSystemCats WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('prodSystemCats reader successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    count: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT COUNT(*) count FROM prodSystemCats WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('prodSystemCats count reader successful');
                    deferred.resolve(data.rows.item(0));
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    remove: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'DELETE FROM prodSystemCats WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('prodSystemCats delete successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('prodSystemCats delete error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
};

webOps.database.tables.warehouses =
{
    saveMultiple: function(userId, data)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'INSERT INTO warehouses (userId, id, replAddresses, shipAddresses) VALUES (?, ?, ?, ?)';
            var params = [userId];
            var properties = ['id', 'replAddresses', 'shipAddresses'];

            webOps.database.commands.executeNonQueryMultiple(sql, data, params, properties, [],
                function()
                {
                    $.log('warehouses save successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('warehouses save error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    select: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, id, replAddresses, shipAddresses FROM warehouses WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('warehouses reader successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    selectByAddresses: function(userId, replAddresses, shipAddresses)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, id, replAddresses, shipAddresses FROM warehouses WHERE userId = ? AND replAddresses = ? AND shipAddresses = ?';
            var params = [userId, replAddresses, shipAddresses];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('warehouses reader successful');
                    deferred.resolve((data.rows.length > 0) ? data.rows.item(0) : {});
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    count: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT COUNT(*) count FROM warehouses WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('warehouses count reader successful');
                    deferred.resolve(data.rows.item(0));
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    remove: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'DELETE FROM warehouses WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('warehouses delete successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('warehouses delete error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
};

webOps.database.tables.caseStatusCodes =
{
    saveMultiple: function(userId, data)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'INSERT INTO caseStatusCodes (userId, id, name) VALUES (?, ?, ?)';
            var params = [userId];
            var properties = ['id', 'name'];

            webOps.database.commands.executeNonQueryMultiple(sql, data, params, properties, [],
                function()
                {
                    $.log('caseStatusCodes save successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('caseStatusCodes save error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    select: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, id, name FROM caseStatusCodes WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('caseStatusCodes reader successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    count: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT COUNT(*) count FROM caseStatusCodes WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('caseStatusCodes count reader successful');
                    deferred.resolve(data.rows.item(0));
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    remove: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'DELETE FROM caseStatusCodes WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('caseStatusCodes delete successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('caseStatusCodes delete error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
};

webOps.database.tables.kitStatusCodes =
{
    saveMultiple: function(userId, data)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'INSERT INTO kitStatusCodes (userId, id, name) VALUES (?, ?, ?)';
            var params = [userId];
            var properties = ['id', 'name'];

            webOps.database.commands.executeNonQueryMultiple(sql, data, params, properties, [],
                function()
                {
                    $.log('kitStatusCodes save successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('kitStatusCodes save error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    select: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, id, name FROM kitStatusCodes WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('kitStatusCodes reader successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    count: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT COUNT(*) count FROM kitStatusCodes WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('kitStatusCodes count reader successful');
                    deferred.resolve(data.rows.item(0));
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    remove: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'DELETE FROM kitStatusCodes WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('kitStatusCodes delete successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('kitStatusCodes delete error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
};

webOps.database.tables.priceExceptionCodes =
{
    saveMultiple: function(userId, data)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'INSERT INTO priceExceptionCodes (userId, id, name) VALUES (?, ?, ?)';
            var params = [userId];
            var properties = ['id', 'name'];

            webOps.database.commands.executeNonQueryMultiple(sql, data, params, properties, [],
                function()
                {
                    $.log('priceExceptionCodes save successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('priceExceptionCodes save error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
    select: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT userId, id, name FROM priceExceptionCodes WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('priceExceptionCodes reader successful');

                    var items = [];
                    for (var i = 0; i < data.rows.length; i++)
                    {
                        items.push(data.rows.item(i));
                    }

                    deferred.resolve(items);
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    count: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'SELECT COUNT(*) count FROM priceExceptionCodes WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeReader(sql, params,
                function(tx, data)
                {
                    $.log('priceExceptionCodes count reader successful');
                    deferred.resolve(data.rows.item(0));
                },
                function()
                {
                    deferred.reject();
                }
            );
        }).promise();
    },
    remove: function(userId)
    {
        return $.Deferred(function(deferred)
        {
            var sql = 'DELETE FROM priceExceptionCodes WHERE userId = ?';
            var params = [userId];

            webOps.database.commands.executeNonQuery(sql, params,
                function()
                {
                    $.log('priceExceptionCodes delete successful.');
                    deferred.resolve();
                },
                function()
                {
                    $.log('priceExceptionCodes delete error.');
                    deferred.reject();
                }
            );
        }).promise();
    },
};


// Attach Devicer Ready event.
//document.addEventListener("deviceready", onDeviceReady, false);
$(function()
{
    onDeviceReady();
});

// PhoneGap is ready
function onDeviceReady()
{
    webOps.database.create();
}