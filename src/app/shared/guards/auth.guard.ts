import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { selectUserDetails } from 'src/app/views/public/authentication/store/authentication.selector';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  token = '';
  role = '';

  constructor(
    private readonly store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.store.select(selectUserDetails).subscribe((value) => {
      this.token = value.token;
      this.role = value.role;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.token) {
      if (route.data['roles'].includes(this.role)) {
        return true;
      }
    } 

      return this.router.navigate(['/login']);
    
  }
}
