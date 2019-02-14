#Ensure Latest SharePointPnPPowerShell* is installed
#Install-Module -Name "SharePointPnPPowerShellOnline"

#Connect to your SharePoint Site.Replace with your url
$siteurl = "https://thangeswari.sharepoint.com/sites/Assignments/Alive" 

Connect-PnPOnline –Url $siteUrl –Credentials (Get-Credential)

$newItem=Add-PnPListItem -List "Fruits"
Set-PnPListItem -List "Fruits" -Identity $newItem -Values @{"Title"="Peach";}