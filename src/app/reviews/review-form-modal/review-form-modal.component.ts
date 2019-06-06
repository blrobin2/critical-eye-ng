import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { Review } from 'src/app/reviews/review';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlbumSearchResult } from 'src/app/core/album-search/album-search.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-review-form-modal',
  templateUrl: './review-form-modal.component.html',
  styleUrls: ['./review-form-modal.component.css']
})
export class ReviewFormModalComponent implements OnInit {
  @Input() review: Review;
  @Input() searchTerm$: Subject<string>;
  @Input() searchResults: AlbumSearchResult[];

  @Output() handleFormSave = new EventEmitter();
  @Output() handleReviewButton = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  openReviewModal(content: TemplateRef<string>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  ngOnInit() {
  }

  closeSavingModal($event, modal: NgbActiveModal) {
    modal.close('Saved');
    this.handleFormSave.emit($event);
  }
}
