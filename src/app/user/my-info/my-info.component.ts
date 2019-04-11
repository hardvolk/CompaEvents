import { Component, OnInit } from '@angular/core';
import { UsersService } from 'shared/services/users.service';
import { SpinnerService } from 'shared/spinner/spinner.service';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css']
})
export class MyInfoComponent implements OnInit {

  user$ = this._users.getCurrent();

  constructor( private _auth: AuthService, 
               private _users: UsersService,
               private _router: Router) { 
    this._auth.userIsAuthenticated$.pipe(take(1)).subscribe((val) => {
      if(!val) this._router.navigate(['/auth']);
    });
  }

  ngOnInit() {
  }

  onInfoUpdated() {
    this._router.navigateByUrl('/events');
  }
}
