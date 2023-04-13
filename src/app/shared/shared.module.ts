import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, FormModule, ModalModule } from '@coreui/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagComponent } from './components/tag/tag.component';
import { FileSizePipe } from './pipes/file-size.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ModelComponent } from './components/model/model.component';

@NgModule({
  declarations: [
    TagComponent,
    FileSizePipe,
    PaginationComponent,
    ModelComponent,
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    FormModule,
    ButtonModule,
    ModalModule,
  ],
  exports: [
    TagComponent,
    FileSizePipe,
    PaginationComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class SharedModule {}
