import { createReducer, on } from '@ngrx/store';
import { FileState, SEARCH_TYPES } from '../file.model';
import {
  actionSetFiles,
  actionSetFileState,
  actionUpdateSearchType,
} from './file.action';

const initialState: FileState = {
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
  search: '',
  uploads: [],
  sort: {
    key: undefined,
    type: undefined,
  },
  searchType: SEARCH_TYPES.standard,
};

export const fileReducer = createReducer(
  initialState,
  on(actionSetFiles, (state, props) => {
    return { ...state, ...props.payload };
  }),
  on(actionSetFileState, (state, props) => ({ ...state, ...props.payload })),
  on(actionUpdateSearchType, (state, props) => ({
    ...state,
    searchType: props.value,
  }))
);
