import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { Recommended } from '@app/recommended/recommended';
import { RecommendedService } from '@app/recommended/recommended.service';

@Component({
  selector: 'app-recommended-list',
  templateUrl: './recommended-list.component.html',
  styleUrls: ['./recommended-list.component.css']
})
export class RecommendedListComponent implements OnInit {
  recommended: Recommended[][];

  constructor(
    private recommendedService: RecommendedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.recommendedService.getRecommended().subscribe((recommended: Recommended[]) => {
      this.recommended = this.chunk(recommended, 4);
    });
  }

  reviewAlbum(recommended: Recommended) {
    const extras: NavigationExtras = {
      queryParams: {
        artist: recommended.artist,
        album: recommended.album
      }
    };
    this.router.navigate([''], extras);
  }

  chunk(array: Recommended[], size: number): Recommended[][] {
    const results = [];
    while (array.length) {
      results.push(array.splice(0, size));
    }
    return results;
  }
}
