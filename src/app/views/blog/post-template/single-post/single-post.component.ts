import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardModule } from '@angular/material/card';
import { Post } from '../../../../../shared/models/post';

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [
    NgIf,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCardModule,
    NgForOf,
  ],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.scss'
})
export class SinglePostComponent implements OnInit {
  post: Post | null = null;

  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.post = data['blog'];
    });
  }
}