
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable,Inject } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginProvider {

  constructor(public http: Http , @Inject('API_URL') public url: string) {
    console.log('Hello LoginProvider Provider');
  }

  doLogin(username: string, password: string) {
    return new Promise(resolve => {
      let headers = new Headers({ 'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers });
      let body = {username: username, password: password};
      this.http.post(this.url + '/users/login',body,options)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      }, error => {
        console.log(error);
      });
    });
  }
}
