import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT } from 'app/config/input.constants';
import { DomOrg } from 'app/entities/enumerations/dom-org.model';
import { UvaTinta } from 'app/entities/enumerations/uva-tinta.model';
import { IVinoTinto, VinoTinto } from '../vino-tinto.model';

import { VinoTintoService } from './vino-tinto.service';

describe('VinoTinto Service', () => {
  let service: VinoTintoService;
  let httpMock: HttpTestingController;
  let elemDefault: IVinoTinto;
  let expectedResult: IVinoTinto | IVinoTinto[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(VinoTintoService);
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

    it('should create a VinoTinto', () => {
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

      service.create(new VinoTinto()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a VinoTinto', () => {
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

    it('should partial update a VinoTinto', () => {
      const patchObject = Object.assign(
        {
          bodega: 'BBBBBB',
          anoCosecha: currentDate.format(DATE_FORMAT),
          descripcion: 'BBBBBB',
        },
        new VinoTinto()
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

    it('should return a list of VinoTinto', () => {
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

    it('should delete a VinoTinto', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addVinoTintoToCollectionIfMissing', () => {
      it('should add a VinoTinto to an empty array', () => {
        const vinoTinto: IVinoTinto = { id: 123 };
        expectedResult = service.addVinoTintoToCollectionIfMissing([], vinoTinto);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(vinoTinto);
      });

      it('should not add a VinoTinto to an array that contains it', () => {
        const vinoTinto: IVinoTinto = { id: 123 };
        const vinoTintoCollection: IVinoTinto[] = [
          {
            ...vinoTinto,
          },
          { id: 456 },
        ];
        expectedResult = service.addVinoTintoToCollectionIfMissing(vinoTintoCollection, vinoTinto);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a VinoTinto to an array that doesn't contain it", () => {
        const vinoTinto: IVinoTinto = { id: 123 };
        const vinoTintoCollection: IVinoTinto[] = [{ id: 456 }];
        expectedResult = service.addVinoTintoToCollectionIfMissing(vinoTintoCollection, vinoTinto);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(vinoTinto);
      });

      it('should add only unique VinoTinto to an array', () => {
        const vinoTintoArray: IVinoTinto[] = [{ id: 123 }, { id: 456 }, { id: 92263 }];
        const vinoTintoCollection: IVinoTinto[] = [{ id: 123 }];
        expectedResult = service.addVinoTintoToCollectionIfMissing(vinoTintoCollection, ...vinoTintoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const vinoTinto: IVinoTinto = { id: 123 };
        const vinoTinto2: IVinoTinto = { id: 456 };
        expectedResult = service.addVinoTintoToCollectionIfMissing([], vinoTinto, vinoTinto2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(vinoTinto);
        expect(expectedResult).toContain(vinoTinto2);
      });

      it('should accept null and undefined values', () => {
        const vinoTinto: IVinoTinto = { id: 123 };
        expectedResult = service.addVinoTintoToCollectionIfMissing([], null, vinoTinto, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(vinoTinto);
      });

      it('should return initial array if no VinoTinto is added', () => {
        const vinoTintoCollection: IVinoTinto[] = [{ id: 123 }];
        expectedResult = service.addVinoTintoToCollectionIfMissing(vinoTintoCollection, undefined, null);
        expect(expectedResult).toEqual(vinoTintoCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
