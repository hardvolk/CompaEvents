import { Injectable } from '@angular/core';
import { UserInfo } from 'shared/interfaces/user-info';
import { AuthService } from 'shared/services/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of as observableOf } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

interface INewUser {
    uid: string,
    email: string,
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor( private _db: AngularFireDatabase, 
               private _auth: AuthService ) { }

  getUser(uid): Observable<UserInfo | null> {
    return this._db.object(`/users/${ uid }`).valueChanges().pipe(map((data) => data ? data as UserInfo : null));
  }

  getCurrent(): Observable<UserInfo | null> {
    const personaInfo$ = this._auth.userState.pipe(
      mergeMap((user) => {
        if(!user) return observableOf(null);
        return this._db.object(`/users/${ user.uid }`).valueChanges().map((userInfo) => {
          return Object.assign(userInfo, { email: user.email })
        }) as Observable<UserInfo>;
    }));
    return personaInfo$;
  }

  setNewUser(user: INewUser) {
    return this._db.object(`/users/${ user.uid }`).update(user);
  }

  updateUser(user: UserInfo) {
    return this._db.object(`/users/${ user.uid }`).update(user);
  }

}
