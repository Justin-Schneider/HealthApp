import {Storage} from '@ionic/storage';
import {Injectable} from '@angular/core';
import {Parse} from 'parse';


@Injectable()
export class Data {

  private parseAppId: string = '0q6ZGd60u0v0CgzLzCdrk1ElE31UtDWvblWnG3R8';
  private parseJSKey: string = 'bmGqM4keT2TWm9vALGQzBAJzSrwegLCEEXKPNmZn';
  private parseServerUrl: string = 'https://parseapi.back4app.com/';

  constructor(public Storage: Storage) {

    Parse.initialize(this.parseAppId, this.parseJSKey,);
    Parse.serverURL = this.parseServerUrl;
  }

  getDataGroups() {
    const Group = Parse.Object.extend("Group");
    let query = new Parse.Query(Group);
    query.limit(1000);
    let items = [];
    query.find().then((groups) => {
      for (let i = groups.length - 1; i >= 0; i--) {

        let MyGroups = {
          name: groups[i].get("name")
        };
        items.push(MyGroups);
      }
      return items;
    });
    return items;
  }

  getGroupNames() {
    let names = [];
    let user = Parse.User.current();
    let Group = Parse.Object.extend("Group");
    let query = new Parse.Query(Group);
    query.equalTo("name", user.get("Group"));
    query.first({
      success: function (object) {
        for (let i = 0; i < object.get("members").length; i++) {
          let query2 = new Parse.Query(Parse.User);
          query2.equalTo("objectId", object.get("members")[i].id);
          query2.find({
            success: function (result) {
              for (let j = 0; j < result.length; j++) {
                names[i] = result[j].attributes.username;
              }
            }
          });
        }
        return names;
      },
      error: function (error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
    return names;
  }

  getLineData() {
    let data = [];
    let user = Parse.User.current();
    let Group = Parse.Object.extend("Group");
    let query = new Parse.Query(Group);
    query.equalTo("name", user.get("Group"));
    query.first({
      success: function (object) {
        for (let i = 0; i < object.get("members").length; i++) {
          let query2 = new Parse.Query(Parse.User);
          query2.equalTo("objectId", object.get("members")[i].id);
          query2.find({
            success: function (result) {
              console.log(result);
              for (let j = 0; j < result.length; j++) {
                data[i] = result[j].attributes.Hydration[result[j].attributes.Hydration.length - 1][0];
              }
            }
          });
        }
        return data;
      },
      error: function (error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
    return data;
  }

  getPieData() {
    let data = [];
    let user = Parse.User.current();
    let Group = Parse.Object.extend("Group");
    let query = new Parse.Query(Group);
    query.equalTo("name", user.get("Group"));
    query.first({
      success: function (object) {
        for (let i = 0; i < object.get("members").length; i++) {
          let query2 = new Parse.Query(Parse.User);
          query2.equalTo("objectId", object.get("members")[i].id);
          query2.find({
            success: function (result) {
              for (let j = 0; j < result.length; j++) {
                data[i] = result[j].attributes.Steps[result[j].attributes.Steps.length - 1][0];
              }
            }
          });
        }
        return data;
      },
      error: function (error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
    return data;
  }

  getBarData() {
    let data = [];
    let user = Parse.User.current();
    let Group = Parse.Object.extend("Group");
    let query = new Parse.Query(Group);
    query.equalTo("name", user.get("Group"));
    query.first({
      success: function (object) {
        for (let i = 0; i < object.get("members").length; i++) {
          let query2 = new Parse.Query(Parse.User);
          query2.equalTo("objectId", object.get("members")[i].id);
          query2.find({
            success: function (result) {
              for (let j = 0; j < result.length; j++) {
                data[i] = result[j].attributes.Calories[result[j].attributes.Calories.length - 1][0];
              }
            }
          });
        }
        return data;
      },
      error: function (error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
    return data;
  }

  setStepData(number) {
    let user = Parse.User.current();
    let today = new Date().toLocaleDateString();
    let steps = [number, today];
    let added = false;
    let userSteps = user.get("Steps");
    for (let i = 0; i < userSteps.length; i++) {
      if (userSteps[i][1] == today) {
        userSteps[i][0] += steps;
        added = true;
      }
    }
    if (added == false) {
      user.add("Steps", steps);
    }
    else {
      user.set("Steps", userSteps);
    }
    user.save();
  }

}
