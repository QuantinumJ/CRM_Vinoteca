import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { VinoBlancoService } from '../service/vino-blanco.service';
import { IVinoBlanco, VinoBlanco } from '../vino-blanco.model';

import { VinoBlancoUpdateComponent } from './vino-blanco-update.component';

describe('VinoBlanco Management Update Component', () => {
  let comp: VinoBlancoUpdateComponent;
  let fixture: ComponentFixture<VinoBlancoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let vinoBlancoService: VinoBlancoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [VinoBlancoUpdateComponent],
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
      .overrideTemplate(VinoBlancoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VinoBlancoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    vinoBlancoService = TestBed.inject(VinoBlancoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const vinoBlanco: IVinoBlanco = { id: 456 };

      activatedRoute.data = of({ vinoBlanco });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(vinoBlanco));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<VinoBlanco>>();
      const vinoBlanco = { id: 123 };
      jest.spyOn(vinoBlancoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ vinoBlanco });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: vinoBlanco }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(vinoBlancoService.update).toHaveBeenCalledWith(vinoBlanco);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<VinoBlanco>>();
      const vinoBlanco = new VinoBlanco();
      jest.spyOn(vinoBlancoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ vinoBlanco });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: vinoBlanco }));
      saveSubject.complete();

      // THEN
      expect(vinoBlancoService.create).toHaveBeenCalledWith(vinoBlanco);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<VinoBlanco>>();
      const vinoBlanco = { id: 123 };
      jest.spyOn(vinoBlancoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ vinoBlanco });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(vinoBlancoService.update).toHaveBeenCalledWith(vinoBlanco);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
