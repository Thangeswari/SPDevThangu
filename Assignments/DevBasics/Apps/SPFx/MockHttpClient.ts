import { ISPListItem } from './SimpleWebPart';

export default class MockHttpClient  {

   private static _items: ISPListItem[] = [{ Title: 'Mock List Item', Id: '1' },
                                       { Title: 'Mock List Item 2', Id: '2' },
                                       { Title: 'Mock List Item 3', Id: '3' }];

   public static get(): Promise<ISPListItem[]> {
   return new Promise<ISPListItem[]>((resolve) => {
           resolve(MockHttpClient._items);
       });
   }
}