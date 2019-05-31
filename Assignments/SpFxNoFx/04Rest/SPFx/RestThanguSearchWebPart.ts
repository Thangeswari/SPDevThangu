require('thanguScript');
require('./Thangu.css');
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './RestThanguSearchWebPart.module.scss';
import * as strings from 'RestThanguSearchWebPartStrings';

export interface IRestThanguSearchWebPartProps {
  description: string;
}

export default class RestThanguSearchWebPart extends BaseClientSideWebPart<IRestThanguSearchWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
    <div id="restThangu">
                  
    <button type="button" id="restOperation" onclick="doRestThangu('${this.context.pageContext.web.absoluteUrl}')" class="btncssThangu">Get Todays Work</button>
               
   </div>    
    <div id="getData"></div>`;
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
