import { Component, OnInit } from '@angular/core';
import {ServicesService} from '../../services.service';


export interface ServiceDetails {
  name: string;
  idType: string;
  desc: string;
}

export interface Services {
  name: string;
  idType: string;
  libelle: string;
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
  AllServices: Services[] = [];
  aService: Services = {
    name : '',
    idType: '',
    libelle: '',
    desc: ''
  };
  Test;
  private idType: IdType;
  private ResidType: IdType;

  constructor(private services: ServicesService) { }

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

}
