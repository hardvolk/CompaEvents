import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceListItemComponent } from './finance-list-item.component';

describe('FinanceListItemComponent', () => {
  let component: FinanceListItemComponent;
  let fixture: ComponentFixture<FinanceListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
