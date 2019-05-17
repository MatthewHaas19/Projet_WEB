import {Component, OnInit} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';

import {Router} from '@angular/router';
import {AuthentificationService, TokenPayload} from '../../authentification.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;

// We define credentials to ensure to not have a conflict of data type with the authentification service
  credentials: TokenPayload = {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
  };


  constructor(private formBuilder: FormBuilder,
              private auth: AuthentificationService,
              private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  // We Init the form with the validators
  initForm() {
    this.userForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  // We store the results of the form and we send them to the server. If the email is not already taken
  // we redirect the user and if not we alert the user
  onSubmitForm() {
    const formValue = this.userForm.value;

    if (formValue.password != formValue.cpassword) {
      alert('Passwords do not match');
      return;
    }

    this.credentials.firstname = formValue.firstname;
    this.credentials.lastname = formValue.lastname;
    this.credentials.email = formValue.email;
    this.credentials.password = formValue.password;
    this.credentials.phone = formValue.phone;

    this.auth.register(this.credentials).subscribe(
      (data) => {
        console.log(data);
        if (data.error == 'User already exists') {
          alert('User already exist');
        } else {
          this.router.navigate(['profile']);
        }
      },
      err => {
        console.error(err);
      }
    );
  }
}
