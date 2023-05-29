import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { AuthGuard } from './shared/guards/auth.guard';
import { ROLE } from './shared/constants/constants';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'purchase_orders',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./views/public/authentication/authentication.module').then(
        (module) => module.AuthenticationModule
      ),
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/secure/purchase-orders/purchase-orders.module').then(
            (module) => module.PurchaseOrdersModule
          ),
        canActivate: [AuthGuard],
        data: {roles:[ROLE.Admin, ROLE.Vendor]}
      },
      {
        path: '',
        loadChildren: () =>
          import('./views/secure/users/users.module').then(
            (module) => module.UsersModule
          ),
        canActivate: [AuthGuard],
        data: {roles:[ROLE.Admin]}
      },
      {
        path: '',
        loadChildren: () =>
          import('./views/secure/branches/branches.module').then(
            (module) => module.BranchesModule
          ),
        canActivate: [AuthGuard],
        data: {roles:[ROLE.Admin]}
      },
      {
        path: '',
        loadChildren: () =>
          import('./views/secure/vendors/vendors.module').then(
            (module) => module.VendorModule
          ),
        canActivate: [AuthGuard],
        data: {roles:[ROLE.Admin, ROLE.Vendor]}
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      // relativeLinkResolution: 'legacy'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
