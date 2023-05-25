import { ActionReducerMap } from '@ngrx/store';
import { AuthenticationState } from './views/public/authentication/authentication.model';
import { authenticationReducer } from './views/public/authentication/store/authentication.reducer';
import { BranchState } from './views/secure/branches/branches.model';
import { branchReducer } from './views/secure/branches/store/branch-reducer';
import { UserState } from './views/secure/users/users.model';
import { userReducer } from './views/secure/users/store/users.reducer';
import { POState } from './views/secure/purchase-orders/purchase-orders.model';
import { poReducer } from './views/secure/purchase-orders/store/po.reducer';
import { VendorState } from './views/secure/vendors/vendors.model';
import { vendorReducer } from './views/secure/vendors/store/vendor-reducer';

export interface AppState {
  authenticationState: AuthenticationState;
  branchState: BranchState;
  userState: UserState;
  poState: POState;
  vendorState: VendorState
}

export const appReducers: ActionReducerMap<AppState> = {
  authenticationState: authenticationReducer,
  branchState: branchReducer,
  userState: userReducer,
  poState: poReducer,
  vendorState: vendorReducer,
};
