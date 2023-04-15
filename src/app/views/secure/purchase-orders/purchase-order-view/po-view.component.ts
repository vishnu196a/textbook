import { Component, OnInit } from '@angular/core';
import { PurchaseOrdersService } from '../purchase-orders.service';
import { Material, PurchaseOrder } from '../purchase-orders.model';
import { ActivatedRoute } from '@angular/router';
import { ErrorResponse } from 'src/app/shared/interceptors/error.interceptor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-po-view',
  templateUrl: './po-view.component.html',
  styleUrls: ['./po-view.component.scss'],
})
export class POViewComponent implements OnInit {
    purchaseOrder!: PurchaseOrder;
    materialList: Material[] = [];
  poId!: number;
  constructor(
    private poService: PurchaseOrdersService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) {
    this.poId = +this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.poService.getPODetials(this.poId).subscribe(
      (res: PurchaseOrder) => {
            this.purchaseOrder = res;
            this.materialList = res.Material;
            console.log(this.purchaseOrder)
      },
      (error: ErrorResponse) => {
        this.toastrService.error(error.errors[0]);
      }
      );
      
  }
}
