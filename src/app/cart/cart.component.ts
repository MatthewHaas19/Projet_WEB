import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../../authentification.service';
import {OrderService} from '../../order.service';
import {MatTableDataSource} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {WorkerAuthService} from '../../WorkerAuth.service';

interface Order {
  idOrder: number;
  orderDate: Date;
  orderStatus: string;
  name: string;
  desc: string;
  price: number;
}


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CartComponent implements OnInit {


  Orders: Order[] = [];

  dataSource
  expandedElement: Order | null;

  displayedColumns: string[] = ['idOrder', 'name', 'orderStatus', 'orderDate'];

  constructor(private auth: AuthentificationService,
              private worker: WorkerAuthService,
              private order: OrderService) { }

  ngOnInit() {
    this.getAllOrder();
  }

  getColor(status):string{
    if(status.toString() === 'pending'){
      return 'red'
    }else{
      if(status.toString() === 'On his way'){
        return 'lime'
      }
      return 'black'
    }
  }

  getAllOrder() {
    this.auth.profile().subscribe(
      user => {
        this.order.getAllPendingOrders(user.id).subscribe(data => {
          this.getInfoOrder(data)
        });
      },
      err => {
        console.error((err));
      }
    );
  }

  getInfoOrder(orders){
    for (const order of orders) {


      this.order.getServiceByOrder(order.idOrder).subscribe(data=>{
        var aOrder = {
          idOrder: 0,
          idWorker: 0,
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
        aOrder.idWorker = order.idWorker

        aOrder.name = data.name
        aOrder.desc = data.desc
        aOrder.price = data.price

        if(order.idWorker){
          this.worker.workerById(order.idWorker).subscribe(worker => {
            aOrder.firstname = worker.firstname
            aOrder.lastname = worker.lastname
            this.Orders.push(aOrder);
            this.dataSource = new MatTableDataSource(this.Orders)
          })
        }
        else{
          this.Orders.push(aOrder);
          this.dataSource = new MatTableDataSource(this.Orders)
        }

      })


    }

  }

}
