import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserProvider {

  url: string = 'https://jsonplaceholder.typicode.com';
  constructor(public http: HttpClient) {
    
  }

  getUsers() {
    // return new Promise(resolve => {
    //   this.http.get(this.url + '/users').subscribe(data => {
    //     resolve(data);
    //   } , error => {
    //     console.log(error);
    //   });
    // });
    return this.http.get(this.url + '/users')
  }
}
