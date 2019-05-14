import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthentificationService, TokenPayload} from '../../authentification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{



  credentials: TokenPayload = {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
  }

  userForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private auth: AuthentificationService,
              private router: Router) {}
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required]
    })
  }


  onSubmitForm() {

    const formValue = this.userForm.value;
    this.credentials.email = formValue['email'];
    this.credentials.password = formValue['password'];

    this.auth.login(this.credentials).subscribe((data) =>{
        console.log(data)
      if(data.error == 'Incorrect Details'){
        alert(data.error)
      }else{
        this.router.navigate(['profile']);
        console.log('Welcome !')
      }
    })
  }
}

