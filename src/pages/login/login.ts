import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Parse} from 'parse';
import {Data} from "../../providers/data";

import {HomePage} from '../home/home';
import {RegistrationPage} from "../registration/registration";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  RegistrationPage = RegistrationPage;
  password: string = '';
  username: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, data: Data) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public doSignin() {
    var self = this;
    Parse.User.logIn(this.username, this.password, {
      success: function (user) {
        console.log("logged in " + user.get("username"));
        self.navCtrl.setRoot(HomePage);
      },
      error: function (user, error) {
        console.log(error);
      }
    });
  }

}
