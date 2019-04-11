import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticateComponent } from './authenticate/authenticate.component';
import { AuthGuard } from './shared/guards/auth/auth.guard';
import { EventComponent } from './events/event/event.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { AttendanceComponent } from './events/attendance/attendance.component';
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
import { FinanceUserListComponent } from './admin/finance/finance-user-list/finance-user-list.component';
import { FinancePaymentsListComponent } from './admin/finance/finance-payments-list/finance-payments-list.component';
import { NotFoundComponent } from 'shared/components/not-found/not-found.component';
import { EventsGuard } from 'shared/guards/events/events.guard';
import { MyInfoComponent } from './user/my-info/my-info.component';


// Application Routes
const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full'},
  { path: 'events', component: EventListComponent },
  { path: 'event/:eventId', component: EventComponent},
  { path: 'event/:eventId/asistentes', component: AttendanceComponent, canActivate: [AuthGuard, EventsGuard] },
  { path: 'event/:eventId/personal-info', component: PersonalInfoComponent, canActivate: [AuthGuard, EventsGuard] },
  { path: 'event/:eventId/personal-info/payments', component: UserPaymentsComponent, canActivate: [AuthGuard, EventsGuard] },
  { path: 'event/:eventId/talleres', component: WorkshopListComponent, canActivate: [EventsGuard] },
  { path: 'event/:eventId/talleres/inscritos', component: WorkshopAttendanceComponent, canActivate: [AuthGuard, EventsGuard] },
  {
    path: 'event/:eventId/admin',
    component: AdminRootComponent,
    data: { permissionType: PermissionTypes.ADMIN },
    canActivate: [ AuthGuard, EventsGuard ],
    canActivateChild: [ PermissionsGuard ],
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
      },
      {
        path: 'finance',
        component: FinanceUserListComponent,
        data: { permissionType: PermissionTypes.PAYMENTS }
      },
      {
        path: 'finance/user/:uid',
        component: FinancePaymentsListComponent,
        data: { permissionType: PermissionTypes.PAYMENTS }
      }
    ]
  },
  {
    path: 'my-info',
    component: MyInfoComponent
  },
  { path: 'forbidden', component: NoAccessComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'auth', component: AuthenticateComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' })
  ],
  declarations: [],
  providers: [AuthGuard, PermissionsGuard, EventsGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routerComponents = [
  EventComponent,
  EventListComponent,
  AuthenticateComponent,
  PersonalInfoComponent,
  WorkshopListComponent,
  WorkshopAttendanceComponent,
  AttendanceComponent,
  UserPaymentsComponent,
  AdminRootComponent,
  DashboardComponent,
  AdminWorkshopsListComponent,
  FinanceUserListComponent,
  FinancePaymentsListComponent,
  NoAccessComponent,
  NotFoundComponent,
  MyInfoComponent
];
