import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { EventInfo } from 'shared/interfaces/event-info';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor( private _db: AngularFireDatabase, private _user: UsersService ) { }
  
  public getEventInfo( eventId:string ):Observable<EventInfo> {
    return this._db.object(`/events/${ eventId }/info`).valueChanges() as Observable<EventInfo>;
  }

  public getEventStaff( eventId: string ): Observable<any> {
    return this._db.object(`/events/${ eventId }/staff`).valueChanges();
  }

  /**
   * Get the info of some attendance for a specific event
   * @param eventId Id of the event in Database
   * @param uid Id of user in Database
   */
  public getAttendanceInfo(eventId: string, uid: string) {
    return this._db.object(`/events/${ eventId }/attendance/${uid}`).valueChanges();
  }

  public updateAttendanceInfo(eventId: string, uid: string, data) {
    return this._db.object(`/events/${ eventId }/attendance/${uid}`).update(data);
  }
}
