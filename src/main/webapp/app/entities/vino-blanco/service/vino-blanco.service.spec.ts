import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT } from 'app/config/input.constants';
import { DomOrg } from 'app/entities/enumerations/dom-org.model';
import { UvaBlanca } from 'app/entities/enumerations/uva-blanca.model';
import { IVinoBlanco, VinoBlanco } from '../vino-blanco.model';

import { VinoBlancoService } from './vino-blanco.service';

describe('VinoBlanco Service', () => {
  let service: VinoBlancoService;
  let httpMock: HttpTestingController;
  let elemDefault: IVinoBlanco;
  let expectedResult: IVinoBlanco | IVinoBlanco[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(VinoBlancoService);
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

    it('should create a VinoBlanco', () => {
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

      service.create(new VinoBlanco()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a VinoBlanco', () => {
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

    it('should partial update a VinoBlanco', () => {
      const patchObject = Object.assign(
        {
          bodega: 'BBBBBB',
          denominacionOrigen: 'BBBBBB',
          nombre: 'BBBBBB',
          cata: 'BBBBBB',
          precioBruto: 1,
          tipoUvaBlanca: 'BBBBBB',
        },
        new VinoBlanco()
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

    it('should return a list of VinoBlanco', () => {
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

    it('should delete a VinoBlanco', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addVinoBlancoToCollectionIfMissing', () => {
      it('should add a VinoBlanco to an empty array', () => {
        const vinoBlanco: IVinoBlanco = { id: 123 };
        expectedResult = service.addVinoBlancoToCollectionIfMissing([], vinoBlanco);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(vinoBlanco);
      });

      it('should not add a VinoBlanco to an array that contains it', () => {
        const vinoBlanco: IVinoBlanco = { id: 123 };
        const vinoBlancoCollection: IVinoBlanco[] = [
          {
            ...vinoBlanco,
          },
          { id: 456 },
        ];
        expectedResult = service.addVinoBlancoToCollectionIfMissing(vinoBlancoCollection, vinoBlanco);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a VinoBlanco to an array that doesn't contain it", () => {
        const vinoBlanco: IVinoBlanco = { id: 123 };
        const vinoBlancoCollection: IVinoBlanco[] = [{ id: 456 }];
        expectedResult = service.addVinoBlancoToCollectionIfMissing(vinoBlancoCollection, vinoBlanco);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(vinoBlanco);
      });

      it('should add only unique VinoBlanco to an array', () => {
        const vinoBlancoArray: IVinoBlanco[] = [{ id: 123 }, { id: 456 }, { id: 66508 }];
        const vinoBlancoCollection: IVinoBlanco[] = [{ id: 123 }];
        expectedResult = service.addVinoBlancoToCollectionIfMissing(vinoBlancoCollection, ...vinoBlancoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const vinoBlanco: IVinoBlanco = { id: 123 };
        const vinoBlanco2: IVinoBlanco = { id: 456 };
        expectedResult = service.addVinoBlancoToCollectionIfMissing([], vinoBlanco, vinoBlanco2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(vinoBlanco);
        expect(expectedResult).toContain(vinoBlanco2);
      });

      it('should accept null and undefined values', () => {
        const vinoBlanco: IVinoBlanco = { id: 123 };
        expectedResult = service.addVinoBlancoToCollectionIfMissing([], null, vinoBlanco, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(vinoBlanco);
      });

      it('should return initial array if no VinoBlanco is added', () => {
        const vinoBlancoCollection: IVinoBlanco[] = [{ id: 123 }];
        expectedResult = service.addVinoBlancoToCollectionIfMissing(vinoBlancoCollection, undefined, null);
        expect(expectedResult).toEqual(vinoBlancoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
