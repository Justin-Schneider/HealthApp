import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Parse} from 'parse';
import {CreateGroupPage} from "../create-group/create-group";
import {Data} from '../../providers/data';


@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {

  CreateGroupPage = CreateGroupPage;
  groups = [];
  userGroup: string = 'No Group';


  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: Data) {
    this.groups = this.dataService.getDataGroups();
    let user = Parse.User.current();
    this.userGroup = user.get("Group");
  }

  ionViewDidLoad() {

  }

  ChangeGroup(group) {
    let user = Parse.User.current();
    let Group = Parse.Object.extend("Group");
    let query = new Parse.Query(Group);
    let newMembers = [];
    query.equalTo("name", user.get("Group"));
    query.find({
      success: function (results) {
        for (let i = 0; results.length > i; i++) {
          let object = results[i];
          for (let j = 0; j < object.get("members").length; j++) {
            if (object.get("members")[i].id != user.id) {
              newMembers[i] = results.members[i];
            }
          }
          object.set("members", newMembers);
          object.save();
        }
      },
      error: function (error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
    let Group2 = Parse.Object.extend("Group");
    let query2 = new Parse.Query(Group2);
    query2.equalTo("name", group.name);
    query2.find({
      success: function(results) {
        for(let i = 0; i < results.length; i++){
          results[i].add("members", user);
          results[i].save();
        }
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
    user.set("Group", group.name);
    this.userGroup = user.get("Group");
  }


}
