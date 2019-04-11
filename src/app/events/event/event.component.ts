import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'shared/services/events.service';
import { SpinnerService } from 'shared/spinner/spinner.service';
import { AuthService } from 'shared/services/auth.service';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  eventId = '';
  eventInfo: {};
  isAuthenticated$;

  constructor( private _activatedRoute: ActivatedRoute, 
               private _eventsService: EventsService, 
               private _spinnerService: SpinnerService,
               private _auth: AuthService) { 
    _spinnerService.showSpinner();
    this.isAuthenticated$ = this._auth.userIsAuthenticated$;
  }

  ngOnInit() {
    // Subscribe eventId
    this._activatedRoute.params.subscribe( params => {
      this.eventId = params.eventId;
      // Get Event Info
      this._eventsService.getEventInfo(this.eventId).subscribe( event => { 
        this._spinnerService.hideSpinner();
        this.eventInfo = event;
      });
    });
  }
}
