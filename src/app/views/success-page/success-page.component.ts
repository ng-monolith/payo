import { Component } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { BannerComponent } from '../../../shared/components/banner/banner.component';
import { SearchComponent } from '../../../shared/components/search/search.component';

@Component({
  selector: 'app-success-page',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    BannerComponent,
    SearchComponent,
    MatCardHeader,
  ],
  templateUrl: './success-page.component.html',
  styleUrl: './success-page.component.scss'
})
export class SuccessPageComponent {

}
