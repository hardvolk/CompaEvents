// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Angular Material Components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule,
         MatCheckboxModule,
         MatRadioModule,
         MatInputModule, 
         MatSelectModule, 
         MatDatepickerModule, 
         MatNativeDateModule,
         MatSnackBarModule,
         MatListModule, 
         MatIconModule,
         MatToolbarModule,
         MatSidenavModule,
         MatCardModule,
         MAT_DATE_LOCALE,
         MatChipsModule} from '@angular/material';

import { AppRoutingModule, routerComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from './../environments/environment';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// Angular-Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
// App services
import { AuthService } from './shared/services/auth.service';
import { EventsService } from 'shared/services/events.service';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { SpinnerService } from './shared/spinner/spinner.service';
import { UsersService } from 'shared/services/users.service';
import { PaymentsService } from 'shared/services/payments.service';
import { ListComponent } from './shared/components/list/list.component';
import { FilterComponent } from './shared/components/filter/filter.component';
import { UserFormComponent } from './shared/components/user-form/user-form.component';
import { FinanceListItemComponent } from './admin/finance/finance-list-item/finance-list-item.component';
import { FinancePaymentItemComponent } from './admin/finance/finance-payment-item/finance-payment-item.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    routerComponents,
    SpinnerComponent,
    ListComponent,
    FilterComponent,
    UserFormComponent,
    FinanceListItemComponent,
    FinancePaymentItemComponent,
    MainLayoutComponent
  ],
  imports: [
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule, 
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatChipsModule
  ],
  providers: [ AuthService, EventsService, SpinnerService, UsersService, PaymentsService, { provide: MAT_DATE_LOCALE, useValue: 'es-MX' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
