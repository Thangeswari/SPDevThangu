#Get Connected
$User = "alice@thangeswari.onmicrosoft.com"
$SiteURL = "https://thangeswari.sharepoint.com/sites/Assignments/Alive"
#Add references to SharePoint client assemblies 
$spPath="C:\Program Files\Common Files\Microsoft Shared\Web Server Extensions\16\ISAPI\"
Add-Type -Path ($spPath+"Microsoft.SharePoint.Client.dll")
Add-Type -Path ($spPath+"Microsoft.SharePoint.Client.Runtime.dll")
Add-Type -Path ($spPath+"Microsoft.SharePoint.Client.Search.dll")
Add-Type -Path ($spPath+"Microsoft.SharePoint.Client.Taxonomy.dll")
Add-Type -Path ($spPath+"Microsoft.SharePoint.Client.Publishing.dll")
Add-Type -Path ($spPath+"Microsoft.SharePoint.Client.UserProfiles.dll")
$Password = Read-Host -Prompt "Please enter your password" -AsSecureString
$Creds = New-Object Microsoft.SharePoint.Client.SharePointOnlineCredentials($User,$Password)
#Bind to site collection
$Context = New-Object Microsoft.SharePoint.Client.ClientContext($SiteURL)
$Context.Credentials = $Creds

#Read the Fruits List
$psListFruits = $context.Web.Lists.GetByTitle("Fruits")
$context.Load($psListFruits)
$Context.ExecuteQuery()

#Add 5 items to Fruits List
$fruits="Apple","Orange","Mango","Kiwi","Pomogranate"
foreach ($item in $fruits)
{
    $fruitInfo = New-Object Microsoft.SharePoint.Client.ListItemCreationInformation
    $fruitItem=$psListFruits.AddItem($fruitInfo)
    $fruitItem["Title"] = $item
    $fruitItem.Update()    
}
$Context.ExecuteQuery() 