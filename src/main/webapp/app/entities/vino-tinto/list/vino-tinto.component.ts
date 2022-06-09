import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVinoTinto } from '../vino-tinto.model';
import { VinoTintoService } from '../service/vino-tinto.service';
import { VinoTintoDeleteDialogComponent } from '../delete/vino-tinto-delete-dialog.component';

@Component({
  selector: 'jhi-vino-tinto',
  templateUrl: './vino-tinto.component.html',
})
export class VinoTintoComponent implements OnInit {
  vinoTintos?: IVinoTinto[];
  isLoading = false;

  constructor(protected vinoTintoService: VinoTintoService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.vinoTintoService.query().subscribe({
      next: (res: HttpResponse<IVinoTinto[]>) => {
        this.isLoading = false;
        this.vinoTintos = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IVinoTinto): number {
    return item.id!;
  }

  delete(vinoTinto: IVinoTinto): void {
    const modalRef = this.modalService.open(VinoTintoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.vinoTinto = vinoTinto;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
