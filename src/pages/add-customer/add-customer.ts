
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
// providers
import { CustomerProvider } from './../../providers/customer/customer';

@IonicPage()
@Component({
  selector: 'page-add-customer',
  templateUrl: 'add-customer.html',
  providers: [CustomerProvider]
})
export class AddCustomerPage {

  sexes: Array<{ id: number, name: string }> = [];
  groups: Array<{ id: number, name: string }> = [];
  token: string;
  birthDate: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public customerProvider: CustomerProvider
  ) {
    this.sexes.push({ id: 1, name: 'ชาย' });
    this.sexes.push({ id: 2, name: 'หญิง' });
    this.token = localStorage.getItem('token');
    this.birthDate = moment().format('YYYY-MM-DD');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCustomerPage');
    this.groups = [];
    this.customerProvider.getGroups(this.token)
    .subscribe(res => {
      console.log(res);
      this.groups = res;
    }, error => {

    });
  }

}
