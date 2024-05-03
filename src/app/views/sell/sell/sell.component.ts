import { Component } from '@angular/core';
import { BannerComponent } from '../../../../shared/components/banner/banner.component';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { ListingComponent } from '../../../../shared/payo-table/listing/listing.component';


@Component({
  selector: 'app-sell',
  standalone: true,
  imports: [
    BannerComponent,
    SearchComponent,
    BannerComponent,
    SearchComponent,
    ListingComponent,
  ],
  templateUrl: './sell.component.html',
  styleUrl: './sell.component.scss'
})
export class SellComponent {

}
