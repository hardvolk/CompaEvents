import { Injectable } from '@angular/core';
import { UserInfo } from 'shared/interfaces/user-info';
import { AuthService } from 'shared/services/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor( private _db: AngularFireDatabase, 
               private _auth: AuthService ) { }

  getUser(uid): Observable<any> {
    return this._db.object(`/users/${ uid }`).valueChanges();
  }

  getCurrent(): Observable<UserInfo> {
    const personaInfo$ = this._auth.userState.pipe(mergeMap((user) => {
      return this._db.object(`/users/${ user.uid }`).valueChanges().map((userInfo) => {
        return Object.assign(userInfo, { email: user.email })
      }) as Observable<UserInfo>;
    }));
    return personaInfo$;
  }

  updateUser(user: UserInfo) {
    return this._db.object(`/users/${ user.uid }`).update(user);
  }

}
