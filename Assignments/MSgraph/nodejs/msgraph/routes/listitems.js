var express = require('express');
var router = express.Router();
var tokens = require('../tokens.js');
var graph = require('../graph.js');

/* GET /list item */
router.get('/',
  async function(req, res) {
    if (!req.isAuthenticated()) {
      // Redirect unauthenticated requests to home page
      res.redirect('/')
    } else {
      let params = {
        active: { listitems: true }
      };

      // Get the access token
      var accessToken;
      try {
        accessToken = await tokens.getAccessToken(req);
      } catch (err) {
        req.flash('error_msg', {
          message: 'Could not get access token. Try signing out and signing in again.',
          debug: JSON.stringify(err)
        });

      }

      if (accessToken && accessToken.length > 0) {
        try {
          // Get the list Items
          var listItems = await graph.getListItems(accessToken);

          //res.json(listItems.value);
          params.listitems=listItems.value;
        } catch (err) {
          //res.json(err);
          req.flash('error_msg', {
            message: 'Could not fetch events',
            debug: JSON.stringify(err)
          });

        }
      }
      res.render('listitems', params);

    }
  }
);

module.exports = router;