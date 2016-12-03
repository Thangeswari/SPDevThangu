using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.SharePoint.Client;

namespace SimpleTimerJob
{
    class Program
    {
        static void Main(string[] args)
        {
            Uri siteUri = new Uri("https://spthangu.sharepoint.com/sites/demo");
            string realm = TokenHelper.GetRealmFromTargetUrl(siteUri);
            string accessToken =
              TokenHelper.GetAppOnlyAccessToken(TokenHelper.SharePointPrincipal,
             siteUri.Authority, realm).AccessToken;
            using (var clientContext =
              TokenHelper.GetClientContextWithAccessToken(siteUri.ToString(),
              accessToken))
            {
                ApplyTheme(clientContext);
            }
            Console.WriteLine("The theme has now been updated...");

        }
        private static string URLCombine(string baseUrl, string relativeUrl)
        {
            if (baseUrl.Length == 0)
                return relativeUrl;
            if (relativeUrl.Length == 0)
                return baseUrl;
            return string.Format("{0}/{1}",
             baseUrl.TrimEnd(new char[] { '/', '\\' }),
             relativeUrl.TrimStart(new char[] { '/', '\\' }));
        }

        private static void ApplyTheme(ClientContext clientContext)
        {
            Web currentWeb = clientContext.Web;
            clientContext.Load(currentWeb);
            clientContext.ExecuteQuery();
            //Apply Sketch theme
            currentWeb.ApplyTheme(
             URLCombine(currentWeb.ServerRelativeUrl,
             "/_catalogs/theme/15/palette007.spcolor"),
             URLCombine(currentWeb.ServerRelativeUrl,
             "/_catalogs/theme/15/fontscheme002.spfont"),
             URLCombine(currentWeb.ServerRelativeUrl,
             "/_layouts/15/images/image_bg007.jpg"),
             false);
            clientContext.ExecuteQuery();
        }
    }
}
