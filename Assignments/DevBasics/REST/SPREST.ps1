$targetSite="https://thangeswari.sharepoint.com/sites/Assignments/Alive"
$User="alice@thangeswari.onmicrosoft.com"
$folderName="Shared Documents"
$fileName="Fruits.txt"
$restUrl="/_api/web/GetFolderByServerRelativeUrl('/sites/Assignments/Alive/"+$folderName+"')/Files('"+$fileName+"')/`$value"
$file=Read-SPObject -targetSite $targetSite -User $User -restUrl $restUrl 
$file

$data=$file+"Wow!Today is a nice day!-Updated"
$restUrl="/_api/web/GetFileByServerRelativeUrl('/sites/Assignments/Alive/"+$folderName+"/"+$fileName+"')/`$value"
$newFile=Update-SPObject -targetSite $targetSite -User $User -restUrl $restUrl -data $data -putonly $true
