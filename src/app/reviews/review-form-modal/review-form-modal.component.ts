import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  Output,
  EventEmitter
} from '@angular/core';
import { Review } from 'src/app/reviews/review';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlbumSearchResult } from 'src/app/core/album-search/album-search.service';
import { Subject } from 'rxjs';
import { DialogService } from 'src/app/core/dialog.service';

@Component({
  selector: 'app-review-form-modal',
  templateUrl: './review-form-modal.component.html',
  styleUrls: ['./review-form-modal.component.css']
})
export class ReviewFormModalComponent {
  @Input() review: Review;
  @Input() searchTerm$: Subject<string>;
  @Input() searchResults: AlbumSearchResult[];

  @Output() handleFormSave = new EventEmitter();
  @Output() handleReviewButton = new EventEmitter();

  // Whether or not the child form has received any changes from the user
  reviewIsDirty = false;

  constructor(
    private modalService: NgbModal,
    private dialogService: DialogService
  ) { }

  openReviewModal(content: TemplateRef<string>) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      beforeDismiss: () => {
        if (this.reviewIsDirty) {
          return this.dialogService.confirm('Discard unsaved changes?').toPromise();
        }
        return Promise.resolve(true);
      }
    });
  }

  closeSavingModal($event: Event, modal: NgbActiveModal) {
    modal.close('Saved');
    this.handleFormSave.emit($event);
  }

  updateFormHasChanged(isDirty: boolean) {
    this.reviewIsDirty = isDirty;
  }
}
