import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { Review } from 'src/app/review';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-review-form-modal',
  templateUrl: './review-form-modal.component.html',
  styleUrls: ['./review-form-modal.component.css']
})
export class ReviewFormModalComponent implements OnInit {
  @Input() review: Review;
  @Input() searchTerm$;
  @Input() searchResults;

  @Output() handleFormSave = new EventEmitter();
  @Output() handleReviewButton = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  openReviewModal(content: TemplateRef<string>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result
      .then(result => {
        console.log('result', result);
      }).catch(err => {
        console.log(err);
      });
  }

  ngOnInit() {
  }

  closeSavingModal($event, modal: NgbActiveModal) {
    modal.close('Saved');
    this.handleFormSave.emit($event);
  }
}
