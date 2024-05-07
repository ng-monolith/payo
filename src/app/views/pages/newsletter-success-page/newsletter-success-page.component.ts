import { Component } from '@angular/core';
import { BannerComponent } from '../../../../shared/components/banner/banner.component';
import { SearchComponent } from '../../../../shared/components/search/search.component';

@Component({
  selector: 'app-newsletter-success-page',
  standalone: true,
  imports: [
    BannerComponent,
    SearchComponent,
  ],
  templateUrl: './newsletter-success-page.component.html',
  styleUrl: './newsletter-success-page.component.scss'
})
export class NewsletterSuccessPageComponent {

}
