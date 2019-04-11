import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { EventsService } from 'shared/services/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentsService } from 'shared/services/payments.service';
import { UsersService } from 'shared/services/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize, take } from 'rxjs/operators';
import { AuthService } from 'shared/services/auth.service';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { PaymentInfo } from 'shared/interfaces/payment-info';

@Component({
  selector: 'app-user-payments',
  templateUrl: './user-payments.component.html',
  styleUrls: ['./user-payments.component.css']
})
export class UserPaymentsComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  dialogRef: MatDialogRef<any>;

  uploadInProgress = false;
  eventTitle = '';
  eventId = '';
  uid = 'undefined-uid';
  payments$: Observable<PaymentInfo[]>;
  receiptForm = new FormGroup ({
    imgFile: new FormControl('', [Validators.required]),
    cant: new FormControl(0, [Validators.required, Validators.pattern('^[0-9]*$')])
  });
  fileStoragePath = '';

  constructor( private _event: EventsService, 
               private _user: UsersService, 
               private _auth: AuthService,
               private _activatedRoute: ActivatedRoute,
               private _router: Router,
               private _payments: PaymentsService,
               private _modal: NgbModal,
               private _snackBar: MatSnackBar,
               private _dialog: MatDialog) {
  }

  ngOnInit() {
    this.dialogRef = this._dialog.open(this.modalContent);
    // Event Title
    this._activatedRoute.params.subscribe( params => {
      this.eventId = params.eventId;
      this._event.getEventInfo(this.eventId).subscribe( event => this.eventTitle = event.title );
    });
    
    // UserId
    this._user.getCurrent().subscribe( uInfo => { 
      this.uid = uInfo.uid;
      this.payments$ = this._payments.getPaymentsList(this.uid, this.eventId);
    });
  }

  logout() {
    this._auth.removeSession();
    this._router.navigate(['/auth']);
  }

  goToPersonalInfo() {
    this.dialogRef.close();
    this._router.navigate(['../'], { relativeTo: this._activatedRoute, queryParams: { noModal: true } });
  }

  openModal(content) {
    this._modal.open(content);
  }

  addReceiptImage(imgElement: any) {
    this._modal.dismissAll();
    const randomName = Math.random().toString(36).substr(2, 5);
    this.fileStoragePath = `payments/${this.eventId}/${this.uid}/${randomName}`;    
    console.log(`Saving image ${randomName}: `, imgElement.files[0]);
    const task = this._payments.uploadFile(this.fileStoragePath, imgElement.files[0]);
    this.uploadInProgress = true;

    task.snapshotChanges().pipe(
      finalize(() => this.saveReceiptInfo(randomName))
    ).subscribe();
  }

  saveReceiptInfo(randomName: string) {
    this.uploadInProgress = false;
    this._payments.getDownloadUrl(this.fileStoragePath).subscribe((url) => {
      this._payments.savePaymentInfo( this.uid, this.eventId, 
        { 
          name: randomName,
          path: this.fileStoragePath, 
          cant: this.receiptForm.controls.cant.value,
          date: new Date().toLocaleDateString('es'),
          verified: false,
          downloadUrl: url 
        }
      ).then(() => this._snackBar.open('✔️ Información guardada', 'Aceptar', { duration: 3000 }));
    });
  }

  // This function has no logic importance, it's used in order to prevent DOMException error
  // Consult: https://stackoverflow.com/questions/44072909/using-reactive-form-validation-with-input-type-file-for-an-angular-app
  onFileChange($event) {
    let file = $event.target.files[0];
    this.receiptForm.controls.imgFile.setValue(file ? file.name : '');
    console.log('file input status:', this.receiptForm.controls.imgFile.status);
    console.log('file input value:', this.receiptForm.controls.imgFile.value);
  }
}
