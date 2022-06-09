import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVinoRosado } from '../vino-rosado.model';
import { VinoRosadoService } from '../service/vino-rosado.service';
import { VinoRosadoDeleteDialogComponent } from '../delete/vino-rosado-delete-dialog.component';

@Component({
  selector: 'jhi-vino-rosado',
  templateUrl: './vino-rosado.component.html',
})
export class VinoRosadoComponent implements OnInit {
  vinoRosados?: IVinoRosado[];
  isLoading = false;

  constructor(protected vinoRosadoService: VinoRosadoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.vinoRosadoService.query().subscribe({
      next: (res: HttpResponse<IVinoRosado[]>) => {
        this.isLoading = false;
        this.vinoRosados = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IVinoRosado): number {
    return item.id!;
  }

  delete(vinoRosado: IVinoRosado): void {
    const modalRef = this.modalService.open(VinoRosadoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.vinoRosado = vinoRosado;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
