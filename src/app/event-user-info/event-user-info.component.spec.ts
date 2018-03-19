import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventUserInfoComponent } from './event-user-info.component';

describe('EventUserInfoComponent', () => {
  let component: EventUserInfoComponent;
  let fixture: ComponentFixture<EventUserInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventUserInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
