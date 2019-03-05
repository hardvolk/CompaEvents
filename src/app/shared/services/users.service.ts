import { Injectable } from '@angular/core';
import { UserInfo } from 'shared/interfaces/user-info';
import { AuthService } from 'shared/services/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  currentUser: UserInfo;

  constructor( private _db: AngularFireDatabase, 
               private _auth: AuthService ) { }

  getCurrentUserInfo(uid): Observable<any> {
    return this._db.object(`/users/${ uid }`).valueChanges();
  }

  getCurrentUserState(): Observable<firebase.User> {
    return this._auth.userState;
  }

}
