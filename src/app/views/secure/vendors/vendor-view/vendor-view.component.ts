import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-view',
  templateUrl: './vendor-view.component.html',
  styleUrls: ['./vendor-view.component.scss']
})
export class VendorViewComponent {;
  constructor(private router: Router) { }
  
  onBackToVendorView(): void {
    this.router.navigateByUrl('vendors')
  }
}
