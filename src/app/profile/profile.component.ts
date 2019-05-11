import { Component, OnInit } from '@angular/core';
import { AuthentificationService, UserDetails } from '../../authentification.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  details : UserDetails

  constructor(private auth: AuthentificationService) { }

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
