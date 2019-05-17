import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../../authentification.service';
import {OrderService} from '../../order.service';
import {MatTableDataSource} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {WorkerAuthService} from '../../WorkerAuth.service';

// We define the interface Order which correspond to the info of the order + the infos of the service

interface Order {
  idOrder: number;
  orderDate: string;
  orderStatus: string;
  name: string;
  desc: string;
  price: number;
  image: string;
}


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  // We define an animation with @angular/animation, by default the height is 0 and when clicking we change of state and we expand the details
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CartComponent implements OnInit {

 // We will us this array to store the response of the http request
  Orders: Order[] = [];

  dataSource;
  expandedElement: Order | null;

  // We define in which order we will display the column
  displayedColumns: string[] = ['idOrder', 'name', 'orderStatus', 'orderDate'];

  // We import the services that we will use in this component
  constructor(private auth: AuthentificationService,
              private worker: WorkerAuthService,
              private order: OrderService) { }

  // ngOnInit() is the function that will be executed at the start of the script
  ngOnInit() {
    this.getAllOrder();
  }


  // we display the column with a color corresponding to the order status
  getColor(status): string {
    if (status.toString() === 'pending') {
      return 'red';
    } else {
      if (status.toString() === 'On his way') {
        return 'lime';
      }
      return 'black';
    }
  }

  // We get all the orders of a user
  getAllOrder() {
    this.auth.profile().subscribe(
      user => {
        this.order.getAllPendingOrders(user.id).subscribe(data => {
          this.getInfoOrder(data);
        });
      },
      err => {
        console.error((err));
      }
    );
  }

  // And then we get the info of the service corresponding to the order
  getInfoOrder(orders) {
    for (const order of orders) {
      this.order.getServiceByOrder(order.idOrder).subscribe(data => {

        const aOrder = {
          idOrder: 0,
          idWorker: 0,
          orderDate: '',
          orderStatus: '',
          name: '',
          desc: '',
          price: 0,
          firstname: '',
          lastname: '',
          image: '',
        };

        aOrder.idOrder = order.idOrder;
        aOrder.orderStatus = order.orderStatus;
        aOrder.orderDate = 'il y a ' + (Math.round((new Date().getTime() - new Date(order.orderDate).getTime())/60000)).toString() + ' minutes';
        aOrder.idWorker = order.idWorker;

        if(data){
          aOrder.name = data.name;
          aOrder.desc = data.desc;
          aOrder.price = data.price;
          aOrder.image = data.image;

        }

        if (order.idWorker) {
          this.worker.workerById(order.idWorker).subscribe(worker => {
            aOrder.firstname = worker.firstname;
            aOrder.lastname = worker.lastname;
            this.Orders.push(aOrder);
            this.dataSource = new MatTableDataSource(this.Orders);
          });
        } else {
          this.Orders.push(aOrder);
          this.dataSource = new MatTableDataSource(this.Orders);
        }
      });
    }
  }
}
