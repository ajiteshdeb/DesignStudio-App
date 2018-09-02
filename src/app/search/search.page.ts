import { Component, OnInit } from '@angular/core';

import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(
    private loadingservice: LoadingService
  ) { }

  ngOnInit() {
  }

}
