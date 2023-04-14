import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchesListComponent } from './branches-list/branches-list.component';
import { BranchesRoutingModule } from './branches.routing.module';
import { BranchService } from './branches.service';
import { IconModule } from '@coreui/icons-angular';
import { SharedModule } from '../../../shared/shared.module';
import { ButtonModule } from '@coreui/angular';

@NgModule({
  declarations: [BranchesListComponent],
  providers: [BranchService],
  imports: [
    CommonModule,
    BranchesRoutingModule,
    IconModule,
    SharedModule,
    ButtonModule,
  ],
})
export class BranchesModule {}
