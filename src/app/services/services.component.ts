import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Router} from '@angular/router';
import {ServicesService} from '../../services.service';

// We use those two interface to store the type of the services
export interface Type {
  libelle: string;
  idType: number;
}

export interface TypeGroup {
  disabled?: boolean;
  name: string;
  type: Type[];
}

// We use that interface to dialog with the upload component
export interface DialogData {
  file: string;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  TypesGroups: TypeGroup[] = [];

  // We store the infos of the service that we will create
  infos = {
    name: '',
    type: '',
    desc: '',
    price: 0,
    image: 'assets/images/service.jpg', // We definie a default image for a service
  };


  serviceForm: FormGroup;
  fileUrl: string;
  SubmitBlocked = false;

  constructor(public dialog: MatDialog,
              private formBuilder: FormBuilder,
              private services: ServicesService,
              private router: Router) {}


  // We get all or types from the server side to permit the admin to choose a type while creating the new service
  ngOnInit(): void {
    this.initForm();

    this.services.getTypes().subscribe(
      service => {
        const add = {
          name : 'Ménager',
          type : service
        };
        console.log(add);
        this.TypesGroups.push(add);
      },
      err => {
        console.error((err));
      }
    );
  }

  // we verify that all the infos of the form are entered
  initForm() {
    this.serviceForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      desc: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

 // We collect the info of the service and then we submit them to the server and then we navigate the admin to the service list
  onSubmitForm() {

    const formValue = this.serviceForm.value;
    this.infos.name = formValue.name;
    this.infos.type = formValue.type.idType;
    this.infos.desc = formValue.desc;
    this.infos.price = formValue.price;
    if (this.fileUrl && this.fileUrl !== '') {
      this.infos.image = this.fileUrl;
    }

    if (!this.SubmitBlocked) {
      this.services.addService2(this.infos).then((res) => {
        this.router.navigate(['']);
      });
    }

  }

  // If the admin click on the upload button if open a dialog page in which he will be able to download an image for the order
  openDialog(): void {
    this.SubmitBlocked = true;
    const dialogRef = this.dialog.open(UploadServiceComponent, {
      width: '250px',
      data: {file: this.fileUrl}
    });

    // we store the image url which was upload by the admin
    dialogRef.afterClosed().subscribe(result => {
      this.SubmitBlocked = false;
      console.log('The dialog was closed');
      if (result) {
        this.infos.image = result;
      }
    });
  }


}


// We create an other component in which we will display the window which will permit the admin to upload an image for the service
@Component({
  selector: 'app-upload-service',
  templateUrl: 'upload-service.html',
  styleUrls: ['./services.component.scss']
})
export class UploadServiceComponent {

  constructor(public dialogRef: MatDialogRef<UploadServiceComponent>,
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
        console.log('url:', url);
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
