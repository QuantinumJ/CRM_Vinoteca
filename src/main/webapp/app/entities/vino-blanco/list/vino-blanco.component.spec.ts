import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { VinoBlancoService } from '../service/vino-blanco.service';

import { VinoBlancoComponent } from './vino-blanco.component';

describe('VinoBlanco Management Component', () => {
  let comp: VinoBlancoComponent;
  let fixture: ComponentFixture<VinoBlancoComponent>;
  let service: VinoBlancoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [VinoBlancoComponent],
    })
      .overrideTemplate(VinoBlancoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VinoBlancoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(VinoBlancoService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.vinoBlancos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
