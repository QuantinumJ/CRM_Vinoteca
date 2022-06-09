import dayjs from 'dayjs/esm';
import { DomOrg } from 'app/entities/enumerations/dom-org.model';
import { UvaBlanca } from 'app/entities/enumerations/uva-blanca.model';

export interface IVinoBlanco {
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
  tipoUvaBlanca?: UvaBlanca | null;
  stock?: number | null;
}

export class VinoBlanco implements IVinoBlanco {
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
    public tipoUvaBlanca?: UvaBlanca | null,
    public stock?: number | null
  ) {}
}

export function getVinoBlancoIdentifier(vinoBlanco: IVinoBlanco): number | undefined {
  return vinoBlanco.id;
}
