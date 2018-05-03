import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Chart} from 'chart.js'
import {Parse} from 'parse';
import {AddCaloriesPage} from "../add-calories/add-calories";

/**
 * Generated class for the CaloriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-calories',
  templateUrl: 'calories.html',
})
export class CaloriesPage {

  @ViewChild('lineCanvas') lineCanvas;

  AddCaloriesPage = AddCaloriesPage;
  lineChart: any;
  labels = [];
  data = [];
  calories = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let user = Parse.User.current();
    let n = 0;
    if (user.get("Calories").length > 7) {
      n = user.get("Calories").length;
    }
    else {
      n = 7;
    }
    let j = 0;
    for (let i = n - 7; i < user.get("Calories").length; i++) {
      this.labels[j] = user.get("Calories")[i][1];
      this.data[j] = user.get("Calories")[i][0];
      j++;
    }
    this.calories = user.get("Calories");
    console.log(this.calories)
  }

  ionViewDidLoad() {

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: '# of calories eaten',
          data: this.data,
          backgroundColor: [
            'rgba(198, 40, 40, 0.2)'
          ],
          borderColor: [
            'rgba(198, 40, 40, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }


}
