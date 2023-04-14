import { ActionReducerMap } from '@ngrx/store';
import { AuthenticationState } from './views/public/authentication/authentication.model';
import { authenticationReducer } from './views/public/authentication/store/authentication.reducer';
import { FileState } from './views/secure/file/file.model';
import { fileReducer } from './views/secure/file/store/file.reducer';
import { UserState } from './views/secure/users/users.model';
import { userReducer } from './views/secure/users/store/users.reducer';

export interface AppState {
  authenticationState: AuthenticationState;
  fileState: FileState;
  userState: UserState;
}

export const appReducers: ActionReducerMap<AppState> = {
  authenticationState: authenticationReducer,
  fileState: fileReducer,
  userState: userReducer,
};
