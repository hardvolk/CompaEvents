import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { PaymentInfo, PaymentDetails } from 'shared/interfaces/payment-info';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { LoggerService } from 'app/logger.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor( private _storage: AngularFireStorage,
               private _db: AngularFireDatabase,
               private _logger: LoggerService ) { }

  getFolderMetadata(path: string): Observable<any> {
    const ref = this._storage.ref(path);
    return  ref.getMetadata();
  }

  getImagesMetadata() {
    const data = this._storage.ref('').child('payments');
    console.log(data);
  }

  getPayments(uid, eventId): Observable<any> {
    return this._db.object(`/events/${ eventId }/attendance/${uid}/payments`).valueChanges();
  }

  getPaymentsList(uid, eventId): Observable<PaymentInfo[]> {
    return this._db.object(`/events/${ eventId }/attendance/${uid}/payments`).valueChanges().pipe(
      map((data) => { 
        if(data) return Object.keys(data)
                              .filter(key => key !== 'details' && data[key].disposed != true)
                              .map(key => data[key]);
        else return null;
      })
    );
  }

  emptyPayment(): PaymentInfo {
    return { 
      name: Math.random().toString(36).substr(2, 5), //Random name
      path: '', 
      cant: 0,
      date: new Date().toLocaleDateString('es'),
      verified: false,
      downloadUrl: '' 
    };
  }

  savePaymentInfo(uid: string, eventId: string, paymentInfo: PaymentInfo ) {
    if(!uid) {
      this._logger.error({
        msg: 'Trying to save in attendance/$uid/payments with no uid',
        data: paymentInfo
      });
      return;
    }
    const node = `events/${eventId}/attendance/${uid}/payments`;
    console.log('Saving payment info: ', paymentInfo);

    return this._db.object(node).update({ [paymentInfo.name] : paymentInfo });
  }

  uploadFile(path: string, file: string) {
    return this._storage.upload(path, file);
  }

  getDownloadUrl(path: string) {
    return this._storage.ref(path).getDownloadURL();
  }
}
