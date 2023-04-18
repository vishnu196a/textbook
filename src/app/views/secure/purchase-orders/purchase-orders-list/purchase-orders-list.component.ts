import { Component, OnInit } from '@angular/core';
import { PurchaseOrdersService } from '../purchase-orders.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/shared/interceptors/error.interceptor';
import { PurchaseOrder } from '../purchase-orders.model';
import { Pagination } from 'src/app/shared/models/shared.model';
import { Store } from '@ngrx/store';
import { selectPOState } from '../store/po.selector';
import { AppState } from 'src/app/app.reducer';
import {
  actionSetPoListSearchTerm,
  actionSetPoPagination,
  actionSetPoStatus,
} from '../store/po.action';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-purchase-orders-list',
  templateUrl: './purchase-orders-list.component.html',
  styleUrls: ['./purchase-orders-list.component.scss'],
})
export class PurchaseOrdersListComponent implements OnInit {
  poList: PurchaseOrder[] = [];
  pagination!: Pagination;
  isLoading: boolean = false;
  searchKeyWord: string = '';
  selectedPOStatus!: string;
  onSearchKeyWordChange = new Subject<string>();
  serialNo!: number;
  constructor(
    private poService: PurchaseOrdersService,
    private toastrService: ToastrService,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.store.select(selectPOState).subscribe((res) => {
      this.pagination = res.pagination;
      this.searchKeyWord = res.searchTerm;
      this.selectedPOStatus = res.poStatus;
    });

    this.onSearchKeyWordChange 
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((searchValue) => {
        this.store.dispatch(actionSetPoListSearchTerm({ searchTerm: searchValue }));
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

  getAllPO(page: number, searchTerm?: string, poStatus?: string): void {
    this.isLoading = true;
    this.poService.getAllPO(page, searchTerm, poStatus).subscribe(
      (res) => {
        this.isLoading = false;
        this.poList = res.purchase_orders;
        this.store.dispatch(
          actionSetPoPagination({ pagination: res.pagination })
        );
        this.serialNo = this.pagination.start_at;
      },
      (error: ErrorResponse) => {
        this.isLoading = false;
        this.toastrService.error(error.errors[0]);
      }
    );
  }

  onPageChange(page: number): void {
    this.getAllPO(page, this.searchKeyWord, this.selectedPOStatus);
  }

  onView(id: number) {
    this.router.navigateByUrl(`purchase_order/view/${id}`);
  }

  onFilterPOStatus() {
    this.store.dispatch(actionSetPoStatus({ poStatus: this.selectedPOStatus }));
    this.getAllPO(1, this.searchKeyWord, this.selectedPOStatus);
  }
}
