import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from 'src/app/app.reducer';
import { Pagination } from 'src/app/shared/models/shared.model';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/shared/interceptors/error.interceptor';
import { VendorService } from '../../vendors.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { selecVendorState } from '../../store/vendor-selector';
import { GetVendorResponse, Vendors } from '../../vendors.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { actionSetVendorListSearchTerm, actionSetVendorPagination, actionSetVendorStatus } from '../../store/vendor-action';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent implements OnInit, OnDestroy  {
  searchKeyWord = '';
  isLoading = false;
  serialNo!: number;
  pagination!: Pagination;
  selectedVendorStatus!: string;
  vendors: Vendors[] | undefined;
  subscriptions = new Subscription();
  onSearchKeyWordChange = new Subject<string>();

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private vendorService: VendorService,
    private toasterService: ToastrService,
    private modalService: BsModalService
  ) {
    const observer = this.store.select(selecVendorState).subscribe((res) => {
      this.pagination = res.pagination;
      this.searchKeyWord = res.searchTerm;
    });
    this.subscriptions.add(observer);
    this.onSearchKeyWordChange
    .pipe(debounceTime(1000), distinctUntilChanged())
    .subscribe((searchValue) => {
      this.store.dispatch(
        actionSetVendorListSearchTerm({ searchTerm: searchValue })
      );
      this.loadvendors(1, searchValue, this.selectedVendorStatus);
    });
  }

  ngOnInit(): void {
    this.loadvendors(this.pagination.current_page, this.searchKeyWord,)
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  onView() {
    this.router.navigateByUrl('vendors/view')
  }

  
  loadvendors(page: number, searchTerm?: string, vendorStatus?: string): void {
    this.isLoading = true;
    const observer = this.vendorService.getVendors(page, searchTerm, vendorStatus).subscribe(
      (response: GetVendorResponse) => {
        this.isLoading = false;
        this.vendors = response.vendors;
        this.store.dispatch(
          actionSetVendorPagination({ pagination: response.pagination })
        );
        this.serialNo = this.pagination.start_at;
      },
      (error: ErrorResponse) => {
        this.isLoading = false;
        if (error.errors[0]) { 
          this.toasterService.error(error.errors[0]);
        }
      }
    );
    this.subscriptions.add(observer);
  }

  onPageChange(page: number): void {
    this.loadvendors(page, this.searchKeyWord, this.selectedVendorStatus);
  }

  onFilterPOStatus() {
    this.store.dispatch(actionSetVendorStatus({ vendorStatus: this.selectedVendorStatus }));
    this.loadvendors(1, this.searchKeyWord, this.selectedVendorStatus);
  }
}
