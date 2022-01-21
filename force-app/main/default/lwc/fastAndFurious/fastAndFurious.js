import { LightningElement, wire, track } from "lwc";
import getResponse from '@salesforce/apex/FastAndFuriousController.returnJSON';

export default class App extends LightningElement {
  @track retrievedMovies = [];
  @track error;
  @wire(getResponse)
  populateWithResponse({error, data}) {
    console.log('data : ' + data);
    console.log('error : ' + error);
    if (data) {
      // unpack data here.
      var finalMovieData = [];
      for (let i = 0; i<data.length; i++) {
       //  data[i] each object -         {
       /*   "id": 1,
          "title": "The Fast and the Furious",
          "release_date": "2001-06-22T00:00:00Z",
          "opening_revenue": "40,089,015"
      },*/
      console.log(i);
      console.log(data[i].id);
      console.log(data[i].title);
        this.retrievedMovies.push({
          "id" : data[i].id,
          "title" : data[i].title,
          "release_date" : data[i].release_date,
          "opening_revenue" : data[i].opening_revenue,
        });
      }
      console.log(this.MovieData);
      this.error = undefined;
    } else if (error) {
      this.retrievedMovies = undefined;
      this.error = error;
    }
  }
}
