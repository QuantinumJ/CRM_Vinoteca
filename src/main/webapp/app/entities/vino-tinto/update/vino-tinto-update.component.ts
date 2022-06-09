import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IVinoTinto, VinoTinto } from '../vino-tinto.model';
import { VinoTintoService } from '../service/vino-tinto.service';
import { DomOrg } from 'app/entities/enumerations/dom-org.model';
import { UvaTinta } from 'app/entities/enumerations/uva-tinta.model';

@Component({
  selector: 'jhi-vino-tinto-update',
  templateUrl: './vino-tinto-update.component.html',
})
export class VinoTintoUpdateComponent implements OnInit {
  isSaving = false;
  domOrgValues = Object.keys(DomOrg);
  uvaTintaValues = Object.keys(UvaTinta);

  editForm = this.fb.group({
    id: [],
    bodega: [],
    denominacionOrigen: [],
    anoCosecha: [],
    nombre: [],
    maduracion: [],
    descripcion: [],
    cata: [],
    purezaVino: [],
    precioBruto: [],
    tipoUvaTinta: [],
    stock: [],
  });

  constructor(protected vinoTintoService: VinoTintoService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ vinoTinto }) => {
      this.updateForm(vinoTinto);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const vinoTinto = this.createFromForm();
    if (vinoTinto.id !== undefined) {
      this.subscribeToSaveResponse(this.vinoTintoService.update(vinoTinto));
    } else {
      this.subscribeToSaveResponse(this.vinoTintoService.create(vinoTinto));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVinoTinto>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(vinoTinto: IVinoTinto): void {
    this.editForm.patchValue({
      id: vinoTinto.id,
      bodega: vinoTinto.bodega,
      denominacionOrigen: vinoTinto.denominacionOrigen,
      anoCosecha: vinoTinto.anoCosecha,
      nombre: vinoTinto.nombre,
      maduracion: vinoTinto.maduracion,
      descripcion: vinoTinto.descripcion,
      cata: vinoTinto.cata,
      purezaVino: vinoTinto.purezaVino,
      precioBruto: vinoTinto.precioBruto,
      tipoUvaTinta: vinoTinto.tipoUvaTinta,
      stock: vinoTinto.stock,
    });
  }

  protected createFromForm(): IVinoTinto {
    return {
      ...new VinoTinto(),
      id: this.editForm.get(['id'])!.value,
      bodega: this.editForm.get(['bodega'])!.value,
      denominacionOrigen: this.editForm.get(['denominacionOrigen'])!.value,
      anoCosecha: this.editForm.get(['anoCosecha'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      maduracion: this.editForm.get(['maduracion'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      cata: this.editForm.get(['cata'])!.value,
      purezaVino: this.editForm.get(['purezaVino'])!.value,
      precioBruto: this.editForm.get(['precioBruto'])!.value,
      tipoUvaTinta: this.editForm.get(['tipoUvaTinta'])!.value,
      stock: this.editForm.get(['stock'])!.value,
    };
  }
}
