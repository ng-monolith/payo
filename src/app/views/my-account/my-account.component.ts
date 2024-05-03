import { Component } from '@angular/core';
import { BannerComponent } from '../../../shared/components/banner/banner.component';
import { SearchComponent } from '../../../shared/components/search/search.component';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [
    BannerComponent,
    SearchComponent,
  ],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss'
})
export class MyAccountComponent {

}
