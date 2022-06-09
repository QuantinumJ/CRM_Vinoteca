import dayjs from 'dayjs/esm';
import { IFactura } from 'app/entities/factura/factura.model';
import { IEmpleado } from 'app/entities/empleado/empleado.model';
import { IVinoTinto } from 'app/entities/vino-tinto/vino-tinto.model';
import { IVinoRosado } from 'app/entities/vino-rosado/vino-rosado.model';
import { IVinoBlanco } from 'app/entities/vino-blanco/vino-blanco.model';
import { FormaPago } from 'app/entities/enumerations/forma-pago.model';

export interface IVenta {
  id?: number;
  fechaHora?: dayjs.Dayjs | null;
  cantidad?: number | null;
  totalNeto?: number | null;
  totalPagar?: number | null;
  tipoDePago?: FormaPago | null;
  factura?: IFactura | null;
  empleado?: IEmpleado | null;
  vinoTinto?: IVinoTinto | null;
  vinoRosado?: IVinoRosado | null;
  vinoBlanco?: IVinoBlanco | null;
}

export class Venta implements IVenta {
  constructor(
    public id?: number,
    public fechaHora?: dayjs.Dayjs | null,
    public cantidad?: number | null,
    public totalNeto?: number | null,
    public totalPagar?: number | null,
    public tipoDePago?: FormaPago | null,
    public factura?: IFactura | null,
    public empleado?: IEmpleado | null,
    public vinoTinto?: IVinoTinto | null,
    public vinoRosado?: IVinoRosado | null,
    public vinoBlanco?: IVinoBlanco | null
  ) {}
}

export function getVentaIdentifier(venta: IVenta): number | undefined {
  return venta.id;
}
