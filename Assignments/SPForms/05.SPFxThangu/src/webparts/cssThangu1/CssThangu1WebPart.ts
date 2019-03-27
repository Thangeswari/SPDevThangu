require('./Thangu.css');
require('thanguScript');
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './CssThangu1WebPart.module.scss';

import * as strings from 'CssThangu1WebPartStrings';
require('./Thangu.module.scss');

export interface ICssThangu1WebPartProps {
  description: string;
}

export default class CssThangu1WebPart extends BaseClientSideWebPart<ICssThangu1WebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
    <div id="divThangu1" class="divcssThangu">
<h1>See One By One</h1>
<input type="button" id="btnThangu" class="btncssThangu" value="Click" onclick="animateThangu()"/>
<div id="thanguText"></div>
</div>`;
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
