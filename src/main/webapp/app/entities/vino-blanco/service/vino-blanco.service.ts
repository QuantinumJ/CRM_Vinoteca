import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IVinoBlanco, getVinoBlancoIdentifier } from '../vino-blanco.model';

export type EntityResponseType = HttpResponse<IVinoBlanco>;
export type EntityArrayResponseType = HttpResponse<IVinoBlanco[]>;

@Injectable({ providedIn: 'root' })
export class VinoBlancoService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/vino-blancos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(vinoBlanco: IVinoBlanco): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vinoBlanco);
    return this.http
      .post<IVinoBlanco>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(vinoBlanco: IVinoBlanco): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vinoBlanco);
    return this.http
      .put<IVinoBlanco>(`${this.resourceUrl}/${getVinoBlancoIdentifier(vinoBlanco) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(vinoBlanco: IVinoBlanco): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(vinoBlanco);
    return this.http
      .patch<IVinoBlanco>(`${this.resourceUrl}/${getVinoBlancoIdentifier(vinoBlanco) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IVinoBlanco>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IVinoBlanco[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addVinoBlancoToCollectionIfMissing(
    vinoBlancoCollection: IVinoBlanco[],
    ...vinoBlancosToCheck: (IVinoBlanco | null | undefined)[]
  ): IVinoBlanco[] {
    const vinoBlancos: IVinoBlanco[] = vinoBlancosToCheck.filter(isPresent);
    if (vinoBlancos.length > 0) {
      const vinoBlancoCollectionIdentifiers = vinoBlancoCollection.map(vinoBlancoItem => getVinoBlancoIdentifier(vinoBlancoItem)!);
      const vinoBlancosToAdd = vinoBlancos.filter(vinoBlancoItem => {
        const vinoBlancoIdentifier = getVinoBlancoIdentifier(vinoBlancoItem);
        if (vinoBlancoIdentifier == null || vinoBlancoCollectionIdentifiers.includes(vinoBlancoIdentifier)) {
          return false;
        }
        vinoBlancoCollectionIdentifiers.push(vinoBlancoIdentifier);
        return true;
      });
      return [...vinoBlancosToAdd, ...vinoBlancoCollection];
    }
    return vinoBlancoCollection;
  }

  protected convertDateFromClient(vinoBlanco: IVinoBlanco): IVinoBlanco {
    return Object.assign({}, vinoBlanco, {
      anoCosecha: vinoBlanco.anoCosecha?.isValid() ? vinoBlanco.anoCosecha.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((vinoBlanco: IVinoBlanco) => {
        vinoBlanco.anoCosecha = vinoBlanco.anoCosecha ? dayjs(vinoBlanco.anoCosecha) : undefined;
      });
    }
    return res;
  }
}
