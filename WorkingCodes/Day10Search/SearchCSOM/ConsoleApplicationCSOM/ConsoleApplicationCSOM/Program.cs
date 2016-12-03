using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OfficeDevPnP.Core;
using Microsoft.SharePoint.Client;
using System.Configuration;
using System.Security;
using Microsoft.SharePoint.Client.Search;
using Microsoft.SharePoint.Client.Search.Query;

using Microsoft.SharePoint.Client.UserProfiles;

 


namespace ConsoleApplicationCSOM
{
    class Program
    {
        static void Main(string[] args)
        {
            string siteUrl = "https://thangeswari.sharepoint.com";
            
            var authMgr = new AuthenticationManager();
            //PnP Authentication Manage code to authenticate the SharePoint online site  
            //ClientContext cc = new AuthenticationManager().GetAppOnlyAuthenticatedContext(siteUrl, ConfigurationManager.AppSettings["ClientId"], ConfigurationManager.AppSettings["ClientSecret"]);
            ConsoleColor defaultForeground = Console.ForegroundColor;

            Console.ForegroundColor = ConsoleColor.Green;
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("Enter your user name (ex: name@mytenant.microsoftonline.com):");
            Console.ForegroundColor = defaultForeground;
            string userName = Console.ReadLine();

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("Enter your password.");
            Console.ForegroundColor = defaultForeground;
            SecureString password = GetConsoleSecurePassword();
            Console.WriteLine("Password Reading complete");

            ClientContext cc = new AuthenticationManager().GetSharePointOnlineAuthenticatedContextTenant(siteUrl, userName, password);
            //ClientContext cc = new AuthenticationManager().GetSharePointOnlineAuthenticatedContextTenant();
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
            //var list2 = cc.Web.CreateList(ListTemplateType.GenericList, "WithPnP", false);
            Console.WriteLine("Connection successful");

            //Search code

            
            //In CSOM , using statement no needed
            KeywordQuery query = new KeywordQuery(cc);
            query.QueryText = "Microsoft";
            SearchExecutor executor = new SearchExecutor(cc);
            var result = executor.ExecuteQuery(query);
            cc.ExecuteQuery();
            foreach (var item in result.Value.First().ResultRows)
            {
                Console.WriteLine(item["Title"]);
            }



            //User Profile

            //string userT = "i%3A0%23%2Ef%7Cmembership%7Cadmin%40thangeswari%2Eonmicrosoft%2Ecom";
            string targetUser = "i:0#.f|membership|"+userName;
            PeopleManager peopleManager = new PeopleManager(cc);
            PersonProperties personProperties = peopleManager.GetPropertiesFor(targetUser);
            cc.Load(personProperties, p => p.AccountName, p => p.UserProfileProperties);
            cc.ExecuteQuery();
            foreach (var property in personProperties.UserProfileProperties)
            {
                Console.WriteLine(string.Format("{0}: {1}",
                    property.Key.ToString(), property.Value.ToString()));
            }
            
    



            Console.ReadLine();
        }

        /// <summary>
        /// Gets the console secure password.
        /// </summary>
        /// <returns></returns>
        private static SecureString GetConsoleSecurePassword()
        {
            SecureString pwd = new SecureString();
            while (true)
            {
                ConsoleKeyInfo i = Console.ReadKey(true);
                if (i.Key == ConsoleKey.Enter)
                {
                    break;
                }
                else if (i.Key == ConsoleKey.Backspace)
                {
                    pwd.RemoveAt(pwd.Length - 1);
                    Console.Write("\b \b");
                }
                else
                {
                    pwd.AppendChar(i.KeyChar);
                    Console.Write("*");
                }
            }
            return pwd;
        }

        /// <summary>
        /// Gets the console password.
        /// </summary>
        /// <returns></returns>
        private static string GetConsolePassword()
        {
            StringBuilder sb = new StringBuilder();
            while (true)
            {
                ConsoleKeyInfo cki = Console.ReadKey(true);
                if (cki.Key == ConsoleKey.Enter)
                {
                    Console.WriteLine();
                    break;
                }

                if (cki.Key == ConsoleKey.Backspace)
                {
                    if (sb.Length > 0)
                    {
                        Console.Write("\b\0\b");
                        sb.Length--;
                    }

                    continue;
                }

                Console.Write('*');
                sb.Append(cki.KeyChar);
            }

            return sb.ToString();
        }


    }
}
