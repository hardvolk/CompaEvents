import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserInfo } from 'shared/interfaces/user-info';

@Component({
  selector: 'app-finance-list-item',
  templateUrl: './finance-list-item.component.html',
  styleUrls: ['./finance-list-item.component.css']
})
export class FinanceListItemComponent implements OnInit {
  @Input('user')
  userInfo: UserInfo;

  @Output() viewPayments = new EventEmitter();

  isReadonly = true;

  constructor() { }

  ngOnInit() { }

  updateAmounts() {
    this.isReadonly = true;
  }

  onViewPayments(userInfo: UserInfo) {
    this.viewPayments.emit(userInfo.uid);
  }

}
