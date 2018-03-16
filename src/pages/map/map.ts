
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CustomerProvider } from './../../providers/customer/customer';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  providers: [CustomerProvider]
})
export class MapPage {
  // user: Object;
  // users: Array<any>;
  customer: any;
  
  lat: number = 51.678418;
  lng: number = 7.809007;
  zoomLevel: number = 18;

  customerLat: any;
  customerLng: any;
  customerName: string;

  token: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public customerprovider: CustomerProvider
  ) {
    // this.user = this.navParams.get( 'user' );
    // this.users = this.navParams.get( 'users' );
    this.customer = this.navParams.get('customer');
    this.customerName = this.customer.first_name + ' ' + this.customer.last_name;
    this.token = localStorage.getItem('token');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  mapClick (event) {
    console.log(event);
    this.customerLat = event.coords.lat;
    this.customerLng = event.coords.lng;
  }

  save() {
    this.customerprovider.saveMap(this.token, this.customer.id, this.customerLat, this.customerLng)
    .subscribe(res => {
      if (res.ok) {
        console.log('Success');
      }
    }, error => {

    });
  }
}
