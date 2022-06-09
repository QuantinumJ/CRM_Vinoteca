import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { VinoRosadoComponent } from '../list/vino-rosado.component';
import { VinoRosadoDetailComponent } from '../detail/vino-rosado-detail.component';
import { VinoRosadoUpdateComponent } from '../update/vino-rosado-update.component';
import { VinoRosadoRoutingResolveService } from './vino-rosado-routing-resolve.service';

const vinoRosadoRoute: Routes = [
  {
    path: '',
    component: VinoRosadoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: VinoRosadoDetailComponent,
    resolve: {
      vinoRosado: VinoRosadoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: VinoRosadoUpdateComponent,
    resolve: {
      vinoRosado: VinoRosadoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: VinoRosadoUpdateComponent,
    resolve: {
      vinoRosado: VinoRosadoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(vinoRosadoRoute)],
  exports: [RouterModule],
})
export class VinoRosadoRoutingModule {}
