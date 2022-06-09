import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { VentaService } from '../service/venta.service';
import { IVenta, Venta } from '../venta.model';
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

import { VentaUpdateComponent } from './venta-update.component';

describe('Venta Management Update Component', () => {
  let comp: VentaUpdateComponent;
  let fixture: ComponentFixture<VentaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let ventaService: VentaService;
  let facturaService: FacturaService;
  let empleadoService: EmpleadoService;
  let vinoTintoService: VinoTintoService;
  let vinoRosadoService: VinoRosadoService;
  let vinoBlancoService: VinoBlancoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [VentaUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(VentaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VentaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    ventaService = TestBed.inject(VentaService);
    facturaService = TestBed.inject(FacturaService);
    empleadoService = TestBed.inject(EmpleadoService);
    vinoTintoService = TestBed.inject(VinoTintoService);
    vinoRosadoService = TestBed.inject(VinoRosadoService);
    vinoBlancoService = TestBed.inject(VinoBlancoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call factura query and add missing value', () => {
      const venta: IVenta = { id: 456 };
      const factura: IFactura = { id: 4421 };
      venta.factura = factura;

      const facturaCollection: IFactura[] = [{ id: 53981 }];
      jest.spyOn(facturaService, 'query').mockReturnValue(of(new HttpResponse({ body: facturaCollection })));
      const expectedCollection: IFactura[] = [factura, ...facturaCollection];
      jest.spyOn(facturaService, 'addFacturaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ venta });
      comp.ngOnInit();

      expect(facturaService.query).toHaveBeenCalled();
      expect(facturaService.addFacturaToCollectionIfMissing).toHaveBeenCalledWith(facturaCollection, factura);
      expect(comp.facturasCollection).toEqual(expectedCollection);
    });

    it('Should call Empleado query and add missing value', () => {
      const venta: IVenta = { id: 456 };
      const empleado: IEmpleado = { id: 11859 };
      venta.empleado = empleado;

      const empleadoCollection: IEmpleado[] = [{ id: 10221 }];
      jest.spyOn(empleadoService, 'query').mockReturnValue(of(new HttpResponse({ body: empleadoCollection })));
      const additionalEmpleados = [empleado];
      const expectedCollection: IEmpleado[] = [...additionalEmpleados, ...empleadoCollection];
      jest.spyOn(empleadoService, 'addEmpleadoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ venta });
      comp.ngOnInit();

      expect(empleadoService.query).toHaveBeenCalled();
      expect(empleadoService.addEmpleadoToCollectionIfMissing).toHaveBeenCalledWith(empleadoCollection, ...additionalEmpleados);
      expect(comp.empleadosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call VinoTinto query and add missing value', () => {
      const venta: IVenta = { id: 456 };
      const vinoTinto: IVinoTinto = { id: 9041 };
      venta.vinoTinto = vinoTinto;

      const vinoTintoCollection: IVinoTinto[] = [{ id: 68707 }];
      jest.spyOn(vinoTintoService, 'query').mockReturnValue(of(new HttpResponse({ body: vinoTintoCollection })));
      const additionalVinoTintos = [vinoTinto];
      const expectedCollection: IVinoTinto[] = [...additionalVinoTintos, ...vinoTintoCollection];
      jest.spyOn(vinoTintoService, 'addVinoTintoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ venta });
      comp.ngOnInit();

      expect(vinoTintoService.query).toHaveBeenCalled();
      expect(vinoTintoService.addVinoTintoToCollectionIfMissing).toHaveBeenCalledWith(vinoTintoCollection, ...additionalVinoTintos);
      expect(comp.vinoTintosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call VinoRosado query and add missing value', () => {
      const venta: IVenta = { id: 456 };
      const vinoRosado: IVinoRosado = { id: 65374 };
      venta.vinoRosado = vinoRosado;

      const vinoRosadoCollection: IVinoRosado[] = [{ id: 60446 }];
      jest.spyOn(vinoRosadoService, 'query').mockReturnValue(of(new HttpResponse({ body: vinoRosadoCollection })));
      const additionalVinoRosados = [vinoRosado];
      const expectedCollection: IVinoRosado[] = [...additionalVinoRosados, ...vinoRosadoCollection];
      jest.spyOn(vinoRosadoService, 'addVinoRosadoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ venta });
      comp.ngOnInit();

      expect(vinoRosadoService.query).toHaveBeenCalled();
      expect(vinoRosadoService.addVinoRosadoToCollectionIfMissing).toHaveBeenCalledWith(vinoRosadoCollection, ...additionalVinoRosados);
      expect(comp.vinoRosadosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call VinoBlanco query and add missing value', () => {
      const venta: IVenta = { id: 456 };
      const vinoBlanco: IVinoBlanco = { id: 79937 };
      venta.vinoBlanco = vinoBlanco;

      const vinoBlancoCollection: IVinoBlanco[] = [{ id: 78218 }];
      jest.spyOn(vinoBlancoService, 'query').mockReturnValue(of(new HttpResponse({ body: vinoBlancoCollection })));
      const additionalVinoBlancos = [vinoBlanco];
      const expectedCollection: IVinoBlanco[] = [...additionalVinoBlancos, ...vinoBlancoCollection];
      jest.spyOn(vinoBlancoService, 'addVinoBlancoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ venta });
      comp.ngOnInit();

      expect(vinoBlancoService.query).toHaveBeenCalled();
      expect(vinoBlancoService.addVinoBlancoToCollectionIfMissing).toHaveBeenCalledWith(vinoBlancoCollection, ...additionalVinoBlancos);
      expect(comp.vinoBlancosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const venta: IVenta = { id: 456 };
      const factura: IFactura = { id: 5786 };
      venta.factura = factura;
      const empleado: IEmpleado = { id: 17057 };
      venta.empleado = empleado;
      const vinoTinto: IVinoTinto = { id: 33668 };
      venta.vinoTinto = vinoTinto;
      const vinoRosado: IVinoRosado = { id: 44812 };
      venta.vinoRosado = vinoRosado;
      const vinoBlanco: IVinoBlanco = { id: 87344 };
      venta.vinoBlanco = vinoBlanco;

      activatedRoute.data = of({ venta });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(venta));
      expect(comp.facturasCollection).toContain(factura);
      expect(comp.empleadosSharedCollection).toContain(empleado);
      expect(comp.vinoTintosSharedCollection).toContain(vinoTinto);
      expect(comp.vinoRosadosSharedCollection).toContain(vinoRosado);
      expect(comp.vinoBlancosSharedCollection).toContain(vinoBlanco);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Venta>>();
      const venta = { id: 123 };
      jest.spyOn(ventaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ venta });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: venta }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(ventaService.update).toHaveBeenCalledWith(venta);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Venta>>();
      const venta = new Venta();
      jest.spyOn(ventaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ venta });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: venta }));
      saveSubject.complete();

      // THEN
      expect(ventaService.create).toHaveBeenCalledWith(venta);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Venta>>();
      const venta = { id: 123 };
      jest.spyOn(ventaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ venta });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(ventaService.update).toHaveBeenCalledWith(venta);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackFacturaById', () => {
      it('Should return tracked Factura primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackFacturaById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackEmpleadoById', () => {
      it('Should return tracked Empleado primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackEmpleadoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackVinoTintoById', () => {
      it('Should return tracked VinoTinto primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackVinoTintoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackVinoRosadoById', () => {
      it('Should return tracked VinoRosado primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackVinoRosadoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackVinoBlancoById', () => {
      it('Should return tracked VinoBlanco primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackVinoBlancoById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
