import { LightningElement, wire, track } from "lwc";
import getResponse from '@salesforce/apex/FastAndFuriousController.returnJSON';

export default class App extends LightningElement {
  @track retrievedMovies = [];
  @track error;
  @wire(getResponse)
  populateWithResponse({error, data}) {
    if (data) {
      for (let i = 0; i<data.length; i++) {
        this.retrievedMovies.push({
          "id" : data[i].id,
          "title" : data[i].title,
          "release_date" : data[i].release_date,
          "opening_revenue" : data[i].opening_revenue,
        });
      }
      this.error = undefined;
    } else if (error) {
      this.retrievedMovies = undefined;
      this.error = error;
    }
  }
}
