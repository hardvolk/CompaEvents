import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserInfo } from 'shared/interfaces/user-info';
import { FormBuilder } from '@angular/forms';
import { UserInfoFG } from './user-info-form-group';
import { States, PersonalInfoLabels } from 'shared/labels';
import { UsersService } from 'shared/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy {
  @Input()
  showSaveBtn = true;
  @Input('userObs')
  userInfo$: Observable<UserInfo>;
  @Output('updated')
  infoUpdated = new EventEmitter;
  @Output('statusChange')
  statusChanges = new EventEmitter;

  user: UserInfo;
  subscription: Subscription;
  labels = { states: States, info: PersonalInfoLabels  };

  userInfo = UserInfoFG;

  constructor( private _fb: FormBuilder, private _users: UsersService, private _snackBar: MatSnackBar) { 
    this.userInfo.reset();
    this.userInfo.statusChanges.subscribe((status) => this.statusChanges.emit(status));
  }

  ngOnInit() {
    this.subscription = this.userInfo$.subscribe((uInfo) => {
      this.user = uInfo;
      this.userInfo.patchValue(uInfo);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    if (this.userInfo.invalid) {
      this._snackBar.open('❌ Por favor, corrige la información', 'Aceptar', { duration: 5000 });
      return;
    }
    const user = Object.assign(this.user, this.userInfo.value);
    this._users.updateUser(user).then(() => {
      this.infoUpdated.emit(user);
      this._snackBar.open('✔️ Información guardada', 'Aceptar', { duration: 3000 });
    });
  }

  @Input('isEditable')
  public set enableForm(val: boolean) {
    console.log('Enable form: ', val);
    val ? this.userInfo.enable() : this.userInfo.disable();
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.userInfo.controls[controlName].hasError(errorName);
  }
}
