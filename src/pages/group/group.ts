import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { Parse } from 'parse';
import {CreateGroupPage} from "../create-group/create-group";
import { Data } from '../../providers/data';


@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {

  CreateGroupPage = CreateGroupPage;
  groups = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: Data) {
    this.groups = this.dataService.getDataGroups();
    console.log(this.groups.length);
  }

  ionViewDidLoad() {
  }

}
