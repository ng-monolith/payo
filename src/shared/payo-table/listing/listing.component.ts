import { Component, inject, Input, OnInit } from '@angular/core';
import { Listing, ListingConfig } from '../../models/listing';
import { AnnouncementService } from '../../services/announcement.service';
import { CurrencyPipe, NgForOf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateDetailsPipe } from '../../pipes/translate-details-pipe.pipe';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink,
    NgForOf,
    UpperCasePipe,
    TitleCasePipe,
    TranslateDetailsPipe,
  ],
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  @Input() config!: ListingConfig;
  listings: Listing[] = [];

  private announcementService = inject(AnnouncementService);

  ngOnInit(): void {
    this.announcementService.getAllListings(this.config).subscribe({
      next: (listings: Listing[]) => {
        this.listings = listings;
      },
      error: (error) => console.error('Failed to load listings:', error)
    });
  }

  getDetailsArray(details: any): Array<{ key: string, value: any }> {
    return Object.entries(details).map(([key, value]) => ({ key, value }));
  }
}
