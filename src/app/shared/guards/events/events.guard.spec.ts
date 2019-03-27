import { TestBed, async, inject } from '@angular/core/testing';

import { EventsGuard } from './events.guard';

describe('EventsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsGuard]
    });
  });

  it('should ...', inject([EventsGuard], (guard: EventsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
