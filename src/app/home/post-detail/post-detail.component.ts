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

  private slug;
  private blogdetail: BlogPost[] = [];

  constructor(private route: ActivatedRoute, private blogservice: BlogService) { }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.blogservice.getBlogDetail(this.slug).subscribe((data) => {
      this.blogdetail = data;
      console.log(this.blogdetail);
    },
    (e) => {
      console.log(e);
    });
  }

}
