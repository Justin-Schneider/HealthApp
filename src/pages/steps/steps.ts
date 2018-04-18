import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import { Pedometer } from '@ionic-native/pedometer';
import {Chart} from 'chart.js';
import {Data} from '../../providers/data';

/**
 * Generated class for the StepsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-steps',
  templateUrl: 'steps.html',
})
export class StepsPage {

  @ViewChild('doughnutCanvas') doughnutCanvas;

  doughnutChart: any;
  steps: number = 0;
  goal: number = 2000;
  calories: number = 0;
  miles: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ref: ChangeDetectorRef, public platform: Platform, public pedometer: Pedometer, public dataService: Data) {
    if(this.platform.is('cordova')){
      this.pedometer.startPedometerUpdates()
        .subscribe((data) => {
          this.steps = data.numberOfSteps;
          this.setCalories();
          this.setMiles();
          this.dataService.setStepData((this.steps));
          this.ref.detectChanges();
        });
    }
  }

  ionViewDidLoad() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

      type: 'doughnut',
      data: {
        labels: ['Steps', 'Goal'],
        datasets: [{
          label: '# of Votes',
          data: [this.steps, this.goal-this.steps],
          backgroundColor: [
            'rgba(0, 131, 143, 0.4)',
            'rgba(198, 40, 40, 0.4)',

          ],
          hoverBackgroundColor: [
            "#00838f",
            "#c62828",
          ]
        }]
      }

    });
  }

  setCalories(){
    this.calories = this.steps / 20;
  }
  setMiles(){
    this.miles = this.steps / 2000;
  }
}
