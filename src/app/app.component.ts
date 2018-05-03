import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {CaloriesPage} from "../pages/calories/calories";
import {HydrationPage} from "../pages/hydration/hydration";
import {LeaderBoardPage} from "../pages/leader-board/leader-board";
import {StepsPage} from "../pages/steps/steps";
import {GroupPage} from "../pages/group/group";
import {Parse} from 'parse';
import { Facebook } from '@ionic-native/facebook';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,  private fb: Facebook) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Home', component: HomePage},
      {title: 'Steps', component: StepsPage},
      {title: 'Hydration', component: HydrationPage},
      {title: 'Calories', component: CaloriesPage},
      {title: 'LeaderBoard', component: LeaderBoardPage},
      {title: 'My Group', component: GroupPage},
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logout(){
    this.fb.logout()
      .then( res => location.reload())
      .catch(e => console.log('Error logout from Facebook', e));
    Parse.User.logOut();
    location.reload();
  }
}
