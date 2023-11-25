import { Component, Input } from '@angular/core';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
  standalone: true
})
export class ConfirmDialogComponent {

  @Input() content = '';

  constructor(
    private _confirmDialogService: ConfirmDialogService
  ) {}

  destroy(confirmed : boolean = false){
    this._confirmDialogService.closeConfirmDialog(confirmed)
  }
}
