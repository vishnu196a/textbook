import { Pagination } from "src/app/shared/models/shared.model";


export interface PurchaseOrder{
    id: number;
    godown: string;
    region: string;
    vendor_name: string;
    vendor_address: string;
    order_year: string;
    status: string;
    po_no: string;
    po_date: string;
    target_date: string;
    po_days: string;
    Material: Material[];
}

export interface PurchaseOrders {
    purchase_orders: PurchaseOrder[];
    pagination: Pagination;
}

export interface Material {
    id: number;
    po_id: number;
    standard: string;
    title: string;
    medium: string;
    net_copies: number;
    size: string;
    mode_of_printing: string;
    type_of_copies: string;
}


export interface POState{
    pagination: Pagination;
}