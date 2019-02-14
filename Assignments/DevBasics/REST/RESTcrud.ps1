#CRUD Series 

#Read
function Read-SPObject($targetSite,$User,$restUrl){
$targetSiteUri = [System.Uri]$targetSite
$spPath="C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\"
Add-Type -Path ($spPath+"Microsoft.SharePoint.Client.dll")
Add-Type -Path ($spPath+"Microsoft.SharePoint.Client.Runtime.dll")
$Password = Read-Host -Prompt "Please enter your password" -AsSecureString
$Creds = New-Object Microsoft.SharePoint.Client.SharePointOnlineCredentials($User,$Password)
#Bind to site collection
$Context = New-Object Microsoft.SharePoint.Client.ClientContext($targetSite)
$Context.Credentials = $Creds
# Retrieve the client credentials and the related Authentication Cookies
$credentials = $context.Credentials
$authenticationCookies = $credentials.GetAuthenticationCookie($targetSiteUri, $true)
# Set the Authentication Cookies and the Accept HTTP Header
$webSession = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$webSession.Cookies.SetCookies($targetSiteUri, $authenticationCookies)
$webSession.Headers.Add("Accept", "application/json;odata=verbose")
$fullUrl=$targetSite+$restUrl
$results=   Invoke-RestMethod -Uri $fullUrl -Headers $headers -Method Get -Body $null -WebSession $webSession -ContentType "application/json;odata=verbose"

Write-Host "Invoking results from Url" $fullUrl
Write-Host $results
return $results  
}

#Create
function Create-SPObject($targetSite,$User,$restUrl,$data){
$targetSiteUri = [System.Uri]$targetSite
$spPath="C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\"
Add-Type -Path ($spPath+"Microsoft.SharePoint.Client.dll")
Add-Type -Path ($spPath+"Microsoft.SharePoint.Client.Runtime.dll")
$Password = Read-Host -Prompt "Please enter your password" -AsSecureString
$Creds = New-Object Microsoft.SharePoint.Client.SharePointOnlineCredentials($User,$Password)
$Context = New-Object Microsoft.SharePoint.Client.ClientContext($targetSite)
$Context.Credentials = $Creds
$credentials = $context.Credentials
$authenticationCookies = $credentials.GetAuthenticationCookie($targetSiteUri, $true)
# Set the Authentication Cookies and the Accept HTTP Header
$webSession = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$webSession.Cookies.SetCookies($targetSiteUri, $authenticationCookies)
$webSession.Headers.Add("Accept", "application/json;odata=verbose")
#Getting Form Digest
$contextUrl=$targetSite + "/_api/contextinfo"
$result=Invoke-RestMethod -Method Post -Uri $contextUrl -Header $headers  -WebSession $webSession -Body $null
$formDigest = $result.d.GetContextWebInformation.FormDigestValue
$headers = @{accept = "application/json;odata=verbose"}
$headers.Add("X-RequestDigest", $formDigest);
#$headers.Add("Content-Type","application/json;odata=verbose");
$fullUrl=$targetSite+$restUrl
Write-Host "Creating Object..." for $fullUrl "with header" $headers.Values
$response=Invoke-RestMethod -Uri $fullUrl -Headers $headers -Method Post -Body $data -WebSession $webSession -ContentType "application/json;odata=verbose"
Write-Host "Creating Object...";Write-Host $response
return $response   
}

#Update
function Update-SPObject($targetSite,$User,$restUrl,$data,$etag,$putonly){
$targetSiteUri = [System.Uri]$targetSite
$spPath="C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\"
Add-Type -Path ($spPath+"Microsoft.SharePoint.Client.dll")
Add-Type -Path ($spPath+"Microsoft.SharePoint.Client.Runtime.dll")
$Password = Read-Host -Prompt "Please enter your password" -AsSecureString
$Creds = New-Object Microsoft.SharePoint.Client.SharePointOnlineCredentials($User,$Password)
#Bind to site collection
$Context = New-Object Microsoft.SharePoint.Client.ClientContext($targetSite)
$Context.Credentials = $Creds
# Retrieve the client credentials and the related Authentication Cookies
$credentials = $context.Credentials
$authenticationCookies = $credentials.GetAuthenticationCookie($targetSiteUri, $true)
# Set the Authentication Cookies and the Accept HTTP Header
$webSession = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$webSession.Cookies.SetCookies($targetSiteUri, $authenticationCookies)
$webSession.Headers.Add("Accept", "application/json;odata=verbose")

#Getting Form Digest
#Post request to get FormDigest value
$contextUrl=$targetSite + "/_api/contextinfo"
$result=Invoke-RestMethod -Method Post -Uri $contextUrl -Header $headers  -WebSession $webSession -Body $null
$formDigest = $result.d.GetContextWebInformation.FormDigestValue
$headers = @{accept = "application/json; odata=verbose"}
$headers.Add("X-RequestDigest", $formDigest);
if($putonly -eq "true"){
$headers.Add("X-HTTP-Method", "PUT");
}else{
$headers.Add("X-HTTP-Method", "MERGE");
}
if($etag -ne $null){
$headers.Add("IF-MATCH", $etag); 
}

$fullUrl=$targetSite+$restUrl
$response=Invoke-RestMethod -Uri $fullUrl -Headers $headers -Method Post -Body $data -WebSession $webSession -ContentType "application/json;odata=verbose"

Write-Host "Updating Object..."
Write-Host $response
return $response
}

#Delete
function Delete-SPObject($targetSite,$User,$restUrl){
$targetSiteUri = [System.Uri]$targetSite
$spPath="C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\"
Add-Type -Path ($spPath+"Microsoft.SharePoint.Client.dll")
Add-Type -Path ($spPath+"Microsoft.SharePoint.Client.Runtime.dll")
$Password = Read-Host -Prompt "Please enter your password" -AsSecureString
$Creds = New-Object Microsoft.SharePoint.Client.SharePointOnlineCredentials($User,$Password)
#Bind to site collection
$Context = New-Object Microsoft.SharePoint.Client.ClientContext($targetSite)
$Context.Credentials = $Creds
# Retrieve the client credentials and the related Authentication Cookies
$credentials = $context.Credentials
$authenticationCookies = $credentials.GetAuthenticationCookie($targetSiteUri, $true)
# Set the Authentication Cookies and the Accept HTTP Header
$webSession = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$webSession.Cookies.SetCookies($targetSiteUri, $authenticationCookies)
$webSession.Headers.Add("Accept", "application/json;odata=verbose")

#Getting Form Digest
#Post request to get FormDigest value
$contextUrl=$targetSite + "/_api/contextinfo"
$result=Invoke-RestMethod -Method Post -Uri $contextUrl -Header $headers  -WebSession $webSession -Body $null
$formDigest = $result.d.GetContextWebInformation.FormDigestValue
$headers = @{accept = "application/json; odata=verbose"}
$headers.Add("X-RequestDigest", $formDigest);
$headers.Add("X-HTTP-Method", "DELETE");
$headers.Add("IF-MATCH", "*"); 

$fullUrl=$targetSite+$restUrl
$response=Invoke-RestMethod -Uri $fullUrl -Headers $headers -Method Post  -WebSession $webSession -ContentType "application/json;odata=verbose"

Write-Host "Deleting Object..."
Write-Host $response
return $response
}

