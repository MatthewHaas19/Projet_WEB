import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthentificationService} from '../authentification.service';
import {OrderService} from '../order.service';
import {Location} from '@angular/common';
import {WorkerAuthService} from '../WorkerAuth.service';
import {ThemePalette} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  color = 'accent';

  Auth = false;
  Admin = false;
  Worker = false;

  // We refresh the order count when navigating and the display the content in a certain color depending of the routes
  constructor(private router: Router,
              private auth: AuthentificationService,
              private order: OrderService,
              private worker: WorkerAuthService,
              private location: Location) {
    router.events.subscribe(val => {
      this.ngOnInit()
      if (location.path() === '/worker-login' ||
        location.path() === '/worker-register' ||
        location.path() === '/worker-profile' ||
        location.path() === '/order-pending') {
        this.color = 'primary';
      } else {
        this.color = 'accent';
      }
    });
  }

  OrderNumber = 0;


  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.OrderCount();
      this.Auth = true;
      this.Admin = this.auth.isAdmin()
    }
    this.Worker = this.worker.isLoggedIn()
  }


  Login() {
    this.router.navigate(['/login']);
  }

  Profile() {
    this.router.navigate(['/profile']);
  }


  isAuth() {
    return this.Auth
  }

  isWorker() {
    return this.Worker
  }

  isAdmin() {
    return this.Admin
  }

  Services() {
    this.router.navigate(['']);
  }

  Logout() {
    this.auth.logout();
    this.Auth = false;
    this.router.navigate(['']);
  }

  Register() {
  this.router.navigate(['register']);
}



  LogoutWorker() {
    this.worker.logout();
    this.Worker = false;
    this.router.navigate(['']);
  }


// We count the number of order of a client
  OrderCount() {
    this.auth.profile().subscribe(
      user => {
        this.order.getAllPendingOrders(user.id).subscribe(data => {
          this.OrderNumber = data.length;
        });
      },
      err => {
        console.error((err));
      }
    );
  }


}
