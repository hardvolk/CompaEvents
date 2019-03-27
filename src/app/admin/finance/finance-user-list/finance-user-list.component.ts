import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from 'shared/services/events.service';
import { EventInfo } from 'shared/interfaces/event-info';
import { SpinnerService } from 'shared/spinner/spinner.service';
import { tap, map } from 'rxjs/operators';


@Component({
  selector: 'app-finance-user-list',
  templateUrl: './finance-user-list.component.html',
  styleUrls: ['./finance-user-list.component.css']
})
export class FinanceUserListComponent implements OnInit {

  eventInfo: EventInfo;
  attendance$;

  constructor( private _events: EventsService, 
               private _route: Router,
               private _activatedRoute: ActivatedRoute,
               private _spinner: SpinnerService) { 
    this._spinner.showSpinner();
    this.eventInfo = this._events.currentEvent;
    this.attendance$ = this._events.attendanceOf(this.eventInfo.eid).pipe(
      tap((data) => this._spinner.hideSpinner()),
      map((data) => this.mapPaymentsList(data))
    );
  }

  ngOnInit() {
  }

  mapPaymentsList(attendanceList) {
    const list = Object.keys(attendanceList).map(key => {
      return { 
        uid: key,
        ...attendanceList[key]
      }
    });
    console.log('List: ', list);
    return list;
  }

  onViewPayments(uid: string) {
    this._route.navigate(['user', uid], { relativeTo: this._activatedRoute });
  }

}
