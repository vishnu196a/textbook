import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, FormModule, ModalModule } from '@coreui/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagComponent } from './components/tag/tag.component';
import { FileSizePipe } from './pipes/file-size.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ModelComponent } from './components/model/model.component';
import { LoadingButtonComponent } from './components/loading-button/loading-button.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    TagComponent,
    FileSizePipe,
    PaginationComponent,
    ModelComponent,
    LoadingButtonComponent,
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
    LoadingButtonComponent,
    MatButtonModule,
    MatDatepickerModule,    
    MatIconModule,
    MatInputModule,
    MatNativeDateModule
  ],
})
export class SharedModule {}
