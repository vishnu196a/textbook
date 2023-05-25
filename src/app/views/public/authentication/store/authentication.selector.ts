import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AuthenticationState } from '../authentication.model';

const selectAuthenticationState = (state: AppState) =>
  state.authenticationState;

export const selectToken = createSelector(
  selectAuthenticationState,
  (state: AuthenticationState) => state.token
);

export const selectUserDetails = createSelector(
  selectAuthenticationState,
  (state: AuthenticationState) => ({ email: state.email, name: state.name, role: state.role, token:state.token })
);

