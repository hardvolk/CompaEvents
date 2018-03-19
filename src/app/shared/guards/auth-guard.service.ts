import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private _router: Router, private _auth: AuthService) { }

  // Verifies if the user is signed in to continue
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this._auth.isAuthenticated()) {
      console.log('Redirect for authentification');
      this._auth.redirectUrl = state.url;
      this._router.navigate(['auth']);
      return false;
    }
    return true;
  }
}
