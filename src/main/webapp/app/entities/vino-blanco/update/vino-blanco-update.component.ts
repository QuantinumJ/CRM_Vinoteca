import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IVinoBlanco, VinoBlanco } from '../vino-blanco.model';
import { VinoBlancoService } from '../service/vino-blanco.service';
import { DomOrg } from 'app/entities/enumerations/dom-org.model';
import { UvaBlanca } from 'app/entities/enumerations/uva-blanca.model';

@Component({
  selector: 'jhi-vino-blanco-update',
  templateUrl: './vino-blanco-update.component.html',
})
export class VinoBlancoUpdateComponent implements OnInit {
  isSaving = false;
  domOrgValues = Object.keys(DomOrg);
  uvaBlancaValues = Object.keys(UvaBlanca);

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
    tipoUvaBlanca: [],
    stock: [],
  });

  constructor(protected vinoBlancoService: VinoBlancoService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ vinoBlanco }) => {
      this.updateForm(vinoBlanco);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const vinoBlanco = this.createFromForm();
    if (vinoBlanco.id !== undefined) {
      this.subscribeToSaveResponse(this.vinoBlancoService.update(vinoBlanco));
    } else {
      this.subscribeToSaveResponse(this.vinoBlancoService.create(vinoBlanco));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVinoBlanco>>): void {
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

  protected updateForm(vinoBlanco: IVinoBlanco): void {
    this.editForm.patchValue({
      id: vinoBlanco.id,
      bodega: vinoBlanco.bodega,
      denominacionOrigen: vinoBlanco.denominacionOrigen,
      anoCosecha: vinoBlanco.anoCosecha,
      nombre: vinoBlanco.nombre,
      maduracion: vinoBlanco.maduracion,
      descripcion: vinoBlanco.descripcion,
      cata: vinoBlanco.cata,
      purezaVino: vinoBlanco.purezaVino,
      precioBruto: vinoBlanco.precioBruto,
      tipoUvaBlanca: vinoBlanco.tipoUvaBlanca,
      stock: vinoBlanco.stock,
    });
  }

  protected createFromForm(): IVinoBlanco {
    return {
      ...new VinoBlanco(),
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
      tipoUvaBlanca: this.editForm.get(['tipoUvaBlanca'])!.value,
      stock: this.editForm.get(['stock'])!.value,
    };
  }
}
