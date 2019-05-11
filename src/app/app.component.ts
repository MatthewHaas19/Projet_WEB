import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthentificationService} from '../authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router,private auth: AuthentificationService) {}

  Login() {
  this.router.navigate([''])
  }

  isAuth() {
    return this.auth.isLoggedIn();
  }

  Logout() {
    this.auth.logout()
    this.router.navigate([''])
  }

  Register() {
  this.router.navigate(['register'])
}


}
