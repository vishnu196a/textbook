import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { GetVendorResponse } from "./vendors.model";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class VendorService { 
  readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  
    getVendors(
      page: number,
      searchTerm?: string,
      vendorStatus?: string
    ): Observable<GetVendorResponse> {
      let params = new HttpParams();
      params = params.append('page', page);
      if (searchTerm) {
        params = params.append('q', searchTerm);
      }
      if (vendorStatus !== 'All' && vendorStatus) {
        params = params.append('status', vendorStatus);
      }
      return this.http.get<GetVendorResponse>(
        `${this.apiUrl}/v1/vendors`,
        { params }
      );
    }
}