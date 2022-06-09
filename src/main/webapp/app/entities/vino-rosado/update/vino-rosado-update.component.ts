import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IVinoRosado, VinoRosado } from '../vino-rosado.model';
import { VinoRosadoService } from '../service/vino-rosado.service';
import { DomOrg } from 'app/entities/enumerations/dom-org.model';
import { UvaTinta } from 'app/entities/enumerations/uva-tinta.model';
import { UvaBlanca } from 'app/entities/enumerations/uva-blanca.model';

@Component({
  selector: 'jhi-vino-rosado-update',
  templateUrl: './vino-rosado-update.component.html',
})
export class VinoRosadoUpdateComponent implements OnInit {
  isSaving = false;
  domOrgValues = Object.keys(DomOrg);
  uvaTintaValues = Object.keys(UvaTinta);
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
    tipoUvaTinta: [],
    tipoUvaBlanca: [],
    stock: [],
  });

  constructor(protected vinoRosadoService: VinoRosadoService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ vinoRosado }) => {
      this.updateForm(vinoRosado);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const vinoRosado = this.createFromForm();
    if (vinoRosado.id !== undefined) {
      this.subscribeToSaveResponse(this.vinoRosadoService.update(vinoRosado));
    } else {
      this.subscribeToSaveResponse(this.vinoRosadoService.create(vinoRosado));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVinoRosado>>): void {
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

  protected updateForm(vinoRosado: IVinoRosado): void {
    this.editForm.patchValue({
      id: vinoRosado.id,
      bodega: vinoRosado.bodega,
      denominacionOrigen: vinoRosado.denominacionOrigen,
      anoCosecha: vinoRosado.anoCosecha,
      nombre: vinoRosado.nombre,
      maduracion: vinoRosado.maduracion,
      descripcion: vinoRosado.descripcion,
      cata: vinoRosado.cata,
      purezaVino: vinoRosado.purezaVino,
      precioBruto: vinoRosado.precioBruto,
      tipoUvaTinta: vinoRosado.tipoUvaTinta,
      tipoUvaBlanca: vinoRosado.tipoUvaBlanca,
      stock: vinoRosado.stock,
    });
  }

  protected createFromForm(): IVinoRosado {
    return {
      ...new VinoRosado(),
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
      tipoUvaBlanca: this.editForm.get(['tipoUvaBlanca'])!.value,
      stock: this.editForm.get(['stock'])!.value,
    };
  }
}
