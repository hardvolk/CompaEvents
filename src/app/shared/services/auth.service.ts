import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  public userState: Observable<firebase.User>;
  public userIsAuthenticated$: Observable<boolean>;
  public user: firebase.User;
  public redirectUrl = '';

  readonly STORAGE_KEY = 'compa_user_id_key'

  constructor(private afAuth: AngularFireAuth) {
    if(!window.sessionStorage) {
      console.error('Tu navegador no tiene soporte para esta aplicación');
    } else this.init();
  }

  init() {
    this.userState = this.afAuth.authState;
    this.userState.subscribe(user => {
      this.user = user;
      if(this.user) {
        sessionStorage.setItem(this.STORAGE_KEY, this.user.uid);
      }      
    });
    this.userIsAuthenticated$ = this.afAuth.authState.pipe(map((fUser) => fUser != null));
  }

  isAuthenticated(): boolean {
    const ssUser = sessionStorage.getItem(this.STORAGE_KEY);
    return ssUser != null && ssUser !== "";
  }

  removeSession() {
    this.afAuth.auth.signOut();
    sessionStorage.removeItem(this.STORAGE_KEY);
    this.user = null;
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

  sendPasswordReset(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

}
