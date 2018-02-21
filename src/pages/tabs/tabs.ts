
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SettingPage } from './../setting/setting';
import { MessagePage } from './../message/message';
import { ContactPage } from './../contact/contact';
import { MainPage } from './../main/main';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tabMain: any;
  tabContact: any;
  tabMessage: any;
  tabSetting: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tabMain = MainPage;
    this.tabContact = ContactPage;
    this.tabMessage = MessagePage;
    this.tabSetting = SettingPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
