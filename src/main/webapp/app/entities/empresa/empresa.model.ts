export interface IEmpresa {
  id?: number;
  nombreSocial?: string;
  cif?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
}

export class Empresa implements IEmpresa {
  constructor(
    public id?: number,
    public nombreSocial?: string,
    public cif?: string,
    public telefono?: string,
    public email?: string,
    public direccion?: string
  ) {}
}

export function getEmpresaIdentifier(empresa: IEmpresa): number | undefined {
  return empresa.id;
}
