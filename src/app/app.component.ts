import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthentificationService} from '../authentification.service';
import {OrderService} from '../order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private router: Router,private auth: AuthentificationService, private order: OrderService) {}

  OrderNumber = 0;

  ngOnInit(): void {
    this.OrderCount()
  }

  Cart(){
    this.router.navigate(['/cart'])
  }

  Login() {
  this.router.navigate([''])
  }

  isAuth() {
    return this.auth.isLoggedIn();
  }

  isAdmin() {
    return this.auth.isAdmin();
  }

  Services() {
    this.router.navigate(['/services-list'])
  }
  AddServices(){
    this.router.navigate(['/services'])
  }

  Logout() {
    this.auth.logout()
    this.router.navigate([''])
  }

  Register() {
  this.router.navigate(['register'])
}

  OrderCount(){
    this.auth.profile().subscribe(
      user => {
        this.order.getAllPendingOrders(user.id).subscribe(data => {
          this.OrderNumber = data.length
        })
      },
      err => {
        console.error((err))
      }
    )
  }


}
