import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { VinoBlancoComponent } from './list/vino-blanco.component';
import { VinoBlancoDetailComponent } from './detail/vino-blanco-detail.component';
import { VinoBlancoUpdateComponent } from './update/vino-blanco-update.component';
import { VinoBlancoDeleteDialogComponent } from './delete/vino-blanco-delete-dialog.component';
import { VinoBlancoRoutingModule } from './route/vino-blanco-routing.module';

@NgModule({
  imports: [SharedModule, VinoBlancoRoutingModule],
  declarations: [VinoBlancoComponent, VinoBlancoDetailComponent, VinoBlancoUpdateComponent, VinoBlancoDeleteDialogComponent],
  entryComponents: [VinoBlancoDeleteDialogComponent],
})
export class VinoBlancoModule {}
