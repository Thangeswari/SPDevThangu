'use strict';

ExecuteOrDelayUntilScriptLoaded(initializePage, "sp.js");

function initializePage()
{
    var context = SP.ClientContext.get_current();
    var user = context.get_web().get_currentUser();
    var hostWebURL = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
    var fruitItems;
    var fruitList;

    // This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
    $(document).ready(function () {
        getUserName();       

        getListItems();
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

    function getQueryStringParameter(paramToRetrieve) {
        var params = document.URL.split("?")[1].split("&amp;");
        var strParams = "";
        for (var i = 0; i < params.length; i = i + 1) {
            var singleParam = params[i].split("=");
            if (singleParam[0] === paramToRetrieve) { 
                console.log(singleParam[1]);
                return (singleParam[1].split("&"))[0];
            }
        }
    }

    function getListItems() {
        
        console.log(hostWebURL);
        var hostWebContext = new SP.AppContextSite(context, hostWebURL);
        
        fruitList = hostWebContext.get_web().get_lists().getByTitle('Fruits');

        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml = "<View><Query></Query></View>";
        fruitItems = fruitList.getItems(camlQuery);

        context.load(fruitItems);
        context.executeQueryAsync(getListSucceeded, getListFail);
    }

    function getListSucceeded() {
        var listItemEnumerator = fruitItems.getEnumerator();
        while (listItemEnumerator.moveNext()) {
            var currentItem = listItemEnumerator.get_current();
            var currentFruit = currentItem.get_item("Title");
            console.log(currentFruit);
            document.getElementById("fruitData").innerHTML += "<p>"+currentFruit+"</p>";
        }
    }

    function getListFail(sender, args) {
        alert('Failed to get list. Error:' + args.get_message());
    } 
}
