import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  aList: Observable<{}[]>;
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
