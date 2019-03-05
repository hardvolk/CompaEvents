import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { PaymentInfo } from 'shared/interfaces/payment-info';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor( private _storage: AngularFireStorage,
               private _db: AngularFireDatabase ) { }

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

  savePaymentInfo(uid: string, eventId: string, paymentInfo: PaymentInfo ) {
    const node = `events/${eventId}/attendance/${uid}/payments`;
    console.log('Saving payment info: ', paymentInfo);
    this._db.object(node).update({ [paymentInfo.name] : paymentInfo }).then(res => alert('Pago guardado exitosamente :)'));
  }

  uploadFile(path: string, file: string) {
    return this._storage.upload(path, file);
  }

  getDownloadUrl(path: string) {
    return this._storage.ref(path).getDownloadURL();
  }
}
