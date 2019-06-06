import { StarReviewPipe } from './star-review.pipe';

describe('StarReviewPipe', () => {
  it('create an instance', () => {
    const pipe = new StarReviewPipe();
    expect(pipe).toBeTruthy();
  });

  it('formats whole numbers', () => {
    const pipe = new StarReviewPipe();
    expect(pipe.transform(1)).toBe('★');
    expect(pipe.transform(3)).toBe('★★★');
    expect(pipe.transform(0)).toBe('');
  });

  it('formats decimal numbers', () => {
    const pipe = new StarReviewPipe();
    expect(pipe.transform(0.5)).toBe('.5');
    expect(pipe.transform(2.5)).toBe('★★.5');
  });
});
