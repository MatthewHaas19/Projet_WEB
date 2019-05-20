import {Component, Inject, OnInit} from '@angular/core';
import { AuthentificationService, UserDetails } from '../../authentification.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatTableDataSource} from '@angular/material';
import {ServicesService} from '../../services.service';
import {DialogData, UploadServiceComponent} from '../services/services.component';
import {OrderService} from '../../order.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

// We will store the user detail in that variable
  details: UserDetails;
  review = []
  fileUrl = ''
  dataSource
  displayedColumns: string[] = ['Content'];
  reviewCount = 0;
  orderCount = 0;

  constructor(private auth: AuthentificationService, public dialog: MatDialog, public order: OrderService, private router: Router) { }

  // At the start of the script we initialise the profile by getting the info of the user
  ngOnInit() {
    this.auth.profile().subscribe(
      user => {
        this.details = user;
        this.GetAllReview(user.id)
        this.GetReviewCount(user.id)
        this.GetOrderCount(user.id)
      },
      err => {
        console.error((err));
      }
    );
  }

  GetAllReview(idUser) {
    this.auth.getReview(idUser).subscribe(review => {
        console.log(review)
        for(const aReview of review){
          const aRev = {
            Content: ''
          }
          aRev.Content = aReview.Content;
          this.review.push(aRev)
          console.log(aRev)
          console.log(this.review)
          this.dataSource = new MatTableDataSource(this.review);
        }
    })
  }


  GetReviewCount(idUser) {
    this.auth.getReviewCount(idUser).subscribe(review => {
      this.reviewCount = review.count
    })
  }

  GetOrderCount(idUser) {
    this.order.getOrderCount(idUser).subscribe(order => {
      this.orderCount = order.count
    })
  }


  // If the admin click on the upload button if open a dialog page in which he will be able to download an image for the order
  openDialog(): void {
    const dialogRef = this.dialog.open(UploadProfileComponent, {
      width: '250px',
      data: {file: this.fileUrl}
    });

    // we store the image url which was upload by the admin
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.details.image = result
        console.log(result)
        this.auth.modify(this.details.id,result).subscribe()
      }
    });
  }


}


// We create an other component in which we will display the window which will permit the admin to upload an image for the service
@Component({
  selector: 'app-upload-profile',
  templateUrl: 'upload-profile.html',
  styleUrls: ['../services/services.component.scss']
})
export class UploadProfileComponent {

  constructor(public dialogRef: MatDialogRef<UploadProfileComponent>,
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
