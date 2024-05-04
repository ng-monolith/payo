// src/app/resolvers/single-post.resolver.ts
import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from '../services/posts.service';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class SinglePostResolver implements Resolve<Post> {
  private postService = inject(PostService);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post> {
    const postId = route.paramMap.get('id');
    return this.postService.getPostById(postId);
  }
}
