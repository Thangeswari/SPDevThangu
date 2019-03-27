function alertThangu() {
  alert("Thanksgiving day!");
}

function doRestThangu(siteUrl) {
  var fullUrl = siteUrl + "/_api/web/lists/getbytitle('Fruits')/items?$select=Title";
   
  read_Thangu(fullUrl, function (request) {
    var response = request.currentTarget.response || request.target.responseText;
    var data = JSON.parse(response);
    if (data.error) {
        alert(data.error.message.value);
        console.log(data.error.message.value);
    }
    else {
        console.log(data.d.results);
        var data1=data.d.results;        
        displayFunction(data1);
    }
});

}

function read_Thangu(url, success) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader("Accept", "application/json; odata=verbose");
    xhr.onload = success;
    xhr.send();
    return xhr;
}



function displayFunction(jsonContent) {
  var table = "<tr><th>Title</th><th>Location</th></tr>";
  
  for (i = 0; i < jsonContent.length; i++) {
    table += "<tr><td>" +
    jsonContent[i].Title +
      "</td><td>" +
      "Washington" +
      "</td></tr>";
    console.log(jsonContent[i].Title);
    
  }
  document.getElementById("getDataTable").innerHTML = table;
}
