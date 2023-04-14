import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetBranchResponse } from './branches.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class BranchService {
  readonly apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getBranch(): Observable<GetBranchResponse> {
    return this.httpClient.get<GetBranchResponse>(`${this.apiUrl}/v1/branches`);
  }
}
