import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { AnnouncementService } from '../../services/announcement.service';
import { Listing } from '../../models/listing';
import { ListingComponent } from '../../payo-table/listing/listing.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    ListingComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup;
  listings: Listing[] = [];

  private announcementService = inject(AnnouncementService);
  private fb = inject(FormBuilder);

  ngOnInit() {
    this.searchForm = this.fb.group({
      transactionType: ['', Validators.required],
      marketType: ['', Validators.required],
      locality: ['', Validators.required],
      distanceRadius: [''],
      priceMin: [''],
      priceMax: [''],
      areaMin: [''],
      areaMax: ['']
    });
  }

  onSubmit() {
    const formValue = this.searchForm.value;
    this.announcementService.searchListings(formValue).subscribe({
      next: (listings: Listing[]) => {
        this.listings = listings;

        console.log('Listings:', listings);
      },
      error: (error) => console.error('Failed to search listings:', error)
    });
  }
}
