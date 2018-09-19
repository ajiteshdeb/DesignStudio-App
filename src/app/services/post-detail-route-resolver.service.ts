import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { BlogService } from './blog.service';
import { BlogPost } from '../interfaces/blog-response.interface';


@Injectable({
  providedIn: 'root'
})
export class PostDetailRouteResolverService implements Resolve<BlogPost[]> {

  private slug;
  private blogdetail: BlogPost[] = [];

  constructor(
    private loadingController: LoadingController,
    private blogservice: BlogService,
    private http: HttpClient
    ) { }

  async startPageLoading() {
    const loading = await this.loadingController.create({
      message: 'Resolving details...',
    });
    return await loading.present();
  }

  hidePageLoading() {
    this.loadingController.dismiss();
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.slug = route.paramMap.get('slug');
    this.startPageLoading();

    return this.http.get<BlogPost[]>(`wp/v2/posts?_embed&slug=${this.slug}`)
    .pipe(
      tap(() => {
        this.hidePageLoading();
      })
    );
  }
}
