import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthentificationService, TokenPayload} from '../../authentification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


// We define credentials to ensure to not have a conflict of data type with the authentification service
  credentials: TokenPayload = {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
  };

  userForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private auth: AuthentificationService,
              private router: Router) {}
  ngOnInit(): void {
    if(this.auth.isLoggedIn()){
      this.auth.logout();
    }
    this.initForm();
  }
// We Init the form with the validators
  initForm() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

// We store the result of the form and we send them to the server. If the infos are correct
// we redirect the user and if not we alert the user
  onSubmitForm() {

    const formValue = this.userForm.value;
    this.credentials.email = formValue.email;
    this.credentials.password = formValue.password;

    this.auth.login(this.credentials).subscribe((data) => {
        console.log(data);
        if (data.error == 'Incorrect Details') {
        alert(data.error);
      } else {
        this.router.navigate(['profile']);
        console.log('Welcome !');
      }
    });
  }
}

