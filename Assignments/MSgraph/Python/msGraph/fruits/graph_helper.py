from requests_oauthlib import OAuth2Session

graph_url = 'https://graph.microsoft.com/v1.0'

def get_user(token):
  graph_client = OAuth2Session(token=token)
  # Send GET to /me
  user = graph_client.get('{0}/me'.format(graph_url))
  # Return the JSON result
  print(user.json())
  return user.json()

def get_list_listitems(token):
  graph_client = OAuth2Session(token=token)

  # Configure query parameters to
  # modify the results
  query_params = {
    'expand':'fields'
  }
  #, params=query_params
  # Send GET to /me/listitems
  listitems = graph_client.get('{0}/sites/xxx.sharepoint.com,xxx,xxx/lists/xxx/items'.format(graph_url), params=query_params)
  # Return the JSON result
  print(listitems.json())
  return listitems.json()