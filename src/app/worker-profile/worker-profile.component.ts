import {Component, Inject, OnInit} from '@angular/core';
import {WorkerDetails, WorkerAuthService} from '../../WorkerAuth.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatTableDataSource} from '@angular/material';
import {OrderService} from '../../order.service';
import {DialogData} from '../services/services.component';
import {ServicesService} from '../../services.service';
import {AuthentificationService} from '../../authentification.service';
import {Router} from '@angular/router';

interface Order {
  idOrder: number;
  idWorker: number;
  orderDate: string;
  orderStatus: string;
  name: string;
  desc: string;
  price: number;
  image: string;
  firstname: string;
  lastname: string;
  idUser: number;
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
  fileUrl: string;

  constructor(private auth: WorkerAuthService,
              private order: OrderService,
              private user: AuthentificationService,
              public dialog: MatDialog,
              private router: Router) { }

  reviewPosted = 0;
  dataSource;
  Orders: Order[] = [];
  displayedColumns: string[] = ['choose','idOrder', 'orderDate', 'name'];
  displayedColumns2: string[] = ['idOrder', 'orderDate', 'name'];
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
      width: '350px',
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
              this.dataSource = new MatTableDataSource(this.Orders);
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
        const aOrder = {
          idOrder: 0,
          idWorker: 0,
          orderDate: '',
          orderStatus: '',
          name: '',
          desc: '',
          price: 0,
          image: '',
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
          this.dataSource = new MatTableDataSource(this.Orders);
          console.log(this.Orders);
        });

      });


    }

  }

  // If the admin click on the upload button if open a dialog page in which he will be able to download an image for the order
  openDialog2(): void {
    const dialogRef = this.dialog.open(UploadWorkerProfileComponent, {
      width: '250px',
      data: {file: this.fileUrl}
    });

    // we store the image url which was upload by the admin
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.details.image = result
        console.log(result)
        this.auth.modify(this.details.id, result).subscribe()
      }
    });
  }


}


// We create an other component in which we will display the window which will permit the admin to upload an image for the service
@Component({
  selector: 'app-upload-worker-profile',
  templateUrl: 'upload-worker-profile.html',
  styleUrls: ['worker-profile.component.scss']
})
export class UploadWorkerProfileComponent {

  constructor(public dialogRef: MatDialogRef<UploadWorkerProfileComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private services: ServicesService) {}

  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;


  // if the admin decide to not upload a file
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Uploading the file on firebase and keeping the url of file,
  // we store the state of upload to evit bug if the admin submit while the file is loading
  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.services.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.data.file = url;
        this.fileIsUploading = false;
        this.fileUploaded = true ;
      }
    );
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }
// We send back the file path to the service component
  UploadValidate() {
    this.data.file = this.fileUrl;
    this.dialogRef.close(this.data.file);
  }

}


// We definie the dialog component that we will open in a window
@Component({
  selector: 'app-oder-info',
  templateUrl: 'order-info.html',
  styleUrls: ['worker-profile.component.scss']
})
export class OrderInfoDialogComponent {

  constructor(public dialogRef: MatDialogRef<OrderInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData2) {}

  onNoClick(): void {
    this.dialogRef.close('null');
  }
}
