import { LightningElement, wire, track } from "lwc";
import getResponse from '@salesforce/apex/FastAndFuriousController.returnJSON';

const columns = [
  { label: 'Id', fieldName: 'Id' },
  { label: 'Title', fieldName: 'title'},
  { label: 'Release Date', fieldName: 'releaseDate', type: 'date'},
  { label: 'Opening Revenue', fieldName: 'openingRevenue', type: 'currency' }
];


export default class App extends LightningElement {
  columns = columns;
  @track retrievedMovies = [];
  @track error;
  @wire(getResponse)
  populateWithResponse({error, data}) {
    if (data) {
      for (let i = 0; i<data.length; i++) {
        const formattedDate = this.formatTheDate(data[i].release_date);
        this.retrievedMovies.push({
          "id" : data[i].id,
          "title" : data[i].title,
          "releaseDate" : formattedDate,
          "openingRevenue" : '$' + data[i].opening_revenue
        });
      }
      this.error = undefined;
    } else if (error) {
      this.retrievedMovies = undefined;
      this.error = error;
    }
  }

  // Formats the Release Date to MM, DD, YYYY from YYYY-MM-DDTHH:MM:SSZ
  formatTheDate(inputDate) {
    const month = inputDate.slice(5,7);
    const day = inputDate.slice(8,10);
    const year = inputDate.slice(0,4);
    return month + ', ' + day + ', ' + year;
  }
}
