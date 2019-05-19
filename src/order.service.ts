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

  OrderOne(name, idUser): Observable<any>{
    this.order.name = name
    this.order.idUser = idUser
    return this.http.post('/api/orderOne', this.order);
  }

  public orderDelete(id) : Observable<any>{
    return this.http.delete('/api/orderDelete/'+id);
  }

  public getAllPendingOrders(idUser): Observable<any>{
    return this.http.get('/api/OrderPending/'+idUser)
  }

  public getPendingOrders(): Observable<any>{
    return this.http.get('/api/OrderAllPending')
  }

  public PickAnOrder(order,id): Observable<any>{
    return this.http.put('/api/PickAnOrder/'+id,order)
  }

  public getServiceByOrder(idOrder): Observable<any>{
    return this.http.get('/api/getServiceByOrder/'+idOrder)
  }

  public getWorkerOrders(idWorker): Observable<any>{
    return this.http.get('/api/getWorkerOrders/'+idWorker)
  }

  public setFinished(order): Observable<any> {
    return this.http.put('/api/setFinished', order)
  }

}
