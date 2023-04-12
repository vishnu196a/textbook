import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map, withLatestFrom } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { FileService } from '../file.service';
import {
  actionLoadFiles,
  actionOnSearch,
  actionOnSearchChange,
  actionOnSearchTypeChange,
  actionSetFiles,
  actionSetFileState,
  actionUpdatePage,
} from './file.action';
import { selectFileState } from './file.selector';

@Injectable()
export class FileEffects {
  loadFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionLoadFiles),
      withLatestFrom(this.store$.select(selectFileState)),
      exhaustMap((data) =>
        this.fileService
          .getAllFiles(data[1])
          .pipe(
            map((fileResponse) => actionSetFiles({ payload: fileResponse }))
          )
      )
    )
  );

  onPageChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionUpdatePage),
      withLatestFrom(this.store$.select(selectFileState)),
      exhaustMap((data) =>
        this.fileService
          .getAllFiles({
            ...data[1],
            pagination: { ...data[1].pagination, current_page: data[0].page },
          })
          .pipe(
            map((fileResponse) => actionSetFiles({ payload: fileResponse }))
          )
      )
    )
  );

  onSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionOnSearch),
      withLatestFrom(this.store$.select(selectFileState)),
      exhaustMap((data) =>
        this.fileService
          .getAllFiles({
            ...data[1],
            pagination: { ...data[1].pagination, current_page: 1 },
            search: data[0].value,
          })
          .pipe(
            map((fileResponse) =>
              actionSetFileState({
                payload: { ...data[1], ...fileResponse, search: data[0].value },
              })
            )
          )
      )
    )
  );

  onSorting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionOnSearchChange),
      withLatestFrom(this.store$.select(selectFileState)),
      exhaustMap((data) =>
        this.fileService
          .getAllFiles({
            ...data[1],
            pagination: { ...data[1].pagination, current_page: 1 },
            sort: { ...data[1].sort, ...data[0].payload },
          })
          .pipe(
            map((fileResponse) =>
              actionSetFileState({
                payload: {
                  ...data[1],
                  ...fileResponse,
                  sort: { ...data[1].sort, ...data[0].payload },
                },
              })
            )
          )
      )
    )
  );

  onSearchTypeChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionOnSearchTypeChange),
      withLatestFrom(this.store$.select(selectFileState)),
      exhaustMap((data) =>
        this.fileService
          .getAllFiles({
            ...data[1],
            pagination: { ...data[1].pagination, current_page: 1 },
            searchType: data[0].value,
          })
          .pipe(
            map((fileResponse) =>
              actionSetFileState({
                payload: {
                  ...data[1],
                  ...fileResponse,
                  searchType: data[0].value,
                },
              })
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private fileService: FileService,
    private store$: Store<AppState>
  ) {}
}
