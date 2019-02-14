import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './SimpleWebPart.module.scss';
import * as strings from 'SimpleWebPartStrings';
import MockHttpClient from './MockHttpClient';

import {
  SPHttpClient,
  SPHttpClientResponse   
 } from '@microsoft/sp-http';

 import {
  Environment,
  EnvironmentType
 } from '@microsoft/sp-core-library';

export interface ISimpleWebPartProps {
  description: string;
}

export interface ISPListItems {
  value: ISPListItem[];
 }
 
 export interface ISPListItem {
  Title: string;
  Id: string;
 }

export default class SimpleWebPart extends BaseClientSideWebPart<ISimpleWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.simple }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to My SharePoint!</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.description }">${escape(this.properties.description)}</p>              
              <p class="${ styles.description }">Loading from ${escape(this.context.pageContext.web.title)}</p>
              <a href="https://aka.ms/spfx" class="${ styles.button }">
                <span class="${ styles.label }">Learn more</span>
              </a>
            </div>
          </div>
          <div id="spListContainer" />
        </div>
      </div>`;
      this._renderListItemAsync();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private _getMockListData(): Promise<ISPListItems> {
    return MockHttpClient.get()
      .then((data: ISPListItem[]) => {
        var listData: ISPListItems = { value: data };
        return listData;
      }) as Promise<ISPListItems>;
  }

  private _getListData(): Promise<ISPListItems> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('Fruits')/items`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
   }

   private _renderListItem(items: ISPListItem[]): void {
    let html: string = '';
    items.forEach((item: ISPListItem) => {
      html += `
    <ul class="${styles.list}">
      <li class="${styles.listItem}">
        <span class="ms-font-l">${item.Title}</span>
      </li>
    </ul>`;
    });
 
    const listContainer: Element = this.domElement.querySelector('#spListContainer');
    listContainer.innerHTML = html;
  }

  private _renderListItemAsync(): void {
    // Local environment
    if (Environment.type === EnvironmentType.Local) {
      this._getMockListData().then((response) => {
        this._renderListItem(response.value);
      });
    }
    else if (Environment.type == EnvironmentType.SharePoint || 
              Environment.type == EnvironmentType.ClassicSharePoint) {
      this._getListData()
        .then((response) => {
          this._renderListItem(response.value);
        });
    }
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
