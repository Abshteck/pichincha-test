import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  private dialogResultSubject = new Subject<boolean>();
  dialogResult$ = this.dialogResultSubject.asObservable();

  componentRef: ComponentRef<ConfirmDialogComponent> | null = null;

  constructor() {}

  openConfirmDialog(viewContainerRef: ViewContainerRef, content: string) :Observable<boolean> {
    this.componentRef = viewContainerRef.createComponent(ConfirmDialogComponent);
    this.componentRef.instance.content = content;
    return this.dialogResult$;
  }

  closeConfirmDialog(confirmed : boolean): void {
    if(this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
      this.dialogResultSubject.next(confirmed);
    }
  }
}
