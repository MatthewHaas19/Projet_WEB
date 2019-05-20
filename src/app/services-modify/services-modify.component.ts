import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ServicesService} from '../../services.service';
import {switchMap} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TypeGroup, UploadServiceComponent} from '../services/services.component';
import {MatDialog} from '@angular/material';


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
  selector: 'app-services-modify',
  templateUrl: './services-modify.component.html',
  styleUrls: ['./services-modify.component.scss']
})
export class ServicesModifyComponent implements OnInit {

  TypesGroups: TypeGroup[] = [];

  // We store the infos of the service that we will create
  infos = {
    name: '',
    type: '',
    desc: '',
    price: 0,
    image: 'assets/images/service.jpg', // We define a default image for a service
  };

  idService
  OldImage

  serviceForm: FormGroup;
  fileUrl: string;
  SubmitBlocked = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private services: ServicesService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
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

    const id = this.route.snapshot.paramMap.get('id');

    this.services.getAservice(id).subscribe(service => {
        this.infos.image = service.image
        this.OldImage = service.image
        console.log(service)
        this.idService = service.idService

        this.serviceForm.patchValue({
          name: service.name,
          type: {libelle: service.libelle,
            idType: service.idType},
          desc: service.desc,
          price: service.price
        })
    })

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
      console.log('test');
    }
    if(this.OldImage === this.infos.image){
      this.OldImage = 'assets/images/service.jpg'
    }
    if (!this.SubmitBlocked) {
      this.services.modifyService(this.OldImage,this.infos, this.idService).then((res) => {
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
