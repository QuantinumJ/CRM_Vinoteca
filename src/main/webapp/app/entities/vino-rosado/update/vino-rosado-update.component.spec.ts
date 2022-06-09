import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { VinoRosadoService } from '../service/vino-rosado.service';
import { IVinoRosado, VinoRosado } from '../vino-rosado.model';

import { VinoRosadoUpdateComponent } from './vino-rosado-update.component';

describe('VinoRosado Management Update Component', () => {
  let comp: VinoRosadoUpdateComponent;
  let fixture: ComponentFixture<VinoRosadoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let vinoRosadoService: VinoRosadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [VinoRosadoUpdateComponent],
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
      .overrideTemplate(VinoRosadoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VinoRosadoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    vinoRosadoService = TestBed.inject(VinoRosadoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const vinoRosado: IVinoRosado = { id: 456 };

      activatedRoute.data = of({ vinoRosado });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(vinoRosado));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<VinoRosado>>();
      const vinoRosado = { id: 123 };
      jest.spyOn(vinoRosadoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ vinoRosado });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: vinoRosado }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(vinoRosadoService.update).toHaveBeenCalledWith(vinoRosado);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<VinoRosado>>();
      const vinoRosado = new VinoRosado();
      jest.spyOn(vinoRosadoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ vinoRosado });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: vinoRosado }));
      saveSubject.complete();

      // THEN
      expect(vinoRosadoService.create).toHaveBeenCalledWith(vinoRosado);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<VinoRosado>>();
      const vinoRosado = { id: 123 };
      jest.spyOn(vinoRosadoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ vinoRosado });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(vinoRosadoService.update).toHaveBeenCalledWith(vinoRosado);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
