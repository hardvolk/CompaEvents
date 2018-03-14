import { Component, OnInit } from '@angular/core';
import { AuthService } from './../shared/services/auth.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {

  email: string;
  password: string;
  showLoading = true;

  constructor(private _auth: AuthService, private _ngbModal: NgbModal, private _router: Router) {}

  ngOnInit() {
    this._auth.userState.subscribe(user => {
      if (!user) {
        this.showLoading = false;
      } else {
        this.redirectAfterAuth();
      }
    });
  }

  signInWithGoogle(): void {
    this._auth.signInWithGoogle()
        .then(user => this.redirectAfterAuth())
        .catch(error => console.error(error));
  }

  signInWithEmail(modalContent): void {
    if ( this.email === '' || this.password === '') { return; }

    this._auth.signInWithEmail(this.email, this.password)
        .then(user => this.redirectAfterAuth())
        .catch(error => {
          console.log('Sign In Error: ', error);
          if ( error.code === 'auth/user-not-found') {
            this.showRegisterModal(modalContent);

          } else if (error.code === 'auth/wrong-password') {
            alert('La contraseña es incorrecta');
          }
        });
  }

  showRegisterModal(modalContent): void {
    this._ngbModal.open(modalContent).result.then((result) => {
      if ( result === 'accept' ) {
        this._auth.signUpWithEmail(this.email, this.password)
            .then((data) => console.log('Data result: ', data))
            .catch(error => console.error(error));
      }
    }, (reason) => {});
  }

  redirectAfterAuth(): void {
    // TODO: check if there is a route to navigate to.
    if (this._auth.redirectUrl) {
      this._router.navigate([this._auth.redirectUrl]);
    } else {
      this._router.navigate(['']);
    }
  }

}
