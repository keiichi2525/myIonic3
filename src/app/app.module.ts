
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MainPage } from './../pages/main/main';
import { MapPage } from './../pages/map/map';
import { TabsPage } from './../pages/tabs/tabs';
import { SettingPage } from './../pages/setting/setting';
import { MessagePage } from './../pages/message/message';
import { ContactPage } from './../pages/contact/contact';
import { LoginPage } from './../pages/login/login';

// provider
import { UserProvider } from '../providers/user/user';
import { LoginProvider } from '../providers/login/login';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage,
    MapPage,
    TabsPage,
    MessagePage,
    ContactPage,
    SettingPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainPage,
    MapPage,
    TabsPage,
    MessagePage,
    ContactPage,
    SettingPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: 'API_URL',useValue: 'http://localhost:3000'},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    LoginProvider
  ]
})
export class AppModule {}
