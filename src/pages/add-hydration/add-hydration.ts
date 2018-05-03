import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {Parse} from 'parse';

@Component({
  selector: 'page-add-hydration',
  templateUrl: 'add-hydration.html',

})
export class AddHydrationPage {

  water: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddHydrationPage');
  }

  addHydration() {
    let user = Parse.User.current();
    let today = new Date().toLocaleDateString();
    let hydration = [Number(this.water), today];
    let added = false;
    let userHydration = user.get("Hydration");
    for(let i = 0; i < userHydration.length; i++){
      if(userHydration[i][1] == today){
        userHydration[i][0] += Number(this.water);
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
    this.view.dismiss();
  }

  close() {
    this.view.dismiss();
  }

}
