import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Subscription } from 'rxjs';
import { BranchService } from '../branches.service';
import { AddBranch, BranchForm } from '../branches.model';
import { ErrorResponse } from 'src/app/shared/interceptors/error.interceptor';
import { FormStateService } from 'src/app/shared/services/form-state.service';

@Component({
  templateUrl: './branch-edit.component.html',
})
export class EditBranchComponent implements OnInit, OnDestroy {
  editUserForm!: FormGroup;
  isLoading!: boolean;
  hasValidationError!: boolean;
  validationErrors!: string[];
  hasBranch!: boolean;
  initialLoading!: boolean;
  private subscriptions = new Subscription();
  private branchId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toasterService: ToastrService,
    private branchService: BranchService,
    private formState: FormStateService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.branchId = this.route.snapshot.params['id'];
    this.getUserAndInitializeForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  initializeForm(): void {
    this.editUserForm = this.formBuilder.group({
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      address: [null, [Validators.required, Validators.minLength(1)]],
      dl_type: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      district_id: [null, [Validators.required]],
    });
  }

  private getUserAndInitializeForm(): void {
    const observer = this.branchService
      .getBranchDetails(this.branchId)
      .subscribe(
        (branch: AddBranch) => {
          this.editUserForm.patchValue({
            name: branch.name,
            address: branch.address,
            dl_type: branch.dl_type,
            district_id: branch.district_id,
          });
          this.hasBranch = true;
          this.initialLoading = false;
          this.formState.isFormPristine(this.editUserForm);
        },
        (error: ErrorResponse) => {
          this.toasterService.error(error.errors[0]);
          this.hasBranch = false;
          this.initialLoading = false;
        }
      );
    this.subscriptions.add(observer);
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.editUserForm.controls;
  }

  onFormSubmit(): void {
    if (this.editUserForm.valid) {
      this.isLoading = true;
      const branches: BranchForm = {
        name: this.editUserForm.value.name,
        address: this.editUserForm.value.address,
        dl_type: this.editUserForm.value.dl_type,
        district_id: this.editUserForm.value.district_id,
      };

      const observer = this.branchService
        .updateBranch(branches, this.branchId)
        .subscribe(
          () => {
            this.toasterService.success('Branch edited successfully');
            this.router.navigate(['/branches']);
          },
          (error) => {
            this.toasterService.error(error.errors[0]);
            this.isLoading = false;
          }
        );
      this.subscriptions.add(observer);
    }
  }
}
