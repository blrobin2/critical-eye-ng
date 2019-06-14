import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlbumSearchResult } from '../album-search.service';

@Component({
  selector: 'app-album-search-result',
  templateUrl: './album-search-result.component.html',
  styleUrls: ['./album-search-result.component.css']
})
export class AlbumSearchResultComponent {
  @Input() result: AlbumSearchResult;
  @Output() handleReviewButton: EventEmitter<AlbumSearchResult> = new EventEmitter();
}
