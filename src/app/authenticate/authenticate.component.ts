import { Component, OnInit } from '@angular/core';
import { AuthService } from './../shared/services/auth.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UsersService } from 'shared/services/users.service';
import { SpinnerService } from 'shared/spinner/spinner.service';
import { take } from 'rxjs/operators';
import { UserInfo } from 'shared/interfaces/user-info';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {

  email: string;
  password: string;
  resetPwdEmailSent = false;
  isNewUser = false;

  constructor(private _auth: AuthService,
              private _user: UsersService,
              private _spinner: SpinnerService, 
              private _ngbModal: NgbModal, 
              private _router: Router) {
                this._auth.userIsAuthenticated$.pipe(take(1)).subscribe((authenticated) => {
                  if(authenticated) {
                    this._auth.removeSession();
                  }
                });
  }

  ngOnInit() {
  }

  signInWithGoogle(): void {
    this._auth.signInWithGoogle()
        .then(data => {
          this.validateUserInfo(data.user);
        })
        .catch(error => console.error(error));
  }

  signInWithEmail(modalContent): void {
    if ( this.email === '' || this.password === '') { return; }

    this._auth.signInWithEmail(this.email, this.password)
        .then(data => {
          this.validateUserInfo(data.user);
        })
        .catch(error => {
          console.log('Sign In Error: ', error);
          if ( error.code === 'auth/user-not-found') {
            this.showRegisterModal(modalContent);

          } else if (error.code === 'auth/wrong-password') {
            alert('La contraseña es incorrecta');
          }
        });
  }

  sendPasswordResetEmail(email: string) {
    console.log('sending email to: ', email);
    this._auth.sendPasswordReset(email)
    .then(() => this.resetPwdEmailSent = true )
    .catch(() => console.log('something went wrong'));
  }

  pswdResetModal(modalContent) {
    this._ngbModal.open(modalContent).result.then((result) => {
      if ( result === 'accept' ) {
        this.resetPwdEmailSent = false;
      }
    }, (reason) => {});
  }

  showRegisterModal(modalContent): void {
    this._ngbModal.open(modalContent).result.then((result) => {
      if ( result === 'accept' ) {
        this._auth.signUpWithEmail(this.email, this.password)
            .then((data) => { 
              this.validateUserInfo(data.user);
            })
            .catch(error => console.error(error));
      }
    }, (reason) => {});
  }

  redirectAfterAuth(): void {
    if(this.isNewUser) {
      this._router.navigate(['/my-info']);
    }
    else if (this._auth.redirectUrl) {
      this._router.navigate([this._auth.redirectUrl]);
    } else {
      this._router.navigate(['/']);
    }
  }

  validateUserInfo(fbUser: firebase.User) {
    this._spinner.showSpinner();
    // if user is not in DB then create reference
    this._user.getUser(fbUser.uid).pipe(take(1)).subscribe((user) => {
      if(!user) {
        this.isNewUser = true;
        this.saveUserInfo(fbUser)
            .then(() => {
              this._spinner.hideSpinner();
              this.redirectAfterAuth();
            });
      } else {
        this._spinner.hideSpinner();
        this.redirectAfterAuth();
      }
    })
    
  }

  saveUserInfo(fbUser): Promise<void> {
    const user = { uid: fbUser.uid, email: fbUser.email };
    return this._user.setNewUser(user);
  }
}
