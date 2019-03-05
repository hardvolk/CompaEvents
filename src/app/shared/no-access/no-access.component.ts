import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-no-access',
  templateUrl: './no-access.component.html',
  styleUrls: ['./no-access.component.css']
})
export class NoAccessComponent implements OnInit {
  routeLink: RouterLink;
  redirectTo: '';
  routeSub: Subscription;

  constructor(private _route: ActivatedRoute) {  }

  ngOnInit() {
    this.routeLink = this._route.data['routeLink'];
    this.routeSub = this._route.queryParams.subscribe((params) => { this.redirectTo = params.redirectTo });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }


}
