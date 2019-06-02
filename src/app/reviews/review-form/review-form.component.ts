import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from 'src/app/review';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {
  @Input() review: Review;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      artist: [this.review.artist, Validators.required],
      album: [this.review.album, Validators.required],
      spotifyId: [this.review.spotifyId, Validators.required],
      artwork: [this.review.artwork],
      dateListened: [
        this.review.dateListened.toISOString().substring(0, 10),
        Validators.required
      ],
      description: [this.review.description],
      href: [this.review.href],
      rating: [this.review.rating, Validators.required],
      yearReleased: [this.review.yearReleased]
    });
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      console.error('Fill out form');
    }

  }
}
