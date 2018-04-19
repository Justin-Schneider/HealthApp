import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, PopoverController} from 'ionic-angular';
import {Chart} from 'chart.js'
import {Parse} from 'parse';
import {AddHydrationPage} from "../add-hydration/add-hydration";

@Component({
  selector: 'page-hydration',
  templateUrl: 'hydration.html',
})
export class HydrationPage {

  @ViewChild('lineCanvas') lineCanvas;

  lineChart: any;
  labels = [];
  data = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
    let user = Parse.User.current();
    let n = 0;
    if(user.get("Hydration").length > 7) {
      n = user.get("Hydration").length;
    }
    else{
      n = 7;
    }
    let j = 0;
    for( let i = n - 7; i < user.get("Hydration").length; i++){
      this.labels[j] = user.get("Hydration")[i][1];
      this.data[j] = user.get("Hydration")[i][0];
      j++;
    }
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(AddHydrationPage);
    popover.present({
      ev: myEvent
    });
  }

  ionViewDidLoad() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: '# of Ounces drank',
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

  addHydration(number) {
    let user = Parse.User.current();
    let today = new Date().toLocaleDateString();
    console.log(today);
    let hydration = [Number(number), today];
    let added = false;
    let userHydration = user.get("Hydration");
    console.log(userHydration);
    for(let i = 0; i < userHydration.length; i++){
      if(userHydration[i][1] == today){
        userHydration[i][0] += Number(number);
        added = true;
      }
    }
    if(added == false){
      user.add("Hydration", hydration);
    }
    else{
      user.set("Hydration", userHydration);
    }
    user.save();


    let n = 0;
    if(user.get("Hydration").length > 7) {
      n = user.get("Hydration").length;
    }
    else{
      n = 7;
    }
    let j = 0;
    for( let i = n - 7; i < user.get("Hydration").length; i++){
      console.log(user.get("Hydration")[i]);
      this.labels[j] = user.get("Hydration")[i][1];
      this.data[j] = user.get("Hydration")[i][0];
      j++;
    }
    this.ionViewDidLoad();
  }

}
