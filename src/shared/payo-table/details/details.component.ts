import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Listing } from '../../models/listing';
import { CurrencyPipe, NgForOf, TitleCasePipe } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard, MatCardContent, MatCardHeader, MatCardModule } from '@angular/material/card';
import { TranslateDetailsPipe } from '../../pipes/translate-details-pipe.pipe';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatToolbar,
    MatCard,
    MatCardHeader,
    MatCardContent,
    TitleCasePipe,
    MatCardModule,
    NgForOf,
    TranslateDetailsPipe,
    MatIcon,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  details!: Listing;

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.details = data['details'];
      console.log(this.details);
    });
  }

  getDetailsArray(details: any): Array<{ key: string, value: any }> {
    return Object.entries(details).map(([key, value]) => ({ key, value }));
  }

  goBack(): void {
    this.router.navigate(['../']);
  }
}
