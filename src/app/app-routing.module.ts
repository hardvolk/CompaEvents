import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticateComponent } from './authenticate/authenticate.component';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { EventComponent } from './events/event/event.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { AttendanceComponent } from './events/attendance/attendance.component';
import { UserInfoComponent } from './events/user-info/user-info.component';
import { WorkshopListComponent } from './workshop-list/workshop-list.component';
import { WorkshopAttendanceComponent } from './workshop-attendance/workshop-attendance.component';


// Application Routes
const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full'},
  { path: 'events', component: EventListComponent },
  { path: 'event/:eventId', component: EventComponent},
  { path: 'event/:eventId/asistentes', component: AttendanceComponent, canActivate: [AuthGuardService]},
  {path: 'event/:eventId/user-info', component: UserInfoComponent, canActivate: [AuthGuardService]},
  { path: 'event/:eventId/talleres', component: WorkshopListComponent},
  { path: 'event/:eventId/talleres/inscritos', component: WorkshopAttendanceComponent, canActivate: [AuthGuardService]},
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
  UserInfoComponent,
  WorkshopListComponent,
  WorkshopAttendanceComponent,
  AttendanceComponent
];
