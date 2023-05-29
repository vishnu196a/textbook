import { NgModule } from '@angular/core';
import { IconModule } from '@coreui/icons-angular';
import { ButtonModule } from '@coreui/angular';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { VendorService } from './vendors.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { VendorListComponent } from './vendor-list/vendor-list/vendor-list.component';
import { VendorsRoutingModule } from './vendors.routing.model';
import { FormsModule } from '@angular/forms';
import { VendorViewComponent } from './vendor-view/vendor-view.component';
import { VendorDeliveryFormComponent } from './vendor-delivery-status-form/vendor-delivery-form/vendor-delivery-form.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
   VendorListComponent,
    VendorViewComponent,
    VendorDeliveryFormComponent
   
  ],
  providers: [VendorService],
  imports: [
    CommonModule,
    VendorsRoutingModule,
    IconModule,
    SharedModule,
    ButtonModule,
    FormsModule,
    NgSelectModule,
    BsDatepickerModule
  ],
})
export class VendorModule {}
