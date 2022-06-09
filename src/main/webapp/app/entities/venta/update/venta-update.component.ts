import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IVenta, Venta } from '../venta.model';
import { VentaService } from '../service/venta.service';
import { IFactura } from 'app/entities/factura/factura.model';
import { FacturaService } from 'app/entities/factura/service/factura.service';
import { IEmpleado } from 'app/entities/empleado/empleado.model';
import { EmpleadoService } from 'app/entities/empleado/service/empleado.service';
import { IVinoTinto } from 'app/entities/vino-tinto/vino-tinto.model';
import { VinoTintoService } from 'app/entities/vino-tinto/service/vino-tinto.service';
import { IVinoRosado } from 'app/entities/vino-rosado/vino-rosado.model';
import { VinoRosadoService } from 'app/entities/vino-rosado/service/vino-rosado.service';
import { IVinoBlanco } from 'app/entities/vino-blanco/vino-blanco.model';
import { VinoBlancoService } from 'app/entities/vino-blanco/service/vino-blanco.service';
import { FormaPago } from 'app/entities/enumerations/forma-pago.model';

@Component({
  selector: 'jhi-venta-update',
  templateUrl: './venta-update.component.html',
})
export class VentaUpdateComponent implements OnInit {
  isSaving = false;
  formaPagoValues = Object.keys(FormaPago);

  facturasCollection: IFactura[] = [];
  empleadosSharedCollection: IEmpleado[] = [];
  vinoTintosSharedCollection: IVinoTinto[] = [];
  vinoRosadosSharedCollection: IVinoRosado[] = [];
  vinoBlancosSharedCollection: IVinoBlanco[] = [];

  editForm = this.fb.group({
    id: [],
    fechaHora: [],
    cantidad: [],
    totalNeto: [],
    totalPagar: [],
    tipoDePago: [],
    factura: [],
    empleado: [],
    vinoTinto: [],
    vinoRosado: [],
    vinoBlanco: [],
  });

  constructor(
    protected ventaService: VentaService,
    protected facturaService: FacturaService,
    protected empleadoService: EmpleadoService,
    protected vinoTintoService: VinoTintoService,
    protected vinoRosadoService: VinoRosadoService,
    protected vinoBlancoService: VinoBlancoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ venta }) => {
      if (venta.id === undefined) {
        const today = dayjs().startOf('day');
        venta.fechaHora = today;
      }

      this.updateForm(venta);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const venta = this.createFromForm();
    if (venta.id !== undefined) {
      this.subscribeToSaveResponse(this.ventaService.update(venta));
    } else {
      this.subscribeToSaveResponse(this.ventaService.create(venta));
    }
  }

  trackFacturaById(_index: number, item: IFactura): number {
    return item.id!;
  }

  trackEmpleadoById(_index: number, item: IEmpleado): number {
    return item.id!;
  }

  trackVinoTintoById(_index: number, item: IVinoTinto): number {
    return item.id!;
  }

  trackVinoRosadoById(_index: number, item: IVinoRosado): number {
    return item.id!;
  }

  trackVinoBlancoById(_index: number, item: IVinoBlanco): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVenta>>): void {
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

  protected updateForm(venta: IVenta): void {
    this.editForm.patchValue({
      id: venta.id,
      fechaHora: venta.fechaHora ? venta.fechaHora.format(DATE_TIME_FORMAT) : null,
      cantidad: venta.cantidad,
      totalNeto: venta.totalNeto,
      totalPagar: venta.totalPagar,
      tipoDePago: venta.tipoDePago,
      factura: venta.factura,
      empleado: venta.empleado,
      vinoTinto: venta.vinoTinto,
      vinoRosado: venta.vinoRosado,
      vinoBlanco: venta.vinoBlanco,
    });

    this.facturasCollection = this.facturaService.addFacturaToCollectionIfMissing(this.facturasCollection, venta.factura);
    this.empleadosSharedCollection = this.empleadoService.addEmpleadoToCollectionIfMissing(this.empleadosSharedCollection, venta.empleado);
    this.vinoTintosSharedCollection = this.vinoTintoService.addVinoTintoToCollectionIfMissing(
      this.vinoTintosSharedCollection,
      venta.vinoTinto
    );
    this.vinoRosadosSharedCollection = this.vinoRosadoService.addVinoRosadoToCollectionIfMissing(
      this.vinoRosadosSharedCollection,
      venta.vinoRosado
    );
    this.vinoBlancosSharedCollection = this.vinoBlancoService.addVinoBlancoToCollectionIfMissing(
      this.vinoBlancosSharedCollection,
      venta.vinoBlanco
    );
  }

  protected loadRelationshipsOptions(): void {
    this.facturaService
      .query({ filter: 'venta-is-null' })
      .pipe(map((res: HttpResponse<IFactura[]>) => res.body ?? []))
      .pipe(
        map((facturas: IFactura[]) => this.facturaService.addFacturaToCollectionIfMissing(facturas, this.editForm.get('factura')!.value))
      )
      .subscribe((facturas: IFactura[]) => (this.facturasCollection = facturas));

    this.empleadoService
      .query()
      .pipe(map((res: HttpResponse<IEmpleado[]>) => res.body ?? []))
      .pipe(
        map((empleados: IEmpleado[]) =>
          this.empleadoService.addEmpleadoToCollectionIfMissing(empleados, this.editForm.get('empleado')!.value)
        )
      )
      .subscribe((empleados: IEmpleado[]) => (this.empleadosSharedCollection = empleados));

    this.vinoTintoService
      .query()
      .pipe(map((res: HttpResponse<IVinoTinto[]>) => res.body ?? []))
      .pipe(
        map((vinoTintos: IVinoTinto[]) =>
          this.vinoTintoService.addVinoTintoToCollectionIfMissing(vinoTintos, this.editForm.get('vinoTinto')!.value)
        )
      )
      .subscribe((vinoTintos: IVinoTinto[]) => (this.vinoTintosSharedCollection = vinoTintos));

    this.vinoRosadoService
      .query()
      .pipe(map((res: HttpResponse<IVinoRosado[]>) => res.body ?? []))
      .pipe(
        map((vinoRosados: IVinoRosado[]) =>
          this.vinoRosadoService.addVinoRosadoToCollectionIfMissing(vinoRosados, this.editForm.get('vinoRosado')!.value)
        )
      )
      .subscribe((vinoRosados: IVinoRosado[]) => (this.vinoRosadosSharedCollection = vinoRosados));

    this.vinoBlancoService
      .query()
      .pipe(map((res: HttpResponse<IVinoBlanco[]>) => res.body ?? []))
      .pipe(
        map((vinoBlancos: IVinoBlanco[]) =>
          this.vinoBlancoService.addVinoBlancoToCollectionIfMissing(vinoBlancos, this.editForm.get('vinoBlanco')!.value)
        )
      )
      .subscribe((vinoBlancos: IVinoBlanco[]) => (this.vinoBlancosSharedCollection = vinoBlancos));
  }

  protected createFromForm(): IVenta {
    return {
      ...new Venta(),
      id: this.editForm.get(['id'])!.value,
      fechaHora: this.editForm.get(['fechaHora'])!.value ? dayjs(this.editForm.get(['fechaHora'])!.value, DATE_TIME_FORMAT) : undefined,
      cantidad: this.editForm.get(['cantidad'])!.value,
      totalNeto: this.editForm.get(['totalNeto'])!.value,
      totalPagar: this.editForm.get(['totalPagar'])!.value,
      tipoDePago: this.editForm.get(['tipoDePago'])!.value,
      factura: this.editForm.get(['factura'])!.value,
      empleado: this.editForm.get(['empleado'])!.value,
      vinoTinto: this.editForm.get(['vinoTinto'])!.value,
      vinoRosado: this.editForm.get(['vinoRosado'])!.value,
      vinoBlanco: this.editForm.get(['vinoBlanco'])!.value,
    };
  }
}
