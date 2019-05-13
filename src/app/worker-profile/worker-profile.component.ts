import { Component, OnInit } from '@angular/core';
import {WorkerDetails, WorkerAuthService} from '../../WorkerAuth.service';



@Component({
  selector: 'app-worker-profile',
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.scss']
})
export class WorkerProfileComponent implements OnInit {


  details : WorkerDetails

  constructor(private auth: WorkerAuthService) { }

  ngOnInit() {
    this.auth.profile().subscribe(
      user => {
        this.details = user
      },
      err => {
        console.error((err))
      }
    )
  }

}
