import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {Parse} from 'parse';

@Component({
  selector: 'page-add-hydration',
  templateUrl: 'add-hydration.html',
  template: `
    <ion-item>
      <ion-input type="number" [(ngModel)]="water"></ion-input>
    </ion-item>
    <button ion-button type="submit" (click)="addHydration()">Add Water</button>
  `
})
export class AddHydrationPage {

  water;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddHydrationPage');
  }

  addHydration() {
    let user = Parse.User.current();
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    today = mm + '/' + dd;
    let hydration = [this.water, today];
    user.add("Hydration", hydration);
    user.save();
    this.viewCtrl.dismiss();
  }

}
