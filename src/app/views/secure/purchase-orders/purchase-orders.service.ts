import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  PurchaseOrders } from './purchase-orders.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PurchaseOrdersService {
  constructor(private http: HttpClient) {}
  readonly apiUrl = environment.apiUrl;

  getAllPO(page: number): Observable<PurchaseOrders> {
    let params = new HttpParams();
    params = params.append('page', page);
    return this.http.get<PurchaseOrders>(
      `${this.apiUrl}/v1/admins/purchase_orders`, {params}
    );
  }
}
