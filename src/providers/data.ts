import {Storage} from '@ionic/storage';
import {Injectable} from '@angular/core';
import {Parse} from 'parse';


@Injectable()
export class Data {

  private parseAppId: string = '0q6ZGd60u0v0CgzLzCdrk1ElE31UtDWvblWnG3R8';
  private parseJSKey: string = 'bmGqM4keT2TWm9vALGQzBAJzSrwegLCEEXKPNmZn';
  private parseServerUrl: string = 'https://parseapi.back4app.com/';

  constructor(public Storage: Storage) {

    Parse.initialize(this.parseAppId, this.parseJSKey);
    Parse.serverURL = this.parseServerUrl;

    console.log('Initiated Parse');

  }


}
