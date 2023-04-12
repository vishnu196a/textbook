import { Component, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss'],
})
export class ModelComponent {
  fileName: string | undefined;
  public confirm = new EventEmitter();
  constructor(public bsModalRef: BsModalRef) {}

  public onClose(): void {
    this.bsModalRef.hide();
  }

  public onConfirm(): void {
    this.confirm.emit();
    this.bsModalRef.hide();
  }
}
