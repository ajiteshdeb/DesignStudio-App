import { TestBed, inject } from '@angular/core/testing';

import { PostDetailRouteResolverService } from './post-detail-route-resolver.service';

describe('RouteResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostDetailRouteResolverService]
    });
  });

  it('should be created', inject([PostDetailRouteResolverService], (service: PostDetailRouteResolverService) => {
    expect(service).toBeTruthy();
  }));
});
