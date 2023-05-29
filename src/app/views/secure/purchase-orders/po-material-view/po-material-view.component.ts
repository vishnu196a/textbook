import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseOrdersService } from '../purchase-orders.service';
import { ErrorResponse } from 'src/app/shared/interceptors/error.interceptor';
import { ToastrService } from 'ngx-toastr';
import { POMaterialDistribution } from '../purchase-orders.model';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-po-material-view',
  templateUrl: './po-material-view.component.html',
  styleUrls: ['./po-material-view.component.scss'],
})
export class POMaterialViewComponent implements OnInit, OnDestroy {
  private poId: number;
  private materialId: number;
  isLoading = false;
  materialDistributionList!: POMaterialDistribution;
  private subscriptions = new Subscription();
  userRole: string = ''

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private poService: PurchaseOrdersService,
    private toastrService: ToastrService,
    private router: Router,
    private sharedService: SharedService
  ) {
    const routeParams = this.activatedRoute.snapshot.params;
    this.poId = +routeParams['po_id'];
    this.materialId = +routeParams['material_id'];

    this.userRole = this.sharedService.getUserRole()
  }

  ngOnInit(): void {
    this.getMaterialDistribution();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onBackToPOView(): void {
    this.location.back();
  }

  getMaterialDistribution(): void {
    this.isLoading = true;
    const observer = this.poService
      .getMaterialDistributionList(this.poId, this.materialId)
      .subscribe(
        (response: POMaterialDistribution) => {
          this.materialDistributionList = response;
          this.isLoading = false;
        },
        (error: ErrorResponse) => {
          this.toastrService.error(error.errors[0]);
          this.isLoading = false;
        }
      );
    this.subscriptions.add(observer);
  }

  onViewMaterialDistributionDetails(distributionId: number) {
    this.router.navigate([
      'purchase_orders/view/',
      this.poId,
      this.materialId,
      distributionId,
    ]);
  }

  onViewMaterialDeliveryStatus(materialId: number, poId: number) {
    this.router.navigateByUrl(`/vendors/delivery_status/${materialId}/materials/${poId}/status`)
  }
}
