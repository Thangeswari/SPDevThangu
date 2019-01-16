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
#
$restUrl="/_api/site"
$targetSite="https://thangeswari.sharepoint.com/sites/Assignments/Rest"
$User="alice@thangeswari.onmicrosoft.com"
$siteDetails=Read-SPObject -targetSite $targetSite -User $User -restUrl $restUrl
$siteDetails.d|select *