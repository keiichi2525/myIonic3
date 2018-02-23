
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';

import { MapPage } from './../map/map';
import { LoginPage } from './../login/login';

// provider
import { UserProvider } from './../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  //users: Array<{ name: string , email: string} > = [];
  users: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userProvider: UserProvider,
    public loadingCtrl: LoadingController,
    public events: Events
  ) {
    //this.users.push({ name: 'John Doe', email: 'john@mail.com' });
    //this.users.push({ name: 'Steve Job', email: 'steve@mail.com' });
    
  }

  goDetail(_user){
    this.navCtrl.push(MapPage, {user: _user, users: this.users});
    }

  ionViewWillEnter(){
    console.log('hello MainPage');
    let loader  = this.loadingCtrl.create({
      content: 'Please wait',
      spinner: 'dots'
    });
    loader.present();

    this.userProvider.getUsers()
    .then(data => {
      loader.dismiss();
      this.users = data;
    }, error => {
      loader.dismiss();
    });  
    
  }
    
  logout() {
    //this.navCtrl.setRoot(LoginPage);
    // remove token
    localStorage.removeItem('token');
    this.events.publish('logout');
  }
}
