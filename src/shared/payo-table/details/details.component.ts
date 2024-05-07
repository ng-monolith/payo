import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Listing } from '../../models/listing';
import { CurrencyPipe, NgForOf, TitleCasePipe } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard, MatCardContent, MatCardHeader, MatCardModule } from '@angular/material/card';
import { TranslateDetailsPipe } from '../../pipes/translate-details-pipe.pipe';
import { MatIcon } from '@angular/material/icon';
import { SlickCarouselComponent, SlickCarouselModule } from 'ngx-slick-carousel';

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
    SlickCarouselModule
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  details!: Listing;
  currentSlide = 0;
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 500,
    infinite: true,
    cssEase: 'linear',
    pauseOnHover: true,
    pauseOnFocus: true,
    draggable: true,
    accessibility: true,
    focusOnSelect: true,
    lazyLoad: 'progressive',
    dots: true,
  };


  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.details = data['details'];
      console.log(this.details);
    });
  }

  changeSlideWithKeys(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.changeSlide('next');
    } else if (event.key === 'ArrowLeft') {
      this.changeSlide('prev');
    }
  }

  changeSlide(direction: 'next' | 'prev') {
    if (direction === 'next') {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    } else {
      this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
    }

    this.slickModal.slickGoTo(this.currentSlide);
  }

  getDetailsArray(details: any): Array<{ key: string, value: any }> {
    return Object.entries(details).map(([key, value]) => ({ key, value }));
  }

  goBack(): void {
    this.router.navigate(['../']);
  }

  slides = [
    './assets/images/image-placeholder.jpg',
    './assets/images/image-placeholder2.jpg',
    './assets/images/image-placeholder3.jpg',
  ];
}
