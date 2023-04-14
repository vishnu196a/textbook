import { Pagination } from 'src/app/shared/models/shared.model';

export interface GetBranchResponse {
  pagination: Pagination;
  branches: Branches[];
}

export interface Branches {
  id: 0;
  name: string;
  address: string;
  dl_type: string;
  district_id: 0;
  district_name: string;
  created_at: string;
  updated_at: string;
}

export type BranchListSortColumn =
  | BranchListSortColumns.id
  | BranchListSortColumns.name
  | BranchListSortColumns.address
  | BranchListSortColumns.dl_type
  | BranchListSortColumns.district_id
  | BranchListSortColumns.district_name
  | BranchListSortColumns.createdAt
  | BranchListSortColumns.updatedAt;

export enum BranchListSortColumns {
  id = 0,
  name = 'o_name',
  address = 'o_author',
  dl_type = 'o_dl_type',
  district_id = 'o_district_id',
  district_name = 'o_district_name',
  createdAt = 'o_created_at',
  updatedAt = 'o_updated_at',
}
