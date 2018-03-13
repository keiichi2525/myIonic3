
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map'


@Injectable()
export class CustomerProvider {

  constructor(public http: Http, @Inject('API_URL') public url: string ) {
    console.log('Hello CustomerProvider Provider');
  }

  getCustomers(token: string) {
    // return new Promise(resolve => {
      let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token});
      let options = new RequestOptions({ headers: headers });
      
    //   this.http.get(this.url + '/customers',options)
    //   .map(res => res.json().rows)
    //   // .subscribe(data => {
    //   //   resolve(data);
    //   // }, error => {
    //   //   console.log(error);
    //   // });
    // });
    return this.http.get(this.url + '/customers', options).map(res => res.json().rows)
  }

  getGroups(token: string) {
    let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + '/customers/groups', options).map(res => res.json().rows)
  }

  saveCustomer(token: string, customer: any) {
    let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
    let options = new RequestOptions({ headers: headers });
    let body = {
      firstName: customer.firstName,
      lastName: customer.lastName,
      sex: customer.sex,
      customerTypeId: customer.customerTypeId,
      telephone: customer.telephone,
      email: customer.email,
      image: customer.image
    };
    return this.http.post(this.url + '/customers', body, options).map(res => res.json())
  }
}
