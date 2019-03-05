import { Component, OnInit } from '@angular/core';
import { EventsService } from 'shared/services/events.service';
import { ActivatedRoute } from '@angular/router';
import { PaymentsService } from 'shared/services/payments.service';
import { UsersService } from 'shared/services/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-payments',
  templateUrl: './user-payments.component.html',
  styleUrls: ['./user-payments.component.css']
})
export class UserPaymentsComponent implements OnInit {
  uploadInProgress = false;
  eventTitle = '';
  eventId = '';
  uid = '';
  payments = [];
  receiptForm = new FormGroup ({
    imgFile: new FormControl('', [Validators.required]),
    cant: new FormControl(0, [Validators.required, Validators.pattern('^[0-9]*$')])
  });
  fileStoragePath = '';

  constructor( private _event: EventsService, 
               private _user: UsersService, 
               private _activatedRoute: ActivatedRoute,
               private _payments: PaymentsService,
               private _modal: NgbModal ) {
  }

  ngOnInit() {

    // Event Title
    this._activatedRoute.params.subscribe( params => {
      this.eventId = params.eventId;
      this._event.getEventInfo(this.eventId).subscribe( event => this.eventTitle = event.title );
    });
    
    // UserId
    this._user.getCurrentUserState().subscribe( uInfo => { 
      this.uid = uInfo.uid;
      this.getReceipts();
    });
  }

  getReceipts() {
    this._payments.getPayments(this.uid, this.eventId).subscribe(payments => {
      if(payments != null) this.payments = Object.values(payments);
    });
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
          downloadUrl: url 
        }
      );
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
