#Get Current Context Site  
#https://channel9.msdn.com/blogs/OfficeDevPnP/PnP-Webcast-PnP-PowerShell-Getting-started-with-latest-updates
#http://www.c-sharpcorner.com/article/adding-web-parts-to-sharepoint-pages-using-pnp-powershell/
#Install-Module -Name "SharePointPnPPowerShellOnline"
$siteurl = "https://sharepointisgreat.sharepoint.com/sites/Edureka/dev/" 
$User = "admin@sharepointisgreat.onmicrosoft.com" 
Connect-SPOnline -Url $siteurl -Credentials $User
$ctx = Get-SPOContext  
$PageUrl = "/SitePages/samplePowerShell.aspx"
Add-SPOWebPartToWebPartPage -ServerRelativePageUrl $PageUrl -Path "C:\demo\SSOM\PowerShellCEWP.dwp" -ZoneId 0 -ZoneIndex 0   