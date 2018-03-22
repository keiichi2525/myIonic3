
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

  search(token: string, query: string) {
    let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + '/customers/search/' + query, options).map(res => res.json().rows)
  }

  getMap(token: string, customerId: number) {
    let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + '/customers/get-map/' + customerId, options).map(res => res.json())
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

  saveMap(token: string, customerId: any, lat: string, lng: string) {
    let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
    let options = new RequestOptions({ headers: headers });
    let body = {
      customerId: customerId,
      lat: lat,
      lng: lng
    };
    return this.http.post(this.url + '/customers/save-map', body, options).map(res => res.json())
  }

  updateCustomer(token: string, customer: any) {
    let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
    let options = new RequestOptions({ headers: headers });
    let body = {
      customerId: customer.customerId,
      firstName: customer.firstName,
      lastName: customer.lastName,
      sex: customer.sex,
      customerTypeId: customer.customerTypeId,
      telephone: customer.telephone,
      email: customer.email,
      image: customer.image
    };
    return this.http.put(this.url + '/customers', body, options).map(res => res.json())
  }

  remove(token: string, customerId: number) {
    // return new Promise((resolve, reject) => {
    //   let headers = new Headers({
    //     'Content-Type': 'application/json',
    //     'x-access-token': token
    //   });
    //   let options = new RequestOptions({ headers: headers });

    //   this.http.delete(`${this.url}/customers/${customerId}`, options)
    //     .map(res => res.json())
    //     .subscribe(data => {
    //       resolve(data)
    //     }, err => {
    //       reject(err)
    //     });
    // });
    let headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(this.url + '/customers/' + customerId, options)
    .map(res => res.json())
  }

  detail(token: string, customerId: number) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': token
    });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + '/customers/detail/' + customerId, options)
    .map(res => res.json())
  }

}
