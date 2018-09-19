import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostDetailRouteResolverService } from '../services/post-detail-route-resolver.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
      },
      {
        path: 'single-post/:slug',
        component: PostDetailComponent,
        data: {
          title: 'Example of static route data'
        },
        resolve: {
          postDetails: PostDetailRouteResolverService
        }
      }

    ])
  ],
  declarations: [HomePage, PostDetailComponent]
})
export class HomePageModule {}
