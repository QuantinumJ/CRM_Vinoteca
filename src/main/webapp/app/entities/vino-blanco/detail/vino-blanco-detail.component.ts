import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVinoBlanco } from '../vino-blanco.model';

@Component({
  selector: 'jhi-vino-blanco-detail',
  templateUrl: './vino-blanco-detail.component.html',
})
export class VinoBlancoDetailComponent implements OnInit {
  vinoBlanco: IVinoBlanco | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ vinoBlanco }) => {
      this.vinoBlanco = vinoBlanco;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
