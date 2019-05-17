import {Component, Inject, OnInit} from '@angular/core';
import {WorkerDetails, WorkerAuthService} from '../../WorkerAuth.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatTableDataSource} from '@angular/material';
import {OrderService} from '../../order.service';
import {AuthentificationService} from '../../authentification.service';
import {DialogData} from '../services/services.component';

interface Order {
  idOrder: number;
  orderDate: string;
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

// We will store the worker detail in that variable
  details: WorkerDetails;

  constructor(private auth: WorkerAuthService,
              private order: OrderService,
              private user: AuthentificationService,
              public dialog: MatDialog) { }

  reviewPosted = 0;

  Orders: Order[] = [];

  // At the start of the script we initialise the profile by getting the info of the worker and also the order he is doing right now
  ngOnInit() {
    this.auth.profile().subscribe(
      user => {
        this.details = user;
      },
      err => {
        console.error((err));
      }
    );
    this.getAllOrder();
  }

  // We open a dialog page to display the info of the user while the worker his clicking on it
  openDialog(order): void {
    const dialogRef = this.dialog.open(OrderInfoDialogComponent, {
      width: '500px',
      data: {firstname: order.firstname, lastname: order.lastname, desc: order.desc}
    });

    // If the worker has done the order we delete it and if he post a review we add the review
    dialogRef.afterClosed().subscribe(result => {
      if(result !== 'null'){
        if (result) {
          this.auth.profile().subscribe(worker => {
            const review = {
              idUser: order.idUser,
              idWorker: worker.id,
              content: result
            };
            this.auth.addReview(review).subscribe(data => {
              console.log(data);
            });
          })
        }

        this.order.setFinished(order).subscribe(data => {
          console.log(data);
          for (let i = 0; i < this.Orders.length; i++) {
            if (this.Orders[i].idOrder === order.idOrder) {
              this.Orders.splice(i, 1);
            }
          }
        });
      }

    });

  }

  // We use that function to get all the orders of the worker
  getAllOrder() {
    this.auth.profile().subscribe(
      worker => {
        this.order.getWorkerOrders(worker.id).subscribe(data => {
          this.getInfoOrder(data);
        });
      },
      err => {
        console.error((err));
      }
    );
  }

// This function will bring complementary infos like the user and the service info
  getInfoOrder(orders) {
    for (const order of orders) {
      this.order.getServiceByOrder(order.idOrder).subscribe(data => {
        let aOrder = {
          idOrder: 0,
          idWorker: 0,
          orderDate: '',
          orderStatus: '',
          name: '',
          desc: '',
          price: 0,
          firstname: '',
          lastname: '',
          idUser: 0
        };

        aOrder.idOrder = order.idOrder;
        aOrder.orderStatus = order.orderStatus;
        aOrder.orderDate = 'il y a ' + (Math.round((new Date().getTime() - new Date(order.orderDate).getTime())/60000)).toString() + ' minutes';
        aOrder.idWorker = order.idWorker;

        if(data){
          aOrder.name = data.name;
          aOrder.desc = data.desc;
          aOrder.price = data.price;
        }


        this.user.userById(order.idUser).subscribe(user => {
          aOrder.firstname = user.firstname;
          aOrder.lastname = user.lastname;
          aOrder.idUser = user.id;
          this.Orders.push(aOrder);
          console.log(this.Orders);
        });

      });


    }

  }

}

// We definie the dialog component that we will open in a window
@Component({
  selector: 'app-oder-info',
  templateUrl: 'order-info.html'
})
export class OrderInfoDialogComponent {

  constructor(public dialogRef: MatDialogRef<OrderInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData2) {}

  onNoClick(): void {
    this.dialogRef.close('null');
  }
}
