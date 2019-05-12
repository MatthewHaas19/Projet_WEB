import { Component, OnInit } from '@angular/core';
import {ServicesService} from '../../services.service';
import {AuthentificationService} from '../../authentification.service';
import {OrderService} from '../../order.service';


export interface ServiceDetails {
  name: string;
  idType: string;
  price: number;
  desc: string;
}

export interface Services {
  name: string;
  idType: string;
  libelle: string;
  price: number;
  desc: string;
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
              private order: OrderService) { }

  ngOnInit() {
    this.services.getServices().subscribe(
      service => {
        this.MyServices = service;
        const AllServices: Services[] = [];
        for (var i=0;i<this.MyServices.length;i++) {
           this.GetLibelle(this.MyServices[i].idType,i)
        }
      },
      err => {
        console.error((err));
      }
    );
  }

  GetLibelle(type: string,i) {
        this.services.LibelleOfServices(type).subscribe(data => {
          this.MyServices[i].idType = data.libelle.toString();
          console.log(this.MyServices)
    });
  }

  OrderOne(name){
    this.auth.profile().subscribe(
      user => {
        this.order.OrderOne(name, user.id)
      },
      err => {
        console.error((err))
      }
    )
  }

}
