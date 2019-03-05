import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { EventsService } from 'shared/services/events.service';
import { take } from 'rxjs/operators';


@Injectable()
export class PermissionsGuard implements  CanActivateChild{

  constructor(private _auth: AuthService, private _router: Router, private _event: EventsService) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const permissionName = route.data.permissionType;       
    const eventId = route.parent.params.eventId;
    const eventStaff$ = this._event.getEventStaff(eventId).pipe(take(1));
    const userInfo$ = this._auth.userState.pipe(take(1));

    return forkJoin(eventStaff$, userInfo$).map(([staff, user]) => {
      console.log('Current Staff: ', staff);
      // Verificar que uid esté en el grupo solicitado del staff
      const isStaff = staff && staff[permissionName][user.uid];
      if(!isStaff) this._router.navigate(['/forbidden'], { queryParams: { redirectTo: `/event/${eventId}` } });
      return isStaff;
    })
  }
}
