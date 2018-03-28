import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {Parse} from 'parse';

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  username: string = '';
  password: string = '';
  verify: string = '';
  email: string = '';

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  public doRegister() {

    /** TODO: check that verfiy equals password **/
    let user = new Parse.User();
    user.set("username", this.username);
    user.set("password", this.password);
    user.set("email", this.email);

    let self = this;
    user.signUp(null, {
      success: function (user) {
        console.log("signup success " + user.get("username"));
        self.navCtrl.pop();
      },
      error: function (user, error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });

    console.log("sign up");
  }

}
