import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AuthentificationService, TokenPayload} from '../../authentification.service';
import {Router} from '@angular/router';
import {ServicesService} from '../../services.service';

export interface Type {
  libelle: string;
  idType: number;
}

export interface TypeGroup {
  disabled?: boolean;
  name: string;
  type: Type[];
}

export interface DialogData {
  file: string;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {


  TypeList : Type[];
  TypesGroups: TypeGroup[] = []

  infos = {
    name: '',
    type: '',
    desc: '',
    price: 0
  }


  file: string;
  serviceForm: FormGroup;


  constructor(public dialog: MatDialog,
              private formBuilder: FormBuilder,
              private services: ServicesService,
              private router: Router) {}

  ngOnInit(): void {
    this.initForm();

    this.services.getTypes().subscribe(
      service => {
        const add ={
          name : 'Ménager',
          type : service
        }
        console.log(add)
        this.TypesGroups.push(add)
      },
      err => {
        console.error((err))
      }
    )
  }

  initForm() {
    this.serviceForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      desc: ['', Validators.required],
      price: ['', Validators.required]
    })
  }


  onSubmitForm() {

    const formValue = this.serviceForm.value;
    this.infos.name = formValue['name'];
    this.infos.type = formValue['type'].idType;
    this.infos.desc = formValue['desc'];
    this.infos.price = formValue['price'];

    this.services.addService2(this.infos).then((res) => {
      this.router.navigate(['/services-list'])
    })

  }

  openDialog(): void {
    console.log('test')
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: {file: this.file}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.file = result;
    });
  }
}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./services.component.scss']
})
export class DialogOverviewExampleDialogComponent {

  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
