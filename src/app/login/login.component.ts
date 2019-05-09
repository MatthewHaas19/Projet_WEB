import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  userForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
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
    const username = formValue['email'];
    const password = formValue['password'];

    this.userService.getUserDetails(username, password).subscribe(data => {
      if(data.success) {
        this.router.navigate(['home'])
      } else {
        window.alert(data.message)
      }
    });

    console.log(username,password)
  }

}

