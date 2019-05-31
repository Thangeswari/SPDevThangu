<style>
.divcssThangu {
    text-align: center;
    vertical-align: middle;
    }



    .btncssThangu {

    text-align: center;
    border: 1px solid black;
    border-radius: 25px;
    background-color: forestGreen;
    color: wheat;
    padding: 20px;
    }



    .tableThangu {

    border-collapse: collapse;
    width: 100%;
    text-align: center;

    }



    .tableThangu td {

    border: 1px solid black;
    padding: 10px;
    border-radius: 5px;
    background-color: #ddd;
    text-align: center;

    }



    .tableThangu th {

    border: 1px solid black;
    text-align: center;
    background-color: #4CAF50;
    color: white;
    padding: 10px

    }



    .thanguBox {

    border: 1px solid black;
    padding: 10px;
    border-radius: 5px;
    background-color: #ddd;
    text-align: center;
    }
</style>
<div id="restThangu">
                  
 <button type="button" id="restOperation" onclick="doRestThangu(_spPageContextInfo.webAbsoluteUrl)" class="btncssThangu">Get Todays Work</button>
            
</div>    
 <div id="getData"></div>
 
 <script>
function doRestThangu(siteUrl) {
  var fullUrl = siteUrl + "/_api/search/query?querytext='write:today'";
   
  read_Thangu(fullUrl, function (request) {
    var response = request.currentTarget.response || request.target.responseText;
    var data = JSON.parse(response);
    if (data.error) {
        alert(data.error.message.value);
        console.log(data.error.message.value);
    }
    else {
        console.log(data);
        //var data1=data.d.results;        
        displayFunction(data);
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



function displayFunction(data) {
  var table = "<tr><th>Title</th><th>Location</th></tr>";
  
  console.log(data);
        console.log(data.d);
        console.log(data.d.query.PrimaryQueryResult.RelevantResults.RowCount);
                
        var rowCount=data.d.query.PrimaryQueryResult.RelevantResults.RowCount;
        if(rowCount==0){
        document.getElementById("getData").innerHTML ="";
        var htmlContent= "No Items Found";
        document.getElementById("getData").innerHTML +=htmlContent;
        
        }else{
       
        document.getElementById("getData").innerHTML ="";
        for(var i=0;i<rowCount;i++){
        var searchtitle=data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results[i].Cells.results[3].Value;
        //alert(searchtitle);
        var pathUrl=data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results[i].Cells.results[6].Value;
        var htmlContent= "<p class='table-bordered'><a href='"+pathUrl+"' target='_blank'>"+searchtitle+"</a></p>";
        
        document.getElementById("getData").innerHTML +=htmlContent;
        //alert(htmlContent);
        } 
        }
}

</script>