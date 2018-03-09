
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events, App } from 'ionic-angular';

import { MapPage } from './../map/map';
import { LoginPage } from './../login/login';
import { AddCustomerPage } from './../add-customer/add-customer';

// provider
import { CustomerProvider } from './../../providers/customer/customer';

interface ICustomer {
  id: number;
  first_name?: string;
  last_name?: string;
  sex?: string;
  image?: string;
  email?: string;
}

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
  providers: [CustomerProvider]
})
export class MainPage {

  //users: Array<{ name: string , email: string} > = [];
  // customers: any;
  customers: Array<ICustomer> = [];
  token: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customerProvider: CustomerProvider,
    public loadingCtrl: LoadingController,
    public events: Events,
    public app: App
  ) {
    //this.users.push({ name: 'John Doe', email: 'john@mail.com' });
    //this.users.push({ name: 'Steve Job', email: 'steve@mail.com' });
    this.token = localStorage.getItem('token');
  }

  goDetail(_customer) {
    this.navCtrl.push(MapPage, { customer: _customer, cusotmers: this.customers });
  }

  ionViewWillEnter() {
    console.log('hello MainPage');
    let loader = this.loadingCtrl.create({
      content: 'Please wait',
      spinner: 'dots'
    });
    loader.present();
    this.customers = [];
    this.customerProvider.getCustomers(this.token)
      .subscribe(res => {
        console.log('loading.....')
        loader.dismiss();
        this.customers = res;
      }, error => {
        loader.dismiss();
        console.log(error);
      });
    // .then(data => {
    //   loader.dismiss();
    //   // this.customers = data.rows;
    // console.log(data);
    //   data.rows.forEach(v => {
    //     let obj = {
    //       id:  v.id,
    //       first_name: v.first_name,
    //       last_name: v.last_name,
    //       sex: v.sex,
    //       email: v.email,
    //       image: v.image ? 'data:image/jpeg;base64,' + v.image : null
    //       // image: v.image
    //     };
    //     this.customers.push(obj);
    // //   });
    // }, error => {
    //   loader.dismiss();
    // });  

  }

  logout() {
    //this.navCtrl.setRoot(LoginPage);
    // remove token
    localStorage.removeItem('token');
    //this.events.publish('logout'); 
    this.app.getRootNav().push(LoginPage);
    //nav.setRoot(LoginPage);
  }

  add() {
    this.navCtrl.push(AddCustomerPage);
  }
}
