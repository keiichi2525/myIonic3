
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CustomerProvider } from './../../providers/customer/customer';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

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
    public customerprovider: CustomerProvider,
    public geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    public launchnavigator: LaunchNavigator
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

  ionViewWillEnter() {
    this.customerprovider.getMap(this.token, this.customer.id)
      .subscribe(res => {
        console.log(res);
        if (res.ok) {
          if ((res.latLng.lat != null) || (res.latLng.lng != null))  {
            this.customerLat = res.latLng.lat;
            this.customerLng = res.latLng.lng;
            //center marker
            this.lat = res.latLng.lat;
            this.lng = res.latLng.lng;
            //
          } else {
            this.getCurrentLocation();
          }
        }
      }, error => {

      });
  }

  mapClick(event) {
    console.log(event);
    this.customerLat = event.coords.lat;
    this.customerLng = event.coords.lng;
  }

  save() {
    this.customerprovider.saveMap(this.token, this.customer.id, this.customerLat, this.customerLng)
      .subscribe(res => {
        if (res.ok) {
          alert('Success');
        }
      }, error => {

      });
  }

  getCurrentLocation() {
    console.log('get current location');
    let loader = this.loadingCtrl.create({
      content: 'Locating..',
      spinner: 'dots'
    });
    loader.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      loader.dismiss();
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
    }).catch((error) => {
      loader.dismiss();
      console.log('Error getting location', error);
    });
  }

  launchNavigator() {
    let options: LaunchNavigatorOptions = {
      start: [this.lat, this.lng]
      // app: LaunchNavigator.APPS.UBER
    };
    this.launchnavigator.navigate([this.customerLat, this.customerLng], options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }
}
