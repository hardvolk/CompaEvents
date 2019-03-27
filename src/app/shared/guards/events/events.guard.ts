import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EventsService } from 'shared/services/events.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsGuard implements CanActivate, CanActivateChild {
  constructor(
    private _router: Router,
    private _event: EventsService
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const eventId = next.paramMap.get('eventId');
      if(!eventId) {
        this._router.navigate(['/not-found']);
        return false;
      };

      return this._event.getEventInfo(eventId).pipe(
        map((eventInfo) => {
          if (eventInfo) {
            this._event.currentEvent = eventInfo;
            return true;
          } else {
            this._router.navigate(['/not-found']);
            return false;
          }
        })
      );
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }
  
}
