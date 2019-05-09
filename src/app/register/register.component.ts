import {Component, OnInit} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';

import {UserService} from '../user.service';
import {Router} from '@angular/router';
import { User } from '../models/User.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  userForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
      phone: ['', Validators.required]
    })
  }

  onSubmitForm() {
    const formValue = this.userForm.value;

    if(formValue['password'] != formValue['cpassword']){
      alert("Passwords do not match")
      return;
    }
    const newUser = new User(
      formValue['firstname'],
      formValue['lastname'],
      formValue['email'],
      formValue['password'],
      formValue['phone'],
    );
    this.userService.addUser(newUser).subscribe(data =>{
      console.log(data);
      if(data.success) {
        this.router.navigate(['']);
      }
      else {
        alert(data.message);
      }
    })
  }

}
