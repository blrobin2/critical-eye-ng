import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AlbumSearchResult } from 'src/app/album-search.service';

@Component({
  selector: 'app-album-search',
  templateUrl: './album-search.component.html',
  styleUrls: ['./album-search.component.css']
})
export class AlbumSearchComponent implements OnInit {
  @Input() searchTerm$: Observable<string>;
  @Input() searchResults: AlbumSearchResult[];
  @Output() handleReviewButton: EventEmitter<AlbumSearchResult> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
