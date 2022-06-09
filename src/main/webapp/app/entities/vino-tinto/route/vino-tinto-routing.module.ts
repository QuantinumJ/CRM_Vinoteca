import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { VinoTintoComponent } from '../list/vino-tinto.component';
import { VinoTintoDetailComponent } from '../detail/vino-tinto-detail.component';
import { VinoTintoUpdateComponent } from '../update/vino-tinto-update.component';
import { VinoTintoRoutingResolveService } from './vino-tinto-routing-resolve.service';

const vinoTintoRoute: Routes = [
  {
    path: '',
    component: VinoTintoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: VinoTintoDetailComponent,
    resolve: {
      vinoTinto: VinoTintoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: VinoTintoUpdateComponent,
    resolve: {
      vinoTinto: VinoTintoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: VinoTintoUpdateComponent,
    resolve: {
      vinoTinto: VinoTintoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(vinoTintoRoute)],
  exports: [RouterModule],
})
export class VinoTintoRoutingModule {}
