import { Component } from '@angular/core';
import { BannerComponent } from '../../../../shared/components/banner/banner.component';
import { NgIf } from '@angular/common';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { ListingComponent } from '../../../../shared/payo-table/listing/listing.component';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [
    BannerComponent,
    NgIf,
    SearchComponent,
    ListingComponent,
  ],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.scss'
})
export class BuyComponent {

}
