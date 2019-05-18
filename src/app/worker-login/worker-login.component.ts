import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TokenPayload2, WorkerAuthService} from '../../WorkerAuth.service';


@Component({
  selector: 'app-worker-login',
  templateUrl: './worker-login.component.html',
  styleUrls: ['./worker-login.component.scss']
})
export class WorkerLoginComponent implements OnInit {

// We define credentials to ensure to not have a conflict of data type with the workerAuth service
  credentials: TokenPayload2 = {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    image: '',
  };

  userForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private worker: WorkerAuthService,
              private router: Router) {}

  ngOnInit(): void {
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
// we redirect the worker and if not we alert him
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

