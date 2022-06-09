import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IVinoRosado } from '../vino-rosado.model';
import { VinoRosadoService } from '../service/vino-rosado.service';

@Component({
  templateUrl: './vino-rosado-delete-dialog.component.html',
})
export class VinoRosadoDeleteDialogComponent {
  vinoRosado?: IVinoRosado;

  constructor(protected vinoRosadoService: VinoRosadoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.vinoRosadoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
