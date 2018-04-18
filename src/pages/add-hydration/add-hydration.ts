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
    let today = new Date().toLocaleDateString();
    let hydration = [this.water, today];
    user.add("Hydration", hydration);
    user.save();
    this.viewCtrl.dismiss();
  }

}
