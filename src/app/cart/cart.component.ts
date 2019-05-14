import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../../authentification.service';
import {OrderService} from '../../order.service';
import {MatTableDataSource} from '@angular/material';

interface Order {
  idOrder: number;
  orderDate: Date;
  orderStatus: string;
}


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  Orders: Order[] = [];
  dataSource

  displayedColumns: string[] = ['id', 'status', 'date'];

  constructor(private auth: AuthentificationService, private order: OrderService) { }

  ngOnInit() {
    this.getAllOrder();
  }

  getColor(status):string{
    if(status === 'pending'){
      return 'red'
    }else{
      return 'lime'
    }
  }

  getAllOrder() {
    this.auth.profile().subscribe(
      user => {
        this.order.getAllPendingOrders(user.id).subscribe(data => {
          for (const order of data) {
            console.log(this.Orders);
            this.Orders.push(order);
          }
          this.dataSource = new MatTableDataSource(this.Orders)
        });
      },
      err => {
        console.error((err));
      }
    );
  }

}
