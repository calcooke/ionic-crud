import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';


import {ReactiveFormsModule} from '@angular/forms';
import { PlayerServiceProvider } from '../providers/player-service/player-service';
import { HttpClientModule } from '@angular/common/http';


import { AngularFirestoreModule } from 'angularfire2/firestore';


import {EditPlayerPage} from '../pages/edit-player/edit-player';

import {AngularFireModule} from 'angularfire2';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';


var config = {
  
	//Firebase config

};

@NgModule({
  declarations: [
    MyApp,
    EditPlayerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    ReactiveFormsModule,
    HttpClientModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EditPlayerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PlayerServiceProvider,
    AngularFireAuth,
    AuthServiceProvider
  ]
})
export class AppModule {}
