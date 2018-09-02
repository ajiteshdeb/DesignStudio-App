import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BlogPost } from '../interfaces/blog-response.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private http: HttpClient
  ) {}

  getAllBlog(per_page: number, page: number) {
    return this.http.get<BlogPost[]>(`wp/v2/posts?_embed&per_page=${per_page}&page=${page}`);
  }
}
