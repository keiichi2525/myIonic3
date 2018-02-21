import { IData, Person } from './../../model';
import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //namePerson: string;

  age: number;
  sex: string = 'ชาย';
  groups: Array<IData> = [];
  fullname: string = 'John Doe';

  constructor(public navCtrl: NavController) {
    this.age = 20;

    this.groups.push({ id: 1, name: 'pongpiboon tanuwongwiwat' });
    this.groups.push({ id: 2, name: 'Steve job' });

    let person = new Person();
    person.setFullname('pongpiboon' , 'tanuwongwiwat');
    //person.getFullname();
  }

  showName(group: IData){
    console.log(group.id, group.name);
  }

  /*showAlert(name: string){
    // console.log(name)
    let alert = this.alertCtrl.create({
      title: 'Alert Controller',
      subTitle: 'Hello ' + name,
      buttons: ['OK']
    });
    alert.present();
  }*/

  
}


