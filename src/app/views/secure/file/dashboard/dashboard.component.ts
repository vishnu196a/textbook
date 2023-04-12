import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { ModelComponent } from 'src/app/shared/components/model/model.component';
import { SORTING_OPTIONS } from 'src/app/shared/constants/constants';
import {
  NgSelectSearchEvent,
  OrderType,
  OrderTypes,
  Pagination,
} from 'src/app/shared/models/shared.model';
import {
  File,
  FileListSortColumn,
  FileListSortColumns,
  FileSorting,
  SearchType,
  SEARCH_TYPES,
} from '../file.model';
import { FileService } from '../file.service';
import {
  actionLoadFiles,
  actionOnSearch,
  actionOnSearchChange,
  actionOnSearchTypeChange,
  actionUpdatePage,
  actionUpdateSearchType,
} from '../store/file.action';
import { selectFileState } from '../store/file.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  pagination: Pagination | undefined;
  searchString: string | undefined;
  files: File[] | undefined;
  searchValue: string | undefined;
  orderTypes = OrderTypes;
  currentOrderType: OrderType | undefined = undefined;
  fileListSortColumns = FileListSortColumns;
  sortedColumn: FileListSortColumn | undefined;
  orderClassExpression: any;
  suggestedFiles: File[] = [];
  searchType: SearchType = SEARCH_TYPES.standard;
  readonly searchTypes = SEARCH_TYPES;
  searchFn = (): boolean => true;
  readonly backRoundColors = ['#F9F5FF', '#EFF8FF', '#EEF4FF'];
  readonly textColors = ['#6941C6', '#175CD3', '#3538CD'];
  private subscription: Subscription;
  private searchTimeout: NodeJS.Timeout | undefined;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private fileService: FileService,
    private modalService: BsModalService,
    private toasterService: ToastrService
  ) {
    const subscription = store
      .select(selectFileState)
      .subscribe((fileState) => {
        this.pagination = fileState.pagination;
        this.searchString = fileState.search;
        this.files = fileState.uploads;
        this.sortedColumn = fileState.sort.key;
        this.currentOrderType = fileState.sort.type;
        this.searchType = fileState.searchType;
        this.updateSortingClassExpression();
      });
    this.subscription = subscription;
  }

  ngOnInit(): void {
    this.store.dispatch(actionLoadFiles());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getFileTypeIconClass(file: File): string {
    const fileNameArray = file.name.split('.');
    switch (fileNameArray.pop()?.toLocaleLowerCase()) {
      case 'pdf':
        return 'bi-filetype-pdf text-danger';
      case 'docx':
        return 'bi-file-earmark-word text-info';
      case 'pptx':
        return 'bi-filetype-ppt text-warning';
      default:
        return 'bi-file-earmark text-primary';
    }
  }

  public onSearchSubmit(): void {
    if (this.searchValue) {
      this.store.dispatch(actionOnSearch({ value: this.searchValue }));
    }
  }

  public onSearch(event: NgSelectSearchEvent): void {
    this.searchValue = event.term;
    if (this.searchValue !== undefined) {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(() => {
        if (this.searchValue !== undefined) {
          this.fileService
            .getFileSuggestions(this.searchValue, this.searchType)
            .subscribe({
              next: (searchResult) => {
                this.suggestedFiles = searchResult.uploads;
              },
            });
        }
      }, 1000);
    }
  }

  public onSearchSuggestionChange(event: File): void {
    this.router.navigate(['file', event.id]);
  }

  public onClearSearch(): void {
    this.store.dispatch(actionOnSearch({ value: '' }));
  }

  public onSearchTypeChange(): void {
    if (this.searchString) {
      this.store.dispatch(actionOnSearchTypeChange({ value: this.searchType }));
    } else {
      this.store.dispatch(actionUpdateSearchType({ value: this.searchType }));
    }
  }

  public onSortChange(sortColumnName: FileListSortColumn): void {
    if (this.sortedColumn !== sortColumnName) {
      this.sortedColumn = sortColumnName;
      this.currentOrderType = this.orderTypes.ascending;
      this.updateSortingClassExpression();
    } else {
      const currentIndex = SORTING_OPTIONS.findIndex(
        (item) => item === this.currentOrderType
      );
      const newIndex =
        currentIndex + 1 < SORTING_OPTIONS.length ? currentIndex + 1 : 0;
      this.currentOrderType = SORTING_OPTIONS[newIndex];
      this.updateSortingClassExpression();
    }
    const fileSorting: FileSorting = {
      key: this.sortedColumn,
      type: this.currentOrderType,
    };
    this.store.dispatch(actionOnSearchChange({ payload: fileSorting }));
  }

  private updateSortingClassExpression(): void {
    this.orderClassExpression = {
      'bi-caret-up-fill': this.currentOrderType === this.orderTypes.ascending,
      'bi-caret-down-fill':
        this.currentOrderType === this.orderTypes.descending,
      invisible: this.currentOrderType === undefined,
    };
  }

  public onView(fileId: number): void {
    this.router.navigate(['file', fileId]);
  }

  public onEdit(fileId: number): void {
    this.router.navigate(['update', fileId]);
  }

  public onDelete(file: File): void {
    const initialState: ModalOptions = {
      initialState: {
        fileName: file.name,
      },
    };
    const modal = this.modalService.show(ModelComponent, initialState);
    modal.content?.confirm.subscribe({
      next: () => {
        this.fileService.deleteFile(file.id).subscribe({
          next: () => {
            this.onPageChange(1);
            this.toasterService.success('File has been deleted');
          },
          error: () => {
            this.toasterService.error('Oops! Something went wrong');
          },
        });
      },
    });
  }

  public onPageChange(page: number) {
    this.store.dispatch(actionUpdatePage({ page: page }));
  }
}
