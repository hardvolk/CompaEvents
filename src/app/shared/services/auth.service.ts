import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  public userState: Observable<firebase.User>;
  public user: firebase.User;
  public redirectUrl = '';

  constructor(private afAuth: AngularFireAuth) {
    this.userState = this.afAuth.authState;
    this.userState.subscribe(user => {
      this.user = user;
      console.log('User Info: ', this.user);
    });
  }

  isAuthenticated(): boolean {
    return this.user != null;
  }

  // Sign up method
  signUpWithEmail(email: string, password: string): Promise<any> {
    return this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password);
  }

  // Sign-in Methods
  signInWithGoogle(): Promise<any> {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  signInWithEmail(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  updateProfile(params) {
    return this.afAuth.auth.currentUser.updateProfile(params);
  }

}
