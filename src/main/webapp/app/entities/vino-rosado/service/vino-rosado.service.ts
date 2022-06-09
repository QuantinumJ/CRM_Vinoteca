import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IVinoRosado, getVinoRosadoIdentifier } from '../vino-rosado.model';

export type EntityResponseType = HttpResponse<IVinoRosado>;
export type EntityArrayResponseType = HttpResponse<IVinoRosado[]>;

@Injectable({ providedIn: 'root' })
export class VinoRosadoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/vino-rosados');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(vinoRosado: IVinoRosado): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vinoRosado);
    return this.http
      .post<IVinoRosado>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(vinoRosado: IVinoRosado): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vinoRosado);
    return this.http
      .put<IVinoRosado>(`${this.resourceUrl}/${getVinoRosadoIdentifier(vinoRosado) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(vinoRosado: IVinoRosado): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vinoRosado);
    return this.http
      .patch<IVinoRosado>(`${this.resourceUrl}/${getVinoRosadoIdentifier(vinoRosado) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IVinoRosado>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IVinoRosado[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addVinoRosadoToCollectionIfMissing(
    vinoRosadoCollection: IVinoRosado[],
    ...vinoRosadosToCheck: (IVinoRosado | null | undefined)[]
  ): IVinoRosado[] {
    const vinoRosados: IVinoRosado[] = vinoRosadosToCheck.filter(isPresent);
    if (vinoRosados.length > 0) {
      const vinoRosadoCollectionIdentifiers = vinoRosadoCollection.map(vinoRosadoItem => getVinoRosadoIdentifier(vinoRosadoItem)!);
      const vinoRosadosToAdd = vinoRosados.filter(vinoRosadoItem => {
        const vinoRosadoIdentifier = getVinoRosadoIdentifier(vinoRosadoItem);
        if (vinoRosadoIdentifier == null || vinoRosadoCollectionIdentifiers.includes(vinoRosadoIdentifier)) {
          return false;
        }
        vinoRosadoCollectionIdentifiers.push(vinoRosadoIdentifier);
        return true;
      });
      return [...vinoRosadosToAdd, ...vinoRosadoCollection];
    }
    return vinoRosadoCollection;
  }

  protected convertDateFromClient(vinoRosado: IVinoRosado): IVinoRosado {
    return Object.assign({}, vinoRosado, {
      anoCosecha: vinoRosado.anoCosecha?.isValid() ? vinoRosado.anoCosecha.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.anoCosecha = res.body.anoCosecha ? dayjs(res.body.anoCosecha) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((vinoRosado: IVinoRosado) => {
        vinoRosado.anoCosecha = vinoRosado.anoCosecha ? dayjs(vinoRosado.anoCosecha) : undefined;
      });
    }
    return res;
  }
}
