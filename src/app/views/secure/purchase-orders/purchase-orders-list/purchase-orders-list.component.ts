import { Component, OnInit } from '@angular/core';
import { PurchaseOrdersService } from '../purchase-orders.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/shared/interceptors/error.interceptor';
import { PurchaseOrder } from '../purchase-orders.model';
import { Pagination } from 'src/app/shared/models/shared.model';
import { Store } from '@ngrx/store';
import { selectPOState } from '../store/po.selector';
import { AppState } from 'src/app/app.reducer';
import { actionSetPoPagination } from '../store/po.action';

@Component({
  selector: 'app-purchase-orders-list',
  templateUrl: './purchase-orders-list.component.html',
  styleUrls: ['./purchase-orders-list.component.scss'],
})
export class PurchaseOrdersListComponent implements OnInit {
  poList: PurchaseOrder[] = []
  pagination!: Pagination;
  constructor(
    private poService: PurchaseOrdersService,
    private toastrService: ToastrService,
    private store: Store<AppState>
  ) {
    this.store.select(selectPOState).subscribe(
      (res) => {
        this.pagination = res.pagination;  
      }
    )

  }

  ngOnInit(): void {
    this.getAllPO(this.pagination.current_page);
  }
  
  getAllPO(page:number): void {
    this.poService.getAllPO(page).subscribe(
      (res) => {
        console.log(res);
        this.poList = res.purchase_orders
        this.store.dispatch(actionSetPoPagination({pagination: res.pagination}))
      },
      (error: ErrorResponse) => {
        this.toastrService.error(error.errors[0]);
      }
    );
  }

  onPageChange(page: number): void {
    this.getAllPO(page);
  }
}
