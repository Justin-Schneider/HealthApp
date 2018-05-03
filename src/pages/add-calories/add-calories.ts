import { Component } from '@angular/core';
import {NavController, NavParams, ViewController } from 'ionic-angular';
import {Parse} from 'parse';

@Component({
  selector: 'page-add-calories',
  templateUrl: 'add-calories.html',
})
export class AddCaloriesPage {

  calories: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCaloriesPage');
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
    this.view.dismiss();
  }

  close() {
    this.view.dismiss();
  }
}
