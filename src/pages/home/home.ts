import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  contacts = [
    { name:'Training', phone:'083-071-3373'},
    { name:'Support', phone:'083-071-3373'},
    { name:'Customer Service', phone:'083-071-3373'}
  ]

  constructor(public navCtrl: NavController) {

  }

  showDetail(contact){
    this.navCtrl.push("DetailPage",contact)
    //alert(contact.name)
  }

}
