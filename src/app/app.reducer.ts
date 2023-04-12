import { ActionReducerMap } from '@ngrx/store';
import { AuthenticationState } from './views/public/authentication/authentication.model';
import { authenticationReducer } from './views/public/authentication/store/authentication.reducer';
import { FileState } from './views/secure/file/file.model';
import { fileReducer } from './views/secure/file/store/file.reducer';

export interface AppState {
  authenticationState: AuthenticationState;
  fileState: FileState;
}

export const appReducers: ActionReducerMap<AppState> = {
  authenticationState: authenticationReducer,
  fileState: fileReducer,
};
