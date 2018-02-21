import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  user: Object;
  users: Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get( 'user' );
    this.users = this.navParams.get( 'users' );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

}
