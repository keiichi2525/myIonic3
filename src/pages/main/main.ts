
import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  Events,
  App,
  ActionSheetController,
  Platform,
  AlertController
} from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

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
    public app: App,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public alertCtrl: AlertController,
    public callnumber: CallNumber
  ) {
    //this.users.push({ name: 'John Doe', email: 'john@mail.com' });
    //this.users.push({ name: 'Steve Job', email: 'steve@mail.com' });
    this.token = localStorage.getItem('token');
  }

  goDetail(_customer) {
    this.navCtrl.push(MapPage, { customer: _customer, cusotmers: this.customers });
  }

  getCustomers() {
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
        // this.customers = res;
        res.forEach(v => {
          let obj = {
            id: v.id,
            first_name: v.first_name,
            last_name: v.last_name,
            sex: v.sex,
            email: v.email,
            telephone: v.telephone,
            image: v.image ? 'data:image/jpeg;base64,' + v.image : null
          };
          this.customers.push(obj);
        });
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
  ionViewWillEnter() {
    this.getCustomers();
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

  removeConfirm(customer: any) {
    let confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'ต้องการลบ '
        + customer.first_name + ' ' + customer.last_name
        + ' ใช่หรือไม่?',
      buttons: [
        {
          text: 'ยกเลิก', handler: () => {
            //
          }
        },
        {
          text: 'ลบข้อมูล',
          handler: () => {
            // this.customerProvider.remove(this.token, customer.id)
            //   .then((data: any) => {
            //     if (data.ok) {
            //       this.ionViewWillEnter();
            //     }
            //   }, (error) => {
            //     console.log(error);
            //   });
            this.customerProvider.remove(this.token, customer.id)
              .subscribe(res => {
                if (res.ok) {
                  this.getCustomers();
                }
              }, error => {
                console.log(error);
              });
          }
        }
      ]
    });
    confirm.present();
  }

  showMenu(customer: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Action menu',
      buttons: [
        {
          text: 'ลบข้อมูล',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.removeConfirm(customer);
          }
        },
        {
          text: 'แก้ไข',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            this.navCtrl.push(AddCustomerPage, { id: customer.id });
          }
        },
        {
          text: 'ดู/กำหนด แผนที่',
          icon: !this.platform.is('ios') ? 'map' : null,
          handler: () => {
            this.navCtrl.push(MapPage, { customer: customer });
          }
        },
        {
          text: 'โทร',
          icon: !this.platform.is('ios') ? 'call' : null,
          handler: () => {
            this.callnumber.callNumber(customer.telephone, true)
              .then(() => console.log('Launched dialer!'))
              .catch(() => console.log('Error launching dialer'));
          }
        },
        {
          text: 'ยกเลิก',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => { }
        }
      ]
    });
    actionSheet.present();
  }

  search(event) {
    let query = event.target.value;
    if (query && query.trim() != '') {
      this.customers = [];
      this.customerProvider.search(this.token, query)
        .subscribe(res => {
          res.forEach(v => {
            let obj = {
              id: v.id,
              first_name: v.first_name,
              last_name: v.last_name,
              sex: v.sex,
              email: v.email,
              telephone: v.telephone,
              image: v.image ? 'data:image/jpeg;base64,' + v.image : null
            };
            this.customers.push(obj);
          });
        }, error => {
          console.log(error);
        });
    } else {
      this.getCustomers();
    }

  }

  doRefresh(refresher) {
    console.log('refreshing');
    // let loader = this.loadingCtrl.create({
    //   content: 'Please wait',
    //   spinner: 'dots'
    // });
    // loader.present();
    refresher.complete();
    this.customers = [];
    this.customerProvider.getCustomers(this.token)
      .subscribe(res => {
        console.log('loading.....')
        // loader.dismiss();
        // this.customers = res;
        res.forEach(v => {
          let obj = {
            id: v.id,
            first_name: v.first_name,
            last_name: v.last_name,
            sex: v.sex,
            email: v.email,
            telephone: v.telephone,
            image: v.image ? 'data:image/jpeg;base64,' + v.image : null
          };
          this.customers.push(obj);
        });
      }, error => {
        // loader.dismiss();
        refresher.complete();
        console.log(error);
      });
  }

}
