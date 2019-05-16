import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../order.service';
import {MatTableDataSource} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {WorkerAuthService} from '../../WorkerAuth.service';
import {AuthentificationService} from '../../authentification.service';

interface Order {
  idOrder: number;
  orderDate: Date;
  orderStatus: string;
}


@Component({
  selector: 'app-order-pending',
  templateUrl: './order-pending.component.html',
  styleUrls: ['./order-pending.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrderPendingComponent implements OnInit {


  Orders: Order[] = [];
  dataSource
  expandedElement: Order | null;

  displayedColumns: string[] = ['idOrder', 'orderStatus', 'orderDate'];

  constructor(private order: OrderService,private auth: AuthentificationService  ,private worker: WorkerAuthService) { }

  ngOnInit() {
    this.getAllPendingOrder();
  }

  getAllPendingOrder() {
    this.order.getPendingOrders().subscribe(data => {
      this.getInfoOrder(data)
    });
  }

  PickAnOrder(name) {
    console.log(name)
    this.worker.profile().subscribe(
      user => {
        this.order.PickAnOrder(name, user.id).subscribe(data => {
          for(let i=0;i<this.Orders.length;i++){
            if(this.Orders[i].idOrder === name.idOrder){
              this.Orders.splice(i,1)
              this.dataSource = new MatTableDataSource(this.Orders)
            }
          }
          console.log(data);
        })
      },
      err => {
        console.error((err))
      }
    )
  }

  getInfoOrder(orders){
    for (const order of orders) {


      this.order.getServiceByOrder(order.idOrder).subscribe(data=>{
        var aOrder = {
          idOrder: 0,
          orderDate: new Date(),
          orderStatus: '',
          name: '',
          desc: '',
          price: 0,
          firstname: '',
          lastname: ''
        }

        aOrder.idOrder = order.idOrder
        aOrder.orderStatus = order.orderStatus
        aOrder.orderDate = order.orderDate
        aOrder.name = data.name
        aOrder.desc = data.desc
        aOrder.price = data.price

        this.auth.userById(order.idUser).subscribe(user => {
          aOrder.firstname = user.firstname
          aOrder.lastname = user.lastname
          this.Orders.push(aOrder);
          this.dataSource = new MatTableDataSource(this.Orders)
        })
      })


    }

  }


}
