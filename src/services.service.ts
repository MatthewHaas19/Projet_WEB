import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

export interface ServiceDetails {
  name: string;
  type: string;
  desc: string;
}



@Injectable()
export class ServicesService {

  constructor(private http: HttpClient, private router: Router) {}

  public addService(service: ServiceDetails) {
    console.log(service);
    this.http.post('/api/addService', service).subscribe(()=> {
      console.log('service added')
    })
  }

  public getTypes(): Observable<any> {
    return this.http.get('/api/typeServices');
  }

}
