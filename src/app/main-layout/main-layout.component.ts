import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  @ViewChild(MatSidenav) snav: MatSidenav;
  isAuthenticated = false;
  prevUrl = '';
  
  constructor( private _router: Router,
               private _auth: AuthService) { 
    this.isAuthenticated = this._auth.isAuthenticated();
    
  }

  ngOnInit() {
    this._router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((navEvent: NavigationStart) => {
      this.snav.close();
      if( this._router.url !== '/') this.prevUrl = this._router.url;
    });
  }

  goBack() {
    this._router.navigateByUrl(this.prevUrl);
  }

  closeSession() {
    this._auth.removeSession();
    this.isAuthenticated = false;
  }

}
