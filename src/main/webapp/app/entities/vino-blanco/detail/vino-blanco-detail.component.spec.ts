import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VinoBlancoDetailComponent } from './vino-blanco-detail.component';

describe('VinoBlanco Management Detail Component', () => {
  let comp: VinoBlancoDetailComponent;
  let fixture: ComponentFixture<VinoBlancoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VinoBlancoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ vinoBlanco: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(VinoBlancoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(VinoBlancoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load vinoBlanco on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.vinoBlanco).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
