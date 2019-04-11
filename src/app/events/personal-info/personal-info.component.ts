import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { EventsService } from 'shared/services/events.service';
import { SpinnerService } from 'shared/spinner/spinner.service';
import { OtherQuestions } from 'shared/labels';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UsersService } from 'shared/services/users.service';
import { UserInfo } from 'shared/interfaces/user-info';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  noModal = false;

  event: any;
  eventId = '';
  userId = '';
  user$ = this._users.getCurrent();
  labels = OtherQuestions;
  validForm = false;
  enablePaymentsBtn = false;
  $userOR: Subscription;
  
  // next questions could be dynamic
  otherQuestions = this._fb.group({
    ebInterest: [''],
    previousEvents: this._fb.group({
      other: [''],
      events: this._fb.array([false, false, false, false, false])
    })
  });

  constructor( private _activatedRoute: ActivatedRoute,
               private _eventsService: EventsService,
               private _router: Router,
               private _fb: FormBuilder,
               private _spinnerService: SpinnerService,
               private _dialog: MatDialog,
               private _users: UsersService ) {
    _spinnerService.showSpinner();
    this.eventId = this._activatedRoute.snapshot.paramMap.get('eventId');
    this.noModal = this._activatedRoute.snapshot.queryParamMap.get('noModal') != null;
  }

  ngOnInit() {
    // Get event info
    this._eventsService.getEventInfo(this.eventId).pipe(take(1)).subscribe( event => { 
      this._spinnerService.hideSpinner();
      if(!this.noModal) this._dialog.open(this.modalContent);
      this.event = event;
    });

    // Get User Info
    this.user$.pipe(take(1)).subscribe((user) => {
      this.userId = user.uid;
      this.updateUserInfoReference(user);
      // Get Event info
      this._eventsService.getAttendeeInfo(this.eventId, user.uid).subscribe((aInfo) => {
        console.log('Attendance Info: ', aInfo);
        if(aInfo && aInfo['otherQuestions'])
          this.otherQuestions.patchValue(aInfo['otherQuestions'])
      });
    });
  }

  onFormStatusChange(status) {
    this.validForm = status === 'VALID';
  }

  /**
   * This function updates just some of the user's info 
   * referenced in event's node
   */
  updateUserInfoReference(user: UserInfo) {
    const attendanceInfo = {
      firstName: user.firstName ? user.firstName : '',
      lastName: user.lastName ? user.lastName : '',
      email: user.email,
      state: user.state ? user.state : ''
    }
    this._eventsService.updateAttendeeInfo(this.eventId, user.uid, attendanceInfo);
  }

  saveOtherQuestions() {
    const attendanceInfo = {
      otherQuestions: this.otherQuestions.value
    }
    this._eventsService.updateAttendeeInfo(this.eventId, this.userId, attendanceInfo)
                       .then(() => this.enablePaymentsBtn = true);
  }

  goToPayments() {
    this._router.navigate(['payments'], { relativeTo: this._activatedRoute });
  }
}
