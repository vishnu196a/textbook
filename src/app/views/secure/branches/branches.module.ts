import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchesListComponent } from './branches-list/branches-list.component';
import { BranchesRoutingModule } from './branches.routing.module';
import { BranchService } from './branches.service';
import { IconModule } from '@coreui/icons-angular';
import { ButtonModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBranchComponent } from './branches-add/branches-add.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [BranchesListComponent, AddBranchComponent],
  providers: [BranchService],
  imports: [
    CommonModule,
    BranchesRoutingModule,
    IconModule,
    SharedModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class BranchesModule {}
