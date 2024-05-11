import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-property-cards',
  templateUrl: './property-types.component.html',
  styleUrls: ['./property-types.component.scss'],
  standalone: true,
  imports: [
    NgForOf,
  ],
})
export class PropertyCardsComponent {
  property = [
    {
      title: 'Domy na sprzedaż',
      description: 'Znajdź swój wymarzony dom na sprzedaż.',
      imageUrl: './assets/images/image-placeholder.jpg',
      linkUrl: '/'
    },
    {
      title: 'Mieszkania na sprzedaż',
      description: 'Przeglądaj mieszkania na sprzedaż w całej Polsce.',
      imageUrl: './assets/images/image-placeholder2.jpg',
      linkUrl: '/'
    },
    {
      title: 'Domy na wynajem',
      description: 'Odkryj domy dostępne do wynajęcia.',
      imageUrl: './assets/images/image-placeholder3.jpg',
      linkUrl: '/'
    }
  ];
}
