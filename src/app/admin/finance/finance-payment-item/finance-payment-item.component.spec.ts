import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancePaymentItemComponent } from './finance-payment-item.component';

describe('FinancePaymentItemComponent', () => {
  let component: FinancePaymentItemComponent;
  let fixture: ComponentFixture<FinancePaymentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancePaymentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancePaymentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
