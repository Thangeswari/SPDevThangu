'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage()
{
    var context = SP.ClientContext.get_current();
    var user = context.get_web().get_currentUser();

    // This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
    $(document).ready(function () {
        displayUserProfile();
    });

    // This function prepares, loads, and then executes a SharePoint query to get the current users information
    function displayUserProfile() {

        var properties = ["FirstName", "LastName", "AboutMe"];
        var userName = "i:0#.f|membership|admin@sharepointisgreat.onmicrosoft.com";
        var peopleManager = new SP.UserProfiles.peopleManager(context);
        var userProfileProperties = new SP.UserProfiles.UserProfilePropertiesForUser(context, userName, properties);
        var profileProperties = peopleManager.getUserProfilePropertiesFor(userProfileProperties);
        context.load(userProfileProperties);
        context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
    }

    // This function is executed if the above call is successful
    // It replaces the contents of the 'message' element with the user name
    function onGetUserNameSuccess() {
        $('#AboutMe').text('Hello ' + profileProperties[0] + " " + profileProperties[1] + " " + profileProperties[2]);
    }

    // This function is executed if the above call fails
    function onGetUserNameFail(sender, args) {
        alert('Failed to get user name. Error:' + args.get_message());
    }
}
