import dayjs from 'dayjs/esm';
import { DomOrg } from 'app/entities/enumerations/dom-org.model';
import { UvaTinta } from 'app/entities/enumerations/uva-tinta.model';

export interface IVinoTinto {
  id?: number;
  bodega?: string | null;
  denominacionOrigen?: DomOrg | null;
  anoCosecha?: dayjs.Dayjs | null;
  nombre?: string | null;
  maduracion?: string | null;
  descripcion?: string | null;
  cata?: string | null;
  purezaVino?: number | null;
  precioBruto?: number | null;
  tipoUvaTinta?: UvaTinta | null;
  stock?: number | null;
}

export class VinoTinto implements IVinoTinto {
  constructor(
    public id?: number,
    public bodega?: string | null,
    public denominacionOrigen?: DomOrg | null,
    public anoCosecha?: dayjs.Dayjs | null,
    public nombre?: string | null,
    public maduracion?: string | null,
    public descripcion?: string | null,
    public cata?: string | null,
    public purezaVino?: number | null,
    public precioBruto?: number | null,
    public tipoUvaTinta?: UvaTinta | null,
    public stock?: number | null
  ) {}
}

export function getVinoTintoIdentifier(vinoTinto: IVinoTinto): number | undefined {
  return vinoTinto.id;
}
