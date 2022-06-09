import dayjs from 'dayjs/esm';
import { DomOrg } from 'app/entities/enumerations/dom-org.model';
import { UvaTinta } from 'app/entities/enumerations/uva-tinta.model';
import { UvaBlanca } from 'app/entities/enumerations/uva-blanca.model';

export interface IVinoRosado {
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
  tipoUvaBlanca?: UvaBlanca | null;
  stock?: number | null;
}

export class VinoRosado implements IVinoRosado {
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
    public tipoUvaBlanca?: UvaBlanca | null,
    public stock?: number | null
  ) {}
}

export function getVinoRosadoIdentifier(vinoRosado: IVinoRosado): number | undefined {
  return vinoRosado.id;
}
