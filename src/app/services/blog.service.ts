import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {
  distinctUntilChanged,
  tap,
  debounceTime
} from 'rxjs/operators';

import { BlogPost } from '../interfaces/blog-response.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private http: HttpClient
  ) {}

  getTotalBlog() {
    return this.http.get<HttpResponse<any>>(`wp/v2/posts/`, {observe: 'response'});
  }

  getAllBlog(per_page: number, page: number) {
    return this.http.get<BlogPost[]>(`wp/v2/posts?_embed&per_page=${per_page}&page=${page}`);
  }

  getBlogDetail(slug: string) {
    return this.http.get<BlogPost[]>(`wp/v2/posts?_embed&slug=${slug}`);
  }

  getSearchResult(search_term: string, per_page: number, page: number) {
    return this.http.get<BlogPost[]>(`wp/v2/posts?_embed&search=${search_term}&per_page=${per_page}&page=${page}`);
  }
}
