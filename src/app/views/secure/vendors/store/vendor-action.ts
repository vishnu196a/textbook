import { Pagination } from 'src/app/shared/models/shared.model';
import { createAction, props } from '@ngrx/store';

export const actionSetVendorPagination = createAction(
  '[Vendors] Update Page',
  props<{ pagination: Pagination }>()
);

export const actionSetVendorListSearchTerm = createAction(
  '[Vendors] Set Vendor List SearchTerm',
  props<{searchTerm: string}>()
)

export const actionSetVendorStatus = createAction(
  '[Vendors] Set Vendor List Search Status',
  props<{vendorStatus: string}>()
)