import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchesListComponent } from './branches-list/branches-list.component';
import { AddBranchComponent } from './branches-add/branches-add.component';

const routes: Routes = [
  {
    path: 'branches',
    component: BranchesListComponent,
  },
  {
    path: 'add',
    component: AddBranchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchesRoutingModule {}
