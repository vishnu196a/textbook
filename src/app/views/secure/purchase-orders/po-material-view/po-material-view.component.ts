import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseOrdersService } from '../purchase-orders.service';
import { ErrorResponse } from 'src/app/shared/interceptors/error.interceptor';
import { ToastrService } from 'ngx-toastr';
import { POMaterialDistribution } from '../purchase-orders.model';

@Component({
  selector: 'app-po-material-view',
  templateUrl: './po-material-view.component.html',
  styleUrls: ['./po-material-view.component.scss'],
})
export class POMaterialViewComponent implements OnInit {
  private poId: number;
  private materialId: number;
  isLoading = false;
  materialDistributionList!: POMaterialDistribution;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private poService: PurchaseOrdersService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    const routeParams = this.activatedRoute.snapshot.params;
    this.poId = +routeParams['po_id'];
    this.materialId = +routeParams['material_id'];
  }

  ngOnInit(): void {
    this.getMaterialDistribution();
  }

  onBackToPOView(): void {
    this.location.back();
  }

  getMaterialDistribution(): void {
    this.isLoading = true;
    const observer = this.poService
      .getMaterialDistributionList(this.poId, this.materialId)
      .subscribe(
        (res: POMaterialDistribution) => {
          this.materialDistributionList = res;
          this.isLoading = false;
        },
        (error: ErrorResponse) => {
          this.toastrService.error(error.errors[0]);
          this.isLoading = false;
        }
      );
  }

  onViewMaterialDistributionDetails(distributionId: number) {
    this.router.navigate([
      'purchase_orders/view/',
      this.poId,
      this.materialId,
      distributionId,
    ]);
  }
}
