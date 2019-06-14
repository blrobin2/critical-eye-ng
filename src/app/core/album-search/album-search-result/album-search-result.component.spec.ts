import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumSearchResultComponent } from './album-search-result.component';

describe('AlbumSearchResultComponent', () => {
  let component: AlbumSearchResultComponent;
  let fixture: ComponentFixture<AlbumSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumSearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
