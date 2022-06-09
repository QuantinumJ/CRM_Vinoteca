import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IVinoTinto, getVinoTintoIdentifier } from '../vino-tinto.model';

export type EntityResponseType = HttpResponse<IVinoTinto>;
export type EntityArrayResponseType = HttpResponse<IVinoTinto[]>;

@Injectable({ providedIn: 'root' })
export class VinoTintoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/vino-tintos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(vinoTinto: IVinoTinto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vinoTinto);
    return this.http
      .post<IVinoTinto>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(vinoTinto: IVinoTinto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vinoTinto);
    return this.http
      .put<IVinoTinto>(`${this.resourceUrl}/${getVinoTintoIdentifier(vinoTinto) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(vinoTinto: IVinoTinto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vinoTinto);
    return this.http
      .patch<IVinoTinto>(`${this.resourceUrl}/${getVinoTintoIdentifier(vinoTinto) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IVinoTinto>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IVinoTinto[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addVinoTintoToCollectionIfMissing(
    vinoTintoCollection: IVinoTinto[],
    ...vinoTintosToCheck: (IVinoTinto | null | undefined)[]
  ): IVinoTinto[] {
    const vinoTintos: IVinoTinto[] = vinoTintosToCheck.filter(isPresent);
    if (vinoTintos.length > 0) {
      const vinoTintoCollectionIdentifiers = vinoTintoCollection.map(vinoTintoItem => getVinoTintoIdentifier(vinoTintoItem)!);
      const vinoTintosToAdd = vinoTintos.filter(vinoTintoItem => {
        const vinoTintoIdentifier = getVinoTintoIdentifier(vinoTintoItem);
        if (vinoTintoIdentifier == null || vinoTintoCollectionIdentifiers.includes(vinoTintoIdentifier)) {
          return false;
        }
        vinoTintoCollectionIdentifiers.push(vinoTintoIdentifier);
        return true;
      });
      return [...vinoTintosToAdd, ...vinoTintoCollection];
    }
    return vinoTintoCollection;
  }

  protected convertDateFromClient(vinoTinto: IVinoTinto): IVinoTinto {
    return Object.assign({}, vinoTinto, {
      anoCosecha: vinoTinto.anoCosecha?.isValid() ? vinoTinto.anoCosecha.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((vinoTinto: IVinoTinto) => {
        vinoTinto.anoCosecha = vinoTinto.anoCosecha ? dayjs(vinoTinto.anoCosecha) : undefined;
      });
    }
    return res;
  }
}
