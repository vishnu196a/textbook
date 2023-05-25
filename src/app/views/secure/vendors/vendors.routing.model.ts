import { NgModule } from '@angular/core';
import { VendorListComponent } from './vendor-list/vendor-list/vendor-list.component';
import { RouterModule, Routes } from '@angular/router';
import { VendorViewComponent } from './vendor-view/vendor-view.component';

const routes: Routes = [
  {
    path: 'vendors',
    component: VendorListComponent,
  },

  {
    path: 'vendors/view',
    component: VendorViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorsRoutingModule {}
