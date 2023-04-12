import { Tag } from 'src/app/shared/components/tag/tag.model';
import { Pagination, Sorting } from 'src/app/shared/models/shared.model';

export interface GetFilesResponse {
  pagination: Pagination;
  uploads: File[];
}

export interface File {
  author: string;
  completed_percentage: number;
  created_at: string;
  id: number;
  name: string;
  retry_count: number;
  status: FileStatus;
  tags: Tag[];
  updated_at: string;
  user_id: number;
}

export interface FileDetails extends File {
  error: string;
}

export enum FileStatus {
  pending = 'PENDING',
  inProgress = 'INPROGRESS',
  completed = 'COMPLETED',
  failed = 'FAILED',
}

export interface FileState extends GetFilesResponse {
  search: string;
  searchType: SearchType;
  sort: FileSorting;
}

export interface GetFileSuggestionResponse {
  uploads: File[];
}

export interface FileSorting extends Sorting {
  key: FileListSortColumn | undefined;
}

export type FileListSortColumn =
  | FileListSortColumns.name
  | FileListSortColumns.author
  | FileListSortColumns.createdAt
  | FileListSortColumns.updatedAt;

export enum FileListSortColumns {
  name = 'o_name',
  author = 'o_author',
  createdAt = 'o_created_at',
  updatedAt = 'o_updated_at',
}

export interface DownloadFile {
  url: string;
}

export interface TagColors {
  name: string;
  color: string;
}

export type EditFile = Pick<File, 'name'> & { tags: string[] };

export enum SEARCH_TYPES {
  standard = 'STANDARD',
  advance = 'ADVANCED',
}

export type SearchType = SEARCH_TYPES.standard | SEARCH_TYPES.advance;
