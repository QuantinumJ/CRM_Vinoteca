import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IVinoRosado, VinoRosado } from '../vino-rosado.model';
import { VinoRosadoService } from '../service/vino-rosado.service';

@Injectable({ providedIn: 'root' })
export class VinoRosadoRoutingResolveService implements Resolve<IVinoRosado> {
  constructor(protected service: VinoRosadoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVinoRosado> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((vinoRosado: HttpResponse<VinoRosado>) => {
          if (vinoRosado.body) {
            return of(vinoRosado.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new VinoRosado());
  }
}
