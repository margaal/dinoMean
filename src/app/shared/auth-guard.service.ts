import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { DinoService } from './dino.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: DinoService, public router: Router) { }

  
  canActivate(): boolean {
    if (!this.auth.loggedIn) {
      this.router.navigate(['signin']);
      return false;
    }
    return true;
  }
}
