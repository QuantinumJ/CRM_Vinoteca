import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVinoRosado } from '../vino-rosado.model';

@Component({
  selector: 'jhi-vino-rosado-detail',
  templateUrl: './vino-rosado-detail.component.html',
})
export class VinoRosadoDetailComponent implements OnInit {
  vinoRosado: IVinoRosado | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ vinoRosado }) => {
      this.vinoRosado = vinoRosado;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
