import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private _router: Router, private _auth: AuthService) { }

  // Verifies if the user is signed in to continue
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._auth.userState.pipe(
      take(1),
      map(user => {
        if(!user) {
          this._auth.redirectUrl = state.url;
          this._router.navigate(['auth']);
          return false;
        } else return true;
      })
    )
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }
}
