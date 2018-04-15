import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {Parse} from 'parse';

@Component({
  selector: 'page-create-group',
  templateUrl: 'create-group.html',
})
export class CreateGroupPage {

  GroupName: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
  }

  ionViewDidLoad() {

  }

  //TODO: if the user already has group remove it from the group
  public createGroup() {
    let user = Parse.User.current();
    let Group = Parse.Object.extend("Group");
    let group = new Group();
    group.set("name", this.GroupName);
    user.set("Group", this.GroupName);
    group.add("members", user);
    group.save(null, {
      success: function (group) {

      },
      error: function (group, error) {
        alert('Failed to create new object, with error code: ' + error.message);
      }
    })

    this.view.dismiss();
  }

  close() {
    this.view.dismiss();
  }
}
