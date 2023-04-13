import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
// import { REGEX_PATTERNS, USER_ROLES } from '@shared/constants/constants';
// import { ErrorResponse, NamesAndIds } from '@shared/models/shared.model';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { NamesAndIds } from 'src/app/shared/models/shared.model';
import { UserService } from '../users.service';
import { UserForm } from '../users.model';
import { REGEX_PATTERNS } from 'src/app/shared/constants/constants';

// import { UserForm } from '../user.model';
// import { UserService } from '../user.service';

@Component({
  templateUrl: './users-add.component.html',
})
export class AddUserComponent implements OnInit, OnDestroy {
  addUserForm!: FormGroup;
  isLoading!: boolean;
  hasValidationError!: boolean;
  validationErrors!: string[];
  organizationList: NamesAndIds[] = [];
  //   readonly roles = USER_ROLES;
  private subscriptions = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toasterService: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getOrganizationNamesAndIds();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  initializeForm(): void {
    this.addUserForm = this.formBuilder.group({
      firstName: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      lastName: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      email: [
        null,
        [Validators.required, Validators.pattern(REGEX_PATTERNS.email)],
      ],
      vendor: [null, [Validators.required]],
    });
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.addUserForm.controls;
  }
  getOrganizationNamesAndIds(): void {
    const observer = this.userService.getOrganizationNamesAndIds().subscribe(
      (orgList: NamesAndIds[]) => {
        this.organizationList = orgList;
      }
      //   (error: ErrorResponse) => {
      //     if (error.hasValidationError) {
      //       this.hasValidationError = true;
      //       this.validationErrors = error.errorList;
      //       window.scrollTo({ top: 0 });
      //     } else {
      //       this.hasValidationError = false;
      //       this.toasterService.error(error.message);
      //     }
      //     this.isLoading = false;
      //   }
    );
    this.subscriptions.add(observer);
  }

  onFormSubmit(): void {
    if (this.addUserForm.valid) {
      this.isLoading = true;
      const user: UserForm = {
        first_name: this.addUserForm.value.firstName,
        last_name: this.addUserForm.value.lastName,
        email: this.addUserForm.value.email,
        branch_id: this.addUserForm.value.branch_id,
      };
      const observer = this.userService.addUser(user).subscribe(
        () => {
          this.toasterService.success('branch added successfully');
          this.router.navigate(['branches']);
        }
        // (error: ErrorResponse) => {
        //   if (error.hasValidationError) {
        //     this.hasValidationError = true;
        //     this.validationErrors = error.errorList;
        //     window.scrollTo({ top: 0 });
        //   } else {
        //     this.hasValidationError = false;
        //     this.toasterService.error(error.message);
        //   }
        //   this.isLoading = false;
        // }
      );
      this.subscriptions.add(observer);
    }
  }
}
