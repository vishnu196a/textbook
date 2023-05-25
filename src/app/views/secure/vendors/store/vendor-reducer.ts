import { VendorState } from '../vendors.model';
import { createReducer, on } from '@ngrx/store';
import { actionSetVendorListSearchTerm, actionSetVendorPagination, actionSetVendorStatus } from './vendor-action';


const initialState: VendorState = {
  pagination: {
    end_at: 0,
    start_at: 0,
    per_page: 0,
    next_page: 0,
    prev_page: 0,
    total_count: 1,
    total_pages: 1,
    current_page: 1,
    is_last_page: true,
    is_first_page: true,
  },
  searchTerm: ''
};

export const vendorReducer = createReducer(
  initialState,
  on(actionSetVendorPagination, (state, props) => ({
    ...state,
    pagination: props.pagination,
  })),
  on(actionSetVendorListSearchTerm, (state, props) => ({
    ...state,
    searchTerm: props.searchTerm,
  })),
  on(actionSetVendorStatus, (state, props) => ({
    ...state,
    poStatus: props.vendorStatus,
  }))
);
