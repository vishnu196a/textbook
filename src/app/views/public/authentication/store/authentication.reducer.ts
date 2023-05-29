import { createReducer, on } from '@ngrx/store';
import { removeLoggedInUser, setLoggedInUser } from './authentication.action';

export const initialState = {
  name: '',
  email: '',
  token: '',
  role: '',
  vendorName: ''
};

export const authenticationReducer = createReducer(
  initialState,
  on(setLoggedInUser, (initialState, { name, email, token, role, vendorName }) => ({
    ...initialState,
    ...{
      name,
      email,
      token,
      role,
      vendorName
    },
  })),
  on(removeLoggedInUser, () => initialState)
);
