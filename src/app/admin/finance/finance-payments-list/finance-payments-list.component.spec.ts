import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancePaymentsListComponent } from './finance-payments-list.component';

describe('FinancePaymentsListComponent', () => {
  let component: FinancePaymentsListComponent;
  let fixture: ComponentFixture<FinancePaymentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancePaymentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancePaymentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
