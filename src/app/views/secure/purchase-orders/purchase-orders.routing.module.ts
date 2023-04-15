import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseOrdersListComponent } from './purchase-orders-list/purchase-orders-list.component';
import { POViewComponent } from './purchase-order-view/po-view.component';

const routes: Routes = [
  {
    path: 'purchase_orders',
    component: PurchaseOrdersListComponent,
  },
  {
    path: 'purchase_order/view/:id',
    component:POViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseOrdersRoutingModule {}
