import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private showSpinnerSubject = new Subject<boolean>();

  constructor() { }

  getSpinnerObservable() : Observable<boolean> {
    return this.showSpinnerSubject.asObservable();
  }

  hideSpinner() {
    this.showSpinnerSubject.next(false);
  }

  showSpinner() {
    this.showSpinnerSubject.next(true);
  }
}
