import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  BranchListSortColumn,
  BranchListSortColumns,
  Branches,
  GetBranchResponse,
} from '../branches.model';
import { BranchService } from '../branches.service';
import { Pagination } from 'src/app/shared/models/shared.model';
import { ErrorResponse } from 'src/app/shared/interceptors/error.interceptor';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModelComponent } from 'src/app/shared/components/model/model.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { selectFileState } from '../../file/store/file.selector';
import { selectBranchState } from '../store/branch-selector';
import { actionSetBranchesPagination } from '../store/branch-action';

@Component({
  selector: 'app-branches-list',
  templateUrl: './branches-list.component.html',
  styleUrls: ['./branches-list.component.scss'],
})
export class BranchesListComponent implements OnInit, OnDestroy {
  pagination!: Pagination;
  branches: Branches[] | undefined;
  branchListSortColumns = BranchListSortColumns;
  subscriptions = new Subscription();
  sortedColumn: BranchListSortColumn | undefined;
  private subscription: Subscription;
  isLoading = false;
  serialNo!: number;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private branchService: BranchService,
    private toasterService: ToastrService,
    private modalService: BsModalService
  ) {
    const subscription = store
      .select(selectFileState)
      .subscribe((fileState) => {
        this.pagination = fileState.pagination;
      });
    this.subscription = subscription;
    this.store.select(selectBranchState).subscribe((res) => {
      this.pagination = res.pagination;
    });
  }

  ngOnInit(): void {
    this.loadBranches(this.pagination.current_page);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadBranches(page: number): void {
    this.isLoading = true;
    const observer = this.branchService.getBranch(page).subscribe(
      (response: GetBranchResponse) => {
        this.isLoading = false;
        this.branches = response.branches;
        this.store.dispatch(
          actionSetBranchesPagination({ pagination: response.pagination })
        );
        this.serialNo = this.pagination.start_at;
      },
      (error: ErrorResponse) => {
        this.isLoading = false;
        this.toasterService.error(error.errors[0]);
      }
    );
    this.subscriptions.add(observer);
  }

  public onEdit(branchId: number): void {
    this.router.navigate(['/branch/edit', branchId]);
  }

  public onDelete(branch: Branches): void {
    const initialState: ModalOptions = {
      initialState: {
        text: `Do you really want to remove branch ${branch.name}`,
      },
    };
    const modal = this.modalService.show(ModelComponent, initialState);
    modal.content?.confirm.subscribe({
      next: () => {
        this.branchService.deleteUser(branch.id).subscribe({
          next: () => {
            this.onPageChange(1);
            this.toasterService.success('Branch has been deleted');
          },
          error: () => {
            this.toasterService.error('Oops! Something went wrong');
          },
        });
      },
    });
  }

  public onPageChange(page: number) {
    // this.store.dispatch(actionUpdatePage({ page: page }));
    this.loadBranches(page);
  }
}
