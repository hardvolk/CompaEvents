import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopAttendanceComponent } from './workshop-attendance.component';

describe('WorkshopAttendanceComponent', () => {
  let component: WorkshopAttendanceComponent;
  let fixture: ComponentFixture<WorkshopAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
