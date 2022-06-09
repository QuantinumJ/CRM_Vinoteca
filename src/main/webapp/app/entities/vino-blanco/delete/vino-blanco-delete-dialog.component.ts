import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IVinoBlanco } from '../vino-blanco.model';
import { VinoBlancoService } from '../service/vino-blanco.service';

@Component({
  templateUrl: './vino-blanco-delete-dialog.component.html',
})
export class VinoBlancoDeleteDialogComponent {
  vinoBlanco?: IVinoBlanco;

  constructor(protected vinoBlancoService: VinoBlancoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.vinoBlancoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
