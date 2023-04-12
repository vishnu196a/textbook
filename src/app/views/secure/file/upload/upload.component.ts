import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tag } from 'src/app/shared/components/tag/tag.model';
import { FileService } from '../file.service';
import { File as Document, FileStatus } from '../file.model';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/shared/interceptors/error.interceptor';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnDestroy {
  isFileSelected = false;
  fileToUpload: File | undefined;
  SelectedFile: string | undefined;
  isUploading = false;
  fileUploadProgress = 0;
  private selectedTags: Tag[] | undefined;
  private readonly subscriptions = new Subscription();
  private intervalID: NodeJS.Timeout | undefined;

  constructor(
    private fileService: FileService,
    private location: Location,
    private toasterService: ToastrService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const fileList: FileList = target.files;
      if (fileList.length) {
        this.isFileSelected = true;
        this.fileToUpload = fileList[0];
      } else {
        this.isFileSelected = false;
        this.fileToUpload = undefined;
      }
    }
  }

  public onDeleteSelectedFile(): void {
    this.fileToUpload = undefined;
    this.SelectedFile = undefined;
  }

  public onTagChange(event: Tag[]): void {
    this.selectedTags = event;
  }

  public onGoBack(): void {
    this.location.back();
  }

  public onUploadFile(): void {
    if (this.fileToUpload) {
      this.isUploading = true;
      this.fileUploadProgress = 1;
      const formData = new FormData();
      formData.append('document', this.fileToUpload, this.fileToUpload.name);
      formData.append('name', this.fileToUpload.name);
      this.selectedTags?.forEach((tag) => {
        formData.append('tags', tag.name);
      });
      const subscription = this.fileService.uploadFile(formData).subscribe({
        next: (file: Document) => {
          this.fileUploadProgress = 10;
          this.fetchFileStatusPeriodically(file.id);
        },
        error: (error: ErrorResponse) => {
          this.toasterService.error(error.errors[0]);
          this.isUploading = false;
          this.fileUploadProgress = 0;
        },
      });
      this.subscriptions.add(subscription);
    }
  }

  private fetchFileStatusPeriodically(fileId: number): void {
    this.intervalID = setInterval(() => this.getFileDetails(fileId), 5000);
  }

  private getFileDetails(fileId: number): void {
    const subscription = this.fileService.getFileDetail(fileId).subscribe({
      next: (data) => {
        this.fileUploadProgress = data.completed_percentage;
        if (
          data.status === FileStatus.completed ||
          data.status === FileStatus.failed
        ) {
          this.isUploading = false;
          clearInterval(this.intervalID);
          if (data.status === FileStatus.completed) {
            this.toasterService.success('File uploaded successfully');
            setTimeout(() => {
              this.onGoBack();
            }, 1000);
          } else if (data.status === FileStatus.failed) {
            this.fileUploadProgress = 0;
            this.toasterService.error(data.error);
          }
        }
      },
      error: (error: ErrorResponse) => {
        this.isUploading = false;
        this.toasterService.error(error.errors[0]);
        clearInterval(this.intervalID);
        this.fileUploadProgress = 0;
      },
    });
    this.subscriptions.add(subscription);
  }
}
