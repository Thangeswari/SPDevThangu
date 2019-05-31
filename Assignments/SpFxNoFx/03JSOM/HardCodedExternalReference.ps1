"sp-init": {
      "path": "https://xxx.sharepoint.com/sites/dev/_layouts/15/init.js",
      "globalName": "$_global_init"
    },
    "microsoft-ajax": {
      "path": "https://xxx.sharepoint.com/sites/dev/_layouts/15/MicrosoftAjax.js",
      "globalName": "Sys",
      "globalDependencies": [
        "sp-init"
      ]
    },
    "sp-runtime": {
      "path": "https://xxx.sharepoint.com/sites/dev/_layouts/15/SP.Runtime.js",
      "globalName": "SP",
      "globalDependencies": [
        "microsoft-ajax"
      ]
    },
    "sharepoint": {
      "path": "https://xxx.sharepoint.com/sites/dev/_layouts/15/SP.js",
      "globalName": "SP",
      "globalDependencies": [
        "sp-runtime"
      ]
    },
    "thanguScript": {
      "path": "./src/webparts/getAllLists/Thangu.js",
      "globalName": "thanguScript"
    }