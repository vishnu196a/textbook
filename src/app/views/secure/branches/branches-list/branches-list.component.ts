import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-branches-list',
  templateUrl: './branches-list.component.html',
  styleUrls: ['./branches-list.component.scss'],
})
export class BranchesListComponent implements OnInit {
  pagination: Pagination | undefined;
  branches: Branches[] | undefined;
  orderClassExpression: any;
  branchListSortColumns = BranchListSortColumns;
  subscriptions = new Subscription();
  sortedColumn: BranchListSortColumn | undefined;

  constructor(
    private router: Router,
    private branchService: BranchService,
    private toasterService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadBranches();
  }

  loadBranches(): void {
    const observer = this.branchService.getBranch().subscribe(
      (response: GetBranchResponse) => {
        this.pagination = response.pagination;
        this.branches = response.branches;
      },
      (error: ErrorResponse) => {
        this.toasterService.error(error.errors[0]);
      }
    );
    this.subscriptions.add(observer);
  }

  public onEdit(fileId: number): void {
    this.router.navigate(['', fileId]);
  }
}
