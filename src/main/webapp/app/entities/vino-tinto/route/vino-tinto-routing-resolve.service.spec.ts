import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IVinoTinto, VinoTinto } from '../vino-tinto.model';
import { VinoTintoService } from '../service/vino-tinto.service';

import { VinoTintoRoutingResolveService } from './vino-tinto-routing-resolve.service';

describe('VinoTinto routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: VinoTintoRoutingResolveService;
  let service: VinoTintoService;
  let resultVinoTinto: IVinoTinto | undefined;

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
    routingResolveService = TestBed.inject(VinoTintoRoutingResolveService);
    service = TestBed.inject(VinoTintoService);
    resultVinoTinto = undefined;
  });

  describe('resolve', () => {
    it('should return IVinoTinto returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultVinoTinto = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultVinoTinto).toEqual({ id: 123 });
    });

    it('should return new IVinoTinto if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultVinoTinto = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultVinoTinto).toEqual(new VinoTinto());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as VinoTinto })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultVinoTinto = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultVinoTinto).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
