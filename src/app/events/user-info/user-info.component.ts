import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { Observable } from 'rxjs/Observable';
import { ProfessionalStatus, States } from 'shared/labels';
import { UserInfo } from 'shared/interfaces/user-info';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  showLoading = false;
  eventId = '';
  eventInfo: Observable<any>;
  currentUser: UserInfo;
  professionalStatus = ProfessionalStatus;
  states = States;

  constructor(private _db: AngularFireDatabase,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _auth: AuthService ) {
                this.currentUser = this.createEmptyUserInfo();
              }

  ngOnInit() {
    this._auth.userState.subscribe(aUser => {
      // Subscribe User Info
      const subRef = this._db.object(`/users/${ aUser.uid }`)
      .valueChanges()
      .subscribe((uInfo: UserInfo) => {
        if (!uInfo) {
          subRef.unsubscribe();
          return;
        }
        this.currentUser = uInfo;
      });
    });
    
    // Subscribe eventId
    this._activatedRoute.params.subscribe( params => {
      this.eventId = params.eventId;
      // Get Event Info
      this.eventInfo = this._db.object(`/events/${ this.eventId }/info`).valueChanges();
    });
  }

  updatePersonalInfo() {
    // Update profile name
    this._auth.updateProfile({ displayName: this.currentUser.displayName })
        .then(() => {
          console.log('Perfil actualizado exitosamente ');

          // Update personal info
          this._db.object(`/users/${ this._auth.user.uid }`).update({
            displayName: this.currentUser.displayName,
            professionalStatus: this.currentUser.professionalStatus,
            degree: this.currentUser.degree,
            school: this.currentUser.school,
            state: this.currentUser.state,
            city: this.currentUser.city,
            specialNeeds: this.currentUser.specialNeeds ? this.currentUser.specialNeeds : ''
          })
          .then(() => {
            console.log('Información personal actualizada exitosamente ');

            // Update attendance list
            this._db.object(`/events/${ this.eventId }/attendance`)
                    .update({
                      [this._auth.user.uid]: {
                       uid:  this._auth.user.uid,
                       displayName: this._auth.user.displayName,
                       email: this._auth.user.email,
                       state: this.currentUser.state,
                       workshop: 'none'
                      }                      
                    })
                    .then(() => {
                      console.log('Usuario agregado a evento');
                      this.showLoading = false;
                      alert('Información Actualizada');
                      this.redirectToEvent();
                    })
                    .catch( e => {
                      console.error(e);
                      this.showLoading = false;
                    });
          })
          .catch(error => {
            alert('Hubo un problema al actualizar tus datos personales');
            console.error(error);
            this.showLoading = false;
          });
        })
        .catch(error => {
          alert('Hubo un problema al actualizar tu nombre');
          console.error(error);
          this.showLoading = false;
        });
  }

  redirectToEvent() {
    this._router.navigate(['/event/' + this.eventId]);
  }

  onSubmit() {
    // TODO: Guardar info del usuario y en el evento
    this.showLoading = true;
    console.log('User: ', this.currentUser);
    // Update personal Info
    this.updatePersonalInfo();
  }

  createEmptyUserInfo(): UserInfo {
    return {
      displayName: this._auth.user ? this._auth.user.displayName : '',
      professionalStatus: '',
      degree: '',
      school: '',
      state: '',
      city: '',
      specialNeeds: ''
    };
  }

}
