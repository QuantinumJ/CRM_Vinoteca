import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IVinoTinto } from '../vino-tinto.model';
import { VinoTintoService } from '../service/vino-tinto.service';

@Component({
  templateUrl: './vino-tinto-delete-dialog.component.html',
})
export class VinoTintoDeleteDialogComponent {
  vinoTinto?: IVinoTinto;

  constructor(protected vinoTintoService: VinoTintoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.vinoTintoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
