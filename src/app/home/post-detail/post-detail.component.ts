import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../interfaces/blog-response.interface';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  private blogdetail: BlogPost[] = [];

  constructor(private route: ActivatedRoute, private blogservice: BlogService) { }

  ngOnInit() {
    this.route.data
    .subscribe((data: { postDetails: BlogPost[] }) => {
      this.blogdetail = data.postDetails;
      console.log(this.route.data);
    });
  }

}
