import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IVinoBlanco, VinoBlanco } from '../vino-blanco.model';
import { VinoBlancoService } from '../service/vino-blanco.service';

@Injectable({ providedIn: 'root' })
export class VinoBlancoRoutingResolveService implements Resolve<IVinoBlanco> {
  constructor(protected service: VinoBlancoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVinoBlanco> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((vinoBlanco: HttpResponse<VinoBlanco>) => {
          if (vinoBlanco.body) {
            return of(vinoBlanco.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new VinoBlanco());
  }
}
