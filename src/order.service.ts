import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


interface OrderDetails {
  name: string;
  idUser: number;

}

@Injectable()
export class OrderService {

  order: OrderDetails = {
    name: '',
    idUser: 0
  }

  constructor(private http: HttpClient, private router: Router){}

  OrderOne(name, idUser){
    this.order.name = name
    this.order.idUser = idUser
    this.http.post('/api/orderOne', this.order).subscribe(() => {
      console.log('order added');
    });
  }

  public OrderCount(idUser): Observable<any>{
    return this.http.get('/api/OrderPending/'+idUser)
  }

}
