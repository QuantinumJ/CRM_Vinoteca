import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IVinoBlanco, VinoBlanco } from '../vino-blanco.model';
import { VinoBlancoService } from '../service/vino-blanco.service';

import { VinoBlancoRoutingResolveService } from './vino-blanco-routing-resolve.service';

describe('VinoBlanco routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: VinoBlancoRoutingResolveService;
  let service: VinoBlancoService;
  let resultVinoBlanco: IVinoBlanco | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(VinoBlancoRoutingResolveService);
    service = TestBed.inject(VinoBlancoService);
    resultVinoBlanco = undefined;
  });

  describe('resolve', () => {
    it('should return IVinoBlanco returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultVinoBlanco = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultVinoBlanco).toEqual({ id: 123 });
    });

    it('should return new IVinoBlanco if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultVinoBlanco = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultVinoBlanco).toEqual(new VinoBlanco());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as VinoBlanco })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultVinoBlanco = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultVinoBlanco).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
