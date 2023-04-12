import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ModelComponent } from 'src/app/shared/components/model/model.component';
import { ErrorResponse } from 'src/app/shared/interceptors/error.interceptor';
import { File, TagColors } from '../file.model';
import { FileService } from '../file.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  tagsList: TagColors[] = [];
  fileId: number;
  fileDetails: File | undefined;
  isDetailsError = false;
  isDownloadError = false;
  colors: string[] = [
    '#FBEAEA',
    '#FFFAE6',
    '#FFFFE5',
    '#F9FEE7	',
    '#EAFAF3',
    '#EBE8FC',
    '#F7EDF7',
  ];
  private subscriptions = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private fileService: FileService,
    private router: Router,
    private toastrService: ToastrService,
    private modalService: BsModalService,
    private toasterService: ToastrService
  ) {
    this.fileId = parseInt(this.activatedRoute.snapshot.params['id']);
  }

  ngOnInit(): void {
    const observer = this.fileService.getFileDetail(this.fileId).subscribe(
      (details: File) => {
        this.fileDetails = details;
        details.tags.forEach((tag) => {
          this.tagsList.push({
            name: tag.name,
            color: this.colors[this.randomColors() - 1],
          });
        });
      },
      (error: ErrorResponse) => {
        this.isDetailsError = true;
      }
    );
    this.subscriptions.add(observer);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onEdit(): void {
    this.router.navigate(['update', this.fileId]);
  }

  onDownload(): void {
    const observer = this.fileService.downloadFile(this.fileId).subscribe(
      (response) => {
        this.isDownloadError = false;
        const link = document.createElement('a');
        link.setAttribute('href', response.url);
        link.setAttribute('target', '_blank');
        link.click();
        link.remove();
      },
      (error: ErrorResponse) => {
        this.isDownloadError = true;
      }
    );
    this.subscriptions.add(observer);
  }

  onDelete(): void {
    const initialState: ModalOptions = {
      initialState: {
        fileName: this.fileDetails?.name,
      },
    };
    const modal = this.modalService.show(ModelComponent, initialState);
    modal.content?.confirm.subscribe({
      next: () => {
        this.fileService.deleteFile(this.fileId).subscribe({
          next: () => {
            this.toasterService.success('File has been deleted');
            this.router.navigateByUrl('/');
          },
          error: () => {
            this.toasterService.error('Oops! Something went wrong');
          },
        });
      },
    });
  }

  randomColors() {
    return Math.ceil(Math.random() * this.colors.length);
  }
}
