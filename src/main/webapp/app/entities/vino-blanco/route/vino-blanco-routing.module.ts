import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { VinoBlancoComponent } from '../list/vino-blanco.component';
import { VinoBlancoDetailComponent } from '../detail/vino-blanco-detail.component';
import { VinoBlancoUpdateComponent } from '../update/vino-blanco-update.component';
import { VinoBlancoRoutingResolveService } from './vino-blanco-routing-resolve.service';

const vinoBlancoRoute: Routes = [
  {
    path: '',
    component: VinoBlancoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: VinoBlancoDetailComponent,
    resolve: {
      vinoBlanco: VinoBlancoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: VinoBlancoUpdateComponent,
    resolve: {
      vinoBlanco: VinoBlancoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: VinoBlancoUpdateComponent,
    resolve: {
      vinoBlanco: VinoBlancoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(vinoBlancoRoute)],
  exports: [RouterModule],
})
export class VinoBlancoRoutingModule {}
