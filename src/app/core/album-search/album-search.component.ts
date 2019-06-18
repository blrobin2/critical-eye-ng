import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { AlbumSearchResult } from '@app/core/album-search/album-search.service';

@Component({
  selector: 'app-album-search',
  templateUrl: './album-search.component.html',
  styleUrls: ['./album-search.component.css']
})
export class AlbumSearchComponent {
  @Input() searchTerm$: Subject<string>;
  @Input() searchResults: AlbumSearchResult[];
  @Output() handleReviewButton: EventEmitter<AlbumSearchResult> = new EventEmitter();
}
