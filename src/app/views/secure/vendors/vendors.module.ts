import { NgModule } from '@angular/core';
import { IconModule } from '@coreui/icons-angular';
import { ButtonModule } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { VendorService } from './vendors.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { VendorListComponent } from './vendor-list/vendor-list/vendor-list.component';
import { VendorsRoutingModule } from './vendors.routing.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorViewComponent } from './vendor-view/vendor-view.component';

@NgModule({
  declarations: [
   VendorListComponent,
   VendorViewComponent
  ],
  providers: [VendorService],
  imports: [
    CommonModule,
    VendorsRoutingModule,
    IconModule,
    SharedModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
})
export class VendorModule {}
