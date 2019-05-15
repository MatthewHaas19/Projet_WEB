import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

export interface ServiceDetails {
  name: string;
  type: string;
  desc: string;
  price: number;
}

export interface IdType {
  idType: string;
}



@Injectable()
export class ServicesService {

  constructor(private http: HttpClient, private router: Router) {}

  public addService2(service: ServiceDetails): Promise<any> {
    return new Promise((resolve) => {
      console.log(service);
      this.http.post('/api/addService', service).subscribe(() => {
        console.log('service added');
        resolve()
      });
    })
  }

  public getTypes(): Observable<any> {
    return this.http.get('/api/typeServices');
  }

  public getServices(): Observable<any> {
    return this.http.get('/api/getServices');
  }

  public LibelleOfServices(idType): Observable<any>{
    return this.http.get('/api/LibelleOfServices/'+idType)
  }

}
