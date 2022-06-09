import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IVinoRosado, VinoRosado } from '../vino-rosado.model';
import { VinoRosadoService } from '../service/vino-rosado.service';

import { VinoRosadoRoutingResolveService } from './vino-rosado-routing-resolve.service';

describe('VinoRosado routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: VinoRosadoRoutingResolveService;
  let service: VinoRosadoService;
  let resultVinoRosado: IVinoRosado | undefined;

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
    routingResolveService = TestBed.inject(VinoRosadoRoutingResolveService);
    service = TestBed.inject(VinoRosadoService);
    resultVinoRosado = undefined;
  });

  describe('resolve', () => {
    it('should return IVinoRosado returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultVinoRosado = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultVinoRosado).toEqual({ id: 123 });
    });

    it('should return new IVinoRosado if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultVinoRosado = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultVinoRosado).toEqual(new VinoRosado());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as VinoRosado })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultVinoRosado = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultVinoRosado).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
