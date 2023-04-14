import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBranch, BranchForm, GetBranchResponse } from './branches.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  readonly apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getBranch(): Observable<GetBranchResponse> {
    return this.httpClient.get<GetBranchResponse>(`${this.apiUrl}/v1/branches`);
  }

  addBranch(branches: BranchForm): Observable<AddBranch> {
    return this.httpClient.post<AddBranch>(
      `${this.apiUrl}/v1/branches`,
      branches
    );
  }
}
