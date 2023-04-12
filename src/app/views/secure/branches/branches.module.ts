import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchesListComponent } from './branches-list/branches-list.component';
import { BranchesRoutingModule } from './branches.routing.module';

@NgModule({
  declarations: [BranchesListComponent],
  imports: [CommonModule, BranchesRoutingModule],
})
export class BranchesModule {}
