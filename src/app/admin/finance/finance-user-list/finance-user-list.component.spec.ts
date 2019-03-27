import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceUserListComponent } from './finance-user-list.component';

describe('FinanceUserListComponent', () => {
  let component: FinanceUserListComponent;
  let fixture: ComponentFixture<FinanceUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
