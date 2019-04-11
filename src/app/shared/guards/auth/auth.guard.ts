import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Observable, of as observableOf } from 'rxjs';
import { take, map, mergeMap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private _router: Router, private _auth: AuthService, private _db: AngularFireDatabase,) { }

  // Verifies if the user is signed in to continue
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._auth.userState.pipe(
      take(1),
      mergeMap(user => {
        if(!user) return this.redirectToAuth(state.url);
        return this._db.object(`/users/${ user.uid }`).valueChanges().pipe(
          map(userInfo => {
            if(!userInfo) {
              this.redirectToAuth(state.url);
              return false;
            }
            return true;
          })
        ) as Observable<boolean>;
      })
    )
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }

  redirectToAuth(afterAuthUrl): Observable<boolean> {
    this._auth.redirectUrl = afterAuthUrl;
    this._router.navigate(['auth']);
    return observableOf(false);
  }
}
