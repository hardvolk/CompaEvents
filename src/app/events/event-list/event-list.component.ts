import { Component, OnInit } from '@angular/core';
import { EventsService } from 'shared/services/events.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events$;
  constructor( private _events: EventsService) { 
    this.events$ = this._events.getAvailableEvents();
    this.events$.subscribe(list => {
      console.log(list)
    });
  }

  ngOnInit() {
  }

}
