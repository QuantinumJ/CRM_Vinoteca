import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VinoTintoDetailComponent } from './vino-tinto-detail.component';

describe('VinoTinto Management Detail Component', () => {
  let comp: VinoTintoDetailComponent;
  let fixture: ComponentFixture<VinoTintoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VinoTintoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ vinoTinto: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(VinoTintoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(VinoTintoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load vinoTinto on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.vinoTinto).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
