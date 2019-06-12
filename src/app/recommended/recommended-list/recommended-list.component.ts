import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recommended } from '../recommended';
import { RecommendedService } from '../recommended.service';

@Component({
  selector: 'app-recommended-list',
  templateUrl: './recommended-list.component.html',
  styleUrls: ['./recommended-list.component.css']
})
export class RecommendedListComponent implements OnInit {
  recommended: Recommended[][];

  constructor(private recommendedService: RecommendedService) { }

  ngOnInit() {
    this.recommendedService.getRecommended().subscribe((recommended: Recommended[]) => {
      this.recommended = this.chunk(recommended, 4);
    });
  }

  chunk(array: Recommended[], size: number): Recommended[][] {
    const results = [];
    while (array.length) {
      results.push(array.splice(0, size));
    }
    return results;
  }
}
