import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { EventInfo } from 'shared/interfaces/event-info';
import { UsersService } from './users.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private currentEventInfo: EventInfo = null;

  constructor( private _db: AngularFireDatabase, private _user: UsersService ) { }

  public set currentEvent(eventInfo: EventInfo) {
    this.currentEventInfo = eventInfo;
  }

  public get currentEvent() {
    return this.currentEventInfo;
  }

  public getAvailableEvents(): Observable<any> {
    return this._db.object('/list-of-events').valueChanges().pipe(
      map(eventList => Object.keys(eventList)
                             .filter(key => eventList[key]['isEnable'])
                             .map(key => eventList[key]))
    );
  }
  
  public getEventInfo( eventId:string ):Observable<EventInfo> {
    return this._db.object(`/events/${ eventId }/info`).valueChanges() as Observable<EventInfo>;
  }

  public getEventStaff( eventId: string ): Observable<any> {
    return this._db.object(`/events/${ eventId }/staff`).valueChanges();
  }

  public attendanceOf(eventId: string) {
    return this._db.object(`/events/${ eventId }/attendance`).valueChanges();
  }

  public paymentsOf(uid: string) {
    if (!this.currentEventInfo || !uid ) {
      console.error('Current event info and uid are required');
      return;
    }
    return this._db.object(`/events/${ this.currentEventInfo.eid }/attendance/${uid}/payments`).valueChanges();
  }

  /**
   * Get the info of some attendee for a specific event
   * @param eventId Id of the event in Database
   * @param uid Id of user in Database
   */
  public getAttendeeInfo(eventId: string, uid: string) {
    return this._db.object(`/events/${ eventId }/attendance/${uid}`).valueChanges();
  }

  public updateAttendeeInfo(eventId: string, uid: string, data) {
    return this._db.object(`/events/${ eventId }/attendance/${uid}`).update(data);
  }
}
