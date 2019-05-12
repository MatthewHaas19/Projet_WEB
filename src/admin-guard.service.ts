import { Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthentificationService} from './authentification.service';

@Injectable()
export class AdminGuardService implements CanActivate {

  isAdmin = 'false';

  constructor(private auth: AuthentificationService, private router: Router) {}

  canActivate() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/');
      return false;
    } else {
      if(!this.auth.isAdmin()){
        this.router.navigateByUrl('/');
        return false;
      }
      return true
    }
  }


}

