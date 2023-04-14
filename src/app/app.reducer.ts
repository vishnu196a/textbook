import { ActionReducerMap } from '@ngrx/store';
import { AuthenticationState } from './views/public/authentication/authentication.model';
import { authenticationReducer } from './views/public/authentication/store/authentication.reducer';
import { FileState } from './views/secure/file/file.model';
import { fileReducer } from './views/secure/file/store/file.reducer';
import { BranchState } from './views/secure/branches/branches.model';
import { branchReducer } from './views/secure/branches/store/branch-reducer';

export interface AppState {
  authenticationState: AuthenticationState;
  fileState: FileState;
  branchState: BranchState;
}

export const appReducers: ActionReducerMap<AppState> = {
  authenticationState: authenticationReducer,
  fileState: fileReducer,
  branchState: branchReducer,
};
