import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  DoCheck
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from '../review';
import { AlertService } from 'src/app/core/alert/alert.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnChanges, DoCheck {
  @Input() review: Review;
  @Output() handleSubmit = new EventEmitter();
  @Output() handleDirtyForm = new EventEmitter();
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService
    ) {}

  ngOnChanges() {
    this.form = this.formBuilder.group({
      _id: [this.review._id],
      artist: [this.review.artist, Validators.required],
      album: [this.review.album, Validators.required],
      spotifyId: [this.review.spotifyId, Validators.required],
      artwork: [this.review.artwork],
      dateListened: [
        this.review.dateListened.toISOString().substring(0, 10),
        Validators.required
      ],
      description: [this.review.description || ''],
      href: [this.review.href],
      rating: [this.review.rating, Validators.required],
      yearReleased: [this.review.yearReleased]
    });
  }

  ngDoCheck() {
    this.handleDirtyForm.emit(this.form.dirty);
  }

  submit() {
    if (this.form.valid) {
      this.handleSubmit.emit(this.form.value);
    } else {
      this.alertService.addAlert({
        type: 'danger',
        message: 'Fill out the form dude'
      });
    }
  }
}
