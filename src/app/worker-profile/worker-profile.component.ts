import {Component, Inject, OnInit} from '@angular/core';
import {WorkerDetails, WorkerAuthService} from '../../WorkerAuth.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatTableDataSource} from '@angular/material';
import {OrderService} from '../../order.service';
import {AuthentificationService} from '../../authentification.service';
import {DialogData} from '../services/services.component';

interface Order {
  idOrder: number;
  orderDate: Date;
  orderStatus: string;
  name: string;
  desc: string;
  price: number;
}

export interface DialogData2 {
  firstname: string;
  lastname: string;
  desc: string;
  review: string;
}

@Component({
  selector: 'app-worker-profile',
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.scss']
})
export class WorkerProfileComponent implements OnInit {


  details : WorkerDetails

  constructor(private auth: WorkerAuthService,
              private order: OrderService,
              private user: AuthentificationService,
              public dialog: MatDialog) { }


  Orders: Order[] = [];

  ngOnInit() {
    this.auth.profile().subscribe(
      user => {
        this.details = user
      },
      err => {
        console.error((err))
      }
    )
    this.getAllOrder()
  }

  openDialog(order): void {
    const dialogRef = this.dialog.open(OrderInfoDialogComponent,{
      width: '500px',
      data: {firstname: order.firstname, lastname: order.lastname, desc: order.desc}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        //Ajouter un avis
        this.order.setFinished(order).subscribe(data=>{
          console.log(data)
          for(let i=0;i<this.Orders.length;i++){
            if(this.Orders[i].idOrder === order.idOrder){
              this.Orders.splice(i,1)
            }
          }
        })
      };
    })

  }

  getAllOrder() {
    this.auth.profile().subscribe(
      worker => {
        this.order.getWorkerOrders(worker.id).subscribe(data => {
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

        this.user.userById(order.idUser).subscribe(user => {
          aOrder.firstname = user.firstname
          aOrder.lastname = user.lastname
          this.Orders.push(aOrder);
          console.log(this.Orders)
        })

      })


    }

  }

}


@Component({
  selector: 'app-oder-info',
  templateUrl: 'order-info.html'
})
export class OrderInfoDialogComponent {

  constructor(public dialogRef: MatDialogRef<OrderInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData2) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
