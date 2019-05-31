import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HtmlToSpFxWebPart.module.scss';
import * as strings from 'HtmlToSpFxWebPartStrings';

export interface IHtmlToSpFxWebPartProps {
  description: string;
  color:string;
}

export default class HtmlToSpFxWebPart extends BaseClientSideWebPart<IHtmlToSpFxWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
    <select id="fruits">
    <option value="red">Red</option>
    <option value="yellow">Yellow</option>
    <option value="blue">Blue</option>
  </select> 
  <div id="thanguText" style="border:1px solid black;
  border-radius:25px;
  padding:25px;
  margin:10px;" onmouseover="this.style.background='${this.properties.color}';" onmouseout="this.style.background='white';;">Apple</div>`;
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
                }),
                PropertyPaneDropdown('color', {
                  label: 'Color',
                  options:[
                    { key: 'Red', text: 'Red' },
                    { key: 'Yellow', text: 'Yellow' },
                    { key: 'Blue', text: 'Blue' }
                  ],
                  selectedKey:'Red'
                
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
