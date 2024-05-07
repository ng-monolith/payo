import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../../../shared/services/posts.service';
import { BannerComponent } from '../../../../shared/components/banner/banner.component';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { ListingComponent } from '../../../../shared/payo-table/listing/listing.component';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { Post } from '../../../../shared/models/post';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    BannerComponent,
    SearchComponent,
    ListingComponent,
    RouterLink,
    NgForOf,
    MatButton,
  ],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.scss']
})
export class BlogComponent implements OnInit {
  posts: Post[] | null = null;
  private postService = inject(PostService);

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }
}
