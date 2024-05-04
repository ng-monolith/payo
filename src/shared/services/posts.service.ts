// src/app/services/posts.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import ApiUrlsConfig from '../configs/api-urls.config';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = ApiUrlsConfig.posts;
  private http = inject(HttpClient);

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}`);
  }

  getPostById(postId: string | null): Observable<Post> {
    if (postId !== null) {
      return this.http.get<Post>(`${this.apiUrl}/${postId}`);
    } else {
      return of({} as Post);
    }
  }
}
