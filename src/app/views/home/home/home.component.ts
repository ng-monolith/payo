import { Component } from '@angular/core';
import { BannerComponent } from '../../../../shared/components/banner/banner.component';
import { NgIf } from '@angular/common';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { FaqComponent } from '../../../../shared/components/faq/faq.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BannerComponent,
    NgIf,
    SearchComponent,
    FaqComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
