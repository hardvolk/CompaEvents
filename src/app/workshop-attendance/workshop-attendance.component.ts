import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-workshop-attendance',
  templateUrl: './workshop-attendance.component.html',
  styleUrls: ['./workshop-attendance.component.css']
})
export class WorkshopAttendanceComponent implements OnInit {
  wList: Observable<{}[]>;
  eventId: '';

  constructor(private _db: AngularFireDatabase,
              private _activatedRoute: ActivatedRoute) { 
                this.eventId = this._activatedRoute.snapshot.params.eventId;
              }

  ngOnInit() {
    this.wList = this._db.list(`events/${this.eventId}/workshops`)
                         .valueChanges();
    this.wList.subscribe(list => console.log('Lista: ', list));                     
  }

  objectKeys(obj) {
    return Object.keys(obj);
  }

}
