import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { VinoRosadoComponent } from './list/vino-rosado.component';
import { VinoRosadoDetailComponent } from './detail/vino-rosado-detail.component';
import { VinoRosadoUpdateComponent } from './update/vino-rosado-update.component';
import { VinoRosadoDeleteDialogComponent } from './delete/vino-rosado-delete-dialog.component';
import { VinoRosadoRoutingModule } from './route/vino-rosado-routing.module';

@NgModule({
  imports: [SharedModule, VinoRosadoRoutingModule],
  declarations: [VinoRosadoComponent, VinoRosadoDetailComponent, VinoRosadoUpdateComponent, VinoRosadoDeleteDialogComponent],
  entryComponents: [VinoRosadoDeleteDialogComponent],
})
export class VinoRosadoModule {}
