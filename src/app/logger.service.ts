import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  logNode = '/logs/messages'
  errorNode = '/logs/errors'
  constructor(private _db: AngularFireDatabase) { }

  error(message: string | object) {
    const timestamp = Date.now();
    this._db.object(this.errorNode).update({[timestamp]: message })
  }

  log(message: string | object) {
    const timestamp = Date.now();
    this._db.object(this.logNode).update({[timestamp]: message })
  }
}
