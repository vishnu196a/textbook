import { createReducer, on } from '@ngrx/store';
import { actionSetPoPagination } from './po.action';
import { POState } from '../purchase-orders.model';

const initialState: POState = {
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
};

export const poReducer = createReducer(
  initialState,
  on(actionSetPoPagination, (state, props) => ({
    ...state,
    pagination: props.pagination,
  }))
);
