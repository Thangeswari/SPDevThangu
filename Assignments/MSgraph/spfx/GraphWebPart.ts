import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './GraphWebPart.module.scss';
import * as strings from 'GraphWebPartStrings';

import { MSGraphClient } from "@microsoft/sp-http";

export interface IGraphWebPartProps {
  description: string;
}

export default class GraphWebPart extends BaseClientSideWebPart<IGraphWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div id="thangu1"></div>`;
      this.getGraph();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private getGraph(): void {
console.log("Graph code begins");
this.context.msGraphClientFactory.getClient().then(
  (client:MSGraphClient):void =>{
    client
    .api("/sites/thangeswari.sharepoint.com,519834a7-fdb4-4739-9da5-a98a4cf0a378,3c9b43e0-b765-45bb-83d7-f32463fcc0fd/lists/7d1ca4cb-f44b-4c3e-8a21-7ab56e8ec2c2/items")
    .version("v1.0")
    .expand("fields")
    .get((err,res)=>{
      var rowCount = res.value.length;
            if (rowCount == 0) {
              document.getElementById("getData").innerHTML = "";
              var htmlContent = "No Items Found";
              document.getElementById("thangu1").innerHTML += htmlContent;

            } else {


              var table = document.createElement("table");
              var currentItemID;
              var currentItemTitle;
              var currentItemLocation;
              for (var count = 0; count < rowCount; count++) {

                //currentItemID=res.value[count].id;
                currentItemTitle = res.value[count].fields.Title;
                currentItemLocation = res.value[count].fields.Location;
                var tr = document.createElement("tr");
                var td1 = document.createElement("td");
                var textFruitName = document.createTextNode(currentItemTitle);
                td1.appendChild(textFruitName);
                td1.style.border = "1px solid black";
                td1.style.padding = "10px";
                td1.style.borderRadius = "10px";
                td1.style.backgroundColor = "#ddd";
                td1.style.textAlign = "center";
                tr.appendChild(td1);
                var td2 = document.createElement("td");
                var textFruitLocation = document.createTextNode(currentItemLocation);
                td2.appendChild(textFruitLocation);
                td2.style.border = "1px solid black";
                td2.style.padding = "10px";
                td2.style.borderRadius = "10px";
                td2.style.backgroundColor = "#fff";
                td2.style.textAlign = "center";
                tr.appendChild(td2);
                table.appendChild(tr);
                table.style.borderCollapse = "collapse";
                table.style.width = "100%";
                var contentNode = document.getElementById("thangu1");
                contentNode.appendChild(table);
              }

            }
      if(err){
        console.log(err);
        return;
      }
    });
  }
);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
