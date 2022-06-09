import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVinoTinto } from '../vino-tinto.model';

@Component({
  selector: 'jhi-vino-tinto-detail',
  templateUrl: './vino-tinto-detail.component.html',
})
export class VinoTintoDetailComponent implements OnInit {
  vinoTinto: IVinoTinto | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ vinoTinto }) => {
      this.vinoTinto = vinoTinto;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
