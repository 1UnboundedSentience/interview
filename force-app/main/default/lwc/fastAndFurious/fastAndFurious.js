import { LightningElement, wire, track } from "lwc";
import getResponse from '@salesforce/apex/FastAndFuriousController.returnJSON';

export default class App extends LightningElement {
  retrievedMovies;
  error;

  @wire(getResponse)
  populateWithResponse({error, data}) {
    console.log('data : ' + data);
    //console.log('data.movies : ' + data.movies);
    console.log('error : ' + error);
    if (data) {
      this.retrievedMovies = data.movies;
      this.error = undefined;
    } else if (error) {
      this.retrievedMovies = undefined;
      this.error = error;
    }
  }
}
