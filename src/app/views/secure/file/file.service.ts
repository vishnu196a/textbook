import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuccessMessage } from 'src/app/shared/models/shared.model';
import { environment } from 'src/environments/environment';
import {
  DownloadFile,
  EditFile,
  File,
  FileDetails,
  FileState,
  GetFilesResponse,
  GetFileSuggestionResponse,
  SearchType,
} from './file.model';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  readonly apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  uploadFile(uploadParams: FormData): Observable<File> {
    return this.httpClient.post<File>(
      `${this.apiUrl}/v1/uploads`,
      uploadParams
    );
  }

  getAllFiles(state: FileState): Observable<GetFilesResponse> {
    let params = new HttpParams();
    params = params.append('page', state.pagination.current_page);
    params = params.append('q', state.search);
    params = params.append('type', state.searchType);
    if (state.sort.key && state.sort.type) {
      params = params.append(state.sort.key, state.sort.type);
    }
    return this.httpClient.get<GetFilesResponse>(`${this.apiUrl}/v1/uploads`, {
      params,
    });
  }

  downloadFile(fileId: number): Observable<DownloadFile> {
    return this.httpClient.get<DownloadFile>(
      `${this.apiUrl}/v1/downloads/${fileId}`
    );
  }

  deleteFile(id: number): Observable<SuccessMessage> {
    return this.httpClient.delete<SuccessMessage>(
      `${this.apiUrl}/v1/uploads/${id}`
    );
  }

  getFileDetail(fileId: number): Observable<FileDetails> {
    return this.httpClient.get<FileDetails>(
      `${this.apiUrl}/v1/uploads/${fileId}`
    );
  }

  getFileSuggestions(
    query: string,
    searchType: SearchType
  ): Observable<GetFileSuggestionResponse> {
    const params = new HttpParams().set('q', query).set('type', searchType);
    return this.httpClient.get<GetFileSuggestionResponse>(
      `${this.apiUrl}/v1/uploads/suggestions`,
      { params }
    );
  }

  updateFileDetails(
    updatedDetails: EditFile,
    fileId: number
  ): Observable<SuccessMessage> {
    return this.httpClient.put<SuccessMessage>(
      `${this.apiUrl}/v1/uploads/${fileId}`,
      updatedDetails
    );
  }
}
