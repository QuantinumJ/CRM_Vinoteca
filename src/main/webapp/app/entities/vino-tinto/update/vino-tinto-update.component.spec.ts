import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { VinoTintoService } from '../service/vino-tinto.service';
import { IVinoTinto, VinoTinto } from '../vino-tinto.model';

import { VinoTintoUpdateComponent } from './vino-tinto-update.component';

describe('VinoTinto Management Update Component', () => {
  let comp: VinoTintoUpdateComponent;
  let fixture: ComponentFixture<VinoTintoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let vinoTintoService: VinoTintoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [VinoTintoUpdateComponent],
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
      .overrideTemplate(VinoTintoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VinoTintoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    vinoTintoService = TestBed.inject(VinoTintoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const vinoTinto: IVinoTinto = { id: 456 };

      activatedRoute.data = of({ vinoTinto });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(vinoTinto));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<VinoTinto>>();
      const vinoTinto = { id: 123 };
      jest.spyOn(vinoTintoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ vinoTinto });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: vinoTinto }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(vinoTintoService.update).toHaveBeenCalledWith(vinoTinto);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<VinoTinto>>();
      const vinoTinto = new VinoTinto();
      jest.spyOn(vinoTintoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ vinoTinto });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: vinoTinto }));
      saveSubject.complete();

      // THEN
      expect(vinoTintoService.create).toHaveBeenCalledWith(vinoTinto);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<VinoTinto>>();
      const vinoTinto = { id: 123 };
      jest.spyOn(vinoTintoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ vinoTinto });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(vinoTintoService.update).toHaveBeenCalledWith(vinoTinto);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
