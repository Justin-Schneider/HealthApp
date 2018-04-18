import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Chart} from 'chart.js'
import {Parse} from 'parse';


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

  lineChart: any;
  labels = [];
  data = [];
  calories:number;

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
  addCalories(){
    let user = Parse.User.current();
    let today = new Date().toLocaleDateString();
    let userinfo = [Number(this.calories), today];
    let added = false;
    let UserCalories = user.get("Calories");
    console.log(UserCalories);
    for(let i = 0; i < UserCalories.length; i++){
      if(UserCalories[i][1] == today){
        UserCalories[i][0] += Number(this.calories);
        added = true;
      }
    }
    if(added == false){
      user.add("Calories", userinfo);
    }
    else{
      user.set("Calories", UserCalories);
    }
    user.save();


    let n = 0;
    if(user.get("Calories").length > 7) {
      n = user.get("Calories").length;
    }
    else{
      n = 7;
    }
    let j = 0;
    for( let i = n - 7; i < user.get("Calories").length; i++){
      console.log(user.get("Calories")[i]);
      this.labels[j] = user.get("Calories")[i][1];
      this.data[j] = user.get("Calories")[i][0];
      j++;
    }
    this.ionViewDidLoad();
  }


}
