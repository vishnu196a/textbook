import { createAction, props } from '@ngrx/store';

export const actionUpdatePage = createAction(
  '[Users] Update Page',
  props<{ page: number }>()
);
