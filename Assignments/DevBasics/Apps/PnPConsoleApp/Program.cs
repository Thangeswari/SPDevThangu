using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.SharePoint.Client;
using System.Security;
using OfficeDevPnP.Core;
using System.Configuration;

namespace PnPAppThangu
{
    class Program
    {
        static void Main(string[] args)
        {
            string siteUrl = "https://thangeswari.sharepoint.com/sites/Assignments/Alive";

            var authMgr = new AuthenticationManager();
            ClientContext cc = new AuthenticationManager().GetAppOnlyAuthenticatedContext(siteUrl, ConfigurationManager.AppSettings["ClientId"], ConfigurationManager.AppSettings["ClientSecret"]);

            //Get the Items in Fruits
            string listName = "Fruits";
            bool listExists = cc.Web.ListExists(listName);
            if (listExists)
            {
                List list = cc.Web.GetListByTitle(listName);
                CamlQuery query = Microsoft.SharePoint.Client.CamlQuery.CreateAllItemsQuery();
                ListItemCollection items = list.GetItems(query);
                cc.Load(items);
                cc.ExecuteQuery();
                foreach(ListItem item in items)
                {
                    Console.WriteLine(item["Title"]);
                }
            }
            else
            {
                Console.Write("The List does not exist");
            }
            Console.ReadLine();
            
        
        }
    }
}
