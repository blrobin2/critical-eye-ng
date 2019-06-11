import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsComponent } from './reviews.component';
import { StarReviewPipe } from '../../core/star-review.pipe';

describe('ReviewsComponent', () => {
  let component: ReviewsComponent;
  let fixture: ComponentFixture<ReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReviewsComponent,
        StarReviewPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a table of reviews', () => {
    const compiled = fixture.debugElement.nativeElement;
    const trs = Array
      .from(compiled.querySelectorAll('th'))
      .map((t: Node) => t.textContent);
    expect(trs).toEqual(['Artwork', 'Rating', 'Artist', 'Album', 'Date Listened', 'Year Released', 'Actions']);
  });
});
