import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Parse } from 'parse';


@Injectable()
export class Data {

  private parseAppId: string = '0q6ZGd60u0v0CgzLzCdrk1ElE31UtDWvblWnG3R8';
  private parseJSKey: string = 'bmGqM4keT2TWm9vALGQzBAJzSrwegLCEEXKPNmZn';
  private parseServerUrl: string = 'https://parseapi.back4app.com/';

  constructor(public Storage: Storage) {

    Parse.initialize(this.parseAppId, this.parseJSKey);
    Parse.serverURL = this.parseServerUrl;

  }

  getDataGroups(){
    const Group = Parse.Object.extend("Group");
    let query = new Parse.Query(Group);
    query.limit(1000);
    let items = [];
    query.find().then((groups) => {
      for(let i = groups.length - 1; i >= 0; i--){

        let MyGroups = {
          name:groups[i].get("name")
        };
        items.push(MyGroups);
      }
      return items;
    });
    return items;
  }

  getGroupNames(){
    let names = [];
    let user = Parse.User.current();
    let Group = Parse.Object.extend("Group");
    let query = new Parse.Query(Group);
    query.equalTo("name", user.get("Group"));
    query.first({
      success: function (object) {
        for(let i = 0 ; i < object.get("members").length; i++){
          names[i] = object.get("members")[i].get("username");
        }
        return names;
      },
      error: function (error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
    return names;
  }

  getLineData(){
    let data = [];
    let user = Parse.User.current();
    let Group = Parse.Object.extend("Group");
    let query = new Parse.Query(Group);
    query.equalTo("name", user.get("Group"));
    query.first({
      success: function (object) {
        for(let i = 0 ; i < object.get("members").length; i++){
          data[i] = object.get("members")[i].get("Hydration")[object.get("members")[i].get("Hydration").length - 1][0];
        }
        return data;
      },
      error: function (error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
    return data;
  }

  getPieData(){
    let data = [];
    let user = Parse.User.current();
    let Group = Parse.Object.extend("Group");
    let query = new Parse.Query(Group);
    query.equalTo("name", user.get("Group"));
    query.first({
      success: function (object) {
        for(let i = 0 ; i < object.get("members").length; i++){
          data[i] = object.get("members")[i].get("Steps")[object.get("members")[i].get("Steps").length - 1][0];
        }
        return data;
      },
      error: function (error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
    return data;
  }

  getBarData(){
    let data = [];
    let user = Parse.User.current();
    let Group = Parse.Object.extend("Group");
    let query = new Parse.Query(Group);
    query.equalTo("name", user.get("Group"));
    query.first({
      success: function (object) {
        for(let i = 0 ; i < object.get("members").length; i++){
          data[i] = object.get("members")[i].get("Calories")[object.get("members")[i].get("Calories").length - 1][0];
        }
        return data;
      },
      error: function (error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
    return data;
  }

  setStepData(number){
    let user = Parse.User.current();
    let today = new Date().toLocaleDateString();
    let steps = [number, today];
    let added = false;
    let userSteps = user.get("Steps");
    console.log(userSteps);
    for(let i = 0; i < userSteps.length; i++){
      if(userSteps[i][1] == today){
        userSteps[i][0] += steps;
        added = true;
      }
    }
    if(added == false){
      user.add("Hydration", steps);
    }
    else{
      user.set("Hydration", userSteps);
    }
    user.save();
  }

}
