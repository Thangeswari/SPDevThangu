using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security;
using Microsoft.SharePoint.Client;

namespace CSOMCreateListItemThangu
{
    class Program
    {
        static void Main(string[] args)
        {
            string userName = "alice@thangeswari.onmicrosoft.com";
            Console.WriteLine("Enter the password");
            string passWord = Console.ReadLine();
            SecureString pwd = new SecureString();
            foreach(char c in passWord)
            {
                pwd.AppendChar(c);

            }
            
            
            string webUrl = "https://thangeswari.sharepoint.com/sites/Assignments/Alive";
            using (var context = new ClientContext(webUrl))
            {
                context.Credentials = new SharePointOnlineCredentials(userName, pwd);
                 
                List fruitList = context.Web.Lists.GetByTitle("Fruits");

                ListItemCreationInformation itemCreateInfo = new ListItemCreationInformation();
                ListItem newItem = fruitList.AddItem(itemCreateInfo);
                newItem["Title"] = "Mary";
                newItem.Update();

                context.ExecuteQuery();
                Console.WriteLine("List Item created ");
                Console.ReadLine();
            }

        }
    }
}
