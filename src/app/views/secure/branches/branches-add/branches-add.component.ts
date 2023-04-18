import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Subscription } from 'rxjs';
import { BranchService } from '../branches.service';
import { BranchForm } from '../branches.model';
import { BranchesList } from '../../users/users.model';
import { ErrorResponse } from 'src/app/shared/interceptors/error.interceptor';

@Component({
  templateUrl: './branches-add.component.html',
})
export class AddBranchComponent implements OnInit, OnDestroy {
  addUserForm!: FormGroup;
  isLoading!: boolean;
  hasValidationError!: boolean;
  validationErrors!: string[];
  branchesList: BranchesList[] = [];
  private subscriptions = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toasterService: ToastrService,
    private branchService: BranchService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getDistrictNames();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  initializeForm(): void {
    this.addUserForm = this.formBuilder.group({
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

  get formControls(): { [key: string]: AbstractControl } {
    return this.addUserForm.controls;
  }

  getDistrictNames(): void {
    this.branchService.getDistrictNames().subscribe(
      (response) => {
        this.branchesList = response;
      },
      (error: ErrorResponse) => {
        this.toasterService.error(error.errors[0]);
      }
    );
  }

  onFormSubmit(): void {
    if (this.addUserForm.valid) {
      this.isLoading = true;
      const branches: BranchForm = {
        name: this.addUserForm.value.name,
        address: this.addUserForm.value.address,
        dl_type: this.addUserForm.value.dl_type,
        district_id: this.addUserForm.value.district_id,
      };

      const observer = this.branchService.addBranch(branches).subscribe(
        () => {
          this.toasterService.success('Branch added successfully');
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
