import { TestBed } from '@angular/core/testing';

import { AlbumSearchService } from './album-search.service';

describe('AlbumSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlbumSearchService = TestBed.get(AlbumSearchService);
    expect(service).toBeTruthy();
  });
});
