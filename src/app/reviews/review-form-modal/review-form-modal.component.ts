import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
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
export class ReviewFormModalComponent implements OnChanges {
  @Input() review: Review;
  @Input() searchTerm$: Subject<string>;
  @Input() searchResults: AlbumSearchResult[];
  @Input() open: boolean;

  @Output() handleFormSave = new EventEmitter();
  @Output() handleReviewButton = new EventEmitter();

  @ViewChild('reviewFormModal', {
    read: TemplateRef,
    static: false
  }) reviewFormModal: TemplateRef<string>;

  // Whether or not the child form has received any changes from the user
  reviewIsDirty = false;

  constructor(
    private modalService: NgbModal,
    private dialogService: DialogService
  ) {
  }

  ngOnChanges() {
    // If the parent asks to open a modal, we havwn't already opened one
    // and if the reviewFormModal template has been loaded
    if (this.open && !this.modalService.hasOpenModals() && this.reviewFormModal) {
        this.openReviewModal(this.reviewFormModal);
    }
  }

  openReviewModal(content: TemplateRef<string>) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-review-form-title',
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
