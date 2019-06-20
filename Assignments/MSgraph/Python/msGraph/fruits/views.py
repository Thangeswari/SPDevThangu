from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, HttpResponseRedirect

from django.urls import reverse
from fruits.auth_helper import get_sign_in_url, get_token_from_code, store_token, store_user, remove_user_and_token, get_token


from fruits.graph_helper import get_user, get_list_listitems
import dateutil.parser

def home(request):
  context = initialize_context(request)

  return render(request, 'fruits/home.html', context)

def initialize_context(request):
  context = {}

  # Check for any errors in the session
  error = request.session.pop('flash_error', None)

  if error != None:
    context['errors'] = []
    context['errors'].append(error)

  # Check for user in the session
  context['user'] = request.session.get('user', {'is_authenticated': False})
  return context

def sign_in(request):
  # Get the sign-in URL
  sign_in_url, state = get_sign_in_url()
  # Save the expected state so we can validate in the callback
  request.session['auth_state'] = state
  # Redirect to the Azure sign-in page
  return HttpResponseRedirect(sign_in_url)

def callback(request):
  # Get the state saved in session
  expected_state = request.session.pop('auth_state', '')
  # Make the token request
  token = get_token_from_code(request.get_full_path(), expected_state)

  # Get the user's profile
  user = get_user(token)

  # Save token and user
  store_token(request, token)
  store_user(request, user)

  return HttpResponseRedirect(reverse('home'))

def sign_out(request):
  # Clear out the user and token
  remove_user_and_token(request)

  return HttpResponseRedirect(reverse('home'))

def list(request):
  context = initialize_context(request)

  token = get_token(request)

  listitems = get_list_listitems(token)

  context['listitems'] = listitems['value']

  return render(request, 'fruits/list.html', context)
