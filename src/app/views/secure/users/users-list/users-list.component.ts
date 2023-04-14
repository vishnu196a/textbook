import { Component, OnInit } from '@angular/core';
import { Users } from '../users.model';
import { Router } from '@angular/router';
import { UserService } from '../users.service';
import { Pagination } from 'src/app/shared/models/shared.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { actionSetPagination } from '../store/users.action';
import { selectFileState } from '../../file/store/file.selector';
import { Subscription } from 'rxjs';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModelComponent } from 'src/app/shared/components/model/model.component';
import { ToastrService } from 'ngx-toastr';
import { selectUserState } from '../store/users.selector';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  pagination!: Pagination;
  users: Users[] | undefined;
  private subscription: Subscription;

  constructor(
    private router: Router,
    private userService: UserService,
    private store: Store<AppState>,
    private modalService: BsModalService,
    private toasterService: ToastrService
  ) {
    const subscription = store
      .select(selectFileState)
      .subscribe((fileState) => {
        this.pagination = fileState.pagination;
      });
    this.subscription = subscription;
    this.store.select(selectUserState).subscribe((res) => {
      this.pagination = res.pagination;
    });
  }

  ngOnInit(): void {
    this.getAllUsers(this.pagination.current_page);
  }

  getAllUsers(page: number) {
    this.userService.getAllUsers(page).subscribe((res) => {
      this.users = res.users;
      this.store.dispatch(actionSetPagination({ pagination: res.pagination }));
    });
  }

  public onEdit(id: number): void {
    this.router.navigate(['user_edit', id]);
  }

  public onPageChange(page: number) {
    this.getAllUsers(page);
  }

  public onDelete(user: Users): void {
    const initialState: ModalOptions = {
      initialState: {
        text: `Do you really want to remove user ${user.first_name} ${
          user.last_name ? user.last_name : ''
        }`,
      },
    };
    const modal = this.modalService.show(ModelComponent, initialState);
    modal.content?.confirm.subscribe({
      next: () => {
        this.userService.deleteUser(user.id).subscribe({
          next: () => {
            this.onPageChange(1);
            this.toasterService.success('User has been deleted');
          },
          error: () => {
            this.toasterService.error('Oops! Something went wrong');
          },
        });
      },
    });
  }

  onAddUser(): void {
    this.router.navigate(['users/add']);
  }
}
