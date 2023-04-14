import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AddBranch,
  BranchForm,
  Branches,
  GetBranchResponse,
} from './branches.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SuccessMessage } from 'src/app/shared/models/shared.model';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  readonly apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getBranchDetails(branchId: number): Observable<Branches> {
    return this.httpClient.get<Branches>(
      `${this.apiUrl}/v1/branches/${branchId}`
    );
  }

  getBranch(): Observable<GetBranchResponse> {
    return this.httpClient.get<GetBranchResponse>(`${this.apiUrl}/v1/branches`);
  }

  addBranch(branches: BranchForm): Observable<AddBranch> {
    return this.httpClient.post<AddBranch>(
      `${this.apiUrl}/v1/branches`,
      branches
    );
  }

  updateBranch(branch: BranchForm, branchId: number): Observable<AddBranch> {
    return this.httpClient.put<AddBranch>(
      `${this.apiUrl}/v1/branches/${branchId}`,
      branch
    );
  }

  deleteUser(id: number) {
    return this.httpClient.delete<SuccessMessage>(
      `${this.apiUrl}/v1/branches/${id}`
    );
  }
}
