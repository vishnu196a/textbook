import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { selectUserDetails } from "src/app/views/public/authentication/store/authentication.selector";

@Injectable({
    providedIn: 'root',
})
export class SharedService { 
    userRole:string = '';
    constructor( private store: Store<AppState>,) {
    }
    getUserRole():string {
        this.store.select(selectUserDetails).subscribe((val) => {
            this.userRole = val.role;
        })
        return this.userRole
    }
}