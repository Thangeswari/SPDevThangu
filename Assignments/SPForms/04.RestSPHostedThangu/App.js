'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage()
{
    var context = SP.ClientContext.get_current();
    var user = context.get_web().get_currentUser();

    // This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
    $(document).ready(function () {
        doRestThangu();
        
    });

    // This function prepares, loads, and then executes a SharePoint query to get the current users information
    function getUserName() {
        context.load(user);
        context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
    }

    // This function is executed if the above call is successful
    // It replaces the contents of the 'message' element with the user name
    function onGetUserNameSuccess() {
        $('#message').text('Hello ' + user.get_title());
    }

    // This function is executed if the above call fails
    function onGetUserNameFail(sender, args) {
        alert('Failed to get user name. Error:' + args.get_message());
    }

    function doRestThangu() {
        var siteUrl = _spPageContextInfo.webAbsoluteUrl;
        var restUrl = "/_api/site/geolocation";
        var fullUrl = siteUrl + restUrl;
        var restType = "GET";

        jQuery.ajax({
            url: fullUrl,
            type: restType,
            headers: {
                "accept": "application/json;odata=verbose"
            },
            success: onQuerySucceededGet,
            error: onQueryFailed
        });
    } 

    function onQuerySucceededGet(data) {
        var htmlContent = "<p class='thanguCSS'>"+data.d.GeoLocation+"</p>";
        $('#getData').append(htmlContent);

    }

    function onQueryFailed(sender, args) {
        alert('Failed to get Location. Error:' + args.get_message());
    }

    





}
