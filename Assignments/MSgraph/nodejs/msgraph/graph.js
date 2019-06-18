var graph = require('@microsoft/microsoft-graph-client');

module.exports = {
  getUserDetails: async function(accessToken) {
    const client = getAuthenticatedClient(accessToken);

    const user = await client.api('/me').get();
    return user;
  },

  getListItems: async function(accessToken) {
    const client = getAuthenticatedClient(accessToken);
  
    const listitems = await client
      .api('/sites/xxx.sharepoint.com,xxx,xxx/lists/xxx/items')
      .expand('fields')
      .select('id')     
      .get();
  
    return listitems;
  }
};

function getAuthenticatedClient(accessToken) {
  // Initialize Graph client
  const client = graph.Client.init({
    // Use the provided access token to authenticate
    // requests
    authProvider: (done) => {
      done(null, accessToken);
    }
  });

  return client;
}