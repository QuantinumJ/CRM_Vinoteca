import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VinoRosadoDetailComponent } from './vino-rosado-detail.component';

describe('VinoRosado Management Detail Component', () => {
  let comp: VinoRosadoDetailComponent;
  let fixture: ComponentFixture<VinoRosadoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VinoRosadoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ vinoRosado: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(VinoRosadoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(VinoRosadoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load vinoRosado on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.vinoRosado).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
