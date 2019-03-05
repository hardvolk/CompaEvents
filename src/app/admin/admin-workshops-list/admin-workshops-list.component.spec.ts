import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWorkshopsListComponent } from './admin-workshops-list.component';

describe('AdminWorkshopsListComponent', () => {
  let component: AdminWorkshopsListComponent;
  let fixture: ComponentFixture<AdminWorkshopsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminWorkshopsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWorkshopsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
