import { Component, OnInit } from '@angular/core';
import { EventsService } from 'shared/services/events.service';
import { SpinnerService } from 'shared/spinner/spinner.service';
import { States, PersonalInfoLabels } from 'shared/labels';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { UsersService } from 'shared/services/users.service';
import { UserInfo } from 'shared/interfaces/user-info';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  event: any;
  eventId = '';
  userInfo: UserInfo;
  labels = { states: States, info: PersonalInfoLabels };

  personalInfo = this._fb.group({
    firstName: [''],
    lastName: [''],
    gender: [''],
    dob: [''],
    pob: [''], // Place of birth
    phone: [''],
    state: [''],
    city: [''],
    academicInfo: this._fb.group({
      academicStatus: [''],
      school: [''],
      university: [''],
      campus: [''],
      degree: [''],
    }),
    emergencyContact: this._fb.group({
      name: [''],
      phone: [''],
      relationship: ['']
    }),
    specialNeeds: [''],
    // next questions could be dynamic
    otherQuestions: this._fb.group({
      ebInterest: [''],
      previousEvents: this._fb.group({
        other: [''],
        events: this._fb.array([false, false, false, false, false])
      })
    })
  });

  constructor( private _activatedRoute: ActivatedRoute, 
               private _eventsService: EventsService,
               private _fb: FormBuilder,
               private _spinnerService: SpinnerService,
               private _users: UsersService,
               private snackBar: MatSnackBar ) {
    _spinnerService.showSpinner();
    this.eventId = _activatedRoute.snapshot.paramMap.get('eventId');
  }

  ngOnInit() {
    // Get event info
    this._eventsService.getEventInfo(this.eventId).pipe(take(1)).subscribe( event => { 
      this._spinnerService.hideSpinner();
      this.event = event;
    });

    // Get User Info
    this._users.getCurrent().pipe(take(1)).subscribe((user) => {
      console.log('User Info: ', user);
      this.userInfo = user;
      this.personalInfo.patchValue(user);
      // Get Event info
      this._eventsService.getAttendanceInfo(this.eventId, user.uid).subscribe((aInfo) => {
        console.log('aInfo: ', aInfo);
        if(aInfo && aInfo['otherQuestions'])
          this.personalInfo.get('otherQuestions').patchValue(aInfo['otherQuestions'])
      });
    });
    console.log(this.personalInfo.value);
  }

  get previousEvents() {
    return this.personalInfo.get('otherQuestions.previousEvents') as FormGroup;
  }

  onSubmit() {
    if( this.personalInfo.status != 'VALID' ) return;
    const attendanceInfo = {
      firstName: this.userInfo.firstName,
      lastName: this.userInfo.lastName,
      email: this.userInfo.email,
      state: this.userInfo.state,
      otherQuestions: this.personalInfo.value.otherQuestions
    }
    // Save user info. Exclude otherQuestions
    const { otherQuestions, ...rest } = this.personalInfo.value;
    this.userInfo = Object.assign(this.userInfo, rest);
    this._users.updateUser(this.userInfo).then(() => {
      this.snackBar.open('Información Guardada!', 'Aceptar', { duration: 2000 });
    });
    this._eventsService.updateAttendanceInfo(this.eventId, this.userInfo.uid, attendanceInfo);
  }
}
