#Get Client ID from Site Settings->Site app Permissions Page
#PowerShell App
$domain="xxx"
$tenantID=""
$ClientId="xxx-4c31-4d5f-9e3e-512a4d6fe5ba@$($tenantID)"
$ClientSecret="xxxxxxFf8H589aIoq+iFuixa7KW9qmzHG46P3q3g="
$resource="00000003-0000-0ff1-ce00-000000000000/$($domain).sharepoint.com@$($tenantID)"

$oauth2Request =  @{ 
'grant_type' = 'client_credentials';
'client_id' = $ClientId;
'client_secret' = $ClientSecret;
'resource' = $resource
}
$apiUrl="https://accounts.accesscontrol.windows.net/$($domain)/tokens/OAuth/2"

$resultOAuth = Invoke-RestMethod -Uri $apiUrl -Method Post   -Body $oauth2Request -ContentType "application/x-www-form-urlencoded"
$accessToken=$resultOAuth.access_token
$restUrl="https://$($domain).sharepoint.com/sites/development/_api/web/title"
$results = Invoke-RestMethod -Headers @{Authorization = "Bearer $accessToken";Accept="application/json;odata=verbose"} -Uri $restUrl -Method Get -ContentType "application/json;odata=verbose"
$results.d.Title