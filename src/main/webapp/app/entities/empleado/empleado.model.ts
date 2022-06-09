import dayjs from 'dayjs/esm';
import { IEmpresa } from 'app/entities/empresa/empresa.model';

export interface IEmpleado {
  id?: number;
  nombre?: string;
  apellido?: string;
  dni?: string;
  fechaAlta?: dayjs.Dayjs;
  telefono?: string;
  email?: string | null;
  direccion?: string;
  activo?: boolean | null;
  empresa?: IEmpresa | null;
}

export class Empleado implements IEmpleado {
  constructor(
    public id?: number,
    public nombre?: string,
    public apellido?: string,
    public dni?: string,
    public fechaAlta?: dayjs.Dayjs,
    public telefono?: string,
    public email?: string | null,
    public direccion?: string,
    public activo?: boolean | null,
    public empresa?: IEmpresa | null
  ) {
    this.activo = this.activo ?? false;
  }
}

export function getEmpleadoIdentifier(empleado: IEmpleado): number | undefined {
  return empleado.id;
}
