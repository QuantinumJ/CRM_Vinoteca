import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT } from 'app/config/input.constants';
import { DomOrg } from 'app/entities/enumerations/dom-org.model';
import { UvaTinta } from 'app/entities/enumerations/uva-tinta.model';
import { UvaBlanca } from 'app/entities/enumerations/uva-blanca.model';
import { IVinoRosado, VinoRosado } from '../vino-rosado.model';

import { VinoRosadoService } from './vino-rosado.service';

describe('VinoRosado Service', () => {
  let service: VinoRosadoService;
  let httpMock: HttpTestingController;
  let elemDefault: IVinoRosado;
  let expectedResult: IVinoRosado | IVinoRosado[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(VinoRosadoService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      bodega: 'AAAAAAA',
      denominacionOrigen: DomOrg.ANDALUCIA,
      anoCosecha: currentDate,
      nombre: 'AAAAAAA',
      maduracion: 'AAAAAAA',
      descripcion: 'AAAAAAA',
      cata: 'AAAAAAA',
      purezaVino: 0,
      precioBruto: 0,
      tipoUvaTinta: UvaTinta.BOBAL,
      tipoUvaBlanca: UvaBlanca.VERDEJO,
      stock: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          anoCosecha: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a VinoRosado', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          anoCosecha: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          anoCosecha: currentDate,
        },
        returnedFromService
      );

      service.create(new VinoRosado()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a VinoRosado', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          bodega: 'BBBBBB',
          denominacionOrigen: 'BBBBBB',
          anoCosecha: currentDate.format(DATE_FORMAT),
          nombre: 'BBBBBB',
          maduracion: 'BBBBBB',
          descripcion: 'BBBBBB',
          cata: 'BBBBBB',
          purezaVino: 1,
          precioBruto: 1,
          tipoUvaTinta: 'BBBBBB',
          tipoUvaBlanca: 'BBBBBB',
          stock: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          anoCosecha: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a VinoRosado', () => {
      const patchObject = Object.assign(
        {
          bodega: 'BBBBBB',
          denominacionOrigen: 'BBBBBB',
          purezaVino: 1,
          tipoUvaTinta: 'BBBBBB',
          stock: 1,
        },
        new VinoRosado()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          anoCosecha: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of VinoRosado', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          bodega: 'BBBBBB',
          denominacionOrigen: 'BBBBBB',
          anoCosecha: currentDate.format(DATE_FORMAT),
          nombre: 'BBBBBB',
          maduracion: 'BBBBBB',
          descripcion: 'BBBBBB',
          cata: 'BBBBBB',
          purezaVino: 1,
          precioBruto: 1,
          tipoUvaTinta: 'BBBBBB',
          tipoUvaBlanca: 'BBBBBB',
          stock: 1,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          anoCosecha: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a VinoRosado', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addVinoRosadoToCollectionIfMissing', () => {
      it('should add a VinoRosado to an empty array', () => {
        const vinoRosado: IVinoRosado = { id: 123 };
        expectedResult = service.addVinoRosadoToCollectionIfMissing([], vinoRosado);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(vinoRosado);
      });

      it('should not add a VinoRosado to an array that contains it', () => {
        const vinoRosado: IVinoRosado = { id: 123 };
        const vinoRosadoCollection: IVinoRosado[] = [
          {
            ...vinoRosado,
          },
          { id: 456 },
        ];
        expectedResult = service.addVinoRosadoToCollectionIfMissing(vinoRosadoCollection, vinoRosado);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a VinoRosado to an array that doesn't contain it", () => {
        const vinoRosado: IVinoRosado = { id: 123 };
        const vinoRosadoCollection: IVinoRosado[] = [{ id: 456 }];
        expectedResult = service.addVinoRosadoToCollectionIfMissing(vinoRosadoCollection, vinoRosado);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(vinoRosado);
      });

      it('should add only unique VinoRosado to an array', () => {
        const vinoRosadoArray: IVinoRosado[] = [{ id: 123 }, { id: 456 }, { id: 4401 }];
        const vinoRosadoCollection: IVinoRosado[] = [{ id: 123 }];
        expectedResult = service.addVinoRosadoToCollectionIfMissing(vinoRosadoCollection, ...vinoRosadoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const vinoRosado: IVinoRosado = { id: 123 };
        const vinoRosado2: IVinoRosado = { id: 456 };
        expectedResult = service.addVinoRosadoToCollectionIfMissing([], vinoRosado, vinoRosado2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(vinoRosado);
        expect(expectedResult).toContain(vinoRosado2);
      });

      it('should accept null and undefined values', () => {
        const vinoRosado: IVinoRosado = { id: 123 };
        expectedResult = service.addVinoRosadoToCollectionIfMissing([], null, vinoRosado, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(vinoRosado);
      });

      it('should return initial array if no VinoRosado is added', () => {
        const vinoRosadoCollection: IVinoRosado[] = [{ id: 123 }];
        expectedResult = service.addVinoRosadoToCollectionIfMissing(vinoRosadoCollection, undefined, null);
        expect(expectedResult).toEqual(vinoRosadoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
