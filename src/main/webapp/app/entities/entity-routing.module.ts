import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'empresa',
        data: { pageTitle: 'goodSmellApp.empresa.home.title' },
        loadChildren: () => import('./empresa/empresa.module').then(m => m.EmpresaModule),
      },
      {
        path: 'empleado',
        data: { pageTitle: 'goodSmellApp.empleado.home.title' },
        loadChildren: () => import('./empleado/empleado.module').then(m => m.EmpleadoModule),
      },
      {
        path: 'cliente',
        data: { pageTitle: 'goodSmellApp.cliente.home.title' },
        loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule),
      },
      {
        path: 'factura',
        data: { pageTitle: 'goodSmellApp.factura.home.title' },
        loadChildren: () => import('./factura/factura.module').then(m => m.FacturaModule),
      },
      {
        path: 'venta',
        data: { pageTitle: 'goodSmellApp.venta.home.title' },
        loadChildren: () => import('./venta/venta.module').then(m => m.VentaModule),
      },
      {
        path: 'caja',
        data: { pageTitle: 'goodSmellApp.caja.home.title' },
        loadChildren: () => import('./caja/caja.module').then(m => m.CajaModule),
      },
      {
        path: 'vino-rosado',
        data: { pageTitle: 'goodSmellApp.vinoRosado.home.title' },
        loadChildren: () => import('./vino-rosado/vino-rosado.module').then(m => m.VinoRosadoModule),
      },
      {
        path: 'vino-tinto',
        data: { pageTitle: 'goodSmellApp.vinoTinto.home.title' },
        loadChildren: () => import('./vino-tinto/vino-tinto.module').then(m => m.VinoTintoModule),
      },
      {
        path: 'vino-blanco',
        data: { pageTitle: 'goodSmellApp.vinoBlanco.home.title' },
        loadChildren: () => import('./vino-blanco/vino-blanco.module').then(m => m.VinoBlancoModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
