import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map'


@Injectable()
export class CustomerProvider {

  constructor(public http: Http, @Inject('API_URL') public url: string ) {
    console.log('Hello CustomerProvider Provider');
  }

  getCustomers(token) {
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

  getGroups(token) {
    let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token': token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + '/customers/groups', options).map(res => res.json().rows)
  }
}
