using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OfficeDevPnP.Core;
using Microsoft.SharePoint.Client;
using System.Configuration;


namespace ConsoleApplicationCSOM
{
    class Program
    {
        static void Main(string[] args)
        {
            string siteUrl = "https://sharepointisgreat.sharepoint.com/sites/edureka/dev";
            
            var authMgr = new AuthenticationManager();
            //PnP Authentication Manage code to authenticate the SharePoint online site  
            ClientContext cc = new AuthenticationManager().GetAppOnlyAuthenticatedContext(siteUrl, ConfigurationManager.AppSettings["ClientId"], ConfigurationManager.AppSettings["ClientSecret"]);
            /*
            //Code to add a new list to web using native CSOM  
            Web web = context.Web;  
            ListCreationInformation listInfo = new ListCreationInformation();  
            listInfo.Title = “WithoutPnP”;  
            listInfo.TemplateType = (int)ListTemplateType.GenericList;  
            List list1 = web.Lists.Add(listInfo);  
   
            list1.Update();  
            context.ExecuteQuery();  
            */
            //Code to add a new list to web using PnP extension method  
            var list2 = cc.Web.CreateList(ListTemplateType.GenericList, "TestNewList", false);
            Console.WriteLine("List created successfully");
            Console.ReadLine();
        }
    }
}
