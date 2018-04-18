import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from "@ionic/storage";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages//login/login';
import { RegistrationPage } from '../pages/registration/registration';
import { CaloriesPage } from '../pages/calories/calories';
import { GroupPage } from '../pages/group/group';
import { HydrationPage } from '../pages/hydration/hydration';
import { LeaderBoardPage } from '../pages/leader-board/leader-board';
import { StepsPage } from '../pages/steps/steps';
import { CreateGroupPage } from "../pages/create-group/create-group";
import { Data } from '../providers/data';
import {AddHydrationPage} from "../pages/add-hydration/add-hydration";

import { Pedometer } from '@ionic-native/pedometer';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrationPage,
    CaloriesPage,
    GroupPage,
    HydrationPage,
    LeaderBoardPage,
    StepsPage,
    CreateGroupPage,
    AddHydrationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrationPage,
    CaloriesPage,
    GroupPage,
    HydrationPage,
    LeaderBoardPage,
    StepsPage,
    CreateGroupPage,
    AddHydrationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Data,
    Pedometer
  ]
})
export class AppModule {}
