import dayjs from 'dayjs/esm';
import { IVenta } from 'app/entities/venta/venta.model';

export interface ICaja {
  id?: number;
  fechaDia?: dayjs.Dayjs | null;
  totalDia?: number | null;
  valorInicial?: number | null;
  venta?: IVenta | null;
}

export class Caja implements ICaja {
  constructor(
    public id?: number,
    public fechaDia?: dayjs.Dayjs | null,
    public totalDia?: number | null,
    public valorInicial?: number | null,
    public venta?: IVenta | null
  ) {}
}

export function getCajaIdentifier(caja: ICaja): number | undefined {
  return caja.id;
}
