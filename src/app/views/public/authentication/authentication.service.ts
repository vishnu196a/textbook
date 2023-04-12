import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuccessMessage } from 'src/app/shared/models/shared.model';
import { environment } from 'src/environments/environment';
import {
  AuthenticationState,
  UserCredentials,
  UserResponse,
} from './authentication.model';
import { setLoggedInUser } from './store/authentication.action';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient, private store: Store) {}

  public login(
    userCredentials: UserCredentials
  ): Observable<HttpResponse<UserResponse>> {
    return this.http
      .post<UserResponse>(`${this.apiUrl}/v1/login`, userCredentials, {
        observe: 'response',
      })
      .pipe(
        map((httpResponse: HttpResponse<UserResponse>) => {
          const token = httpResponse.headers.get('Authorization');
          if (httpResponse.body && token) {
            const userDetails: AuthenticationState = {
              name: httpResponse.body.name,
              email: httpResponse.body.email,
              token: token,
            };
            this.store.dispatch(setLoggedInUser(userDetails));
          }
          return httpResponse;
        })
      );
  }

  public logout(): Observable<SuccessMessage> {
    return this.http.delete<SuccessMessage>(`${this.apiUrl}/v1/logout`);
  }
}
