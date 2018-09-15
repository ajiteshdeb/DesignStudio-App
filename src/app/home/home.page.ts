import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { InfiniteScroll } from '@ionic/angular';
import {
  distinctUntilChanged,
  tap,
  debounceTime
} from 'rxjs/operators';

import { BlogService } from '../services/blog.service';
import { LoadingService } from '../services/loading.service';
import { BlogPost } from '../interfaces/blog-response.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  blogposts: BlogPost[] = [];
  searchResults: BlogPost[] = [];
  private page = 1;
  private per_page = 2;
  private totalBlog;
  public noMoreBlog = false;
  public isSearchbarOpened = false;
  public showSpinner = false;
  public searchTemplateActive = false;
  private search_term;

  constructor(
    private blogservice: BlogService,
    private loadingservice: LoadingService
  ) { }


  ngOnInit() {
    this.loadingservice.startPageLoading();
    this.getBlog();
    this.showTotalBlog();
  }

  showTotalBlog() {
    this.blogservice.getTotalBlog().subscribe((response) => {
      this.totalBlog = response.headers.get('x-wp-total');
    });
  }

  getBlog( event? ) {
    this.blogservice.getAllBlog(this.per_page, this.page).subscribe((data) => {
      this.blogposts = this.blogposts.concat(data) ;
      this.page++;
      if (event) {
        event.target.complete();
      } else {
        this.loadingservice.hidePageLoading();
      }
    },
    (e) => {
      console.log(e);
      if (event) {
        event.target.complete();
      }
    });
  }


  loadMoreBlog(event) {
    setTimeout(() => {
      if (this.searchTemplateActive === false) {
        if (this.page * this.per_page <= this.totalBlog) {
          this.getBlog(event);
        } else {
          event.target.disabled = true;
          this.noMoreBlog = true;
        }
      } else {
        this.page++;
        this.showSearchResult(event);
      }
    }, 500);
  }

  checkSearchBarOpened () {
    this.isSearchbarOpened = true;
  }

  onSearchCancel(ionSearchCancelEvent) {
    this.isSearchbarOpened = false;
    this.searchTemplateActive = false;
  }

  getSearchTerm(ionChangeEvent) {
    this.page = 1;
    this.searchResults = [];
    this.showSpinner = true;
    this.searchTemplateActive = true;
    this.search_term = ionChangeEvent.target.value;
    this.showSearchResult ();
  }

  showSearchResult (event?) {
    this.blogservice.getSearchResult(this.search_term, this.per_page, this.page)
    .subscribe((data) => {
      this.searchResults = this.searchResults.concat(data);
      this.showSpinner = false;
      if (event) {
        event.target.complete();
      }
    },
    (e) => {
      console.log(e);
      if (event) {
        event.target.complete();
      }
    });
  }
}
