require('./Thangu.css');
require("thanguScript");
require("jQuery");
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './ThanguListDataWebPart.module.scss';
import * as strings from 'ThanguListDataWebPartStrings';

export interface IThanguListDataWebPartProps {
  description: string;
}



export default class ThanguListDataWebPart extends BaseClientSideWebPart<IThanguListDataWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
    <div id="divThangu1" class="divcssThangu">
    <h1>See List items</h1>
    <input type="button" id="btnThangu" class="btncssThangu" value="Click" onclick="alertThangu();"/>
    <input type="button" id="btnThanguRest" class="btncssThangu" value="Rest" onclick=
    "doRestThangu('${this.context.pageContext.web.absoluteUrl}');"/>
    <div id="thanguDemo"><h2>>Welcome to ${this.context.pageContext.web.title}</h2></div>
    <table id="getDataTable" class="tableThangu"></div>
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
