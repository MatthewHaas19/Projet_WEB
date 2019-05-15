import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../order.service';
import {MatTableDataSource} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {WorkerAuthService} from '../../WorkerAuth.service';

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

  constructor(private order: OrderService, private worker: WorkerAuthService) { }

  ngOnInit() {
    this.getAllPendingOrder();
  }

  getAllPendingOrder() {
    this.order.getPendingOrders().subscribe(data => {
      for (const order of data) {
        console.log(this.Orders);
        this.Orders.push(order);
      }
      this.dataSource = new MatTableDataSource(this.Orders)
    });
  }

  PickAnOrder(name) {
    console.log(name)
    this.Orders = []
    this.worker.profile().subscribe(
      user => {
        this.order.PickAnOrder(name, user.id).subscribe(data => {
          this.getAllPendingOrder()
          console.log(data);
        })
      },
      err => {
        console.error((err))
      }
    )
  }

}
