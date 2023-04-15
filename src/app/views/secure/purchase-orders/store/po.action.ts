import { createAction, props } from '@ngrx/store';
import { Pagination } from 'src/app/shared/models/shared.model';

export const actionSetPoPagination = createAction(
  '[PO] Purchase Orders State',
  props<{ pagination: Pagination }>()
);
