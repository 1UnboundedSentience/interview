import { LightningElement, wire, track } from "lwc";
import getResponse from '@salesforce/apex/FastAndFuriousController.returnJSON';

export default class App extends LightningElement {
  @track retrievedMovies;
  @track error;
  @track movieData = [];
  @wire(getResponse)
  populateWithResponse({error, data}) {
    console.log('data : ' + data);
    console.log('error : ' + error);
    if (data) {
      // unpack data here.
      var finalMovieData = [];
      for (var movieObj in data) {
        for (var key in movieObj) {
          this.movieData.push({value:movieObj[key], key:key});
        }
      }
      this.retrievedMovies = data;
      this.error = undefined;
    } else if (error) {
      this.retrievedMovies = undefined;
      this.error = error;
    }
  }
}
