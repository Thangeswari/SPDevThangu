<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
 
<div id="restThangu">
                  
 <button type="button" id="restOperation" onclick="doRestThangu()" class="btn btn-primary">Get Todays Work</button>
            
</div>    
 <div id="getData"></div>
 <div id="thanguTable"></div>
 <script>
    //Code to do REST processing
    function doRestThangu() {
        var siteUrl = _spPageContextInfo.webAbsoluteUrl;
        console.log(siteUrl);
        var restUrl = "/_api/search/query?querytext='write:today'";
        console.log(restUrl);        
        var fullUrl = siteUrl + restUrl;
        console.log(fullUrl);
        var restType = "GET";
        console.log(restType);
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

        function onQueryFailed(error) {
            alert('Request failed. ' + JSON.stringify(error) + '\n');
        }


        

       
        

    
</script>