import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { VinoTintoService } from '../service/vino-tinto.service';

import { VinoTintoComponent } from './vino-tinto.component';

describe('VinoTinto Management Component', () => {
  let comp: VinoTintoComponent;
  let fixture: ComponentFixture<VinoTintoComponent>;
  let service: VinoTintoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [VinoTintoComponent],
    })
      .overrideTemplate(VinoTintoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VinoTintoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(VinoTintoService);

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
    expect(comp.vinoTintos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
