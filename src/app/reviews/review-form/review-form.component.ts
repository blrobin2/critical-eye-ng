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

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      artist: ['', Validators.required],
      album: ['', Validators.required],
      spotifyId: ['', Validators.required],
      artwork: [''],
      dateListened: ['', Validators.required],
      description: [''],
      href: [''],
      rating: ['', Validators.required],
      yearReleased: ['']
    });
  }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      console.error('Fill out form');
    }

  }
}
