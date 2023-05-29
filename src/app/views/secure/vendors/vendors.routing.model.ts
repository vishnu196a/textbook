import { Component, NgModule } from '@angular/core';
import { VendorListComponent } from './vendor-list/vendor-list/vendor-list.component';
import { RouterModule, Routes } from '@angular/router';
import { VendorViewComponent } from './vendor-view/vendor-view.component';
import { VendorDeliveryFormComponent } from './vendor-delivery-status-form/vendor-delivery-form/vendor-delivery-form.component';

const routes: Routes = [
  {
    path: 'vendors',
    component: VendorListComponent,
  },

  {
    path: 'vendors/view',
    component: VendorViewComponent,
  },
  {
    path: 'vendors/delivery_status/:material_distribution_id/materials/:poId/status',
    component: VendorDeliveryFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorsRoutingModule {}
