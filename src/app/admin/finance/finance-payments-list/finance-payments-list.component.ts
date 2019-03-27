import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EventsService } from 'shared/services/events.service';
import { map, tap } from 'rxjs/operators';
import { PaymentInfo } from 'shared/interfaces/payment-info';
import { PaymentsService } from 'shared/services/payments.service';
import { MatSnackBar } from '@angular/material';
import { SpinnerService } from 'shared/spinner/spinner.service';

@Component({
  selector: 'app-finance-payments-list',
  templateUrl: './finance-payments-list.component.html',
  styleUrls: ['./finance-payments-list.component.css']
})
export class FinancePaymentsListComponent implements OnInit {

  uid = '';
  eid = ''; //This is only used for the link in template
  payments$: Observable<PaymentInfo[]>;
  editingNewPayment = false;
  newPayment: PaymentInfo;

  constructor( private _activatedRoute: ActivatedRoute, 
               private _events: EventsService,
               private _payments: PaymentsService,
               private _spinnerService: SpinnerService,
               private _snackBar: MatSnackBar ) {
    this._spinnerService.showSpinner();
    this.uid = this._activatedRoute.snapshot.paramMap.get('uid');
    this.payments$ = this._events.paymentsOf(this.uid).pipe(
      map((data) => { 
        if(data) return Object.keys(data)
                              .filter(key => key !== 'details' && data[key].disposed != true)
                              .map(key => data[key]);
        else return null;
      }),
      tap(data => {
        console.log('payments: ', data);
        this._spinnerService.hideSpinner();
      })
    );
    this.eid = this._events.currentEvent.eid;
  }

  ngOnInit() {
  }

  addNewPayment() {
    this.editingNewPayment = true;
    this.newPayment = this._payments.emptyPayment();
    this.newPayment.verified = true;
  }

  onSavePayment(paymentInfo: PaymentInfo) {
    this.editingNewPayment = false;
    this._payments.savePaymentInfo(this.uid, this.eid, paymentInfo)
                  .then(() => this._snackBar.open('✔️ Información guardada', 'Aceptar', { duration: 3000 }));
  }

  onDisposePayment(paymentInfo: PaymentInfo) {
    if (this.editingNewPayment) {
      this.editingNewPayment = false;
      return;
    }
    paymentInfo.disposed = true;
    this._payments.savePaymentInfo(this.uid, this.eid, paymentInfo)
                  .then(() => this._snackBar.open('✔️ Pago eliminado', 'Aceptar', { duration: 3000 }));;
  }

  onVerifiedChange(paymentInfo: PaymentInfo) {
    this._payments.savePaymentInfo(this.uid, this.eid, paymentInfo);
  }

}
