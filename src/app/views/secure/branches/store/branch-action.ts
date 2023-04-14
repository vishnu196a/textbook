import { Action } from '@ngrx/store';
import { Pagination } from 'src/app/shared/models/shared.model';

export enum UserActionTypes {
  SET_PAGINATION = '[USER] pagination',
  SET_CURRENT_PAGE = '[USER] current page',
  SET_PER_PAGE = '[USER] set per page',
}

export class SetUserPagination implements Action {
  readonly type = UserActionTypes.SET_PAGINATION;
  constructor(public payload: Pagination) {}
}

export class SetUserCurrentPage implements Action {
  readonly type = UserActionTypes.SET_CURRENT_PAGE;
  constructor(public payload: number) {}
}

export class UpdateUserPerPage implements Action {
  readonly type = UserActionTypes.SET_PER_PAGE;
  constructor(public payload: number) {}
}
