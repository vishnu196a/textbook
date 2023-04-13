import { Component, OnInit } from '@angular/core';
import { Users } from '../users.model';
import { Router } from '@angular/router';
import { UserService } from '../users.service';
import { Pagination } from 'src/app/shared/models/shared.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { actionUpdatePage } from '../store/users.action';
import { selectFileState } from '../../file/store/file.selector';
import { Subscription } from 'rxjs';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModelComponent } from 'src/app/shared/components/model/model.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  pagination: Pagination | undefined;
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
        console.log('file State', fileState);

        this.pagination = fileState.pagination;
      });
    this.subscription = subscription;
  }
  public onView(fileId: any): void {
    this.router.navigate(['file', fileId]);
  }

  ngOnInit(): void {
    this.userService.getAllFiles().subscribe((res) => {
      this.users = res.users;
    });
  }

  public onEdit(id: any): void {
    this.router.navigate(['edit', id]);
  }

  public onPageChange(page: number) {
    this.store.dispatch(actionUpdatePage({ page: page }));
  }

  public onDelete(user: Users): void {
    const initialState: ModalOptions = {
      initialState: {
        fileName: user.first_name,
      },
    };
    const modal = this.modalService.show(ModelComponent, initialState);
    modal.content?.confirm.subscribe({
      next: () => {
        this.userService.deleteUser(user.id).subscribe({
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
}
