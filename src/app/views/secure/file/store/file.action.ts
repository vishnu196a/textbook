import { createAction, props } from '@ngrx/store';
import {
  FileSorting,
  FileState,
  GetFilesResponse,
  SearchType,
} from '../file.model';

export const actionLoadFiles = createAction('[File] Load');

export const actionSetFiles = createAction(
  '[File] Set',
  props<{ payload: GetFilesResponse }>()
);

export const actionUpdatePage = createAction(
  '[File] Update Page',
  props<{ page: number }>()
);

export const actionOnSearch = createAction(
  '[File] Searching',
  props<{ value: string }>()
);

export const actionSetFileState = createAction(
  '[File] Update state',
  props<{ payload: FileState }>()
);

export const actionOnSearchChange = createAction(
  '[File] Change sorting',
  props<{ payload: FileSorting }>()
);

export const actionOnSearchTypeChange = createAction(
  '[File] Search change',
  props<{ value: SearchType }>()
);

export const actionUpdateSearchType = createAction(
  '[File] Update search type',
  props<{ value: SearchType }>()
);
