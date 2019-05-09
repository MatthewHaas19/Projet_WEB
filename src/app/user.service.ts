import { Injectable } from '@angular/core';
import { User } from './models/User.model';
import {HttpClient} from '@angular/common/http';


interface myData {
  message: string,
  success : boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addUser(user: User) {
    const firstname = user.firstname;
    const lastname = user.lastname;
    const email = user.email;
    const password = user.password;
    const phone = user.phone;
    console.log(user)
    return this.http.post<myData>('/api/register', {
      firstname,
      lastname,
      email,
      password,
      phone
    })
  }

  getUserDetails(username, password) {
    return this.http.post<myData>('/api/login', {
      username,
      password
    });
  }
}
