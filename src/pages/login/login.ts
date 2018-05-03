import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Parse} from 'parse';
import {Data} from "../../providers/data";
import { Facebook } from '@ionic-native/facebook';

import {HomePage} from '../home/home';
import {RegistrationPage} from "../registration/registration";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  RegistrationPage = RegistrationPage;
  password: string = '';
  username: string = '';

  isLoggedIn:boolean = false;
  users: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, data: Data, private fb: Facebook) {
    fb.getLoginStatus()
      .then(res => {
        console.log(res.status);
        if(res.status === "connect") {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log(e));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if(res.status === "connected") {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
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
