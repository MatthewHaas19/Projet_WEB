import { Component, OnInit } from '@angular/core';
import {ServicesService} from '../../services.service';
import {AuthentificationService} from '../../authentification.service';
import {OrderService} from '../../order.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';


export interface ServiceDetails {
  name: string;
  idType: string;
  price: number;
  desc: string;
  image: string;
}

export interface Services {
  name: string;
  idType: string;
  libelle: string;
  price: number;
  desc: string;
  image: string;
}

export interface IdType {
  idType: string;
}


@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {

  MyServices: ServiceDetails[];

  private idType: IdType;

  constructor(private services: ServicesService,
              private auth: AuthentificationService,
              private order: OrderService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  // We init this page by getting all the services en then we will deplay them
  ngOnInit() {
    this.services.getServices().subscribe(
      service => {
        this.MyServices = service;
        for (let i = 0; i < this.MyServices.length; i++) {
           this.GetLibelle(this.MyServices[i].idType, i);
        }
      },
      err => {
        console.error((err));
      }
    );
  }

  // We get the libelle of a service type with his id
  GetLibelle(type: string, i) {
        this.services.LibelleOfServices(type).subscribe(data => {
          this.MyServices[i].idType = data.libelle.toString();
          console.log(this.MyServices);
    });
  }

  // We create an order for the user which order the service
  OrderOne(name) {
    this.auth.profile().subscribe(
      user => {
        this.order.OrderOne(name, user.id);
        this.snackBar.open('Ty for your order', '!', {
          duration: 2000,
        });
        // We refresh the router-outlet to actualise the count of pending orders in the navbar
        this.router.navigate(['cart']);
        this.router.navigate(['services-list']);

      },
      err => {
        console.error((err));
      }
    );
  }

}
