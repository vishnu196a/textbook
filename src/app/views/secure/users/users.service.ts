import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  BranchesList,
  GetUserResponse,
  UserForm,
  UserFormEdit,
  UserResponse,
} from './users.model';
import { NamesAndIds } from 'src/app/shared/models/shared.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getAllFiles(): Observable<GetUserResponse> {
    // let params = new HttpParams();
    // params = params.append('page', state.pagination.current_page);
    // params = params.append('q', state.search);
    // params = params.append('type', state.searchType);
    // if (state.sort.key && state.sort.type) {
    //   params = params.append(state.sort.key, state.sort.type);
    // }
    return this.httpClient.get<GetUserResponse>(`${this.apiUrl}/v1/users`, {});
  }

  getUserDetails(userId: number): Observable<UserResponse> {
    return this.httpClient.get<UserResponse>(
      `${this.apiUrl}/v1/users/${userId}`
    );
  }

  updateUser(user: UserFormEdit, userId: number): Observable<UserResponse> {
    return this.httpClient.put<UserResponse>(
      `${this.apiUrl}/v1/users/${userId}`,
      user
    );
  }

  getBranchNames():Observable<BranchesList[]> {
    return this.httpClient.get<BranchesList[]>(
       `${this.apiUrl}/v1/branches/ids_and_names`
     )
  }

  deleteUser(id: number) {
    return this.httpClient.delete<UserResponse>(
      `${this.apiUrl}/v1/users/${id}`
    );
  }

  addUser(user: UserForm): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>(`${this.apiUrl}/v1/users`, user);
  }
}
