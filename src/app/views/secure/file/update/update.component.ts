import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../file.service';
import { File } from '../file.model';
import { ErrorResponse } from 'src/app/shared/interceptors/error.interceptor';
import { Subscription } from 'rxjs';
import { Tag } from 'src/app/shared/components/tag/tag.model';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit, OnDestroy {
  fileId: number;
  fileDetails: File | undefined;
  isError = false;
  selectedTags: number[] = [];
  updatedTags: Tag[] = [];
  updatedFileName = '';
  isUpdating = false;
  private subscriptions = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private fileService: FileService,
    private toastrService: ToastrService,
    private location: Location
  ) {
    this.fileId = parseInt(this.activatedRoute.snapshot.params['id']);
  }

  ngOnInit(): void {
    const observer = this.fileService.getFileDetail(this.fileId).subscribe({
      next: (details: File) => {
        this.fileDetails = details;
        this.updatedFileName = details.name;
        details.tags.forEach((tag) => {
          if (tag.id) {
            this.selectedTags.push(tag.id);
          }
        });
        this.updatedTags = details.tags;
      },
      error: () => {
        this.isError = true;
      },
    });

    this.subscriptions.add(observer);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  tagChange(event: Tag[]): void {
    this.updatedTags = event;
  }

  updateFile(): void {
    if (this.updatedFileName) {
      this.isUpdating = true;
      const tags: string[] = [];
      this.updatedTags.forEach((tag) => tags.push(tag.name));
      const observer = this.fileService
        .updateFileDetails(
          {
            name: this.updatedFileName,
            tags: tags,
          },
          this.fileId
        )
        .subscribe({
          next: () => {
            this.toastrService.success('Document details updated successfully');
            this.isUpdating = false;
            this.onBack();
          },
          error: (error: ErrorResponse) => {
            this.isUpdating = false;
            this.toastrService.error(error.errors[0]);
          },
        });

      this.subscriptions.add(observer);
    }
  }

  onBack(): void {
    this.location.back();
  }
}
