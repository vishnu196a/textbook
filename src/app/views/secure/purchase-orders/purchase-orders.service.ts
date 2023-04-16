import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  POMaterialDistribution,
  PurchaseOrder,
  PurchaseOrders,
} from './purchase-orders.model';
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
      `${this.apiUrl}/v1/admins/purchase_orders`,
      { params }
    );
  }

  getPODetials(id: number): Observable<PurchaseOrder> {
    return this.http.get<PurchaseOrder>(
      `${this.apiUrl}/v1/admins/purchase_orders/${id}`
    );
  }

  getMaterialDistributionList(
    poId: number,
    materialId: number
  ): Observable<POMaterialDistribution> {
    return this.http.get<POMaterialDistribution>(
      `${this.apiUrl}/v1/purchase_orders/${poId}/materials/${materialId}/material_distributions`
    );
  }
}
