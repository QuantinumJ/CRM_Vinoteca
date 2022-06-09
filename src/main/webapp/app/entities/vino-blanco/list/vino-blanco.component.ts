import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVinoBlanco } from '../vino-blanco.model';
import { VinoBlancoService } from '../service/vino-blanco.service';
import { VinoBlancoDeleteDialogComponent } from '../delete/vino-blanco-delete-dialog.component';

@Component({
  selector: 'jhi-vino-blanco',
  templateUrl: './vino-blanco.component.html',
})
export class VinoBlancoComponent implements OnInit {
  vinoBlancos?: IVinoBlanco[];
  isLoading = false;

  constructor(protected vinoBlancoService: VinoBlancoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.vinoBlancoService.query().subscribe({
      next: (res: HttpResponse<IVinoBlanco[]>) => {
        this.isLoading = false;
        this.vinoBlancos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IVinoBlanco): number {
    return item.id!;
  }

  delete(vinoBlanco: IVinoBlanco): void {
    const modalRef = this.modalService.open(VinoBlancoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.vinoBlanco = vinoBlanco;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
