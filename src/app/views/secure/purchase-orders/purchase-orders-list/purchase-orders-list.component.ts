import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from 'src/app/app.reducer';
import { Pagination } from 'src/app/shared/models/shared.model';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared/services/shared.service';
import { selectPOState } from '../store/po.selector';
import { ErrorResponse } from 'src/app/shared/interceptors/error.interceptor';
import { PurchaseOrdersService } from '../purchase-orders.service';

import { Subject, Subscription } from 'rxjs';
import { DownloadPO, PurchaseOrder } from '../purchase-orders.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import {
  actionSetPoStatus,
  actionSetPoPagination,
  actionSetPoListSearchTerm,
} from '../store/po.action';
@Component({
  selector: 'app-purchase-orders-list',
  templateUrl: './purchase-orders-list.component.html',
  styleUrls: ['./purchase-orders-list.component.scss'],
})
export class PurchaseOrdersListComponent implements OnInit, OnDestroy {
  poList: PurchaseOrder[] = [];
  pagination!: Pagination;
  isLoading = false;
  searchKeyWord = '';
  selectedPOStatus!: string;
  onSearchKeyWordChange = new Subject<string>();
  serialNo!: number;
  isPODownloading = false;
  userRole: string = ''
  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private toastrService: ToastrService,
    private sharedService: SharedService,
    private poService: PurchaseOrdersService,
  ) {
    const observer = this.store.select(selectPOState).subscribe((response) => {
      this.pagination = response.pagination;
      this.searchKeyWord = response.searchTerm;
      this.selectedPOStatus = response.poStatus;
      this.userRole = this.sharedService.getUserRole()
    });
    this.subscriptions.add(observer);

    this.onSearchKeyWordChange
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((searchValue) => {
        this.store.dispatch(
          actionSetPoListSearchTerm({ searchTerm: searchValue })
        );
        this.getAllPO(1, searchValue, this.selectedPOStatus);
      });
  }

  ngOnInit(): void {
    this.getAllPO(
      this.pagination.current_page,
      this.searchKeyWord,
      this.selectedPOStatus
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getAllPO(page: number, searchTerm?: string, poStatus?: string): void {
    this.isLoading = true;
    const observer = this.poService
      .getAllPO(page, searchTerm, poStatus)
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.poList = response.purchase_orders;
          this.store.dispatch(
            actionSetPoPagination({ pagination: response.pagination })
          );
          this.serialNo = this.pagination.start_at;
        },
        (error: ErrorResponse) => {
          this.isLoading = false;
          this.toastrService.error(error.errors[0]);
        }
      );
    this.subscriptions.add(observer);
  }

  onPageChange(page: number): void {
    this.getAllPO(page, this.searchKeyWord, this.selectedPOStatus);
  }

  onView(id: number) {
    this.router.navigateByUrl(`purchase_orders/view/${id}`);
  }

  onFilterPOStatus() {
    this.store.dispatch(actionSetPoStatus({ poStatus: this.selectedPOStatus }));
    this.getAllPO(1, this.searchKeyWord, this.selectedPOStatus);
  }

  onDownloadPoDetails(): void {
    this.isPODownloading = true;
    const observer = this.poService.downloadPoDetails().subscribe(
      (response: DownloadPO) => {
        const link = document.createElement('a');
        link.href = response.url;
        link.click();
        window.URL.revokeObjectURL(link.href);
        link.remove();
        this.isPODownloading = false;
      },
      (error: ErrorResponse) => {
        this.toastrService.error(error.errors[0]);
        this.isPODownloading = false;
      }
    );
    this.subscriptions.add(observer);
  }
}
