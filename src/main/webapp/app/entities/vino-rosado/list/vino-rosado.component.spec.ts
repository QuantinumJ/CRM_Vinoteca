import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { VinoRosadoService } from '../service/vino-rosado.service';

import { VinoRosadoComponent } from './vino-rosado.component';

describe('VinoRosado Management Component', () => {
  let comp: VinoRosadoComponent;
  let fixture: ComponentFixture<VinoRosadoComponent>;
  let service: VinoRosadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [VinoRosadoComponent],
    })
      .overrideTemplate(VinoRosadoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(VinoRosadoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(VinoRosadoService);

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
    expect(comp.vinoRosados?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
