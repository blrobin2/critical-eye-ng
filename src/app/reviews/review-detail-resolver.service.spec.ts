import { TestBed } from '@angular/core/testing';

import { ReviewDetailResolverService } from './review-detail-resolver.service';

describe('ReviewDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReviewDetailResolverService = TestBed.get(ReviewDetailResolverService);
    expect(service).toBeTruthy();
  });
});
