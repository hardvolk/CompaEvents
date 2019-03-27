import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaymentInfo } from 'shared/interfaces/payment-info';
import { FormBuilder } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material';

@Component({
  selector: 'app-finance-payment-item',
  templateUrl: './finance-payment-item.component.html',
  styleUrls: ['./finance-payment-item.component.css']
})
export class FinancePaymentItemComponent implements OnInit {

  @Input() payment: PaymentInfo;
  @Input() editable: boolean = true;
  @Input() editMode: boolean = false;
  @Output() save = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() dispose = new EventEmitter();
  @Output() verifiedChange = new EventEmitter();

  paymentInfo = this._fb.group({
    cant: [0],
    date: [''],
    note: ['']
  });

  constructor( private _fb: FormBuilder) { }

  ngOnInit() {
    this.paymentInfo.patchValue(this.payment);
  }

  turnEditMode() {
    this.editMode = true;
    this.edit.emit(this.payment);
  }

  saveInfo() {
    this.editMode = false;
    this.payment = Object.assign(this.payment, this.paymentInfo.value);
    this.save.emit(this.payment);
  }

  verifiedChg($event) {
    this.payment.verified = $event.checked;
    this.verifiedChange.emit(this.payment);
  }

  disposePayment() {
    this.editable = false;
    this.dispose.emit(this.payment);
  }
}
