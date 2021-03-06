import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-event-attendance',
  templateUrl: './event-attendance.component.html',
  styleUrls: ['./event-attendance.component.css']
})
export class EventAttendanceComponent implements OnInit {
  aList: Observable<Observable<any>[]>;
  eventId = '';
  constructor( private _db: AngularFireDatabase,
               private _activatedRoute: ActivatedRoute) { 
                this.eventId = this._activatedRoute.snapshot.params.eventId;
               }

  ngOnInit() {
    // Get Attendance List
    this.getAttendanceList();
  }

  getAttendanceList() {
    this.aList = this._db.list(`events/${this.eventId}/attendance`)
            .snapshotChanges()
            .map(aList => {
              return aList.map(element => Object.assign({key: element.key}, element.payload.val()));
            });
  }

  updateWorkshopSelection(userKey, value) {
    this._db.object(`events/${this.eventId}/attendance/${userKey}`).update({ workshopSelection: value });
  }

}
