import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from 'src/app/review';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnChanges {
  @Input() review: Review;
  @Output() handleSubmit = new EventEmitter();
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

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

  submit() {
    if (this.form.valid) {
      this.handleSubmit.emit(this.form.value);
    } else {
      console.error('Fill out form');
    }
  }
}
