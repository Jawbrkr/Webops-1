// =================================================================
// 	Page View
// 	----------------------------------------------------------------
// 
// 	Autor: Oscar Cubillos <tegers77@gmail.com>
// 	Version 1.0
// 	Create: 2012-08-26
// 	Last Modified: 2013-01-27
//
// 	----------------------------------------------------------------
// 	References
// 	----------------------------------------------------------------
/// <reference path="index.controller.js" />
/// <reference path="webops/webops.tools.js" />
//
// =================================================================

// Inicastialize jQTouch
var jQT = new $.jQTouch(
{
	icon: 'jqtouch.png',
	icon4: 'jqtouch4.png',
	addGlossToIcon: false,
	startupScreen: 'jqt_startup.png',
	statusBar: 'black-translucent',
	themeSelectionSelector: '#jqt #themes ul',
	preloadImages: 
	[
	    'css/img/header/sub_header.png',
        'css/img/header/logo.png',
        'css/img/layout/sub_footer.png',
        'css/img/layout/background.png',
        'css/img/buttons/refresh.png',
        'css/img/buttons/calendar.png',
        'css/img/buttons/search.png',
        'css/img/buttons/new.png',
        'css/img/buttons/delete.png',
        'css/img/buttons/website.png',
        'css/img/buttons/icons/next.png',
        'css/img/buttons/icons/selected.png',
        'css/img/buttons/header/back.png',
        'css/img/buttons/header/logout.png',
        'css/img/buttons/header/settings.png',
        'css/img/buttons/header/sort.png',
        'css/img/buttons/header/cancel.png',
        'css/img/buttons/header/save.png',
        'css/img/buttons/header/commit.png',
        'css/img/buttons/home/caseView.png',
        'css/img/buttons/home/postACase.png',
        'css/img/buttons/home/inventoryCount.png',
        'css/img/buttons/home/manualSync.png',
        'css/img/buttons/home/reports.png',
        'css/img/buttons/home/about.png',
        /*'css/img/buttons/toggles/setUp.png',
        'css/img/buttons/toggles/signUp.png',*/
        'css/img/buttons/toggles/mine.png',
        'css/img/buttons/toggles/all.png',
        'css/img/buttons/toggles/onLine.png',
        'css/img/buttons/toggles/offLine.png',
        'css/img/status/new.png',
        'css/img/status/kits-assigned.png',
        'css/img/status/assembled.png',
        'css/img/status/shipped.png',
        'css/img/status/returned.png',
        'css/img/status/checkedIn.png',
        'css/img/status/reconciled.png',
	    'css/img/status/closed.png',
        'css/img/status/cancelled.png',
        'css/img/layout/ajax-loader.gif'
	]
});

jQT.goToLeft = function(page)
{
    jQT.goTo($(page), 'slideleft');
};

jQT.goToRight = function(page)
{
    jQT.goTo($(page), 'slideright');
};

// ---------------------------------------------------------------------------------------------------------

function loadStyle()
{
    jQT.resetHeight();
    setLoaderPosition();
}

function setLoaderPosition()
{
    $('.imgLoader').css(
    {
        position: 'absolute',
        //margin: '0px 10px 0 10px',
        left: ($(window).width() - $('.imgLoader').outerWidth()) / 2.2,
        top: ($(window).height() - $('.imgLoader').outerHeight()) / 2.1
    });
}

function loadData()
{
    $('#version').html(webOps.database.version);
    $('#lblCustomer').html(new customerSelect().getSelectedCustomer());

    loadSetUp();
}

function createTemplates()
{
    $('div > header').prepend('<div class="background"><div class="webopslogo"></div></div>');
    $('div > footer:not([data-background="none"])').prepend('<div class="background"><div></div><div class="left"></div><div class="center"></div><div class="right"></div></div>');
    $('div > footer[data-footer="customer"]').append('<div class="customerFooter"><h1></h1></div>');
}

function implementTapReady()
{
    event.preventDefault();
    try
    {
        if (mobileDevice && !mobileDevice.tapReady) { return false; }
        mobileDevice.tapReady = false;
    }
    catch (ex) { }
}



function setupLinks()
{
    // ==========================================================================================================================
    // General
    // ==========================================================================================================================

    $(window).resize(function()
	{
        jQT.resetHeight();
        setLoaderPosition();        
    });

    //var currentEvent;
    //$('a').off().on('tap', function(e)
    //{
    //    if (currentEvent)
    //    {
    //        e.preventDefault();
    //        e.stopPropagation();
    //    }
    //    else
    //    {
    //        currentEvent = e;
    //    }
    //});

    $('.backCustom, .cancelCustom').off().on('tap', function(e)
    {
        e.stopPropagation();
        jQT.goToRight($(this).attr('href'));
    });

    $('a:parent(li).next').off().on('tap', function(e)
    {
        e.stopPropagation();
        jQT.goToRight($(this).attr('href'));
    });

    $('.checkbox').off().on('click', function(e)
    {
        checkboxToggle($(this));
    });

    $("input").off().keyup(function()
    {
        var initVal = $(this).val();
        outputVal = initVal.replace(/[^0-9\a-z\A-Z\*\,\&\ \-\_\:\;\(\)\$\@\?\!\'\"\{\}\+\=\%\#\[\]\^\/\.]/g, "").replace(/&/, ",");
        // the code below prevents the input from being
        // rewritten if it doesnt need to be changed so that
        // the cursor is only moved if the input needs to be
        // changed
        if (initVal != outputVal)
        {
            $(this).val(outputVal);
        }
    });

    $("textarea").off().keyup(function()
    {
        var initVal = $(this).val();
        outputVal = initVal.replace(/[^0-9\a-z\A-Z\*\,\&\ \-\_\:\;\(\)\/\$\@\?\!\'\"\{\}\+\=\%\#\[\]\^\.]/g, "").replace(/&/, ",");
        // the code below prevents the input from being
        // rewritten if it doesnt need to be changed so that
        // the cursor is only moved if the input needs to be
        // changed
        if (initVal != outputVal)
        {
            $(this).val(outputVal);
        }
    });

    // ==========================================================================================================================
    // Login
    // ==========================================================================================================================

    //$('#txtCustomer').css('text-transform','lowercase');
    //$('#txtCustomer').val().toLowerCase();
    //textField.autocapitalizationType = UITextAutocapitalizationTypeNone;

    // Database

    $('#btnDatabase').off().on('tap', function(e)
    {
        var ulSQL = $('#databaseSQL ul');
        ulSQL.empty();

        var ulLocalStorage = $('#databaseLocalStorage ul');
        ulLocalStorage.empty();

        new database().getTables(function(tables)
        {
            for (var i = 0, table = null; i < tables.length; i++)
            {
                table = tables[i];
                var li = String.format('<li><label>{0}</label><small>{1}</small>', table.table, table.rows);
                ulSQL.append($(li));
            }

            var items = new database().getLocalStorage();
            for (var i = 0, item = null; i < items.length; i++)
            {
                item = items[i];
                var li = String.format('<li><label>{0}</label><small>{1}</small>', item.key, item.value);
                ulLocalStorage.append($(li));
            }

            jQT.goToLeft('#database');
        });
    });

    $('#btnDatabaseConsoleClear').off().on('tap', function(e)
    {
        e.preventDefault();
        $('#txtDatabaseConsole').val('');
    });

    // Login

    var timerHandle;
    function timeoutStart()
    {
        $('a').on('tap', function()
        {
            clearTimeoutHandle();
        });

        $('input, textarea').keyup(function()
        {
            clearTimeoutHandle();
        });

        timeoutSet();
    }

    function timeoutSet()
    {
        timerHandle = setTimeout(function()
        {
            $.alert('Inactive Use: Sorry, but this application has not been used in the last 30 minutes and therefore you had to be logged out.');
            logout();

            $('#txtPassword').val('');
            jQT.goToRight('#login');

        }, 1800000);
    }


    function clearTimeoutHandle()
    {
        clearTimeout(timerHandle);
        timeoutSet();
    }

	$('#btnSignIn').off().on('tap', function(e)
	{
	    function signIn()
	    {
	        var user = $('#txtUserName').val();
	        var password = $('#txtPassword').val();
	        var customer = $('#lblCustomer').html();

	        login(customer, user, password, function()
	        {
	            timeoutStart();

	            var page = ($('#ckbAppMode').is(':checked') ? '#home' : '#loadingCaseFromTheServer');
	            jQT.goToLeft(page);
	            
	        });
	    }

        // Off-line mode
	    if ($('#ckbAppMode').is(':checked'))
	    {
	        signIn();
	    }
	    else
	    {
	        var imgsrc = 'http://test-prod2.webops.net/images/WebOpsLogo.gif';
	        var img = new Image();

	        img.onerror = function()
	        {
	            $.alert("Network error: sorry, but the network is not accessible right now. This application will now close since network access is a requirement.");
	        }
	        img.onload = function()
	        {
	            signIn();
	            //alert("Hay conexion a internet.");
	        }

	        img.style.display = 'none';
	        img.src = imgsrc;
	        $('body').append(img);
	    }
	});

	$('#btnLogout').on('tap', function(e)
	{
	    e.preventDefault();

	    /*if (implementTapReady())
	        return false;*/

	    //$('#txtUserName').val(''); //Test Case [request]
	    $('#txtPassword').val('');
	    jQT.goToRight('#login');
	});

    $('#login').bind('pageAnimationEnd', function(event, info)
	{
	    if (info.direction == 'in')
	    {
	        logout();
	    }
    });

    // ==========================================================================================================================
    // Set Up
    // ==========================================================================================================================

	$('#ckbCaseDownloads, #ckbAppMode').change(function(e, args)
	{
	    if (args == undefined)
	    {
	        var ckbCaseDownloads = $('#ckbCaseDownloads').is(':checked');
	        var ckbAppMode = $('#ckbAppMode').is(':checked');

	        checkboxToggle($('#ckbAppModeSettings').parents('.checkbox'), 'ckbAppModeSettings');
	        new setUp().set(ckbCaseDownloads, ckbAppMode);
	    }
	});

	$('#ckbAppModeSettings').change(function(e, args)
	{
	    if (args == undefined)
	    {
	        var ckbCaseDownloads = $('#ckbCaseDownloads').is(':checked');
	        var ckbAppMode = $('#ckbAppModeSettings').is(':checked');

	        checkboxToggle($('#ckbAppMode').parents('.checkbox'), 'ckbAppModeSettings');
	        new setUp().set(ckbCaseDownloads, ckbAppMode);
	    }
	});

    // ==========================================================================================================================
    // Customer Select
    // ==========================================================================================================================

	$('#customerSelect').bind('pageAnimationEnd', function(event, info)
	{
	    if (info.direction == 'in')
	    {
	        $('#ulCustomerSelect').empty();
	        loadCustomers();
	    }
	});

	$('#btnCustomerSelect').off().on('tap', function()
	{
	    var customer = $('#txtCustomer');
	    if (!String.isNullOrEmpty(customer.val()))
	    {
	        new customerSelect().newCustomer(customer.val(), 
            function()
            {
                customer.val('');
                loadCustomers();
            },
            function()
            {
                $.alert('Fail to create customer.');
            });
	    }
	});

	$('#ulCustomerSelect li a').live('tap', function()
	{
	    var customer = $(this).html();
	    new customerSelect().selectedCustomer(customer);

	    $('#lblCustomer').html(customer);
	    jQT.goToRight('#login');

	})

    // ==========================================================================================================================
    // Loading Case From The Server
    // ==========================================================================================================================

    $('#loadingCaseFromTheServer').bind('pageAnimationEnd', function(event, info)
    {
	    if (info.direction == 'in')
	    {
	        setTimeout(function()
	        {
	            var page = $('#loadingCaseFromTheServer').attr('page');
	            var pageError = $('#loadingCaseFromTheServer').attr('pageError');

	            loadingCaseFromTheServer
                (
                    'loadingCaseFromTheServer', '', '',
                    function()
                    {
                        if (String.clear(page).length == 0) page = '#home';
                        jQT.goToLeft(page);
                    },
	                function()
	                {
	                    $.alert("Loading Case From The Server Error.");
	                    if (String.clear(pageError).length == 0) pageError = '#login';

	                    jQT.goToLeft(pageError);
	                }
                );
	        }, 100);
	    }
	    else if (info.direction == 'out')
	    {
	        $('#loadingCaseFromTheServer').removeAttr('page').removeAttr('pageError');
	    }
	});

    // ==========================================================================================================================
    // Home
    // ==========================================================================================================================

	$('#home').bind('pageAnimationEnd', function(event, info)
	{
	    if (info.direction == 'in')
	    { 
	        if (new currentSession().get() == false)
	        {
	            jQT.goToRight('#login');
	        }
	        else
	        {
	            setTimeout(function() { loadUserData(); }, 50);
	        }
	    }
	});

	$('#btnCaseView').off().on('click', function(e)
	{
        /*if (implementTapReady())
	        return false;*/

	    saveDates();
	    getCaseView('', function()
	    {
	        jQT.goToLeft('#caseView');	        
	    });
	});

	$('#btnPostACase').off().on('tap', function()
	{
	    jQT.goToLeft('#postACase');
	});

	$('#btnInventoryCount').on('click', function(e)
	{
	    /*if (implementTapReady())
	        return false;*/

	    var ul = $('#inventoryCount ul');
	    ul.empty();

	    new inventoryCount().getHospitals(function(hospitals)
	    {
	        loadInventoryCount(ul, hospitals);
	        jQT.goToLeft('#inventoryCount');
	    });
	});

	$('#btnManualSync').off().on('tap', function(e)
	{
	    e.preventDefault();
	    if (!$('#ckbAppMode').is(':checked'))
	    {
	        jQT.goToLeft('#manualSync');	        
	    }
	    else
	    {
	    	alert('Sorry, but the network is not accesible right now.');
	    }
	});

    // ==========================================================================================================================
    // Case View
    // ==========================================================================================================================

	$('#caseView').bind('pageAnimationEnd', function(event, info)
	{
	    $('#btnCaseDetailListBack').attr('href', '#caseView');
	    $('#btnCaseDetailListSaveCaseView').show();
	    $('#btnCaseDetailListSavePostACase').hide();
	    $('.searchInput').hide();

	    var val = $("#caseView ul.rounded").html();
		$("#caseView ul.rounded").html(val.replace(/&amp;/g, ','));			
	});

    $('#caseView ul li > a').live('tap', function(e)
	{
	    /*if (implementTapReady())
	        return false;*/

	    var caseId = $(this).attr('caseId');
	    if (caseId)
	    {
	        clearCaseViewDetail();

	        new caseDetailFull().get(caseId,
            function(caseDetail)
            {
                loadCaseViewDetail(caseDetail);
                $("#lblCaseDetailListPatientInfo").text( $("#lblCaseDetailListPatientInfo").text().replace("&", ",") );

                jQT.goToLeft('#caseDetailList');
            },
            function()
            {
                $.alert('Error to load case detail list');
            });
	    }
    });

    // Refresh

	$('#btnRefreshCaseView').off().on('tap', function()
	{
	    var isOnline = !$('#ckbAppMode').is(':checked');
	    if (isOnline)
	    {
	        var background = $('#caseView_background');
	        background.show();

	        loadingCaseFromTheServer
            (
                'refresh', '', '',
                function()
                {
                    getCaseView('', function()
                    {
                        background.hide();
                    });
                },
                function()
                {
                    $.alert("Loading Case From The Server Error.");
                    getCaseView('', function()
                    {
                        background.hide();
                    });
                }
            );
	    }
	});

    // Date Range

	$('#saveDateRange').off().on('tap', function()
	{
		var isOnline = !$('#ckbAppMode').is(':checked');
		var background = $('#caseViewCalendar_background');
		/*new settings().resetEverythingAllData(isOnline, false, function()
		{
			if (isOnline)
			{
			    background.show();
			    customDates();
			}
		});*/

		if (isOnline)
		{
		    background.show();
		    customDates();

		    function customDates()
		    {
		        var dateStart = $('#dateStarCustom').val();
		        var dateEnd = $('#dateEndCustom').val();

		        if (dateStart.length > 0 && dateEnd.length > 0)
		        {
		            dateStart = moment(dateStart, 'YYYY-MM-DD');
		            dateEnd = moment(dateEnd, 'YYYY-MM-DD');

		            saveDates(dateStart, dateEnd);
		            loadingCaseFromTheServer
                    (
                        'daterange', dateStart, dateEnd,
                        function()
                        {
                            getCaseView('', function()
                            {
                                background.hide();
                                jQT.goToLeft('#caseView');
                            });
                        },
                        function()
                        {
                            $.alert("Loading Case From The Server Error.");
                            getCaseView('', function()
                            {
                                background.hide();
                                jQT.goToLeft('#caseView');
                            });
                        }
                    );
		        }
		    }
		}
	});

    // Search

	$('#btnSearch').off().on('tap', function()
	{
	    var search = $('.searchInput');
	    var background = $('#caseView_background_filter');

	    if (search.is(':visible'))
	    {
	        search.slideUp(function()
	        {
	            background.hide();
	        });
	    }
	    else
	    {
	        background.show();
	        search.slideDown(function()
	        {
	            search.find('input').focus();//.css('color', 'black');
	        });
	    }
	});

	$('#btnSearchCancel').off().on('tap', function(e)
	{
	    e.stopPropagation();
	    var search = $('.searchInput');

	    search.find('input').val('');
	    search.slideUp(function()
	    {
	        $('#caseView_background_filter').hide();
	    });
	});

	$('#btnSearchFilter').off().on('tap', function(e)
	{
	    e.stopPropagation();
	    var searchInput = $('.searchInput').find('input');

	    getCaseView(searchInput.val(), function() { });
	});

    // Sort By & View Cases By
    // -------------------------------------------------------------------------------------------------------

	$('#sortCaseBy ul.rounded:first li a').off().on('tap', function()
	{
	    //e.stopPropagation();

	    $('#sortCaseBy ul.rounded:first li').removeClass('selected');
	    $(this).parent().addClass('selected');
	});

	$('#sortCaseBy #ulCaseViewViewBy li a').off().live('tap', function()
	{
	    //e.stopPropagation();

	    $('#sortCaseBy #ulCaseViewViewBy li').removeClass('selected');
	    $(this).parent().addClass('selected');
	});

	$('#sortCaseBy .backCustom').on('tap', function(e)
	{
	    e.stopPropagation();

	    var sortBy = $('#sortCaseBy ul.rounded:first li.selected').find('a').attr('sortBy');
	    var viewBy = $('#sortCaseBy #ulCaseViewViewBy li.selected').find('a').attr('viewBy');

	    var viewByTitle = $('#sortCaseBy #ulCaseViewViewBy li.selected').find('a>label').html();
	    $('#lblCaseViewSalesRep').html((!String.isNullOrEmpty(viewByTitle)) ? viewByTitle : '');

	    new caseViewSort().set(String(sortBy), viewBy, function()
	    {
	        getCaseView('', function()
	        {
	            jQT.goToRight('#caseView');
	        });
	    });
	});

	$('#lnkViewCaseByAll').off().on('tap', function(e)
	{
	    e.preventDefault();

	    if (!$('#ckbAppMode').is(':checked'))
	    {
	        var background = $('#sortCaseBy_background');
	        background.show();

	        new caseView().viewCasesByAll(
                function()
                {
                    background.hide();
                },
                function()
                {
                    background.hide();
                }
            );
	    }
	});

    // ==========================================================================================================================
    // Case View Detail
    // ==========================================================================================================================

    $('#caseDetailList').bind('pageAnimationStart', function(event, info)
    {
        if (info.direction == 'out')
        {
            var divScroll = $("div.scroll", $('#caseDetailList'));
            var caseDetailListScrollTopValue = (divScroll.length > 0) ? divScroll.scrollTop() : 0;
            $('#caseDetailList').attr('scrollTop', caseDetailListScrollTopValue);


        }
    });

    $('#caseDetailList').bind('pageAnimationEnd', function(event, info)
    {
        if (info.direction == 'in')
        {
			$(function(){
			    // create a datetimepicker with default settings
			    $("#lblCaseDetailListSurgeryTime").mobiscroll().time({theme: 'ios',
			        display: 'bottom',
			        mode:'scroller',
			        label: 'Rating'}); // Shorthand for: $("#scroller").mobiscroll({ preset: 'datetime' });

			    /*var surgeryTime = $('#txtCaseDetailListSurgeryTime').val();
			    var surgeryTimePicker = $('#lblCaseDetailListSurgeryTime').val();
			    surgeryTime.val(surgeryTimePicker);*/
			});

			var caseIdOff = $('.caseDetailListID').html();

			if ($('#caseNoSave').html() == caseIdOff || $('.caseDetailListID').html().length < 3 ) 
	    	{
	    		$('#noSave').show();
	    	}
	    	else
	    	{
	    		$('#noSave').hide();
	    	}

			if(($('#lblCaseDetailListCaseType').html() == 'Info Case' &&  $('#lblCaseDetailListStatus').html() == 'Reconciled') || ($('#lblCaseDetailListCaseType').html() == 'Loaner Case' &&  $('#lblCaseDetailListStatus').html() == 'Shipped'))
			{
				$('#caseDetailListUsage').show();
			}
			else
			{
				$('#caseDetailListUsage').hide();
			}
			/*var time = $('#txtCaseDetailListSurgeryTime');

		    if (time.val().length > 0)
		    {
		        $('#txtCaseDetailListSurgeryTime').val(moment(String.format('1900||01||01||{0}', time.val()), "YYYY||MM||DD||HH:mm").format('hh:mmA'));
		    }*/

            setTimeout(function()
            {
                var caseDetailListScrollTopValue = $('#caseDetailList').attr('scrollTop');
                $("div.scroll", $('#caseDetailList')).scrollTop(caseDetailListScrollTopValue);
            }, 40);
        }

        var val = $("#lblCaseDetailListNotes").html();
        if (val && val.length > 0) $("#lblCaseDetailListNotes").html(val.replace(/&amp;/g, ','));

        var val2 = $("#txtCaseDetailListPO").val();
        if (val2 && val2.length > 0) $("#txtCaseDetailListPO").val(val2.replace(/[^0-9\a-z\A-Z\.]/g, ""));

        var val3 = $("#caseView ul.rounded").html();
        if (val3 && val3.length > 0) $("#caseView ul.rounded").html(val3.replace(/&amp;/g, ','));

        var surgeryDate = $('#txtCaseDetailListSurgeryDate');
        if (!String.isNullOrEmpty(surgeryDate.val()))
        {
            var d = moment(surgeryDate.val(), 'YYYY-MM-DD').format('ddd, MMM DD ');
            $('#dateDetail').html(d);
        }
        else
        {
            $('#dateDetail').html('No date');
        }
    });

	$('#btnCaseDetailListSaveCaseView').off().on('tap', function()
	{
		var background = $('#caseDetailList_save_background');
		var imgLoaderView = $('#imgLoaderCaseview');

		//imgLoaderView.css('display','none');
		imgLoaderView.show();
		background.show();

		saveCaseViewDetail('#caseView', function()
		{
		    imgLoaderView.hide();
		    background.hide();
		});
	});

    // Status
    // -------------------------------------------------------------------------------------------------------

	$('#caseDetailList_status').bind('pageAnimationEnd', function(event, info)
	{
	    if (info.direction == 'in')
	    {
	        var id = $('#lblCaseDetailListStatus').attr('dataid');
	        $(String.format('#caseDetailList_status ul.rounded li > a[dataid={0}]', id)).parent().addClass('selected');
	    }
	    else if (info.direction == 'out')
	    {
	        $('#caseDetailList_status ul.rounded li').removeClass('selected');
	    }
	});

	$('#caseDetailList_status ul.rounded li a').live('tap', function(e)
	{
	    e.stopPropagation();

	    $('#caseDetailList_status ul.rounded li').removeClass('selected');
	    $(this).parent().addClass('selected');

	    var id = $(this).attr('dataid');
	    var name = $(this).find('label').html();

	    $('#lblCaseDetailListStatus').attr('dataid', id).html(name);
	    jQT.goToRight('#caseDetailList');
	});

    // Sales Reps
    // -------------------------------------------------------------------------------------------------------

	$('#caseDetailList_salesRep').bind('pageAnimationEnd', function(event, info)
	{
	    if (info.direction == 'in')
	    {
	        var id = $('#lblCaseDetailListSalesRep').attr('dataid');
	        $(String.format('#caseDetailList_salesRep ul.rounded li > a[dataid={0}]', id)).parent().addClass('selected');
	    }
	    else if (info.direction == 'out')
	    {
	        $('#caseDetailList_salesRep ul.rounded li').removeClass('selected');
	    }
	});

	$('#caseDetailList_salesRep ul.rounded li a').live('tap', function(e)
	{
	    e.stopPropagation();

	    $('#caseDetailList_salesRep ul.rounded li').removeClass('selected');
	    $(this).parent().addClass('selected');

	    var id = $(this).attr('dataid');
	    var name = $(this).find('label').html();

	    $('#lblCaseDetailListSalesRep').attr('dataid', id).html(name);
	    jQT.goToRight('#caseDetailList');
	});

    // Surgery Date
    // -------------------------------------------------------------------------------------------------------

	//$('#lnkCaseDetailListSurgeryDate').off().on('tap', function()
	//{
	//    $('#txtCaseDetailListSurgeryDate').focus();
	//});

    // Surgery Time
    // -------------------------------------------------------------------------------------------------------

	//$('#lnkCaseDetailListSurgeryTime').off().on('tap', function()
	//{
	//    $('#txtCaseDetailListSurgeryTime').focus();
    //});

	$('#caseDetailList_surgeryTime .backCustom').off().on('tap', function(e)
	{
	    e.preventDefault();
	    var time = $('#txtCaseDetailListSurgeryTime');

	    if (time.val().length > 0)
	    {
	        $('#lblCaseDetailListSurgeryTime').val(moment(String.format('1900||01||01||{0}', time.val()), "YYYY||MM||DD||HH:mm").format('hh:mmA'));
	    }

	    jQT.goToRight('#caseDetailList');
	});
	
	/*$('#caseDetailList_surgeryTime').bind('pageAnimationEnd', function(event, info)
	{
	        if (info.direction == 'in')
	        {
	            $('#txtCaseDetailListSurgeryTime').attr('autofocus', 'autofocus').focus();
	        }
	        else if (info.direction == 'out')
	        {
	            $('#txtCaseDetailListSurgeryTime').removeAttr('autofocus');
	        }
	    
	});*/

    // Hospital
    // -------------------------------------------------------------------------------------------------------

	$('#caseDetailListHospital a href').off().on('tap', function()
	{
    	jQT.goToLeft('#caseDetailList_hospital');
    });

	$('#caseDetailList_hospital').bind('pageAnimationEnd', function(event, info)
	{
	    if (info.direction == 'in')
	    {
	        var id = $('#lblCaseDetailListHospital').attr('dataid');
	        $(String.format('#caseDetailList_hospital ul.rounded li > a[dataid={0}]', id)).parent().addClass('selected');
	    }
	    else if (info.direction == 'out')
	    {
	        $('#caseDetailList_hospital ul.rounded li').removeClass('selected');
	    }
	});

	$('#caseDetailList_hospital ul.rounded li a').live('tap', function(e)
	{
	    e.stopPropagation();

	    $('#caseDetailList_hospital ul.rounded li').removeClass('selected');
	    $(this).parent().addClass('selected');

	    var id = $(this).attr('dataid');
	    var name = $(this).find('label').html();

	    $('#lblCaseDetailListHospital').attr('dataid', id).html(name);
	    jQT.goToRight('#caseDetailList');
	});

    // Physician
    // -------------------------------------------------------------------------------------------------------

	$('#caseDetailListPhysician a href').off().on('tap', function()
	{
    	jQT.goToLeft('#caseDetailList_physician');
    });

	$('#caseDetailList_physician').bind('pageAnimationEnd', function(event, info)
	{
	    if (info.direction == 'in')
	    {
	        var id = $('#lblCaseDetailListPhysician').attr('dataid');
	        $(String.format('#caseDetailList_physician ul.rounded li > a[dataid={0}]', id)).parent().addClass('selected');
	    }
	    else if (info.direction == 'out')
	    {
	        $('#caseDetailList_physician ul.rounded li').removeClass('selected');
	    }
	});

	$('#caseDetailList_physician ul.rounded li a').live('tap', function(e)
	{
	    e.stopPropagation();

	    $('#caseDetailList_physician ul.rounded li').removeClass('selected');
	    $(this).parent().addClass('selected');

	    var id = $(this).attr('dataid');
	    var name = $(this).find('label').html();

	    $('#lblCaseDetailListPhysician').attr('dataid', id).html(name);
	    jQT.goToRight('#caseDetailList');
	});

    // Procedure
    // -------------------------------------------------------------------------------------------------------

	$('#caseDetailListProcedure a href').off().on('tap', function()
	{
    	jQT.goToLeft('#caseDetailList_procedure');
    });

	$('#caseDetailList_procedure').bind('pageAnimationEnd', function(event, info)
	{
	    if (info.direction == 'in')
	    {
	        var id = $('#lblCaseDetailListProcedure').attr('dataid');
	        $(String.format('#caseDetailList_procedure ul.rounded li > a[dataid={0}]', id)).parent().addClass('selected');
	    }
	    else if (info.direction == 'out')
	    {
	        $('#caseDetailList_procedure ul.rounded li').removeClass('selected');
	    }
	});

	$('#caseDetailList_procedure ul.rounded li a').live('tap', function(e)
	{
	    e.stopPropagation();

	    $('#caseDetailList_procedure ul.rounded li').removeClass('selected');
	    $(this).parent().addClass('selected');

	    var id = $(this).attr('dataid');
	    var name = $(this).find('label').html();
	    var dataproductcatids = $(this).attr('dataproductcatids');

	    $('#lblCaseDetailListProcedure').attr({ 'dataid': id, 'dataproductcatids': dataproductcatids }).html(name);
	    jQT.goToRight('#caseDetailList');
	});

    // ProductsSystemsCategory
    // -------------------------------------------------------------------------------------------------------

	$('#caseDetailList_productsSystemsCategory').bind('pageAnimationStart', function(event, info)
	{
	    if (info.direction == 'in')
	    {
	        conditionLoadProductSystemCategories();
	    }
	});

	$('#caseDetailList_productsSystemsCategory ul li > a').live('tap', function(e)
	{
	    /*if (implementTapReady())
	        return false;*/

	    var productSystemCategoryID = $(this).attr('dataid');
	    var productSystemCategoryProducts = $(this).attr('dataproducts');
	    var productSystemCategoryProductsSelected = $(this).attr('dataproductsselected');

	    $('#caseDetailList_productsSystemsCategory_products').attr({ 'categoryid': productSystemCategoryID });

	    $('#ulProductSystemsEmpty').show();
	    $('#ulProductSystemsSelected').empty().hide();
	    $('#ulProductSystemsAvaliable').empty();

	    new caseView().getProductSystems(productSystemCategoryProducts, function(productsSystems)
	    {
	        loadCaseViewDetailProductSystems(productsSystems, productSystemCategoryProductsSelected);
	        jQT.goToLeft('#caseDetailList_productsSystemsCategory_products');
	    });
	});

	$('#ulProductSystemsAvaliable li > a').live('tap', function(e)
	{
	    /*if (implementTapReady())
	        return false;*/

	    var ulProductSystemsEmpty = $('#ulProductSystemsEmpty');
	    var ulProductSystemsSelected = $('#ulProductSystemsSelected');

	    ulProductSystemsEmpty.hide();
	    ulProductSystemsSelected.show().append($(this).parent());
	});

	$('#ulProductSystemsSelected li > a').live('tap', function(e)
	{
	    /*if (implementTapReady())
	        return false;*/

	    var ulProductSystemsEmpty = $('#ulProductSystemsEmpty');
	    var ulProductSystemsSelected = $('#ulProductSystemsSelected');
	    var ulProductSystemsAvaliable = $('#ulProductSystemsAvaliable');

	    ulProductSystemsAvaliable.append($(this).parent());
	    if (ulProductSystemsSelected.find('li').length == 0)
	    {
	        ulProductSystemsEmpty.show();
	        ulProductSystemsSelected.hide();
	    }
	});

	$('#caseDetailList_productsSystemsCategory .backCustom').off().on('tap', function(e)
	{
	    e.preventDefault();

	    var itemsLength = 0;
	    $(String.format('#caseDetailList_productsSystemsCategory ul.rounded li[isValid] a[dataproductsselected!={0}]', '')).each(function()
	    {
	        itemsLength += parseInt($(this).attr('dataproductsselected').split(',').length);
	    });

	    //$('#caseDetailList a[href=#caseDetailList_productsSystemsCategory] small').html(String.format('({0})', itemsLength));
	    $('#lblCaseDetailListProductSystemCategory').html(String.format('({0})', itemsLength));

	    jQT.goToRight('#caseDetailList');
	});


	$('#caseDetailList_productsSystemsCategory_products .backCustom').off().on('tap', function()
	{
        var items = [];
	    $('#ulProductSystemsSelected li').each(function()
	    {
	        items.push($(this).find('a').attr('dataid'));
	    });

	    var categoryID = $('#caseDetailList_productsSystemsCategory_products').attr('categoryid');
	    var a = $(String.format('#caseDetailList_productsSystemsCategory ul.rounded li[isValid] > a[dataid={0}]', categoryID));
        
	    a.attr('dataproductsselected', items.join(','));
	    a.find('span').html((items.length > 0) ? String.format('({0})', items.length) : '');

	    $('#caseDetailList_productsSystemsCategory_products').removeAttr('categoryid');
	    jQT.goToRight('#caseDetailList_productsSystemsCategory');
	});

    // Patien Info
    // -------------------------------------------------------------------------------------------------------

	$('#caseDetailList_patientInformation').bind('pageAnimationEnd', function(event, info)
	{
		$("#txtCaseDetailListPatientName").focus();

	    $("#txtCaseDetailListPatientName").focus(function()
	    {
	        var initVal = $(this).val();
	        outputVal = initVal.replace(/[^0-9\a-z\A-Z\*\,\&\ \-\_\:\;\(\)\$\@\?\!\'\"\{\}\+\=\%\#\[\]\^\.]/g, "").replace(/&/, ",");
	        // the code below prevents the input from being
	        // rewritten if it doesnt need to be changed so that
	        // the cursor is only moved if the input needs to be
	        // changed
	        if (initVal != outputVal)
	        {
	            $(this).val(outputVal);
	        }
	    });
	});

	$('#caseDetailList_patientInformation .backCustom').off().on('tap', function(e)
	{
	    e.stopPropagation();
	    $('#lblCaseDetailListPatientInfo').html($('#txtCaseDetailListPatientName').val());
	    jQT.goToRight('#caseDetailList');
	});

    // Gender

	$('#caseDetailList_patientInformation_gender').bind('pageAnimationEnd', function(event, info)
	{
	    if (info.direction == 'in')
	    {
	        var id = $('#lblCaseDetailListPatientGender').attr('dataid');
	        $(String.format('#caseDetailList_patientInformation_gender ul.rounded li > a[dataid={0}]', id)).parent().addClass('selected');
	    }
	    else if (info.direction == 'out')
	    {
	        $('#caseDetailList_patientInformation_gender ul.rounded li').removeClass('selected');
	    }
	});

	$('#caseDetailList_patientInformation_gender ul.rounded li a').off().on('tap', function(e)
	{
	    e.stopPropagation();

	    $('#caseDetailList_patientInformation_gender ul.rounded li').removeClass('selected');
	    $(this).parent().addClass('selected');

	    var id = $(this).attr('dataid');
	    var name = $(this).find('label').html();

	    $('#lblCaseDetailListPatientGender').attr('dataid', id).html(name);
	    jQT.goToRight('#caseDetailList_patientInformation');
	});

	$('#txtCaseDetailListPatientAge').off().keyup(function()
	{
	    if ($(this).val() > 199)
	    {
	        $(this).val('');
	    }
	});

    // Notes
    // -------------------------------------------------------------------------------------------------------

	$('#caseDetailList_notes').bind('pageAnimationEnd', function(event, info)
	{
		$("#txtCaseDetailListNotes").focus();
	    var val = $("#caseView ul.rounded").html();
	    $("#caseView ul.rounded").html(val.replace(/&amp;/g, ','));	    
	});

	$('#btnBackNotes').off().on('tap', function()
	{
	    $('#lblCaseDetailListNotes').html($('#txtCaseDetailListNotes').val().substr(0, 26));
	    jQT.goToRight('#caseDetailList');
	});

    // PO

	$("#txtCaseDetailListPO").off().keyup(function()
	{
	    var initVal = $(this).val();
	    outputVal = initVal.replace(/[^0-9\a-z\A-Z\.]/g, "").replace(/&/, ",");
	    // the code below prevents the input from being
	    // rewritten if it doesnt need to be changed so that
	    // the cursor is only moved if the input needs to be
	    // changed
	    if (initVal != outputVal)
	    {
	        $(this).val(outputVal);
	    }
	});

    // Create Preferences
    // -------------------------------------------------------------------------------------------------------

	$('#caseDetailList_createPreferences').bind('pageAnimationEnd', function(event, info)
	{
	    if ($('#lblCaseCreatePreferences').html() == 'No')
	    {
	        $('#caseDetailList_createPreferences ul.rounded li').eq(0).addClass('selected');
	    }
	    else if (info.direction == 'in')
	    {
	        var id = $('#lblCaseCreatePreferences').attr('dataid');
	        $(String.format('#caseDetailList_createPreferences ul.rounded li > a[dataid={0}]', id)).parent().addClass('selected');
	    }
	    else if (info.direction == 'out')
	    {
	        $('#caseDetailList_createPreferences ul.rounded li a').removeClass('selected');
	    }
	});

	$('#caseDetailList_createPreferences ul.rounded li a').live('tap', function(e)
	{
	    e.stopPropagation();

	    $('#caseDetailList_createPreferences ul.rounded li').removeClass('selected');
	    $(this).parent().addClass('selected');

	    var id = $(this).attr('dataid');
	    var name = $(this).find('label').html();

	    $('#lblCaseCreatePreferences').attr('dataid', id).html(name);
	    jQT.goToRight('#caseDetailList');
	});

    // Assigned Kits
    // -------------------------------------------------------------------------------------------------------

	$('#lnkCaseDetailListAssignedKits').off().on('tap', function(e)
	{
	    e.stopPropagation();

	    var caseId = $('#caseDetailList .caseDetailListID').html();
	    $('#caseDetailList_assignedKits ul.rounded').empty();

	    new caseView().getAssignedKits(caseId, function(assignedKits)
	    {
	        loadAssignedKits(assignedKits);
	        jQT.goToLeft('#caseDetailList_assignedKits');
	    });
	});

	$('#linkToUsageAssignedKits').off().on('tap', function(e)
	{
	    e.stopPropagation();

	    var caseId = $('#caseDetailList .caseDetailListID').html();
	    $('#ulUsageAssignedKitsAvailableKits, #ulUsageAssignedKitsSelectedItems').empty();

	    new caseView().getAssignedKits(caseId, function(assignedKits)
	    {
	        loadAssignedKitsInUsage(assignedKits);
	        jQT.goToLeft('#caseDetailList_usage_assignedKits');
	    });
	});

	$('#ulUsageAssignedKitsAvailableKits li > a').live('tap', function(e)
	{
	    /*if (implementTapReady())
	        return false;*/

	    /*
        var assignedKitsID = $(this).attr('dataid');
	    var assignedKitsName = $(this).find('label').html();

	    $('#caseDetailList_usage_assignedKits_detail ul.rounded').empty();

	    new caseView().getKitItems(assignedKitsID, function(kitItems)
	    {
	        loadKitItemsInUsage(assignedKitsName, kitItems);
	        jQT.goToLeft('#caseDetailList_usage_assignedKits_detail');
	    });
        */

	    var ulEmpty = $('#ulUsageAssignedKitsSelectedItemsEmpty');
	    var ulSelected = $('#ulUsageAssignedKitsSelectedItems');

	    ulEmpty.hide();
	    ulSelected.show().append($(this).parent());
	});

	$('#ulUsageAssignedKitsSelectedItems li > a').live('tap', function(e)
    {
        /*if (implementTapReady())
	        return false;*/

        var ulEmpty = $('#ulUsageAssignedKitsSelectedItemsEmpty');
        var ulSelected = $('#ulUsageAssignedKitsSelectedItems');
        var ulAvaliable = $('#ulUsageAssignedKitsAvailableKits');

        ulAvaliable.append($(this).parent());
        if (ulSelected.find('li').length == 0)
        {
            ulEmpty.show();
            ulSelected.hide();
        }
    });


	$('#caseDetailList_assignedKits ul li > a').live('tap', function(e)
	{
	    /*if (implementTapReady())
	        return false;*/

	    var assignedKitsID = $(this).attr('dataid');
	    var assignedKitsName = $(this).find('label').html();

	    $('#caseDetailList_assignedKits_detail ul.rounded').empty();

	    new caseView().getKitItems(assignedKitsID, function(kitItems)
	    {
	        loadKitItems(assignedKitsName, kitItems);
	        jQT.goToLeft('#caseDetailList_assignedKits_detail');
	    });
	});

    // Usage
    // -------------------------------------------------------------------------------------------------------

    $('#caseDetailList_usage').bind('pageAnimationStart', function(event, info)
    {
    	if (info.direction == 'in')
	    {
    	    if ($('#caseDetailList_assignedKits ul.rounded').html().length == 0)
    	    {
    	    	console.log('Kist ocultos');
    	        $('#caseDetailListUsageAssignedKits').hide();
    	    }
    	    else
    	    {
    	    	console.log('Kist Abiertos');
    	        $('#caseDetailListUsageAssignedKits').show();
    	    }
	    }
    });


	$('#btnAddItems').live('tap', function(e)
	{
	    /*if (implementTapReady())
	    return false;*/

	    if ($('#lblInventoryLocation').html().length > 0 && $('#lblshipToLocation').html().length > 0)
	    {
	        var caseId = $('.caseDetailListID').html();

	        $('#caseDetailList_usage_addItems').attr('caseid', caseId);
	        jQT.goToLeft('#caseDetailList_usage_addItems');
	    }
	    else
	    {
            $.alert('Please select Inventory Loc. and Ship To Loc.');
	    }
	});

    $('#caseDetailList_usage_addItems').bind('pageAnimationEnd', function(event, info)
	{
	    if (info.direction == 'in')
	    {
	    	$("#txtUsageCatalog").focus();
	    	$('#btnBackList').hide();
	    	$('#btnBackAddItem').show();
	        var caseId = $('#caseDetailList_usage_addItems').attr('caseid');
	        loadUsageEntries(caseId);
	    } 
	});

    $('#btnUsageSubmit').off().on('tap', function()
    {
        /*if (implementTapReady())
	        return false;*/

        var caseId = $('.caseDetailListID').html();
        var txtCatalog = $('#txtUsageCatalog');
        var txtLotCode = $('#txtUsageLotCode');
        var lblInventoryLocation = $('#lblInventoryLocation');
        var lblShipToLocation = $('#lblshipToLocation');
        var notes = '';

        if (!String.isNullOrEmpty(txtCatalog.val()) || !String.isNullOrEmpty(txtLotCode.val()))
        {
            new usage().saveNewEntry(caseId, txtCatalog.val(), txtLotCode.val(), lblInventoryLocation.attr('dataid'), lblShipToLocation.attr('dataid'), notes, function()
            {
                txtLotCode.val('');
                txtCatalog.val('').focus();

                loadUsageEntries(caseId);
            },
            function()
            {
                $.alert('Error to save new entry');
            });
        }
    });


    $('#caseDetailList_usage_list').bind('pageAnimationStart', function(event, info)
    {
    	if (info.direction == 'in')
	    {
	        $('#btnBackList').show();
	        $('#btnBackAddItem').hide();

    	    var caseId = $('.caseDetailListID').html();
    	    loadUsageEntriesList(caseId);
    	}
    });

    $('#lnkUsageDeleteAllEntries').off().on('tap', function()
    {
        /*if (implementTapReady())
	        return false;*/

        var background = $('#caseDetailList_usage_addItems_background');
        var caseId = $('#caseDetailList_usage_addItems').attr('caseid');

        $.confirm('Tap Ok to clear all items.', function()
        {
            background.show();
            new usage().removeByCaseId(caseId,
                function()
                {
                    $('#ulUsageCatalogs').empty();
                    loadUsageEntries();

                    background.hide();
                },
                function()
                {
                    $.alert('Fail to clear all usage entries.');
                    background.hide();
                }
            );
        });
    });

    $('#ulUsageCatalogs li > a').live('click', function(e)
    {
        /*if (implementTapReady())
	        return false;*/

        var caseId = $('#caseDetailList_usage_addItems').attr('caseid');
        var catalog = $(this).find('span[role=catalog]').html();
        var lotCode = $(this).find('span[role=lotCode]').html();
        var quantity = $(this).find('span[role=quantity]').html();
        var inventoryLoc = $(this).find('input[role=inventoryLoc]').val();
        var shipToLoc = $(this).find('input[role=shipToLoc]').val();
        var notes = $(this).find('input[role=notes]').val();

        $('#caseDetailList_usage_addItems_catalog').attr(
        { 
            'caseid': caseId,
            'catalog': catalog,
            'lotCode': lotCode,
            'quantity': quantity,
            'inventoryLoc': inventoryLoc,
            'shipToLoc': shipToLoc,
            'notes': notes
        });

        jQT.goToLeft('#caseDetailList_usage_addItems_catalog');
    });

    $('#ulUsageItemsList li > a').live('click', function(e)
    {
        /*if (implementTapReady())
	        return false;*/

        var caseId = $('.caseDetailListID').html();
        var catalog = $(this).find('span[role=catalog]').html();
        var lotCode = $(this).find('span[role=lotCode]').html();
        var quantity = $(this).find('span[role=quantity]').html();
        var inventoryLoc = $(this).find('input[role=inventoryLoc]').val();
        var shipToLoc = $(this).find('input[role=shipToLoc]').val();
        var notes = $(this).find('input[role=notes]').val();

        $('#caseDetailList_usage_addItems_catalog').attr(
        { 
            'caseid': caseId,
            'catalog': catalog,
            'lotCode': lotCode,
            'quantity': quantity,
            'inventoryLoc': inventoryLoc,
            'shipToLoc': shipToLoc,
            'notes': notes
        });

        jQT.goToLeft('#caseDetailList_usage_addItems_catalog');
    });

    $('#caseDetailList_usage_addItems_catalog').bind('pageAnimationEnd', function(event, info)
    {
        if (info.direction == 'in')
        {
            var usageNewEntryCatalog = $('#caseDetailList_usage_addItems_catalog');
            var caseId = usageNewEntryCatalog.attr('caseid');
            var catalog = usageNewEntryCatalog.attr('catalog');
            var lotCode = usageNewEntryCatalog.attr('lotCode');
            var quantity = usageNewEntryCatalog.attr('quantity');
            var inventoryLoc = usageNewEntryCatalog.attr('inventoryLoc');
            var shipToLoc = usageNewEntryCatalog.attr('shipToLoc');
            var notes = usageNewEntryCatalog.attr('notes');

            loadUsageEntry(catalog, lotCode, quantity, inventoryLoc, shipToLoc, notes);
        }
    });
	
    $('#lnkUsageDeleteSingleEntry').off().on('tap', function()
    {
        /*if (implementTapReady())
	        return false;*/

        var background = $('#caseDetailList_usage_addItems_catalog_background');
        var usageNewEntryCatalog = $('#caseDetailList_usage_addItems_catalog');
        var caseId = usageNewEntryCatalog.attr('caseid');
        var catalog = usageNewEntryCatalog.attr('catalog');
        var lotCode = usageNewEntryCatalog.attr('lotCode');

        $.confirm('Tap Ok to remove this Usage entry.', function()
        {
            background.show();
            new usage().removeByEntry(caseId, catalog, lotCode,
                function()
                {
                    $('#lblUsageCatalog').val('');
                    $('#lblUsageLotCode').val('');
                    $('#lblUsageQuantity').val('');
                    $('#lblUsageCommittedToServer').val('');

                    background.hide();

                    if ($('#btnBackAddItem').is(':visible')) jQT.goToRight('#caseDetailList_usage_addItems');
                    else jQT.goToRight('#caseDetailList_usage_list');
                },
                function()
                {
                    $.alert('Fail to remove usage entry.');
                    background.hide();
                }
            );
        });
    });

    $('#saveUsageCatalog').off().on('tap', function()
    {
        var caseId = $('#caseDetailList_usage_addItems_catalog').attr('caseid');
        var txtCatalog = $('#lblUsageCatalog');
        var txtLotCode = $('#lblUsageLotCode');
        var txtQuantity = $('#lblUsageQuantity');
        var lblInventoryLoc = $('#lblUsageInventoryLoc');
        var lblShipTo = $('#lblUsageShipTo');
        var txtNotes = $('#txtUsageNotes');

        var usageNewEntryCatalog = $('#caseDetailList_usage_addItems_catalog');
        var catalog = usageNewEntryCatalog.attr('catalog');
        var lotCode = usageNewEntryCatalog.attr('lotCode');
        var inventoryLoc = lblInventoryLoc.attr('dataid');
        var shipToLoc = lblShipTo.attr('dataid');

        if ((!String.isNullOrEmpty(txtCatalog.val()) || !String.isNullOrEmpty(txtLotCode.val())) && !String.isNullOrEmpty(txtQuantity.val()) )
        {
            new usage().updateEntryIn(caseId, catalog, lotCode, txtCatalog.val(), txtLotCode.val(), txtQuantity.val(), inventoryLoc, shipToLoc, txtNotes.val(), function()
            {
                txtLotCode.val('');
                txtCatalog.val('');
                txtQuantity.val('');
                txtNotes.val('');

                if ($('#btnBackAddItem').is(':visible')) jQT.goToRight('#caseDetailList_usage_addItems');
                else jQT.goToRight('#caseDetailList_usage_list');
            },
            function()
            {
                $.alert('Error to update entry');
            });
        }
    });

    $('#btnBackUsageNotes').off().on('tap', function()
    {
        var usageNewEntryCatalog = $('#caseDetailList_usage_addItems_catalog');
        usageNewEntryCatalog.attr('notes', $('#txtUsageNotes').val());

        jQT.goToRight('#caseDetailList_usage_addItems_catalog');
    });

    $('#btnUsageCommit').off().on('tap', function()
    {
        if (!$('#ckbAppMode').is(':checked'))
        {
            //var hospitalID = $('#inventoryCount_newEntry').attr('hospitalid');
            var caseId = $('.caseDetailListID').html();
            new usage().syncToServer(caseId, function(message)
            {
                loadUsageEntries(caseId);
                if (message && message.length > 0) $.alert(message);
            });
        }
    });

	// Usage Inventory Location

	$('#caseDetailList_usage_inventoryLocation').bind('pageAnimationEnd', function(event, info)
	{
	    if (info.direction == 'in')
	    {
	        var id = $('#lblInventoryLocation').attr('dataid');
	        $(String.format('#caseDetailList_usage_inventoryLocation ul.rounded li > a[dataid={0}]', id)).parent().addClass('selected');
	    }
	});

	$('#caseDetailList_usage_inventoryLocation ul.rounded li a').live('tap', function(e)
	{
	    e.stopPropagation();

	    $('#caseDetailList_usage_inventoryLocation ul.rounded li').removeClass('selected');
	    $(this).parent().addClass('selected');

	    var id = $(this).attr('dataid');
	    var name = $(this).find('label').html();

	    $('#lblInventoryLocation').attr('dataid', id).html(name);
	    jQT.goToRight('#caseDetailList_usage_locations');
	});

	$('#caseDetailList_usage_list_inventoryLocation').bind('pageAnimationEnd', function(event, info)
	{
	    if (info.direction == 'in')
	    {
	        var id = $('#lblUsageInventoryLoc').attr('dataid');
	        $(String.format('#caseDetailList_usage_list_inventoryLocation ul.rounded li > a[dataid={0}]', id)).parent().addClass('selected');
	    }
	});

	$('#caseDetailList_usage_list_inventoryLocation ul.rounded li a').live('tap', function(e)
	{
	    e.stopPropagation();

	    $('#caseDetailList_usage_list_inventoryLocation ul.rounded li').removeClass('selected');
	    $(this).parent().addClass('selected');

	    var id = $(this).attr('dataid');
	    var name = $(this).find('label').html();

	    $('#lblUsageInventoryLoc').attr('dataid', id).html(name);
	    jQT.goToRight('#caseDetailList_usage_addItems_catalog');
	});

    // Usage Ship To Location

	$('#caseDetailList_usage_shipToLocation').bind('pageAnimationEnd', function(event, info)
	{
	    if (info.direction == 'in')
	    {
	        var id = $('#lblshipToLocation').attr('dataid');
	        $(String.format('#caseDetailList_usage_shipToLocation ul.rounded li > a[dataid={0}]', id)).parent().addClass('selected');
	    }
	});

	$('#caseDetailList_usage_shipToLocation ul.rounded li a').live('tap', function(e)
	{
	    e.stopPropagation();

	    $('#caseDetailList_usage_shipToLocation ul.rounded li').removeClass('selected');
	    $(this).parent().addClass('selected');

	    var id = $(this).attr('dataid');
	    var name = $(this).find('label').html();

	    $('#lblshipToLocation').attr('dataid', id).html(name);
	    jQT.goToRight('#caseDetailList_usage_locations');
	});

	$('#caseDetailList_usage_list_shipToLocation').bind('pageAnimationEnd', function(event, info)
	{
	    if (info.direction == 'in')
	    {
	        var id = $('#lblUsageShipTo').attr('dataid');
	        $(String.format('#caseDetailList_usage_list_shipToLocation ul.rounded li > a[dataid={0}]', id)).parent().addClass('selected');
	    }
	});

	$('#caseDetailList_usage_list_shipToLocation ul.rounded li a').live('tap', function(e)
	{
	    e.stopPropagation();

	    $('#caseDetailList_usage_list_shipToLocation ul.rounded li').removeClass('selected');
	    $(this).parent().addClass('selected');

	    var id = $(this).attr('dataid');
	    var name = $(this).find('label').html();

	    $('#lblUsageShipTo').attr('dataid', id).html(name);
	    jQT.goToRight('#caseDetailList_usage_addItems_catalog');
	});	

    // Pricing
    // -------------------------------------------------------------------------------------------------------

	$('#caseDetailList_pricing').bind('pageAnimationStart', function(event, info)
	{
	    if (info.direction == 'in')
	    {
	        var caseId = $('.caseDetailListID').html();
	        loadPricingUsageEntriesList(caseId, function(total)
	        {
	            $('#lblPricingTotal').attr('total', total);
	        });
	    }
	});

	$('#caseDetailList_pricing_detail_notes').bind('pageAnimationEnd', function(event, info)
	{
	});

	$('#caseDetailList_pricing').bind('pageAnimationEnd', function(event, info)
	{
	    if (info.direction == 'in')
	    {
	        var lblPricingTotal = $('#lblPricingTotal');
	        var total = Number(lblPricingTotal.attr('total'));

	        var totalGeneral = total + Number($('#txtPricingFreight').val());
	        lblPricingTotal.html(totalGeneral || 0);
	    }
	});

	$('#ulPricingUsageItemsList li > a').live('click', function(e)
	{
	    /*if (implementTapReady())
	        return false;*/

	    var caseId = $('.caseDetailListID').html();
	    var catalog = $(this).find('span[role=catalog]').html();
	    var lotCode = $(this).find('span[role=lotCode]').html();
	    var quantity = $(this).find('span[role=quantity]').html();
	    var inventoryLoc = $(this).find('input[role=inventoryLoc]').val();
	    var shipToLoc = $(this).find('input[role=shipToLoc]').val();
	    var notes = $(this).find('input[role=notes]').val();
	    var unitListPrice = $(this).find('input[role=unitListPrice]').val();
	    var unitActualPrice = $(this).find('input[role=unitActualPrice]').val();
	    var total = $(this).find('span[role=total]').html();
	    var priceException = $(this).find('input[role=priceException]').val();

	    $('#caseDetailList_pricing_detail').attr(
        {
            'caseid': caseId,
            'catalog': catalog,
            'lotCode': lotCode,
            'quantity': quantity,
            'inventoryLoc': inventoryLoc,
            'shipToLoc': shipToLoc,
            'notes': notes,
            'unitListPrice': unitListPrice,
            'unitActualPrice': unitActualPrice,
            'total': total,
            'priceException': Number(parseInt(priceException))
        });

	    jQT.goToLeft('#caseDetailList_pricing_detail');
	});

	$('#caseDetailList_pricing_detail_notes').bind('pageAnimationEnd', function(event, info)
	{
		$("#txtPricingNotes").focus();
	});

	$('#caseDetailList_pricing_detail').bind('pageAnimationStart', function(event, info)
	{
	    if (info.direction == 'in')
	    {
	        var entry = $('#caseDetailList_pricing_detail');
	        var caseId = entry.attr('caseid');
	        var catalog = entry.attr('catalog');
	        var lotCode = entry.attr('lotCode');
	        var quantity = entry.attr('quantity');
	        var inventoryLoc = entry.attr('inventoryLoc');
	        var shipToLoc = entry.attr('shipToLoc');
	        var notes = entry.attr('notes');
	        var unitListPrice = entry.attr('unitListPrice');
	        var unitActualPrice = entry.attr('unitActualPrice');
	        var total = entry.attr('total');
	        var priceException = entry.attr('priceException');

	        loadPricingUsageEntry(catalog, lotCode, quantity, inventoryLoc, shipToLoc, notes, unitListPrice, unitActualPrice, total, priceException);
	    }
	});

	$('#caseDetailList_pricing_detail_priceException').bind('pageAnimationEnd', function(event, info)
	{
	    if (info.direction == 'in')
	    {
	        var id = $('#lblPricingUsagePriceException').attr('dataid');
	        $(String.format('#caseDetailList_pricing_detail_priceException ul.rounded li > a[dataid={0}]', id)).parent().addClass('selected');
	    }
	    else if (info.direction == 'out')
	    {
	        //$('#caseDetailList_pricing_detail_priceException ul.rounded li').removeClass('selected');
	    }
	});

	$('#caseDetailList_pricing_detail_priceException ul.rounded li a').live('tap', function(e)
	{
	    e.stopPropagation();

	    $('#caseDetailList_pricing_detail_priceException ul.rounded li').removeClass('selected');
	    $(this).parent().addClass('selected');

	    var id = $(this).attr('dataid');
	    var name = $(this).find('label').html();

	    $('#lblPricingUsagePriceException').attr('dataid', id).html(name);
	    $('#caseDetailList_pricing_detail').attr('priceException', id);
	    jQT.goToRight('#caseDetailList_pricing_detail');
	});

	$('#btnPricingDetail').off().on('tap', function()
	{
	    var caseId = $('#caseDetailList_pricing_detail').attr('caseid');
	    var txtCatalog = $('#lblPricingUsageCatalog');
	    var txtLotCode = $('#lblPricingUsageLotCode');
	    var txtQuantity = $('#lblPricingUsageQuantity');
	    var lblUnitListPrice = $('#lblPricingUsageUnitListPrice');
	    var txtUnitActualPrice = $('#lblPricingUsageUnitActualPrice');
	    var lblTotal = $('#lblPricingUsageTotal');
	    var txtNotes = $('#txtPricingNotes');
	    var lblPriceException = $('#lblPricingUsagePriceException');

	    var pricingDetail = $('#caseDetailList_pricing_detail');
	    var catalog = pricingDetail.attr('catalog');
	    var lotCode = pricingDetail.attr('lotCode');
	    var inventoryLoc = pricingDetail.attr('inventoryLoc');
	    var shipToLoc = pricingDetail.attr('shipToLoc');
	    var unitListPrice = pricingDetail.attr('unitListPrice');
	    var unitActualPrice = Number(txtUnitActualPrice.val());
	    var total = Number(lblTotal.html());
	    var priceException = lblPriceException.attr('dataid');

	    if ((!String.isNullOrEmpty(txtCatalog.val()) || !String.isNullOrEmpty(txtLotCode.val())) && !String.isNullOrEmpty(txtQuantity.val()))
	    {
	        new pricing().updateEntryIn(caseId, catalog, lotCode, txtCatalog.val(), txtLotCode.val(), txtQuantity.val(), inventoryLoc, shipToLoc, unitListPrice, unitActualPrice, total, txtNotes.val(), priceException, function()
	        {
	            txtLotCode.val('');
	            txtCatalog.val('');
	            txtQuantity.val('');
	            txtNotes.val('');
	            txtUnitActualPrice.val('');

	            loadPricingUsageEntriesList(caseId, function(total)
	            {
	                $('#lblPricingTotal').attr('total', total);
	            });

	            jQT.goToRight('#caseDetailList_pricing');
	        },
            function()
            {
                $.alert('Error to update entry');
            });
	    }
	});

	$('#btnBackPricingNotes').off().on('tap', function()
	{
	    var pricingDetail = $('#caseDetailList_pricing_detail');
	    pricingDetail.attr('notes', $('#txtPricingNotes').val());

	    jQT.goToRight('#caseDetailList_pricing_detail');
	});

	$('#lblPricingUsageUnitActualPrice').keyup(function()
	{
	    var actualPrice = parseInt($(this).val()) || 0;
	    var quantity = parseInt($('#lblPricingUsageQuantity').val()) || 0;

	    $('#lblPricingUsageTotal').html(actualPrice * quantity);

	    $('#caseDetailList_pricing_detail').attr(
        {
            'unitActualPrice': actualPrice,
            'total': actualPrice * quantity
        });
	});

	$('#txtPricingFreight').keyup(function()
	{
	    var lblPricingTotal = $('#lblPricingTotal');
	    var total = Number(lblPricingTotal.attr('total'));

	    var totalGeneral = total + Number($(this).val());
	    lblPricingTotal.html(totalGeneral || 0);
	});

	
    // Imaging
    // -------------------------------------------------------------------------------------------------------

	$('#lnkCaseDetailListImaging').off().on('tap', function(e)
	{
	    e.stopPropagation();
	    var background = $('#caseDetailList_save_background');
	    var loader = $('#imgLoaderCaseview');
	    background.show();
	    loader.show();
	    
	    if (!$('#ckbAppMode').is(':checked'))
	    {      

	        var caseId = $('#caseDetailList .caseDetailListID').html();
	        imagingFromTheServer(caseId,
                function()
                {
                    if ($('#caseDetailListImaging').hasClass('next'))
                    {

                        new caseView().getPhotoListInfo(caseId, function(photoListInfo)
                        {
                            background.hide();
                            loader.hide();

                            loadPhotoListInfo(photoListInfo);
                            jQT.goToLeft('#caseDetailList_imaging');
                        });
                    }
                },
                function()
                {
                    background.hide();
                    loader.hide();
                }
            );
	    }
	    else
	    {
	    	jQT.goToLeft('#caseDetailList_imaging');
	    }
	});

	$('#lnkCaseDetailListImaginListPreOp').off().on('tap', function(e)
	{
	    e.stopPropagation();
	    if (Number($('#lblCaseDetailListImaginListPreOp').html()) >= 0)
	    {
	    	var background = $('#backgroundImaging');
	        var caseId = $('#caseDetailList .caseDetailListID').html();
	        var category = webOps.database.tables.casePhotoList.categories.PRE_OP;

	        background.show();

	        $('#caseDetailList_imaging_List ul.imagingList').empty();
	        new caseView().getPhotoList(caseId, category, function(photoList)
	        {
	        	set|ut(function()
				{
					background.hide();				
					loadPhotoList('PreOp', photoList);
	            	jQT.goToLeft('#caseDetailList_imaging_List');

				}, 1000);
	            
	        });
	    }
	});

	$('#lnkCaseDetailListImaginListPostOp').off().on('tap', function(e)
	{
	    e.stopPropagation();
	    if (Number($('#lblCaseDetailListImaginListPostOp').html()) >= 0)
	    {
	    	var background = $('#backgroundImaging');
	        var caseId = $('#caseDetailList .caseDetailListID').html();
	        var category = webOps.database.tables.casePhotoList.categories.POST_OP;

	        background.show();

	        $('#caseDetailList_imaging_List ul.imagingList').empty();
	        new caseView().getPhotoList(caseId, category, function(photoList)
	        {
	        	setTimeout(function()
				{
					background.hide();				
					loadPhotoList('PostOp', photoList);
	            	jQT.goToLeft('#caseDetailList_imaging_List');

				}, 1000);
	            
	        });
	    }
	});
	
	//$('#caseDetailList_imaging_List ul.imagingList li > a').live('tap', function(e)
	//{
	//    /*if (implementTapReady())
	//        return false;*/

	//    var photoID = $(this).attr('dataid');
	//    var photoName = $(this).find('.tdName').text();
	//    var img = $(this).find('img').clone();

	//    $('#lblCaseDetailListImagingViewName').html(photoName);
	//    $('#caseDetailList_imaging_view .imageView').append(img);

	//    jQT.goToLeft('#caseDetailList_imaging_view');
    //});

	$('#caseDetailList_imaging_List ul.imagingList li > a').live('tap', function(e)
	{
	    var photoID = $(this).attr('dataid');
	    var photoName = $(this).find('.tdName').text();
	    var caseId = $('#caseDetailList .caseDetailListID').html();

	    if ($('#lblCaseDetailListImagingListTitle').text() == 'PreOp')
	    {
	        loadPreop();
	        console.log('loadPreop');
	    }
	    else
	    {
	        loadPopOp();
	        console.log('loadPostOp');
	    }

	    //var img = $(this).find('img').clone();

	    $('#lblCaseDetailListImagingViewName').html(photoName);
	    //$('#caseDetailList_imaging_view ul.imageView').append(img);
	    function loadPreop()
	    {
	        var category = webOps.database.tables.casePhotoList.categories.PRE_OP;
	        $('#caseDetailList_imaging_view ul.slides').empty();
	        new caseView().getPhotoList(caseId, category, function(photoList)
	        {
	            //$('.flexslider').flexslider();
	            loadPhotoListView('PreOp', photoList);
	            jQT.goToLeft('#caseDetailList_imaging_view');
	        });
	    }

	    function loadPopOp()
	    {
	        var category = webOps.database.tables.casePhotoList.categories.POST_OP;
	        $('#caseDetailList_imaging_view ul.slides').empty();
	        new caseView().getPhotoList(caseId, category, function(photoList)
	        {
	            //$('.flexslider').flexslider();
	            loadPhotoListView('PostOp', photoList);
	            jQT.goToLeft('#caseDetailList_imaging_view');
	        });
	    }
	});

	$('#btnBackImagingView').off().on('tap', function()
	{
	    $('#caseDetailList_imaging_view .imageView').empty();
	    jQT.goToRight('#caseDetailList_imaging_List');
	});

	$('#addImage').off().on('tap', function(e)
	{

	    e.preventDefault();
	    var sourceType = (device.platform == "Android")
                         ? navigator.camera.PictureSourceType.PHOTOLIBRARY
                         : navigator.camera.PictureSourceType.CAMERA;

	    navigator.camera.getPicture
        (
            function(imageData)
	        {
                //var base64 = String.format('data:image/jpeg;base64,{0}', imageData);
                var base64 = imageData;
                var data = encodeURIComponent(base64);
	            //$.alert(base64);

	            var caseId = $('.caseDetailListID').html();
	            var categoryId = ($('#lblCaseDetailListImagingListTitle').text() == 'PreOp') ? webOps.database.tables.casePhotoList.categories.PRE_OP : webOps.database.tables.casePhotoList.categories.POST_OP;

	            new caseDetailFull().updatePhoto(caseId, categoryId, data, function(message)
	            {
	                if (message) $.alert(message);
	                else $.alert('Upload photo successful.');
	                loadImagesCapture();
	            });
	        },
            function(message)
	        {
	            $.alert(message);
	        },
            {
	            quality: 500,
	            targetWidth: 300,
	            targetHeight: 300,
	            encodingType: Camera.EncodingType.JPG,
	            destinationType: navigator.camera.DestinationType.DATA_URL,
	            sourceType: sourceType
            }
        );
	});

	function loadImagesCapture()
	{
			var caseId = $('#caseDetailList .caseDetailListID').html();
	        imagingFromTheServer(caseId,
                function()
                {
                    new caseView().getPhotoListInfo(caseId, function(photoListInfo)
                    {
                        loadPhotoListInfo(photoListInfo);
                    });
                    
                },
                function()
                {
                    //background.hide();
                    //loader.hide();
                }
            );
	    


			if ($('#lblCaseDetailListImagingListTitle').html() == "PreOp")
			{
				var caseId = $('#caseDetailList .caseDetailListID').html();
				var category = webOps.database.tables.casePhotoList.categories.PRE_OP;	

				$('#caseDetailList_imaging_List ul.imagingList').empty();
				new caseView().getPhotoList(caseId, category, function(photoList)
				{

				//alert('Lista de imágenes 1');
					loadPhotoList('PreOp', photoList);
					jQT.goToRight('#caseDetailList_imaging');
					backImgingList();	
				});
				}
				else
				{
				var caseId = $('#caseDetailList .caseDetailListID').html();
				var category2 = webOps.database.tables.casePhotoList.categories.POST_OP;	

				$('#caseDetailList_imaging_List ul.imagingList').empty();
				new caseView().getPhotoList(caseId, category2, function(photoList)
				{	
					loadPhotoList('PostOp', photoList);
					jQT.goToRight('#caseDetailList_imaging');
					backImgingList();	
				});
			}
	}

	function backImgingList()
	{

		//alert('Back Imaging');
		jQT.goToRight('#caseDetailList_imaging_List');
	}

    // ==========================================================================================================================
    // Post A Case
    // ==========================================================================================================================

	$('#postACase').bind('pageAnimationEnd', function(event, info)
	{
	    $('#btnCaseDetailListBack').attr('href', '#postACase');
	    $('#btnCaseDetailListSaveCaseView').hide();
	    $('#btnCaseDetailListSavePostACase').show();
	});

	$('#lnkPostACaseLoanerCase').off().on('tap', function(e)
	{
	    e.preventDefault();
	    postACaseValidation($(this).find('label').html(), 0, ['New']);
	});

	$('#lnkPostACaseInfoCase').off().on('tap', function(e)
	{
	    e.preventDefault();
	    postACaseValidation($(this).find('label').html(), 6, ['Reconciled']);
	});

	function postACaseValidation(caseType, statusPosition, status)
	{
	    try
	    {
	        clearCaseViewDetail();
	        $('label.caseDetailListID').html('0');
	        $('#lblCaseDetailListCaseType').html(caseType);

	        $('#caseDetailListAssignedKits').removeClass('next').hide().find('a').removeAttr('href').addClass('disabled');
	        $('#caseDetailListUsage').removeClass('next').hide().find('a').removeAttr('href').addClass('disabled');
	        $('#caseDetailListPricing').removeClass('next').hide().find('a').removeAttr('href').addClass('disabled');
	        $('#caseDetailListImaging').removeClass('next').hide().find('a').removeAttr('href').addClass('disabled');

	        var statusList = $('#caseDetailList_status ul.rounded li');
	        statusList.hide();
	        conditionLoadStatus(statusList, status);

	        var statusLI = statusList.eq(statusPosition);
	        if (statusLI.length > 0)
	        {
	            statusLI.addClass('selected');

	            var statusDes = statusLI.find('label').html();
	            var statusID = statusLI.find('a').attr('dataid');
	            $('#lblCaseDetailListStatus').html(statusDes).attr('dataid', statusID);
	        }

	        var salesRepLI = $('#caseDetailList_salesRep ul.rounded li').eq(0);
	        if (salesRepLI.length > 0)
	        {
	            salesRepLI.addClass('selected');

	            var salesRepDes = salesRepLI.find('label').html();
	            var salesRepID = salesRepLI.find('a').attr('dataid');
	            $('#lblCaseDetailListSalesRep').html(salesRepDes).attr('dataid', salesRepID);
	        }


			if ($('#lblCaseDetailListStatus').html() == 'Reconciled')
	        {
	        	console.log('Validacion usage');
	        	$('#caseDetailListUsage').addClass('next').show().find('a').removeClass('disabled').attr('href','#caseDetailList_usage');
	        }

	        $('#caseDetailList_imaging_view ul.slides').empty();
	        jQT.goToLeft('#caseDetailList');
	    }
	    catch (ex)
	    {
	        $.alert(ex.message);
	    }
	}

	$('#btnCaseDetailListSavePostACase').off().on('tap', function(e)
	{
	    e.preventDefault();
	    $('#caseDetailList_save_background').show();
	    $('#caseDetailList_save').slideDown();
	});

	$('#btnCaseDetailListCancel').off().on('tap', function(e)
	{
	    e.preventDefault();
	    $('#caseDetailList_save').slideUp();
	    $('#caseDetailList_save_background').hide();
	});

	$('#btnCaseDetailListSaveAndPostOther').off().on('tap', function(e)
	{
	    e.preventDefault();
	    saveDates();

	    var background = $('#caseDetailList_save_background');
	    var imgLoaderView = $('#imgLoaderCaseview');

	    imgLoaderView.show();
	    background.show();

	    saveCaseViewDetail('#postACase', function()
	    {
	        $('#btnCaseDetailListCancel').tap();
	        imgLoaderView.hide();
	        background.hide();
	    });
	});

	$('#btnCaseDetailListSaveAndViewCases').off().on('tap', function(e)
	{
	    e.preventDefault();
	    saveDates();

		var background = $('#caseDetailList_save_background');
		var imgLoaderView = $('#imgLoaderCaseview');

		imgLoaderView.show();
		background.show();

		saveCaseViewDetail('#caseView', function()
		{
		    $('#btnCaseDetailListCancel').tap();
		    imgLoaderView.hide();
		    background.hide();
		});
	});


    // ==========================================================================================================================
    // Inventory Count
    // ==========================================================================================================================

	$('#inventoryCount ul li > a').live('click', function(e)
    {
	    /*if (implementTapReady())
	        return false;*/

	    var hospitalID = $(this).attr('hospitalid');
	    var hospitalName = $(this).attr('hospitalname');

	    $('#inventoryCount_newEntry').attr({ 'hospitalid': hospitalID, 'hospitalname': hospitalName });
	    jQT.goToLeft('#inventoryCount_newEntry');
	});

	$('#inventoryCount_newEntry').bind('pageAnimationEnd', function(event, info)
	{
	    if (info.direction == 'in')
	    {
	    	$("#txtInventoryCountCatalog").focus();
	        var hospitalID = $('#inventoryCount_newEntry').attr('hospitalid');
	        var hospitalName = $('#inventoryCount_newEntry').attr('hospitalname');

	        $('#inventoryCount_newEntry header > h1').html(String.format('{0}', hospitalName));

	        loadInventoryCountEntries(hospitalID);
	    }
	    else if (info.direction == 'out')
	    {
	        //$(this).removeAttr('hospital');
	    }
	});

	$('#btnInventoryCountSubmit').off().on('tap', function()
	{
	    /*if (implementTapReady())
	        return false;*/

	    var hospitalID = $('#inventoryCount_newEntry').attr('hospitalid');
	    var txtCatalog = $('#txtInventoryCountCatalog');
	    var txtLotCode = $('#txtInventoryCountLotCode');
	    var txtCatalogHidden = $('#txtInventoryCountCatalogHidden');
	    var txtLotCodeHidden = $('#txtInventoryCountLotCodeHidden');

	    var catalog = txtCatalog.val();
	    var lotCode = txtLotCode.val();

	    if (!String.isNullOrEmpty(txtCatalogHidden.val()) || !String.isNullOrEmpty(txtLotCodeHidden.val()))
	    {
	        catalog = txtCatalogHidden.val();
	        lotCode = txtLotCodeHidden.val();
	    }

	    if (!String.isNullOrEmpty(catalog) || !String.isNullOrEmpty(lotCode))
	    {
	        new inventoryCount().saveNewEntry(hospitalID, catalog, lotCode, function()
	        {
	            txtCatalogHidden.val('');
	            txtLotCodeHidden.val('');
	            txtLotCode.val('');
	            txtCatalog.val('').focus();

	            loadInventoryCountEntries(hospitalID);
	        },            
            function()
            {
                $.alert('Error to save new entry');
            });
	    }
	});

	$('#txtInventoryCountCatalog').keyup(function()
	{
	    testString();
	    
	});

	$('#txtInventoryCountLotCode').off().keyup(function()
	{
	    testString();
	});
	
	$('#lnkDeleteAllEntries').off().on('tap', function()
	{
	    /*if (implementTapReady())
	        return false;*/
	    var background = $('#inventoryCount_newEntry_background');
	    var hospitalID = $('#inventoryCount_newEntry').attr('hospitalid');

	    $.confirm('Tap Ok to clear all Inventory entries for the Hospital.', function()
	    {
	        background.show();
	        new inventoryCount().removeByHospital(hospitalID,
	            function()
	            {
	                background.hide();
	                $('#ulInventoryCountCatalogs').empty();
	            },
	            function()
	            {
	                $.alert('Fail to remove all inventory entries.');
	                background.hide();
	            }
            );
	    });
	});

	$('#ulInventoryCountCatalogs li > a').live('click', function(e)
	{
	    /*if (implementTapReady())
	        return false;*/
	    var background = $('#inventoryCount_newEntry_background');
	    var hospitalID = $('#inventoryCount_newEntry').attr('hospitalid');
	    var hospitalName = $('#inventoryCount_newEntry').attr('hospitalname');
	    var catalog = $(this).find('span[role=catalog]').html();
	    var lotCode = $(this).find('span[role=lotCode]').html();
	    var quantity = $(this).find('span[role=quantity]').html();
	    var committedToServer = $(this).find('span[role=committedToServer]').html();

	    background.show(); 

	    if (committedToServer == 'Yes') $('#saveInventoryCatalog').hide();
	    else $('#saveInventoryCatalog').show();

	    $('#inventoryCount_newEntry_catalog').attr({ 'hospitalid': hospitalID, 'hospitalname': hospitalName, 'catalog': catalog, 'lotCode': lotCode, 'quantity': quantity, 'committedToServer': committedToServer });
	    setTimeout(function()
	    {
	        background.hide();
	        jQT.goToLeft('#inventoryCount_newEntry_catalog');
	    }, 200);
	});

	$('#inventoryCount_newEntry_catalog').bind('pageAnimationEnd', function(event, info)
	{
	    if (info.direction == 'in')
	    {
	    	var lblCatalog = $('#lblInventoryCatalog');
		    var lblLotCode = $('#lblInventoryCountLotCode');
		    var lblQuantity = $('#lblInventoryCountQuantity');
		    var lblInventoryCountCommittedToServer = $('#lblInventoryCountCommittedToServer');
		    var inventoryCountNewEntryCatalog = $('#inventoryCount_newEntry_catalog');

	        var hospitalID = inventoryCountNewEntryCatalog.attr('hospitalid');
	        var hospitalName = inventoryCountNewEntryCatalog.attr('hospitalname');
	        var catalog = inventoryCountNewEntryCatalog.attr('catalog');
	        var lotCode = inventoryCountNewEntryCatalog.attr('lotCode');
	        var quantity = inventoryCountNewEntryCatalog.attr('quantity');
	        var committedToServer = inventoryCountNewEntryCatalog.attr('committedToServer');

	        inventoryCountNewEntryCatalog.find('header > h1').html(String.format('{0}', hospitalName));
	        loadInventoryCountEntry(catalog, lotCode, quantity, committedToServer);

	        if ($('#lblInventoryCountCommittedToServer').html() === 'Yes')
	        {
	            lblQuantity.attr('readonly', 'readonly');
	            lblLotCode.attr('readonly', 'readonly');
	            lblCatalog.attr('readonly', 'readonly');
	            $('#saveInventoryCatalog').hide();
	        }
	        else
	        {
	            lblQuantity.removeAttr('readonly');
	            lblLotCode.removeAttr('readonly');
	            lblCatalog.removeAttr('readonly');
	            $('#saveInventoryCatalog').show();
	        }
	    }
	});
	
	$('#lnkDeleteSingleEntry').off().on('tap', function ()
	{
	    /*if (implementTapReady())
	        return false;*/

	    var background = $('#inventoryCount_newEntry_catalog_background');
	    var inventoryCountNewEntryCatalog = $('#inventoryCount_newEntry_catalog');
	    var hospitalID = inventoryCountNewEntryCatalog.attr('hospitalid');
	    var catalog = inventoryCountNewEntryCatalog.attr('catalog');
	    var lotCode = inventoryCountNewEntryCatalog.attr('lotCode');

	    $.confirm('Tap Ok to remove this Inventory entry.', function()
	    {
	        background.show();
	        new inventoryCount().removeByEntry(hospitalID, catalog, lotCode,
                function()
                {
                    $('#lblInventoryCatalog').val('');
                    $('#lblInventoryCountLotCode').val('');
                    $('#lblInventoryCountQuantity').val('');
                    $('#lblInventoryCountCommittedToServer').html('');

                    loadInventoryCountEntries(hospitalID);

                    background.hide();
                    jQT.goToRight('#inventoryCount_newEntry');
                },
                function()
                {
                    $.alert('Fail to remove entry.');
                    background.hide();
                }
            );
	    });
	});

	$('#saveInventoryCatalog').off().on('tap', function()
    {
    	var hospitalID = $('#inventoryCount_newEntry_catalog').attr('hospitalid');
	    var txtCatalog = $('#lblInventoryCatalog');
	    var txtLotCode = $('#lblInventoryCountLotCode');
	    var txtQuantity = $('#lblInventoryCountQuantity');

	    var inventoryCountNewEntryCatalog = $('#inventoryCount_newEntry_catalog');
	    var catalog = inventoryCountNewEntryCatalog.attr('catalog');
	    var lotCode = inventoryCountNewEntryCatalog.attr('lotCode');

	    if ((!String.isNullOrEmpty(txtCatalog.val()) || !String.isNullOrEmpty(txtLotCode.val())) && !String.isNullOrEmpty(txtQuantity.val()) )
	    {
	        new inventoryCount().updateEntryIn(hospitalID, catalog, lotCode, txtCatalog.val(), txtLotCode.val(), txtQuantity.val(), function()
	        {
	            txtLotCode.val('');
	            txtCatalog.val('');
	            txtQuantity.val('');
	        	jQT.goToRight('#inventoryCount_newEntry');
	        },            
            function()
            {
                $.alert('Error to update entry');
            });
	    }
    });
    
    $('#inventoryCountCommit').off().on('tap', function()
    {
        if (!$('#ckbAppMode').is(':checked'))
        {
            var background = $('#inventoryCount_newEntry_background');
        	var hospitalID = $('#inventoryCount_newEntry').attr('hospitalid');

            background.show();
            new inventoryCount().syncToServer(hospitalID, function(message)
            {
                loadInventoryCountEntries(hospitalID);
                if (message && message.length > 0) $.alert(message);

                background.hide();
            });
        }
    });

    // ==========================================================================================================================
    // Manual Sync
    // ==========================================================================================================================
    
    $('#manualSync').bind('pageAnimationEnd', function(event, info)
    {
        if (info.direction == 'in')
        {
            setTimeout(function()
            {
                manualSync(
                    function()
                    {
                        jQT.goToRight('#home');
                    },
                    function()
                    {
                        jQT.goToRight('#home');
                    }
                );
            }, 500);
        }
    });

    // ==========================================================================================================================
    // Settings
    // ==========================================================================================================================

    $('#lnkSettingsResetEverythingThenSync').off().on('tap', function(e)
    {
        e.preventDefault();
        var isOnline = !$('#ckbAppMode').is(':checked');

        var background = $('#settings_localStorage_background');
        background.show();

        new settings().resetEverythingAllData(isOnline, false, function()
        {
            $('#lblCustomer').html('');
            background.hide();

            if (isOnline)
            {
                $('#loadingCaseFromTheServer').attr(
                {
                    'page': '#settings_localStorage',
                    'pageError': '#settings_localStorage'
                });

                jQT.goToLeft('#loadingCaseFromTheServer');
            }
        });
    });

    $('#lnkSettingsResetEverythingThenLogout').off().on('tap', function(e)
    {
        e.preventDefault();
        var isOnline = false;//!$('#ckbAppMode').is(':checked');

        var background = $('#settings_localStorage_background');
        background.show();

        new settings().resetEverythingAllData(isOnline, true, function()
        {
            $('#lblCustomer').html('');
            background.hide();

            //if (isOnline)
            //{
            //    $('#loadingCaseFromTheServer').attr(
            //    {
            //        'page': '#login',
            //        'pageError': '#settings_localStorage'
            //    });

            //    jQT.goToLeft('#loadingCaseFromTheServer');
            //}
            //else jQT.goToLeft('#login');
            jQT.goToLeft('#login');
        });
    });

    $('#settings_scannerParsing').bind('pageAnimationEnd', function(event, info)
    {
        if (info.direction == 'in')
        {

            if ($('#lbScanner').text() == 'Default')
            {
                $('#settings_scannerParsing ul.rounded li').eq(0).addClass('selected');
            }
            else
            {
                $('#settings_scannerParsing ul.rounded li').eq(0).removeClass('selected');
            }

            var id = $('#lbScanner').attr('dataid');
            //$(String.format('#settings_scannerParsing ul.rounded li > a[dataid={0}]', id)).parent().addClass('selected');
        }
        else if (info.direction == 'out')
        {
            //$('#caseDetailList_usage_inventoryLocation ul.rounded li').removeClass('selected');
        }
    });

    $('#settings_scannerParsing ul.rounded li a').live('tap', function(e)
    {
        e.stopPropagation();

        $('#settings_scannerParsing ul.rounded li').removeClass('selected');
        $(this).parent().addClass('selected');

        var id = $(this).attr('dataid');
        var name = $(this).find('label').html();

        $('#lbScanner').attr('dataid', id).html(name);
        jQT.goToRight('#settings');
    });
}

// ----------------------------------------------------------------------------------------------------------------------------------------------------

function checkboxToggle(anchor, data)
{
    var _this = anchor;
    var div = _this.find('div');
    var checkbox = _this.find('input[type="checkbox"]');

    var oldClass = div.attr('class');
    var check = '';

    if (checkbox.is(':checked'))
    {
        checkbox.removeAttr('checked');
        check = 'unchecked';
    }
    else
    {
        checkbox.attr('checked', true);
        check = 'checked';
    }

    var newClass = String.format('{0}-{1}', oldClass.substr(0, oldClass.lastIndexOf('-')), check);
    div.removeClass(oldClass).addClass(newClass);

    checkbox.trigger('change', data);
}


function loadCustomers()
{
    var ul = $('#ulCustomerSelect');
    ul.empty();

    var li = '<li class="{1}"><a href="#">{0}</a></li>';
    var customerSelected = new customerSelect().getSelectedCustomer();

    new customerSelect().get(function(customers)
    {
        for (var i = 0; i < (customers || []).length; i++)
        {
            var customer = customers[i].customer;
            var customerInfo = li.format
            (
                customer,
                ((customer == customerSelected) ? 'selected' : '')
            );

            ul.append($(customerInfo));
        }
    });
}

function loadUserData()
{
    var currentSessionObj = new currentSession().get();
    $('.customerFooter H1').html(currentSessionObj.customer);

    if (currentSessionObj != null)
    {
        loadSettings();
        loadListCaseView();
    }
    else
    {
        logout();
        jQT.goToRight('#login');
    }
}

function loadSetUp()
{
    var setUpData = new setUp().get();
    if (setUpData && !$.isEmptyObject(setUpData))
    {
        if (setUpData.caseDownloadsAll) checkboxToggle($('#ckbCaseDownloads').parents('.checkbox'));
        if (setUpData.appModeOffLine)
        {
            checkboxToggle($('#ckbAppMode').parents('.checkbox'));
            checkboxToggle($('#ckbAppModeSettings').parents('.checkbox'));
        }
    }
    else
    {
        new setUp().set(false, false);
    }
}

function loadSettings(userId)
{
    new settings().get(function(settingsInfo)
    {
        if (settingsInfo)
        {
            $('#lblSettingsUserName').html(settingsInfo.userName);
            $('#lblSettingsCustomer').html(settingsInfo.customer);

            $('#lblSettingsProductSystemCategories').html(settingsInfo.prodSystemCats);
            $('#lblSettingsProductSystems').html(settingsInfo.productSystems);
            $('#lblSettingsUserRoles').html(settingsInfo.userRoles);
            $('#lblSettingsCaseStatusCodes').html(settingsInfo.caseStatusCodes);
            $('#lblSettingsKitStatusCodes').html(settingsInfo.kitStatusCodes);
            $('#lblSettingsPriceExceptionCodes').html(settingsInfo.priceExceptionCodes);
            $('#lblSettingsWarehouseAddresses').html(settingsInfo.warehouseAddresses);
            $('#lblSettingsWarehouses').html(settingsInfo.warehouses);
            $('#lblSettingsSalesReps').html(settingsInfo.salesReps);
            $('#lblSettingsHospitals').html(settingsInfo.hospitals);
            $('#lblSettingsPhysicians').html(settingsInfo.physicians);
            $('#lblSettingsProcedures').html(settingsInfo.procedures);
            $('#lblSettingsCases').html(settingsInfo.cases);
        }
    });
}

function saveDates(dateStart, dateEnd)
{
    //if ($('.dateStart').html().length == 0)
    if (dateStart == null && dateEnd == null)
    {
        var currentDay = parseInt(moment().format('d'));

        // si es sabado (dia # 6)
        if (currentDay == 6)
        {
            dateStart = moment();
            dateEnd = moment().add('d', 8);
        }
        else
        {
            var subtract = (currentDay + 1),
            temp = moment().subtract('d', subtract);

            dateStart = temp;
            dateEnd = moment(temp).add('d', 8);
        }        
    }

    if (dateStart && dateEnd)
    {
        $('.dateStart').attr('date', String.format('{0}0000', dateStart.format('YYYYMMDD'))).html(dateStart.format('ddd, MMM DD'));
        $('.dateEnd').attr('date', String.format('{0}2359', dateEnd.format('YYYYMMDD'))).html(dateEnd.format('ddd, MMM DD'));
    }
}

function loadListCaseView()
{
    //------------------------------------------------------------------------------------------

    var ul_caseDetailList_status = $('#caseDetailList_status ul');
    ul_caseDetailList_status.empty();

    new caseView().getCaseStatusCodes(function(data)
    {
        var li = '<li><a href="#" dataid="{0}"><label>{1}</label></a></li>'
        for (var i = 0; i < (data || []).length; i++)
        {
            var dataItem = data[i];
            var dataItemInfo = li.format(dataItem.id, dataItem.name);

            ul_caseDetailList_status.append($(dataItemInfo));
        }
    });

    //------------------------------------------------------------------------------------------

    var ul_caseDetailList_salesRep = $('#caseDetailList_salesRep ul');
    ul_caseDetailList_salesRep.empty();

    new caseView().getSalesReps(function(data)
    {
        var li = '<li><a href="#" dataid="{0}"><label>{1}</label></a></li>'
        for (var i = 0; i < (data || []).length; i++)
        {
            var dataItem = data[i];
            var dataItemInfo = li.format(dataItem.salesRepID, dataItem.salesRepName);

            ul_caseDetailList_salesRep.append($(dataItemInfo));
        }
    });

    //------------------------------------------------------------------------------------------

    var ul_caseDetailList_hospital = $('#caseDetailList_hospital ul');
    ul_caseDetailList_hospital.empty();

    new caseView().getHospitals(function(data)
    {
        var li = '<li><a href="#" dataid="{0}"><label>{1}</label></a></li>'
        for (var i = 0; i < (data || []).length; i++)
        {
            var dataItem = data[i];
            var dataItemInfo = li.format(dataItem.id, dataItem.name);

            ul_caseDetailList_hospital.append($(dataItemInfo));
        }
    });

    //------------------------------------------------------------------------------------------

    var ul_caseDetailList_physician = $('#caseDetailList_physician ul');
    ul_caseDetailList_physician.empty();

    new caseView().getPhysicians(function(data)
    {
        var li = '<li><a href="#" dataid="{0}"><label>{1}</label></a></li>'
        for (var i = 0; i < (data || []).length; i++)
        {
            var dataItem = data[i];
            var dataItemInfo = li.format(dataItem.id, dataItem.fullName);

            ul_caseDetailList_physician.append($(dataItemInfo));
        }
    });

    //------------------------------------------------------------------------------------------

    var ul_caseDetailList_procedure = $('#caseDetailList_procedure ul');
    ul_caseDetailList_procedure.empty();

    new caseView().getProcedures(function(data)
    {
        var li = '<li><a href="#" dataid="{0}" dataproductcatids="{2}"><label>{1}</label></a></li>'
        for (var i = 0; i < (data || []).length; i++)
        {
            var dataItem = data[i];
            var dataItemInfo = li.format(dataItem.id, dataItem.name, dataItem.productSystemCategoryIDs);

            ul_caseDetailList_procedure.append($(dataItemInfo));
        }
    });

    //------------------------------------------------------------------------------------------

    var ul_caseDetailList_productsSystemsCategory = $('#caseDetailList_productsSystemsCategory ul');
    ul_caseDetailList_productsSystemsCategory.empty();

    new caseView().getProdSystemCats(function(data)
    {
        var li = '<li class="next"><a href="#" dataid="{0}" dataproducts="{2}" dataproductsselected=""><label>{1}</label>&nbsp;<span></span></a></li>'
        for (var i = 0; i < (data || []).length; i++)
        {
            var dataItem = data[i];
            var dataItemInfo = li.format(dataItem.id, dataItem.name, dataItem.productSystemIDs);

            ul_caseDetailList_productsSystemsCategory.append($(dataItemInfo));
        }
    });

    //------------------------------------------------------------------------------------------

    var ulCaseViewViewBy = $('#ulCaseViewViewBy');
    ulCaseViewViewBy.find('li.temporal').remove();

    new caseView().getSalesRepsOthers(function(data, salesRepId)
    {
        var liCurrent;
        var li = '<li class="temporal"><a href="#" viewBy="{0}"><label>{1}</label></a></li>';
        for (var i = 0; i < (data || []).length; i++)
        {
            var dataItem = data[i];
            var dataItemInfo = li.format(dataItem.salesRepID, dataItem.salesRepName);
            var dataLI = $(dataItemInfo);
            ulCaseViewViewBy.append(dataLI);

            if (salesRepId == dataItem.salesRepID)
                liCurrent = dataLI;
        }

        if (liCurrent)
        {
            liCurrent.insertAfter(ulCaseViewViewBy.find('li').eq(0));
        }
    });

    //------------------------------------------------------------------------------------------

    var ulUsageInventoryLocation = $('#caseDetailList_usage_inventoryLocation ul');
    ulUsageInventoryLocation.empty();

    var ulUsageInventoryLoc = $('#caseDetailList_usage_list_inventoryLocation ul');
    ulUsageInventoryLoc.empty();

    new usage().getReplenishTo(function(data)
    {
        var li = '<li style="height:14px"><a href="#" dataid="{0}"><label>{1}</label></a></li>'
        for (var i = 0; i < (data || []).length; i++)
        {
            var dataItem = data[i];
            if(dataItem.shipTo == '1')
            {
            	var dataItemInfo = li.format(dataItem.id, dataItem.name);
            }
            else
            {
            	var dataItemInfo = li.format(dataItem.id, dataItem.html(''))
            }

            ulUsageInventoryLocation.append($(dataItemInfo));
            ulUsageInventoryLoc.append($(dataItemInfo));
        }
    });

    //------------------------------------------------------------------------------------------

    var ulUsageShipToLocation = $('#caseDetailList_usage_shipToLocation ul');
    ulUsageShipToLocation.empty();

    var ulUsageShipToLoc = $('#caseDetailList_usage_list_shipToLocation ul');
    ulUsageShipToLoc.empty();

    new usage().getShipTo(function(data)
    {
        var li = '<li style="height:14px"><a href="#" dataid="{0}"><label>{1}</label></a></li>'
        for (var i = 0; i < (data || []).length; i++)
        {
            var dataItem = data[i];
            if(dataItem.shipTo == '1')
            {
            	var dataItemInfo = li.format(dataItem.id, dataItem.name);
            }
            else
            {
            	var dataItemInfo = li.format('')
            }

            ulUsageShipToLocation.append($(dataItemInfo));
            ulUsageShipToLoc.append($(dataItemInfo));
        }
    });

    //------------------------------------------------------------------------------------------

    var ulPricingPriceException = $('#caseDetailList_pricing_detail_priceException ul');
    ulPricingPriceException.empty();

    new pricing().getPriceException(function(data)
    {
        var li = '<li><a href="#" dataid="{0}"><label>{1}</label></a></li>'
        for (var i = 0; i < (data || []).length; i++)
        {
            var dataItem = data[i];
            var dataItemInfo = li.format(dataItem.id, dataItem.name);

            ulPricingPriceException.append($(dataItemInfo));
        }
    });
}

function loadCaseViewDetailProductSystems(productsSystems, productsSystemsSelected)
{
    var ul = $('#ulProductSystemsAvaliable');
    var li = '<li><a href="#" dataid="{0}"><label>{1}</label></a></li>'

    for (var i = 0; i < (productsSystems || []).length; i++)
    {
        var productSystemsItem = productsSystems[i];
        var productSystemsItemInfo = li.format(productSystemsItem.id, productSystemsItem.name);

        ul.append($(productSystemsItemInfo));
    }

    var products = productsSystemsSelected.split(',') || [];
    for (var i = 0; i < products.length; i++)
    {
        var product = products[i];
        ul.find(String.format('a[dataid={0}]', product)).trigger('tap');
    }
}

function loadAssignedKits(assignedKits)
{
    var ul = $('#caseDetailList_assignedKits ul.rounded');
    var li = '<li class="next"><a href="#" dataid="{0}"><label>{1}</label></a></li>'

    for (var i = 0; i < (assignedKits || []).length; i++)
    {
        var assignedKitsItem = assignedKits[i];
        var assignedKitsItemInfo = li.format(assignedKitsItem.id, assignedKitsItem.name);

        ul.append($(assignedKitsItemInfo));
    }
}

function loadAssignedKitsInUsage(assignedKits)
{
    var ul = $('#ulUsageAssignedKitsAvailableKits');
    var li = '<li><a href="#" dataid="{0}"><label>{1}</label></a></li>'

    for (var i = 0; i < (assignedKits || []).length; i++)
    {
        var assignedKitsItem = assignedKits[i];
        var assignedKitsItemInfo = li.format(assignedKitsItem.id, assignedKitsItem.name);

        ul.append($(assignedKitsItemInfo));
    }
}

function loadKitItems(assignedKitsName, kitItems)
{
    $('#lblCaseDetailListAssignedKits').html(assignedKitsName);
    var ul = $('#caseDetailList_assignedKits_detail ul.rounded');
    var li = '<li><label>{0}<br/>{1}</label></li>'

    for (var i = 0; i < (kitItems || []).length; i++)
    {
        var kitItemsItem = kitItems[i];
        var kitItemsItemInfo = li.format(kitItemsItem.catNum, kitItemsItem.desc);

        ul.append($(kitItemsItemInfo));
    }
}

function loadKitItemsInUsage(assignedKitsName, kitItems)
{
    //$('#lblCaseDetailListAssignedKits').html(assignedKitsName);
    var ul = $('#caseDetailList_usage_assignedKits_detail ul.rounded');
    var li = '<li><label>{0}<br/>{1}</label></li>'

    for (var i = 0; i < (kitItems || []).length; i++)
    {
        var kitItemsItem = kitItems[i];
        var kitItemsItemInfo = li.format(kitItemsItem.catNum, kitItemsItem.desc);

        ul.append($(kitItemsItemInfo));
    }
}

function loadPhotoListInfo(photoListInfo)
{
    function getCountByCategory(category)
    {
        var count = 0;
        for (var i = 0; i < photoListInfo.length; i++)
        {
            photoListInfoData = photoListInfo[i];
            if (category == photoListInfoData.category)
            {
                count = photoListInfoData.count;
                break;
            }
        }

        return count;
    }

    $('#lblCaseDetailListImaginListPreOp').html(getCountByCategory(webOps.database.tables.casePhotoList.categories.PRE_OP));
    $('#lblCaseDetailListImaginListPostOp').html(getCountByCategory(webOps.database.tables.casePhotoList.categories.POST_OP));
}

function loadPhotoList(title, photoList)
{
	//alert('Cargando Lista Imagines');
	imgLenght = photoList.length;
    $('#lblCaseDetailListImagingListTitle').html(title);
    $('#lblCaseDetailListImagingViewTitle').html(title);

    var ul = $('#caseDetailList_imaging_List ul.imagingList');
    var li =
        '<li> \
            <a href="#" dataid="{0}"> \
                <table> \
                    <tr> \
                        <td class="tdImage"> \
                            <div> \
                                <img src="data:image;base64,{1}" /> \
                            </div> \
                        </td> \
                    </tr> \
                    <tr> \
                        <td class="tdName">{2}</td> \
                    </tr> \
                </table> \
            </a> \
        </li>';

    for (var i = 0; i < (photoList || []).length; i++)
    {
        var photoListItem = photoList[i];
        var photoListItemInfo = li.format
        (
            photoListItem.photoID,
            photoListItem.photoData,
            photoListItem.photoID
        );

        ul.append($(photoListItemInfo));
    }
}

var imgLenght;

function loadPhotoListView(title, photoList)
{
    $('#lblCaseDetailListImagingListTitle').html(title);
    $('#lblCaseDetailListImagingViewTitle').html(title);

    var ul = $('#caseDetailList_imaging_view ul.slides');
    var li = '<li><img src="data:image;base64,{1}" /></li>';

    for (var i = 0; i < (photoList || []).length; i++)
    {
        var photoListItem = photoList[i];
        var photoListItemInfo = li.format
        (
            photoListItem.photoID,
            photoListItem.photoData,
            photoListItem.photoID
        );

        ul.append($(photoListItemInfo));
        arrowsFunction();
        //$('.flexslider').flexslider();
    }
}

function getCaseView(filter, onComplete)
{
    var ul = $('#caseView ul');
    ul.empty();

    new caseViewSort().get
    (
        function(caseViewSort)
        {
            caseViewSort = (caseViewSort || {});
            caseViewGetList(caseViewSort.sortBy, caseViewSort.viewBy);
        },
        function() { caseViewGetList(); }
    );

    function caseViewGetList(sortBy, viewBy)
    {
        if (sortBy) $(String.format('#sortCaseBy ul.rounded:first li:last a[sortBy={0}]', sortBy)).parent().addClass('selected');
        else $('#sortCaseBy ul.rounded:first li:last').addClass('selected');

        if (viewBy) $(String.format('#sortCaseBy #ulCaseViewViewBy li a[viewBy={0}]', viewBy)).parent().addClass('selected');
        else $('#sortCaseBy #ulCaseViewViewBy li:first').addClass('selected');

        var startDate = moment($('.dateStart').attr('date'), 'YYYYMMDDHHmm');
        var endDate = moment($('.dateEnd').attr('date'), 'YYYYMMDDHHmm');

        new caseView().getList(sortBy, viewBy, filter, startDate, endDate,
            function(caseViews)
            {
                if (caseViews.length == 0)
                {
                    $.alert('Sorry no results found');
                }
                else
                {
	                loadCaseView(ul, caseViews);                	
                }

                $.executeFunction(onComplete);
            },
            function()
            {
                $.alert('Sorry no results found');
                $.executeFunction(onComplete);
            }
        );
    }
}

function arrowsFunction()
{
	$(".flexslider").css("overflow", "hidden");

	$("ul.slides").cycle({
	fx: 'fade',
	pause: 1,
	prev: '#prev',
	next: '#next'
	});

	$('ul.slides li').eq(2).css('display','block');

	/*$(".flexslider").hover(function() {
	$("ul#nav").fadeIn();
	},
		function() {
	$("ul#nav").fadeOut();
	});*/
}

function loadCaseView(ul, caseViews)
{
    ul.empty();
    var li =
        '<li class="next"> \
            <a href="#" caseId="{0}"> \
                <label class="patientName">Case #{1} - {2}</label> \
                <div class="detail"> \
                    <label>{3}</label> \
                    <small>{5}</small> \
                </div> \
                <div class="detail"> \
                    <label>{4}</label> \
                    <small>{6}</small> \
                </div> \
                <div class="detail"> \
                    <label>{7}</label> \
                    <small class="caseView-detail-status-{8}">{9}</small> \
                </div> \
            </a> \
        </li>';

    for (var i = 0; i < (caseViews || []).length; i++)
    {
        // new (Alex)
        var caseViewItem = caseViews[i],
            hospitalName = $(String.format('#caseDetailList_hospital ul.rounded li > a[dataid={0}]', caseViewItem.hospitalID)).find('label').html(),
            physicianName = $(String.format('#caseDetailList_physician ul.rounded li > a[dataid={0}]', caseViewItem.physicianID)).find('label').html(),
            procTypeName = $(String.format('#caseDetailList_procedure ul.rounded li > a[dataid={0}]', caseViewItem.procTypeID)).find('label').html();

        var caseViewModelItemInfo = li.format
        (
            caseViewItem.id,
            (caseViewItem.id > 0 ? caseViewItem.id : 1000),
            caseViewItem.patient,
            hospitalName,   //caseViewItem.hospitalID,
            physicianName,
            caseViewItem.dateView,  //caseViewItem.physicianID,
            caseViewItem.hour,
            procTypeName,   //caseViewItem.procTypeID,
            caseViewItem.usageStatusCode,
            caseViewItem.usageStatus
        );

        var a = $(caseViewModelItemInfo);
        ul.append(a);

        // Deshabilita la edicion de Post A Case
        //if (caseViewItem.id < 0)
        //{
        //    a.removeClass('next').find('a').removeAttr('href').addClass('disabled');
        //}
    }
}

function clearCaseViewDetail()
{
    $('label.caseDetailListID').html('');
    $('#dateDetail').html('');

    $('#lblCaseDetailListStatus').removeAttr('dataid').html('');
    $('#lblCaseDetailListSalesRep').removeAttr('dataid').html('');
    $('#lblCaseDetailListHospital').removeAttr('dataid').html('');
    $('#lblCaseDetailListPhysician').removeAttr('dataid').html('');
    $('#lblCaseDetailListProcedure').removeAttr('dataid').removeAttr('dataproductcatids').html('');
    $('#lblCaseDetailListProductSystemCategory').html('');

    $('#caseDetailList_productsSystemsCategory ul.rounded li > a').each(function()
    {
        $(this).attr('dataproductsselected', '').find('span').html('').parent().removeAttr('isValid');
    });

    $('#txtCaseDetailListSurgeryDate').val('');
    $('#txtCaseDetailListSurgeryTime').val('');
    $('#lblCaseDetailListSurgeryTime').val('');
    $('#lblCaseDetailListPatientInfo').html('');
    $('#txtCaseDetailListPatientName').val('');
    $('#lblCaseDetailListPatientGender').removeAttr('dataid').html('');
    $('#txtCaseDetailListPatientDateOfBirth').val('');
    $('#txtCaseDetailListPatientAge').val('');
    $('#txtCaseDetailListPO').val('');
    $('#lblCaseDetailListNotes').html('');
    $('#txtCaseDetailListNotes').val('');

    $('#txtPricingFreight').val('');
    $('#lblPricingTotal').html('');

    $('#lblCaseDetailListImaginListPreOp').html('');
    $('#lblCaseDetailListImaginListPostOp').html('');

    // ------------------------------------------------------------------------------------------------------------------------------------------------

    $('#caseDetailList_status ul.rounded li').show();
    $('#caseDetailListCaseType').removeClass('next').find('a').removeAttr('href').addClass('disabled');
    $('#caseDetailListSalesRep').addClass('next').find('a').attr('href', '#caseDetailList_salesRep').removeClass('disabled');
    $('#txtCaseDetailListSurgeryDate').attr('disabled', false);
    $('#txtCaseDetailListSurgeryTime').attr('disabled', false);
    //$('#caseDetailListsurgeryTime').addClass('next').find('a').attr('href', '#caseDetailList_surgeryTime').removeClass('disabled');
    $('#caseDetailListHospital').addClass('next').find('a').attr('href', '#caseDetailList_hospital').removeClass('disabled');
    $('#caseDetailListPhysician').addClass('next').find('a').attr('href', '#caseDetailList_physician').removeClass('disabled');
    $('#caseDetailListProcedure').addClass('next').find('a').attr('href', '#caseDetailList_procedure').removeClass('disabled');
    $('#caseDetailListProductSystemCategory').addClass('next').find('a').attr('href', '#caseDetailList_productsSystemsCategory').removeClass('disabled');
    $('#caseDetailListPatientInfo').addClass('next').find('a').attr('href', '#caseDetailList_patientInformation').removeClass('disabled');
    $('#txtCaseDetailListPO').show();
    $('#caseDetailListCreatePreferences').addClass('next').show().find('a').attr('href', '#caseDetailList_createPreferences').removeClass('disabled');
    $('#caseDetailListAssignedKits').addClass('next').show().find('a').attr('href', '#').removeClass('disabled');
    $('#caseDetailListUsage').addClass('next').show().find('a').attr('href', '#caseDetailList_usage').removeClass('disabled');
    $('#caseDetailListPricing').addClass('next').show().find('a').attr('href', '#caseDetailList_pricing').removeClass('disabled');
    $('#caseDetailListImaging').addClass('next').show().find('a').attr('href', '#').removeClass('disabled');
}

function loadCaseViewDetail(caseDetail)
{
    if (!caseDetail)
        return;    	

    $('label.caseDetailListID').html(caseDetail.id);
    $('#lblCaseDetailListCaseType').html((caseDetail.assignedProdSystems.length > 0) ? 'Loaner Case' : 'Info Case');

    var caseStatus = $(String.format('#caseDetailList_status ul.rounded li > a[dataid={0}]', caseDetail.caseStatusID)).find('label').html();
    $('#lblCaseDetailListStatus').attr('dataid', caseDetail.caseStatusID).html((caseStatus) ? caseStatus : 'No hay datos');

    var caseStatus = $(String.format('#caseDetailList_status ul.rounded li > a[dataid={0}]', caseDetail.caseStatusID)).find('label').html();
    $('#lblCaseDetailListStatus').attr('dataid', caseDetail.caseStatusID).html((caseStatus) ? caseStatus : 'No hay datos');

    var salesRepName = $(String.format('#caseDetailList_salesRep ul.rounded li > a[dataid={0}]', caseDetail.salesRepID)).find('label').html();
    $('#lblCaseDetailListSalesRep').attr('dataid', caseDetail.salesRepID).html((salesRepName) ? salesRepName : 'No hay datos');

    var hospitalName = $(String.format('#caseDetailList_hospital ul.rounded li > a[dataid={0}]', caseDetail.hospitalID)).find('label').html();
    $('#lblCaseDetailListHospital').attr('dataid', caseDetail.hospitalID).html((hospitalName) ? hospitalName : 'No hay datos');

    var physicianName = $(String.format('#caseDetailList_physician ul.rounded li > a[dataid={0}]', caseDetail.physicianID)).find('label').html();
    $('#lblCaseDetailListPhysician').attr('dataid', caseDetail.physicianID).html((physicianName) ? physicianName : 'No hay datos');

    var procAnchor = $(String.format('#caseDetailList_procedure ul.rounded li > a[dataid={0}]', caseDetail.procTypeID));
    var procTypeName = procAnchor.find('label').html();
    var dataproductcatids = procAnchor.attr('dataproductcatids');
    $('#lblCaseDetailListProcedure').attr({ 'dataid': caseDetail.procTypeID, 'dataproductcatids': dataproductcatids }).html((procTypeName) ? procTypeName : 'No hay datos');

    conditionLoadProductSystemCategories();

    //var assignedProdSystems = (caseDetail.assignedProdSystems || '').split(',');
    var assignedProdSystems = (caseDetail.assignedProdSystems.length) ? caseDetail.assignedProdSystems.split(',') : '';
    var assignedProdSystemsCount = 0;
    for (var i = 0; i < assignedProdSystems.length; i++)
    {
        //var prodSystems = assignedProdSystems[i].replaceAll('[|]', '');
        var prodSystems = assignedProdSystems[i].split('|')[0];
        if (prodSystems.length > 0 && !isNaN(parseInt(prodSystems)))
        {
            $(String.format('#caseDetailList_productsSystemsCategory ul.rounded li[isValid] > a[dataproducts*={0}]', prodSystems)).each(function()
            {
                var _this = $(this);
                var productsSelected = (!String.isNullOrEmpty(_this.attr('dataproductsselected'))) ? _this.attr('dataproductsselected').split(',') : [];

                productsSelected.push(prodSystems);
                _this.attr('dataproductsselected', productsSelected.join(','));

                var count = Number(_this.find('span').html().replaceAll('[\(]', '').replaceAll('[\)]', '')) + 1;
                _this.find('span').html(String.format('({0})', count));

                assignedProdSystemsCount++;
            });
        }
    }

    $('#lblCaseDetailListProductSystemCategory').html(String.format('({0})', assignedProdSystemsCount));

    //$('#txtCaseDetailListSurgeryDate').val(moment(caseDetail.procDateTime, "YYYY||MM||DD||HH||mm").format('MM/DD/YYYY'));
    var surgeryDate = moment(caseDetail.procDateTime, "YYYY||MM||DD").format('YYYY-MM-DD');
    $('#txtCaseDetailListSurgeryDate').val(surgeryDate!='1900-01-01'?surgeryDate:'');

    $('#txtCaseDetailListSurgeryTime').val(moment(caseDetail.procDateTime, "YYYY||MM||DD||H||mm").format('H:mm'));
    $('#lblCaseDetailListSurgeryTime').val(moment(caseDetail.procDateTime, "YYYY||MM||DD||H||mm").format('h:mmA'));
	//$('#txtCaseDetailListSurgeryTime').val(moment(caseDetail.procDateTime, "YYYY||MM||DD||HH||mm").format('hh:mm'));

    $('#lblCaseDetailListPatientInfo').html(caseDetail.patient);
    $('#txtCaseDetailListPatientName').val(caseDetail.patient);

    var sexName = $(String.format('#caseDetailList_patientInformation_gender ul.rounded li > a[dataid={0}]', caseDetail.sex)).find('label').html();
    $('#lblCaseDetailListPatientGender').attr('dataid', caseDetail.sex).html((sexName) ? sexName : 'Unspecified');


    $('#caseDetailList_assignedKits ul.rounded').empty();

    var caseId = $('#caseDetailList .caseDetailListID').html();
    new caseView().getAssignedKits(caseId, function(assignedKits)
    {
        loadAssignedKits(assignedKits);
        //jQT.goToLeft('#caseDetailList_assignedKits');
    });
    //var dob = moment(caseDetail.dob, "MMDDYYYY").format('YYYY-MM-DD');
    if (caseDetail.dob)
    {
        var dob = String(caseDetail.dob);
        if (dob.length < 8) dob = String.format('0{0}', dob);

        dob = moment(dob, 'MMDDYYYY').format('YYYY-MM-DD');
        $('#txtCaseDetailListPatientDateOfBirth').val(dob);
    }

    $('#txtCaseDetailListPatientAge').val(caseDetail.ageOfPatient);
    $('#txtCaseDetailListPO').val(caseDetail.po);

    var notes = (caseDetail.notes || '').replace(/\n/gi, "");
    $('#lblCaseDetailListNotes').html(notes.substr(0, 26));
    $('#txtCaseDetailListNotes').val(notes);

    $('#txtPricingFreight').val(caseDetail.freight);
    $('#lblPricingTotal').html(caseDetail.totalPrice);

    conditionLoad();
}

function saveCaseViewDetail(page, onComplete)
{
    // Case ID
    var caseId = $('#caseDetailList .caseDetailListID').html();

    // Products Systems
    var productsSystemsSelected = '';
    $('#caseDetailList_productsSystemsCategory ul.rounded li[isValid] > a').each(function()
    {
        var productsSelected = $(this).attr('dataproductsselected');
        if (productsSelected.length > 0)
        {
            productsSystemsSelected += ',' + $.map(productsSelected.split(','), function(n) { return String.format('{0}||', n); }).join(',');
        }
    });

    // Date Of Birth
    var dob = $('#txtCaseDetailListPatientDateOfBirth').val();
    if (!String.isNullOrEmpty(dob))
    {
        dob = moment(dob, 'YYYY-MM-DD').format('MMDDYYYY');
    }

    // Proc Date Time
    function getProcDateTime()
    {
    	
        var surgeryDate = $('#txtCaseDetailListSurgeryDate');
        var surgeryTime = $('#lblCaseDetailListSurgeryTime');
        var date;
        var time;

        if (String.isNullOrEmpty(surgeryDate.val()))
        {
            date = '1900-01-01';
        } else
        {
            date = surgeryDate.val();
        }
        if (String.isNullOrEmpty(surgeryTime.val()))
        {
            time = '00:00 AM';
        } else
        {
            time = surgeryTime.val();
        }

        return moment(date + ' ' + time, 'YYYY-MM-DD HH:mm A').format('YYYY||MM||DD||HH||mm');
    }

    // Object case view detail data.
    var data =
    {
        caseStatusID: $('#lblCaseDetailListStatus').attr('dataid'),
        salesRepID: $('#lblCaseDetailListSalesRep').attr('dataid'),
        procDateTime: getProcDateTime(),
        hospitalID: $('#lblCaseDetailListHospital').attr('dataid'),
        physicianID: $('#lblCaseDetailListPhysician').attr('dataid'),
        procTypeID: $('#lblCaseDetailListProcedure').attr('dataid'),
        assignedProdSystems: productsSystemsSelected.substr(1),
        patient: $('#txtCaseDetailListPatientName').val(),
        dob: dob,
        sex: $('#lblCaseDetailListPatientGender').attr('dataid'),
        ageOfPatient: $('#txtCaseDetailListPatientAge').val(),
        po: $('#txtCaseDetailListPO').val(),
        notes: $('#txtCaseDetailListNotes').val().replace(/\n/gi, ""),
        freight: Number($('#txtPricingFreight').val()),
        totalPrice: Number($('#lblPricingTotal').html())
    };    

    // Validation case view detail data.
    if (saveCaseViewDetailValidation(data))
    {
        // Save case view detail.
        new caseDetailFull().set(caseId, data, function()
        {
            getCaseView('', function()
            {
                onComplete();
                jQT.goToRight(page);
            });
        },
        function()
        {
        	$('#lblError').html('Error');
            $.alert('Error to save case detail');
        });
    }
    else
    {
        onComplete();
    }
}

function saveCaseViewDetailValidation(data)
{
    var message = '';
    
    if (!data.salesRepID || data.salesRepID == 0) message = 'Please select Sales Rep.';
    else if ($('#txtCaseDetailListSurgeryDate').val().length == 0) message = 'Please select Surgery Date.';
    else if ($('#lblCaseDetailListSurgeryTime').val().length == 0) message = 'Please select Surgery Time.';    
    else if (!data.hospitalID || data.hospitalID == 0) message = 'Please select Hospital.';
    else if (!data.physicianID || data.physicianID == 0) message = 'Please select Physician.';
    else if (!data.procTypeID || data.procTypeID == 0) message = 'Please select Procedure.';

    if (message.length > 0)
        $.alert(message);

    return (message.length == 0);
}

function conditionLoad() 
{
    var statusLbl = $('#lblCaseDetailListStatus').text();
    var statusList = $('#caseDetailList_status ul.rounded li');

    statusList.hide();
    switch(statusLbl)
    {
        case 'New':
            conditionLoadStatus(statusList, ['New', 'Reconciled', 'Cancelled']);
            $('#caseDetailListUsage').removeClass('next').hide().find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListUsage small').css({'width':'50%'});
            $('#caseDetailListPricing').removeClass('next').hide().find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListPricing small').css({'width':'50%'});
            $('#caseDetailListAssignedKits').removeClass('next').hide().find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListAssignedKits small').css({'width':'50%'});
            /*$('#assigKits').hide();*/
            break;
        case 'Kits Assigned':
            conditionLoadStatus(statusList, ['Kits Assigned', 'Cancelled']);
            $('#txtCaseDetailListSurgeryDate').attr('disabled', true);
            $('#txtCaseDetailListSurgeryTime').attr('disabled', true);
            $('#caseDetailListProcedure').removeClass('next').find('a').removeAttr('href').addClass('disabled');//.removeAttr('href').addClass('disabled');
            $('#caseDetailListProcedure small').css({'width':'50%'});
            $('#caseDetailListProductSystemCategory').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListProductSystemCategory small').css({'width':'50%'});
            $('#caseDetailListUsage').removeClass('next').hide().find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListUsage small').css({'width':'50%'});
            $('#caseDetailListPricing').removeClass('next').hide().find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListPricing small').css({'width':'50%'});

            /*$('#assigKits a').removeAttr('href');*/
            break;
        case 'Assembled':
            conditionLoadStatus(statusList, ['Assembled', 'Cancelled']);
            $('#txtCaseDetailListSurgeryDate').attr('disabled', true);
            $('#txtCaseDetailListSurgeryTime').attr('disabled', true);
            $('#caseDetailListProcedure').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListProcedure small').css({'width':'50%'});

            $('#caseDetailListProductSystemCategory').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListUsage').removeClass('next').hide().find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListUsage small').css({'width':'50%'});
            $('#caseDetailListPricing').removeClass('next').hide().find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListPricing small').css({'width':'50%'});
            /*$('#assigKits a').removeAttr('href');*/
            break;
        case 'Shipped':
            conditionLoadStatus(statusList, ['Shipped', 'Cancelled']);
            $('#txtCaseDetailListSurgeryDate').attr('disabled', true);
            $('#txtCaseDetailListSurgeryTime').attr('disabled', true);
            $('#caseDetailListHospital').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListHospital small').css({'width':'50%'});
            $('#caseDetailListPhysician').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListPhysician small').css({'width':'50%'});
            $('#caseDetailListProcedure').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListProcedure small').css({'width':'50%'});
            $('#caseDetailListProductSystemCategory').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListProductSystemCategory small').css({'width':'50%'});
    	    /*$('#assigKits a').removeAttr('href');*/
    	    break;
        case 'Returned':
            conditionLoadStatus(statusList, ['Returned', 'Cancelled']);
            $('#txtCaseDetailListSurgeryDate').attr('disabled', true);
            $('#txtCaseDetailListSurgeryTime').attr('disabled', true);
            $('#caseDetailListHospital').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListHospital small').css({'width':'50%'});
            $('#caseDetailListPhysician').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListPhysician small').css({'width':'50%'});
            $('#caseDetailListProcedure').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListProcedure small').css({'width':'50%'});
            $('#caseDetailListProductSystemCategory').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListProductSystemCategory small').css({'width':'50%'});
            /*$('#assigKits a').removeAttr('href');*/
            break;
        case 'Checked In':
            conditionLoadStatus(statusList, ['Checked In', 'Cancelled']);
            $('#txtCaseDetailListSurgeryDate').attr('disabled', true);
            $('#txtCaseDetailListSurgeryTime').attr('disabled', true);
            $('#caseDetailListHospital').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListHospital small').css({'width':'50%'});
            $('#caseDetailListPhysician').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListPhysician small').css({'width':'50%'});
            $('#caseDetailListProcedure').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListProcedure small').css({'width':'50%'});
            $('#caseDetailListProductSystemCategory').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListProductSystemCategory small').css({'width':'50%'});
            /*$('#assigKits a').removeAttr('href');*/
            break;
        case 'Reconciled':
            conditionLoadStatus(statusList, ['Reconciled', 'New', 'Cancelled']);
            $('#caseDetailListCreatePreferences').removeClass('next').hide().find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListCreatePreferences small').css({'width':'50%'});
            /*$('#assigKits').hide();*/
            break;
        case 'Closed':
            conditionLoadStatus(statusList, ['Closed']);
            $('#caseDetailListSalesRep').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#txtCaseDetailListSurgeryDate').attr('disabled', true);
            $('#txtCaseDetailListSurgeryTime').attr('disabled', true);
            $('#caseDetailListHospital').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListHospital small').css({'width':'50%'});
            $('#caseDetailListPhysician').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListPhysician small').css({'width':'50%'});
            $('#caseDetailListProcedure').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListProcedure small').css({'width':'50%'});
            $('#caseDetailListProductSystemCategory').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListProductSystemCategory small').css({'width':'50%'});
            $('#caseDetailListPatientInfo').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListPatientInfo small').css({'width':'50%'});
            $('#caseDetailListCreatePreferences').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListCreatePreferences small').css({'width':'50%'});
            $('#caseDetailListUsage').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListUsage small').css({'width':'50%'});
            $('#caseDetailListPricing').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListPricing small').css({'width':'50%'});
            $('#caseDetailListImaging').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListImaging small').css({'width':'50%'});
            /*$('#assigKits').hide();
            $('#statusCheck a').removeAttr('href');*/
            break;
        case 'Cancelled':
            conditionLoadStatus(statusList, ['Cancelled', 'New', 'Reconciled']);
            $('#txtCaseDetailListSurgeryDate').attr('disabled', true);
            $('#txtCaseDetailListSurgeryTime').attr('disabled', true);
            $('#caseDetailListHospital').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListHospital small').css({'width':'50%'});
            $('#caseDetailListPhysician').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListPhysician small').css({'width':'50%'});
            $('#caseDetailListProcedure').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListProcedure small').css({'width':'50%'});
            $('#caseDetailListProductSystemCategory').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListProductSystemCategory small').css({'width':'50%'});
            $('#caseDetailListPatientInfo').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListPatientInfo small').css({'width':'50%'});
            $('#txtCaseDetailListPO').hide();
            $('#caseDetailListCreatePreferences').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListCreatePreferences small').css({'width':'50%'});
            $('#caseDetailListUsage').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListUsage small').css({'width':'50%'});
            $('#caseDetailListPricing').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListPricing small').css({'width':'50%'});
            $('#caseDetailListImaging').removeClass('next').find('a').removeAttr('href').addClass('disabled');
            $('#caseDetailListImaging small').css({'width':'50%'});
            /*$('#assigKits a').removeAttr('href');*/
            break;
    }
}



function conditionLoadStatus(list, params)
{
    list.filter(function(i, o) { return $.inArray($(o).find('a').text(), params) > -1; }).show();
}

function conditionLoadProductSystemCategories()
{
    var categories = [];
    var dataproductcatids = $('#lblCaseDetailListProcedure').attr('dataproductcatids');

    if (dataproductcatids && dataproductcatids.length > 0)
        categories = dataproductcatids.split(',');

    var ul_caseDetailList_productsSystemsCategory = $('#caseDetailList_productsSystemsCategory ul li');
    ul_caseDetailList_productsSystemsCategory.removeAttr('isValid').hide();

    var a = ul_caseDetailList_productsSystemsCategory.filter(function(i, o)
    {
        return $.inArray($(o).find('a').attr('dataid'), categories) > -1;
    }).attr('isValid', true).show();
}

function loadInventoryCount(ul, hospitals)
{
    var li =
        '<li class="next"> \
            <a href="#" hospitalid="{0}" hospitalname="{1}"> \
                <label>{1}</label> \
            </a> \
        </li>';

    for (var i = 0; i < (hospitals || []).length; i++)
    {
        var hospital = hospitals[i];
        var hospitalInfo = li.format
        (
            hospital.id,
            hospital.name
        );

        ul.append($(hospitalInfo));
    }
}

function loadInventoryCountEntries(hospitalID)
{
    var ul = $('#ulInventoryCountCatalogs');
    ul.empty();

    var li =
        '<li class="next"> \
            <a href="#"> \
                <label>Catalog #: \
                    <span role="catalog" id="catalogLbl">{0}</span> \
                </label> \
                <div class="detail"> \
                    <label>Lot Code: \
                        <span role="lotCode" id="lotCodeLbl">{1}</span> \
                    </label> \
                    <small></small> \
                </div> \
                <div class="detail"> \
                    <label>Quantity: \
                        <span role="quantity" id="quantityLbl">{2}</span> \
                    </label> \
                    <small>Committed: <span role="committedToServer" id="committedToServerLbl">{3}</span></small> \
                </div> \
            </a> \
        </li>';

    new inventoryCount().getEntries(hospitalID, function(entries)
    {
        for (var i = 0; i < (entries || []).length; i++)
        {
            var entry = entries[i];
            var entryInfo = li.format
            (
                entry.catalog,
                entry.lotCode,
                entry.quantity,
                ((entry.committedToServer == 1) ? 'Yes' : 'No')
            );

            ul.append($(entryInfo));
        }
    });
}


function loadUsageEntries(caseId)
{
    var ul = $('#ulUsageCatalogs');
    ul.empty();

    if (caseId)
    {
        var li =
            '<li class="next"> \
            <a href="#"> \
                <label>Catalog #: \
                    <span role="catalog">{0}</span> \
                </label> \
                <div class="detail"> \
                    <label>Lot Code: \
                        <span role="lotCode">{1}</span> \
                    </label> \
                    <small></small> \
                </div> \
                <div class="detail"> \
                    <label>Quantity: \
                        <span role="quantity">{2}</span> \
                    </label> \
                </div> \
                <input type="hidden" role="inventoryLoc" value="{3}" /> \
                <input type="hidden" role="shipToLoc" value="{4}" /> \
                <input type="hidden" role="notes" value="{5}" /> \
            </a> \
        </li>';

        new usage().getEntries(caseId, function(entries)
        {
            for (var i = 0; i < (entries || []).length; i++)
            {
                var entry = entries[i];
                var entryInfo = li.format
                (
                    entry.catalog,
                    entry.lotCode,
                    entry.quantity,
                    String.clear(entry.inventoryLoc),
                    String.clear(entry.shipTo),
                    String.clear(entry.notes)
                );

                ul.append($(entryInfo));
            }

            if (ul.find('li').length == 0)
            {
                ul.append($('<li>No Items Entered</li>'));
            }
        });
    }
    else
    {
        ul.append($('<li>No Items Entered</li>'));
    }
}

function loadUsageEntriesList(caseId)
{
    var ul = $('#ulUsageItemsList');
    ul.empty();

    if (caseId)
    {
        var li =
            '<li class="next"> \
            <a href="#"> \
                <label>Catalog #: \
                    <span role="catalog">{0}</span> \
                </label> \
                <div class="detail"> \
                    <label>Lot Code: \
                        <span role="lotCode">{1}</span> \
                    </label> \
                    <small></small> \
                </div> \
                <div class="detail"> \
                    <label>Quantity: \
                        <span role="quantity">{2}</span> \
                    </label> \
                </div> \
                <input type="hidden" role="inventoryLoc" value="{3}" /> \
                <input type="hidden" role="shipToLoc" value="{4}" /> \
                <input type="hidden" role="notes" value="{5}" /> \
            </a> \
        </li>';

        new usage().getEntries(caseId, function(entries)
        {
            for (var i = 0; i < (entries || []).length; i++)
            {
                var entry = entries[i];
                var entryInfo = li.format
                (
                    entry.catalog,
                    entry.lotCode,
                    entry.quantity,
                    String.clear(entry.inventoryLoc),
                    String.clear(entry.shipTo),
                    String.clear(entry.notes)
                );

                ul.append($(entryInfo));
            }

            if (ul.find('li').length == 0)
            {
                ul.append($('<li>No Items Entered</li>'));
            }
        });
    }
    else
    {
        ul.append($('<li>No Items Entered</li>'));
    }
}

function loadPricingUsageEntriesList(caseId, onComplete)
{
    var ul = $('#ulPricingUsageItemsList');
    ul.empty();

    var total = 0;
    if (caseId)
    {
        var li =
        '<li class="next"> \
            <a href="#"> \
                <label>Catalog #: \
                    <span role="catalog">{0}</span> \
                </label> \
                <small style="font-weight:bold">$	\
                	<span role="total">{8}</span>	\
                </small>	\
                <div class="detail"> \
                    <label>Lot Code: \
                        <span role="lotCode">{1}</span> \
                    </label> \
                    <small></small> \
                </div> \
                <div class="detail"> \
                    <label>Quantity: \
                        <span role="quantity">{2}</span> \
                    </label> \
                </div> \
                <input type="hidden" role="inventoryLoc" value="{3}" /> \
                <input type="hidden" role="shipToLoc" value="{4}" /> \
                <input type="hidden" role="notes" value="{5}" /> \
                <input type="hidden" role="unitListPrice" value="{6}" /> \
                <input type="hidden" role="unitActualPrice" value="{7}" /> \
                <input type="hidden" role="priceException" value="{9}" /> \
            </a> \
        </li>';

        new pricing().getEntriesCommitted(caseId, function(entries)
        {
            for (var i = 0; i < (entries || []).length; i++)
            {
                var entry = entries[i];
                var entryInfo = li.format
                (
                    entry.catalog,
                    entry.lotCode,
                    entry.quantity,
                    String.clear(entry.inventoryLoc),
                    String.clear(entry.shipTo),
                    String.clear(entry.notes),
                    entry.unitListPrice || 0,
                    entry.unitActualPrice || 0,
                    entry.total || 0,
                    entry.priceException || ''
                );

                ul.append($(entryInfo));
                total += entry.total || 0;
            }

            if (ul.find('li').length == 0)
            {
                ul.append($('<li>No Items Entered</li>'));
            }

            onComplete(total);
        });
    }
    else
    {
        ul.append($('<li>No Items Entered</li>'));
        onComplete(total);
    }
}

function loadInventoryCountEntry(catalog, lotCode, quantity, committedToServer)
{
    var lblCatalog = $('#lblInventoryCatalog');
    var lblLotCode = $('#lblInventoryCountLotCode');
    var lblQuantity = $('#lblInventoryCountQuantity');
    var lblInventoryCountCommittedToServer = $('#lblInventoryCountCommittedToServer');

    lblCatalog.val(catalog);
    lblLotCode.val(lotCode);
    lblQuantity.val(quantity);
    lblInventoryCountCommittedToServer.html(committedToServer);    
}

function loadUsageEntry(catalog, lotCode, quantity, inventoryLoc, shipToLoc, notes)
{
    var lblCatalog = $('#lblUsageCatalog');
    var lblLotCode = $('#lblUsageLotCode');
    var lblQuantity = $('#lblUsageQuantity');
    var lblInventoryLoc = $('#lblUsageInventoryLoc');
    var lblShipTo = $('#lblUsageShipTo');
    var lblNotes = $('#lblUsageNotes');    

    lblCatalog.val(catalog);
    lblLotCode.val(lotCode);
    lblQuantity.val(quantity);
    
    var inventoryLocName = $(String.format('#caseDetailList_usage_inventoryLocation ul.rounded li > a[dataid={0}]', inventoryLoc)).find('label').html();    
    lblInventoryLoc.attr('dataid', inventoryLoc).html(inventoryLocName);
    
    var shipToLocName = $(String.format('#caseDetailList_usage_shipToLocation ul.rounded li > a[dataid={0}]', shipToLoc)).find('label').html();        
    lblShipTo.attr('dataid', shipToLoc).html(shipToLocName);

    $('#txtUsageNotes').val(notes)
    lblNotes.html(String.clear(notes).substr(0, 26));
}

function loadPricingUsageEntry(catalog, lotCode, quantity, inventoryLoc, shipToLoc, notes, unitListPrice, unitActualPrice, total, priceException)
{
    var lblCatalog = $('#lblPricingUsageCatalog');
    var lblLotCode = $('#lblPricingUsageLotCode');
    var lblQuantity = $('#lblPricingUsageQuantity');
    var lblUnitListPrice = $('#lblPricingUsageUnitListPrice');
    var lblUnitActualPrice = $('#lblPricingUsageUnitActualPrice');
    var lblTotal = $('#lblPricingUsageTotal');
    var lblNotes = $('#lblPricingUsageNotes');
    var lblPriceException = $('#lblPricingUsagePriceException');

    lblCatalog.val(catalog);
    lblLotCode.val(lotCode);
    lblQuantity.val(quantity);
    lblUnitListPrice.html(unitListPrice);
    lblUnitActualPrice.val(unitActualPrice);
    lblTotal.html(total);

    $('#txtPricingNotes').val(notes);
    lblNotes.html(String.clear(notes).substr(0, 26));

    var priceExceptionName = $(String.format('#caseDetailList_pricing_detail_priceException ul.rounded li > a[dataid={0}]', priceException)).find('label').html();
    lblPriceException.attr('dataid', priceException).html(priceExceptionName);
}


// Init method
$(function()
{
    createTemplates();
    loadStyle();
    loadData();
    setupLinks();
    OfflineModeEventListener(new setUp().validateAirplaneMode);
});