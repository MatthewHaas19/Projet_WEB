import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../order.service';
import { MatTableDataSource} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {WorkerAuthService} from '../../WorkerAuth.service';
import {AuthentificationService} from '../../authentification.service';

// We define the interface Order which correspond to the info of the order

interface Order {
  idOrder: number;
  orderDate: string;
  orderStatus: string;
}


@Component({
  selector: 'app-order-pending',
  templateUrl: './order-pending.component.html',
  styleUrls: ['./order-pending.component.scss'],
  // We define an animation with @angular/animation, by default the height is 0 and when clicking we change of state and we expand the details
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrderPendingComponent implements OnInit {

// We will us this array to store the response of the http request
  Orders: Order[] = [];
  dataSource;
  expandedElement: Order | null;

  // We define in which order we will display the column
  displayedColumns: string[] = ['idOrder', 'name', 'orderDate'];


  // We import the services that we will use in this component
  constructor(private order: OrderService, private auth: AuthentificationService  , private worker: WorkerAuthService) { }


  // ngOnInit() is the function that will be executed at the start of the script
  ngOnInit() {
    this.getAllPendingOrder();
  }


  // We get all the pending orders
  getAllPendingOrder() {
    this.order.getPendingOrders().subscribe(data => {
      this.getInfoOrder(data);
    });
  }

  // When a worker pick an order we change the status of the order an we acualise the list of pending orders
  PickAnOrder(name) {
    console.log(name);
    this.worker.profile().subscribe(
      user => {
        this.order.PickAnOrder(name, user.id).subscribe(data => {
          if(!data.error){
            for (let i = 0; i < this.Orders.length; i++) {
              if (this.Orders[i].idOrder === name.idOrder) {
                this.Orders.splice(i, 1);
                this.Orders.sort(function(obj1, obj2) {
                  return obj1.idOrder - obj2.idOrder
                });
                this.dataSource = new MatTableDataSource(this.Orders);
              }
            }
            console.log(data);
          }
          else {
            alert('Tu ne peux pas prendre plusieurs commandes de client différents')
          }
        });
      },
      err => {
        console.log(err)
      }
    );
  }


  // this function is used to get complementary info of the order (user info & service info)
  getInfoOrder(orders) {
    for (const order of orders) {
      this.order.getServiceByOrder(order.idOrder).subscribe(data => {
        let aOrder = {
          idOrder: 0,
          orderDate: '',
          orderStatus: '',
          name: '',
          desc: '',
          price: 0,
          firstname: '',
          lastname: '',
          address: '',
          phone: '',
          image: ''
        };

        aOrder.idOrder = order.idOrder;
        aOrder.orderStatus = order.orderStatus;
        aOrder.orderDate = 'il y a ' + (Math.round((new Date().getTime() - new Date(order.orderDate).getTime())/60000)).toString() + ' minutes';
        if(data){
          aOrder.name = data.name;
          aOrder.desc = data.desc;
          aOrder.price = data.price;
        }

        this.auth.userById(order.idUser).subscribe(user => {
          aOrder.firstname = user.firstname;
          aOrder.lastname = user.lastname;
          aOrder.phone = user.phone;
          aOrder.address = user.code + ' ' + user.city + ' ' + user.address
          aOrder.image = user.image;
          this.Orders.push(aOrder);
          this.Orders.sort(function(obj1, obj2) {
            return obj1.idOrder - obj2.idOrder
          });
          this.dataSource = new MatTableDataSource(this.Orders);
        });
      });
    }
  }
}
