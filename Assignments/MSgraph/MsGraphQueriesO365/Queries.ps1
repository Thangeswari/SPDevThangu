https://graph.microsoft.com/v1.0/users
https://graph.microsoft.com/v1.0/me/photo
https://graph.microsoft.com/v1.0/me/photo
UserActivity.ReadWrite.CreatedByApp
https://graph.microsoft.com/v1.0/me/activities

https://graph.microsoft.com/v1.0/me/calendar/events

https://graph.microsoft.com/beta/me/messages
{
    "subject":"Draft Message?",
    "importance":"High",
    "body":{
        "contentType":"HTML",
        "content":"They were <b>awesome</b>!"
    },
    "toRecipients":[
        {
            "emailAddress":{
                "address":"admin@xxx.onmicrosoft.com"
            }
        }
    ]
}
https://graph.microsoft.com/v1.0/me/sendMail
{
  "message": {
    "subject": "You have a Payout",
    "body": {
      "contentType": "HTML",
      "content": "You have received <b>1000$</b> from XYZ for your Product or services."
    },
    "toRecipients": [
      {
        "emailAddress": {
          "address": "admin@xxx.onmicrosoft.com"
        }
      }
    ]
  }
}

https://graph.microsoft.com/beta/groups?$filter=resourceProvisioningOptions/Any(x:x eq 'Team')


https://graph.microsoft.com/v1.0/me/insights/trending?$filter=ResourceVisualization/Type eq 'PowerPoint'

https://graph.microsoft.com/beta/me/insights/used

https://graph.microsoft.com/v1.0/me/contacts



