import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { VinoTintoComponent } from './list/vino-tinto.component';
import { VinoTintoDetailComponent } from './detail/vino-tinto-detail.component';
import { VinoTintoUpdateComponent } from './update/vino-tinto-update.component';
import { VinoTintoDeleteDialogComponent } from './delete/vino-tinto-delete-dialog.component';
import { VinoTintoRoutingModule } from './route/vino-tinto-routing.module';

@NgModule({
  imports: [SharedModule, VinoTintoRoutingModule],
  declarations: [VinoTintoComponent, VinoTintoDetailComponent, VinoTintoUpdateComponent, VinoTintoDeleteDialogComponent],
  entryComponents: [VinoTintoDeleteDialogComponent],
})
export class VinoTintoModule {}
