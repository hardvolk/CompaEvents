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
import { UserPaymentsComponent } from './events/user-payments/user-payments.component';
import { PermissionsGuard } from 'shared/guards/permissions/permissions.guard';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PermissionTypes } from 'shared/guards/permissions/permission-types';
import { AdminWorkshopsListComponent } from './admin/admin-workshops-list/admin-workshops-list.component';
import { NoAccessComponent } from 'shared/no-access/no-access.component';
import { AdminRootComponent } from './admin/admin-root.component';
import { PersonalInfoComponent } from './events/personal-info/personal-info.component';


// Application Routes
const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full'},
  { path: 'events', component: EventListComponent },
  { path: 'event/:eventId', component: EventComponent},
  { path: 'event/:eventId/asistentes', component: AttendanceComponent, canActivate: [AuthGuardService] },
  { path: 'event/:eventId/personal-info', component: PersonalInfoComponent, canActivate: [AuthGuardService] },
  { path: 'event/:eventId/personal-info/pagos', component: UserPaymentsComponent, canActivate: [AuthGuardService] },
  { path: 'event/:eventId/talleres', component: WorkshopListComponent },
  { path: 'event/:eventId/talleres/inscritos', component: WorkshopAttendanceComponent, canActivate: [AuthGuardService] },
  {
    path: 'event/:eventId/admin',
    component: AdminRootComponent,
    data: { permissionType: PermissionTypes.ADMIN },
    canActivate: [ AuthGuardService ],
    canActivateChild: [ AuthGuardService, PermissionsGuard ],
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { permissionType: PermissionTypes.ADMIN },
      },
      {
        path: 'talleres',
        component: AdminWorkshopsListComponent,
        data: { permissionType: PermissionTypes.WORKSHOPS }
      }
    ]
  },
  { path: 'forbidden', component: NoAccessComponent },
  { path: 'auth', component: AuthenticateComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  providers: [AuthGuardService, PermissionsGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routerComponents = [
  EventComponent,
  EventListComponent,
  AuthenticateComponent,
  PersonalInfoComponent,
  UserInfoComponent,
  WorkshopListComponent,
  WorkshopAttendanceComponent,
  AttendanceComponent,
  UserPaymentsComponent,
  AdminRootComponent,
  DashboardComponent,
  AdminWorkshopsListComponent,
  NoAccessComponent
];
