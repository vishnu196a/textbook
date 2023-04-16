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
    MaterialDistribution?: MaterialDistribution[];
}

export interface MaterialDistribution {
        id: number,
        po_id: number,
        material_id: number,
        branch_id: number,
        branch: {
          id: number,
          name: string,
          address: string,
          dl_type: string,
          district_id: number,
          district_name: string,
          created_at: string,
          updated_at: string
        },
        net_copies: number,
        delivery_status: string   
}


export interface POState{
    pagination: Pagination;
}


type PO = Omit<PurchaseOrder, 'Material'>

type POMaterial = Omit<Material, 'MaterialDistribution'>


export interface POMaterialDistribution{
    purchaseOrder: PO;
    material: POMaterial;
    materialDistribution: MaterialDistribution[];    
}