
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import * as moment from 'moment';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  // birthDate: any;
  sex: string;
  email: string;
  telephone: string;
  firstName: string;
  lastName: string;
  customerTypeId: number;
  base64Image: string;
  imageData: string;
  customerId: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customerProvider: CustomerProvider,
    private camera: Camera
  ) {
    this.sexes.push({ id: 1, name: 'ชาย' });
    this.sexes.push({ id: 2, name: 'หญิง' });
    this.token = localStorage.getItem('token');
    // this.birthDate = moment().format('YYYY-MM-DD');
    this.customerId = this.navParams.get('id');
  }

  ionViewWillEnter() {
    if (this.customerId) {
      this.customerProvider.detail(this.token, this.customerId)
        .subscribe(res => {
          if (res.ok) {
            this.firstName = res.customer.first_name;
            this.lastName = res.customer.last_name;
            this.sex = res.customer.sex;
            this.customerTypeId = res.customer.customer_type_id;
            this.imageData = res.customer.image;
            this.base64Image = res.customer.image ?
              'data:image/jpeg;base64,' + res.customer.image : null;
            this.telephone = res.customer.telephone;
            this.email = res.customer.email;
          }
        }, error => {
          console.log(error);
        });
    }
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

  save() {
    let customer = {
      customerId: this.customerId,
      firstName: this.firstName,
      lastName: this.lastName,
      sex: this.sex,
      email: this.email,
      telephone: this.telephone,
      customerTypeId: this.customerTypeId,
      image: this.imageData
    };
    
    let promise;
    if (this.customerId) {
      promise = this.customerProvider.updateCustomer(this.token, customer);
    } else {
      promise = this.customerProvider.saveCustomer(this.token, customer);
    }
    promise.subscribe(res => {
      console.log(res);
      if (res.ok) {
        // alert('Success');
        this.navCtrl.pop();
      }
    }, error => {
      alert(error);
    });
  }

  takePicture() {
    const options: CameraOptions = {
      targetWidth: 800,
      targetHeight: 600,
      correctOrientation: true,
      quality: 100,
      // allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imageData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {

    });
  }

  browsePicture() {
    const options: CameraOptions = {
      targetWidth: 800,
      targetHeight: 600,
      correctOrientation: true,
      quality: 100,
      // allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options)
      .then((imageData) => {
        this.imageData = imageData;
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {

      });
  }
}
