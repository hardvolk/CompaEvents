import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-workshop-list',
  templateUrl: './workshop-list.component.html',
  styleUrls: ['./workshop-list.component.css']
})
export class WorkshopListComponent implements OnInit {
  workshopList = [];
  eventId = '';
  userCanSelectWorkshop = false;
  isUserAttendee = false;
  isUserEnrolled = false;
  enrolledWorkshop = '';
  @ViewChild('modalContent') modalContent: ElementRef;

  constructor(private _db: AngularFireDatabase, 
              private _activatedRoute: ActivatedRoute, 
              private _auth: AuthService,
              private _ngbModal: NgbModal) { 
    this.eventId = this._activatedRoute.snapshot.params.eventId;
    console.log('EventID: ', this.eventId);

  }

  ngOnInit() {
    // Get list of Workshops
    this._db.list(`events/${this.eventId}/workshops`)
            .snapshotChanges()
            .map( changes => {
              // Merge workshop properties with the firebase key
              return changes.map( w => Object.assign({$key: w.payload.key}, w.payload.val()) )
            } )
            .subscribe(wlist => {
              this.workshopList = wlist;
              console.log('--- Workshops: ', wlist);
              this.verifyUserEnrolled();
            });
    this.verifyUserStatus();
  }

  enrollUser(workshop) {
    // TODO: Update enrolled in workshops and update user selection
    if(!this.isUserAttendee) {
      // Show modal indicating user must enroll event 
      this._ngbModal.open(this.modalContent);
      return;
    }
    // Exit if user has not permission to select workshop
    if(!this.userCanSelectWorkshop) {
      alert('Aun no puedes seleccionar taller');
      return;
    }
    // Exit If user is enrolled in any workshop
    if(this.isUserEnrolled) {
      alert('Ya estas inscrito en un taller');
      return;
    }
    // Update enrolled list in workshop
    this._db.object(`events/${this.eventId}/workshops/${workshop.$key}/enrolled`)
              .update({
                [this._auth.user.uid] : {
                  uid: this._auth.user.uid,
                  name: this._auth.user.displayName
                }
              });
    this.isUserEnrolled = true;
    this.enrolledWorkshop = workshop.title;
    alert('Listo! Te has registrado al taller')
  }

  verifyUserStatus() {
    // Determ if user is logged
    if(!this._auth.isAuthenticated()) {
      this.isUserAttendee = false;
      this.isUserEnrolled = false;
      this.enrolledWorkshop = '';
    } else {      
      this._auth.userState.subscribe(user => {
        // Determ if user is attendee in event
        console.log('UID', user.uid);
        this._db.list(`events/${this.eventId}/attendance`, ref => ref.orderByKey().equalTo(user.uid))
              .stateChanges()
              .subscribe(a => {
                this.isUserAttendee = true;
                this.userCanSelectWorkshop = a.payload.val().workshopSelection;
                console.log('Key found in attendance ', a);
                
                // Determ if user is enrolled in workshop
                this.workshopList.forEach(workshop => {
                  if(workshop.enrolled) {
                    const found = Object.keys(workshop.enrolled).indexOf(user.uid);
                    if(found < -1) console.log('User Enrolled in ' + workshop.title);
                  }
                });
              });
        

      }); 
    }
  }

  verifyUserEnrolled() {
    // Determ if user is enrolled in workshop
    if(!this._auth.isAuthenticated()) return;
    this.workshopList.forEach(workshop => {
      if(workshop.enrolled) {
        const found = Object.keys(workshop.enrolled).indexOf(this._auth.user.uid);
        if(found > -1) {
          console.log('User Enrolled in ' + workshop.title);
          this.isUserEnrolled = true;
          this.enrolledWorkshop = workshop.title;
        }
      }
    });
  }

  ObjectKeys(obj): any[] {
    return Object.keys(obj);
  }

}
