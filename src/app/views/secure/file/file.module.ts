import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ProgressModule,
  SpinnerModule,
  ModalModule,
  TooltipModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';
import { FileRoutingModule } from './file-routing.module';
import { UpdateComponent } from './update/update.component';
import { UploadComponent } from './upload/upload.component';
import { TruncatePipe } from 'src/app/shared/pipes/file-name.pipe';

@NgModule({
  declarations: [
    UploadComponent,
    DashboardComponent,
    DetailComponent,
    UpdateComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    FileRoutingModule,
    FormsModule,
    FormModule,
    GridModule,
    ButtonModule,
    CardModule,
    SharedModule,
    IconModule,
    ProgressModule,
    SpinnerModule,
    ModalModule,
    NgSelectModule,
    TooltipModule,
  ],
})
export class FileModule {}
