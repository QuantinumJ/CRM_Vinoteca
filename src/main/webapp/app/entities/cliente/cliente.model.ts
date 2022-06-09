import dayjs from 'dayjs/esm';
import { IEmpresa } from 'app/entities/empresa/empresa.model';

export interface ICliente {
  id?: number;
  nombre?: string;
  apellido?: string;
  dni?: string;
  fechaAlta?: dayjs.Dayjs | null;
  telefono?: string | null;
  email?: string | null;
  direccion?: string;
  fidelizado?: boolean | null;
  empresa?: IEmpresa | null;
}

export class Cliente implements ICliente {
  constructor(
    public id?: number,
    public nombre?: string,
    public apellido?: string,
    public dni?: string,
    public fechaAlta?: dayjs.Dayjs | null,
    public telefono?: string | null,
    public email?: string | null,
    public direccion?: string,
    public fidelizado?: boolean | null,
    public empresa?: IEmpresa | null
  ) {
    this.fidelizado = this.fidelizado ?? false;
  }
}

export function getClienteIdentifier(cliente: ICliente): number | undefined {
  return cliente.id;
}
