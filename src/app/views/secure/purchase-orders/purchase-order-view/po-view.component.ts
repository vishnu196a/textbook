import { Component, OnInit } from '@angular/core';
import { PurchaseOrdersService } from '../purchase-orders.service';
import { Material, PurchaseOrder } from '../purchase-orders.model';
import { ActivatedRoute, Router } from '@angular/router';
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
  isLoading = false;
  constructor(
    private poService: PurchaseOrdersService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.poId = +this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getPODetails();
  }

  getPODetails(): void {
    this.isLoading = true;
    this.poService.getPODetials(this.poId).subscribe(
      (res: PurchaseOrder) => {
        this.isLoading = false;
        this.purchaseOrder = res;
        this.materialList = res.Material;
      },
      (error: ErrorResponse) => {
        this.isLoading = false;
        this.toastrService.error(error.errors[0]);
      }
    );
  }

  onBack(): void {
    this.router.navigate(['purchase_orders']);
  }

  onViewMaterialDistribution(poId: number, materialId: number): void {
    this.router.navigate(['purchase_orders/view', poId, materialId]);
  }
}
