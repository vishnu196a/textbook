import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { POMaterialDistribution } from '../../../purchase-orders/purchase-orders.model';
import { PurchaseOrdersService } from '../../../purchase-orders/purchase-orders.service';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { selectUserDetails } from 'src/app/views/public/authentication/store/authentication.selector';
import { UserDetails } from 'src/app/views/public/authentication/authentication.model';
import { moment } from 'ngx-bootstrap/chronos/testing/chain';
import { REGEX_PATTERNS } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-vendor-delivery-form',
  templateUrl: './vendor-delivery-form.component.html',
  styleUrls: ['./vendor-delivery-form.component.scss']
})
export class VendorDeliveryFormComponent {
  materialDistributionList!: POMaterialDistribution;
  addDeliveryStatusForm!: FormGroup;
  isLoading!: boolean;
  hasValidationError!: boolean;
  validationErrors!: string[];
  subscriptions: any;
  private materialDistributionId!: number;
  private poId!: number
  userDetails: UserDetails | undefined;
  selectedDate: Date = new Date();
  isCalendarOpen = false;
  qtyAsBundle: any='';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private poService: PurchaseOrdersService,
    private activatedRoute: ActivatedRoute
  ) { 
    const routParams = this.activatedRoute.snapshot.params
    this.materialDistributionId = +routParams['material_distribution_id']
    this.poId = +routParams['poId']
    // if (!this.isDateSelected()) {
    //   this.isCalendarOpen = true;
    // }
  }
  
  ngOnInit(): void {
    this.initializeForm();
    this.poService.getMaterialDistributionList(this.materialDistributionId, this.poId).subscribe((val) => {
      this.materialDistributionList = val;
    });
    this.initializeForm();
    const observer = this.store
      .select(selectUserDetails)
      .subscribe((details: UserDetails) => {        
      this.userDetails = details
      })
    this.subscriptions?.add(observer);
    this.addDeliveryStatusForm.valueChanges.subscribe((val)=> {
      if (val.copiesBundle && val.bundle) {
        this.qtyAsBundle = parseInt(val.copiesBundle) * parseInt(val.bundle);
      }
      else {
        this.qtyAsBundle=''
      }
    })

  }

  initializeForm(): void {
    this.addDeliveryStatusForm = this.formBuilder.group({
      delChallanNum: [
        null,
        [
          Validators.required
        ]
      ],
      copiesBundle: [
        null,
        [
          Validators.required,
        ],
      ],
      bundle: [
        null,
        [
          Validators.required,
        ],
      ],
      qtyAsBundle: [
        null,
        [
          Validators.required,
        ],
      ],
    });
  }

  

  onBack(): void {
    this.router.navigateByUrl('purchase_orders');
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.addDeliveryStatusForm.controls;
  }
}
