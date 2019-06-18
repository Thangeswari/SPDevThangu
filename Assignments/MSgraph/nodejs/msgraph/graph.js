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
      .api('/sites/thangeswari.sharepoint.com,519834a7-fdb4-4739-9da5-a98a4cf0a378,3c9b43e0-b765-45bb-83d7-f32463fcc0fd/lists/7d1ca4cb-f44b-4c3e-8a21-7ab56e8ec2c2/items')
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