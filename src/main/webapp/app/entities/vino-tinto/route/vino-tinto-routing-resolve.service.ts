import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IVinoTinto, VinoTinto } from '../vino-tinto.model';
import { VinoTintoService } from '../service/vino-tinto.service';

@Injectable({ providedIn: 'root' })
export class VinoTintoRoutingResolveService implements Resolve<IVinoTinto> {
  constructor(protected service: VinoTintoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVinoTinto> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((vinoTinto: HttpResponse<VinoTinto>) => {
          if (vinoTinto.body) {
            return of(vinoTinto.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new VinoTinto());
  }
}
