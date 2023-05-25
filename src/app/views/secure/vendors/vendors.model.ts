import { Pagination } from "src/app/shared/models/shared.model";

export interface GetVendorResponse {
    pagination: Pagination;
    vendors: Vendors[];
}
  
export interface Vendors {
    id: number;
    name: string;
    address: string;
    type: string
    created_at: string;
    updated_at: string;
}

export interface VendorState {
    pagination: Pagination;
    searchTerm: string;
  }