import { LightningElement, wire, track } from "lwc";
import getResponse from '@salesforce/apex/FastAndFuriousController.returnJSON';

export default class App extends LightningElement {
  @track retrievedMovies;
  @track error;
  @wire(getResponse)
  populateWithResponse({error, data}) {
    console.log('data : ' + data);
    console.log('error : ' + error);
    if (data) {
      this.retrievedMovies = data;
      this.error = undefined;
    } else if (error) {
      this.retrievedMovies = undefined;
      this.error = error;
    }
  }
}
