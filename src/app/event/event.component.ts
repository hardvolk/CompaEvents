import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../shared/services/auth.service';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  eventId = '';
  eventInfo: Observable<any>;

  constructor(private _db: AngularFireDatabase,
              private _activatedRoute: ActivatedRoute,
              private _auth: AuthService) { }

  ngOnInit() {
    // Subscribe eventId
    this._activatedRoute.params.subscribe( params => {
      this.eventId = params.eventId;
      // Get Event Info
      this.eventInfo = this._db.object(`/events/${ this.eventId }/info`).valueChanges();
    });
  }

}
