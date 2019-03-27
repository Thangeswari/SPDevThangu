require('./Thangu.css');
import {
  SPHttpClient,
  SPHttpClientResponse
  } from '@microsoft/sp-http';
  import {
    Environment,
    EnvironmentType
   } from '@microsoft/sp-core-library';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './LatestListDataWebPart.module.scss';
import * as strings from 'LatestListDataWebPartStrings';
import MockHttpClient from './MockHttpClient';

export interface ILatestListDataWebPartProps {
  description: string;
}

export interface ISPLists {
  value: ISPList[];
 }
 
 export interface ISPList {
  Title: string;
  Id: string;
 }

export default class LatestListDataWebPart extends BaseClientSideWebPart<ILatestListDataWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <table id="spListContainer" class="tableThangu"></table>`;
      this._renderListAsync();
  }

  private _getListData(): Promise<ISPLists> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('Fruits')/items`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
   }

  private _getMockListData(): Promise<ISPLists> {
    return MockHttpClient.get()
      .then((data: ISPList[]) => {
        var listData: ISPLists = { value: data };
        return listData;
      }) as Promise<ISPLists>;
  }

  private _renderList(items: ISPList[]): void {
    let html: string = '';
    html += "<tr><th>Title</th><th>Location</th></tr>";
    items.forEach((item: ISPList) => {
      html += `
    <tr>
      <td>
        ${item.Title}
      </td>
      <td>
        "Washington"
      </td>
    </tr>`;
    });
 
    const listContainer: Element = this.domElement.querySelector('#spListContainer');
    listContainer.innerHTML = html;
  }

  private _renderListAsync(): void {
    // Local environment
    if (Environment.type === EnvironmentType.Local) {
      this._getMockListData().then((response) => {
        this._renderList(response.value);
      });
    }
    else if (Environment.type == EnvironmentType.SharePoint || 
              Environment.type == EnvironmentType.ClassicSharePoint) {
      this._getListData()
        .then((response) => {
          this._renderList(response.value);
        });
    }
  }
  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
