import { Component } from '@angular/core';
import { BannerComponent } from '../../../../shared/components/banner/banner.component';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { ListingComponent } from '../../../../shared/payo-table/listing/listing.component';

@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [
    BannerComponent,
    SearchComponent,
    ListingComponent,
  ],
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.scss'
})
export class RentComponent {

}
