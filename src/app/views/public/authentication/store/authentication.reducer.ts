import { createReducer, on } from '@ngrx/store';
import { removeLoggedInUser, setLoggedInUser } from './authentication.action';

export const initialState = {
  name: '',
  email: '',
  token: '',
  role: '',
};

export const authenticationReducer = createReducer(
  initialState,
  on(setLoggedInUser, (initialState, { name, email, token, role }) => ({
    ...initialState,
    ...{
      name,
      email,
      token,
      role
    },
  })),
  on(removeLoggedInUser, () => initialState)
);
