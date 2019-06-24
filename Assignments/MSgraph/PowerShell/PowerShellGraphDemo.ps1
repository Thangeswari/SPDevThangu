Connect-PnPMicrosoftGraph -Scopes "Sites.FullControl.All"
#Give Credentials to your SharePoint site and Accept
$accessToken = Get-PnPAccessToken

$apiUrl = "https://graph.microsoft.com/beta/sites/xxx.sharepoint.com:/sites/Assignments/PsThangu"
$results = Invoke-RestMethod -Headers @{Authorization = "Bearer $accessToken"} -Uri $apiUrl -Method Get
$results
$siteId=$results.id

#Lists Create List names Fruits
$apiUrl = "https://graph.microsoft.com/v1.0/sites/$($siteid)/lists"
$data=@"
{
  "displayName": "FruitsPS",
  
  "columns": [
    {
      "name": "Location",
      "text": { }
    }
  ],
  "list":{
    "template": "genericList"
  }
}
"@
$results = Invoke-RestMethod -Headers @{Authorization = "Bearer $accessToken"} -Uri $apiUrl -Method Post -Body $data -ContentType "application/json"
$listid=$results.id

#Read List ID by Name
$apiUrl = "https://graph.microsoft.com/beta/sites/$($siteid)/lists"
$results = Invoke-RestMethod -Headers @{Authorization = "Bearer $accessToken"} -Uri $apiUrl -Method Get
$listName="Fruits"
$listId=($results.value|select id,name|?{$_.name -eq $listName}).id

#Add Apple,Kiwi,Avocado,Mango
$fruits="Apple","Kiwi","Avocado","Mango"
$location="Washington"
$apiUrl = "https://graph.microsoft.com/v1.0/sites/$($siteid)/lists/$($listid)/items"
foreach($fruit in $fruits){
$data=@"
{
  "fields": {
    "Title": "$($fruit)",
    "Location": "$($location)"
  }
}
"@
$results = Invoke-RestMethod -Headers @{Authorization = "Bearer $accessToken"} -Uri $apiUrl -Method Post -Body $data -ContentType "application/json"
}

#View Results
$apiUrl = "https://graph.microsoft.com/v1.0/sites/$($siteid)/lists/$($listid)/items?expand=fields(select=Title,Location)"
$results = Invoke-RestMethod -Headers @{Authorization = "Bearer $accessToken"} -Uri $apiUrl -Method Get
$items=$results.value|select id,fields
$listDetails=@() 
foreach($item in $items)
{
$itemProperties = @{ID=$item.Id;Title=$item.fields.Title;Location=$item.fields.Location}
$psThanguObject=New-Object PSObject –Property $itemProperties 
$listDetails+=$psThanguObject 
}$listDetails

#View Results v1
$apiUrl = "https://graph.microsoft.com/beta/sites/$($siteid)/lists/$($listid)"
$results = Invoke-RestMethod -Headers @{Authorization = "Bearer $accessToken"} -Uri $apiUrl -Method Get
$items=$results.value
$apiUrl = "https://graph.microsoft.com/v1.0/sites/$($siteid)/lists/$($listid)/items"
$results = Invoke-RestMethod -Headers @{Authorization = "Bearer $accessToken"} -Uri $apiUrl -Method Get
$items=$results.value|select id,fields
$listDetails=@() 
foreach($item in $items)
{
$itemProperties = @{ID=$item.Id;Title=$item.fields.Title;Location=$item.fields.Location}
$psThanguObject=New-Object PSObject –Property $itemProperties 
$listDetails+=$psThanguObject 
}$listDetails

#Update App Location to Australia
$appleID=($listDetails|?{$_.Title -eq "Apple"}|select ID).ID
$appleID[0]
$location="Australia"
$apiUrl = "https://graph.microsoft.com/v1.0/sites/$($siteid)/lists/$($listid)/items/$($appleID[1])/fields"
$data=@"
{  "Title": "Apple",
    "Location": "$($location)"}
"@
$results = Invoke-RestMethod -Headers @{Authorization = "Bearer $accessToken"} -Uri $apiUrl -Method Patch -Body $data -ContentType "application/json"
#Delete mango
$mangoID=($listDetails|?{$_.Title -eq "Mango"}|select ID).ID
$location="Australia"
$apiUrl = "https://graph.microsoft.com/v1.0/sites/$($siteid)/lists/$($listid)/items/$($mangoID)"
$results = Invoke-RestMethod -Headers @{Authorization = "Bearer $accessToken"} -Uri $apiUrl -Method Delete

