import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TokenPayload} from '../../authentification.service';
import {WorkerAuthService} from '../../WorkerAuth.service';


@Component({
  selector: 'app-worker-login',
  templateUrl: './worker-login.component.html',
  styleUrls: ['./worker-login.component.scss']
})
export class WorkerLoginComponent implements OnInit {

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
              private worker: WorkerAuthService,
              private router: Router) {}
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  onSubmitForm() {

    const formValue = this.userForm.value;
    this.credentials.email = formValue.email;
    this.credentials.password = formValue.password;

    this.worker.login(this.credentials).subscribe((data) => {
      console.log(data);
      if (data.error === 'Incorrect Details') {
        alert(data.error);
      } else {
        this.router.navigate(['worker-profile']);
      }
    });
  }
}

