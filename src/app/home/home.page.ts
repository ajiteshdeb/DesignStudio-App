import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { InfiniteScroll } from '@ionic/angular';

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
  private page = 1;
  private per_page = 2;

  constructor(
    private blogservice: BlogService,
    private loadingservice: LoadingService
  ) { }


  ngOnInit() {
    this.loadingservice.startPageLoading();
    this.getBlog();
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
      this.getBlog(event);
      // if (this.page === 1) {
      //   event.target.disabled = true;
      // }
    }, 500);
  }

}
