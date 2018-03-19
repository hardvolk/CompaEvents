import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticateComponent } from './authenticate/authenticate.component';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { EventComponent } from './event/event.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventUserInfoComponent } from './event-user-info/event-user-info.component';
import { WorkshopListComponent } from './workshop-list/workshop-list.component';


// Application Routes
const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full'},
  { path: 'events', component: EventListComponent },
  { path: 'event/:eventId', component: EventComponent},
  {path: 'event/:eventId/user-info', component: EventUserInfoComponent, canActivate: [AuthGuardService]},
  { path: 'event/:eventId/talleres', component: WorkshopListComponent},
  { path: 'auth', component: AuthenticateComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  providers: [AuthGuardService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routerComponents = [
  EventComponent,
  EventListComponent,
  AuthenticateComponent,
  EventUserInfoComponent,
  WorkshopListComponent
];
