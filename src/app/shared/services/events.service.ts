import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor( private _db: AngularFireDatabase ) { }
  
  public getEventInfo( eventId:string ):Observable<any> {
    return this._db.object(`/events/${ eventId }/info`).valueChanges();
  }

  public getEventStaff( eventId: string ): Observable<any> {
    return this._db.object(`/events/${ eventId }/staff`).valueChanges();
  }
}
