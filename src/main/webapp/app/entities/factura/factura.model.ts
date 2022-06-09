import dayjs from 'dayjs/esm';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { IEmpresa } from 'app/entities/empresa/empresa.model';

export interface IFactura {
  id?: number;
  numero?: string | null;
  fecha?: dayjs.Dayjs | null;
  cliente?: ICliente | null;
  empresa?: IEmpresa | null;
}

export class Factura implements IFactura {
  constructor(
    public id?: number,
    public numero?: string | null,
    public fecha?: dayjs.Dayjs | null,
    public cliente?: ICliente | null,
    public empresa?: IEmpresa | null
  ) {}
}

export function getFacturaIdentifier(factura: IFactura): number | undefined {
  return factura.id;
}
